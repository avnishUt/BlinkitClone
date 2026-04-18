import { Request, Response } from 'express';
import orderService from '../services/orderService';

export class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { cart, customerInfo, sessionId } = req.body;
      
      if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
        res.status(400).json({ success: false, message: 'Missing customer information' });
        return;
      }
      
      const order = await orderService.createOrder(cart, customerInfo, sessionId);
      
      res.json({
        success: true,
        orderId: order._id,
        orderDetails: order,
        message: 'Order placed successfully'
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getOrder(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const order = await orderService.getOrder(orderId);
      
      if (!order) {
        res.status(404).json({ success: false, message: 'Order not found' });
        return;
      }
      
      res.json({ success: true, order });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new OrderController();