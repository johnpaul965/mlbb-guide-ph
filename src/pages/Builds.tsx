import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Zap } from "lucide-react";
import ItemIcon from "../components/ItemIcon";

const powerCombos = [
  {
    name: "Physical Trinity",
    role: "Marksman / Fighter",
    color: "from-yellow-500 to-amber-400",
    border: "border-yellow-200",
    bg: "bg-yellow-50",
    badge: "bg-yellow-500",
    items: ["Demon Hunter Sword", "Corrosion Scythe", "Golden Staff"],
    why: "The strongest universal physical package in Patch 2.1.67a. DHS deals % HP damage per hit, Corrosion Scythe slows and extends the fight, and Golden Staff converts crit chance into extra attack speed — which is exactly what the first two items need to keep procing. The trio solves HP shred and attack-effect uptime simultaneously.",
    when: "Any basic-attack carry who fights tanks (Claude, Wanwan, Karrie, Argus). The default best-in-slot trio for on-hit heroes.",
  },
  {
    name: "Crit Core",
    role: "Marksman",
    color: "from-orange-500 to-yellow-400",
    border: "border-orange-200",
    bg: "bg-orange-50",
    badge: "bg-orange-500",
    items: ["Berserker's Fury", "Scarlet Phantom", "Great Dragon Spear"],
    why: "The correct crit trio for heroes that actually want crit scaling. Berserker's Fury is the crit-damage anchor, Scarlet Phantom raises attack speed after every crit, and Great Dragon Spear is the clean third slot when you need pure scaling — not Windtalker (wave-clear flex) and not Golden Staff (which wastes Berserker's Fury by converting crit into attack speed instead).",
    when: "Dedicated crit marksmen (Lesley, Beatrix sniper mode, Clint). Don't pair Golden Staff with Berserker's Fury — it wastes the crit damage.",
  },
  {
    name: "Pen Destroyer",
    role: "Physical Carry",
    color: "from-red-600 to-orange-500",
    border: "border-red-200",
    bg: "bg-red-50",
    badge: "bg-red-600",
    items: ["Demon Hunter Sword", "Malefic Roar", "Blade of Despair"],
    why: "The best anti-tank physical finisher. DHS punishes HP stacking with % damage, Malefic Roar ignores 40% of their armor, and Blade of Despair converts both into maximum burst. Not the strongest overall combo — but the strongest option specifically when the enemy stacks HP and armor.",
    when: "Enemy has 2+ real tanks or anyone stacking HP above 4,000. The more they build, the better this gets.",
  },
  {
    name: "Mage Burst Trio",
    role: "Mage",
    color: "from-blue-600 to-cyan-400",
    border: "border-blue-200",
    bg: "bg-blue-50",
    badge: "bg-blue-600",
    items: ["Lightning Truncheon", "Holy Crystal", "Divine Glaive"],
    why: "The best pure mage burst core. Lightning Truncheon delivers AoE procs early, Holy Crystal gives the biggest raw magic power spike in the game, and Divine Glaive is the anti-MR capstone that keeps the combo relevant when enemies start buying resistance.",
    when: "Any burst mage with fast skill rotations (Eudora, Vale, Lunox). Spike at item 2 and close games at item 3.",
  },
  {
    name: "Bruiser Core",
    role: "Fighter",
    color: "from-amber-600 to-orange-400",
    border: "border-amber-200",
    bg: "bg-amber-50",
    badge: "bg-amber-600",
    items: ["War Axe", "Endless Battle", "Queen's Wings"],
    why: "The real sustained-fight fighter engine. War Axe stacks true damage and CDR through the fight, Endless Battle adds more true damage after every skill cast, and Queen's Wings gives a clutch damage-reduction window exactly when enemies focus you. Blade of Despair is only correct as the third slot when you're snowballing on a fighter-assassin hybrid — not the default.",
    when: "Skill-heavy fighters in extended duels (Paquito, Dyrroth, Argus). Buy War Axe first; don't swap Queen's Wings for BoD unless you're already dominant.",
  },
  {
    name: "Survival Trinity",
    role: "Any Carry",
    color: "from-green-600 to-emerald-400",
    border: "border-green-200",
    bg: "bg-green-50",
    badge: "bg-green-600",
    items: ["Oracle", "Wind of Nature", "Immortality"],
    why: "Oracle amplifies every shield and heal you receive by 30%. Wind of Nature gives you 2 seconds of full physical immunity on demand. Immortality gives you a full second life. Together they give a carry three separate safety windows — enough to survive even the most coordinated dives.",
    when: "Solo queue or when you are the only carry. Buy at least two of these three in any game where you keep dying.",
  },
  {
    name: "Magic Sustain Set",
    role: "Mage / Support",
    color: "from-purple-600 to-violet-400",
    border: "border-purple-200",
    bg: "bg-purple-50",
    badge: "bg-purple-600",
    items: ["Concentrated Energy", "Oracle", "Blood Wings"],
    why: "Concentrated Energy gives spell vamp so every skill heals you. Oracle then amplifies that spell vamp healing by 30%. Blood Wings converts your AP into a massive shield that constantly refreshes. All three extend fight duration by making it nearly impossible to burst down a mage who has them.",
    when: "Sustained mages in long teamfights (Chang'e, Cecilion, Pharsa). Not for assassin-style mages who want to burst and escape.",
  },
];


