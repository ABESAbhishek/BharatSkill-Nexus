import { Router } from 'express';
import { getDashboardByUserId, getDashboardWithProfile } from '../controllers/dashboardController.js';

const router = Router();

router.get('/', getDashboardByUserId);
router.post('/', getDashboardWithProfile);
router.get('/:userId', getDashboardByUserId);

export default router;
