import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Target, Brain, TrendingUp, Coins, LogOut } from 'lucide-react';
import { UserProfile, DashboardData } from '../../types/api';

interface DashboardHeroProps {
  data: DashboardData;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({ data }) => {
  const navigate = useNavigate();
  const { user, stats, nextBestAction } = data;

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user.name.split(' ')[0] || 'Builder';

  const handleLogout = () => {
    localStorage.removeItem('bsn_user_profile');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800/80 pt-8 pb-10">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[250px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 w-[450px] h-[250px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Career Command Center</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {getGreeting()}, <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">{firstName}</span> 👋
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Your skill ecosystem is evolving. You are closer to your next milestone than you were yesterday.
            </p>
          </div>

          {/* Primary Smart Growth Action CTA + Logout */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <button
              onClick={() => navigate(nextBestAction.targetRoute || '/analysis')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Continue Your Growth</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleLogout}
              className="p-3.5 rounded-2xl bg-slate-900 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="Log Out of Account"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Identity Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8">
          
          {/* Badge 1: Career Goal */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3 sm:p-4 flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex-shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Career Target</span>
              <span className="text-xs sm:text-sm font-bold text-white truncate block">
                {user.careerGoal || 'Internship'}
              </span>
            </div>
          </div>

          {/* Badge 2: Top Skills */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3 sm:p-4 flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
              <Brain className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Top Skills</span>
              <span className="text-xs sm:text-sm font-bold text-white truncate block font-mono">
                {user.skills.slice(0, 2).join(', ')}
              </span>
            </div>
          </div>

          {/* Badge 3: Opportunity Readiness */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3 sm:p-4 flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Readiness</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400 truncate block font-mono">
                {stats.readinessScore}% Ready
              </span>
            </div>
          </div>

          {/* Badge 4: SkillCredits Balance */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3 sm:p-4 flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
              <Coins className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">SkillCredits</span>
              <span className="text-xs sm:text-sm font-bold text-amber-400 truncate block font-mono">
                {stats.skillCreditsBalance} Credits
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardHero;
