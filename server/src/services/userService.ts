import fs from 'fs';
import path from 'path';

// Resolve data directory robustly whether run from root or server dir
const getStorageFilePath = (): string => {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'server', 'data'))) {
    return path.join(cwd, 'server', 'data', 'users.json');
  }
  if (fs.existsSync(path.join(cwd, 'data'))) {
    return path.join(cwd, 'data', 'users.json');
  }
  const fallback = path.resolve(cwd, 'data');
  return path.join(fallback, 'users.json');
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  location: string;
  education: string;
  skills: string[];
  interests: string[];
  careerGoal: string;
  experienceLevel: string;
  learningPreference: string;
  profileStrength: number;
  createdAt: string;
  updatedAt: string;
}

export type CreateProfileInput = Omit<UserProfile, 'id' | 'profileStrength' | 'createdAt' | 'updatedAt'>;

/**
 * Calculate Profile Completeness Score (0-100%)
 */
export function calculateProfileStrength(data: Partial<CreateProfileInput>): number {
  let score = 0;

  // Basic Info (25%)
  if (data.name?.trim()) score += 7;
  if (data.email?.trim()) score += 6;
  if (data.location?.trim()) score += 6;
  if (data.education?.trim()) score += 6;

  // Skills (25%)
  if (data.skills && data.skills.length > 0) {
    score += Math.min(25, data.skills.length * 5); // 5 points per skill up to 25
  }

  // Interests & Goal (25%)
  if (data.careerGoal?.trim()) score += 13;
  if (data.interests && data.interests.length > 0) {
    score += Math.min(12, data.interests.length * 4);
  }

  // Experience & Learning Style (25%)
  if (data.experienceLevel?.trim()) score += 13;
  if (data.learningPreference?.trim()) score += 12;

  return Math.min(100, Math.round(score));
}

/**
 * Ensure storage directory and file exist
 */
function ensureDataFile(): string {
  const filePath = getStorageFilePath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
  }
  return filePath;
}

/**
 * Read all user profiles from JSON storage
 */
export function readUsers(): UserProfile[] {
  const filePath = ensureDataFile();
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as UserProfile[];
  } catch (error) {
    console.error('Error reading users.json, returning empty list:', error);
    return [];
  }
}

/**
 * Write user profiles to JSON storage
 */
export function writeUsers(users: UserProfile[]): void {
  const filePath = ensureDataFile();
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}

/**
 * Create or update a user profile
 */
export function createUserProfile(input: CreateProfileInput): UserProfile {
  const users = readUsers();
  const existingIndex = users.findIndex(u => u.email.toLowerCase() === input.email.toLowerCase());
  const now = new Date().toISOString();
  const profileStrength = calculateProfileStrength(input);

  if (existingIndex >= 0) {
    const updatedUser: UserProfile = {
      ...users[existingIndex],
      ...input,
      profileStrength,
      updatedAt: now,
    };
    users[existingIndex] = updatedUser;
    writeUsers(users);
    return updatedUser;
  }

  const newUser: UserProfile = {
    id: `bsn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...input,
    profileStrength,
    createdAt: now,
    updatedAt: now,
  };

  users.push(newUser);
  writeUsers(users);
  return newUser;
}

/**
 * Get user profile by ID
 */
export function getUserById(id: string): UserProfile | null {
  const users = readUsers();
  return users.find(u => u.id === id) || null;
}

/**
 * Get user profile by Email
 */
export function getUserByEmail(email: string): UserProfile | null {
  const users = readUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}
