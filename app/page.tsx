import { ChevronRight, LucideArrowRight, LucidePlayCircle, Mail, Share } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-background-dark font-display text-slate-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 hero-mask">
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/60 to-transparent z-10"></div>
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          <div className="absolute inset-0 scanline pointer-events-none"></div>
        </div>
        <div className="relative z-20 max-w-4xl">
          <div className="inline-block bg-primary/10 border-l-4 border-primary px-4 py-2 mb-8">
            <span className="text-primary text-xs font-black uppercase tracking-[0.3em]">Protocol // AI_COACH_V2.0</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.9] tracking-tighter mb-6">
            Ascend Your <br/> <span className="text-primary">Game</span> With AI Precision.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed">
            The ultimate tactical analysis engine for serious competitors. Decipher enemy rotations, optimize utility, and claim your Radiant rank.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/login" className="bg-primary hover:bg-red-600 text-white font-black uppercase tracking-[0.2em] px-10 py-5 flex items-center gap-3 transition-all" style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}>
              Get Started
              <span className="material-symbols-outlined"><LucideArrowRight/></span>
            </Link>
            <Link href="/login" className="bg-surface-dark border border-border-dark hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] px-10 py-5 flex items-center gap-3 transition-all" style={{ clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)" }}>
              Watch Demo
              <span className="material-symbols-outlined"><LucidePlayCircle /></span>
            </Link>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute right-[-10%] bottom-[-5%] w-[600px] h-[600px] border border-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* Social Proof */}
      <section className="bg-surface-dark py-12 px-6 lg:px-20 border-y border-border-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-center md:text-left">
            <p className="text-slate-400 uppercase tracking-[0.4em] text-xs font-bold mb-2">Tactical Network Stability</p>
            <p className="text-3xl font-black italic">TRUSTED BY 500K+</p>
          </div>
          <div className="h-[1px] w-20 bg-border-dark hidden md:block"></div>
          <div className="flex gap-12 grayscale opacity-60">
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-xl">Radiant <span className="text-primary">Rank</span></div>
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-xl">Immortal <span className="text-primary">Elite</span></div>
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-xl">Pro <span className="text-primary">Circuit</span></div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-primary"></div>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">Core Modules</span>
          </div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter">Engineered for <span className="text-accent-cyan">Excellence</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {/* Feature 1 */}
          <div className="group relative bg-surface-dark p-10 border border-border-dark transition-all hover:bg-slate-800/50">
            <div className="absolute top-0 left-0 bg-primary/20 border-b border-r border-primary/20 px-3 py-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Coming Soon</span>
            </div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors"></div>
            <span className="material-symbols-outlined text-primary text-5xl mb-8 mt-2">analytics</span>
            <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tight text-slate-300">Deep Match Analysis</h3>
            <p className="text-slate-500 leading-relaxed mb-8">Frame-by-frame breakdown of your movement, crosshair placement, and reaction times using proprietary computer vision.</p>
            <div className="flex items-center text-xs font-black uppercase tracking-widest text-primary/50 gap-2 cursor-not-allowed">
              Initialize Scan <span className="material-symbols-outlined text-sm"><ChevronRight /></span>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="group relative bg-surface-dark p-10 border border-border-dark transition-all hover:bg-slate-800/50">
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent-cyan/30 group-hover:border-accent-cyan transition-colors"></div>
            <span className="material-symbols-outlined text-accent-cyan text-5xl mb-8">neurology</span>
            <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tight">AI Tactical Insights</h3>
            <p className="text-slate-400 leading-relaxed mb-8">Real-time strategy suggestions based on opponent patterns. Know where they stack before the round even starts.</p>
            <div className="flex items-center text-xs font-black uppercase tracking-widest text-accent-cyan gap-2 cursor-pointer">
              Predict Strategy <span className="material-symbols-outlined text-sm"><ChevronRight /></span>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="group relative bg-surface-dark p-10 border border-border-dark transition-all hover:bg-slate-800/50">
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors"></div>
            <span className="material-symbols-outlined text-primary text-5xl mb-8">equalizer</span>
            <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tight">Pro Benchmarking</h3>
            <p className="text-slate-400 leading-relaxed mb-8">Compare your utility effectiveness and trade-kill ratio directly against the top 0.1% of professional players.</p>
            <div className="flex items-center text-xs font-black uppercase tracking-widest text-primary gap-2 cursor-pointer">
              View Rankings <span className="material-symbols-outlined text-sm"><ChevronRight /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Preview */}
      <section className="py-24 px-6 lg:px-20 bg-background-dark relative overflow-hidden">
        <div className="absolute left-[-10%] top-0 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[150px]"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              Real-Time <br/> <span className="text-primary italic">Intelligence</span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-surface-dark/40 border-l-2 border-accent-cyan">
                <span className="material-symbols-outlined text-accent-cyan">track_changes</span>
                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-1">Pattern Recognition</h4>
                  <p className="text-slate-400 text-sm">AI identifies enemy lurk patterns after only 3 rounds of data.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-surface-dark/40 border-l-2 border-primary">
                <span className="material-symbols-outlined text-primary">warning</span>
                <div>
                  <h4 className="font-bold uppercase tracking-wider mb-1">Vulnerability Alerts</h4>
                  <p className="text-slate-400 text-sm">Get notified when your rotation speed is below professional standards.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Glassmorphic Card Preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent-cyan/20 blur-2xl opacity-30"></div>
            <div className="relative bg-surface-dark/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl rounded-lg">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs font-black uppercase tracking-widest opacity-60">Live Tactical Feed</span>
                </div>
                <span className="text-accent-cyan font-mono text-xs">RE_RUNNING_SIM...</span>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-tighter">Aim Consistency</span>
                  <span className="text-primary font-black">94.2%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[94.2%]" style={{ boxShadow: "0 0 10px #FF4655" }}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-black/40 p-4 border border-white/5">
                    <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Utility Impact</p>
                    <p className="text-xl font-black italic">A-GRADE</p>
                  </div>
                  <div className="bg-black/40 p-4 border border-white/5">
                    <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Clutch Factor</p>
                    <p className="text-xl font-black italic">1.44</p>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-accent-cyan/10 border border-accent-cyan/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-accent-cyan text-sm">info</span>
                    <span className="text-[10px] font-black uppercase text-accent-cyan tracking-widest">AI Strategy Recommendation</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">&quot;Enemy Jett habitually rotates through Mid Vents at 1:15. Pre-aim suggested for next round.&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-dark pt-24 pb-12 px-6 lg:px-20 border-t border-border-dark overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary flex items-center justify-center" style={{ clipPath: "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)" }}>
                  <span className="material-symbols-outlined text-white text-xl">bolt</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tighter uppercase italic">VALORANT<span className="text-primary italic">AI</span></h2>
              </div>
              <p className="text-slate-500 max-w-sm mb-8">The professional standard for tactical analysis. Our AI doesn&apos;t just watch your games—it understands them.</p>
              <div className="flex gap-4">
                <a className="w-10 h-10 bg-surface-dark border border-border-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                  <span className="material-symbols-outlined text-sm"><Mail /></span>
                </a>
                <a className="w-10 h-10 bg-surface-dark border border-border-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                  <span className="material-symbols-outlined text-sm"><Share /></span>
                </a>
                <a className="w-10 h-10 bg-surface-dark border border-border-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                  <span className="material-symbols-outlined text-sm">hub</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-primary">Protocol</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a className="hover:text-white transition-colors uppercase" href="#">Match Analysis</a></li>
                <li><a className="hover:text-white transition-colors uppercase" href="#">Aim Trainer</a></li>
                <li><a className="hover:text-white transition-colors uppercase" href="#">Team Strategy</a></li>
                <li><a className="hover:text-white transition-colors uppercase" href="#">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-primary">Support</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a className="hover:text-white transition-colors uppercase" href="#">Discord Community</a></li>
                <li><a className="hover:text-white transition-colors uppercase" href="#">Help Center</a></li>
                <li><a className="hover:text-white transition-colors uppercase" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-white transition-colors uppercase" href="#">Terms of Ops</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-border-dark flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">&copy; 2024 VALORANT AI AGENT. NOT AFFILIATED WITH RIOT GAMES.</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Server Status:</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-500 uppercase">Operational</span>
              </div>
            </div>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none select-none">
          <h1 className="text-[200px] font-black italic tracking-tighter leading-none mb-[-40px]">COACH</h1>
        </div>
      </footer>
    </div>
  );
}