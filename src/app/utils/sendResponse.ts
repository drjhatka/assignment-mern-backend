import {Response } from "express";

export type TResponse<T> ={
    statusCode:number,
    success:boolean,
    message?: string,
    data:T
}
export const sendResponse= <T> ( res:Response, data:TResponse<T>)=>{
    return res.json({
        success:data.success,
        message:data.message,
        statusCode:data.statusCode,
        data:data.data
    })
}