import express from 'express';
import { login, logout, signup,  } from '../controllers/userAuthControllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login);
router.post('/signout', logout)

export default router;