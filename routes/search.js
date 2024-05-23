import { Router } from 'express';
import { search } from '../controllers/searchController.js';

const router = Router();

router.post('/search', search);

export default router;
