import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Star, ThumbsUp, ThumbsDown, Info, ChevronDown, Zap } from "lucide-react";
import { heroes, Hero } from "../data/heroes";
import { heroBuilds } from "../data/heroBuilds";
import ItemIcon from "../components/ItemIcon";
import { lanePools } from "../data/lanes";
import SearchableHeroSelect from "../components/SearchableHeroSelect";

// ─── Constants ────────────────────────────────────────────────────────────────

const tierOrder = ["S+", "S", "A", "B", "C"];
const tierPoints: Record<string, number> = { "S+": 12, S: 10, A: 6, B: 3, C: 0 };
const tierBonus: Record<string, number> = { "S+": 3, S: 2, A: 1, B: 0, C: -1 };

const laneSlots = [
  { id: "jungler", label: "Jungler",   shortLabel: "JGL",  tag: "Assassin"  },
  { id: "gold",    label: "Gold Lane", shortLabel: "GOLD", tag: "Marksman"  },
  { id: "exp",     label: "EXP Lane",  shortLabel: "EXP",  tag: "Fighter"   },
  { id: "roamer",  label: "Roamer",    shortLabel: "ROAM", tag: "Tank/Supp" },
  { id: "mid",     label: "Mid Lane",  shortLabel: "MID",  tag: "Mage"      },
];

const skillGapLabels  = ["Much Worse", "Worse", "Similar", "Better", "Much Better"];
const skillGapValues  = [-10, -5, 0, 5, 10];
const skillGapExplain = [
  "You're significantly outskilled — even a strong comp will struggle.",
  "Enemy has a slight skill edge — play safe and let your comp carry.",
  "Even skill levels — it comes down to draft and execution.",
  "Your team has the skill edge — play aggressively.",
  "You outclass the enemy — dominate if your draft is solid.",
];

type TacticTip = { icon: string; tip: string };
const skillGapTactics: { headline: string; color: string; tips: TacticTip[] }[] = [
  {
    headline: "Survive & Scale",
    color: "text-red-600",
    tips: [
      { icon: "🛡️", tip: "Pick safe, low-skill-floor heroes that don't require mechanics to be useful (tanks, supports)." },
      { icon: "🏕️", tip: "Avoid solo engagements — group up early and rely on your comp's passive power." },
      { icon: "📍", tip: "Play objectives over kills. Secure Turtle & Lord even if you're losing fights." },
      { icon: "⏳", tip: "Stall for late-game carry heroes — pick comps with strong team-fight at 15+ min." },
      { icon: "🔕", tip: "Mute all chat, ignore tilting teammates, and focus on your own macro decisions." },
    ],
  },
  {
    headline: "Play It Safe",
    color: "text-orange-600",
    tips: [
      { icon: "🧠", tip: "Prioritise high-value, forgiving heroes — avoid mechanically intensive picks under pressure." },
      { icon: "🤝", tip: "Win through coordination: rotate to strong-side and assist teammates instead of solo carries." },
      { icon: "🗺️", tip: "Track the enemy jungler on the minimap and avoid getting caught overextended." },
      { icon: "💰", tip: "Focus on gold efficiency — clear your lane, don't miss CS trying to trade unfavourable fights." },
      { icon: "🏆", tip: "Contest Lord only when you have numbers advantage or a clear pick on a key enemy." },
    ],
  },
  {
    headline: "Execute Your Draft",
    color: "text-amber-600",
    tips: [
      { icon: "⚔️", tip: "The draft decides this game — pick heroes with clear win conditions and team synergy." },
      { icon: "📡", tip: "Vision control is the tiebreaker: buy extra wards, deep-ward the jungle, track rotations." },
      { icon: "🔄", tip: "Rotate intelligently — follow your jungler's tempo and collapse on skirmishes together." },
      { icon: "🎯", tip: "Focus one target in team fights: call out the priority kill before engaging." },
      { icon: "⏱️", tip: "Play around power spikes — know when your comp peaks and force fights at that timing." },
    ],
  },
  {
    headline: "Take Control",
    color: "text-green-600",
    tips: [
      { icon: "🚀", tip: "Apply early pressure — invade the enemy jungle and establish vision dominance." },
      { icon: "📌", tip: "Rotate to weaker lanes and snowball kills into turret dives and objectives." },
      { icon: "🧩", tip: "Create mismatches: send your carry to the lane where they win fastest, then spread pressure." },
      { icon: "⚡", tip: "Force fights before the enemy team can scale — your skill edge fades if the game goes long." },
      { icon: "🏅", tip: "Translate kills into turrets & Turtle immediately — don't celebrate, keep the tempo up." },
    ],
  },
  {
    headline: "Dominate & Close",
    color: "text-emerald-600",
    tips: [
      { icon: "👑", tip: "Play confidently but avoid tilting your opponents into surrender — keep focus." },
      { icon: "💥", tip: "Look for early picks and snowball hard — a 5-min lead should convert into a 12-min win." },
      { icon: "🎮", tip: "Outpace the enemy on every front: vision, rotations, objective timing, and itemisation." },
      { icon: "🔥", tip: "Zone enemies off objectives after kills — don't give them free respawn time to reset." },
      { icon: "🏁", tip: "Close when you have Lord or a 3-pick advantage — don't prolong a won game." },
    ],
  },
];

type Picks  = Record<string, string>;
type Reason = { text: string; positive: boolean };

// ─── Synergy engine ───────────────────────────────────────────────────────────

type SynergyStrength = "Core" | "Strong" | "Situational";
interface Synergy {
  icon: string;
  name: string;
  strength: SynergyStrength;
  heroes: string[];
  description: string;
  howToPlay: string;
}

const strengthOrder: SynergyStrength[] = ["Core", "Strong", "Situational"];
const strengthStyle: Record<SynergyStrength, { badge: string; border: string; glow: string }> = {
  Core:        { badge: "bg-mlbb-accent text-white",         border: "border-mlbb-accent/40",  glow: "from-mlbb-accent/10" },
  Strong:      { badge: "bg-green-600 text-white",           border: "border-green-400/40",    glow: "from-green-500/10"   },
  Situational: { badge: "bg-amber-500 text-white",           border: "border-amber-400/40",    glow: "from-amber-400/10"   },
};

