import { Request, Response } from "express";
import { ZodError } from "zod";
import ZodOrderSchema from "../validators/ZodOrderSchema";
import { CustomResponse } from '../../utils/CustomResponse';
import { CustomError } from "../../utils/CustomErrors";
import { OrderServices } from "./OrderServices";
import { BikeModel } from "../bikes/BikeSchema";
import mongoose from "mongoose";
import { OrderValidation } from "./OrderValidation";
import { computeTotalPrice } from "../../utils/computeTotalPrice";
import { BikeServices } from "../bikes/BikeServices";
import { Product } from "./OrderInterface";
import Order from './OrderInterface';
import OrderSchema from "./OrderSchema";
import { User } from "../users/user.model";
import { checkStockAvailability } from "../../utils/checkStockAvailability";


const createOrder = async (req: Request, res: Response) => {
    try {
        const { product, userId } = req.body;
        const user = await User.findById(userId).select(['_id, password', 'email', 'role', 'status', 'isDeleted']);
        let totalPrice = 0;
        const productDetails = await Promise.all(
            product.map(async (item: Product) => {
                const bike = await BikeModel.findById(item.product);
                if (bike) {
                    const subtotal = bike ? (bike.price || 0) * item.quantity : 0;
                    totalPrice += subtotal;
                    return item;
                }
            })
        );
        //console.log(productDetails, totalPrice)

        //deduct each product quantity from the original bike quantity
        productDetails.forEach(async(product)=>{
            //fetch the bike with product id
            const bike = await BikeModel.findById(product.product)
            //deduct ordered quantity from the bike quantity
            if( bike.quantity-product.quantity==0){
                bike.quantity = bike.quantity-product.quantity
                bike.inStock=false; // set in stock to false
                await BikeModel.updateOne({_id:new mongoose.Types.ObjectId(product.product)}, bike)
            }
            else{
                bike.quantity = bike.quantity-product.quantity
                await BikeModel.updateOne({_id:new mongoose.Types.ObjectId(product.product)}, bike)
            }
        })

        let order = await OrderSchema.create({
            user: user._id,
            products: productDetails,
            totalPrice: totalPrice.toFixed(2),
        });
        const shurjoPayload = {
            amount: totalPrice,
            order_id: order._id,
            currency:"BDT",
            customer_name:user.name ,
            customer_address:'Motijheel',
            customer_email:user.email,
            customer_phone:'01717793158',
            customer_city:'Dhaka'
        }
    } catch (error) {
        if (error instanceof ZodError) {
            CustomError.fireCustomError(res, 400, false, error.issues, error.stack?.toString())
        }
        console.log(error)
    }
}

const calculateRevenue = async (req: Request, res: Response) => {
    const revenueTotal = await OrderServices.calculateTotalRevenue();
    res.status(200).json({ message: "Revenue calculated successfully", status: true, data: { totalRevenue: revenueTotal } })
}


export const OrderController = {
    createOrder,
    calculateRevenue

}