import Product, { IProduct } from '../models/Product';

const dummyProducts = [
  { name: 'Fresh Milk', price: 25, image: 'https://via.placeholder.com/200', category: 'Dairy', description: 'Fresh cow milk 500ml', inStock: true },
  { name: 'Bread', price: 35, image: 'https://via.placeholder.com/200', category: 'Bakery', description: 'Whole wheat bread', inStock: true },
  { name: 'Apples', price: 120, image: 'https://via.placeholder.com/200', category: 'Fruits', description: 'Red apples 1kg', inStock: true },
  { name: 'Rice', price: 80, image: 'https://via.placeholder.com/200', category: 'Grains', description: 'Basmati rice 1kg', inStock: true },
  { name: 'Eggs', price: 60, image: 'https://via.placeholder.com/200', category: 'Dairy', description: 'Farm fresh eggs dozen', inStock: true },
  { name: 'Tomatoes', price: 40, image: 'https://via.placeholder.com/200', category: 'Vegetables', description: 'Fresh tomatoes 1kg', inStock: true },
  { name: 'Onions', price: 30, image: 'https://via.placeholder.com/200', category: 'Vegetables', description: 'Red onions 1kg', inStock: true },
  { name: 'Potatoes', price: 35, image: 'https://via.placeholder.com/200', category: 'Vegetables', description: 'Fresh potatoes 1kg', inStock: true }
];

export class ProductService {
  async initializeDummyProducts(): Promise<void> {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(dummyProducts);
    }
  }

  async getProducts(page: number = 1, limit: number = 10, category?: string): Promise<{ products: IProduct[]; total: number }> {
    const query = category ? { category } : {};
    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(limit),
      Product.countDocuments(query)
    ]);
    
    return { products, total };
  }

  async getProductById(productId: string): Promise<IProduct | null> {
    return Product.findById(productId);
  }
}

export default new ProductService();