function detectSynergies(picked: Hero[]): Synergy[] {
  const results: Synergy[] = [];
  const names = picked.map(h => h.name);

  // ── Direct hero-pair synergies from hero data ──────────────────────────────
  const seen = new Set<string>();
  for (const h of picked) {
    for (const partnerName of (h.synergies ?? [])) {
      const partner = picked.find(p => p.name === partnerName);
      if (!partner) continue;
      const key = [h.name, partner.name].sort().join("|");
      if (seen.has(key)) continue;
      seen.add(key);
      results.push({
        icon: "🔗",
        name: `${h.name} + ${partner.name}`,
        strength: "Core",
        heroes: [h.name, partner.name],
        description: `${h.name} and ${partner.name} are a built-in synergy pair — their kits directly amplify each other.`,
        howToPlay: `Coordinate ${h.name}'s engage/setup with ${partner.name}'s follow-up. Communicate before forcing fights so neither acts alone.`,
      });
    }
  }

  // ── Specialty-based combos ─────────────────────────────────────────────────
  const bySpec = (spec: string) => picked.filter(h => h.specialty === spec);
  const byRole = (role: string) => picked.filter(h => h.role === role);

  const ccHeroes = bySpec("Crowd Control");
  if (ccHeroes.length >= 2) {
    results.push({
      icon: "⛓️",
      name: "CC Chain",
      strength: ccHeroes.length >= 3 ? "Core" : "Strong",
      heroes: ccHeroes.map(h => h.name),
      description: `${ccHeroes.map(h => h.name).join(", ")} stack crowd control — enemies are locked in place back-to-back with no chance to react.`,
      howToPlay: "Layer CC in sequence, not all at once. Let the first CC expire before the next hero engages so enemies can never move.",
    });
  }

  const burstHeroes = bySpec("Burst");
  if (burstHeroes.length >= 2) {
    results.push({
      icon: "💥",
      name: "Burst Combo",
      strength: burstHeroes.length >= 3 ? "Core" : "Strong",
      heroes: burstHeroes.map(h => h.name),
      description: `${burstHeroes.map(h => h.name).join(", ")} combine burst damage that can delete squishy targets in under a second.`,
      howToPlay: "Focus one priority target together. Call the target in chat, wait for a pick or initiation, then combo simultaneously.",
    });
  }

  const pokeHeroes = bySpec("Poke");
  if (pokeHeroes.length >= 2) {
    results.push({
      icon: "🎯",
      name: "Poke Comp",
      strength: "Strong",
      heroes: pokeHeroes.map(h => h.name),
      description: `${pokeHeroes.map(h => h.name).join(", ")} pressure enemies from range, forcing heal spells and making objective fights lopsided.`,
      howToPlay: "Poke enemies down to 40–50% before contesting Turtle or Lord. Never engage at full health — force them to commit heal spells first.",
    });
  }

  const healHeroes = picked.filter(h => h.specialty === "Heal" || h.specialty === "Regen");
  if (healHeroes.length >= 2) {
    results.push({
      icon: "💚",
      name: "Sustain Stack",
      strength: "Situational",
      heroes: healHeroes.map(h => h.name),
      description: `${healHeroes.map(h => h.name).join(", ")} provide layered healing that makes your team extremely hard to burst down in drawn-out fights.`,
      howToPlay: "Prefer long sustained fights over short exchanges. Avoid burst-heavy opponents — they can delete you before heals activate.",
    });
  }

  // ── Role-composition combos ────────────────────────────────────────────────
  const tanks     = byRole("Tank");
  const assassins = byRole("Assassin");
  const fighters  = byRole("Fighter");
  const marksmen  = byRole("Marksman");
  const mages     = byRole("Mage");
  const supports  = byRole("Support");

  if (assassins.length >= 1 && ccHeroes.length >= 1) {
    const ccNames = ccHeroes.map(h => h.name);
    const assNames = assassins.map(h => h.name);
    const overlap = assNames.filter(n => ccNames.includes(n));
    if (overlap.length === 0) {
      results.push({
        icon: "🗡️",
        name: "Dive + Lock",
        strength: "Strong",
        heroes: [...assNames, ...ccNames].filter((v, i, a) => a.indexOf(v) === i),
        description: `${assNames.join(", ")} dive the backline while ${ccNames.join(", ")} lock enemies in place — the CC sets up free kills for the assassin.`,
        howToPlay: "Have the CC hero engage first to freeze the target, then the assassin dives in. Never dive before the lock — you'll die without backup.",
      });
    }
  }

  if ((tanks.length + supports.length) >= 1 && marksmen.length >= 1) {
    const frontline = [...tanks, ...supports].map(h => h.name);
    const carries   = marksmen.map(h => h.name);
    results.push({
      icon: "🛡️",
      name: "Protect the Carry",
      strength: frontline.length >= 2 ? "Core" : "Strong",
      heroes: [...frontline, ...carries],
      description: `${frontline.join(", ")} create a protective wall around ${carries.join(", ")}, letting the carry deal damage safely from behind the frontline.`,
      howToPlay: `${carries.join(", ")} stays behind at all times. Frontline engages first — the carry should never be the one initiating fights.`,
    });
  }

  if (fighters.length >= 1 && assassins.length >= 1) {
    results.push({
      icon: "⚡",
      name: "Dual Threat",
      strength: "Situational",
      heroes: [...fighters.map(h => h.name), ...assassins.map(h => h.name)],
      description: `A fighter and assassin duo creates two simultaneous dive threats — the enemy can't peel for both at once.`,
      howToPlay: "Split the dives: one goes for the carry, the other cleans up or peels. If both dive the same target the enemy support can undo the play.",
    });
  }

  if (mages.length >= 2) {
    results.push({
      icon: "🔮",
      name: "Double Mage",
      strength: "Situational",
      heroes: mages.map(h => h.name),
      description: `${mages.map(h => h.name).join(", ")} stack magic damage — enemies who build magic resist to counter one mage still get shredded by the other.`,
      howToPlay: "One mage initiates or pokes, the other follows with a combo. Keep them on different flanks so the enemy can't zone both simultaneously.",
    });
  }

  // Deduplicate by hero set overlap, keep highest strength
  const deduped: Synergy[] = [];
  for (const s of results) {
    const dup = deduped.find(d =>
      d.heroes.length === s.heroes.length &&
      d.heroes.every(h => s.heroes.includes(h))
    );
    if (!dup) {
      deduped.push(s);
    } else if (strengthOrder.indexOf(s.strength) < strengthOrder.indexOf(dup.strength)) {
      Object.assign(dup, s);
    }
  }

  return deduped.sort((a, b) => strengthOrder.indexOf(a.strength) - strengthOrder.indexOf(b.strength));
}

// ─── Weakness engine ──────────────────────────────────────────────────────────

