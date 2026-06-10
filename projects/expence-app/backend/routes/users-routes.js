import express from 'express';
import { register, login, getProfile } from '../controllers/users-cltr.js';
import { authenticateUser } from '../middlewares/authenticateUser.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route - Get user profile
router.get('/profile', authenticateUser, getProfile);

export default router;
