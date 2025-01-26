import {Response } from "express";

export type TErrorResponse<T> ={
    statusCode:number,
    success:boolean,
    message?: string,
    error:T,
    stack:string
}
export const sendErrorResponse= <T> ( res:Response, data:TErrorResponse<T>)=>{
    res.send({
        success:data.success,
        message:data.message,
        statusCode:data.statusCode,
        error:data,
        stack:data.stack || ''
    })
}