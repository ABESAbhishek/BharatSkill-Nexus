import { Router } from 'express';
import { runAnalysis, getAnalysis } from '../controllers/agentController.js';

const router = Router();

router.post('/analyze', runAnalysis);
router.get('/analysis/:userId', getAnalysis);

export default router;
