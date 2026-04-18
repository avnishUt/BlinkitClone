import { Router } from 'express';
import cartController from '../controllers/cartController';

const router = Router();

router.get('/:sessionId', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateCart);
router.delete('/remove/:productId', cartController.removeFromCart);

export default router;