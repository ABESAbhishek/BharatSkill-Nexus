import React from 'react';
import { Flame, Check, Sparkles } from 'lucide-react';
import { GrowthStreak } from '../../types/api';

interface GrowthStreakCardProps {
  streak: GrowthStreak;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const GrowthStreakCard: React.FC<GrowthStreakCardProps> = ({ streak }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Growth Streak</h3>
            <span className="text-[11px] text-slate-400">Continuous skill building</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-orange-400 font-bold font-mono">
          <Flame className="w-4 h-4 fill-orange-400" />
          <span>{streak.currentStreakDays} Days Active</span>
        </div>
      </div>

      {/* Week Calendar Checkmarks */}
      <div className="grid grid-cols-7 gap-2 text-center p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 mb-3">
        {DAYS_OF_WEEK.map((day, idx) => {
          const isActive = streak.activeDaysThisWeek[idx];

          return (
            <div key={day} className="flex flex-col items-center space-y-1.5">
              <span className="text-[10px] text-slate-500 font-mono">{day}</span>
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 shadow-md shadow-orange-500/20 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-600'
                }`}
              >
                {isActive ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '·'}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span>Personal Best: <strong className="text-white font-mono">{streak.bestStreakDays} Days</strong></span>
        <span className="text-emerald-400 font-semibold">+10 SkillCredits daily bonus</span>
      </div>
    </div>
  );
};

export default GrowthStreakCard;
