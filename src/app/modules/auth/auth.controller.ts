import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from "../../utils/sendResponse"
import { UserService } from "../users/user.service"

import { AuthService } from "./auth.service";
import { checkLoginCredentials, checkRefreshTokenCredentials, sanitizePostUserData } from "./auth.utils";
import { TUser } from "../users/user.interface";
import { ObjectId } from "mongoose";
import { User } from "../users/user.model";
import status from "statuses";
const createUser = catchAsync(async (req, res) => {
    //data has come clean... now transfer to service
    const user = await UserService.createUserIntoDB(req.body) 
    const returnUser = await sanitizePostUserData(user._id.toString() , ['-password','-status', '-isDeleted','-role','-createdAt','-updatedAt'])
    //user created. send success response
    sendResponse(res, { success: true, statusCode: status('created'), message: `${user.role} Registered Successfully!`, data: returnUser })
})

const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body
    console.log(email)
    if (!email || !password) {
        sendResponse(res, { success: false, statusCode: status('bad request'), message: "email and password required", data: {} })
        return
    }
        // Check if the user exists
        const user = await User.findOne({ email:req.body.email }).select(['password','email', 'role', 'status', 'isDeleted'] );
        //check if the user exists, password match, status is active and user is not deleted
        checkLoginCredentials(res, user as TUser, req.body );

    const result = await AuthService.loginUser(req.body)
    const {accessToken, refreshToken} =result
    res.cookie('refreshToken',refreshToken,{
        secure:true,
        httpOnly:true,
    })
    sendResponse(res, {success:true, statusCode:status('ok'), message:"Login Success",data:{token:accessToken}})
})
const refreshToken =catchAsync(async(req, res, next)=>{
    const {refreshToken} =  req.cookies;
    console.log('cookie  ', req.cookies)
    console.log("RT ",refreshToken)
    console.log('user ', req.user)
    const user = await User.findOne({ email:req.user.email }).select(['password','email', 'role', 'status', 'isDeleted'] );
    checkRefreshTokenCredentials(user)
    //const result = await AuthService.refreshToken(refreshToken)
    //res.send({validate:result})
})
export const AuthController = {
    createUser,
    loginUser,
    refreshToken
}