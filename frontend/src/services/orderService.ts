import axios from 'axios';
import { CartItem, Order } from '../types/product';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export class OrderService {
  async createOrder(cart: CartItem[], customerInfo: CustomerInfo): Promise<{ orderId: string; orderDetails: Order }> {
    const sessionId = localStorage.getItem('cartSessionId');
    const response = await axios.post(`${API_BASE_URL}/orders/create`, {
      cart,
      customerInfo,
      sessionId
    });
    
    if (response.data.success) {
      localStorage.removeItem('cartSessionId');
    }
    
    return { orderId: response.data.orderId, orderDetails: response.data.orderDetails };
  }

  async getOrder(orderId: string): Promise<Order> {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
    return response.data.order;
  }
}

export default new OrderService();