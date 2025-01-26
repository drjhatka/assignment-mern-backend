import { TUser } from "../users/user.interface";

import status from "statuses";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../users/user.model";
import Blog from "../blogs/blog.model";
import { sendResponse } from "../../utils/sendResponse";
import { Response } from "express";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { TLoginUser, TRefreshUser } from "./auth.login";

export type JWTTokenPayload = {
    email: string
    role: string,
}

export const checkLoginCredentials = async (res: Response, user: TUser, payload: TLoginUser) => {
    //if user doesn't exist
    if (!user) {
        sendErrorResponse(res, { success: false, statusCode: status('unauthorized'), message: "Invalid Credentials", error: {}, stack: '' })
        return
    }

    //if the user is deleted
    if (user.isDeleted) {
        sendErrorResponse(res, { success: false, statusCode: status('unauthorized'), message: "User is Deleted!!!", error: {}, stack: '' })

    }
    //if the user is blocked
    
    if (user.status === 'blocked') {
        sendErrorResponse(res, { success: false, statusCode: status('unauthorized'), message: "User is Blocked", error: {}, stack: '' })
        return
    }

    //match provided password with that of the database
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
        sendResponse(res, { success: false, statusCode: status('ok'), message: "Password doesn't match", data: {} })
        return
    }
}

export const checkRefreshTokenCredentials = async ( user: TUser) => {
    //if user doesn't exist
    if (!user) {
        return 'No User';
    }

    //if the user is deleted
    if (user.isDeleted) {
            return 'Deleted';
    }
    //if the user is blocked
    console.log(user)
    if (user.status === 'blocked') {
        return 'Blocked';
    }
    return 'valid'
}
export const createJWTAccessToken = async (jwtPayload: JWTTokenPayload, config: string, expiresIn: string) => {
    return jwt.sign(jwtPayload, config, { expiresIn: expiresIn })
}
export const createJWTRefreshToken = async (jwtPayload: JWTTokenPayload, config: string, expiresIn: string) => {
    return jwt.sign(jwtPayload, config, { expiresIn: expiresIn })
}

export const sanitizePostUserData = async (userId: string, fields: string[]) => {
    //find the user by id
    const user = await User.findById(userId).select(fields)
    return user;
}
export const sanitizePostBlogData = async (userId: string, fields: string[]) => {
    //find the user by id
    const user = await Blog.findById(userId).select(fields).populate('author')
    return user;
}