import { Router } from 'express';
import { reset } from '../controllers/resetController.js';

const router = Router();

router.post('/reset', reset);

export default router;
