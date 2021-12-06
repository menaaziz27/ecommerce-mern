import express from 'express';
import { createUser, getUserProfile, postLogin, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/protect.js';
const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(postLogin);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
