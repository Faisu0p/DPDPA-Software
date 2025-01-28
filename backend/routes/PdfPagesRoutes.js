import express from 'express';
import { getCompanyData } from '../controllers/Page1Controller.js'; // Import the controller

import { getSupportAndSelectedLists } from '../controllers/Page3Controller.js';

import { getYesNoQuestions } from '../controllers/Page5Controller.js';

const router = express.Router();

// Define the route for fetching company data
router.get('/company-data', getCompanyData);

// Route to get support functionalities and selected lists
router.get('/support-and-lists', getSupportAndSelectedLists);

// Route to get Yes/No questions
router.get('/yes-no-questions', getYesNoQuestions);

export default router;