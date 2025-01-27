import { Response } from "express"
import { ZodIssue } from "zod"
const fireCustomError=(res:Response, httpCode:number, success:boolean, message:ZodIssue[]|string, stackTrace?:string|undefined)=>{
    res.status(httpCode).json({success,message,stackTrace})
}

export const CustomError ={ fireCustomError}