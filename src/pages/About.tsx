import { Info, Shield, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-6 border border-white/20 bg-white/5 text-white">
          <Info className="w-3 h-3" />
          <span>Our Mission</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-white mb-6">
          About <span className="esports-text-gradient">MLBB Guide</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Built by players, for players. The ultimate competitive resource for the global MLBB community.</p>
      </motion.div>

      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-mlbb-card border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-mlbb-accent/10 blur-[100px] pointer-events-none" />
          
          <h2 className="text-2xl font-black font-display uppercase tracking-wide text-white mb-6">The Goal is Simple: Win More Games</h2>
          <div className="text-gray-300 text-lg leading-relaxed space-y-6 relative z-10">
            <p>MLBB Guide is a free, high-performance resource built for Mobile Legends: Bang Bang players who take ranked seriously. We cut out the noise to give you accurate, up-to-date hero builds, tier lists, counter picks, and patch notes.</p>
            <p>The meta shifts constantly. What worked last season might be obsolete today. We update our database with every patch so you never bring an outdated build into the Land of Dawn.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Always Updated", desc: "Builds and tiers synced with the latest patch.", icon: Zap, color: "text-mlbb-accent" },
            { title: "Pro Insights", desc: "Tactics derived from high-ELO competitive play.", icon: Target, color: "text-mlbb-cyan" },
            { title: "Free Forever", desc: "No paywalls, no mandatory signups. Just knowledge.", icon: Shield, color: "text-mlbb-gold" }
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/50 border border-white/10 rounded-3xl p-8 text-center hover:bg-white/5 hover:border-white/20 transition-all"
            >
              <div className={`w-12 h-12 mx-auto rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-xl font-black font-display uppercase tracking-wide text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl font-black font-display uppercase tracking-wide text-white mb-4">Disclaimer</h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
            MLBB Guide is an independent community project. We are not affiliated with, endorsed, sponsored, or specifically approved by Moonton. Mobile Legends: Bang Bang and all related logos are trademarks of Moonton.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
