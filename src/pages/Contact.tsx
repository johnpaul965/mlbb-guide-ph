import { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-6 border border-mlbb-cyan/30 bg-mlbb-cyan/10 text-mlbb-cyan">
          <MessageSquare className="w-3 h-3 fill-current" />
          <span>Comms Channel Open</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-white mb-6">
          Contact <span className="text-mlbb-cyan">HQ</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Spotted a meta shift? Found a typo in a build? Or want to contribute a pro guide? Hit us up.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-mlbb-card border border-white/10 rounded-3xl p-8"
          >
            <h3 className="text-xl font-black font-display uppercase tracking-wide text-white mb-6">Response Time</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-mlbb-accent/10 border border-mlbb-accent/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-mlbb-accent" />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">General Inquiries</p>
                  <p className="text-gray-400 text-sm">We typically respond within 24–48 hours to regular messages.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-mlbb-violet/10 border border-mlbb-violet/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-mlbb-violet" />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">Patch Updates</p>
                  <p className="text-gray-400 text-sm">Urgent meta corrections are prioritized within hours of patch drops.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/50 border border-white/5 rounded-3xl p-8 text-center"
          >
            <p className="text-gray-400 font-display uppercase tracking-widest text-sm font-bold mb-4">Direct Email</p>
            <a href="mailto:intel@mlbbguide.ph" className="text-xl font-black font-display tracking-wider text-white hover:text-mlbb-cyan transition-colors">INTEL@MLBBGUIDE.PH</a>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-mlbb-card border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-mlbb-cyan/5 blur-[100px] pointer-events-none" />
            
            {sent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-black font-display uppercase tracking-wide text-white mb-4">Transmission Sent</h2>
                <p className="text-gray-400 mb-8">Your intel has been received by HQ. We'll review it shortly.</p>
                <button 
                  onClick={() => setSent(false)} 
                  className="px-6 py-3 rounded-xl font-bold font-display uppercase tracking-widest text-white border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-display uppercase tracking-widest text-gray-500">Callsign (Name)</label>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      className="w-full px-4 py-4 rounded-xl bg-black border border-white/10 text-white placeholder-gray-600 outline-none focus:border-mlbb-cyan focus:ring-1 focus:ring-mlbb-cyan transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-display uppercase tracking-widest text-gray-500">Comms Link (Email)</label>
                    <input 
                      type="email" 
                      placeholder="you@email.com" 
                      className="w-full px-4 py-4 rounded-xl bg-black border border-white/10 text-white placeholder-gray-600 outline-none focus:border-mlbb-cyan focus:ring-1 focus:ring-mlbb-cyan transition-all" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold font-display uppercase tracking-widest text-gray-500">Intel Category (Subject)</label>
                  <select className="w-full px-4 py-4 rounded-xl bg-black border border-white/10 text-white outline-none cursor-pointer focus:border-mlbb-cyan transition-all appearance-none">
                    <option value="">Select a topic...</option>
                    <option>Hero build correction</option>
                    <option>Tier list feedback</option>
                    <option>Patch note error</option>
                    <option>Business inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold font-display uppercase tracking-widest text-gray-500">Message</label>
                  <textarea 
                    rows={5} 
                    placeholder="Enter intel details..." 
                    className="w-full px-4 py-4 rounded-xl bg-black border border-white/10 text-white placeholder-gray-600 outline-none resize-none focus:border-mlbb-cyan focus:ring-1 focus:ring-mlbb-cyan transition-all" 
                  />
                </div>
                
                <button 
                  onClick={() => setSent(true)} 
                  className="w-full py-4 rounded-xl font-black font-display uppercase tracking-widest text-white transition-all bg-mlbb-cyan hover:bg-[#00b4d8] shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] flex items-center justify-center gap-3 text-lg"
                >
                  <Send className="w-5 h-5" />
                  Transmit Intel
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Ensure Zap icon is imported
import { Zap } from "lucide-react";