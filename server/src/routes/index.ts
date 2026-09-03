import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import profileRoutes from './profileRoutes.js';
import agentRoutes from './agentRoutes.js';
import opportunityRoutes from './opportunityRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import paymentRoutes from './paymentRoutes.js';

const router = Router();

router.use('/', healthRoutes);
router.use('/profile', profileRoutes);
router.use('/agent', agentRoutes);
router.use('/opportunities', opportunityRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/payments', paymentRoutes);

export default router;
