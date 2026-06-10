import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Swords, Shield, Star, Home, Target, GitBranch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/heroes", label: "Heroes", icon: Swords },
  { href: "/tier-list", label: "Tier List", icon: Star },
  { href: "/builds", label: "Builds", icon: Shield },
  { href: "/counter-finder", label: "Counters", icon: Target },
  { href: "/draft-win", label: "Draft & Win", icon: GitBranch },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col relative bg-[#F0F2F8]">
      <div className="noise-overlay" />

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200" : "bg-white border-b border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" data-testid="link-home-logo">
            <div className="w-9 h-9 rounded-xl esports-gradient flex items-center justify-center shadow-sm transition-all group-hover:shadow-[0_0_16px_rgba(233,69,96,0.35)]">
              <Swords className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-slate-900 text-lg tracking-widest uppercase">
              MLBB <span className="text-mlbb-accent">Guide</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const active = location === href || (href !== "/" && location.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  data-testid={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-bold font-display uppercase tracking-wider transition-all ${
                    active
                      ? "text-mlbb-accent bg-mlbb-accent/8"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-mlbb-accent" />
                  )}
                  {label}
                </Link>
              );
            })}
          </nav>

          <button
            data-testid="button-mobile-menu"
            className="lg:hidden text-slate-500 p-2 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden px-4 pb-4 grid grid-cols-2 gap-2 bg-white border-b border-slate-200 overflow-hidden"
            >
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = location === href || (href !== "/" && location.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    data-testid={`mobile-nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-all ${
                      active
                        ? "bg-mlbb-accent/10 text-mlbb-accent border border-mlbb-accent/20"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
                <div className="w-8 h-8 rounded-lg esports-gradient flex items-center justify-center">
                  <Swords className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-slate-900 text-base tracking-widest uppercase">
                  MLBB <span className="text-mlbb-accent">Guide</span>
                </span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed">
                The premier strategy resource for MLBB players worldwide. Patch 2.1.67a · Season 40.
              </p>
            </div>

            <div>
              <h4 className="text-slate-900 font-display font-bold uppercase tracking-wider text-xs mb-4">Guides</h4>
              <div className="flex flex-col gap-3">
                {[["Heroes", "/heroes"], ["Tier List", "/tier-list"], ["Builds", "/builds"]].map(([label, href]) => (
                  <Link key={href} href={href} className="text-slate-500 hover:text-mlbb-accent transition-colors text-sm font-medium w-fit">{label}</Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-slate-900 font-display font-bold uppercase tracking-wider text-xs mb-4">Tools</h4>
              <div className="flex flex-col gap-3">
                {[["Counter Finder", "/counter-finder"], ["Win Calculator", "/win-calculator"], ["Situation Picker", "/situation-picker"], ["Patch Notes", "/patch-notes"]].map(([label, href]) => (
                  <Link key={href} href={href} className="text-slate-500 hover:text-mlbb-accent transition-colors text-sm font-medium w-fit">{label}</Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-slate-900 font-display font-bold uppercase tracking-wider text-xs mb-4">Info</h4>
              <div className="flex flex-col gap-3">
                {[["About", "/about"], ["Contact", "/contact"], ["Privacy", "/privacy"]].map(([label, href]) => (
                  <Link key={href} href={href} className="text-slate-500 hover:text-mlbb-accent transition-colors text-sm font-medium w-fit">{label}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-xs">© 2026 MLBB Guide. Not affiliated with Moonton.</p>
            <p className="text-slate-400 text-xs font-display uppercase tracking-widest font-bold">
              Built for Players Worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
