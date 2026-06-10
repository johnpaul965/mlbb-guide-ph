import { useParams, Link } from "wouter";
import { ChevronLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const posts: Record<string, {
  title: string;
  date: string;
  readTime: string;
  category: string;
  content: { heading?: string; body: string }[];
}> = {
  "best-heroes-for-solo-rank-2025": {
    title: "Best Heroes for Solo Rank in 2025",
    date: "June 8, 2026",
    readTime: "5 min read",
    category: "Strategy",
    content: [
      { body: "Playing solo ranked in Mobile Legends is one of the toughest challenges in the game. You can't rely on coordinated teammates, so you need heroes that can carry games on their own. Here are the top picks for solo queue in the current meta." },
      { heading: "1. Chou — The Reliable Carry", body: "Chou is arguably the best solo-carry fighter in the game. His kit allows him to single-handedly displace key targets like the enemy carry or jungler, turning teamfights in your favor even without coordination. He's hard to master but worth every hour of practice." },
      { heading: "2. Ling — Map Pressure King", body: "Ling is perfect for solo queue because he generates map pressure passively. While your team does random things in lanes, Ling can take objectives, steal jungle camps, and rotate at will. His snowball potential once he gets two core items is unmatched." },
      { heading: "3. Kagura — Mage Carry", body: "If you're a mage player, Kagura is your best bet. She has strong burst, good escape options, and enough CC to set up kills. In solo queue where your team might not have reliable engage, Kagura can create her own opportunities." },
      { heading: "4. Granger — Safe Marksman", body: "Marksman players often struggle in solo queue because they rely on peel from their team. Granger solves this with his dash and burst damage — he can delete squishy targets before they close the gap, and get out safely." },
      { heading: "5. Franco — Tank Carry", body: "If you prefer tank, Franco is a solo-queue nightmare for the enemy. A single hook on the enemy carry can shift momentum dramatically. You don't need coordination to land hooks — you just need patience." },
      { heading: "Tips for Solo Ranked", body: "Choose heroes with strong self-sufficiency. Communicate via quick chat. Prioritize objectives over kills. And most importantly — practice one hero until you know every matchup inside out." },
    ],
  },
  "how-to-counter-fanny-mlbb": {
    title: "How to Counter Fanny — The Ultimate Guide",
    date: "June 5, 2026",
    readTime: "4 min read",
    category: "Counter Guide",
    content: [
      { body: "Fanny is one of the most feared heroes in Mobile Legends at high ELO. A skilled Fanny player feels unstoppable — zipping between walls, deleting targets, and escaping before your team can respond. But every hero has counters, and Fanny is no exception." },
      { heading: "Why Fanny is Hard to Deal With", body: "Fanny's power comes from her mobility. She uses Steel Cable to traverse the map at blinding speed, and because she's always moving, CC that requires prediction is very hard to land. She also deals massive burst damage on isolated targets." },
      { heading: "Best Hero Counters", body: "Selena is the premier Fanny counter — her stun arrow, when landed in the path of Fanny's cable travel, can cancel the movement and lock her down. Franco's hook is also excellent if timed during cable wind-up. Saber's ultimate locks Fanny in place completely." },
      { heading: "Itemization Against Fanny", body: "Buy Antique Cuirass to reduce her physical attack power over time. Wind of Nature on your marksman provides a brief physical immunity window. Immortality gives you a second chance if she bursts you." },
      { heading: "Positioning Tips", body: "Never be isolated from your team. Fanny thrives on picking off lone targets. Group up and have someone with CC ready at all times. Deny her jungle camps early to slow her energy buildup." },
      { heading: "Warding and Vision", body: "Place retribution on jungle paths to deny her camps. If she can't regen energy efficiently, her cable-chaining becomes less fluid and she'll be forced into riskier positions." },
    ],
  },
  "mlbb-beginner-guide-2025": {
    title: "Beginner's Handbook: How to Win More Games",
    date: "June 1, 2026",
    readTime: "8 min read",
    category: "Beginner",
    content: [
      { body: "Mobile Legends Bang Bang is a complex game with a steep learning curve, but the fundamentals can be mastered fairly quickly. This guide covers everything a new player needs to know to start climbing ranked." },
      { heading: "Understanding Roles", body: "MLBB has six roles: Tank (absorb damage and protect), Fighter (durable brawlers), Assassin (burst damage, kill squishies), Marksman (long-range DPS), Mage (spell burst + CC), and Support (heals and utility). As a beginner, start with Fighter or Support — they're forgiving and always needed." },
      { heading: "Lane Assignment", body: "The standard setup is: Tank or Fighter in EXP lane (top), Jungler roaming, Mage or Fighter in MID lane, Marksman + Support in Gold lane (bottom). Following this setup gives your team the best chance to win." },
      { heading: "Objectives Win Games", body: "Kills are secondary to objectives. Push turrets, take Turtle for early gold, take Lord to end games. A team that takes objectives consistently will win even with fewer kills than the enemy." },
      { heading: "Itemization Basics", body: "Always follow recommended builds when starting. Once you understand the game better, adapt your build based on the enemy composition. Physical teams need armor (Antique Cuirass). Magic-heavy teams need magic resist (Oracle, Athena's Shield)." },
      { heading: "Map Awareness", body: "Always look at the minimap. Know where enemies were last seen. If you don't see 3 or more enemies on the map, play safe or expect a gank. This single habit will improve your win rate dramatically." },
      { heading: "Start with These Heroes", body: "Easy heroes to start with: Layla (Marksman), Eudora (Mage), Franco (Tank). They have simple mechanics but teach you the fundamentals of each role." },
    ],
  },
  "best-marksman-mlbb-2025": {
    title: "Best Marksman in MLBB 2025 — Tier List & Guide",
    date: "May 28, 2026",
    readTime: "6 min read",
    category: "Tier List",
    content: [
      { body: "Marksman is the primary damage-dealing role in the late game. Choosing the right marksman for the current meta can mean the difference between winning and losing. Here's our full tier list and breakdown for 2026." },
      { heading: "S-Tier Marksmen", body: "Wanwan tops the list with her immunity mechanic and Tiger Pace passive. Once she activates her ultimate, she becomes nearly untouchable while dealing massive damage. Granger is close behind — his burst potential and dash make him a versatile pick in both early and late game. Claude with his monkey stacks is a late-game monster." },
      { heading: "A-Tier Marksmen", body: "Brody hits extremely hard with his stacked passive and pairs well with burst supports. Karrie's True Damage output destroys tank compositions. Natan's clone mechanic makes him surprisingly effective in teamfights and unique in playstyle." },
      { heading: "Core Items for Marksmen", body: "Most marksmen want: Swift Boots, Windtalker, Berserker's Fury, Scarlet Phantom, Haas's Claws (lifesteal), Malefic Roar (armor pen). Adjust the last two slots based on the match." },
      { heading: "Marksman Tips", body: "Stay behind your tank in teamfights. Attack from the back line. Prioritize surviving over dealing damage — a dead marksman deals zero DPS. Kite backwards constantly and position near a wall so you can't be flanked from behind." },
    ],
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts[slug ?? ""];

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-black font-display text-slate-900 uppercase mb-4">Post Not Found</h1>
        <p className="text-slate-500 mb-8">This article doesn't exist or may have been removed.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold font-display uppercase tracking-widest text-white bg-mlbb-accent hover:bg-mlbb-accent/90 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold font-display uppercase tracking-widest text-slate-500 hover:text-mlbb-accent transition-colors mb-10">
          <ChevronLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded bg-mlbb-accent/10 border border-mlbb-accent/20 text-mlbb-accent text-xs font-bold font-display uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen className="w-3 h-3" /> {post.category}
          </span>
          <span className="text-slate-500 text-xs font-bold font-display uppercase tracking-widest flex items-center gap-1.5">
            <Calendar className="w-3 h-3" /> {post.date}
          </span>
          <span className="text-slate-500 text-xs font-bold font-display uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tight text-slate-900 mb-10 leading-tight">
          {post.title}
        </h1>

        <div className="prose prose-slate max-w-none">
          {post.content.map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="mb-8"
            >
              {block.heading && (
                <h2 className="text-xl font-black font-display uppercase tracking-wide text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-mlbb-accent rounded-full inline-block" />
                  {block.heading}
                </h2>
              )}
              <p className="text-slate-600 leading-relaxed text-base">{block.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold font-display uppercase tracking-widest text-white bg-mlbb-accent hover:bg-mlbb-accent/90 transition-colors text-sm">
            <ChevronLeft className="w-4 h-4" /> More Articles
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
