import { Router } from 'express';
import { 
  getSkillExchanges, 
  postSkillExchange, 
  bookSession 
} from '../controllers/skillExchangeController.js';

const router = Router();

router.get('/', getSkillExchanges);
router.post('/create', postSkillExchange);
router.post('/book', bookSession);

export default router;
