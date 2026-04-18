import { Router } from 'express';
import orderController from '../controllers/orderController';

const router = Router();

router.post('/create', orderController.createOrder);
router.get('/:orderId', orderController.getOrder);

export default router;