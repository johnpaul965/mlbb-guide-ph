import { Zap, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { patches } from "../data/patches";
import { motion } from "framer-motion";

const changeIcon = (type: "buff" | "nerf" | "adjusted") => {
  if (type === "buff") return <TrendingUp className="w-5 h-5 text-[#00dd88]" />;
  if (type === "nerf") return <TrendingDown className="w-5 h-5 text-[#ff3366]" />;
  return <Minus className="w-5 h-5 text-[#ffcc00]" />;
};

const changeBg = (type: "buff" | "nerf" | "adjusted") => {
  if (type === "buff") return "bg-[#00dd88]/5 border-[#00dd88]/20";
  if (type === "nerf") return "bg-[#ff3366]/5 border-[#ff3366]/20";
  return "bg-[#ffcc00]/5 border-[#ffcc00]/20";
};

const changeText = (type: "buff" | "nerf" | "adjusted") => {
  if (type === "buff") return "text-[#00dd88]";
  if (type === "nerf") return "text-[#ff3366]";
  return "text-[#ffcc00]";
};

export default function PatchNotes() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-slate-900 mb-6">
          <span className="text-mlbb-violet">System</span> Override
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">Comprehensive breakdown of all balance changes, hero adjustments, and meta shifts.</p>
      </motion.div>

      <div className="space-y-12">
        {patches.map((patch, patchIndex) => (
          <motion.div 
            key={patch.version} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: patchIndex * 0.1 }}
            className="bg-white border border-slate-200 rounded-3xl overflow-hidden relative shadow-sm"
          >
            {/* Version Header */}
            <div className="p-8 border-b border-slate-200 relative overflow-hidden">
              <div className="absolute inset-0 esports-gradient opacity-5 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center backdrop-blur-md">
                      <Zap className="w-6 h-6 text-slate-700" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black font-display uppercase tracking-tight text-slate-900">Patch {patch.version}</h2>
                      <p className="text-slate-500 font-display uppercase tracking-widest text-sm font-bold">{patch.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {patch.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-mlbb-accent" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Changes Content */}
            <div className="p-8">
              <h3 className="text-xl font-black font-display uppercase tracking-wide text-slate-900 mb-6">Hero Adjustments</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {patch.heroes.map(hero => (
                  <div key={hero.name} className={`rounded-2xl p-5 border ${changeBg(hero.change).replace('/5', '/10').replace('/20', '/30')}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {changeIcon(hero.change)}
                        <span className={`text-xl font-black font-display uppercase tracking-wide text-slate-900`}>{hero.name}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded bg-white/80 border border-slate-200 font-black font-display uppercase tracking-widest ${changeText(hero.change)}`}>
                        {hero.change}
                      </span>
                    </div>
                    
                    <ul className="space-y-2">
                      {hero.details.map((d, i) => {
                        const [skill, desc] = d.split(": ");
                        return (
                          <li key={i} className="text-sm">
                            <span className="text-slate-900 font-bold">{skill}: </span>
                            <span className="text-slate-600">{desc || skill}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-black font-display uppercase tracking-wide text-slate-900 mb-6 border-t border-slate-200 pt-10">Battlefield Changes</h3>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <ul className="space-y-4">
                  {patch.systemChanges.map((change, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <span className="text-slate-700 font-black text-xs">{i+1}</span>
                      </div>
                      <span className="text-slate-600 font-medium leading-relaxed">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
