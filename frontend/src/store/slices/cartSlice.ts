import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from '../../types/product';
import cartService from '../../services/cartService';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null,
  isOpen: false
};

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const response = await cartService.getCart();
  return response;
});

export const addToCart = createAsyncThunk(
  'cart/add',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await cartService.addToCart(productId, quantity);
    return response;
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/update',
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await cartService.updateCartItem(productId, quantity);
    return response;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (productId: string) => {
    const response = await cartService.removeFromCart(productId);
    return response;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      cartService.clearSession();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.cart;
        state.totalItems = action.payload.totalItems;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.cart;
        state.totalItems = action.payload.totalItems;
        state.totalPrice = action.payload.totalPrice;
        state.isOpen = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.cart;
        state.totalItems = action.payload.totalItems;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.cart;
        state.totalItems = action.payload.totalItems;
        state.totalPrice = action.payload.totalPrice;
      });
  }
});

export const { toggleCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;