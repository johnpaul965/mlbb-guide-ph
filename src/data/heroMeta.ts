export interface HeroMechRatings {
  damage: number;
  burst: number;
  dps: number;
  mobility: number;
  sustain: number;
  durability: number;
  cc: number;
  teamfight: number;
  objective: number;
  splitPush: number;
  carry: number;
  difficulty: number;
}

export interface HeroAnalysis {
  role: string;
  winCondition: string;
  strengths: string;
  weaknesses: string;
  powerSpikes: string;
  scalingEarly: number;
  scalingMid: number;
  scalingLate: number;
}

export interface HeroEmblem {
  name: string;
  talents: string;
  note: string;
}

export interface HeroMatchups {
  strongAgainst: string;
  weakAgainst: string;
  hardCounters: string[];
  bestAllies: string[];
  banPriorities: string[];
}

export interface HeroVerdict {
  bestBuild: string;
  bestEmblem: string;
  bestSpell: string;
  tier: string;
  carryPotential: number;
  difficulty: number;
  overallPower: number;
}

export interface HeroMeta {
  mechanics: HeroMechRatings;
  analysis: HeroAnalysis;
  emblems: HeroEmblem[];
  spells: string[];
  matchups: HeroMatchups;
  verdict: HeroVerdict;
}

export const heroMeta: Record<string, HeroMeta> = {
  "fanny": {
    mechanics: { damage: 9, burst: 10, dps: 7, mobility: 10, sustain: 3, durability: 4, cc: 1, teamfight: 6, objective: 7, splitPush: 8, carry: 10, difficulty: 10 },
    analysis: { role: "Jungle Assassin", winCondition: "Get one early kill, convert it into Turtle control, then keep the map hostage.", strengths: "Fastest access, strongest pick pressure, best shutdown on immobile backlines.", weaknesses: "Anti-cable hard stops, energy dependence, high shutdown risk.", powerSpikes: "Level 4, first damage item, blue buff control, 2-item dive window.", scalingEarly: 9, scalingMid: 10, scalingLate: 7 },
    emblems: [
      { name: "Assassin", talents: "Rupture / Master Assassin / Killing Spree", note: "Best overall" },
      { name: "Fighter", talents: "Firmness / Festival of Blood / Brave Smite", note: "Best defensive bruiser path" },
      { name: "Assassin", talents: "Rupture / Master Assassin / Lethal Ignition", note: "Best snowball burst path" },
    ],
    spells: ["Retribution (Ice)", "Flicker", "Purify"],
    matchups: { strongAgainst: "Immobile mages/marksmen and split backlines.", weakAgainst: "Grouped peel and any draft that can force her off flight.", hardCounters: ["Franco", "Khufra", "Saber", "Akai", "Chou", "Minsitthar"], bestAllies: ["Diggie", "Mathilda", "Atlas", "Tigreal", "Angela"], banPriorities: ["Franco", "Khufra", "Saber", "Akai"] },
    verdict: { bestBuild: "Core", bestEmblem: "Assassin", bestSpell: "Retribution", tier: "S — top-end but draft-sensitive", carryPotential: 10, difficulty: 10, overallPower: 9 },
  },
  "ling": {
    mechanics: { damage: 8, burst: 8, dps: 8, mobility: 10, sustain: 4, durability: 5, cc: 2, teamfight: 7, objective: 7, splitPush: 9, carry: 10, difficulty: 9 },
    analysis: { role: "Jungle Assassin", winCondition: "Pick off the backline before the enemy front line can collapse.", strengths: "Unmatched terrain access, excellent cleanup, strong map pressure.", weaknesses: "Blue-buff dependence, anti-dash counters, weak blind-pick reliability.", powerSpikes: "First crit item, 2-item reset, walls plus ult.", scalingEarly: 7, scalingMid: 10, scalingLate: 8 },
    emblems: [
      { name: "Assassin", talents: "Fatal / Seasoned Hunter / War Cry", note: "Best overall" },
      { name: "Assassin", talents: "Fatal / Seasoned Hunter / Killing Spree", note: "Best aggressive setup" },
      { name: "Assassin", talents: "Rupture / Seasoned Hunter / War Cry", note: "Best scaling versus armor" },
    ],
    spells: ["Retribution (Ice)", "Flame Retribution", "Flicker"],
    matchups: { strongAgainst: "Immobile backlines and comps that cannot stop wall access.", weakAgainst: "Hard anti-dash and point-click lockdown.", hardCounters: ["Khufra", "Franco", "Saber", "Kaja", "Minsitthar", "Valir"], bestAllies: ["Diggie", "Mathilda", "Angela", "Atlas"], banPriorities: ["Khufra", "Franco", "Saber", "Kaja", "Minsitthar"] },
    verdict: { bestBuild: "Core", bestEmblem: "Assassin", bestSpell: "Retribution (Ice)", tier: "S — high but conditional", carryPotential: 10, difficulty: 9, overallPower: 9 },
  },
  "hayabusa": {
    mechanics: { damage: 8, burst: 9, dps: 7, mobility: 9, sustain: 4, durability: 4, cc: 1, teamfight: 5, objective: 7, splitPush: 10, carry: 9, difficulty: 8 },
    analysis: { role: "Jungle Assassin", winCondition: "Isolate a carry, kill them, and leave before the enemy frontline can react.", strengths: "Extreme side-lane threat, excellent cleanup, strong escape routes.", weaknesses: "Group fights, hard CC, point-and-click burst.", powerSpikes: "Level 4, first mobility item, first execute item.", scalingEarly: 8, scalingMid: 10, scalingLate: 7 },
    emblems: [
      { name: "Assassin", talents: "Rupture / Seasoned Hunter / Killing Spree", note: "Best overall" },
      { name: "Assassin", talents: "Rupture / Seasoned Hunter / Lethal Ignition", note: "Best aggressive setup" },
      { name: "Assassin", talents: "Rupture / Seasoned Hunter / War Cry", note: "Best scaling setup" },
    ],
    spells: ["Retribution (Ice)", "Flame Retribution", "Flicker"],
    matchups: { strongAgainst: "Immobile backlines and single-target squishies.", weakAgainst: "Hard point-click CC and large persistent AoE zones.", hardCounters: ["Kaja", "Franco", "Saber", "Phoveus", "Cyclops", "Valir"], bestAllies: ["Atlas", "Tigreal", "Diggie", "Mathilda", "Angela"], banPriorities: ["Kaja", "Franco", "Saber", "Phoveus", "Valir"] },
    verdict: { bestBuild: "Core", bestEmblem: "Assassin", bestSpell: "Retribution (Ice)", tier: "A — high, but draft-sensitive", carryPotential: 9, difficulty: 8, overallPower: 8 },
  },
  "lancelot": {
    mechanics: { damage: 8, burst: 9, dps: 7, mobility: 9, sustain: 4, durability: 4, cc: 2, teamfight: 6, objective: 6, splitPush: 8, carry: 9, difficulty: 8 },
    analysis: { role: "Jungle Assassin", winCondition: "One clean backline delete, then a second dive if the fight continues.", strengths: "I-frame abuse, clean pick pressure, excellent skirmish tempo.", weaknesses: "Suppress, persistent AoE, missing your combo window.", powerSpikes: "First CDR/tempo item, 2-item burst, snowball stacks.", scalingEarly: 7, scalingMid: 10, scalingLate: 7 },
    emblems: [
      { name: "Assassin", talents: "Rupture / Seasoned Hunter / Killing Spree", note: "Best overall" },
      { name: "Assassin", talents: "Rupture / Seasoned Hunter / Lethal Ignition", note: "Best aggressive setup" },
      { name: "Assassin", talents: "Rupture / Seasoned Hunter / War Cry", note: "Best scaling setup" },
    ],
    spells: ["Retribution (Ice)", "Flame Retribution", "Flicker"],
    matchups: { strongAgainst: "Skill-shot-heavy drafts and immobile backlines.", weakAgainst: "Suppress, point-and-click CC, and heavy persistent AoE.", hardCounters: ["Kaja", "Franco", "Saber", "Phoveus", "Cyclops", "Valir"], bestAllies: ["Atlas", "Tigreal", "Mathilda", "Angela", "Diggie"], banPriorities: ["Kaja", "Franco", "Saber", "Phoveus", "Cyclops"] },
    verdict: { bestBuild: "Core", bestEmblem: "Assassin", bestSpell: "Retribution (Ice)", tier: "A — high-skill niche", carryPotential: 9, difficulty: 8, overallPower: 8 },
  },
  "helcurt": {
    mechanics: { damage: 8, burst: 8, dps: 7, mobility: 7, sustain: 4, durability: 4, cc: 6, teamfight: 7, objective: 6, splitPush: 6, carry: 8, difficulty: 7 },
    analysis: { role: "Jungle Assassin / Roam", winCondition: "Make the enemy carry lose visibility, then delete them before the fight becomes readable.", strengths: "Silence, fog pressure, ambush threat, strong into low-peel drafts.", weaknesses: "Hard lockdown, short-range entry, falling off into dense frontlines.", powerSpikes: "First damage item, level 4 darkness, 2-item kill window.", scalingEarly: 8, scalingMid: 9, scalingLate: 6 },
    emblems: [
      { name: "Assassin", talents: "Rupture / Seasoned Hunter / Killing Spree", note: "Best overall" },
      { name: "Assassin", talents: "Rupture / Master Assassin / Lethal Ignition", note: "Best aggressive burst setup" },
      { name: "Assassin", talents: "Rupture / Seasoned Hunter / War Cry", note: "Best scaling/anti-frontline setup" },
    ],
    spells: ["Retribution (Flame)", "Petrify", "Flicker"],
    matchups: { strongAgainst: "Squishy, vision-dependent drafts and isolated carries.", weakAgainst: "Hard peel, point-click control, and teams that can layer CC on reaction.", hardCounters: ["Diggie", "Kaja", "Franco", "Saber", "Valir", "Minsitthar"], bestAllies: ["Atlas", "Tigreal", "Khufra", "Mathilda", "Angela"], banPriorities: ["Diggie", "Kaja", "Franco", "Saber", "Valir"] },
    verdict: { bestBuild: "Core", bestEmblem: "Assassin", bestSpell: "Retribution (Flame)", tier: "A — matchup assassin", carryPotential: 8, difficulty: 7, overallPower: 7 },
  },
  "sora": {
    mechanics: { damage: 7, burst: 7, dps: 6, mobility: 7, sustain: 7, durability: 7, cc: 6, teamfight: 7, objective: 6, splitPush: 6, carry: 7, difficulty: 6 },
    analysis: { role: "EXP Lane Fighter/Assassin", winCondition: "Choose Thunder to cash out a lead, or Torrent to start the fight your team wants.", strengths: "Flexible form choice, solid bruiser tempo, meaningful front-to-back and engage value.", weaknesses: "Loses value if you force the wrong form, or build him as a fake assassin without enough uptime.", powerSpikes: "First item, second item, first good form conversion.", scalingEarly: 7, scalingMid: 8, scalingLate: 8 },
    emblems: [
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Best overall" },
      { name: "Fighter", talents: "Vitality / Festival of Blood / Temporal Reign", note: "Best defensive/frontline setup" },
      { name: "Fighter", talents: "Vitality / Seasoned Hunter / Temporal Reign", note: "Best scaling/objective setup" },
    ],
    spells: ["Flicker", "Vengeance", "Retribution"],
    matchups: { strongAgainst: "Short-range melee lanes and backlines that cannot respect his approach.", weakAgainst: "Long-range poke and drafts that deny clean entry.", hardCounters: ["Kaja", "Franco", "Valir", "Lolita"], bestAllies: ["Atlas", "Tigreal", "Minotaur", "Diggie", "Angela"], banPriorities: ["Kaja", "Franco", "Valir", "Lolita"] },
    verdict: { bestBuild: "Core", bestEmblem: "Fighter", bestSpell: "Flicker", tier: "A — strong bruiser, not a blind pick", carryPotential: 7, difficulty: 6, overallPower: 7 },
  },
  "claude": {
    mechanics: { damage: 8, burst: 6, dps: 10, mobility: 8, sustain: 4, durability: 5, cc: 2, teamfight: 8, objective: 8, splitPush: 7, carry: 8, difficulty: 7 },
    analysis: { role: "Gold Lane Marksman", winCondition: "Enter fights after enemy CC is used, then maximize Blazing Duet uptime.", strengths: "Strong AoE, fast wave pressure, good tower taking with attack speed.", weaknesses: "Vulnerable before items, weak into hard burst/lockdown, needs clean ult timing.", powerSpikes: "First attack-speed item, level 4, two-item duelist window.", scalingEarly: 5, scalingMid: 8, scalingLate: 10 },
    emblems: [
      { name: "Marksman", talents: "Fatal / Weapon Master / Quantum Charge", note: "Best overall" },
      { name: "Assassin", talents: "Rupture / Weapon Master / Killing Spree", note: "Best cleanup/reset option" },
      { name: "Fighter", talents: "Vitality / Weapon Master / Festival of Blood", note: "Best defensive fallback" },
    ],
    spells: ["Inspire", "Flicker", "Purify"],
    matchups: { strongAgainst: "Short-range front-to-back drafts and tank-heavy teams.", weakAgainst: "Burst assassins and point-click CC.", hardCounters: ["Saber", "Kaja", "Franco", "Khufra", "Minsitthar"], bestAllies: ["Atlas", "Tigreal", "Diggie", "Mathilda", "Angela"], banPriorities: ["Khufra", "Franco", "Saber", "Kaja"] },
    verdict: { bestBuild: "Core", bestEmblem: "Marksman", bestSpell: "Inspire", tier: "A", carryPotential: 8, difficulty: 7, overallPower: 8 },
  },
  "wanwan": {
    mechanics: { damage: 8, burst: 8, dps: 9, mobility: 10, sustain: 4, durability: 4, cc: 2, teamfight: 9, objective: 7, splitPush: 8, carry: 10, difficulty: 9 },
    analysis: { role: "Gold Lane Marksman", winCondition: "Trigger Crossbow of Tang in a fight the enemy already committed to.", strengths: "Extreme mobility, hard to lock, brutal cleanup.", weaknesses: "Weak pre-ult, sensitive to range control, punished if she cannot reposition.", powerSpikes: "First attack-speed item, ult access, two-item kiting window.", scalingEarly: 4, scalingMid: 8, scalingLate: 10 },
    emblems: [
      { name: "Marksman", talents: "Fatal / Weapon Master / Quantum Charge", note: "Best overall" },
      { name: "Assassin", talents: "Rupture / Master Assassin / Killing Spree", note: "Best pure cleanup" },
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Best defensive option" },
    ],
    spells: ["Purify", "Inspire", "Flicker"],
    matchups: { strongAgainst: "Slow tanks and drafts without reliable lockdown.", weakAgainst: "Long-range poke and instant CC.", hardCounters: ["Khufra", "Franco", "Saber", "Kaja", "Minsitthar", "Valir"], bestAllies: ["Diggie", "Minotaur", "Atlas", "Mathilda", "Angela"], banPriorities: ["Khufra", "Franco", "Kaja", "Valir"] },
    verdict: { bestBuild: "Core", bestEmblem: "Marksman", bestSpell: "Purify", tier: "S/A", carryPotential: 10, difficulty: 9, overallPower: 9 },
  },
  "karrie": {
    mechanics: { damage: 8, burst: 5, dps: 10, mobility: 5, sustain: 5, durability: 4, cc: 2, teamfight: 7, objective: 9, splitPush: 7, carry: 8, difficulty: 6 },
    analysis: { role: "Gold Lane Marksman", winCondition: "Hit consistent auto-attack uptime into HP-stacked targets.", strengths: "Unmatched tank shredding, excellent objective burn, simple execution.", weaknesses: "Short range, vulnerable to burst and heavy poke, less explosive into squishy drafts.", powerSpikes: "First attack-speed core, two-item shred window, late-game on-hit setup.", scalingEarly: 5, scalingMid: 8, scalingLate: 10 },
    emblems: [
      { name: "Marksman", talents: "Fatal / Weapon Master / Quantum Charge", note: "Best overall" },
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Best when you need durability" },
      { name: "Assassin", talents: "Rupture / Weapon Master / Killing Spree", note: "Best aggressive option" },
    ],
    spells: ["Inspire", "Flicker", "Purify"],
    matchups: { strongAgainst: "High-HP front lines, damage-reduction tanks, and objective contests.", weakAgainst: "Long-range burst and hard dive.", hardCounters: ["Franco", "Saber", "Khufra", "Kaja", "Chou"], bestAllies: ["Atlas", "Tigreal", "Diggie", "Angela", "Minotaur"], banPriorities: ["Khufra", "Franco", "Saber", "Kaja"] },
    verdict: { bestBuild: "Core", bestEmblem: "Marksman", bestSpell: "Inspire", tier: "A/S", carryPotential: 8, difficulty: 6, overallPower: 8 },
  },
  "beatrix": {
    mechanics: { damage: 9, burst: 10, dps: 7, mobility: 5, sustain: 3, durability: 4, cc: 2, teamfight: 8, objective: 8, splitPush: 7, carry: 9, difficulty: 9 },
    analysis: { role: "Gold Lane Marksman", winCondition: "Choose the correct weapon for the enemy shape and force them to answer your range.", strengths: "Burst flexibility, lane control, high ceiling, multiple fight patterns.", weaknesses: "Skill-heavy, punished by mispositioning, worse when you pick the wrong gun for the draft.", powerSpikes: "First damage item, level 4, two-item burst or DPS conversion.", scalingEarly: 7, scalingMid: 9, scalingLate: 9 },
    emblems: [
      { name: "Marksman", talents: "Fatal / Weapon Master / Quantum Charge", note: "Best overall" },
      { name: "Assassin", talents: "Rupture / Master Assassin / Lethal Ignition", note: "Best for burst gun styles" },
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Best for safety" },
    ],
    spells: ["Flicker", "Inspire", "Purify"],
    matchups: { strongAgainst: "Teams that can't close distance cleanly.", weakAgainst: "Hard dive and instant suppression.", hardCounters: ["Khufra", "Franco", "Kaja", "Saber", "Minsitthar"], bestAllies: ["Atlas", "Tigreal", "Diggie", "Angela", "Mathilda"], banPriorities: ["Khufra", "Franco", "Kaja", "Saber"] },
    verdict: { bestBuild: "Core", bestEmblem: "Marksman", bestSpell: "Flicker", tier: "A", carryPotential: 9, difficulty: 9, overallPower: 8 },
  },
  "granger": {
    mechanics: { damage: 8, burst: 9, dps: 5, mobility: 6, sustain: 3, durability: 4, cc: 1, teamfight: 6, objective: 6, splitPush: 5, carry: 8, difficulty: 6 },
    analysis: { role: "Gold Lane Marksman / Jungle", winCondition: "Land repeated skill cycles and finish with ult shots.", strengths: "Strong burst, wave punish, reliable tempo if ahead.", weaknesses: "Lower sustained damage than on-hit MMs, punished in extended tank fights.", powerSpikes: "First burst item, level 4 ult, two-item poke window.", scalingEarly: 7, scalingMid: 8, scalingLate: 7 },
    emblems: [
      { name: "Assassin", talents: "Rupture / Master Assassin / Lethal Ignition", note: "Best overall" },
      { name: "Marksman", talents: "Fatal / Weapon Master / Quantum Charge", note: "Best for safer scaling" },
      { name: "Mage", talents: "Rupture / Bargain Hunter / Lethal Ignition", note: "Niche max-burst variant" },
    ],
    spells: ["Flicker", "Inspire", "Purify"],
    matchups: { strongAgainst: "Squishies and teams that let him free-cast.", weakAgainst: "Heavy dive and sustained frontlines.", hardCounters: ["Saber", "Kaja", "Franco", "Khufra", "Valir"], bestAllies: ["Atlas", "Tigreal", "Diggie", "Angela", "Mathilda"], banPriorities: ["Khufra", "Franco", "Kaja", "Saber"] },
    verdict: { bestBuild: "Core", bestEmblem: "Assassin", bestSpell: "Flicker", tier: "A", carryPotential: 8, difficulty: 6, overallPower: 7 },
  },
  "yi-sun-shin": {
    mechanics: { damage: 7, burst: 7, dps: 7, mobility: 6, sustain: 3, durability: 4, cc: 3, teamfight: 7, objective: 9, splitPush: 7, carry: 8, difficulty: 7 },
    analysis: { role: "Jungle / Gold Lane", winCondition: "Create map advantages with ult information, then finish with mixed damage.", strengths: "Objective value, long-range vision pressure, flexible damage profile.", weaknesses: "Lower raw lane bullying than top gold laners, mediocre front-to-back if behind.", powerSpikes: "First damage item, ult vision, two-item global pressure.", scalingEarly: 6, scalingMid: 8, scalingLate: 8 },
    emblems: [
      { name: "Assassin", talents: "Rupture / Seasoned Hunter / Killing Spree", note: "Best overall for jungle" },
      { name: "Marksman", talents: "Fatal / Weapon Master / Quantum Charge", note: "Best if played as lane carry" },
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Defensive fallback" },
    ],
    spells: ["Retribution", "Flicker", "Purify"],
    matchups: { strongAgainst: "Slower drafts and objective contests.", weakAgainst: "Hard dive and direct lane killers.", hardCounters: ["Franco", "Saber", "Kaja", "Khufra", "Valir"], bestAllies: ["Atlas", "Diggie", "Angela", "Minotaur", "Tigreal"], banPriorities: ["Khufra", "Franco", "Saber", "Kaja"] },
    verdict: { bestBuild: "Core", bestEmblem: "Assassin", bestSpell: "Retribution", tier: "A", carryPotential: 8, difficulty: 7, overallPower: 7 },
  },
  "hanabi": {
    mechanics: { damage: 7, burst: 5, dps: 8, mobility: 3, sustain: 5, durability: 6, cc: 3, teamfight: 9, objective: 7, splitPush: 6, carry: 7, difficulty: 4 },
    analysis: { role: "Gold Lane Marksman", winCondition: "Build a stable shielded damage loop and punish clumped teams.", strengths: "Teamfight bounce damage, anti-CC shield utility, low execution tax.", weaknesses: "Limited mobility, weaker against isolated duels, needs items to matter.", powerSpikes: "First crit/on-hit item, shield uptime, late-game teamfight.", scalingEarly: 5, scalingMid: 8, scalingLate: 9 },
    emblems: [
      { name: "Marksman", talents: "Fatal / Weapon Master / Quantum Charge", note: "Best overall" },
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Best defensive fallback" },
      { name: "Assassin", talents: "Rupture / Weapon Master / Killing Spree", note: "Best aggressive cleanup" },
    ],
    spells: ["Inspire", "Purify", "Flicker"],
    matchups: { strongAgainst: "Grouped teams and slow frontlines.", weakAgainst: "Hard dive and poke-heavy comps.", hardCounters: ["Saber", "Kaja", "Franco", "Khufra", "Fanny"], bestAllies: ["Atlas", "Tigreal", "Diggie", "Angela", "Minotaur"], banPriorities: ["Khufra", "Franco", "Saber", "Kaja"] },
    verdict: { bestBuild: "Core", bestEmblem: "Marksman", bestSpell: "Inspire", tier: "A", carryPotential: 7, difficulty: 4, overallPower: 7 },
  },
  "kimmy": {
    mechanics: { damage: 7, burst: 6, dps: 8, mobility: 8, sustain: 4, durability: 4, cc: 3, teamfight: 7, objective: 7, splitPush: 6, carry: 7, difficulty: 7 },
    analysis: { role: "Gold Lane / Jungle", winCondition: "Keep moving while outputting stable spray damage and kiting slower fronts.", strengths: "Movement while attacking, flexible damage conversion, good poke pattern.", weaknesses: "Short range issues, vulnerable if cornered, non-intuitive item path.", powerSpikes: "First conversion item, magic power threshold, mid-game poke control.", scalingEarly: 6, scalingMid: 8, scalingLate: 8 },
    emblems: [
      { name: "Mage", talents: "Rupture / Bargain Hunter / Lethal Ignition", note: "Best overall — matches magic conversion" },
      { name: "Marksman", talents: "Fatal / Weapon Master / Quantum Charge", note: "Best for sustained hybrid version" },
      { name: "Support", talents: "Agility / Pull Yourself Together / Impure Rage", note: "Defensive poke alternative" },
    ],
    spells: ["Flicker", "Aegis", "Purify"],
    matchups: { strongAgainst: "Slower front lines and medium-range poke wars.", weakAgainst: "Hard dive and highly mobile assassins.", hardCounters: ["Saber", "Kaja", "Franco", "Khufra", "Fanny"], bestAllies: ["Atlas", "Tigreal", "Diggie", "Angela", "Minotaur"], banPriorities: ["Khufra", "Franco", "Saber", "Kaja"] },
    verdict: { bestBuild: "Core", bestEmblem: "Mage", bestSpell: "Flicker", tier: "B+/A-", carryPotential: 7, difficulty: 7, overallPower: 7 },
  },
  "valentina": {
    mechanics: { damage: 8, burst: 8, dps: 6, mobility: 8, sustain: 3, durability: 4, cc: 5, teamfight: 10, objective: 4, splitPush: 3, carry: 9, difficulty: 8 },
    analysis: { role: "Mid Lane Mage", winCondition: "Out-tempo enemy mid, hit Lv4 first, then steal a fight-winning ultimate.", strengths: "Draft flexibility, high outplay ceiling, elite teamfight swing.", weaknesses: "Damage drops if enemy ults are weak; punished if she builds too greedily.", powerSpikes: "Lv4, first pen item, two-item breakpoint.", scalingEarly: 8, scalingMid: 10, scalingLate: 8 },
    emblems: [
      { name: "Mage", talents: "Flow / Observation / Impure Rage", note: "Best overall" },
      { name: "Mage", talents: "Flow / Observation / Lethal Ignition", note: "Best aggressive" },
      { name: "Support", talents: "Agility / Pull Yourself Together / Focusing Mark", note: "Defensive utility" },
    ],
    spells: ["Flicker", "Purify", "Flameshot"],
    matchups: { strongAgainst: "Slow teamfight comps and low-utility enemy ults.", weakAgainst: "Clean burst dive and drafts that deny safe copying windows.", hardCounters: ["Kaja", "Franco", "Saber", "Khufra", "Valir"], bestAllies: ["Atlas", "Tigreal", "Minotaur", "Diggie", "Mathilda"], banPriorities: ["Kaja", "Franco", "Khufra", "Saber"] },
    verdict: { bestBuild: "Core", bestEmblem: "Mage", bestSpell: "Flicker", tier: "S/A", carryPotential: 9, difficulty: 8, overallPower: 9 },
  },
  "kagura": {
    mechanics: { damage: 8, burst: 9, dps: 6, mobility: 9, sustain: 3, durability: 4, cc: 5, teamfight: 8, objective: 4, splitPush: 3, carry: 8, difficulty: 8 },
    analysis: { role: "Mid Lane Mage", winCondition: "Win lane through poke, then convert every enemy misstep into a pick.", strengths: "Flexible poke, strong skirmish, excellent safety if played cleanly.", weaknesses: "Mechanical demand, weaker if you miss umbrella management, vulnerable to hard dive.", powerSpikes: "Lv4, first pen item, two-item burst.", scalingEarly: 8, scalingMid: 9, scalingLate: 8 },
    emblems: [
      { name: "Mage", talents: "Flow / Observation / Impure Rage", note: "Best overall" },
      { name: "Mage", talents: "Flow / Observation / Lethal Ignition", note: "Best aggressive burst" },
      { name: "Support", talents: "Agility / Pull Yourself Together / Focusing Mark", note: "Best defensive utility" },
    ],
    spells: ["Flicker", "Purify", "Flameshot"],
    matchups: { strongAgainst: "Immobile mids, short-range mages, clumped teamfights.", weakAgainst: "Hard dive and long-range poke that outranges umbrella control.", hardCounters: ["Franco", "Kaja", "Saber", "Khufra", "Valir"], bestAllies: ["Atlas", "Tigreal", "Minotaur", "Diggie", "Mathilda"], banPriorities: ["Khufra", "Franco", "Kaja", "Saber"] },
    verdict: { bestBuild: "Core", bestEmblem: "Mage", bestSpell: "Flicker", tier: "A/S", carryPotential: 8, difficulty: 8, overallPower: 8 },
  },
  "zhuxin": {
    mechanics: { damage: 6, burst: 6, dps: 5, mobility: 5, sustain: 4, durability: 5, cc: 10, teamfight: 10, objective: 5, splitPush: 2, carry: 8, difficulty: 7 },
    analysis: { role: "Mid Lane Mage", winCondition: "Drag fights into your control zones and make the enemy spend dashes badly.", strengths: "Disruption, zoning, teamfight control, huge setup value.", weaknesses: "Damage is not the point; highly mobile enemies can escape her control patterns.", powerSpikes: "Lv4, first CDR item, teamfight choke points.", scalingEarly: 7, scalingMid: 9, scalingLate: 8 },
    emblems: [
      { name: "Mage", talents: "Flow / Observation / Impure Rage", note: "Best overall" },
      { name: "Mage", talents: "Flow / Observation / Lethal Ignition", note: "Aggressive alternate" },
      { name: "Support", talents: "Agility / Pull Yourself Together / Focusing Mark", note: "Defensive utility route" },
    ],
    spells: ["Flicker", "Flameshot", "Purify"],
    matchups: { strongAgainst: "Short-range teams, grouped drafts, slow frontline comps.", weakAgainst: "Dash-heavy heroes and dive that exits her control radius.", hardCounters: ["Fanny", "Ling", "Hayabusa", "Joy", "Saber"], bestAllies: ["Atlas", "Tigreal", "Minotaur", "Khufra", "Diggie"], banPriorities: ["Fanny", "Ling", "Saber", "Joy"] },
    verdict: { bestBuild: "Core", bestEmblem: "Mage", bestSpell: "Flicker", tier: "A", carryPotential: 8, difficulty: 7, overallPower: 7 },
  },
  "luo-yi": {
    mechanics: { damage: 7, burst: 6, dps: 6, mobility: 6, sustain: 3, durability: 4, cc: 8, teamfight: 9, objective: 5, splitPush: 3, carry: 8, difficulty: 7 },
    analysis: { role: "Mid Lane Mage", winCondition: "Stack sigils, force Yin-Yang reaction, and turn grouped fights into map collapse.", strengths: "Teamfight utility, rotation speed, punish on clumped enemies.", weaknesses: "Needs setup; less impressive if fights are scattered.", powerSpikes: "Lv4, first CDR item, first team rotation.", scalingEarly: 7, scalingMid: 9, scalingLate: 8 },
    emblems: [
      { name: "Mage", talents: "Flow / Observation / Impure Rage", note: "Best overall" },
      { name: "Mage", talents: "Flow / Observation / Lethal Ignition", note: "Aggressive option" },
      { name: "Support", talents: "Agility / Pull Yourself Together / Focusing Mark", note: "Defensive utility option" },
    ],
    spells: ["Flicker", "Purify", "Flameshot"],
    matchups: { strongAgainst: "Grouped teams, slow rotations, front-to-back brawls.", weakAgainst: "Spread formations and highly mobile dive.", hardCounters: ["Ling", "Fanny", "Hayabusa", "Saber", "Kaja"], bestAllies: ["Atlas", "Tigreal", "Minotaur", "Khufra", "Diggie"], banPriorities: ["Ling", "Fanny", "Saber", "Kaja"] },
    verdict: { bestBuild: "Core", bestEmblem: "Mage", bestSpell: "Flicker", tier: "A", carryPotential: 8, difficulty: 7, overallPower: 8 },
  },
  "lylia": {
    mechanics: { damage: 8, burst: 8, dps: 6, mobility: 9, sustain: 4, durability: 5, cc: 4, teamfight: 8, objective: 5, splitPush: 4, carry: 8, difficulty: 7 },
    analysis: { role: "Mid Lane Mage", winCondition: "Win short trades, then chain explosive bomb cycles and reset safely.", strengths: "Excellent mobility, strong anti-dive, great lane harassment.", weaknesses: "Can be forced out if she burns ult poorly; range is not endless.", powerSpikes: "Lv4, first CDR/mana item, first full bomb cycle.", scalingEarly: 8, scalingMid: 9, scalingLate: 8 },
    emblems: [
      { name: "Mage", talents: "Flow / Observation / Impure Rage", note: "Best overall" },
      { name: "Mage", talents: "Flow / Observation / Lethal Ignition", note: "Aggressive burst variant" },
      { name: "Support", talents: "Agility / Pull Yourself Together / Focusing Mark", note: "Defensive utility variant" },
    ],
    spells: ["Flicker", "Purify", "Flameshot"],
    matchups: { strongAgainst: "Melee divers, clumped teamfights, close-range mids.", weakAgainst: "Long-range poke and hard backline access.", hardCounters: ["Fanny", "Ling", "Saber", "Joy", "Kaja"], bestAllies: ["Atlas", "Tigreal", "Minotaur", "Khufra", "Diggie"], banPriorities: ["Fanny", "Ling", "Saber", "Kaja"] },
    verdict: { bestBuild: "Core", bestEmblem: "Mage", bestSpell: "Flicker", tier: "A", carryPotential: 8, difficulty: 7, overallPower: 8 },
  },
  "gord": {
    mechanics: { damage: 8, burst: 8, dps: 8, mobility: 2, sustain: 3, durability: 3, cc: 6, teamfight: 9, objective: 4, splitPush: 2, carry: 7, difficulty: 5 },
    analysis: { role: "Mid Lane Mage", winCondition: "Land the stun and channel beam damage in fights where enemies are already disrupted.", strengths: "Very high zone damage, excellent punish in choke points.", weaknesses: "Stationary channeling, vulnerable to dive, needs protection.", powerSpikes: "Lv4, first CDR item, first pen item.", scalingEarly: 6, scalingMid: 9, scalingLate: 8 },
    emblems: [
      { name: "Mage", talents: "Flow / Observation / Impure Rage", note: "Best overall" },
      { name: "Mage", talents: "Flow / Observation / Lethal Ignition", note: "Best aggressive setup" },
      { name: "Support", talents: "Agility / Pull Yourself Together / Focusing Mark", note: "Best defensive setup" },
    ],
    spells: ["Flicker", "Purify", "Flameshot"],
    matchups: { strongAgainst: "Grouped enemies, slow melee teams, choke fights.", weakAgainst: "Fast dive, hard flank, and anyone who can disrupt channeling.", hardCounters: ["Fanny", "Ling", "Saber", "Hayabusa", "Natalia"], bestAllies: ["Atlas", "Tigreal", "Minotaur", "Khufra", "Diggie"], banPriorities: ["Fanny", "Ling", "Saber", "Hayabusa"] },
    verdict: { bestBuild: "Core", bestEmblem: "Mage", bestSpell: "Flicker", tier: "A-/B+", carryPotential: 7, difficulty: 5, overallPower: 7 },
  },
  "paquito": {
    mechanics: { damage: 8, burst: 9, dps: 6, mobility: 8, sustain: 6, durability: 6, cc: 4, teamfight: 7, objective: 6, splitPush: 7, carry: 8, difficulty: 8 },
    analysis: { role: "EXP Lane / Jungle", winCondition: "Win short trades, convert Champ Stance into a kill or forced recall, then translate the lane lead into side pressure.", strengths: "Fast cycling, high burst, good mobility, strong early duel.", weaknesses: "Punished when cooldowns are wasted, less efficient into heavy armor + hard peel.", powerSpikes: "Level 2, level 4, first 1–2 items, full Champ Stance control.", scalingEarly: 9, scalingMid: 8, scalingLate: 6 },
    emblems: [
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Best overall" },
      { name: "Assassin", talents: "Rupture / Weapons Master / Killing Spree", note: "Best burst/reset option" },
      { name: "Fighter", talents: "Agility / Festival of Blood / Brave Smite", note: "Best defensive fallback" },
    ],
    spells: ["Flicker", "Execute", "Retribution"],
    matchups: { strongAgainst: "Squishy backlines, short-range duelists, slow bruisers.", weakAgainst: "Heavy armor stacking, high peel, long CC chains.", hardCounters: ["Khufra", "Franco", "Kaja", "Valir", "Minsitthar"], bestAllies: ["Atlas", "Tigreal", "Mathilda", "Diggie", "Angela"], banPriorities: ["Khufra", "Franco", "Kaja"] },
    verdict: { bestBuild: "Core", bestEmblem: "Fighter", bestSpell: "Flicker", tier: "A/S", carryPotential: 8, difficulty: 8, overallPower: 8 },
  },
  "chou": {
    mechanics: { damage: 5, burst: 6, dps: 4, mobility: 9, sustain: 4, durability: 8, cc: 8, teamfight: 8, objective: 5, splitPush: 4, carry: 6, difficulty: 8 },
    analysis: { role: "Roam / EXP Lane", winCondition: "Force a pick on the enemy carry and turn it into an objective.", strengths: "Isolation, disruption, flexible playmaking, strong pick angles.", weaknesses: "Damage builds are inconsistent, loses value if he cannot find clean ult targets.", powerSpikes: "Level 4, first defensive item, first successful pick.", scalingEarly: 7, scalingMid: 7, scalingLate: 6 },
    emblems: [
      { name: "Tank", talents: "Vitality / Tenacity / Concussive Blast", note: "Best overall" },
      { name: "Fighter", talents: "Agility / Festival of Blood / Brave Smite", note: "Best if you insist on more lane pressure" },
      { name: "Assassin", talents: "Rupture / Weapons Master / Killing Spree", note: "Best for damage-pick play" },
    ],
    spells: ["Flicker", "Execute", "Purify"],
    matchups: { strongAgainst: "Immobile carries, greedy backlines, low-peel drafts.", weakAgainst: "Direct burst, anti-dash zones, and layered peel.", hardCounters: ["Khufra", "Franco", "Kaja", "Valir", "Minsitthar"], bestAllies: ["Burst mages", "Dive assassins", "Grouped teamfight setters"], banPriorities: ["Franco", "Kaja", "Khufra"] },
    verdict: { bestBuild: "Core", bestEmblem: "Tank", bestSpell: "Flicker", tier: "A-/B+", carryPotential: 6, difficulty: 8, overallPower: 7 },
  },
  "argus": {
    mechanics: { damage: 7, burst: 6, dps: 8, mobility: 6, sustain: 8, durability: 7, cc: 4, teamfight: 6, objective: 7, splitPush: 9, carry: 7, difficulty: 6 },
    analysis: { role: "EXP Lane Fighter", winCondition: "Survive early, hit your item breakpoint, then force side-lane duels and late-game tower pressure.", strengths: "Anti-burst ult, strong cleanup, strong split pressure, excellent into teams that mismanage cooldowns.", weaknesses: "Low value when ult is down, predictable engage, heavy reliance on uptime.", powerSpikes: "Level 4, first attack-speed item, ultimate availability.", scalingEarly: 4, scalingMid: 7, scalingLate: 9 },
    emblems: [
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Best overall" },
      { name: "Marksman", talents: "Fatal / Weapon Master / Quantum Charge", note: "Best for tower and DPS scaling" },
      { name: "Assassin", talents: "Rupture / Weapons Master / Killing Spree", note: "Best aggressive cleanup route" },
    ],
    spells: ["Vengeance", "Flicker", "Retribution"],
    matchups: { strongAgainst: "Burst-heavy heroes, teams that blow cooldowns early, poorly coordinated dives.", weakAgainst: "Anti-heal, hard kite, and suppression.", hardCounters: ["Kaja", "Franco", "Valir"], bestAllies: ["Healers", "Peel supports", "Setup tanks", "Vision roamers"], banPriorities: ["Kaja", "Franco"] },
    verdict: { bestBuild: "Core", bestEmblem: "Fighter", bestSpell: "Vengeance", tier: "B/A-", carryPotential: 7, difficulty: 6, overallPower: 6 },
  },
  "dyrroth": {
    mechanics: { damage: 9, burst: 8, dps: 7, mobility: 6, sustain: 7, durability: 6, cc: 4, teamfight: 6, objective: 6, splitPush: 7, carry: 7, difficulty: 5 },
    analysis: { role: "EXP Lane / Jungle", winCondition: "Win the first few trades, reduce enemy armor, then convert that lead into turret pressure or objective fights.", strengths: "Huge early damage, strong tank punish, self-heal, simple kill pattern.", weaknesses: "Falls off if he cannot convert early lead, can be kited, hates being forced into long disengaged fights.", powerSpikes: "Level 2, level 4, first item, two-item armor shred.", scalingEarly: 10, scalingMid: 7, scalingLate: 5 },
    emblems: [
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Best overall" },
      { name: "Assassin", talents: "Rupture / Weapons Master / Killing Spree", note: "Best aggressive snowball" },
      { name: "Tank", talents: "Vitality / Tenacity / Concussive Blast", note: "Best if you need to frontline longer" },
    ],
    spells: ["Flicker", "Execute", "Retribution"],
    matchups: { strongAgainst: "Tanks, bruisers, low-armor targets, early skirmishers.", weakAgainst: "Ranged poke, peel-heavy teams, and late-game kite.", hardCounters: ["Kaja", "Franco", "Valir"], bestAllies: ["Setup tanks", "Dive supports", "Fast-follow assassins"], banPriorities: ["Kaja", "Franco", "Valir"] },
    verdict: { bestBuild: "Core", bestEmblem: "Fighter", bestSpell: "Flicker", tier: "A", carryPotential: 7, difficulty: 5, overallPower: 7 },
  },
  "diggie": {
    mechanics: { damage: 5, burst: 4, dps: 4, mobility: 6, sustain: 3, durability: 3, cc: 9, teamfight: 10, objective: 7, splitPush: 2, carry: 7, difficulty: 6 },
    analysis: { role: "Roam Support", winCondition: "Deny enemy hard-engage, protect your carry, and force bad sets with bombs + ult.", strengths: "Best anti-CC in the pool, great vision, annoying lane poke, huge teamfight swing.", weaknesses: "Squishy, low direct carry damage, punished if ult is mistimed.", powerSpikes: "Level 4, first CDR item, first major objective fight.", scalingEarly: 7, scalingMid: 9, scalingLate: 8 },
    emblems: [
      { name: "Support", talents: "Agility / Pull Yourself Together / Focusing Mark", note: "Best overall" },
      { name: "Mage", talents: "Flow / Observation / Impure Rage", note: "Best aggressive poke" },
      { name: "Tank", talents: "Vitality / Tenacity / Concussive Blast", note: "Best defensive fallback" },
    ],
    spells: ["Flicker", "Purify", "Sprint"],
    matchups: { strongAgainst: "Tigreal, Atlas, Minotaur, Ruby-style set comps, dive-heavy CC drafts.", weakAgainst: "Pure burst pickoffs and long-range poke.", hardCounters: ["Heroes that kill him before ult value", "Fast divers"], bestAllies: ["Claude", "Wanwan", "Paquito", "Valentina", "Lylia"], banPriorities: ["Atlas", "Tigreal", "Minotaur"] },
    verdict: { bestBuild: "Core", bestEmblem: "Support", bestSpell: "Flicker", tier: "S/A", carryPotential: 7, difficulty: 6, overallPower: 8 },
  },
  "floryn": {
    mechanics: { damage: 4, burst: 3, dps: 3, mobility: 4, sustain: 10, durability: 4, cc: 5, teamfight: 10, objective: 5, splitPush: 2, carry: 7, difficulty: 5 },
    analysis: { role: "Roam Support", winCondition: "Keep the strongest diver or carry alive long enough to snowball fights.", strengths: "Global save, anti-heal removal, multi-target value, reliable CC.", weaknesses: "Low personal defense, needs teammates worth healing.", powerSpikes: "Level 4, first healing item, first teamfight ult.", scalingEarly: 7, scalingMid: 8, scalingLate: 9 },
    emblems: [
      { name: "Support", talents: "Agility / Pull Yourself Together / Focusing Mark", note: "Best overall" },
      { name: "Support", talents: "Agility / Pull Yourself Together / Wilderness Blessing", note: "Best for rotation-heavy games" },
      { name: "Mage", talents: "Flow / Observation / Impure Rage", note: "Best if you need more lane poke" },
    ],
    spells: ["Flicker", "Purify", "Aegis"],
    matchups: { strongAgainst: "Burst dive, anti-heal lanes, teams that need a kill window to win.", weakAgainst: "Long-range poke and repeated pickoffs.", hardCounters: ["Baxia-style anti-heal", "Assassins that reach backline fast"], bestAllies: ["Paquito", "Ling", "Claude", "Wanwan", "Argus"], banPriorities: ["Baxia", "Strong dive assassins"] },
    verdict: { bestBuild: "Core", bestEmblem: "Support", bestSpell: "Flicker", tier: "A/S", carryPotential: 7, difficulty: 5, overallPower: 8 },
  },
  "kaja": {
    mechanics: { damage: 5, burst: 6, dps: 5, mobility: 6, sustain: 6, durability: 7, cc: 10, teamfight: 8, objective: 5, splitPush: 3, carry: 6, difficulty: 7 },
    analysis: { role: "Roam Support / Fighter", winCondition: "Catch one priority target, suppress them, and convert into a kill or objective.", strengths: "Single-target suppression, early poke, surprisingly good chase.", weaknesses: "Clunky if built too greedy, falls behind if he misses picks.", powerSpikes: "Level 4, first defensive item, first successful suppression pick.", scalingEarly: 8, scalingMid: 7, scalingLate: 6 },
    emblems: [
      { name: "Support", talents: "Agility / Pull Yourself Together / Focusing Mark", note: "Best overall" },
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Best if you want lane sustain" },
      { name: "Tank", talents: "Vitality / Tenacity / Concussive Blast", note: "Best defensive setup" },
    ],
    spells: ["Flicker", "Flame Retribution", "Execute"],
    matchups: { strongAgainst: "Squishy cores, dash-reliant carries, greedy backlines.", weakAgainst: "Cleanse, anti-dive, and long-range zoning.", hardCounters: ["Diggie", "Valir", "Franco", "Khufra", "Minsitthar"], bestAllies: ["Dive assassins", "Burst mages", "Hard engage tanks"], banPriorities: ["Diggie", "Khufra", "Valir"] },
    verdict: { bestBuild: "Core", bestEmblem: "Support", bestSpell: "Flicker", tier: "A-/B+", carryPotential: 6, difficulty: 7, overallPower: 7 },
  },
  "uranus": {
    mechanics: { damage: 4, burst: 3, dps: 4, mobility: 5, sustain: 10, durability: 10, cc: 5, teamfight: 8, objective: 6, splitPush: 7, carry: 6, difficulty: 4 },
    analysis: { role: "EXP Lane Tank", winCondition: "Stay unkillable, soak pressure, and force the enemy to waste cooldowns into your regen.", strengths: "Absurd sustain, lane stability, hard-to-remove side pressure.", weaknesses: "Anti-heal, hard burst, limited kill pressure if behind.", powerSpikes: "First defensive item, level 4, full Radiance stacks in extended fights.", scalingEarly: 7, scalingMid: 9, scalingLate: 8 },
    emblems: [
      { name: "Tank", talents: "Vitality / Tenacity / Concussive Blast", note: "Best overall" },
      { name: "Fighter", talents: "Vitality / Festival of Blood / Brave Smite", note: "Best if you want more lane pressure" },
      { name: "Support", talents: "Agility / Pull Yourself Together / Focusing Mark", note: "Best utility option" },
    ],
    spells: ["Vengeance", "Flicker", "Purify"],
    matchups: { strongAgainst: "Burst-heavy teams and those that rely on sustained damage to win.", weakAgainst: "Anti-heal stacking and high-burst dive.", hardCounters: ["Baxia", "Necklace of Durance users", "Hard burst assassins"], bestAllies: ["Ranged carries", "Poke mages", "Split-lane fighters"], banPriorities: ["Baxia", "Anti-heal heavy drafts"] },
    verdict: { bestBuild: "Core", bestEmblem: "Tank", bestSpell: "Vengeance", tier: "A", carryPotential: 6, difficulty: 4, overallPower: 7 },
  },
};