const CATEGORIES = ["All", "Physical", "Magic", "Defense", "Sustain", "Penetration", "Attack Speed", "Utility"] as const;
type Category = typeof CATEGORIES[number];

const items = [
  // Physical
  { name: "Blade of Despair", category: "Physical", color: "bg-orange-500", tier: "S", tip: "Highest raw damage spike. Rush when enemy is squishy and you're ahead.", badge: "Peak DPS" },
  { name: "War Axe", category: "Physical", color: "bg-orange-400", tier: "S", tip: "Best first item for bruisers. Gives HP, CDR, and stacking true damage on every hit.", badge: "First Spike" },
  { name: "Endless Battle", category: "Physical", color: "bg-orange-400", tier: "A", tip: "True damage after skill use. Best on skill-heavy fighters and hybrid junglers.", badge: "Hybrid" },
  { name: "Berserker's Fury", category: "Physical", color: "bg-orange-500", tier: "A", tip: "Crit rate + crit damage for marksmen. Core on anyone with a crit kit.", badge: "Crit" },
  { name: "Scarlet Phantom", category: "Physical", color: "bg-orange-300", tier: "B", tip: "Pairs with Berserker's Fury to cap crit rate fast.", badge: "Crit" },
  { name: "Malefic Gun", category: "Physical", color: "bg-orange-400", tier: "A", tip: "Stacking penetration on consecutive hits. Best on marksmen who kite.", badge: "DPS" },
  { name: "Blade of the Heptaseas", category: "Physical", color: "bg-orange-400", tier: "A", tip: "Bonus damage on first basic after casting a skill. Burst assassin staple.", badge: "Burst" },
  { name: "Rose Gold Meteor", category: "Physical", color: "bg-pink-400", tier: "B", tip: "Lifeline shield when low HP. Good on fighters who need a safety net.", badge: "Safety" },
  { name: "Haas's Claws", category: "Physical", color: "bg-red-400", tier: "B", tip: "High lifesteal for sustained fighters. Stack HP and stay in fights.", badge: "Lifesteal" },
  { name: "Bloodlust Axe", category: "Physical", color: "bg-red-500", tier: "B", tip: "Spell vamp for skill-reliant fighters. Good early sustain option.", badge: "Spell Vamp" },

  // Magic
  { name: "Holy Crystal", category: "Magic", color: "bg-blue-500", tier: "S", tip: "Massive AP scaling — scales harder the more base magic you have. Core mage finisher.", badge: "Peak AP" },
  { name: "Lightning Truncheon", category: "Magic", color: "bg-cyan-400", tier: "S", tip: "AoE magic burst on cooldown. Pair with Enchanted Talisman for constant procs.", badge: "Burst" },
  { name: "Concentrated Energy", category: "Magic", color: "bg-blue-400", tier: "A", tip: "Spell vamp for mages. Keeps you alive in sustained fights.", badge: "Spell Vamp" },
  { name: "Genius Wand", category: "Magic", color: "bg-blue-300", tier: "A", tip: "Reduces enemy MR on hit. Best in team fights where multiple hits land.", badge: "MR Shred" },
  { name: "Glowing Wand", category: "Magic", color: "bg-amber-400", tier: "B", tip: "Burns enemies based on HP. Best against tanky enemies with no burst window.", badge: "DoT" },
  { name: "Clock of Destiny", category: "Magic", color: "bg-blue-400", tier: "A", tip: "Stacking HP+AP over time. Pairs with Lightning Truncheon for mana scaling.", badge: "Scaler" },
  { name: "Enchanted Talisman", category: "Magic", color: "bg-blue-300", tier: "A", tip: "Removes mana as a constraint. Best first item for mana-hungry mages.", badge: "CDR" },
  { name: "Blood Wings", category: "Magic", color: "bg-red-600", tier: "S", tip: "Converts AP into a massive shield. Best mage survivability finisher.", badge: "Shield" },
  { name: "Calamity Reaper", category: "Magic", color: "bg-purple-500", tier: "A", tip: "True damage proc after skills. Best on mages with fast skill rotations.", badge: "True DMG" },
  { name: "Fleeting Time", category: "Magic", color: "bg-purple-300", tier: "A", tip: "Resets ult cooldown after kills. Game-changing on high-ult-impact mages.", badge: "Ult Reset" },

  // Defense
  { name: "Immortality", category: "Defense", color: "bg-green-500", tier: "S", tip: "Revive on death. Buy when you're the primary target or dying changes the fight outcome.", badge: "Revive" },
  { name: "Athena's Shield", category: "Defense", color: "bg-green-400", tier: "S", tip: "Best single-magic-burst counter. 25% reduction shield every 30s.", badge: "vs Magic" },
  { name: "Radiant Armor", category: "Defense", color: "bg-green-400", tier: "A", tip: "Stacking MR on repeated magic hits. Buy this over Athena's vs sustained magic DPS.", badge: "vs Magic" },
  { name: "Antique Cuirass", category: "Defense", color: "bg-green-500", tier: "S", tip: "Reduces physical skill damage. Best tank item against physical carries.", badge: "vs Physical" },
  { name: "Dominance Ice", category: "Defense", color: "bg-cyan-500", tier: "S", tip: "Aura slows enemy attack speed and reduces healing. Buy vs any sustain hero.", badge: "Anti-Heal" },
  { name: "Thunder Belt", category: "Defense", color: "bg-yellow-500", tier: "S", tip: "Best value defense item. HP, both resistances, true-damage slow proc. Always efficient.", badge: "Best Value" },
  { name: "Blade Armor", category: "Defense", color: "bg-green-600", tier: "B", tip: "Reflects basic attack damage. Good vs full crit marksmen.", badge: "Reflect" },
  { name: "Guardian Helmet", category: "Defense", color: "bg-green-400", tier: "A", tip: "Massive HP + strong out-of-combat regen. Best on tanky roamers.", badge: "Regen" },

  // Sustain
  { name: "Oracle", category: "Sustain", color: "bg-mlbb-violet", tier: "S", tip: "Most underrated item. +30% to ALL shields and heals. Always outperforms a greed slot on sustain heroes.", badge: "Most Underrated" },
  { name: "Wind of Nature", category: "Sustain", color: "bg-emerald-400", tier: "S", tip: "2s physical immunity active. Counters any physical carry's burst window perfectly.", badge: "Anti-Physical" },
  { name: "Queen's Wings", category: "Sustain", color: "bg-purple-400", tier: "A", tip: "Damage reduction + vamp at low HP. Safety net for fighters who dive deep.", badge: "Safety" },
  { name: "Winter Crown", category: "Sustain", color: "bg-sky-400", tier: "S", tip: "Best situational item. Full invulnerability active. Erases enemy burst window.", badge: "Clutch" },
  { name: "Flask of the Oasis", category: "Sustain", color: "bg-teal-400", tier: "A", tip: "Heals weakest nearby ally. Pro-play support pick for keeping carries alive.", badge: "Support" },

  // Penetration
  { name: "Malefic Roar", category: "Penetration", color: "bg-red-500", tier: "S", tip: "40% physical pen. Makes enemy armor worthless late. Buy whenever they stack defense.", badge: "Anti-Armor" },
  { name: "Demon Hunter Sword", category: "Penetration", color: "bg-red-600", tier: "S", tip: "% HP damage on basics. Shreds tanks that stack HP. Best vs 2+ frontliners.", badge: "Anti-Tank" },
  { name: "Divine Glaive", category: "Penetration", color: "bg-blue-600", tier: "S", tip: "Magic pen that scales with enemy MR. The more MR they build, the better this gets.", badge: "Anti-MR" },
  { name: "Genius Wand", category: "Penetration", color: "bg-blue-400", tier: "A", tip: "Team-wide MR shred on hit. Best mage pen item when enemies are moderately tanky.", badge: "Shred" },
  { name: "Sea Halberd", category: "Penetration", color: "bg-red-400", tier: "A", tip: "Physical anti-heal + pen. Buy this the moment enemy lifesteal becomes a problem.", badge: "Anti-Heal" },
  { name: "Necklace of Durance", category: "Penetration", color: "bg-blue-400", tier: "A", tip: "Magic anti-heal. 50% grievous wounds on magic hits. Required vs Estes/Rafaela.", badge: "Anti-Heal" },

  // Attack Speed
  { name: "Golden Staff", category: "Attack Speed", color: "bg-yellow-400", tier: "A", tip: "Converts excess crit rate into attack speed. Best when crit is already capped.", badge: "Crit Convert" },
  { name: "Corrosion Scythe", category: "Attack Speed", color: "bg-green-500", tier: "B", tip: "Slows on hit. Good on marksmen who need stick potential.", badge: "Slow" },
  { name: "Windtalker", category: "Attack Speed", color: "bg-sky-300", tier: "B", tip: "AoE hit + movement speed. Early crit item, replaced by better items late.", badge: "Early Crit" },
  { name: "Feather of Heaven", category: "Attack Speed", color: "bg-yellow-300", tier: "B", tip: "Magic damage on basics. Niche on hybrid magic-basic heroes.", badge: "Hybrid" },

  // Utility
  { name: "Wishing Lantern", category: "Utility", color: "bg-amber-500", tier: "A", tip: "% HP magic damage on ult. Best mage anti-tank option when Divine Glaive isn't enough.", badge: "% HP DMG" },
  { name: "Starlium Scythe", category: "Utility", color: "bg-purple-500", tier: "A", tip: "True damage on first skill hit after basics. Best on auto-reset assassins.", badge: "True DMG" },
];

