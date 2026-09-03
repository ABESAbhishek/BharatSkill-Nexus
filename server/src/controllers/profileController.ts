import { Request, Response } from 'express';
import { 
  createUserProfile, 
  getUserById, 
  getUserByEmail, 
  CreateProfileInput 
} from '../services/userService.js';

/**
 * Handle POST /api/profile
 */
export const createProfile = (req: Request, res: Response): void => {
  try {
    const { 
      name, 
      email, 
      location, 
      education, 
      skills, 
      interests, 
      careerGoal, 
      experienceLevel, 
      learningPreference 
    } = req.body;

    if (!name || !email) {
      res.status(400).json({
        status: 'error',
        message: 'Name and Email are required fields.'
      });
      return;
    }

    const input: CreateProfileInput = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      location: String(location || '').trim(),
      education: String(education || '').trim(),
      skills: Array.isArray(skills) ? skills.map(s => String(s).trim()).filter(Boolean) : [],
      interests: Array.isArray(interests) ? interests.map(i => String(i).trim()).filter(Boolean) : [],
      careerGoal: String(careerGoal || '').trim(),
      experienceLevel: String(experienceLevel || 'Beginner').trim(),
      learningPreference: String(learningPreference || 'Build Projects').trim(),
    };

    const profile = createUserProfile(input);

    res.status(201).json({
      status: 'success',
      message: 'Profile saved successfully',
      data: profile
    });
  } catch (error: any) {
    console.error('Error saving profile:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to save profile'
    });
  }
};

/**
 * Handle GET /api/profile/:id or GET /api/profile?email=...
 */
export const getProfile = (req: Request, res: Response): void => {
  try {
    const idParam = req.params?.id;
    const id = typeof idParam === 'string' ? idParam : undefined;
    const emailQuery = typeof req.query?.email === 'string' ? req.query.email : undefined;

    let profile = null;

    if (id) {
      profile = getUserById(id);
    } else if (emailQuery) {
      profile = getUserByEmail(emailQuery);
    }

    if (!profile) {
      res.status(404).json({
        status: 'error',
        message: 'Profile not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: profile
    });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to fetch profile'
    });
  }
};
