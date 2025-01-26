import { NextFunction, Request, Response } from 'express';
import status from 'statuses';
export const NotFoundRoute = (req:Request, res:Response, next:NextFunction)=>{
    res.status(status('not found')).json({
        success:false,
        message:'Route Not Found!',
        error:'Please Check the URL!'
    })
}