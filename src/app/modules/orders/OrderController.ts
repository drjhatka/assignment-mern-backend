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
import { catchAsync } from "../../utils/catchAsync";
import { TUser } from "../users/user.interface";
import { orderUtils } from "./order.utils";
import { sendResponse } from "../../utils/sendResponse";
import status from "statuses";


const createOrder = catchAsync(async (req, res, next) => {
    
        //extract product array and userId from request body...
        const { product, userId } = req.body;
        //retrieve user from global request user variable earlier set during login...
        const user = req.user;
        const order = await OrderServices.create(user as TUser, product, req.ip!)
        sendResponse(res, {statusCode:status('ok'),success:true, message:'Order Placed Successfully!', data:order})
})

const calculateRevenue = async (req: Request, res: Response) => {
    const revenueTotal = await OrderServices.calculateTotalRevenue();
    res.status(200).json({ message: "Revenue calculated successfully", status: true, data: { totalRevenue: revenueTotal } })
}


export const OrderController = {
    createOrder,
    calculateRevenue

}