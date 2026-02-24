import { Router } from 'express';
import { getInsights } from '../controllers/response.controller.js';

const router = Router();

// POST endpoint to get numerology insights
router.post('/api/insights', getInsights);

export default router;