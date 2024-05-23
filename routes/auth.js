import { Router } from 'express';
import { isAuth } from '../controllers/authController.js';

const router = Router();

router.get('/isAuth', isAuth);

export default router;
