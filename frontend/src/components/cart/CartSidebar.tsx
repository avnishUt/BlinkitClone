import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleCart } from '../../store/slices/cartSlice';
import CartItem from './CartItem';
import CheckoutModal from '../checkout/CheckoutModal';

const CartSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, isOpen } = useSelector((state: RootState) => state.cart);
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => dispatch(toggleCart())} />
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={() => dispatch(toggleCart())}
            className="text-2xl text-gray-600 hover:text-gray-800"
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center p-8 text-gray-500">Your cart is empty</p>
          ) : (
            items.map(item => <CartItem key={item.product._id} item={item} />)
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-xl text-green-600">₹{totalPrice}</span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      {showCheckout && <CheckoutModal onClose={() => setShowCheckout(false)} />}
    </>
  );
};

export default CartSidebar;