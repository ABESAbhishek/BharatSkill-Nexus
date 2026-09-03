import React from 'react';
import { Milestone, CheckCircle2, Circle, Clock } from 'lucide-react';
import { JourneyMilestone } from '../../types/api';

interface JourneyTimelineProps {
  milestones: JourneyMilestone[];
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ milestones }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center space-x-2.5 mb-5">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Milestone className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Your Nexus Journey</h3>
          <span className="text-[11px] text-slate-400">Career Operating System milestones</span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
        {milestones.map((m, idx) => (
          <div key={m.id} className="relative">
            {/* Step Marker Dot */}
            <div className={`absolute -left-[19px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              m.completed
                ? 'bg-slate-950 border-emerald-400 text-emerald-400'
                : m.active
                ? 'bg-slate-950 border-cyan-400'
                : 'bg-slate-950 border-slate-700'
            }`}>
              {m.completed ? (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ) : m.active ? (
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              ) : null}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <h4 className={`text-xs font-bold ${m.completed ? 'text-white' : m.active ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {m.title}
                </h4>
                {m.date && (
                  <span className="text-[10px] text-slate-500 font-mono">
                    {m.date}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {m.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyTimeline;
