import React from 'react';
import { useDispatch } from 'react-redux';
import { CartItem as CartItemType } from '../../types/product';
import { updateCartItem, removeFromCart } from '../../store/slices/cartSlice';
import { AppDispatch } from '../../store/store';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateCartItem({ productId: item.product._id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.product._id));
  };

  return (
    <div className="flex items-center gap-3 p-3 border-b">
      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h4 className="font-semibold">{item.product.name}</h4>
        <p className="text-green-600 font-bold">₹{item.product.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <span className="px-3">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700"
      >
        ×
      </button>
    </div>
  );
};

export default CartItem;