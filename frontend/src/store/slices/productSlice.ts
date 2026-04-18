import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';
import productService from '../../services/productService';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async ({ page, limit, category }: { page: number; limit: number; category?: string }) => {
    const response = await productService.getProducts(page, limit, category);
    return response;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export const { setCurrentPage } = productSlice.actions;
export default productSlice.reducer;