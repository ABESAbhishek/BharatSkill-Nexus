import { Request, Response } from 'express';
import { 
  readOpportunities, 
  getOpportunityById, 
  getMatchedOpportunities 
} from '../services/opportunityService.js';
import { getUserById, UserProfile } from '../services/userService.js';

/**
 * Handle GET /api/opportunities
 */
export const getAllOpportunities = (_req: Request, res: Response): void => {
  try {
    const opps = readOpportunities();
    res.status(200).json({
      status: 'success',
      count: opps.length,
      data: opps
    });
  } catch (error: any) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to fetch opportunities'
    });
  }
};

/**
 * Handle GET /api/opportunities/:id
 */
export const getSingleOpportunity = (req: Request, res: Response): void => {
  try {
    const idParam = req.params?.id;
    const id = typeof idParam === 'string' ? idParam : undefined;

    if (!id) {
      res.status(400).json({
        status: 'error',
        message: 'Opportunity ID is required'
      });
      return;
    }

    const opp = getOpportunityById(id);
    if (!opp) {
      res.status(404).json({
        status: 'error',
        message: 'Opportunity not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: opp
    });
  } catch (error: any) {
    console.error('Error fetching opportunity:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to fetch opportunity'
    });
  }
};

/**
 * Handle POST /api/opportunities/match
 */
export const matchOpportunities = (req: Request, res: Response): void => {
  try {
    const body = req.body;
    let profile: UserProfile | null = null;

    if (body.userId) {
      profile = getUserById(String(body.userId));
    }

    if (!profile && body.name && body.skills) {
      profile = body as UserProfile;
    }

    // If no profile is passed, fallback to a sensible default (e.g. for guest preview)
    if (!profile) {
      profile = {
        id: 'guest_preview',
        name: 'Guest Explorer',
        email: 'guest@example.com',
        location: 'India',
        education: 'Undergraduate',
        skills: ['Python', 'JavaScript', 'React'],
        interests: ['Web Development', 'Artificial Intelligence'],
        careerGoal: 'Get an Internship',
        experienceLevel: 'Intermediate',
        learningPreference: 'Build Projects',
        profileStrength: 80,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    const matched = getMatchedOpportunities(profile);

    // Calculate aggregated match stats
    const totalCount = matched.length;
    const bestMatchScore = matched.length > 0 ? matched[0].matchPercentage : 0;
    const unlockedCount = matched.filter(o => !o.isLocked).length;

    // Collect top in-demand skills across opportunities
    const skillCountMap: Record<string, number> = {};
    matched.forEach(opp => {
      opp.requiredSkills.forEach(s => {
        skillCountMap[s] = (skillCountMap[s] || 0) + 1;
      });
    });

    const topInDemandSkills = Object.entries(skillCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill]) => skill);

    res.status(200).json({
      status: 'success',
      stats: {
        totalOpportunities: totalCount,
        bestMatchScore,
        unlockedCount,
        topInDemandSkills
      },
      data: matched
    });
  } catch (error: any) {
    console.error('Error matching opportunities:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to match opportunities'
    });
  }
};
