import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Users, Target, Map, Zap, Sparkles } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const ACTIONS = [
    {
      title: 'Analyze Skills',
      subtitle: 'Run AI diagnosis',
      icon: Brain,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      route: '/analysis'
    },
    {
      title: 'Agent Services',
      subtitle: 'x402 Micropayments',
      icon: Zap,
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      route: '/payments'
    },
    {
      title: 'Explore Opportunities',
      subtitle: 'Internships & bounties',
      icon: Target,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      route: '/opportunities'
    },
    {
      title: 'Find Skill Exchange',
      subtitle: 'Peer learning rooms',
      icon: Users,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      route: '/skill-exchange'
    },
    {
      title: 'Continue Roadmap',
      subtitle: 'Phase 1 milestones',
      icon: Map,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      route: '/analysis'
    }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md mb-8">
      <div className="flex items-center space-x-2.5 mb-4">
        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Quick Actions</h3>
          <span className="text-[11px] text-slate-400">Direct module navigation</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {ACTIONS.map(act => {
          const Icon = act.icon;

          return (
            <Link
              key={act.title}
              to={act.route}
              className="group p-3.5 rounded-2xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all text-center flex flex-col items-center justify-center space-y-2 hover:-translate-y-0.5"
            >
              <div className={`p-3 rounded-2xl border ${act.color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors block">
                  {act.title}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {act.subtitle}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
