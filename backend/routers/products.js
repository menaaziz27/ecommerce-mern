import express from 'express';
import { getProducts, getProduct } from '../controllers/productsController.js';
const router = express.Router();

/**
 * @desc     fetch all products
 * @route    GET /api/products
 * @access   public
 */
router.get('/', getProducts);

/**
 * @desc     fetch single product
 * @route    GET /api/product
 * @access   public
 */
router.get('/:id', getProduct);

export default router;
