import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star } from "lucide-react";
import { heroes } from "../data/heroes";
import { lanePools } from "../data/lanes";
import SearchableHeroSelect from "../components/SearchableHeroSelect";

const lanes = [
  { id: "jungler", label: "Jungler", tag: "Assassin", desc: "Jungle / kill lane" },
  { id: "gold", label: "Gold Lane", tag: "Marksman", desc: "Gold lane carry" },
  { id: "exp", label: "EXP Lane", tag: "Fighter", desc: "Experience lane" },
  { id: "roamer", label: "Roamer", tag: "Tank / Support", desc: "Roam / engage" },
  { id: "mid", label: "Mid Lane", tag: "Mage", desc: "Mid mage or burst" },
];

const enemyLanes = [
  { id: "jungler", label: "Enemy Jungler" },
  { id: "gold", label: "Enemy Gold" },
  { id: "exp", label: "Enemy EXP" },
  { id: "roamer", label: "Enemy Roamer" },
  { id: "mid", label: "Enemy Mid" },
];

const tierBonus: Record<string, number> = { "S+": 3, "S": 2, "A": 1, "B": 0, "C": -1 };

function LaneHeroSelect({ value, onChange, laneId, placeholder }: {
  value: string; onChange: (v: string) => void; laneId: string; placeholder: string;
}) {
  const pool = lanePools[laneId] ?? [];
  const options = heroes
    .filter(h => pool.includes(h.name))
    .sort((a, b) => {
      const tierOrder = ["S+", "S", "A", "B", "C"];
      return tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
    })
    .map(h => ({ id: h.id, name: h.name, tier: h.tier, label: "" }));

  return (
    <SearchableHeroSelect value={value} onChange={onChange} options={options} placeholder={placeholder} />
  );
}

function AllHeroSelect({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder: string;
}) {
  const options = [...heroes]
    .sort((a, b) => {
      const tierOrder = ["S+", "S", "A", "B", "C"];
      const t = tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
      if (t !== 0) return t;
      return a.name.localeCompare(b.name);
    })
    .map(h => ({ id: h.id, name: h.name, tier: h.tier, label: h.role }));

  return (
    <SearchableHeroSelect value={value} onChange={onChange} options={options} placeholder={placeholder} />
  );
}

export default function DraftPick() {
  const [myLane, setMyLane] = useState("");
  const [enemyPicks, setEnemyPicks] = useState<Record<string, string>>({
    jungler: "", gold: "", exp: "", roamer: "", mid: "",
  });

  const setEnemy = (lane: string, hero: string) =>
    setEnemyPicks(prev => ({ ...prev, [lane]: hero }));

  const myLaneData = lanes.find(l => l.id === myLane);
  const enemyHeroNames = Object.values(enemyPicks).filter(Boolean);

  const recommendations = useMemo(() => {
    if (!myLane) return [];

    const pool = lanePools[myLane] ?? [];
    const candidates = heroes.filter(h => pool.includes(h.name));

    return candidates
      .map(hero => {
        let score = tierBonus[hero.tier] ?? 0;

        for (const enemyName of enemyHeroNames) {
          const enemyHero = heroes.find(h => h.name === enemyName);
          if (!enemyHero) continue;

          if (hero.strongAgainst?.includes(enemyName)) score += 3;
          if (hero.counters?.includes(enemyName)) score -= 2;
          if (enemyHero.counters?.includes(hero.name)) score -= 3;
          if (enemyHero.strongAgainst?.includes(hero.name)) score += 1;
        }

        return { hero, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [myLane, enemyHeroNames]);

  const hasEnemyPicks = enemyHeroNames.length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-3 border border-mlbb-cyan/30 bg-mlbb-cyan/10 text-mlbb-cyan">
          <GitBranch className="w-3 h-3" />
          <span>Patch 2.1.67a · Season 40</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-slate-900 mb-1">
          Draft Pick <span className="esports-text-gradient">Advisor</span>
        </h1>
        <p className="text-slate-500 text-sm">Select your lane and input enemy picks — get the best counter-picks for you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h3 className="font-black font-display text-sm uppercase tracking-wide text-mlbb-accent mb-3">Your Lane</h3>
          <div className="grid grid-cols-1 gap-2">
            {lanes.map(lane => (
              <button
                key={lane.id}
                onClick={() => setMyLane(lane.id)}
                className={`text-left px-4 py-2.5 rounded-xl border transition-all ${
                  myLane === lane.id
                    ? "bg-mlbb-accent/10 border-mlbb-accent text-mlbb-accent"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black font-display text-xs uppercase tracking-wide">{lane.label}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{lane.tag}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{lane.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h3 className="font-black font-display text-sm uppercase tracking-wide text-red-500 mb-3">Enemy Picks</h3>
          <div className="space-y-2">
            {enemyLanes.map(lane => (
              <div key={lane.id} className="flex items-center gap-2">
                <p className="text-[9px] font-bold font-display uppercase tracking-widest text-slate-400 w-20 shrink-0">{lane.label}</p>
                <div className="flex-1">
                  <AllHeroSelect
                    value={enemyPicks[lane.id]}
                    onChange={v => setEnemy(lane.id, v)}
                    placeholder={lane.label}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!myLane && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
          <GitBranch className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-bold font-display uppercase tracking-wide text-sm">Select your lane to get recommendations</p>
        </div>
      )}

      {myLane && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={myLane + enemyHeroNames.join(",")}
        >
          <div className="flex items-end justify-between mb-4 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl font-black font-display uppercase tracking-tight text-slate-900">
                Best Picks for <span className="esports-text-gradient">{myLaneData?.label}</span>
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                {hasEnemyPicks
                  ? `Ranked against ${enemyHeroNames.length} enemy pick${enemyHeroNames.length > 1 ? "s" : ""}`
                  : "Ranked by tier — add enemy picks for counter-pick analysis"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {recommendations.map(({ hero, score }, i) => (
              <motion.div
                key={hero.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-mlbb-accent/40 hover:shadow-md transition-all group"
              >
                <div className="relative h-28 overflow-hidden bg-gradient-to-br from-mlbb-violet/10 to-mlbb-accent/10">
                  <div className="absolute inset-0 flex items-center justify-center text-5xl font-black text-slate-200 select-none">{hero.name[0]}</div>
                  <img
                    src={`${import.meta.env.BASE_URL}heroes/${hero.id}.png`}
                    alt={hero.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 relative z-10"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20" />
                  <div className="absolute top-2 left-2 z-30 w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black font-display bg-mlbb-accent text-white shadow-sm">
                    #{i + 1}
                  </div>
                  <div className="absolute top-2 right-2 z-30 w-7 h-7 rounded-md flex items-center justify-center text-xs font-black font-display bg-white/90 text-mlbb-gold border border-mlbb-gold/30 shadow-sm">
                    {hero.tier}
                  </div>
                </div>
                <div className="px-3 py-2">
                  <p className="font-black font-display text-xs uppercase tracking-wide text-slate-800 truncate">{hero.name}</p>
                  <p className="text-[10px] text-slate-400">{hero.specialty}</p>
                  {hasEnemyPicks && (
                    <div className="mt-1 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 text-mlbb-gold" />
                      <span className={`text-[9px] font-black ${score >= 4 ? "text-green-600" : score >= 0 ? "text-amber-600" : "text-red-500"}`}>
                        Score {score >= 0 ? "+" : ""}{score}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {hasEnemyPicks && recommendations.length > 0 && (
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500">
              <span className="font-bold text-green-600">Higher score</span> = stronger counter-pick vs enemy team.
              Score factors in hero tier, what you're strong against, and what counters you.
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
