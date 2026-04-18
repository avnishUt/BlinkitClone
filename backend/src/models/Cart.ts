import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface ICart extends Document {
  sessionId: string;
  items: ICartItem[];
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true }
});

const CartSchema: Schema = new Schema({
  sessionId: { type: String, required: true, unique: true },
  items: [CartItemSchema],
  expiresAt: { type: Date, default: () => new Date(+new Date() + 24*60*60*1000), index: { expireAfterSeconds: 0 } },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CartSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<ICart>('Cart', CartSchema);