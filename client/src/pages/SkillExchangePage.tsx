import React, { useState, useEffect } from 'react';
import { RefreshCw, PlusCircle, HelpCircle, Users, Coins } from 'lucide-react';
import { SkillExchangeItem, BookingReceipt, UserProfile } from '../types/api';
import { fetchSkillExchanges } from '../services/api';
import SkillExchangeHero from '../components/skillexchange/SkillExchangeHero';
import SkillExchangeFilter from '../components/skillexchange/SkillExchangeFilter';
import SkillExchangeCard from '../components/skillexchange/SkillExchangeCard';
import BookingModal from '../components/skillexchange/BookingModal';
import CreateExchangeModal from '../components/skillexchange/CreateExchangeModal';
import EscrowVisualizer from '../components/skillexchange/EscrowVisualizer';

const LOCAL_STORAGE_EXCHANGES = 'bsn_skill_exchanges';

export const SkillExchangePage: React.FC = () => {
  const [exchanges, setExchanges] = useState<SkillExchangeItem[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'offer' | 'request'>('all');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals
  const [bookingItem, setBookingItem] = useState<SkillExchangeItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createInitialType, setCreateInitialType] = useState<'offer' | 'request'>('offer');

  useEffect(() => {
    // 1. Read profile
    const savedProf = localStorage.getItem('bsn_user_profile');
    if (savedProf) {
      try {
        setUserProfile(JSON.parse(savedProf));
      } catch (e) {
        console.error('Error parsing profile:', e);
      }
    }

    // 2. Fetch exchanges
    setIsLoading(true);
    fetchSkillExchanges()
      .then(res => {
        if (res.data && res.data.length > 0) {
          // Merge with any locally added items
          const localAdded = localStorage.getItem(LOCAL_STORAGE_EXCHANGES);
          if (localAdded) {
            try {
              const localList = JSON.parse(localAdded) as SkillExchangeItem[];
              const existingIds = new Set(res.data.map(d => d.id));
              const uniqueLocal = localList.filter(l => !existingIds.has(l.id));
              setExchanges([...uniqueLocal, ...res.data]);
              return;
            } catch (e) {}
          }
          setExchanges(res.data);
        }
      })
      .catch(err => console.error('Failed to load skill exchanges:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleOpenCreateModal = (type: 'offer' | 'request') => {
    setCreateInitialType(type);
    setCreateModalOpen(true);
  };

  const handleCreated = (newItem: SkillExchangeItem) => {
    setExchanges(prev => {
      const updated = [newItem, ...prev];
      localStorage.setItem(LOCAL_STORAGE_EXCHANGES, JSON.stringify(updated));
      return updated;
    });
  };

  const handleOpenBooking = (item: SkillExchangeItem) => {
    setBookingItem(item);
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = (receipt: BookingReceipt) => {
    // Optionally trigger a notification or storage event
    window.dispatchEvent(new Event('storage'));
  };

  // Categories extraction
  const categories = ['All', 'Web Development', 'Artificial Intelligence', 'Blockchain', 'Backend Engineering', 'Product Design', 'Data Science'];

  // Filtered List
  const filteredExchanges = exchanges.filter(item => {
    // Type Filter
    if (selectedType !== 'all' && item.type !== selectedType) return false;

    // Category Filter
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = item.title.toLowerCase().includes(q);
      const inAuthor = item.author.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      const inTags = item.tags.some(t => t.toLowerCase().includes(q));
      if (!inTitle && !inAuthor && !inDesc && !inTags) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-black text-white min-h-screen">
      
      {/* 1. Hero Banner */}
      <SkillExchangeHero
        onOpenCreateModal={handleOpenCreateModal}
        totalListings={exchanges.length}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-10">
        
        {/* 2. Filter Toolbar */}
        <SkillExchangeFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* 3. Listings Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Live Peer Exchanges & Bounties</h2>
              <p className="text-xs text-zinc-400">1-on-1 mentorship pairings and open code review bounties</p>
            </div>
            <span className="text-xs text-amber-400 font-mono font-semibold">
              Showing {filteredExchanges.length} listings
            </span>
          </div>

          {isLoading ? (
            <div className="min-h-[30vh] flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-white animate-spin" />
              <p className="text-xs text-zinc-400 font-mono">Loading Peer Guild Marketplace...</p>
            </div>
          ) : filteredExchanges.length === 0 ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-400 mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No listings match your filter</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Try selecting a different category or be the first to publish a new skill offer or bounty.
              </p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-white hover:bg-zinc-800 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExchanges.map(item => (
                <SkillExchangeCard
                  key={item.id}
                  item={item}
                  onBook={handleOpenBooking}
                />
              ))}
            </div>
          )}
        </div>

        {/* 4. Escrow Mechanism Visualizer */}
        <EscrowVisualizer />

      </div>

      {/* 5. Modals */}
      <BookingModal
        item={bookingItem}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        userProfile={userProfile}
        onBookingSuccess={handleBookingSuccess}
      />

      <CreateExchangeModal
        initialType={createInitialType}
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        userProfile={userProfile}
        onCreated={handleCreated}
      />

    </div>
  );
};

export default SkillExchangePage;
