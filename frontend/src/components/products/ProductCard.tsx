import React from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../../types/product';
import { addToCart } from '../../store/slices/cartSlice';
import { AppDispatch } from '../../store/store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-green-600">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-md ${product.inStock ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            {product.inStock ? 'Add' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;