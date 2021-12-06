import express from 'express';
import { protect } from '../middlewares/protect.js';
import { addOrder } from '../controllers/ordersController.js';
const router = express.Router();

router.route('/').post(protect, addOrder);

export default router;
