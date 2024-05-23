import { Router } from 'express';
import { searchforparameter } from '../controllers/searchforparameterController.js';

const router = Router();

router.post('/searchforparameter', searchforparameter);

export default router;