interface Weakness {
  icon: string;
  name: string;
  severity: "High" | "Medium" | "Low";
  description: string;
  fix: string;
}

function detectWeaknesses(picked: Hero[]): Weakness[] {
  const results: Weakness[] = [];
  if (picked.length < 2) return results;

  const roles    = picked.map(h => h.role);
  const specs    = picked.map(h => h.specialty);
  const hasTank  = roles.includes("Tank");
  const hasSupp  = roles.includes("Support");
  const hasFront = hasTank || hasSupp || roles.filter(r => r === "Fighter").length >= 2;
  const hasCC    = specs.includes("Crowd Control");
  const hasMM    = roles.includes("Marksman");
  const hasMage  = roles.includes("Mage");
  const hasPhys  = roles.some(r => ["Fighter","Assassin","Marksman"].includes(r));
  const hasMagic = roles.some(r => ["Mage","Support"].includes(r));
  const hasHeal  = specs.includes("Heal") || specs.includes("Regen");
  const allSquish = picked.every(h => ["Assassin","Marksman","Mage"].includes(h.role));
  const burstCount = specs.filter(s => s === "Burst").length;
  const ccCount    = specs.filter(s => s === "Crowd Control").length;
  const roleCounts = roles.reduce<Record<string,number>>((acc, r) => { acc[r] = (acc[r] ?? 0) + 1; return acc; }, {});
  const dupRole    = Object.entries(roleCounts).find(([, c]) => c >= 3);

  if (!hasFront)
    results.push({ icon: "🚪", name: "No Frontline", severity: "High",
      description: "Your team has no tank or support — enemy divers will reach your carries with no resistance.",
      fix: "Replace one hero with a Tank (Hylos, Khufra) or Support (Angela, Mathilda) to absorb pressure and peel for your carry." });

  if (!hasCC)
    results.push({ icon: "🔓", name: "Zero Crowd Control", severity: "High",
      description: "No CC means enemies can kite freely, escape your combos, and never get locked down in team fights.",
      fix: "Fit at least one CC specialist (Tigreal, Atlas, Franco) into the draft — even a single stun changes team-fight outcomes drastically." });

  if (allSquish)
    results.push({ icon: "💀", name: "All Squishy", severity: "High",
      description: "Every hero on your team is a glass cannon. Any burst assassin or diver will delete your entire comp instantly.",
      fix: "Add a tank or off-tank fighter. Even Chou or Uranus as EXP gives you enough bulk to survive the first trade." });

  if (!hasMM && !hasMage)
    results.push({ icon: "📉", name: "No Sustained Damage", severity: "High",
      description: "Without a marksman or mage, your team has no consistent late-game damage source and will lose prolonged fights.",
      fix: "Include a marksman (Granger, Beatrix) or mage (Kagura, Lunox) who can deal reliable damage from a safe distance." });

  if (!hasPhys)
    results.push({ icon: "🔵", name: "Full Magic Damage", severity: "Medium",
      description: "Pure magic comps are easy to itemise against — one Athena's Shield or Oracle on the enemy tank neutralises your output.",
      fix: "Include at least one physical damage dealer so the enemy can't counter-build a single damage type." });

  if (!hasMagic)
    results.push({ icon: "🟠", name: "Full Physical Damage", severity: "Medium",
      description: "Pure physical comps are countered by one Dominance Ice or Antique Cuirass. Enemies will stack armor to shut you down.",
      fix: "Add a mage or magic-damage support so the enemy must split their defense budget between two damage types." });

  if (burstCount >= 3 && !hasCC)
    results.push({ icon: "💨", name: "Burst With No Setup", severity: "Medium",
      description: "You have heavy burst damage but no CC to stop enemies escaping. Your combos will whiff on mobile targets.",
      fix: "Add one lock-down hero (Franco, Kaja, Chou) so your burst heroes can land their full combos without the target escaping." });

  if (!hasHeal && hasMM)
    results.push({ icon: "🩹", name: "No Sustain for Carry", severity: "Medium",
      description: "Your marksman has no healing support — they'll get burst down once the frontline breaks.",
      fix: "Consider Angela, Rafaela, or Estes to keep your carry alive in extended fights." });

  if (dupRole)
    results.push({ icon: "⚠️", name: `Role Overlap (${dupRole[0]})`, severity: "Low",
      description: `You have ${dupRole[1]} heroes in the ${dupRole[0]} role. Lane assignments will be awkward and one hero will underperform from reduced farm.`,
      fix: "Spread roles across lanes. Each hero needs solo income to spike on time — doubling up in one role starves someone." });

  if (ccCount >= 4)
    results.push({ icon: "🐢", name: "CC-Heavy, Low Damage", severity: "Low",
      description: "Too many CC heroes means your damage output is probably low. You'll lock enemies down but struggle to actually kill them.",
      fix: "Swap one CC hero for a damage carry so your lockdown has a finisher. CC without damage is just crowd watching." });

  return results.sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return order[a.severity] - order[b.severity];
  });
}

// ─── Build combo engine ───────────────────────────────────────────────────────

interface BuildCombo {
  rank: number;
  icon: string;
  name: string;
  archetype: string;
  tier: "S+" | "S" | "A" | "B";
  items: string[];
  heroesUsing: string[];
  coverage: number;
  why: string;
  timing: string;
  when: string;
}

