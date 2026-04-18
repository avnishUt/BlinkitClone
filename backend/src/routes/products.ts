import { Router } from 'express';
import productController from '../controllers/productController';

const router = Router();

router.get('/', productController.getProducts);
router.post('/initialize', productController.initializeProducts);

export default router;