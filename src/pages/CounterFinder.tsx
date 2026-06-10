import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Target, Swords, X, ShieldAlert, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { heroes, type Hero } from "../data/heroes";

const roles = ["All", "Tank", "Fighter", "Assassin", "Marksman", "Mage", "Support"];

const roleColors: Record<string, string> = {
  Tank: "text-role-tank bg-role-tank/10 border-role-tank/20",
  Fighter: "text-role-fighter bg-role-fighter/10 border-role-fighter/20",
  Assassin: "text-role-assassin bg-role-assassin/10 border-role-assassin/20",
  Marksman: "text-role-marksman bg-role-marksman/10 border-role-marksman/20",
  Mage: "text-role-mage bg-role-mage/10 border-role-mage/20",
  Support: "text-role-support bg-role-support/10 border-role-support/20",
};

const tierColors: Record<string, string> = {
  "S+": "text-yellow-500",
  "S": "text-orange-400",
  "A": "text-blue-400",
  "B": "text-slate-400",
  "C": "text-slate-500",
};

function HeroPortrait({ id, name, size = "md" }: { id: string; name: string; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-16 h-16" : "w-12 h-12";
  return (
    <div className={`${sizeClass} rounded-xl overflow-hidden bg-slate-200 shrink-0`}>
      <img
        src={`/heroes/${id}.png`}
        alt={name}
        className="w-full h-full object-cover object-top"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

interface CounterResult {
  hero: Hero;
  countersCount: number;
  countersWhich: string[];
}

export default function CounterFinder() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);

  const filteredHeroes = useMemo(() =>
    heroes.filter(h => {
      const matchSearch = h.name.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === "All" || h.role === roleFilter;
      return matchSearch && matchRole;
    }),
    [search, roleFilter]
  );

  const toggleSelect = (heroName: string) => {
    setSelected(prev => {
      if (prev.includes(heroName)) return prev.filter(h => h !== heroName);
      if (prev.length >= 5) return prev;
      return [...prev, heroName];
    });
  };

  const selectedHeroes = useMemo(
    () => heroes.filter(h => selected.includes(h.name)),
    [selected]
  );

  const counterResults: CounterResult[] = useMemo(() => {
    if (selectedHeroes.length === 0) return [];

    const counterMap = new Map<string, { hero: Hero; which: string[] }>();

    for (const enemy of selectedHeroes) {
      for (const counterName of enemy.counters) {
        const cleanName = counterName.replace(/\s*\(.*\)$/, "").trim();
        const counterHero = heroes.find(
          h => h.name.toLowerCase() === cleanName.toLowerCase()
        );
        if (!counterHero) continue;
        if (selected.includes(counterHero.name)) continue;

        const existing = counterMap.get(counterHero.name);
        if (existing) {
          if (!existing.which.includes(enemy.name)) {
            existing.which.push(enemy.name);
          }
        } else {
          counterMap.set(counterHero.name, { hero: counterHero, which: [enemy.name] });
        }
      }
    }

    return Array.from(counterMap.values())
      .map(({ hero, which }) => ({ hero, countersCount: which.length, countersWhich: which }))
      .sort((a, b) => {
        if (b.countersCount !== a.countersCount) return b.countersCount - a.countersCount;
        const tierOrder: Record<string, number> = { "S+": 0, S: 1, A: 2, B: 3, C: 4 };
        return (tierOrder[a.hero.tier] ?? 5) - (tierOrder[b.hero.tier] ?? 5);
      })
      .slice(0, 9);
  }, [selectedHeroes, selected]);

  const topPick = counterResults[0] ?? null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-6 border border-mlbb-accent/30 bg-mlbb-accent/10 text-mlbb-accent shadow-sm">
          <Target className="w-3 h-3" />
          <span>Patch 2.1.67a • Season 40</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-slate-900 mb-4">
          Counter <span className="esports-text-gradient">Finder</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Select up to 5 enemy heroes from the draft — get your best counter-pick recommendations instantly.
        </p>
      </motion.div>

      {/* Selection + Results Panel */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-8 bg-slate-900 text-white rounded-3xl p-6 md:p-8"
          >
            {/* Selected enemies */}
            <p className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-3">
              Enemy Draft ({selected.length}/5)
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {selectedHeroes.map(h => (
                <button
                  key={h.id}
                  onClick={() => toggleSelect(h.name)}
                  className="flex items-center gap-2 pr-3 pl-1 py-1 rounded-xl bg-white/10 hover:bg-red-500/20 border border-white/10 hover:border-red-400/40 transition-all group"
                >
                  <HeroPortrait id={h.id} name={h.name} size="sm" />
                  <span className="text-sm font-bold font-display uppercase tracking-wide">{h.name}</span>
                  <X className="w-3 h-3 text-slate-500 group-hover:text-red-400 transition-colors" />
                </button>
              ))}
            </div>

            {/* Counter results */}
            {counterResults.length > 0 ? (
              <>
                <p className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-4">
                  Best Counter Picks
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {counterResults.map((result, i) => (
                    <Link key={result.hero.id} href={`/heroes/${result.hero.id}`}>
                      <div
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer ${
                          i === 0
                            ? "bg-mlbb-gold/20 border-mlbb-gold/40"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className="relative">
                          <HeroPortrait id={result.hero.id} name={result.hero.name} size="md" />
                          {i === 0 && (
                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-mlbb-gold flex items-center justify-center">
                              <span className="text-[9px] font-black text-slate-900">1</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`font-black font-display uppercase tracking-wide text-sm truncate ${i === 0 ? "text-mlbb-gold" : "text-white"}`}>
                              {result.hero.name}
                            </span>
                            <span className={`text-xs font-black ${tierColors[result.hero.tier]}`}>{result.hero.tier}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${roleColors[result.hero.role]}`}>
                              {result.hero.role}
                            </span>
                            <span className="text-slate-400 text-[10px]">
                              counters {result.countersCount}/{selected.length}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                            Beats: {result.countersWhich.join(", ")}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Top pick detail */}
                {topPick && (
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-xs font-display font-bold uppercase tracking-widest text-slate-400 mb-4">
                      Recommended Pick
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <HeroPortrait id={topPick.hero.id} name={topPick.hero.name} size="lg" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="text-2xl font-black font-display uppercase tracking-tight text-mlbb-gold">
                            {topPick.hero.name}
                          </span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded border ${roleColors[topPick.hero.role]}`}>
                            {topPick.hero.role}
                          </span>
                          <span className={`text-sm font-black ${tierColors[topPick.hero.tier]}`}>
                            {topPick.hero.tier} Tier
                          </span>
                          <span className="text-slate-400 text-xs">
                            {topPick.hero.difficulty}
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm mb-3 leading-relaxed">{topPick.hero.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {topPick.countersWhich.map(name => (
                            <span key={name} className="text-xs font-bold px-2 py-1 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg">
                              <ShieldAlert className="w-3 h-3 inline mr-1" />
                              Counters {name}
                            </span>
                          ))}
                        </div>
                        {topPick.hero.strongAgainst.length > 0 && (
                          <p className="text-xs text-slate-400 mb-4">
                            <span className="text-slate-300 font-bold">Also strong vs: </span>
                            {topPick.hero.strongAgainst.join(", ")}
                          </p>
                        )}
                        <Link href={`/heroes/${topPick.hero.id}`}>
                          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-mlbb-gold text-slate-900 font-bold font-display uppercase tracking-widest text-sm hover:bg-mlbb-gold/90 transition-colors">
                            View Full Hero Card <ChevronRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-slate-400 text-sm">No specific counters found for this lineup. Try selecting different heroes.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search enemy hero..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-mlbb-accent/30 focus:border-mlbb-accent transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {roles.map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-display uppercase tracking-widest transition-all ${
                roleFilter === r ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-500 hover:text-slate-900"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-display font-bold uppercase tracking-widest text-slate-400">
          Click enemy heroes to select ({selected.length}/5)
        </div>
        <div className="text-xs text-slate-400 font-medium">
          {filteredHeroes.length} heroes
        </div>
      </div>

      {/* Hero Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {filteredHeroes.map((hero, i) => {
          const isSelected = selected.includes(hero.name);
          const isDisabled = !isSelected && selected.length >= 5;
          return (
            <motion.div
              key={hero.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01 }}
            >
              <button
                onClick={() => !isDisabled && toggleSelect(hero.name)}
                disabled={isDisabled}
                className={`w-full text-left rounded-2xl border transition-all overflow-hidden ${
                  isSelected
                    ? "bg-mlbb-accent/10 border-mlbb-accent/60 shadow-md ring-2 ring-mlbb-accent/30"
                    : isDisabled
                    ? "bg-slate-50 border-slate-100 opacity-40 cursor-not-allowed"
                    : "bg-white border-slate-200 hover:border-mlbb-accent/30 hover:bg-slate-50 hover:shadow-sm"
                }`}
              >
                {/* Portrait */}
                <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={`/heroes/${hero.id}.png`}
                    alt={hero.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).parentElement!.classList.add("bg-slate-200");
                    }}
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-mlbb-accent/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-mlbb-accent flex items-center justify-center">
                        <Swords className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-1.5 right-1.5">
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm ${tierColors[hero.tier]}`}>
                      {hero.tier}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5">
                  <p className="font-black font-display text-xs uppercase tracking-wide text-slate-900 truncate mb-1">
                    {hero.name}
                  </p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${roleColors[hero.role]}`}>
                    {hero.role}
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {filteredHeroes.length === 0 && (
        <div className="text-center py-16 text-slate-400 font-display uppercase tracking-widest text-sm font-bold">
          No heroes found matching your search
        </div>
      )}

      <div className="mt-8 p-4 rounded-xl bg-slate-100 text-slate-500 text-xs text-center font-medium">
        Counter data reflects Patch 2.1.67a • Season 40 meta. Select up to 5 enemy heroes to get real-time counter recommendations.
      </div>
    </div>
  );
}
