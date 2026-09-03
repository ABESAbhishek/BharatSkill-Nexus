import { Router } from 'express';
import { 
  getAvailableServices, 
  processPaymentTransaction, 
  getPremiumServiceResult 
} from '../controllers/paymentController.js';

const router = Router();

router.get('/services', getAvailableServices);
router.post('/process', processPaymentTransaction);
router.get('/result/:serviceId', getPremiumServiceResult);

export default router;
