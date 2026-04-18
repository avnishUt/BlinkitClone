import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../types/product';
import orderService from '../../services/orderService';

interface OrderState {
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: OrderState = {
  currentOrder: null,
  loading: false,
  error: null,
  success: false
};

export const createOrder = createAsyncThunk(
  'order/create',
  async ({ cart, customerInfo }: any) => {
    const response = await orderService.createOrder(cart, customerInfo);
    return response;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.currentOrder = null;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.orderDetails;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      });
  }
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;