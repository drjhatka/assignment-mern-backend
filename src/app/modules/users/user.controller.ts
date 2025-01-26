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

export const UserController = {
    createUser,
}