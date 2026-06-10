import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Crosshair, Heart, Zap, TrendingUp, TrendingDown, ChevronDown, ChevronUp, Swords } from "lucide-react";

interface Situation {
  id: string;
  icon: React.ReactNode;
  label: string;
  enemyType: string;
  color: string;
  border: string;
  bg: string;
  picks: string[];
  build: string;
  inGame: string;
  doThis: string;
}

const situations: Situation[] = [
  {
    id: "heavy-cc",
    icon: <Shield className="w-6 h-6" />,
    label: "Enemy Has Heavy CC",
    enemyType: "Atlas, Franco, Khufra, Tigreal, Johnson",
    color: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50",
    picks: ["Diggie (CC immunity for team)", "Any hero with Purify spell"],
    build: "Add Purify battle spell. Build Immortality early on carries.",
    inGame: "Spread out before fights. Never group near their initiators. Let CC heroes waste skills on your tank before carries engage.",
    doThis: "Let CC heroes waste skills on your tank before carries engage.",
  },
  {
    id: "heavy-poke",
    icon: <Crosshair className="w-6 h-6" />,
    label: "Enemy Has Heavy Poke",
    enemyType: "Pharsa, Yve, Gord, Vale, Novaria",
    color: "text-purple-600",
    border: "border-purple-200",
    bg: "bg-purple-50",
    picks: ["Lolita (blocks projectiles)", "Esmeralda", "Dive assassins"],
    build: "Athena's Shield on tanks. Resilience emblem talent.",
    inGame: "Stay behind terrain. Never stand still. Force close-range fights.",
    doThis: "Engage under their tower — poke heroes are weak up close.",
  },
  {
    id: "heavy-healing",
    icon: <Heart className="w-6 h-6" />,
    label: "Enemy Has Heavy Healing",
    enemyType: "Estes, Angela, Uranus, Alice, Marcel",
    color: "text-red-600",
    border: "border-red-200",
    bg: "bg-red-50",
    picks: ["Karrie (ignores shields)", "Any burst assassin who one-shots"],
    build: "MANDATORY — Sea Halberd on fighters/MM. Necklace of Durance on mages.",
    inGame: "Buy anti-heal before 3rd item. Burst one target at a time.",
    doThis: "Never let fights drag out — sustain wins wars of attrition.",
  },
  {
    id: "heavy-dive",
    icon: <Zap className="w-6 h-6" />,
    label: "Enemy Has Heavy Dive / Assassins",
    enemyType: "Fanny, Ling, Gusion, Lancelot",
    color: "text-violet-600",
    border: "border-violet-200",
    bg: "bg-violet-50",
    picks: ["Khufra (counters all dashes)", "Franco", "Kaja"],
    build: "Wind of Nature on MM. Blade Armor on tanks.",
    inGame: "MM and Mage must stay behind 2+ teammates at all times.",
    doThis: "Place vision at jungle entrance — never face-check without tank.",
  },
  {
    id: "heavy-tanks",
    icon: <Shield className="w-6 h-6" />,
    label: "Enemy Has Heavy Tanks",
    enemyType: "Khufra, Atlas, Gloo, Hylos, Uranus",
    color: "text-slate-600",
    border: "border-slate-200",
    bg: "bg-slate-50",
    picks: ["Karrie (HP% damage)", "Irithel", "Baxia", "Kimmy", "Moskov"],
    build: "Demon Hunter Sword, Malefic Roar.",
    inGame: "Kite their frontline — never 5v5 head-on.",
    doThis: "Secure objectives instead — tanks waste time, not health.",
  },
  {
    id: "late-hypercarry",
    icon: <TrendingUp className="w-6 h-6" />,
    label: "Enemy Has Late-Game Hypercarries",
    enemyType: "Yi Sun-shin, Wanwan, Claude, Aldous",
    color: "text-amber-600",
    border: "border-amber-200",
    bg: "bg-amber-50",
    picks: ["Franco", "Selena", "Khufra — lock down carries before they scale"],
    build: "Dominance Ice (cuts attack speed). Necklace of Durance vs lifesteal.",
    inGame: "WIN before 12 minutes. Contest every Turtle.",
    doThis: "Target their carry every fight — if they survive, you lose.",
  },
  {
    id: "sora-or-marcel",
    icon: <Swords className="w-6 h-6" />,
    label: "Enemy Has Sora or Marcel",
    enemyType: "Season 40's two most banned heroes — must have a plan",
    color: "text-rose-600",
    border: "border-rose-200",
    bg: "bg-rose-50",
    picks: ["Khufra (stops Sora dashes before stacks build)", "Kaja (suppression removes Sora from fight)", "Saber or Lancelot (dive Marcel before he stasis)", "Helcurt (silence before Marcel can ult)"],
    build: "Lock-down CC items on tank. Burst assassins must build Blade of Despair first for 1-shot potential.",
    inGame: "Chain CC on Sora before he reaches 5 Cloudstep stacks. Burst Marcel before he activates Golden Hour stasis — never dive into an active stasis field.",
    doThis: "Ban one, counter-pick the other. If both are open, ban Marcel first — his stasis reshapes every teamfight.",
  },
  {
    id: "you-are-behind",
    icon: <TrendingDown className="w-6 h-6" />,
    label: "You Are Behind",
    enemyType: "Lost early, enemy has gold lead",
    color: "text-red-700",
    border: "border-red-300",
    bg: "bg-red-50",
    picks: ["Avoid fights, farm safely, rotate only with 3+ teammates"],
    build: "Defensive items first — Immortality, Antique Cuirass, Athena's Shield.",
    inGame: "Hug towers. Don't give more kills. One good fight can flip.",
    doThis: "Wait for enemy mistake. Trade kill for objective.",
  },
  {
    id: "you-are-ahead",
    icon: <TrendingUp className="w-6 h-6" />,
    label: "You Are Ahead",
    enemyType: "Gold lead, kills lead",
    color: "text-green-700",
    border: "border-green-300",
    bg: "bg-green-50",
    picks: ["Group after every kill, push objectives immediately"],
    build: "Full damage — never build defensively when ahead.",
    inGame: "Push Lord the moment you wipe enemy team.",
    doThis: "Force fights near enemy base. Never let them farm back.",
  },
];

