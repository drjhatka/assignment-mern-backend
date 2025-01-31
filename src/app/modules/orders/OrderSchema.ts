// import { ObjectId, Types } from 'mongoose';
// import mongoose,{model} from "mongoose";
// import Order from "./OrderInterface";
// import { Product } from './OrderInterface';

// const orderSchema = new mongoose.Schema({
//     user:{type:String, required:true},
//     products:{type:},
//     quantity:{type:Number},
//     totalPrice:{type:Number}
// })

// export const OrderModel= model<Order>('Order',orderSchema)
import mongoose, { Schema, Document, Types } from "mongoose";
import { ObjectId } from "mongoose";
import Order, { Product } from "./OrderInterface"; // Assuming this file is `OrderInterface.ts`

// Define the Product sub-document schema
const productSchema = new Schema<Product>({
  product: { type: String, required: true },
  quantity: { type: Number, required: true }
});

// Define the Order schema
const orderSchema = new Schema({
  user: { type: Types.ObjectId, ref: "user", required: true }, // Reference to the User model
  products: { type: [productSchema], required: true }, // Array of Product sub-documents
  totalPrice: { type: Number, default:0.0 },
  status: {
    type: String,
    enum: ["Pending", "Progress", "Completed"], // Limit values to these strings
    default: "Pending",
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Export the Mongoose model
export default mongoose.model<Document & Order>("Order", orderSchema);
