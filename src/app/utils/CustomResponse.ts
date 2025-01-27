import { Response } from "express"
import Order from "../orders/OrderInterface"
import Bike from "../bikes/BikeInterface"


const fireCustomResponse=(res:Response,httpCode:number, success:boolean, message:string, data?:Bike|Order)=>{
    return res.status(httpCode).json({success,message, data })
}

export const CustomResponse ={fireCustomResponse}