const ITEM_COMBOS: { name: string; archetype: string; icon: string; tier: "S+" | "S" | "A" | "B"; items: string[]; why: string; timing: string; when: string }[] = [
  {
    name: "Physical Trinity",
    archetype: "Marksman / Fighter",
    icon: "⚔️",
    tier: "S+",
    items: ["Demon Hunter Sword", "Corrosion Scythe", "Golden Staff"],
    why: "The strongest universal physical package in Patch 2.1.67a. DHS deals % HP damage per hit, Corrosion Scythe slows and extends the fight, and Golden Staff converts crit chance into extra attack speed — exactly what the first two items need to keep procing. The trio solves HP shred and attack-effect uptime simultaneously.",
    timing: "DHS first for early %HP procs. Corrosion Scythe second for slow and shred uptime. Golden Staff third to amplify attack speed and proc rate.",
    when: "Any basic-attack carry who fights tanks (Claude, Wanwan, Karrie, Argus). The default best-in-slot trio for on-hit heroes.",
  },
  {
    name: "Crit Core",
    archetype: "Marksman",
    icon: "🎯",
    tier: "S",
    items: ["Berserker's Fury", "Scarlet Phantom", "Great Dragon Spear"],
    why: "The correct crit trio for heroes that actually want crit scaling. Berserker's Fury is the crit-damage anchor, Scarlet Phantom raises attack speed after every crit, and Great Dragon Spear is the clean third slot — not Windtalker (wave-clear flex) and not Golden Staff (which converts crit into attack speed, wasting Berserker's Fury's crit-damage multiplier entirely).",
    timing: "Scarlet Phantom first for the fastest attack speed / crit rate spike. Berserker's Fury second to cash in the crit damage. Great Dragon Spear last.",
    when: "Dedicated crit marksmen (Lesley, Beatrix sniper mode, Clint). Don't pair Golden Staff with Berserker's Fury — it wastes the crit damage.",
  },
  {
    name: "Pen Destroyer",
    archetype: "Physical Carry",
    icon: "💀",
    tier: "S",
    items: ["Demon Hunter Sword", "Malefic Roar", "Blade of Despair"],
    why: "The best anti-tank physical finisher. DHS punishes HP stacking with % damage, Malefic Roar ignores 40% of their armor, and Blade of Despair converts both into maximum burst. Strongest specifically against tank-heavy drafts — not the strongest overall combo in the game.",
    timing: "DHS first for early %HP procs. Malefic Roar mid-game when tanks finish their first defense item. BoD last to convert pen into burst.",
    when: "Enemy has 2+ real tanks or anyone stacking HP above 4,000. The more they build, the better this gets.",
  },
  {
    name: "Mage Burst Trio",
    archetype: "Mage",
    icon: "⚡",
    tier: "S",
    items: ["Lightning Truncheon", "Holy Crystal", "Divine Glaive"],
    why: "The best pure mage burst core. Lightning Truncheon delivers AoE procs early, Holy Crystal gives the biggest raw magic power spike in the game, and Divine Glaive is the anti-MR capstone that keeps the combo relevant when enemies start buying resistance.",
    timing: "Lightning Truncheon second item for the AoE proc spike. Holy Crystal third to amplify everything. Divine Glaive last to shred MR.",
    when: "Any burst mage with fast skill rotations (Eudora, Vale, Lunox). Spike at item 2 and close games at item 3.",
  },
  {
    name: "Bruiser Core",
    archetype: "Fighter",
    icon: "🛡️",
    tier: "S",
    items: ["War Axe", "Endless Battle", "Queen's Wings"],
    why: "The real sustained-fight fighter engine. War Axe stacks true damage and CDR through the fight, Endless Battle adds more true damage after every skill cast, and Queen's Wings gives a clutch damage-reduction window exactly when enemies focus you. Blade of Despair only belongs here if you're snowballing on a fighter-assassin hybrid — not the default third slot.",
    timing: "War Axe first for early stacking. Endless Battle second for the true-damage proc loop. Queen's Wings last for the survival window when focused.",
    when: "Skill-heavy fighters in extended duels (Paquito, Dyrroth, Argus). Don't swap Queen's Wings for BoD unless you're already dominant.",
  },
  {
    name: "Survival Trinity",
    archetype: "Any Carry",
    icon: "💚",
    tier: "A",
    items: ["Oracle", "Wind of Nature", "Immortality"],
    why: "Oracle amplifies every shield and heal you receive by 30%. Wind of Nature gives 2 seconds of full physical immunity on demand. Immortality gives a full second life. Together they give a carry three separate safety windows — enough to survive even the most coordinated dives.",
    timing: "Oracle first for passive sustain amplification all game. Wind of Nature 5th when dives start. Immortality last slot.",
    when: "Solo queue or when you are the only carry. Buy at least two of these three in any game where you keep dying before doing damage.",
  },
  {
    name: "Magic Sustain Set",
    archetype: "Mage / Support",
    icon: "💚",
    tier: "A",
    items: ["Concentrated Energy", "Oracle", "Blood Wings"],
    why: "Concentrated Energy gives spell vamp so every skill heals you. Oracle amplifies that spell vamp healing by 30%. Blood Wings converts your AP into a massive shield that constantly refreshes. All three extend fight duration by making it nearly impossible to burst down a mage who has them.",
    timing: "Concentrated Energy second item on sustain mages. Oracle third. Blood Wings last for the shield scaling.",
    when: "Sustained mages in long teamfights (Chang'e, Cecilion, Pharsa). Not for assassin-style mages who want to burst and escape.",
  },
  {
    name: "Assassin's Feast",
    archetype: "Assassin",
    icon: "🗡️",
    tier: "S",
    items: ["Blade of the Heptaseas", "War Axe", "Blade of Despair"],
    why: "Heptaseas procs a burst proc on first ability hit, War Axe stacks true damage through the fight, BoD multiplies the entire combo — the standard assassin one-shot loop.",
    timing: "Heptaseas first for early burst pressure. War Axe second to stack during mid-game. BoD third when you need the final multiplier.",
    when: "Ability-based assassins who engage with a skill (Hayabusa, Lancelot, Helcurt). Hits hardest at minute 8–10 before enemies build defense.",
  },
  {
    name: "Tank Fortress",
    archetype: "Tank",
    icon: "🏰",
    tier: "A",
    items: ["Antique Cuirass", "Athena's Shield", "Dominance Ice"],
    why: "Antique Cuirass reduces physical burst per stack. Athena's Shield absorbs the first magic spike. Dominance Ice cripples attack speed and reduces enemy healing. Together they cover every major damage type.",
    timing: "Build into the heaviest threat first. Dominance Ice third unless the enemy has a fast marksman — then buy it second.",
    when: "Tanks against mixed physical + magic enemy teams. The full set is only justified when the enemy has both a strong marksman and a strong mage.",
  },
  {
    name: "Lifesteal Carry",
    archetype: "Marksman",
    icon: "🩸",
    tier: "B",
    items: ["Demon Hunter Sword", "Golden Staff", "Scarlet Phantom"],
    why: "DHS % HP damage + Golden Staff multi-hit procs + Scarlet Phantom attack speed creates sustained team-fight DPS that never falls off.",
    timing: "DHS first for %HP procs in lane. Golden Staff second to maximize hits per second. Scarlet Phantom last for the attack speed + crit.",
    when: "Against tanky comps with 3+ HP-stacking heroes where burst builds would be inefficient.",
  },
];

