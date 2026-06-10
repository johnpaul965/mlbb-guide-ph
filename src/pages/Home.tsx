import { Link } from "wouter";
import { Swords, Star, Zap, ChevronRight, Target, Calculator, GitBranch, ArrowRight } from "lucide-react";
import { heroes } from "../data/heroes";
import { motion } from "framer-motion";

const featuredHeroes = heroes.filter(h => h.tier === "S+").slice(0, 6);
const godTierCount = heroes.filter(h => h.tier === "S+").length;

export default function Home() {
  return (
    <div className="pb-20">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(150deg,#130720 0%,#250c1a 50%,#0f0b28 100%)" }}>
        {/* Fine grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px"
        }} />
        {/* Accent glow — CSS radial, no AI images */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 75% 65% at 50% 35%, rgba(233,69,96,0.18) 0%, rgba(180,79,255,0.12) 45%, transparent 70%)"
        }} />
        {/* Bottom fade to page bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F0F2F8]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-16 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-5 border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm"
          >
            <Zap className="w-3 h-3 fill-current text-mlbb-gold" />
            <span>Patch 2.1.67a · Season 40</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black font-display text-white mb-5 uppercase tracking-tight leading-none"
          >
            Dominate The<br />
            <span className="esports-text-gradient">Ranked Meta</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-white/60 text-base md:text-lg mb-8 max-w-lg mx-auto font-medium"
          >
            The ultimate strategy resource for MLBB players worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              href="/tier-list"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold font-display uppercase tracking-widest text-white esports-gradient hover:opacity-90 hover:scale-105 active:scale-95 transition-all text-sm shadow-lg shadow-mlbb-accent/30"
            >
              <Star className="w-4 h-4 fill-white" />
              View Tier List
            </Link>
            <Link
              href="/heroes"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold font-display uppercase tracking-widest text-white bg-white/15 border border-white/25 hover:bg-white/25 hover:scale-105 active:scale-95 transition-all text-sm backdrop-blur-sm"
            >
              <Swords className="w-4 h-4" />
              Browse Heroes
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats strip ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto px-4 -mt-6 relative z-20 mb-12"
      >
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 flex items-center divide-x divide-slate-100 overflow-hidden">
          {[
            { value: `${heroes.length}+`, label: "Heroes", color: "text-mlbb-accent" },
            { value: String(godTierCount), label: "S+ God Tier", color: "text-mlbb-gold" },
            { value: "2.1.67a", label: "Patch", color: "text-mlbb-violet" },
            { value: "40", label: "Season", color: "text-mlbb-cyan" },
          ].map(({ value, label, color }) => (
            <div key={label} className="flex-1 py-4 text-center px-2">
              <div className={`text-2xl font-black font-display ${color}`}>{value}</div>
              <div className="text-slate-400 text-[10px] font-display uppercase tracking-widest font-bold mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Tools ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 mb-14">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black font-display uppercase tracking-tight text-slate-900">Tools</h2>
          <div className="h-px flex-1 bg-slate-200 ml-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              href: "/tier-list",
              label: "Tier List",
              desc: "Every hero ranked S+ to C for Season 40 high-ELO ranked play.",
              accent: "bg-mlbb-gold",
              textAccent: "text-mlbb-gold",
              icon: Star,
              tag: "META",
            },
            {
              href: "/counter-finder",
              label: "Counter Finder",
              desc: "Look up any hero and instantly see what beats them this patch.",
              accent: "bg-mlbb-accent",
              textAccent: "text-mlbb-accent",
              icon: Target,
              tag: "PICK PHASE",
            },
            {
              href: "/win-calculator",
              label: "Win % Calculator",
              desc: "Input both team drafts and get an instant win probability estimate.",
              accent: "bg-mlbb-violet",
              textAccent: "text-mlbb-violet",
              icon: Calculator,
              tag: "DRAFT",
            },
            {
              href: "/draft-pick",
              label: "Draft Pick Advisor",
              desc: "Choose your lane, enter enemy picks — get the best counter-picks.",
              accent: "bg-mlbb-cyan",
              textAccent: "text-mlbb-cyan",
              icon: GitBranch,
              tag: "DRAFT",
            },
          ].map(({ href, label, desc, accent, textAccent, icon: Icon, tag }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={href}>
                <div className="group bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer">
                  <div className={`${accent} w-10 h-10 rounded-xl flex items-center justify-center shrink-0 opacity-90 group-hover:opacity-100 transition-opacity shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-black font-display text-sm uppercase tracking-wide text-slate-900">{label}</p>
                      <span className={`text-[9px] font-black font-display px-1.5 py-0.5 rounded ${textAccent} bg-current/10 uppercase tracking-widest border border-current/20`} style={{backgroundColor: "transparent"}}>
                        <span className={textAccent}>{tag}</span>
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── S+ God Tier ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1 h-6 rounded-full bg-mlbb-accent inline-block" />
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-slate-900">
                <span className="text-mlbb-accent">S+</span> God Tier
              </h2>
            </div>
            <p className="text-slate-500 text-sm">Pick or ban every game — Season 40 must-knows.</p>
          </div>
          <Link href="/tier-list" className="flex items-center gap-1 text-xs font-bold font-display uppercase tracking-wider text-mlbb-accent hover:gap-2 transition-all group">
            Full List <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {featuredHeroes.map((hero, i) => (
            <motion.div
              key={hero.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/heroes/${hero.id}`}>
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-mlbb-accent/50 hover:shadow-lg hover:-translate-y-0.5 group transition-all">
                  <div className="relative h-28 overflow-hidden" style={{ background: "linear-gradient(135deg,#1a0a2e,#2d1535)" }}>
                    <img
                      src={`${import.meta.env.BASE_URL}heroes/${hero.id}.png`}
                      alt={hero.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const el = e.currentTarget.parentElement?.querySelector(".fallback-initial") as HTMLElement | null;
                        if (el) el.style.display = "flex";
                      }}
                    />
                    <div className="fallback-initial absolute inset-0 items-center justify-center text-4xl font-black text-white/20 select-none hidden">{hero.name[0]}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-transparent" />
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-md flex items-center justify-center text-xs font-black font-display bg-mlbb-accent text-white shadow-sm">
                      {hero.tier}
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <p className="font-black font-display text-xs uppercase tracking-wide text-slate-800 truncate">{hero.name}</p>
                    <p className="text-[10px] text-slate-400">{hero.role}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
