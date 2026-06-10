import { useParams, Link } from "wouter";
import { useState } from "react";
import { ChevronLeft, Shield, Swords, Target, Lightbulb, Zap, Info, ArrowUpRight, Crosshair, Sunrise, Sun, Moon, TrendingUp, TrendingDown, Users } from "lucide-react";
import { heroes, getRoleColor, getTierColor, getDifficultyColor } from "../data/heroes";
import { heroBuilds } from "../data/heroBuilds";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroDetail() {
  const { id } = useParams<{ id: string }>();
  const hero = heroes.find(h => h.id === id);
  const [activeBuildIndex, setActiveBuildIndex] = useState(0);

  if (!hero) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black font-display text-slate-900 uppercase tracking-wide mb-6">Hero Not Found</h1>
        <Link href="/heroes" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold font-display uppercase tracking-widest text-white bg-mlbb-accent hover:bg-mlbb-accent/90 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Return to Roster
        </Link>
      </div>
    );
  }

  const buildVariants = heroBuilds[hero.id] ?? [{ type: "Core", description: "The identity build for this hero.", items: hero.build }];
  const activeBuild = buildVariants[Math.min(activeBuildIndex, buildVariants.length - 1)];

  const counterHeroes = heroes.filter(h => hero.counters.includes(h.name));
  const strongAgainstHeroes = heroes.filter(h => hero.strongAgainst.includes(h.name));

  return (
    <div className="pb-20">
      {/* Hero Header */}
      <div className="relative pt-32 pb-16 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-mlbb-accent/5 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link href="/heroes" className="inline-flex items-center gap-2 text-sm font-bold font-display uppercase tracking-widest text-slate-500 hover:text-mlbb-accent transition-colors mb-12">
            <ChevronLeft className="w-4 h-4" /> Back to Roster
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="w-40 h-40 md:w-56 md:h-56 rounded-3xl overflow-hidden shadow-lg shrink-0 relative bg-gradient-to-br from-mlbb-violet/10 to-mlbb-accent/10 border border-slate-200"
            >
              <span className="absolute inset-0 flex items-center justify-center text-8xl font-black text-slate-100 select-none">
                {hero.name[0]}
              </span>
              <img
                src={`${import.meta.env.BASE_URL}heroes/${hero.id}.png`}
                alt={hero.name}
                className="w-full h-full object-cover object-top relative z-10"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </motion.div>
            
            <div className="flex-1 text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4"
              >
                <h1 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tight text-slate-900">{hero.name}</h1>
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl border-2 text-2xl font-black ${getTierColor(hero.tier)} bg-white shadow-sm`}>
                  {hero.tier}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6"
              >
                <span className={`px-3 py-1 rounded border font-bold uppercase tracking-wider text-xs ${getRoleColor(hero.role)}`}>{hero.role}</span>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest border border-slate-200 px-3 py-1 rounded bg-slate-50">{hero.specialty}</span>
                <span className={`px-3 py-1 rounded border font-bold uppercase tracking-wider text-xs ${getDifficultyColor(hero.difficulty)}`}>{hero.difficulty} Difficulty</span>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-600 max-w-3xl text-lg leading-relaxed"
              >
                {hero.description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Build & Stats */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 relative overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Shield className="w-32 h-32" />
            </div>
            
            <h2 className="text-2xl font-black font-display uppercase tracking-wide text-slate-900 mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-mlbb-accent" /> Builds
            </h2>

            {/* Build Type Tabs */}
            <div className="flex flex-wrap gap-2 mb-2">
              {buildVariants.map((variant, i) => (
                <button
                  key={variant.type}
                  onClick={() => setActiveBuildIndex(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black font-display uppercase tracking-wider transition-all ${
                    activeBuildIndex === i
                      ? 'bg-mlbb-accent text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                  }`}
                >
                  {variant.type}
                </button>
              ))}
            </div>

            {/* Build Description */}
            <p className="text-xs text-slate-500 mb-4 leading-relaxed min-h-[2.5rem]">{activeBuild.description}</p>

            {/* Build Items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBuildIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="space-y-3 mb-8"
              >
                {activeBuild.items.map((item, i) => (
                  <div key={`${item}-${i}`} className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-3 rounded-xl hover:border-mlbb-accent/30 transition-colors group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white shrink-0 ${i === 0 ? 'bg-mlbb-accent' : 'bg-slate-300'}`}>
                      {i + 1}
                    </div>
                    <span className="text-slate-800 font-bold font-display text-lg tracking-wide group-hover:text-mlbb-accent transition-colors">{item}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="border border-slate-100 rounded-xl overflow-hidden">
                <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between">
                  <p className="text-xs font-display uppercase tracking-widest text-slate-400 font-bold">Recommended Emblem</p>
                  <span className="text-xs font-black font-display uppercase tracking-widest text-mlbb-accent">{hero.emblems.type} Emblem</span>
                </div>
                <div className="bg-slate-50 divide-y divide-slate-100">
                  <div className="flex items-center gap-3 px-4 py-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 text-[10px] font-black flex items-center justify-center shrink-0">1</span>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider font-display shrink-0">Row 1</span>
                    <span className="ml-auto text-slate-900 font-bold text-sm text-right">{hero.emblems.tier1}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 text-[10px] font-black flex items-center justify-center shrink-0">2</span>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider font-display shrink-0">Row 2</span>
                    <span className="ml-auto text-slate-900 font-bold text-sm text-right">{hero.emblems.tier2}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-mlbb-accent/5">
                    <span className="w-5 h-5 rounded-full bg-mlbb-accent text-white text-[10px] font-black flex items-center justify-center shrink-0">★</span>
                    <span className="text-mlbb-accent text-xs font-bold uppercase tracking-wider font-display shrink-0">Talent</span>
                    <span className="ml-auto text-mlbb-accent font-black text-sm text-right">{hero.emblems.talent}</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                <p className="text-xs font-display uppercase tracking-widest text-slate-500 font-bold mb-2">Battle Spells</p>
                <div className="flex gap-2">
                  {hero.spells.map(spell => (
                    <span key={spell} className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-sm font-bold">{spell}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-black font-display uppercase tracking-wide text-slate-900 mb-6 flex items-center gap-3">
              <Info className="w-6 h-6 text-mlbb-cyan" /> Lore
            </h2>
            <p className="text-slate-600 italic leading-relaxed text-sm">"{hero.lore}"</p>
          </motion.div>
        </div>

        {/* Right Column: Skills, Matchups, Tips */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm"
          >
            <h2 className="text-2xl font-black font-display uppercase tracking-wide text-slate-900 mb-8 flex items-center gap-3">
              <Zap className="w-6 h-6 text-mlbb-violet" /> Abilities
            </h2>
            
            <div className="space-y-6">
              {hero.skills.map((skill, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xl font-black text-slate-700 group-hover:border-mlbb-violet transition-colors">
                      {i === 0 ? "P" : `S${i}`}
                    </div>
                  </div>
                  <div className="flex-1 pb-6 border-b border-slate-100 group-last:border-0 group-last:pb-0">
                    <h3 className="text-xl font-black font-display uppercase tracking-wide text-slate-900 mb-2 group-hover:text-mlbb-violet transition-colors">{skill.name}</h3>
                    <p className="text-slate-600 leading-relaxed">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] pointer-events-none" />
              <h2 className="text-2xl font-black font-display uppercase tracking-wide text-slate-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-red-500" /> Countered By
              </h2>
              
              <div className="flex flex-col gap-3">
                {counterHeroes.length > 0 ? (
                  counterHeroes.map(h => (
                    <Link key={h.id} href={`/heroes/${h.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition-colors group">
                        <span className="font-bold text-slate-800 group-hover:text-red-600">{h.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-red-500 opacity-50 group-hover:opacity-100" />
                      </div>
                    </Link>
                  ))
                ) : (
                  hero.counters.map(name => (
                    <div key={name} className="p-3 rounded-xl bg-red-50 border border-red-100">
                      <span className="font-bold text-slate-800">{name}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[50px] pointer-events-none" />
              <h2 className="text-2xl font-black font-display uppercase tracking-wide text-slate-900 mb-6 flex items-center gap-3">
                <Crosshair className="w-6 h-6 text-green-600" /> Strong Against
              </h2>
              
              <div className="flex flex-col gap-3">
                {hero.strongAgainst.length > 0 ? (
                  hero.strongAgainst.map(name => {
                    const h = heroes.find(x => x.name === name);
                    if (h) {
                      return (
                        <Link key={name} href={`/heroes/${h.id}`}>
                          <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-100 hover:bg-green-100 transition-colors group">
                            <span className="font-bold text-slate-800 group-hover:text-green-600">{name}</span>
                            <ArrowUpRight className="w-4 h-4 text-green-600 opacity-50 group-hover:opacity-100" />
                          </div>
                        </Link>
                      );
                    }
                    return (
                      <div key={name} className="p-3 rounded-xl bg-green-50 border border-green-100">
                        <span className="font-bold text-slate-800">{name}</span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-slate-500 italic">Highly dependent on player skill and team composition.</p>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm"
          >
            <h2 className="text-2xl font-black font-display uppercase tracking-wide text-slate-900 mb-8 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-mlbb-gold" /> Pro Tips & Strategy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hero.tips.map((tip, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-mlbb-gold/30 group-hover:bg-mlbb-gold transition-colors" />
                  <div className="flex gap-4">
                    <span className="text-mlbb-gold font-black opacity-50 text-xl">0{i+1}</span>
                    <p className="text-slate-600">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Game Phases — shown only when hero has phase data */}
          {(hero.earlyGame || hero.midGame || hero.lateGame) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-black font-display uppercase tracking-wide text-slate-900 mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-mlbb-accent" /> Game Phase Plan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hero.earlyGame && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Sunrise className="w-5 h-5 text-amber-500" />
                      <span className="text-xs font-black font-display uppercase tracking-widest text-amber-700">Early Game</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{hero.earlyGame}</p>
                  </div>
                )}
                {hero.midGame && (
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Sun className="w-5 h-5 text-orange-500" />
                      <span className="text-xs font-black font-display uppercase tracking-widest text-orange-700">Mid Game</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{hero.midGame}</p>
                  </div>
                )}
                {hero.lateGame && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Moon className="w-5 h-5 text-indigo-500" />
                      <span className="text-xs font-black font-display uppercase tracking-widest text-indigo-700">Late Game</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{hero.lateGame}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Win/Lose Scenarios — shown only when hero has tip data */}
          {(hero.winTip || hero.loseTip) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-black font-display uppercase tracking-wide text-slate-900 mb-8 flex items-center gap-3">
                <Swords className="w-6 h-6 text-slate-700" /> Win & Lose Scenarios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hero.winTip && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-xs font-black font-display uppercase tracking-widest text-green-700">When You Win</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{hero.winTip}</p>
                  </div>
                )}
                {hero.loseTip && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingDown className="w-5 h-5 text-red-500" />
                      <span className="text-xs font-black font-display uppercase tracking-widest text-red-700">When You Lose</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{hero.loseTip}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Synergies — shown only when hero has synergy data */}
          {hero.synergies && hero.synergies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-black font-display uppercase tracking-wide text-slate-900 mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-mlbb-cyan" /> Best Synergies
              </h2>
              <div className="flex flex-wrap gap-3">
                {hero.synergies.map(syn => {
                  const synHero = heroes.find(h => h.name === syn);
                  return synHero ? (
                    <Link key={syn} href={`/heroes/${synHero.id}`}>
                      <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-mlbb-cyan/5 hover:border-mlbb-cyan/30 transition-all group cursor-pointer">
                        <div className="w-9 h-9 rounded-lg esports-gradient flex items-center justify-center text-white font-black text-lg">{synHero.name[0]}</div>
                        <div>
                          <p className="font-bold font-display uppercase text-slate-900 tracking-wide group-hover:text-mlbb-cyan transition-colors">{syn}</p>
                          <p className={`text-[10px] font-bold uppercase tracking-widest ${getRoleColor(synHero.role).split(" ")[0]}`}>{synHero.role}</p>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div key={syn} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="font-bold font-display uppercase text-slate-700 tracking-wide">{syn}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* When to Pick */}
          {hero.whenToPick && hero.whenToPick.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-black font-display uppercase tracking-wide text-slate-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-mlbb-violet" /> When to Pick
              </h2>
              <ul className="space-y-2">
                {hero.whenToPick.map((cond, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-mlbb-violet/5 border border-mlbb-violet/10 rounded-xl">
                    <span className="text-mlbb-violet font-black mt-0.5 shrink-0">▸</span>
                    <span className="text-slate-700 font-medium text-sm">{cond}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
