import { Request, Response } from 'express';
import productService from '../services/productService';

export class ProductController {
  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;
      
      const { products, total } = await productService.getProducts(page, limit, category);
      
      res.json({
        success: true,
        data: products,
        total,
        page
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async initializeProducts(req: Request, res: Response): Promise<void> {
    try {
      await productService.initializeDummyProducts();
      res.json({ success: true, message: 'Products initialized' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new ProductController();