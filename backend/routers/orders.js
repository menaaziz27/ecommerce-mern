import express from 'express';
import { protect } from '../middlewares/protect.js';
import { addOrder, getOrder, updateOrderToPaid } from '../controllers/ordersController.js';
const router = express.Router();

router.route('/').post(protect, addOrder);
router.route('/:id').get(protect, getOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
