import { Router } from 'express';
import { createProfile, getProfile } from '../controllers/profileController.js';

const router = Router();

router.post('/', createProfile);
router.get('/', getProfile);
router.get('/:id', getProfile);

export default router;
