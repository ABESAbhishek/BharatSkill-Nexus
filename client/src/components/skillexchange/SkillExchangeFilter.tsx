import React from 'react';
import { Search, Filter, Sparkles, BookOpen, HelpCircle } from 'lucide-react';

interface SkillExchangeFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedType: 'all' | 'offer' | 'request';
  onTypeChange: (type: 'all' | 'offer' | 'request') => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
}

export const SkillExchangeFilter: React.FC<SkillExchangeFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  categories
}) => {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 shadow-xl space-y-4">
      
      {/* Top Search & Type Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search skills, topics, or mentors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center space-x-1.5 p-1 rounded-2xl bg-zinc-900 border border-zinc-800 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => onTypeChange('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedType === 'all'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Exchanges
          </button>

          <button
            onClick={() => onTypeChange('offer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              selectedType === 'offer'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>Offers (Teach)</span>
          </button>

          <button
            onClick={() => onTypeChange('request')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              selectedType === 'request'
                ? 'bg-amber-400 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3 h-3" />
            <span>Help Bounties</span>
          </button>
        </div>

      </div>

      {/* Category Horizontal Scrolling Badges */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
        <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mr-1">Categories:</span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1 rounded-xl whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-zinc-800 text-white border-zinc-600 font-bold'
                : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

    </div>
  );
};

export default SkillExchangeFilter;
