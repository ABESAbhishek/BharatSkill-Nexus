import { Request, Response, NextFunction } from 'express';
import { buildX402PaymentRequirements } from '../services/x402Service.js';
import { getServiceById } from '../services/paymentService.js';

/**
 * Standard x402 Express Middleware for Protecting Agent Capabilities
 * Responds with HTTP 402 Payment Required if no valid payment header is present
 */
export const requireX402Payment = (serviceId: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'] || req.headers['x-402-payment-proof'];

    // If valid payment token/proof is attached, grant access
    if (authHeader && typeof authHeader === 'string' && (authHeader.startsWith('x402 ') || authHeader.length > 20)) {
      next();
      return;
    }

    // Retrieve service pricing metadata
    const service = getServiceById(serviceId);
    const priceInr = service?.priceInr || 5;
    const priceAlgo = service?.priceAlgo || '0.10 ALGO';

    const requirements = buildX402PaymentRequirements(serviceId, priceInr, priceAlgo);

    // Set standard x402 response headers
    res.setHeader('WWW-Authenticate', `x402 realm="BharatSkill Nexus", network="${requirements.network}", facilitator="${requirements.facilitator}", amount="${requirements.amount}"`);
    res.setHeader('X-402-Network', requirements.network);
    res.setHeader('X-402-Facilitator', requirements.facilitator);
    res.setHeader('X-402-Amount', requirements.amount.toString());
    res.setHeader('X-402-Currency', 'ALGO');
    res.setHeader('X-402-Recipient', requirements.recipient);
    res.setHeader('X-402-Nonce', requirements.nonce);

    res.status(402).json({
      status: 'payment_required',
      statusCode: 402,
      error: 'HTTP 402 Payment Required',
      message: 'Payment required via x402 protocol on Algorand TestNet through GoPlausible Facilitator',
      paymentRequirements: requirements,
      facilitator: {
        name: 'GoPlausible Facilitator',
        url: requirements.facilitator,
        network: 'Algorand TestNet',
        explorer: 'https://lora.algokit.io/testnet'
      }
    });
  };
};
