import axios from 'axios';
import { Product } from '../types/product';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export class ProductService {
  async getProducts(page: number = 1, limit: number = 10, category?: string): Promise<{ products: Product[]; total: number }> {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (category) params.append('category', category);
    
    const response = await axios.get(`${API_BASE_URL}/products?${params}`);
    return { products: response.data.data, total: response.data.total };
  }

  async initializeProducts(): Promise<void> {
    await axios.post(`${API_BASE_URL}/products/initialize`);
  }
}

export default new ProductService();