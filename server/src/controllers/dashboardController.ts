import { Request, Response } from 'express';
import { getUnifiedDashboardData } from '../services/dashboardService.js';
import { UserProfile } from '../services/userService.js';

/**
 * Handle GET /api/dashboard/:userId
 */
export const getDashboardByUserId = (req: Request, res: Response): void => {
  try {
    const idParam = req.params?.userId;
    const userId = typeof idParam === 'string' ? idParam : undefined;

    const data = getUnifiedDashboardData(userId);

    res.status(200).json({
      status: 'success',
      data
    });
  } catch (error: any) {
    console.error('Error in getDashboardByUserId:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to fetch dashboard data'
    });
  }
};

/**
 * Handle POST /api/dashboard
 */
export const getDashboardWithProfile = (req: Request, res: Response): void => {
  try {
    const body = req.body;
    let userId: string | undefined = undefined;
    let profileInput: UserProfile | undefined = undefined;

    if (body.userId) {
      userId = String(body.userId);
    } else if (body.id && body.skills) {
      profileInput = body as UserProfile;
    }

    const data = getUnifiedDashboardData(userId, profileInput);

    res.status(200).json({
      status: 'success',
      data
    });
  } catch (error: any) {
    console.error('Error in getDashboardWithProfile:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to generate dashboard data'
    });
  }
};
