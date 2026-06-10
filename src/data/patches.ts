export interface PatchNote {
  version: string;
  date: string;
  highlights: string[];
  heroes: { name: string; change: "buff" | "nerf" | "adjusted"; details: string[] }[];
  newHero?: string;
  systemChanges: string[];
}

export const patches: PatchNote[] = [
  {
    version: "2.1.67a",
    date: "May 14, 2026",
    highlights: [
      "Season 40 mid-patch — targeted roamer and fighter buffs shift meta toward sustained trades",
      "Belerick buffed — +140 HP and faster taunt; now a reliable S-tier tank",
      "Chou buffed — +100 base ult damage on The Way of Dragon and Chase of Fate",
      "Paquito buffed — damage reduction on Knockout Strike, reduced passive stack requirement",
      "Aulus buffed — Fighting Spirit stack speed increased; strong tempo jungler despite ult change",
      "Harley nerfed — Poker Trick cooldown +1.5s, mid-game burst down ~12%; now situational",
      "Advanced Server: Ling, Claude, Freya, Phoveus, Paquito nerfs incoming",
      "Advanced Server: Khalid, Alice, Hilda buffs incoming — early watch list for Season 41",
      "Season 41 starts June 17 with new Assassin hero Hirara — monitor for meta shift",
    ],
    heroes: [
      {
        name: "Belerick",
        change: "buff",
        details: [
          "Nature's Shield: +140 base HP added to first growth stage",
          "Ancient Seed: Taunt cast time reduced by 0.15s — lands more consistently in fast fights",
          "Now S-tier: more reliable root initiation makes him the go-to tank vs agile lineups",
        ],
      },
      {
        name: "Chou",
        change: "buff",
        details: [
          "The Way of Dragon: +100 base damage at max level",
          "Chase of Fate: +100 base damage at max level",
          "Petrify synergy improved — kick timing window extended by 0.1s",
        ],
      },
      {
        name: "Paquito",
        change: "buff",
        details: [
          "Knockout Strike: Gained damage reduction during cast",
          "Champ Stance: Passive stack requirement reduced by 1",
          "Jab: Shield scaling improved by 8%",
        ],
      },
      {
        name: "Aulus",
        change: "buff",
        details: [
          "Fighting Spirit: Stack accumulation speed increased",
          "Can now reach full stacks faster — strong mid-game dueling window opens earlier",
          "Note: Still fully revamped from 2.1.67 main patch; old strategy does not apply",
        ],
      },
      {
        name: "Harley",
        change: "nerf",
        details: [
          "Poker Trick: Cooldown increased from 7s to 8.5s",
          "Magic Master: Mid-game burst damage reduced by ~12%",
          "Dropped from A-tier priority to situational B-tier — avoid in standard ranked drafts",
        ],
      },
    ],
    systemChanges: [
      "Anti-heal now mandatory on at least 2 heroes per game in Season 40 ranked",
      "Gold Lane assistant item costs adjusted to favor early-game attack speed",
      "Lord buff duration increased by 5 seconds in late-game (past 18 min)",
      "Ranked emblem Grand Master threshold adjusted",
      "Jungle EXP distribution: solo junglers receive 8% bonus XP before 6 minutes",
    ],
  },
  {
    version: "2.1.67",
    date: "April 15, 2026",
    highlights: [
      "Season 40 begins — highest meta volatility in recent MLBB history",
      "Entire Marksman class overhauled — base stats redistributed by early vs late power",
      "Aulus fully revamped — new dash mechanic and new ultimate; old strategy is completely invalid",
      "Sora rises to S+ — dual-form transformation mechanic dominates drafts; ~70% ban rate",
      "Marcel most banned hero — 97% ban rate in Mythical Immortal+; Golden Hour stasis rewrites teamfights",
      "Masha hidden gem — 55.91% win rate, massively undervalued in current meta",
      "Marcel, Gloo, Uranus, Hayabusa, Zhuxin, Claude confirmed S+ by research data",
    ],
    heroes: [
      {
        name: "Sora",
        change: "adjusted",
        details: [
          "Thunder Form (left swipe): converts 30% Max HP into Physical Attack — plays as assassin",
          "Torrent Form (right swipe): converts 30% Physical Attack into Max HP — plays as tank",
          "Shifting Skies: CC immunity during transformation cleanses negative effects",
          "Windstride: Thunder Form reduces cooldown on hit; Torrent Form knocks enemies airborne",
          "Now S+ tier — ~70% ban rate in high-ELO; perfect 10/10 draft and meta influence",
        ],
      },
      {
        name: "Marcel",
        change: "adjusted",
        details: [
          "Golden Hour: AoE stasis field pauses everything inside — heroes, creeps, towers, projectiles",
          "97.11% ban rate in high-ELO ranked play — most contested hero in Season 40",
          "No stat changes this patch — ban priority is entirely due to kit strength",
          "Always prepare a backup plan if Marcel is banned in your draft",
        ],
      },
      {
        name: "Aulus",
        change: "adjusted",
        details: [
          "FULLY REVAMPED: New dash added to kit",
          "New ultimate replaces old — all previous Aulus strategy is completely invalid",
          "Now S-tier after Fighting Spirit rework — fast tempo jungler with strong mid-game dueling",
          "Weakness: lost ult immunity, now vulnerable to CC chains",
        ],
      },
      {
        name: "Wanwan",
        change: "adjusted",
        details: [
          "Marksman overhaul: Base stats redistributed — early power slightly reduced",
          "Late-game scaling and built-in Purify mechanic unchanged",
          "Still S+ tier — unmatched mobility remains top tier",
        ],
      },
      {
        name: "Granger",
        change: "adjusted",
        details: [
          "Marksman overhaul: Base stats redistributed",
          "6th bullet crit mechanic unchanged — still core to build identity",
          "Confirmed S+ post-adjustment per live research data",
        ],
      },
      {
        name: "Hanabi",
        change: "adjusted",
        details: [
          "Marksman overhaul: Base stats redistributed — early power adjusted",
          "Rebound passive and petal shield mechanics unchanged",
          "Upgraded to S+ tier — leading pick rate among marksmen, ~54.7% win rate",
        ],
      },
      {
        name: "Floryn",
        change: "adjusted",
        details: [
          "Patch 2.1.47 buff carries forward: Global heal range is full-map",
          "Confirmed S+ tier this season — enables aggressive split-push strategies",
          "Core anti-heal item (Necklace of Durance) hard-counters her kit",
        ],
      },
    ],
    systemChanges: [
      "Season 40 ranked: new emblem system and Grand Master rank threshold",
      "Marksman assistant item: Windtalker and attack speed items rebalanced for early vs late power",
      "Turtle objective: spawn time adjusted to 1:50 (from 2:00)",
      "Lord buff: now grants 5% extra building damage and 3% team max HP regen per interval",
      "New healing meta response items added to shop rotation",
    ],
  },
  {
    version: "2.1.47",
    date: "April 8, 2026",
    highlights: [
      "Floryn global heal buffed — rises to S+ tier with full-map healing range",
      "Eudora revamped with Superconductor AoE burst kit — from C to A tier",
      "Item shop major update — 12 new items added",
      "Jungle objective timing adjusted across all maps",
    ],
    heroes: [
      {
        name: "Floryn",
        change: "buff",
        details: [
          "Dew: Global healing range increased to full map",
          "To the Dream: Healing per interval increased by 15%",
          "Now grants 2 items to allies — previously 1",
        ],
      },
      {
        name: "Eudora",
        change: "adjusted",
        details: [
          "Full kit revamp: Superconductor passive reworked",
          "Ball Lightning: Now deals AoE damage on chain targets",
          "Thunder's Wrath: Can now hit multiple enemies in chain",
        ],
      },
      {
        name: "Valentina",
        change: "nerf",
        details: ["I Am You: Stolen ultimate damage scaling reduced by 15%", "Arcane Shade: Dash distance reduced"],
      },
      {
        name: "Granger",
        change: "buff",
        details: ["Rhapsody: Bullet count increased from 5 to 6", "Rondo: Cooldown reduced by 1 second"],
      },
      {
        name: "Khufra",
        change: "adjusted",
        details: ["Bouncing Ball: Hitbox slightly reduced", "Tyrant's Rage: Base damage increased by 10%"],
      },
      {
        name: "Lancelot",
        change: "buff",
        details: ["Phantom Execution: Damage increased by 12%", "Soul Cutter passive: Shield amount increased"],
      },
    ],
    systemChanges: [
      "12 new items added to equipment shop",
      "Turtle objective spawn time adjusted from 2:00 to 1:50",
      "Dominance Ice: Now reduces enemy HP regen by 30%",
      "Blade of Despair: Passive condition adjusted",
    ],
  },
  {
    version: "2.1.40",
    date: "February 20, 2026",
    highlights: [
      "Season 39 ranked ends — reset in progress",
      "Hero pool adjustments for Classic mode",
      "Advanced Server test: Marksman overhaul preview",
    ],
    heroes: [
      {
        name: "Fanny",
        change: "adjusted",
        details: ["Steel Cable: Energy cost per cable increased by 5", "Tornado Strike: Damage reduced by 5% but faster animation"],
      },
      {
        name: "Ling",
        change: "nerf",
        details: ["Finch Poise: Lightness cost when jumping increased", "Defiant Sword: Second dash damage reduced by 8%"],
      },
      {
        name: "Claude",
        change: "buff",
        details: ["Blazing Duet: Attack speed steal amount increased", "Battle Mirror Image: Clone damage ratio improved"],
      },
      {
        name: "Gusion",
        change: "buff",
        details: ["Incandescence: Cooldown reduced by 2 seconds", "Shadowblade Slaughter: Dagger return speed increased"],
      },
      {
        name: "Paquito",
        change: "nerf",
        details: ["Knockout Strike: Base damage reduced by 10%", "Heavy Left Punch: AoE radius slightly reduced"],
      },
    ],
    systemChanges: [
      "Season 39 ends — ranked reset in progress",
      "Jungle EXP distribution adjusted for solo vs duo queue",
      "New ranked emblem: Grand Master rank added",
    ],
  },
];
