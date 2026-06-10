import { Link } from "wouter";
import { useState } from "react";
import { heroes, getRoleColor, type Role, type Tier } from "../data/heroes";
import { tierReasons } from "../data/tierReasons";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Swords, Info } from "lucide-react";

const tiers: { tier: Tier; label: string; color: string; border: string; desc: string; gradient: string }[] = [
  { tier: "S+", label: "God Tier S+", color: "text-[#ff2255]", border: "border-[#ff2255]/30", desc: "Pick or ban every game. These heroes define Season 40 — ignore them and lose.", gradient: "from-[#ff2255]/20 to-transparent" },
  { tier: "S",  label: "S Tier",      color: "text-[#ffd700]", border: "border-[#ffd700]/30", desc: "First pick/ban priority. Consistently dominates high-ELO ranked.", gradient: "from-[#ffd700]/20 to-transparent" },
  { tier: "A",  label: "Meta Tier",   color: "text-[#ff3366]", border: "border-[#ff3366]/30", desc: "Consistently strong. The backbone of most competitive drafts.", gradient: "from-[#ff3366]/20 to-transparent" },
  { tier: "B",  label: "Viable Tier", color: "text-[#00ccff]", border: "border-[#00ccff]/30", desc: "Situationally powerful. Needs the right team composition to shine.", gradient: "from-[#00ccff]/20 to-transparent" },
  { tier: "C",  label: "Niche Tier",  color: "text-[#8888aa]", border: "border-[#8888aa]/30", desc: "Off-meta picks. Usually requires one-trick mastery to be effective.", gradient: "from-[#8888aa]/20 to-transparent" },
];

const roles: (Role | "All")[] = ["All", "Tank", "Fighter", "Assassin", "Marksman", "Mage", "Support"];

export default function TierList() {
  const [selectedRole, setSelectedRole] = useState<Role | "All">("All");
  const [expandedHero, setExpandedHero] = useState<string | null>(null);

  const filteredHeroes = (tier: Tier) =>
    heroes.filter(h => h.tier === tier && (selectedRole === "All" || h.role === selectedRole));

  const getReason = (hero: (typeof heroes)[0]) => {
    if (tierReasons[hero.name]) return tierReasons[hero.name];
    if (hero.description) return hero.description;
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-4 border border-mlbb-gold/30 bg-mlbb-gold/10 text-mlbb-gold shadow-sm">
          <Star className="w-3 h-3 fill-current" />
          <span>Patch 2.1.67a • Season 40</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tight text-slate-900 mb-3">
          Global <span className="text-mlbb-gold">Tier List</span>
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-sm">
          Every hero ranked for Season 40 high-ELO ranked. Tap any hero card to see <span className="font-bold text-slate-700">why</span> they're in that tier.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {roles.map(role => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            data-testid={`btn-filter-${role.toLowerCase()}`}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-display uppercase tracking-widest transition-all ${
              selectedRole === role
                ? "bg-slate-900 text-white shadow-md scale-105"
                : "bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        {tiers.map(({ tier, label, color, border, desc, gradient }) => {
          const tierHeroes = filteredHeroes(tier);
          return (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`bg-white border ${border.replace('/30', '/10')} rounded-3xl overflow-hidden relative shadow-sm`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${gradient.replace('/20', '/5')} pointer-events-none`} />

              <div className="flex flex-col md:flex-row relative z-10">
                <div className={`p-5 md:p-6 md:w-52 border-b md:border-b-0 md:border-r ${border.replace('/30', '/10')} flex flex-col justify-center bg-slate-50/50 shrink-0`}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-4xl md:text-5xl font-black font-display ${color} drop-shadow-sm`}>{tier}</span>
                    <h2 className={`font-black font-display text-base uppercase tracking-wide ${color}`}>{label}</h2>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>

                <div className="p-5 md:p-6 flex-1">
                  <AnimatePresence mode="popLayout">
                    {tierHeroes.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {tierHeroes.map(hero => {
                          const reason = getReason(hero);
                          const isExpanded = expandedHero === hero.id;
                          return (
                            <motion.div
                              layout
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                              key={hero.id}
                            >
                              <div
                                className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all cursor-pointer ${
                                  isExpanded
                                    ? "border-mlbb-accent/40 shadow-md"
                                    : "border-slate-200 hover:border-mlbb-accent/30 hover:bg-slate-50"
                                }`}
                                onClick={() => setExpandedHero(isExpanded ? null : hero.id)}
                              >
                                <div className="p-2.5 flex items-center gap-2.5">
                                  <div className="w-9 h-9 rounded-lg overflow-hidden esports-gradient flex items-center justify-center text-base font-black text-white shrink-0 relative">
                                    <span className="relative z-0">{hero.name[0]}</span>
                                    <img
                                      src={`${import.meta.env.BASE_URL}heroes/${hero.id}.png`}
                                      alt={hero.name}
                                      className="absolute inset-0 w-full h-full object-cover object-top z-10"
                                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className={`text-slate-900 font-bold font-display uppercase tracking-wide truncate text-xs transition-colors ${isExpanded ? "text-mlbb-accent" : "group-hover:text-mlbb-accent"}`}>
                                      {hero.name}
                                    </p>
                                    <p className={`text-[10px] font-bold uppercase tracking-wider truncate ${getRoleColor(hero.role).split(" ")[0]}`}>
                                      {hero.role}
                                    </p>
                                  </div>
                                  {reason && (
                                    <Info className={`w-3 h-3 shrink-0 transition-colors ${isExpanded ? "text-mlbb-accent" : "text-slate-300"}`} />
                                  )}
                                </div>

                                <AnimatePresence>
                                  {isExpanded && reason && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-2.5 pb-2.5 border-t border-slate-100 pt-2">
                                        <p className="text-[10px] text-slate-600 leading-relaxed italic mb-2">
                                          "{reason}"
                                        </p>
                                        <Link
                                          href={`/heroes/${hero.id}`}
                                          onClick={e => e.stopPropagation()}
                                          className="inline-flex items-center gap-1 text-[10px] font-bold font-display uppercase tracking-wider text-mlbb-accent hover:underline"
                                        >
                                          <Swords className="w-2.5 h-2.5" /> Full Guide
                                        </Link>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center py-12 text-slate-400 font-display uppercase tracking-widest text-sm font-bold">
                        No {selectedRole} heroes in this tier
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
