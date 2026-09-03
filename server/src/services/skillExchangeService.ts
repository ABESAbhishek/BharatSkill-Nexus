import fs from 'fs';
import path from 'path';

const getFilePath = (): string => {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'server', 'data', 'skillExchanges.json'))) {
    return path.join(cwd, 'server', 'data', 'skillExchanges.json');
  }
  if (fs.existsSync(path.join(cwd, 'data', 'skillExchanges.json'))) {
    return path.join(cwd, 'data', 'skillExchanges.json');
  }
  return path.resolve(cwd, 'data', 'skillExchanges.json');
};

export interface SkillExchangeItem {
  id: string;
  type: 'offer' | 'request';
  title: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  rate: number;
  rateUnit: string;
  rating: number;
  reviewsCount: number;
  description: string;
  availability: string;
  sessionDuration: string;
  createdAt?: string;
}

export interface BookingReceipt {
  bookingId: string;
  exchangeId: string;
  exchangeTitle: string;
  mentorName: string;
  learnerName: string;
  creditsEscrowed: number;
  sessionTime: string;
  status: 'escrow_locked' | 'completed';
  meetingLink: string;
  timestamp: string;
}

// In-memory fallback
let memoryExchanges: SkillExchangeItem[] = [];

/**
 * Read all skill exchange listings
 */
export function readSkillExchanges(): SkillExchangeItem[] {
  const filePath = getFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw) as SkillExchangeItem[];
      memoryExchanges = data;
      return data;
    }
  } catch (error) {
    console.error('Error reading skillExchanges.json:', error);
  }
  return memoryExchanges;
}

/**
 * Create a new skill exchange listing (Offer or Help Bounty)
 */
export function createSkillExchange(item: Omit<SkillExchangeItem, 'id' | 'rating' | 'reviewsCount'>): SkillExchangeItem {
  const exchanges = readSkillExchanges();
  const newItem: SkillExchangeItem = {
    ...item,
    id: `se_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    rating: 5.0,
    reviewsCount: 1,
    createdAt: new Date().toISOString()
  };

  exchanges.unshift(newItem);
  memoryExchanges = exchanges;

  try {
    const filePath = getFilePath();
    if (fs.existsSync(path.dirname(filePath))) {
      fs.writeFileSync(filePath, JSON.stringify(exchanges, null, 2), 'utf-8');
    }
  } catch (e) {
    console.warn('Could not write skillExchanges to disk, kept in memory:', e);
  }

  return newItem;
}

/**
 * Book a 1-on-1 session or claim a bounty
 */
export function bookExchangeSession(exchangeId: string, learnerName: string, scheduledTime?: string): BookingReceipt {
  const exchanges = readSkillExchanges();
  const exchange = exchanges.find(e => e.id === exchangeId);

  const title = exchange ? exchange.title : 'Peer Skill Exchange Session';
  const mentor = exchange ? exchange.author : 'Peer Mentor';
  const rate = exchange ? exchange.rate : 25;

  const meetingId = Math.random().toString(36).substring(2, 9);

  return {
    bookingId: `book_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    exchangeId,
    exchangeTitle: title,
    mentorName: mentor,
    learnerName: learnerName || 'You',
    creditsEscrowed: rate,
    sessionTime: scheduledTime || 'Scheduled for Today @ 5:00 PM IST',
    status: 'escrow_locked',
    meetingLink: `https://meet.bharatskill.nexus/room/${meetingId}`,
    timestamp: new Date().toISOString()
  };
}
