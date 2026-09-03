import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, ArrowRight, ArrowUpRight } from 'lucide-react';
import { DashboardData } from '../../types/api';

interface CommunityActivityCardProps {
  activities: DashboardData['communityActivities'];
}

export const CommunityActivityCard: React.FC<CommunityActivityCardProps> = ({ activities }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Nexus Ecosystem Activity</h3>
              <span className="text-[11px] text-slate-400">Live peer exchange pulse</span>
            </div>
          </div>

          <Link
            to="/skill-exchange"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center space-x-1"
          >
            <span>Community</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Activity Feed */}
        <div className="space-y-3">
          {activities.map(act => (
            <div
              key={act.id}
              className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center space-x-3 text-xs"
            >
              {/* Avatar Circle */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-[1px] flex-shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-[11px] text-cyan-300">
                  {act.avatarInitials}
                </div>
              </div>

              <div className="overflow-hidden flex-1">
                <div className="text-slate-300 leading-snug">
                  <strong className="text-white">{act.author}</strong> {act.action}{' '}
                  <span className="text-cyan-400 font-medium">{act.domain}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                  {act.timeAgo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 mt-5 border-t border-slate-800">
        <Link
          to="/skill-exchange"
          className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
        >
          <span>Join Peer Skill Exchange</span>
          <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
        </Link>
      </div>
    </div>
  );
};

export default CommunityActivityCard;
