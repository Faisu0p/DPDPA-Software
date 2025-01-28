import express from 'express';
import { getCompanyData } from '../controllers/Page1Controller.js'; // Import the controller

import { getSupportAndSelectedLists } from '../controllers/Page3Controller.js';

const router = express.Router();

// Define the route for fetching company data
router.get('/company-data', getCompanyData);

// Route to get support functionalities and selected lists
router.get('/support-and-lists', getSupportAndSelectedLists);

export default router;
