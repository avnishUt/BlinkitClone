import Order, { IOrder } from '../models/Order';
import cartService from './cartService';

export class OrderService {
  generateOrderNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  }

  async createOrder(cartItems: any[], customerInfo: any, sessionId: string): Promise<IOrder> {
    if (!cartItems || cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = new Order({
      orderNumber: this.generateOrderNumber(),
      items: cartItems,
      customerInfo,
      totalAmount,
      status: 'pending'
    });

    await order.save();
    await cartService.clearCart(sessionId);
    
    return order;
  }

  async getOrder(orderId: string): Promise<IOrder | null> {
    return Order.findById(orderId);
  }

  async getOrderByNumber(orderNumber: string): Promise<IOrder | null> {
    return Order.findOne({ orderNumber });
  }
}

export default new OrderService();