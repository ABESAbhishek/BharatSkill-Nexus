import React from 'react';
import { Search, Filter, X, Trophy, Briefcase, Globe, Award, GraduationCap } from 'lucide-react';
import { OpportunityFilterState } from '../../types/api';

interface OpportunityFilterProps {
  filterState: OpportunityFilterState;
  onFilterChange: (updates: Partial<OpportunityFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

const CATEGORIES = [
  { id: 'All', label: 'All Opportunities', icon: null },
  { id: 'Hackathon', label: 'Hackathons', icon: Trophy },
  { id: 'Internship', label: 'Internships', icon: Briefcase },
  { id: 'Open Source', label: 'Open Source', icon: Globe },
  { id: 'Bounty', label: 'Bounties', icon: Award },
  { id: 'Fellowship', label: 'Fellowships', icon: GraduationCap },
];

export const OpportunityFilter: React.FC<OpportunityFilterProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  totalFilteredCount
}) => {
  const isFiltered = 
    filterState.searchQuery !== '' || 
    filterState.category !== 'All' || 
    filterState.minMatchScore > 0 || 
    filterState.experienceLevel !== 'All' || 
    filterState.location !== 'All';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md space-y-4 mb-8">
      
      {/* Search Bar + Dropdown Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, organization, skill (e.g. React, Algorand, AI)..."
            value={filterState.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 transition-colors"
          />
          {filterState.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown 1: Min Match Score */}
        <div className="md:col-span-2">
          <select
            value={filterState.minMatchScore}
            onChange={(e) => onFilterChange({ minMatchScore: Number(e.target.value) })}
            className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-xl py-2.5 px-3 text-xs text-slate-200 cursor-pointer"
          >
            <option value={0}>Match: All Fits</option>
            <option value={80}>Match: 80%+ (High)</option>
            <option value={60}>Match: 60%+ (Good)</option>
          </select>
        </div>

        {/* Dropdown 2: Experience Level */}
        <div className="md:col-span-2">
          <select
            value={filterState.experienceLevel}
            onChange={(e) => onFilterChange({ experienceLevel: e.target.value })}
            className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-xl py-2.5 px-3 text-xs text-slate-200 cursor-pointer"
          >
            <option value="All">Level: All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Dropdown 3: Location */}
        <div className="md:col-span-2">
          <select
            value={filterState.location}
            onChange={(e) => onFilterChange({ location: e.target.value })}
            className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-xl py-2.5 px-3 text-xs text-slate-200 cursor-pointer"
          >
            <option value="All">Location: All</option>
            <option value="Remote">Remote Only</option>
            <option value="Hybrid">Hybrid / On-site</option>
          </select>
        </div>

        {/* Reset Filter Button */}
        <div className="md:col-span-1 flex justify-end">
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center space-x-1 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
              title="Reset Filters"
            >
              <X className="w-3.5 h-3.5" />
              <span className="md:hidden">Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
        {CATEGORIES.map(cat => {
          const isSelected = filterState.category === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.id })}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          );
        })}

        <div className="ml-auto text-xs text-slate-400 font-mono hidden sm:block">
          Showing <strong className="text-white">{totalFilteredCount}</strong> matching opportunities
        </div>
      </div>

    </div>
  );
};

export default OpportunityFilter;
