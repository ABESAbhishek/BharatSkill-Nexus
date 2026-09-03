import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  TrendingUp, 
  Lock, 
  Compass, 
  Heart, 
  Sparkles, 
  RefreshCw, 
  Layers, 
  Target, 
  User, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { 
  UserProfile, 
  OpportunityMatchResult, 
  OpportunityStats, 
  OpportunityFilterState 
} from '../types/api';
import { fetchMatchedOpportunities } from '../services/api';
import OpportunityHero from '../components/opportunities/OpportunityHero';
import OpportunityFilter from '../components/opportunities/OpportunityFilter';
import OpportunityCard from '../components/opportunities/OpportunityCard';
import OpportunityDetailModal from '../components/opportunities/OpportunityDetailModal';
import ApplicationPrepModal from '../components/opportunities/ApplicationPrepModal';

const SAVED_OPPS_KEY = 'bsn_saved_opportunities';

type ActiveSectionTab = 'best-matches' | 'trending' | 'unlock-growth' | 'explore-paths' | 'saved';

export const OpportunitiesPage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [opportunities, setOpportunities] = useState<OpportunityMatchResult[]>([]);
  const [stats, setStats] = useState<OpportunityStats>({
    totalOpportunities: 0,
    bestMatchScore: 0,
    unlockedCount: 0,
    topInDemandSkills: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveSectionTab>('best-matches');
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_OPPS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Filter State
  const [filterState, setFilterState] = useState<OpportunityFilterState>({
    searchQuery: '',
    category: 'All',
    minMatchScore: 0,
    experienceLevel: 'All',
    location: 'All',
  });

  // Modal states
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityMatchResult | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [prepModalOpen, setPrepModalOpen] = useState(false);

  // Load User Profile & Run Matching
  useEffect(() => {
    const saved = localStorage.getItem('bsn_user_profile');
    let currentProfile: UserProfile | null = null;

    if (saved) {
      try {
        currentProfile = JSON.parse(saved) as UserProfile;
        setProfile(currentProfile);
      } catch (e) {
        console.error('Failed to parse user profile:', e);
      }
    }

    // Run matching on backend
    setIsLoading(true);
    fetchMatchedOpportunities(currentProfile)
      .then(res => {
        if (res.data) {
          setOpportunities(res.data);
          if (res.stats) {
            setStats(res.stats);
          }
        }
      })
      .catch(err => console.error('Failed to match opportunities:', err))
      .finally(() => setIsLoading(false));
  }, []);

  // Sync saved IDs to localStorage
  const handleToggleSave = (id: string) => {
    setSavedIds(prev => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter(item => item !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem(SAVED_OPPS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateFilter = (updates: Partial<OpportunityFilterState>) => {
    setFilterState(prev => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      searchQuery: '',
      category: 'All',
      minMatchScore: 0,
      experienceLevel: 'All',
      location: 'All',
    });
  };

  const handleViewDetails = (opp: OpportunityMatchResult) => {
    setSelectedOpportunity(opp);
    setDetailModalOpen(true);
  };

  const handlePrepareApply = (opp: OpportunityMatchResult) => {
    setSelectedOpportunity(opp);
    setPrepModalOpen(true);
  };

  // 1. Filter opportunities by search and dropdowns
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      // Search filter
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase().trim();
        const matchesText = 
          opp.title.toLowerCase().includes(query) ||
          opp.organization.toLowerCase().includes(query) ||
          opp.category.toLowerCase().includes(query) ||
          opp.description.toLowerCase().includes(query) ||
          opp.requiredSkills.some(s => s.toLowerCase().includes(query));

        if (!matchesText) return false;
      }

      // Category filter
      if (filterState.category !== 'All' && opp.category !== filterState.category) {
        return false;
      }

      // Min Match Score filter
      if (filterState.minMatchScore > 0 && opp.matchPercentage < filterState.minMatchScore) {
        return false;
      }

      // Experience Level filter
      if (filterState.experienceLevel !== 'All') {
        const oppLevel = opp.experienceLevel.toLowerCase();
        const filterLvl = filterState.experienceLevel.toLowerCase();
        if (!oppLevel.includes('all') && oppLevel !== filterLvl) {
          return false;
        }
      }

      // Location filter
      if (filterState.location !== 'All') {
        const isRemote = opp.location.toLowerCase().includes('remote');
        if (filterState.location === 'Remote' && !isRemote) return false;
        if (filterState.location === 'Hybrid' && isRemote && !opp.location.toLowerCase().includes('hybrid')) return false;
      }

      return true;
    });
  }, [opportunities, filterState]);

  // 2. Segment by Section Tabs
  const displayedOpportunities = useMemo(() => {
    switch (activeTab) {
      case 'best-matches':
        // Opportunities with high match score (>= 65%)
        return filteredOpportunities.filter(o => o.matchPercentage >= 65);
      case 'trending':
        return filteredOpportunities.filter(o => o.trending || o.featured);
      case 'unlock-growth':
        // Opportunities that are locked or where user is 1-2 skills away
        return filteredOpportunities.filter(o => o.isLocked || o.skillsAway > 0);
      case 'explore-paths':
        // Cross-domain or emerging opportunities
        return filteredOpportunities.filter(o => o.matchPercentage < 75 && !o.isLocked);
      case 'saved':
        return filteredOpportunities.filter(o => savedIds.includes(o.id));
      default:
        return filteredOpportunities;
    }
  }, [filteredOpportunities, activeTab, savedIds]);

  const SECTION_TABS = [
    { id: 'best-matches', label: 'Best Matches For You', icon: Flame, badge: `${opportunities.filter(o => o.matchPercentage >= 65).length}` },
    { id: 'trending', label: 'Trending Opportunities', icon: TrendingUp, badge: `${opportunities.filter(o => o.trending).length}` },
    { id: 'unlock-growth', label: 'Unlock With Growth', icon: Lock, badge: `${opportunities.filter(o => o.isLocked || o.skillsAway > 0).length}` },
    { id: 'explore-paths', label: 'Explore New Paths', icon: Compass, badge: null },
    { id: 'saved', label: 'Saved Opportunities', icon: Heart, badge: `${savedIds.length}` },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 min-h-screen">
      
      {/* 1. Hero Banner with Counters */}
      <OpportunityHero stats={stats} userName={profile?.name} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        
        {/* Guest Warning / Profile Sync Banner */}
        {!profile && (
          <div className="mb-8 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                <User className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white">Viewing as Guest Explorer: </strong>
                <span className="text-slate-300">Complete your onboarding to unlock personalized AI matching scores tailored to your verified skills.</span>
              </div>
            </div>
            <Link
              to="/onboarding"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors flex-shrink-0"
            >
              <span>Build Skill Identity</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* 2. Interactive Search & Dropdown Filters */}
        <OpportunityFilter
          filterState={filterState}
          onFilterChange={handleUpdateFilter}
          onResetFilters={handleResetFilters}
          totalFilteredCount={filteredOpportunities.length}
        />

        {/* 3. Section Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800/80 scrollbar-none">
          {SECTION_TABS.map(tab => {
            const isCurrent = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveSectionTab)}
                className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-900 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/40 hover:bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    isCurrent ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 4. Opportunities Grid */}
        {isLoading ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-xs text-slate-400 font-mono">Running AI Opportunity Match Engine...</p>
          </div>
        ) : displayedOpportunities.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                No Opportunities Found
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeTab === 'saved' 
                  ? 'You haven\'t saved any opportunities yet. Click the heart icon on any opportunity card to save it for later.'
                  : 'No opportunities matched your current search and filter criteria. Try resetting filters or searching for different skills.'}
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedOpportunities.map(opp => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isSaved={savedIds.includes(opp.id)}
                onToggleSave={handleToggleSave}
                onViewDetails={handleViewDetails}
                onPrepareApply={handlePrepareApply}
              />
            ))}
          </div>
        )}

      </div>

      {/* 5. Opportunity Details Modal */}
      <OpportunityDetailModal
        opportunity={selectedOpportunity}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        isSaved={selectedOpportunity ? savedIds.includes(selectedOpportunity.id) : false}
        onToggleSave={handleToggleSave}
        onPrepareApply={handlePrepareApply}
      />

      {/* 6. Application Preparation Modal */}
      <ApplicationPrepModal
        opportunity={selectedOpportunity}
        userProfile={profile}
        isOpen={prepModalOpen}
        onClose={() => setPrepModalOpen(false)}
      />

    </div>
  );
};

export default OpportunitiesPage;
