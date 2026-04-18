import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { createOrder, resetOrderState } from '../../store/slices/orderSlice';
import { clearCart, toggleCart } from '../../store/slices/cartSlice';

interface CheckoutModalProps {
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { loading, success, currentOrder } = useSelector((state: RootState) => state.order);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createOrder({ cart: items, customerInfo: formData }));
    dispatch(clearCart());
  };

  const handleClose = () => {
    if (success) {
      dispatch(resetOrderState());
      dispatch(toggleCart());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {success ? (
          <div className="text-center">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
            <p className="text-gray-600 mb-4">Order #{currentOrder?.orderNumber}</p>
            <button
              onClick={handleClose}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full p-2 border rounded mb-3"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-2 border rounded mb-3"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Phone"
                required
                className="w-full p-2 border rounded mb-3"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <textarea
                placeholder="Delivery Address"
                required
                className="w-full p-2 border rounded mb-3"
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
              <div className="flex justify-between mb-4">
                <span>Total Amount:</span>
                <span className="font-bold text-green-600">₹{totalPrice}</span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;