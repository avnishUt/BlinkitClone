import { Request, Response } from 'express';
import cartService from '../services/cartService';

export class CartController {
  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const { sessionId } = req.params;
      const cart = await cartService.getCart(sessionId);
      
      if (!cart) {
        res.json({ success: true, cart: [], totalItems: 0, totalPrice: 0 });
        return;
      }
      
      const { totalItems, totalPrice } = cartService.calculateCartTotals(cart);
      res.json({ success: true, cart: cart.items, totalItems, totalPrice });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async addToCart(req: Request, res: Response): Promise<void> {
    try {
      const { productId, quantity, sessionId } = req.body;
      const cart = await cartService.addToCart(productId, quantity, sessionId);
      const { totalItems, totalPrice } = cartService.calculateCartTotals(cart);
      
      res.json({ 
        success: true, 
        cart: cart.items, 
        totalItems, 
        totalPrice,
        sessionId: cart.sessionId 
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateCart(req: Request, res: Response): Promise<void> {
    try {
      const { productId, quantity, sessionId } = req.body;
      const cart = await cartService.updateCartItem(productId, quantity, sessionId);
      const { totalItems, totalPrice } = cartService.calculateCartTotals(cart);
      
      res.json({ success: true, cart: cart.items, totalItems, totalPrice });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async removeFromCart(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const { sessionId } = req.query as { sessionId: string };
      
      const cart = await cartService.removeFromCart(productId, sessionId);
      const { totalItems, totalPrice } = cartService.calculateCartTotals(cart);
      
      res.json({ success: true, cart: cart.items, totalItems, totalPrice });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new CartController();