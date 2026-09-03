import { Router } from 'express';
import { 
  getAllOpportunities, 
  getSingleOpportunity, 
  matchOpportunities 
} from '../controllers/opportunityController.js';

const router = Router();

router.get('/', getAllOpportunities);
router.post('/match', matchOpportunities);
router.get('/:id', getSingleOpportunity);

export default router;
