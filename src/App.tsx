import { Route, Switch, Router as WouterRouter } from "wouter";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import HeroDetail from "./pages/HeroDetail";
import TierList from "./pages/TierList";
import Builds from "./pages/Builds";
import PatchNotes from "./pages/PatchNotes";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import CounterFinder from "./pages/CounterFinder";
import DraftWin from "./pages/DraftWin";
import SituationPicker from "./pages/SituationPicker";

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/heroes" component={Heroes} />
          <Route path="/heroes/:id" component={HeroDetail} />
          <Route path="/tier-list" component={TierList} />
          <Route path="/builds" component={Builds} />
          <Route path="/patch-notes" component={PatchNotes} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/counter-finder" component={CounterFinder} />
          <Route path="/draft-win" component={DraftWin} />
          <Route path="/draft-pick" component={DraftWin} />
          <Route path="/win-calculator" component={DraftWin} />
          <Route path="/situation-picker" component={SituationPicker} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route>
            <div className="max-w-7xl mx-auto px-4 py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="text-9xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-mlbb-accent to-transparent opacity-50 select-none">
                  404
                </div>
                <h1 className="text-4xl font-black font-display text-slate-900 uppercase tracking-wide">Signal Lost</h1>
                <p className="text-slate-500 max-w-md mx-auto">The page you are looking for has been banished to the Shadow Realm.</p>
                <a href="/" className="inline-flex px-8 py-4 rounded-xl font-bold font-display uppercase tracking-widest text-white esports-gradient hover:shadow-[0_0_30px_rgba(233,69,96,0.5)] transition-all hover:scale-105 active:scale-95">
                  Return to Base
                </a>
              </motion.div>
            </div>
          </Route>
        </Switch>
      </Layout>
      <Analytics />
    </WouterRouter>
  );
}
