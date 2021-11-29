import express from 'express';
import { createUser, getUserProfile, postLogin } from '../controllers/userController.js';
import { isAuth } from '../middlewares/isAuth.js';
const router = express.Router();

router.post('/register', createUser);
router.post('/login', postLogin);
router.get('/profile', isAuth, getUserProfile);

export default router;
