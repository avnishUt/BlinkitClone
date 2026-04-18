import Cart, { ICart } from '../models/Cart';
import Product from '../models/Product';
import { v4 as uuidv4 } from 'uuid';

export class CartService {
  async getCart(sessionId: string): Promise<ICart | null> {
    return Cart.findOne({ sessionId });
  }

  async addToCart(productId: string, quantity: number, sessionId?: string): Promise<ICart> {
    const product = await Product.findById(productId);
    if (!product || !product.inStock) {
      throw new Error('Product not available');
    }

    const cartSessionId = sessionId || uuidv4();
    let cart = await Cart.findOne({ sessionId: cartSessionId });

    if (!cart) {
      cart = new Cart({ sessionId: cartSessionId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId: product._id,
        quantity,
        price: product.price,
        name: product.name,
        image: product.image
      });
    }

    await cart.save();
    return cart;
  }

  async updateCartItem(productId: string, quantity: number, sessionId: string): Promise<ICart> {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      throw new Error('Item not in cart');
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    return cart;
  }

  async removeFromCart(productId: string, sessionId: string): Promise<ICart> {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    return cart;
  }

  async clearCart(sessionId: string): Promise<void> {
    await Cart.deleteOne({ sessionId });
  }

  calculateCartTotals(cart: ICart): { totalItems: number; totalPrice: number } {
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
  }
}

export default new CartService();