function detectBuildCombos(picked: Hero[]): BuildCombo[] {
  if (picked.length === 0) return [];

  const results: BuildCombo[] = [];

  for (const combo of ITEM_COMBOS) {
    const heroesUsing: string[] = [];

    for (const hero of picked) {
      const builds = heroBuilds[hero.id] ?? [];
      const coreItems = builds.find(b => b.type === "Core")?.items ?? hero.build ?? [];
      const matchCount = combo.items.filter(item => coreItems.includes(item)).length;
      if (matchCount >= Math.min(2, combo.items.length)) {
        heroesUsing.push(hero.name);
      }
    }

    if (heroesUsing.length === 0) continue;

    const coverage = Math.round((heroesUsing.length / picked.length) * 100);
    results.push({
      rank: 0,
      icon: combo.icon,
      name: combo.name,
      archetype: combo.archetype,
      tier: combo.tier,
      items: combo.items,
      heroesUsing,
      coverage,
      why: combo.why,
      timing: combo.timing,
      when: combo.when,
    });
  }

  const tierWeight: Record<string, number> = { "S+": 4, "S": 3, "A": 2, "B": 1 };
  results.sort((a, b) => {
    const tierDiff = (tierWeight[b.tier] ?? 0) - (tierWeight[a.tier] ?? 0);
    if (tierDiff !== 0) return tierDiff;
    const herosDiff = b.heroesUsing.length - a.heroesUsing.length;
    if (herosDiff !== 0) return herosDiff;
    return b.coverage - a.coverage;
  });

  return results.slice(0, 6).map((r, i) => ({ ...r, rank: i + 1 }));
}

// ─── Hero select ──────────────────────────────────────────────────────────────

function AnyHeroSelect({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder: string;
}) {
  const options = [...heroes]
    .sort((a, b) => {
      const t = tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
      return t !== 0 ? t : a.name.localeCompare(b.name);
    })
    .map(h => ({ id: h.id, name: h.name, tier: h.tier, label: h.role }));
  return <SearchableHeroSelect value={value} onChange={onChange} options={options} placeholder={placeholder} />;
}

// ─── Recommendation card ──────────────────────────────────────────────────────

