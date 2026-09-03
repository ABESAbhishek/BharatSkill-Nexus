import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { AgentAnalysisReport, UserProfile } from '../../types/api';

interface SkillSnapshotCardProps {
  analysis: AgentAnalysisReport;
  user: UserProfile;
}

export const SkillSnapshotCard: React.FC<SkillSnapshotCardProps> = ({ analysis, user }) => {
  const strength = user.profileStrength || 85;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (strength / 100) * circumference;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Skill Identity Snapshot</h3>
              <span className="text-[11px] text-slate-400">Living candidate graph</span>
            </div>
          </div>

          <Link
            to="/profile"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center space-x-1"
          >
            <span>Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Completeness Meter + Stats */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/70 border border-slate-800 mb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-white block">Profile Completeness</span>
            <span className="text-[11px] text-slate-400">
              {user.skills.length} skills &bull; {user.experienceLevel} level
            </span>
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-cyan-400"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute text-xs font-bold text-white font-mono">
              {strength}%
            </div>
          </div>
        </div>

        {/* 3 Skill Categorizations */}
        <div className="space-y-3">
          
          {/* Strengths */}
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">
              Verified Strengths ({analysis.strengths.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.strengths.slice(0, 4).map(skill => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Growing Skills */}
          {analysis.growingAreas.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
                Growing Skills ({analysis.growingAreas.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.growingAreas.slice(0, 3).map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium"
                  >
                    • {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skill Gaps */}
          <div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1.5">
              Target Skill Gaps ({analysis.recommendedSkills.length})
            </span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.recommendedSkills.slice(0, 3).map(skill => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-medium"
                >
                  → {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-5 mt-5 border-t border-slate-800">
        <Link
          to="/analysis"
          className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
        >
          <span>View Full Skill Gap Analysis</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
        </Link>
      </div>
    </div>
  );
};

export default SkillSnapshotCard;
