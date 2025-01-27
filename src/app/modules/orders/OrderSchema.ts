import mongoose,{model} from "mongoose";
import Order from "./OrderInterface";

const orderSchema = new mongoose.Schema({
    email:{type:String, required:true},
    productId:{type:String},
    quantity:{type:Number},
    totalPrice:{type:Number}
})

export const OrderModel= model<Order>('Order',orderSchema)
