import { Link } from "wouter";
import { Calendar, Clock, BookOpen, ArrowUpRight, Flame } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  {
    slug: "best-heroes-for-solo-rank-2025",
    title: "Best Heroes for Solo Rank in 2025",
    excerpt: "Playing solo ranked is tough in Mobile Legends. Here are the top 10 heroes that can carry even with random teammates.",
    date: "June 8, 2026",
    readTime: "5 min read",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    slug: "how-to-counter-fanny-mlbb",
    title: "How to Counter Fanny — The Ultimate Guide",
    excerpt: "Fanny is destroying ranked games? Here's exactly how to counter her — hero picks, positioning, and itemization.",
    date: "June 5, 2026",
    readTime: "4 min read",
    category: "Counter Guide",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    slug: "mlbb-beginner-guide-2025",
    title: "Beginner's Handbook: How to Win More Games",
    excerpt: "New to Mobile Legends? This complete beginner guide covers everything you need — roles, lanes, objectives, and how to climb ranked.",
    date: "June 1, 2026",
    readTime: "8 min read",
    category: "Beginner",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    slug: "best-marksman-mlbb-2025",
    title: "Best Marksman in MLBB 2025 — Tier List & Guide",
    excerpt: "Who is the strongest marksman right now? We break down every marksman in the current meta with builds and tips.",
    date: "May 28, 2026",
    readTime: "6 min read",
    category: "Tier List",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
  },
];

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-6 border border-mlbb-accent/20 bg-mlbb-accent/5 text-mlbb-accent">
          <BookOpen className="w-3 h-3 fill-current" />
          <span>Strategic Archives</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-slate-900 mb-6">
          <span className="text-mlbb-accent">Meta</span> Knowledge
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">In-depth guides, hero analysis, and advanced tactics to give you the competitive edge in ranked.</p>
      </motion.div>

      {/* Featured Post */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <Link href={`/blog/${posts[0].slug}`} className="block group">
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden relative group-hover:border-mlbb-accent/50 transition-all shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 lg:hidden" />
                <div className="absolute inset-0 esports-gradient opacity-10 z-10 group-hover:opacity-20 transition-opacity mix-blend-multiply" />
                <img 
                  src={import.meta.env.BASE_URL + "hero-bg.png"} 
                  alt="Featured Post"
                  className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded bg-mlbb-accent/10 border border-mlbb-accent/20 text-mlbb-accent text-xs font-bold font-display uppercase tracking-widest flex items-center gap-2">
                    <Flame className="w-3 h-3" /> Hot
                  </span>
                  <span className="text-slate-500 font-display uppercase tracking-widest text-xs font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {posts[0].date}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-black font-display uppercase tracking-tight text-slate-900 mb-4 group-hover:text-mlbb-accent transition-colors leading-tight">
                  {posts[0].title}
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-bold font-display uppercase tracking-wider">
                    <Clock className="w-4 h-4" /> {posts[0].readTime}
                  </div>
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-mlbb-accent group-hover:border-mlbb-accent group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Grid Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(1).map((post, i) => (
          <motion.div 
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`} className="block h-full group">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 h-full flex flex-col group-hover:border-mlbb-accent/30 shadow-sm transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold font-display uppercase tracking-widest">
                    {post.category}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-mlbb-accent group-hover:border-mlbb-accent group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
                <h2 className="text-xl font-black font-display uppercase tracking-tight text-slate-900 mb-3 group-hover:text-mlbb-accent transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 text-slate-500 font-bold font-display uppercase tracking-widest text-xs">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
