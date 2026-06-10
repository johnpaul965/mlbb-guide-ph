import { useState } from "react";
import { Link, useSearch } from "wouter";
import { Search, Filter, Swords } from "lucide-react";
import { heroes, getRoleColor, getDifficultyColor, type Role } from "../data/heroes";
import { tierReasons } from "../data/tierReasons";
import { motion, AnimatePresence } from "framer-motion";

const roles: Role[] = ["Tank", "Fighter", "Assassin", "Marksman", "Mage", "Support"];
const tiers = ["S+", "S", "A", "B", "C"];

const tierColor: Record<string, string> = {
  "S+": "bg-mlbb-accent text-white",
  "S":  "bg-mlbb-gold text-white",
  "A":  "bg-mlbb-violet text-white",
  "B":  "bg-mlbb-cyan text-white",
  "C":  "bg-slate-400 text-white",
};

export default function Heroes() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialRole = params.get("role") as Role | null;

  const [query, setQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | "All">(initialRole || "All");
  const [selectedTier, setSelectedTier] = useState<string>("All");

  const filtered = heroes.filter(h => {
    const matchesQuery = h.name.toLowerCase().includes(query.toLowerCase());
    const matchesRole = selectedRole === "All" || h.role === selectedRole;
    const matchesTier = selectedTier === "All" || h.tier === selectedTier;
    return matchesQuery && matchesRole && matchesTier;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3"
      >
        <div>
          <h1 className="text-3xl font-black font-display uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <Swords className="w-7 h-7 text-mlbb-accent" />
            Hero Roster
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Master the meta — builds, counters, and tips for every hero.
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-mlbb-accent transition-colors" />
            <input
              data-testid="input-search-hero"
              type="text"
              placeholder="Search hero by name..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 outline-none focus:border-mlbb-accent focus:ring-1 focus:ring-mlbb-accent transition-all text-sm font-medium"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-36">
              <select
                data-testid="select-role-filter"
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value as Role | "All")}
                className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 outline-none cursor-pointer focus:border-mlbb-cyan transition-all text-xs font-bold uppercase tracking-wide"
              >
                <option value="All">All Roles</option>
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative flex-1 sm:w-32">
              <select
                data-testid="select-tier-filter"
                value={selectedTier}
                onChange={e => setSelectedTier(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 outline-none cursor-pointer focus:border-mlbb-gold transition-all text-xs font-bold uppercase tracking-wide"
              >
                <option value="All">All Tiers</option>
                {tiers.map(t => <option key={t} value={t}>{t} Tier</option>)}
              </select>
              <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="text-slate-400 font-display uppercase tracking-widest font-bold text-xs mb-4">
        <span className="text-slate-700">{filtered.length}</span> heroes found
      </p>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
        <AnimatePresence>
          {filtered.map(hero => (
            <motion.div
              key={hero.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.15 }}
            >
              <Link href={`/heroes/${hero.id}`} data-testid={`link-hero-${hero.id}`}>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer group hover:border-mlbb-accent/60 hover:shadow-lg transition-all">
                  {/* Portrait */}
                  <div className="relative h-24 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <img
                      src={`${import.meta.env.BASE_URL}heroes/${hero.id}.png`}
                      alt={hero.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    {/* Tier badge */}
                    <div className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black font-display shadow-sm ${tierColor[hero.tier] ?? "bg-slate-500 text-white"}`}>
                      {hero.tier}
                    </div>
                    {/* Why-meta overlay — slides up on hover */}
                    {tierReasons[hero.name] && (
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col justify-end p-2">
                        <p className="text-white text-[9px] leading-tight line-clamp-3 font-medium italic">
                          "{tierReasons[hero.name]}"
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="px-2 py-1.5">
                    <p className="font-black font-display text-[11px] uppercase tracking-wide text-slate-800 truncate group-hover:text-mlbb-accent transition-colors">{hero.name}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider truncate">{hero.role}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
          <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-black font-display text-slate-900 uppercase tracking-wide mb-2">No Heroes Found</h3>
          <p className="text-slate-500 text-sm mb-5">Try adjusting your filters or search query.</p>
          <button
            data-testid="btn-clear-filters"
            onClick={() => { setQuery(""); setSelectedRole("All"); setSelectedTier("All"); }}
            className="px-5 py-2 rounded-lg font-bold font-display uppercase tracking-widest text-white bg-mlbb-accent hover:bg-mlbb-accent/90 transition-colors text-sm"
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
