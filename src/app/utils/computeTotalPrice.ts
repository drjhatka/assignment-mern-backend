import { ProductOrder } from "../types/types";
import { Product } from '../modules/orders/OrderInterface';
import { BikeServices } from "../modules/bikes/BikeServices";
import { CustomResponse } from "./CustomResponse";
import { sendErrorResponse } from "./sendErrorResponse";
import { Response } from "express";

export const computeTotalPrice =  async(res:Response,productArray:Product[])=>{

    
    console.log("TOtal Price",totalPrice)
    return totalPrice;
}