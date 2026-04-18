import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchProducts } from '../store/slices/productSlice';
import { fetchCart } from '../store/slices/cartSlice';
import ProductGrid from '../components/products/ProductGrid';
import CartIcon from '../components/cart/CartIcon';
import CartSidebar from '../components/cart/CartSidebar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const BlinkitClonePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 20 }));
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">Blinkit Clone</h1>
          <CartIcon />
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <ProductGrid products={products} />}
      </main>

      <CartSidebar />
    </div>
  );
};

export default BlinkitClonePage;