export default function SituationPicker() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-6 border border-mlbb-accent/30 bg-mlbb-accent/10 text-mlbb-accent shadow-sm">
          <Swords className="w-3 h-3" />
          <span>Patch 2.1.67a • Season 40</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-slate-900 mb-4">
          Situation <span className="esports-text-gradient">Picker</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Identify what the enemy team is running — get the exact counter-strategy, build path, and in-game plan instantly.
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        {situations.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`rounded-2xl border ${s.border} overflow-hidden bg-white shadow-sm`}
          >
            <button
              onClick={() => toggle(s.id)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.border} border flex items-center justify-center ${s.color} shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <p className={`font-black font-display uppercase tracking-wide text-lg ${s.color}`}>{s.label}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{s.enemyType}</p>
                </div>
              </div>
              <div className="text-slate-400 ml-4 shrink-0">
                {expanded === s.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            <AnimatePresence>
              {expanded === s.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className={`border-t ${s.border} p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4`}>
                    <div className={`rounded-xl ${s.bg} p-4 border ${s.border}`}>
                      <p className="text-xs font-display font-bold uppercase tracking-widest text-slate-500 mb-2">Pick These Heroes</p>
                      <ul className="space-y-1">
                        {s.picks.map((p, pi) => (
                          <li key={pi} className={`font-bold text-sm ${s.color} flex items-start gap-2`}>
                            <span className="mt-0.5 shrink-0">▸</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                      <p className="text-xs font-display font-bold uppercase tracking-widest text-slate-500 mb-2">Build Priority</p>
                      <p className="text-slate-700 font-medium text-sm leading-relaxed">{s.build}</p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                      <p className="text-xs font-display font-bold uppercase tracking-widest text-slate-500 mb-2">In-Game Plan</p>
                      <p className="text-slate-700 font-medium text-sm leading-relaxed">{s.inGame}</p>
                    </div>

                    <div className={`rounded-xl ${s.bg} p-4 border ${s.border}`}>
                      <p className="text-xs font-display font-bold uppercase tracking-widest text-slate-500 mb-2">Do This</p>
                      <p className={`font-bold text-sm ${s.color} leading-relaxed`}>{s.doThis}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 p-6 rounded-2xl bg-slate-900 text-white text-center"
      >
        <p className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-2">Quick Reference</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Always have <span className="text-mlbb-gold font-bold">2+ hard CC heroes</span> · Anti-heal on <span className="text-mlbb-accent font-bold">2+ heroes every game (Season 40 healing meta)</span> · <span className="text-mlbb-cyan font-bold">Marcel is most banned</span> — always have a backup plan
        </p>
      </motion.div>
    </div>
  );
}
