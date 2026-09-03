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
  return path.resolve(cwd, 'data', 'users.json');
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

// In-memory user store for serverless environments
let memoryUsers: UserProfile[] = [
  {
    id: "usr_aarav",
    name: "Aarav Patel",
    email: "aarav.patel@example.com",
    location: "Bengaluru, Karnataka",
    education: "B.Tech Computer Science (3rd Year)",
    skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs"],
    interests: ["Web Development", "Artificial Intelligence", "Blockchain"],
    careerGoal: "Full-Stack Developer Intern",
    experienceLevel: "Intermediate",
    learningPreference: "Build Projects",
    profileStrength: 95,
    createdAt: "2026-08-30T10:00:00.000Z",
    updatedAt: "2026-08-30T10:00:00.000Z"
  }
];

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
    score += Math.min(25, data.skills.length * 5);
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
 * Read all user profiles from JSON storage with memory fallback
 */
export function readUsers(): UserProfile[] {
  try {
    const filePath = getStorageFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw) as UserProfile[];
      if (Array.isArray(data) && data.length > 0) {
        memoryUsers = data;
      }
    }
  } catch (error) {
    // Silently fall back to memory on serverless environments
  }
  return memoryUsers;
}

/**
 * Write user profiles with safe serverless catch
 */
export function writeUsers(users: UserProfile[]): void {
  memoryUsers = users;
  try {
    const filePath = getStorageFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    // Harmless in serverless environment (read-only file system)
  }
}

/**
 * Create or update a user profile
 */
export function createUserProfile(input: CreateProfileInput): UserProfile {
  const users = readUsers();
  const existingIndex = users.findIndex(u => u.email?.toLowerCase() === input.email?.toLowerCase());
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
  return users.find(u => u.email?.toLowerCase() === email?.toLowerCase()) || null;
}
