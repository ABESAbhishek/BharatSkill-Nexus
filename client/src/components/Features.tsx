import React from 'react';
import { 
  Target, 
  Users, 
  Award, 
  Network, 
  Puzzle, 
  Zap,
  ArrowUpRight
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      title: 'AI Opportunity Matching',
      description: 'Intelligent agents analyze your skills and connect you with relevant opportunities.',
      icon: Target,
      tag: 'Agentic Discovery',
      accent: 'group-hover:border-blue-500/50 group-hover:shadow-blue-500/10',
      iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Peer Skill Exchange',
      description: 'Learn from peers and share your expertise with the community.',
      icon: Users,
      tag: 'Collaborative Guilds',
      accent: 'group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/10',
      iconColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'SkillCredits Economy',
      description: 'Earn digital credits by contributing knowledge and helping others grow.',
      icon: Award,
      tag: 'Contribution Rewards',
      accent: 'group-hover:border-amber-500/50 group-hover:shadow-amber-500/10',
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Dynamic Skill Graph',
      description: 'Your projects, contributions, and learning activities create an evolving skill identity.',
      icon: Network,
      tag: 'Living Portfolio',
      accent: 'group-hover:border-purple-500/50 group-hover:shadow-purple-500/10',
      iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Skill Gap Analysis',
      description: 'Discover what skills you need to unlock your next opportunity.',
      icon: Puzzle,
      tag: 'Diagnostic Insights',
      accent: 'group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10',
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'x402 Agent Services',
      description: 'Access premium AI-powered services through seamless micropayments on Algorand.',
      icon: Zap,
      tag: 'Micropayment Rail',
      accent: 'group-hover:border-orange-500/50 group-hover:shadow-orange-500/10',
      iconColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-950/60 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <span>Comprehensive Capability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Built To Power Every Stage of{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Your Journey
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Engineered with modular agent intelligence and community incentives to turn individual learning into verified career acceleration.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.accent} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-xl border ${feature.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/50">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-400">
                  <span>Explore Feature</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;
