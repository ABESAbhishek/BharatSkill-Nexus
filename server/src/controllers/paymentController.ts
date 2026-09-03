import { Request, Response } from 'express';
import { 
  readServices, 
  getServiceById, 
  processX402Payment, 
  generatePremiumResult,
  X402PaymentRequest
} from '../services/paymentService.js';
import { getUserById, UserProfile } from '../services/userService.js';

/**
 * Handle GET /api/payments/services
 */
export const getAvailableServices = (_req: Request, res: Response): void => {
  try {
    const services = readServices();
    res.status(200).json({
      status: 'success',
      count: services.length,
      data: services
    });
  } catch (error: any) {
    console.error('Error in getAvailableServices:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to fetch services catalog'
    });
  }
};

/**
 * Handle POST /api/payments/process
 */
export const processPaymentTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const { serviceId, userId, profile, mode, providedTxId } = body;

    if (!serviceId) {
      res.status(400).json({
        status: 'error',
        message: 'serviceId is required for x402 payment authorization'
      });
      return;
    }

    const service = getServiceById(serviceId);
    if (!service) {
      res.status(404).json({
        status: 'error',
        message: 'Requested agent service not found'
      });
      return;
    }

    const tx = await processX402Payment({
      serviceId,
      userId,
      profile,
      mode: mode || 'demo',
      providedTxId
    });

    // Also generate unlocked result
    let userProfile: UserProfile | undefined = profile;
    if (!userProfile && userId) {
      userProfile = getUserById(userId) || undefined;
    }
    const result = generatePremiumResult(serviceId, userProfile, tx);

    res.status(200).json({
      status: 'success',
      transaction: tx,
      result
    });
  } catch (error: any) {
    console.error('Error in processPaymentTransaction:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'x402 payment processing failed'
    });
  }
};

/**
 * Handle GET /api/payments/result/:serviceId
 */
export const getPremiumServiceResult = (req: Request, res: Response): void => {
  try {
    const serviceIdParam = req.params?.serviceId;
    const serviceId = typeof serviceIdParam === 'string' ? serviceIdParam : undefined;

    if (!serviceId) {
      res.status(400).json({
        status: 'error',
        message: 'serviceId is required'
      });
      return;
    }

    const result = generatePremiumResult(serviceId);

    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error: any) {
    console.error('Error in getPremiumServiceResult:', error);
    res.status(500).json({
      status: 'error',
      message: error?.message || 'Failed to fetch premium result'
    });
  }
};
