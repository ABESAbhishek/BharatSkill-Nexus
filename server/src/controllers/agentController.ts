import { Request, Response } from 'express';
import { 
  analyzeUserProfile, 
  getAnalysisByUserId 
} from '../services/agentAnalysisService.js';
import { getUserById, UserProfile } from '../services/userService.js';

/**
 * Handle POST /api/agent/analyze
 */
export const runAnalysis = (req: Request, res: Response): void => {
  try {
    const body = req.body;
    let profile: UserProfile | null = null;

    if (body.userId) {
      profile = getUserById(String(body.userId));
    }

    if (!profile && body.name && body.skills) {
      profile = body as UserProfile;
    }

    if (!profile) {
      res.status(400).json({
        status: 'error',
        message: 'Valid user profile or userId is required for agent analysis.'
      });
      return;
    }

    const report = analyzeUserProfile(profile);

    res.status(200).json({
      status: 'success',
      message: 'Agent analysis completed successfully',
      data: report
    });
  } catch (error: any) {
    console.error('Error running agent analysis:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to complete agent analysis'
    });
  }
};

/**
 * Handle GET /api/agent/analysis/:userId
 */
export const getAnalysis = (req: Request, res: Response): void => {
  try {
    const userIdParam = req.params?.userId;
    const userId = typeof userIdParam === 'string' ? userIdParam : undefined;

    if (!userId) {
      res.status(400).json({
        status: 'error',
        message: 'User ID is required'
      });
      return;
    }

    const report = getAnalysisByUserId(userId);

    if (!report) {
      res.status(404).json({
        status: 'error',
        message: 'No analysis found for this user. Run analysis first.'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: report
    });
  } catch (error: any) {
    console.error('Error fetching analysis:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to fetch agent analysis'
    });
  }
};
