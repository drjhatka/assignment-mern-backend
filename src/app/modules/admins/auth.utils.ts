import { AppError } from "../../error/app.error";
import { TUser } from "../users/user.interface";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TLoginUser } from "../auth/auth.login";
import status from "statuses";

export type JWTTokenPayload = {
    email:string
    role:string,
}

export const checkLoginCredentials = async (user: TUser, payload: TLoginUser) => {
    //if user doesn't exist
    if (!user) {throw new AppError(status('not found'), 'User Not Found!')}
    //if the user is deleted
    if(user.isDeleted){throw new AppError(status('ok'), `This ${user.role} is deleted`)}
    //if the user is blocked
    if(user.status==='blocked'){throw new AppError(status('forbidden'), `This ${user.role} is blocked`)}

    //match provided password with that of the database
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
        throw new AppError(status('unauthorized'),"Password doesn't Match!!")
    }
}

export const createJWTToken = async (jwtPayload:JWTTokenPayload, config:string, expiresIn:string)=>{
    return jwt.sign(jwtPayload, config, {expiresIn:expiresIn} )
}