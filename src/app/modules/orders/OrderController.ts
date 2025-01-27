import { Request, Response } from "express";
import { ZodError } from "zod";
import ZodOrderSchema from "../validators/ZodOrderSchema";
import { CustomResponse } from '../utilities/CustomResponse';
import { CustomError } from "../utilities/CustomErrors";
import { OrderServices } from "./OrderServices";
import { BikeModel } from "../bikes/BikeSchema";
import mongoose from "mongoose";


const createOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body     // assuming the object has a order element which includes the order object
        //validate with Zod ...
        ZodOrderSchema.parse(order) // use validate for joi and parse for zod library.
        //fetch bike related to order...
        //console.log(await BikeServices.getOne(order.productId))
        console.log(order.productId)
        const bike  = await BikeModel.findOne({ _id: new mongoose.Types.ObjectId( order.productId)})
        //check if the quantity is available for the specified product...
        if (!bike!.inStock) {
            CustomResponse.fireCustomResponse(res, 400, false, 'Bike Out of Stock')
        }
        else {

            if (bike!.quantity < order.quantity) {
                CustomResponse.fireCustomResponse(res, 400, false, 'Order Quantity cannot be more than currently available stock', order)
            }

            else if (order.quantity - bike!.quantity === 0) {
                //console.log(order.quantity-bike.quantity)
                //set the inStock method to false...
                bike!.inStock = false;
                bike!.quantity = 0;
                await BikeModel.updateOne({_id: new mongoose.Types.ObjectId(order.productId)},bike!)

                //await BikeServices.updateOne(order.productId, bike!)
                //create order in the DB
                const result = await OrderServices.create(order)
                CustomResponse.fireCustomResponse(res, 200, true, 'Order Created Successfully', result)
            }
            else {
                //otherwise store in DB...
                bike!.quantity = bike!.quantity - order.quantity;
                await BikeModel.updateOne({_id: new mongoose.Types.ObjectId(order.productId)},bike!)
                const result = await OrderServices.create(order)
                CustomResponse.fireCustomResponse(res, 200, true, 'Product Stock Updated', result)
            }
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