const tierOrder: Record<string, number> = { S: 0, A: 1, B: 2, C: 3 };
const tierColors: Record<string, string> = {
  S: "border-mlbb-accent text-mlbb-accent bg-mlbb-accent/10",
  A: "border-yellow-400 text-yellow-600 bg-yellow-400/10",
  B: "border-slate-400 text-slate-500 bg-slate-100",
};

export default function Builds() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = items
    .filter(item => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      const matchQuery = item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.tip.toLowerCase().includes(query.toLowerCase()) ||
        item.badge.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    })
    .sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-slate-900 mb-4">
          Item <span className="text-mlbb-accent">Rankings</span>
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-lg">
          Every major item rated, explained, and categorized for Patch 2.1.67a.
        </p>
      </motion.div>

      {/* Top 6 Spotlight */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-lg font-black font-display uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-mlbb-gold" /> Spotlight
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { emoji: "🏆", label: "Most Efficient", name: "Thunder Belt", note: "HP + both resistances + true-damage slow. Best stat-per-gold in the game." },
            { emoji: "⚠️", label: "Most Overrated", name: "Blade of Despair", note: "Skip it if you haven't solved penetration first — pen wins more duels." },
            { emoji: "💎", label: "Most Underrated", name: "Oracle", note: "+30% to every shield and heal. Consistently beats a greed slot on sustain heroes." },
            { emoji: "⚡", label: "Best First (Physical)", name: "War Axe", note: "HP, CDR, and stacking true damage. Best bruiser opener in the current meta." },
            { emoji: "🔵", label: "Best First (Magic)", name: "Enchanted Talisman", note: "Removes mana as a constraint permanently. Rush on any mana-hungry mage." },
            { emoji: "❄️", label: "Best Situational", name: "Winter Crown", note: "Full invulnerability on activation. One correctly-timed use flips a lost fight." },
          ].map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-mlbb-accent/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xl">{s.emoji}</span>
                <span className="text-[10px] font-black font-display uppercase tracking-widest text-slate-400">{s.label}</span>
              </div>
              <p className="text-base font-black font-display uppercase tracking-wide text-slate-900 mb-1">{s.name}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{s.note}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Power Combos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-lg font-black font-display uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-mlbb-accent" /> Strongest Item Combos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {powerCombos.map((combo, i) => (
            <motion.div
              key={combo.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className={`bg-white border-2 ${combo.border} rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-black font-display uppercase tracking-wide text-slate-900">{combo.name}</h3>
                  <span className={`inline-block mt-1 text-[10px] font-black font-display uppercase tracking-widest text-white px-2 py-0.5 rounded-lg ${combo.badge}`}>{combo.role}</span>
                </div>
              </div>

              {/* Item trio */}
              <div className="flex items-center gap-3 mb-4">
                {combo.items.map((item, idx) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <ItemIcon name={item} size="lg" />
                      <span className="text-[9px] font-bold font-display text-slate-500 text-center max-w-[48px] leading-tight">{item}</span>
                    </div>
                    {idx < combo.items.length - 1 && <span className="text-slate-300 font-black text-xl mb-4">+</span>}
                  </div>
                ))}
              </div>

              {/* Item names */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {combo.items.map(item => (
                  <span key={item} className={`text-xs font-bold px-2.5 py-1 rounded-lg ${combo.bg} text-slate-700`}>{item}</span>
                ))}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">{combo.why}</p>
              <div className="bg-slate-900 rounded-xl px-4 py-2.5">
                <span className="text-[10px] font-black font-display uppercase tracking-widest text-slate-400 mr-2">When:</span>
                <span className="text-xs text-slate-300">{combo.when}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search items…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-mlbb-accent/50 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black font-display uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-mlbb-accent text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs font-bold font-display uppercase tracking-widest text-slate-400 mb-4">
        {filtered.length} item{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
        {query ? ` · "${query}"` : ""}
      </p>

      {/* Item Grid */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={`${item.name}-${item.category}`}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-mlbb-accent/30 transition-colors shadow-sm"
            >
              <div className="flex items-start gap-4">
                <ItemIcon name={item.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black font-display text-slate-900 uppercase tracking-wide text-sm leading-tight truncate">{item.name}</h3>
                    <span className={`shrink-0 text-[10px] font-black font-display border px-1.5 py-0.5 rounded ${tierColors[item.tier]}`}>{item.tier}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold font-display uppercase tracking-widest text-slate-400">{item.category}</span>
                    <span className="text-[10px] font-black font-display uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg">{item.badge}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.tip}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24"
        >
          <p className="text-2xl font-black font-display uppercase tracking-wide text-slate-300 mb-2">No Items Found</p>
          <p className="text-slate-400 text-sm">Try a different search or category.</p>
        </motion.div>
      )}
    </div>
  );
}