function RecommendationCard({ hero, score, reasons, rank }: {
  hero: (typeof heroes)[0]; score: number; reasons: Reason[]; rank: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-mlbb-accent/40 hover:shadow-md transition-all">
      <div className="relative h-24 overflow-hidden bg-gradient-to-br from-mlbb-violet/10 to-mlbb-accent/10">
        <div className="absolute inset-0 flex items-center justify-center text-5xl font-black text-slate-200 select-none">{hero.name[0]}</div>
        <img
          src={`${import.meta.env.BASE_URL}heroes/${hero.id}.png`}
          alt={hero.name}
          className="w-full h-full object-cover object-top relative z-10"
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20" />
        <div className="absolute top-2 left-2 z-30 w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black font-display bg-mlbb-accent text-white">
          #{rank}
        </div>
        <div className="absolute top-2 right-2 z-30 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black font-display bg-white/90 text-mlbb-gold border border-mlbb-gold/30">
          {hero.tier}
        </div>
      </div>

      <div className="px-3 py-2">
        <p className="font-black font-display text-xs uppercase tracking-wide text-slate-800 truncate">{hero.name}</p>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-[10px] text-slate-400 truncate">{hero.specialty}</p>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-2.5 h-2.5 text-mlbb-gold" />
            <span className={`text-[9px] font-black ${score >= 4 ? "text-green-600" : score >= 0 ? "text-amber-600" : "text-red-500"}`}>
              {score >= 0 ? "+" : ""}{score}
            </span>
          </div>
        </div>

        <button
          onClick={() => setOpen(o => !o)}
          className="mt-2 w-full flex items-center justify-between text-[9px] font-bold font-display uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
        >
          Why this pick
          <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden mt-1.5 space-y-1"
            >
              {reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-1">
                  {r.positive
                    ? <ThumbsUp className="w-2.5 h-2.5 text-green-500 mt-0.5 shrink-0" />
                    : <ThumbsDown className="w-2.5 h-2.5 text-red-400 mt-0.5 shrink-0" />
                  }
                  <span className={`text-[9px] leading-tight ${r.positive ? "text-green-700" : "text-red-600"}`}>{r.text}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DraftWin() {
  const [myLane, setMyLane]       = useState("");
  const [myPicks, setMyPicks]     = useState<Picks>({ jungler: "", gold: "", exp: "", roamer: "", mid: "" });
  const [enemyPicks, setEnemyPicks] = useState<Picks>({ jungler: "", gold: "", exp: "", roamer: "", mid: "" });
  const [skillGap, setSkillGap]   = useState(2);

  const setMy    = (lane: string, hero: string) => setMyPicks(p => ({ ...p, [lane]: hero }));
  const setEnemy = (lane: string, hero: string) => setEnemyPicks(p => ({ ...p, [lane]: hero }));

  const myScore = useMemo(() =>
    Object.values(myPicks).reduce((sum, name) => {
      const h = heroes.find(h => h.name === name);
      return sum + (h ? (tierPoints[h.tier] ?? 0) : 0);
    }, 0), [myPicks]);

  const enemyScore = useMemo(() =>
    Object.values(enemyPicks).reduce((sum, name) => {
      const h = heroes.find(h => h.name === name);
      return sum + (h ? (tierPoints[h.tier] ?? 0) : 0);
    }, 0), [enemyPicks]);

  const skillGapValue = skillGapValues[skillGap];
  const winPct = Math.min(90, Math.max(10, Math.round(50 + (myScore - enemyScore + skillGapValue) * 1.8)));
  const anyPick = Object.values(myPicks).some(Boolean) || Object.values(enemyPicks).some(Boolean);

  const myPickedHeroes = useMemo(() =>
    Object.values(myPicks).filter(Boolean).map(name => heroes.find(h => h.name === name)!).filter(Boolean),
  [myPicks]);

  const synergies   = useMemo(() => detectSynergies(myPickedHeroes),  [myPickedHeroes]);
  const weaknesses  = useMemo(() => detectWeaknesses(myPickedHeroes), [myPickedHeroes]);
  const buildCombos = useMemo(() => detectBuildCombos(myPickedHeroes), [myPickedHeroes]);

  const winColor = winPct >= 65
    ? { bar: "bg-green-500", text: "text-green-600", label: "Favorable",   bg: "bg-green-50 border-green-200" }
    : winPct >= 45
    ? { bar: "bg-amber-400", text: "text-amber-600", label: "Contested",   bg: "bg-amber-50 border-amber-200" }
    : { bar: "bg-red-500",   text: "text-red-600",   label: "Unfavorable", bg: "bg-red-50 border-red-200"   };

  const enemyNames = Object.values(enemyPicks).filter(Boolean);

  const recommendations = useMemo(() => {
    if (!myLane) return [];
    const pool = lanePools[myLane] ?? [];
    return heroes
      .filter(h => pool.includes(h.name))
      .map(hero => {
        let score = tierBonus[hero.tier] ?? 0;
        const reasons: Reason[] = [];

        const tb = tierBonus[hero.tier] ?? 0;
        if (tb > 0)      reasons.push({ text: `${hero.tier} tier — meta pick`,   positive: true  });
        else if (tb < 0) reasons.push({ text: `${hero.tier} tier — off-meta`,    positive: false });
        else             reasons.push({ text: `${hero.tier} tier — situational`, positive: true  });

        for (const enemyName of enemyNames) {
          const enemy = heroes.find(h => h.name === enemyName);
          if (!enemy) continue;
          if (hero.strongAgainst?.includes(enemyName)) { score += 3; reasons.push({ text: `Strong vs ${enemyName}`,               positive: true  }); }
          if (hero.counters?.includes(enemyName))       { score -= 2; reasons.push({ text: `Weak vs ${enemyName}`,                 positive: false }); }
          if (enemy.counters?.includes(hero.name))      { score -= 3; reasons.push({ text: `${enemyName} hard-counters you`,       positive: false }); }
          if (enemy.strongAgainst?.includes(hero.name)) { score += 1; reasons.push({ text: `Favorable matchup vs ${enemyName}`,   positive: true  }); }
        }
        return { hero, score, reasons };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [myLane, enemyNames]);

  const verdictLines = useMemo(() => {
    const lines: Reason[] = [];
    const diff = myScore - enemyScore;
    if (diff > 0)       lines.push({ text: `Your heroes have a stronger tier average (+${diff} pts).`, positive: true  });
    else if (diff < 0)  lines.push({ text: `Enemy heroes have a stronger tier average (${diff} pts).`, positive: false });
    else if (myScore > 0) lines.push({ text: "Both teams are evenly matched on tier score.",            positive: true  });
    if (skillGapValue !== 0)
      lines.push({ text: skillGapExplain[skillGap], positive: skillGapValue > 0 });
    return lines;
  }, [myScore, enemyScore, skillGapValue, skillGap]);

  const myLaneData = laneSlots.find(l => l.id === myLane);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">

      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-3 border border-mlbb-cyan/30 bg-mlbb-cyan/10 text-mlbb-cyan">
          <GitBranch className="w-3 h-3" />
          <span>Patch 2.1.67a · Season 40</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-slate-900 mb-1">
          Draft & <span className="esports-text-gradient">Win Analyzer</span>
        </h1>
        <p className="text-slate-500 text-sm">Pick both teams, choose your lane — get counter-picks and win probability in one place.</p>
      </div>

      {/* Live win bar */}
      <AnimatePresence>
        {anyPick && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`mb-5 rounded-2xl border p-4 ${winColor.bg}`}
          >
            <div className="flex items-center gap-4">
              <div className="text-center shrink-0 w-24">
                <p className="text-[9px] font-display font-bold uppercase tracking-widest text-slate-500 mb-0.5">Win Probability</p>
                <div className={`text-5xl font-black font-display ${winColor.text}`}>{winPct}%</div>
                <p className={`text-[10px] font-bold font-display uppercase tracking-widest ${winColor.text}`}>{winColor.label}</p>
              </div>
              <div className="flex-1">
                <div className="h-3 rounded-full bg-slate-200 overflow-hidden mb-2">
                  <motion.div
                    animate={{ width: `${winPct}%` }}
                    transition={{ type: "spring", stiffness: 80 }}
                    className={`h-full ${winColor.bar} rounded-full`}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Your Score</p>
                    <p className="font-black text-slate-900">{myScore}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Skill Gap</p>
                    <p className={`font-black ${skillGapValue >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {skillGapValue >= 0 ? "+" : ""}{skillGapValue}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Enemy Score</p>
                    <p className="font-black text-slate-900">{enemyScore}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lane selector */}
      <div className="mb-4">
        <p className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400 mb-2">Your Lane (for draft picks)</p>
        <div className="flex gap-2 flex-wrap">
          {laneSlots.map(lane => (
            <button
              key={lane.id}
              onClick={() => setMyLane(l => l === lane.id ? "" : lane.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl border text-center transition-all ${
                myLane === lane.id
                  ? "bg-mlbb-accent/10 border-mlbb-accent text-mlbb-accent"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className="font-black font-display text-xs uppercase tracking-wide">{lane.shortLabel}</span>
              <span className="text-[9px] text-slate-400">{lane.tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Team builder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h3 className="font-black font-display text-sm uppercase tracking-wide text-mlbb-accent mb-3">Your Team</h3>
          <div className="space-y-2">
            {laneSlots.map(lane => (
              <div key={lane.id} className={`flex items-center gap-2 rounded-xl transition-colors ${myLane === lane.id ? "bg-mlbb-accent/5 -mx-1 px-1 py-0.5" : ""}`}>
                <p className={`text-[9px] font-bold font-display uppercase tracking-widest w-10 shrink-0 ${myLane === lane.id ? "text-mlbb-accent" : "text-slate-400"}`}>
                  {lane.shortLabel}
                </p>
                <div className="flex-1">
                  <AnyHeroSelect value={myPicks[lane.id]} onChange={v => setMy(lane.id, v)} placeholder={lane.label} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h3 className="font-black font-display text-sm uppercase tracking-wide text-red-500 mb-3">Enemy Team</h3>
          <div className="space-y-2">
            {laneSlots.map(lane => (
              <div key={lane.id} className="flex items-center gap-2">
                <p className="text-[9px] font-bold font-display uppercase tracking-widest text-slate-400 w-10 shrink-0">{lane.shortLabel}</p>
                <div className="flex-1">
                  <AnyHeroSelect value={enemyPicks[lane.id]} onChange={v => setEnemy(lane.id, v)} placeholder={lane.label} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Synergy */}
      <AnimatePresence>
        {myPickedHeroes.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-mlbb-accent" />
              <h2 className="font-black font-display text-base uppercase tracking-tight text-slate-900">
                Team <span className="esports-text-gradient">Synergies</span>
              </h2>
              <span className="text-[10px] text-slate-400 font-medium">· based on your picks</span>
            </div>

            {synergies.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                <p className="text-sm text-slate-400">No notable synergies detected yet — add more heroes to unlock combo analysis.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {synergies.map((syn, i) => {
                  const style = strengthStyle[syn.strength];
                  return (
                    <motion.div
                      key={syn.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`bg-gradient-to-br ${style.glow} to-white border ${style.border} rounded-2xl p-4`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl leading-none">{syn.icon}</span>
                          <p className="font-black font-display text-sm uppercase tracking-tight text-slate-900">{syn.name}</p>
                        </div>
                        <span className={`shrink-0 text-[9px] font-black font-display uppercase tracking-widest px-2 py-0.5 rounded-full ${style.badge}`}>
                          {syn.strength}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {syn.heroes.map(name => (
                          <span key={name} className="text-[9px] font-bold font-display uppercase tracking-wide bg-white/80 border border-slate-200 text-slate-600 rounded-md px-1.5 py-0.5">
                            {name}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-slate-600 leading-snug mb-2">{syn.description}</p>

                      <div className="border-t border-slate-100 pt-2 flex items-start gap-1.5">
                        <span className="text-[10px] shrink-0 mt-0.5">▶</span>
                        <p className="text-[10px] text-slate-500 leading-snug font-medium">{syn.howToPlay}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comp Weaknesses */}
      <AnimatePresence>
        {weaknesses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-base">⚠️</span>
              <h2 className="font-black font-display text-base uppercase tracking-tight text-slate-900">
                Comp <span className="text-red-500">Weaknesses</span>
              </h2>
              <span className="text-[10px] text-slate-400 font-medium">· vulnerabilities to address</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {weaknesses.map((w, i) => {
                const sevStyle = w.severity === "High"
                  ? { border: "border-red-300",   bg: "bg-red-50",    badge: "bg-red-500 text-white",    text: "text-red-700"   }
                  : w.severity === "Medium"
                  ? { border: "border-amber-300", bg: "bg-amber-50",  badge: "bg-amber-500 text-white",  text: "text-amber-700" }
                  : { border: "border-slate-200", bg: "bg-slate-50",  badge: "bg-slate-400 text-white",  text: "text-slate-600" };
                return (
                  <motion.div
                    key={w.name}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border ${sevStyle.border} ${sevStyle.bg} rounded-2xl p-4`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl leading-none">{w.icon}</span>
                        <p className={`font-black font-display text-sm uppercase tracking-tight ${sevStyle.text}`}>{w.name}</p>
                      </div>
                      <span className={`shrink-0 text-[9px] font-black font-display uppercase tracking-widest px-2 py-0.5 rounded-full ${sevStyle.badge}`}>
                        {w.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug mb-2">{w.description}</p>
                    <div className="border-t border-white/60 pt-2 flex items-start gap-1.5">
                      <span className="text-[10px] text-green-600 font-black shrink-0 mt-0.5">FIX</span>
                      <p className="text-[10px] text-slate-600 leading-snug">{w.fix}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Build Combo Ranker */}
      <AnimatePresence>
        {buildCombos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-base">🏆</span>
              <h2 className="font-black font-display text-base uppercase tracking-tight text-slate-900">
                Build <span className="esports-text-gradient">Combo Ranking</span>
              </h2>
              <span className="text-[10px] text-slate-400 font-medium">· best item sets for your team</span>
            </div>
            <div className="space-y-3">
              {buildCombos.map((combo, i) => {
                const tierStyle: Record<string, { badge: string; border: string; rankBg: string; rankText: string }> = {
                  "S+": { badge: "bg-mlbb-gold text-black",       border: "border-mlbb-gold/50",   rankBg: "bg-mlbb-gold/10",   rankText: "text-mlbb-gold"   },
                  "S":  { badge: "bg-mlbb-accent text-white",     border: "border-mlbb-accent/40", rankBg: "bg-mlbb-accent/5",  rankText: "text-mlbb-accent" },
                  "A":  { badge: "bg-green-600 text-white",       border: "border-green-400/40",   rankBg: "bg-green-50",       rankText: "text-green-700"   },
                  "B":  { badge: "bg-slate-500 text-white",       border: "border-slate-300",      rankBg: "bg-slate-50",       rankText: "text-slate-600"   },
                };
                const ts = tierStyle[combo.tier] ?? tierStyle["B"];
                return (
                  <motion.div
                    key={combo.name}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`border ${ts.border} ${ts.rankBg} rounded-2xl p-4`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-black font-display text-sm border ${ts.border} ${ts.rankText}`}>
                        #{combo.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-base leading-none">{combo.icon}</span>
                            <span className="font-black font-display text-sm uppercase tracking-tight text-slate-900">{combo.name}</span>
                            <span className={`text-[10px] font-black font-display px-2 py-0.5 rounded-full ${ts.badge}`}>
                              {combo.tier}
                            </span>
                          </div>
                          <span className="shrink-0 text-[9px] font-bold font-display uppercase tracking-wide text-slate-400 border border-slate-200 rounded-md px-1.5 py-0.5 bg-white">
                            {combo.archetype}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          {combo.items.map((item, idx) => (
                            <div key={item} className="flex items-center gap-1.5">
                              <div className="flex items-center gap-1.5">
                                <ItemIcon name={item} size="sm" />
                                <span className="text-[9px] font-bold font-display text-slate-700 leading-tight max-w-[52px]">{item}</span>
                              </div>
                              {idx < combo.items.length - 1 && (
                                <span className="text-slate-300 font-black text-base leading-none">+</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${combo.coverage}%` }}
                              transition={{ delay: i * 0.06 + 0.2, duration: 0.4 }}
                              className="h-full bg-mlbb-accent rounded-full"
                            />
                          </div>
                          <span className="text-[9px] font-black text-mlbb-accent shrink-0">{combo.coverage}% of team</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {combo.heroesUsing.map(name => (
                            <span key={name} className="text-[9px] font-bold font-display uppercase tracking-wide bg-mlbb-accent/10 border border-mlbb-accent/30 text-mlbb-accent rounded-md px-1.5 py-0.5">
                              {name}
                            </span>
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-500 leading-snug mb-1.5">{combo.why}</p>
                        <div className="flex items-start gap-1.5 border-t border-slate-100/80 pt-1.5 mb-1">
                          <span className="text-[9px] font-black text-mlbb-cyan shrink-0 mt-0.5">TIMING</span>
                          <p className="text-[10px] text-slate-500 leading-snug">{combo.timing}</p>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="text-[9px] font-black text-amber-500 shrink-0 mt-0.5">WHEN</span>
                          <p className="text-[10px] text-slate-500 leading-snug">{combo.when}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Winning / Losing Advice */}
      <AnimatePresence>
        {anyPick && (
          <motion.div
            key={winPct}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4"
          >
            {winPct >= 65 ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🏆</span>
                  <h2 className="font-black font-display text-base uppercase tracking-tight text-green-700">
                    You're Winning — Close It Out
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { icon: "⚡", tip: "Press your advantage early — don't let the enemy scale. Force fights when your team is ahead." },
                    { icon: "🐢", tip: "Secure Turtle and Lord as soon as they spawn. Objectives win games, not kills." },
                    { icon: "🏯", tip: "After every successful team fight, immediately rotate to take turrets and lanes — don't recall to base." },
                    { icon: "🎯", tip: "Focus the enemy carry first in every fight — removing their damage dealer collapses their entire defense." },
                    { icon: "🚫", tip: "Don't get overconfident. Even a 70%+ lead can be thrown with one bad Lord fight — stay disciplined." },
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-base leading-none mt-0.5 shrink-0">{t.icon}</span>
                      <span className="text-xs text-green-800 leading-snug">{t.tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : winPct >= 45 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">⚔️</span>
                  <h2 className="font-black font-display text-base uppercase tracking-tight text-amber-700">
                    Even Game — Execution Decides
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { icon: "🧠", tip: "This game is decided by macro, not mechanics. Vision control and rotation timing will be the tiebreaker." },
                    { icon: "📡", tip: "Deep-ward the enemy jungle before every major objective contest — surprise picks from fog of war shift even games." },
                    { icon: "🤝", tip: "Group up before contesting Lord or Turtle. Never fight 4v5 — wait for your full team even if it takes 10 seconds." },
                    { icon: "🎯", tip: "Pick one target to focus in every team fight and commit to it. Splitting focus on even drafts leads to messy, losing fights." },
                    { icon: "⏱️", tip: "Know your comp's power spike — if you're stronger at 5–10 min, force early; if late, survive and scale." },
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-base leading-none mt-0.5 shrink-0">{t.icon}</span>
                      <span className="text-xs text-amber-800 leading-snug">{t.tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🛡️</span>
                  <h2 className="font-black font-display text-base uppercase tracking-tight text-red-700">
                    You're Behind — Play for the Comeback
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { icon: "🏕️", tip: "Avoid early solo fights you can't win. Group up and move as 5 to deny the enemy easy picks and snowball." },
                    { icon: "⏳", tip: "Stall for your late-game power spike. If your comp scales, survive until 12–15 min before forcing fights." },
                    { icon: "📍", tip: "Play for objectives, not kills. Secure Turtle even without a fight — the gold and buff matter more than the KDA." },
                    { icon: "🔄", tip: "Rotate to stop the bleeding — if one lane is constantly dying, send help and trade pressure elsewhere." },
                    { icon: "👑", tip: "One good Lord call can erase a 5-minute deficit. Don't surrender — wait for that one clean team fight and convert it." },
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-base leading-none mt-0.5 shrink-0">{t.icon}</span>
                      <span className="text-xs text-red-800 leading-snug">{t.tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draft recommendations */}
      <AnimatePresence>
        {myLane && (
          <motion.div
            key={myLane}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4"
          >
            <div className="mb-3">
              <h2 className="font-black font-display text-base uppercase tracking-tight text-slate-900">
                Best Picks · <span className="esports-text-gradient">{myLaneData?.label}</span>
              </h2>
              <p className="text-slate-400 text-xs">
                {enemyNames.length > 0
                  ? `Ranked vs ${enemyNames.length} enemy pick${enemyNames.length > 1 ? "s" : ""} — tap "Why this pick" on each card`
                  : "Ranked by tier — fill in the enemy team for counter-pick analysis"}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {recommendations.map(({ hero, score, reasons }, i) => (
                <RecommendationCard key={hero.id} hero={hero} score={score} reasons={reasons} rank={i + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Why this win estimate */}
      <AnimatePresence>
        {anyPick && verdictLines.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
          >
            <h3 className="font-black font-display text-xs uppercase tracking-wide text-slate-700 mb-3 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-slate-400" /> Why this win estimate
            </h3>
            <ul className="space-y-2 mb-3">
              {verdictLines.map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  {line.positive
                    ? <ThumbsUp className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                    : <ThumbsDown className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                  }
                  <span className={`text-xs leading-snug ${line.positive ? "text-green-800" : "text-red-700"}`}>{line.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-slate-400 leading-snug border-t border-slate-100 pt-3">
              <span className="font-bold text-slate-500">Formula:</span> tier score difference + skill gap, anchored at 50%.
              S+ = 12 pts, S = 10, A = 6, B = 3, C = 0. Capped between 10–90%.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skill gap */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <h3 className="font-black font-display text-sm uppercase tracking-wide text-slate-900 mb-1">Skill Gap</h3>
        <p className="text-[10px] text-slate-400 mb-3">How does your team's average skill compare to the enemy?</p>
        <div className="flex justify-between text-[9px] font-bold font-display uppercase tracking-widest text-slate-400 mb-2">
          {skillGapLabels.map((l, i) => (
            <span key={i} className={skillGap === i ? "text-mlbb-accent" : ""}>{l}</span>
          ))}
        </div>
        <input
          type="range" min={0} max={4} value={skillGap}
          onChange={e => setSkillGap(Number(e.target.value))}
          className="w-full accent-mlbb-accent"
        />
        <div className="mt-3 flex items-start gap-2">
          <Info className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
          <p className="text-[10px] text-slate-500 leading-snug">
            <span className={`font-black ${skillGapValue >= 0 ? "text-green-600" : "text-red-600"}`}>
              {skillGapValue >= 0 ? "+" : ""}{skillGapValue} pts
            </span>
            {" · "}{skillGapExplain[skillGap]}
          </p>
        </div>

        {/* Tactical advice */}
        <AnimatePresence mode="wait">
          <motion.div
            key={skillGap}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mt-4 border-t border-slate-100 pt-4"
          >
            <p className="text-[9px] font-bold font-display uppercase tracking-widest text-slate-400 mb-2">
              Tactical Advice
            </p>
            <p className={`font-black font-display text-sm uppercase tracking-tight mb-3 ${skillGapTactics[skillGap].color}`}>
              {skillGapTactics[skillGap].headline}
            </p>
            <ul className="space-y-2">
              {skillGapTactics[skillGap].tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-base leading-none mt-0.5 shrink-0">{t.icon}</span>
                  <span className="text-xs text-slate-600 leading-snug">{t.tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
