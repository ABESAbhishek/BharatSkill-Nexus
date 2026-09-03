import React from 'react';
import { 
  BookOpen, 
  Hammer, 
  Share2, 
  Coins, 
  Target, 
  TrendingUp, 
  Repeat,
  ArrowRight
} from 'lucide-react';

export const GrowthLoop: React.FC = () => {
  const loopNodes = [
    { title: 'LEARN', desc: 'Master new topics from community and peers', icon: BookOpen, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { title: 'BUILD', desc: 'Craft real projects and verify abilities', icon: Hammer, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { title: 'CONTRIBUTE', desc: 'Teach others, mentor peers, code together', icon: Share2, color: 'text-teal-400 border-teal-500/30 bg-teal-500/10' },
    { title: 'EARN', desc: 'Collect SkillCredits for community help', icon: Coins, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { title: 'GET MATCHED', desc: 'AI agents discover high-fit hackathons & gigs', icon: Target, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { title: 'UPSKILL', desc: 'Address identified skill gaps automatically', icon: TrendingUp, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-950/80 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Repeat className="w-3.5 h-3.5" />
            <span>Self-Sustaining Cycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Your Growth Creates{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              More Growth.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Every interaction strengthens your skill identity and unlocks new possibilities.
          </p>
        </div>

        {/* Continuous Cycle Graphic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          {loopNodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <div 
                key={node.title}
                className="relative bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between group hover:border-slate-700 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold text-slate-500">0{index + 1}</span>
                    <div className={`p-2 rounded-xl border ${node.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5 tracking-wide">
                    {node.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-normal">
                    {node.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Step {index + 1}</span>
                  {index < loopNodes.length - 1 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden lg:block" />
                  ) : (
                    <span title="Loops back to Step 1" className="hidden lg:inline-flex">
                      <Repeat className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Loop Back Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <Repeat className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Completing a cycle automatically reinforces your verified skill graph for future matches</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default GrowthLoop;
