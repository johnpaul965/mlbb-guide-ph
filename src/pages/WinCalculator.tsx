import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Zap, AlertTriangle } from "lucide-react";
import { heroes, type Role } from "../data/heroes";
import SearchableHeroSelect from "../components/SearchableHeroSelect";

const tierPoints: Record<string, number> = {
  "S+": 12, "S": 10, "A": 6, "B": 3, "C": 0,
};

const roles: Role[] = ["Tank", "Fighter", "Assassin", "Marksman", "Mage", "Support"];
const rolePlaceholders: Record<Role, string> = {
  Tank: "Roamer/Tank",
  Fighter: "EXP Fighter",
  Assassin: "Jungler",
  Marksman: "Gold Lane",
  Mage: "Mid Mage",
  Support: "Support",
};

const modifiers = [
  { id: "hard_counter", label: "Hard Counter", value: 8, positive: true },
  { id: "anti_heal", label: "Anti-Heal Ready", value: 5, positive: true },
  { id: "full_cc_chain", label: "Full CC Chain", value: 4, positive: true },
  { id: "win_condition", label: "Clear Win Condition", value: 3, positive: true },
  { id: "hard_countered", label: "Hard Countered", value: -8, positive: false },
  { id: "no_antiheal", label: "No Anti-Heal vs Heals", value: -6, positive: false },
  { id: "no_frontline", label: "No Frontline", value: -5, positive: false },
  { id: "no_cc", label: "No Hard CC", value: -5, positive: false },
];

const healingHeroes = ["Estes", "Angela", "Uranus", "Marcel"];
const skillGapLabels = ["Much Worse", "Worse", "Similar", "Better", "Much Better"];
const skillGapValues = [-10, -5, 0, 5, 10];

type TeamSlot = { role: Role; hero: string };
const emptyTeam = (): TeamSlot[] => roles.map(role => ({ role, hero: "" }));

function HeroSelect({ value, onChange, role }: { value: string; onChange: (v: string) => void; role: Role }) {
  const options = heroes
    .filter(h => h.role === role)
    .sort((a, b) => {
      const tierOrder = ["S+", "S", "A", "B", "C"];
      return tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
    })
    .map(h => ({ id: h.id, name: h.name, tier: h.tier, label: "" }));

  return (
    <SearchableHeroSelect
      value={value}
      onChange={onChange}
      options={options}
      placeholder={role}
    />
  );
}

