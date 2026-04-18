export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: CartItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  totalAmount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  sessionId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}