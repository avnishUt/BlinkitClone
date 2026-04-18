import axios from 'axios';
import { CartItem } from '../types/product';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface CartResponse {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  sessionId?: string;
}

export class CartService {
  private getSessionId(): string | null {
    return localStorage.getItem('cartSessionId');
  }

  private setSessionId(sessionId: string): void {
    localStorage.setItem('cartSessionId', sessionId);
  }

  async getCart(): Promise<CartResponse> {
    const sessionId = this.getSessionId();
    if (!sessionId) return { cart: [], totalItems: 0, totalPrice: 0 };
    
    const response = await axios.get(`${API_BASE_URL}/cart/${sessionId}`);
    return response.data;
  }

  async addToCart(productId: string, quantity: number): Promise<CartResponse> {
    const sessionId = this.getSessionId();
    const response = await axios.post(`${API_BASE_URL}/cart/add`, {
      productId,
      quantity,
      sessionId
    });
    
    if (response.data.sessionId && !sessionId) {
      this.setSessionId(response.data.sessionId);
    }
    
    return response.data;
  }

  async updateCartItem(productId: string, quantity: number): Promise<CartResponse> {
    const sessionId = this.getSessionId();
    const response = await axios.put(`${API_BASE_URL}/cart/update`, {
      productId,
      quantity,
      sessionId
    });
    return response.data;
  }

  async removeFromCart(productId: string): Promise<CartResponse> {
    const sessionId = this.getSessionId();
    const response = await axios.delete(`${API_BASE_URL}/cart/remove/${productId}?sessionId=${sessionId}`);
    return response.data;
  }

  clearSession(): void {
    localStorage.removeItem('cartSessionId');
  }
}

export default new CartService();