function TeamInput({ label, team, setTeam, accent }: {
  label: string; team: TeamSlot[]; setTeam: (t: TeamSlot[]) => void; accent: string;
}) {
  const setHero = (role: Role, hero: string) =>
    setTeam(team.map(s => s.role === role ? { ...s, hero } : s));
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <h3 className={`font-black font-display text-sm uppercase tracking-wide mb-3 ${accent}`}>{label}</h3>
      <div className="space-y-2">
        {team.map(slot => (
          <div key={slot.role} className="flex items-center gap-2">
            <p className="text-[9px] font-bold font-display uppercase tracking-widest text-slate-400 w-16 shrink-0">{rolePlaceholders[slot.role]}</p>
            <div className="flex-1">
              <HeroSelect value={slot.hero} onChange={v => setHero(slot.role, v)} role={slot.role} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WinCalculator() {
  const [myTeam, setMyTeam] = useState<TeamSlot[]>(emptyTeam());
  const [enemyTeam, setEnemyTeam] = useState<TeamSlot[]>(emptyTeam());
  const [activeModifiers, setActiveModifiers] = useState<Set<string>>(new Set());
  const [skillGap, setSkillGap] = useState(2);

  const toggleModifier = (id: string) => {
    setActiveModifiers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const myScore = useMemo(() =>
    myTeam.reduce((sum, slot) => {
      const hero = heroes.find(h => h.name === slot.hero);
      return sum + (hero ? (tierPoints[hero.tier] ?? 0) : 0);
    }, 0), [myTeam]);

  const enemyScore = useMemo(() =>
    enemyTeam.reduce((sum, slot) => {
      const hero = heroes.find(h => h.name === slot.hero);
      return sum + (hero ? (tierPoints[hero.tier] ?? 0) : 0);
    }, 0), [enemyTeam]);

  const modifierTotal = useMemo(() =>
    modifiers.reduce((sum, m) => activeModifiers.has(m.id) ? sum + m.value : sum, 0),
    [activeModifiers]);

  const autoHealWarning = useMemo(() => {
    const enemyHasHealing = enemyTeam.some(s => healingHeroes.includes(s.hero));
    return enemyHasHealing && !activeModifiers.has("anti_heal");
  }, [enemyTeam, activeModifiers]);

  const skillGapValue = skillGapValues[skillGap];
  const totalDiff = myScore - enemyScore + modifierTotal + skillGapValue;
  const rawWin = 50 + totalDiff * 1.8;
  const winPct = Math.min(90, Math.max(10, Math.round(rawWin)));
  const filledTeam = myTeam.some(s => s.hero) || enemyTeam.some(s => s.hero);

  const winColor = winPct >= 65
    ? { bar: "bg-green-500", text: "text-green-600", label: "Favorable", bg: "bg-green-50 border-green-200" }
    : winPct >= 45
    ? { bar: "bg-amber-400", text: "text-amber-600", label: "Contested", bg: "bg-amber-50 border-amber-200" }
    : { bar: "bg-red-500", text: "text-red-600", label: "Unfavorable", bg: "bg-red-50 border-red-200" };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-3 border border-mlbb-gold/30 bg-mlbb-gold/10 text-mlbb-gold">
          <Calculator className="w-3 h-3" />
          <span>Patch 2.1.67a · Season 40</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-slate-900 mb-1">
          Win % <span className="esports-text-gradient">Calculator</span>
        </h1>
        <p className="text-slate-500 text-sm">Pick both teams to get an instant win probability estimate.</p>
      </div>

      {autoHealWarning && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-bold text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Enemy has healing heroes — check "Anti-Heal Ready" or apply −6 modifier!</span>
        </div>
      )}

      {filledTeam && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mb-5 rounded-2xl border p-4 ${winColor.bg}`}
        >
          <div className="flex items-center gap-4">
            <div className="text-center shrink-0">
              <p className="text-[9px] font-display font-bold uppercase tracking-widest text-slate-500 mb-0.5">Win Probability</p>
              <div className={`text-5xl font-black font-display ${winColor.text}`}>{winPct}%</div>
              <p className={`text-[10px] font-bold font-display uppercase tracking-widest ${winColor.text}`}>{winColor.label}</p>
            </div>
            <div className="flex-1 w-full">
              <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                <motion.div
                  initial={{ width: "50%" }}
                  animate={{ width: `${winPct}%` }}
                  transition={{ type: "spring", stiffness: 80 }}
                  className={`h-full ${winColor.bar} rounded-full`}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Your Score</p>
                  <p className="font-black text-slate-900 text-base">{myScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Modifiers</p>
                  <p className={`font-black text-base ${modifierTotal + skillGapValue >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {modifierTotal + skillGapValue >= 0 ? "+" : ""}{modifierTotal + skillGapValue}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Enemy Score</p>
                  <p className="font-black text-slate-900 text-base">{enemyScore}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <TeamInput label="Your Team" team={myTeam} setTeam={setMyTeam} accent="text-mlbb-accent" />
        <TeamInput label="Enemy Team" team={enemyTeam} setTeam={setEnemyTeam} accent="text-red-500" />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-4">
        <h3 className="font-black font-display text-sm uppercase tracking-wide text-slate-900 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-mlbb-gold" /> Modifiers
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {modifiers.map(m => (
            <button
              key={m.id}
              onClick={() => toggleModifier(m.id)}
              className={`text-left px-3 py-2 rounded-xl border transition-all ${
                activeModifiers.has(m.id)
                  ? m.positive ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold font-display text-[10px] uppercase tracking-wide text-slate-800">{m.label}</span>
                <span className={`text-xs font-black ${m.positive ? "text-green-600" : "text-red-600"}`}>
                  {m.positive ? "+" : ""}{m.value}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <h3 className="font-black font-display text-sm uppercase tracking-wide text-slate-900 mb-2">Skill Gap</h3>
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
        <p className="text-center text-xs font-bold text-slate-600 mt-2">
          Skill adjustment: <span className={`font-black ${skillGapValue >= 0 ? "text-green-600" : "text-red-600"}`}>
            {skillGapValue >= 0 ? "+" : ""}{skillGapValue}
          </span> pts · {skillGapLabels[skillGap]}
        </p>
      </div>
    </div>
  );
}
