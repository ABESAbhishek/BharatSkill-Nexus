import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Bot, 
  Coins, 
  Target, 
  Code2, 
  Palette, 
  Globe, 
  CheckCircle2, 
  Zap,
  Network
} from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-black">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 shadow-sm">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span className="text-xs font-semibold text-zinc-300 tracking-wide uppercase font-mono">
                Powered by x402 &bull; Algorand TestNet
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Turn Your Skills Into{' '}
              <span className="text-zinc-400">
                Opportunities.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              An Agentic Skill-to-Opportunity Ecosystem connecting student skills, peer learning, AI-powered discovery, and decentralized value exchange via x402.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/opportunities"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-zinc-200 text-black font-extrabold shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/payments"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold border border-zinc-700 transition-all text-sm"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Agent Services (x402)</span>
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-zinc-400 font-mono">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Zero Subscription Lock-In</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Sub-Second Algorand Settlement</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>₹0 Hackathon Demo Mode</span>
              </div>
            </div>

          </div>

          {/* Right Interactive Ecosystem Graphic */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Central Glowing Card */}
              <div className="relative rounded-3xl p-6 sm:p-8 bg-zinc-950/90 border border-zinc-800 shadow-2xl backdrop-blur-xl space-y-6">
                
                {/* Header in Card */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-md">
                      <Bot className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">Agentic Skill Graph</h2>
                      <span className="text-[10px] text-amber-400 font-mono">x402 Micropayment Active</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-900 border border-emerald-500/30 text-emerald-400">
                    Live TestNet
                  </span>
                </div>

                {/* Simulated Visual Nodes */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-zinc-200">
                    <div className="flex items-center space-x-2.5">
                      <Code2 className="w-4 h-4 text-white" />
                      <span>Full-Stack & Web3</span>
                    </div>
                    <span className="text-emerald-400 font-bold">96% Match</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-zinc-200">
                    <div className="flex items-center space-x-2.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>x402 Payment Settlement</span>
                    </div>
                    <span className="text-amber-400 font-bold">0.10 ALGO</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-zinc-200">
                    <div className="flex items-center space-x-2.5">
                      <Coins className="w-4 h-4 text-white" />
                      <span>Peer SkillCredits Balance</span>
                    </div>
                    <span className="text-white font-bold">120 SC</span>
                  </div>
                </div>

                {/* Live Activity Pulse */}
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Algorand Consensus: 2.8s finality</span>
                  </span>
                  <span className="text-zinc-500 font-mono">LoRA TestNet</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
