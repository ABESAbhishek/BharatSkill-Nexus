import React from 'react';
import { 
  Compass, 
  Users, 
  Coins, 
  BrainCircuit, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Discover Skills',
      description: 'Build your profile around what you know and what you want to learn.',
      icon: Compass,
      color: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30'
    },
    {
      step: '02',
      title: 'Learn & Contribute',
      description: 'Exchange knowledge, collaborate with peers, and grow together.',
      icon: Users,
      color: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/30'
    },
    {
      step: '03',
      title: 'Earn SkillCredits',
      description: 'Get rewarded for meaningful contributions to the community.',
      icon: Coins,
      color: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30'
    },
    {
      step: '04',
      title: 'AI Understands You',
      description: 'Your activities build a dynamic and evolving skill profile.',
      icon: BrainCircuit,
      color: 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/30'
    },
    {
      step: '05',
      title: 'Unlock Opportunities',
      description: 'Intelligent agents match your potential with relevant opportunities.',
      icon: Sparkles,
      color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>5-Step Continuous Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            One Ecosystem.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Endless Growth.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Your journey doesn't stop at learning. BharatSkill Nexus creates a continuous loop between skills, contribution, intelligence, and opportunity.
          </p>
        </div>

        {/* 5-Step Visual Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step} 
                className="relative group bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 backdrop-blur-sm"
              >
                {/* Step indicator header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-slate-400 transition-colors">
                      STEP {item.step}
                    </span>
                    <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Sub-indicator */}
                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Phase {index + 1}</span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors hidden lg:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
