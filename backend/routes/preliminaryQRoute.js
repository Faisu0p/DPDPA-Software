import express from 'express';
import { submitPreliminaryQuestions, getRiskAnalysis} from '../controllers/preliminaryQController.js';

const router = express.Router();

// POST route for submitting the preliminary questions
router.post('/submit', submitPreliminaryQuestions);

// GET route for fetching the risk analysis
router.get('/risk-analysis', getRiskAnalysis);

export default router;
