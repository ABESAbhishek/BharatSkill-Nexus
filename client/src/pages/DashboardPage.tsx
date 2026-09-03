import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, User, ArrowRight, Sparkles } from 'lucide-react';
import { DashboardData, UserProfile } from '../types/api';
import { fetchDashboardData } from '../services/api';
import DashboardHero from '../components/dashboard/DashboardHero';
import DashboardStats from '../components/dashboard/DashboardStats';
import NextBestActionCard from '../components/dashboard/NextBestActionCard';
import SkillSnapshotCard from '../components/dashboard/SkillSnapshotCard';
import RoadmapProgressCard from '../components/dashboard/RoadmapProgressCard';
import SkillCreditsCard from '../components/dashboard/SkillCreditsCard';
import OpportunityRadarCard from '../components/dashboard/OpportunityRadarCard';
import CommunityActivityCard from '../components/dashboard/CommunityActivityCard';
import GrowthStreakCard from '../components/dashboard/GrowthStreakCard';
import JourneyTimeline from '../components/dashboard/JourneyTimeline';
import SmartNotifications from '../components/dashboard/SmartNotifications';
import QuickActions from '../components/dashboard/QuickActions';

export const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Read local profile
    let currentProfile: UserProfile | null = null;
    const saved = localStorage.getItem('bsn_user_profile');
    if (saved) {
      try {
        currentProfile = JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing local profile:', e);
      }
    }

    // 2. Fetch dashboard data
    setIsLoading(true);
    fetchDashboardData(currentProfile)
      .then(res => {
        if (res.data) {
          setDashboardData(res.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch dashboard data:', err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Initializing Career Command Center...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center flex-1">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-3">
          Dashboard Unavailable
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-8">
          Complete the onboarding flow to initialize your personal career command center.
        </p>
        <Link
          to="/onboarding"
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold text-sm"
        >
          <span>Start Onboarding</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 min-h-screen">
      
      {/* 1. Hero Welcome & Identity Badges */}
      <DashboardHero data={dashboardData} />

      {/* Main Command Center Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* 2. Smart Notifications Area */}
        <SmartNotifications notifications={dashboardData.smartNotifications} />

        {/* 3. Personalized Next Best Action Card */}
        <NextBestActionCard action={dashboardData.nextBestAction} />

        {/* 4. Nexus Overview Stats */}
        <DashboardStats stats={dashboardData.stats} />

        {/* 5. Quick Actions Bar */}
        <QuickActions />

        {/* 6. Main 2-Column Command Center Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ================= LEFT MAIN COLUMN (7 COLS) ================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Skill Identity Snapshot */}
            <SkillSnapshotCard
              analysis={dashboardData.analysis}
              user={dashboardData.user}
            />

            {/* Growth Roadmap Progress */}
            <RoadmapProgressCard
              phases={dashboardData.analysis.growthRoadmap}
            />

            {/* Opportunity Radar */}
            <OpportunityRadarCard
              opportunities={dashboardData.topOpportunities}
            />

          </div>

          {/* ================= RIGHT SIDEBAR COLUMN (5 COLS) ================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Growth Streak Gamification */}
            <GrowthStreakCard
              streak={dashboardData.growthStreak}
            />

            {/* SkillCredits Economy Snapshot */}
            <SkillCreditsCard
              balance={dashboardData.stats.skillCreditsBalance}
              history={dashboardData.skillCreditsHistory}
            />

            {/* Nexus Journey Timeline */}
            <JourneyTimeline
              milestones={dashboardData.journeyMilestones}
            />

            {/* Community Activity Feed */}
            <CommunityActivityCard
              activities={dashboardData.communityActivities}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
