import status from "statuses";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorResponse } from "../../types/types";
import { catchAsync } from "../../utils/catchAsync";


const createUser=catchAsync(async(req, res, next)=>{
        const user = await  UserService.createUserIntoDB(req.body)
        sendResponse(res, {success:true, statusCode:status('created'), data:user})
})

const getSingleUser = catchAsync(async(req, res, next)=>{
    const email = req.params.email
    const user = await  UserService.getSingleUser(email)
    sendResponse(res,{statusCode:status('ok'), message:'User Retrieved', data:user, success:true})

})

export const UserController = {
    createUser,
}