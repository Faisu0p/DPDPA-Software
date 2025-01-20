import express from 'express';
import { submitPreliminaryQuestions } from '../controllers/preliminaryQController.js';

const router = express.Router();

// POST route for submitting the preliminary questions
router.post('/submit', submitPreliminaryQuestions);

export default router;
