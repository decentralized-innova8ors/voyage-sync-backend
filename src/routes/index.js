import express from 'express';
import HomeController from '../controllers/HomeController.js';

const router = express.Router();

// home routes
router.get('/', HomeController.getHome);

export default router;
