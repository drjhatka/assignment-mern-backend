import { AppError } from "../../error/app.error";
import { TUser } from "../users/user.interface"
import { User } from "../users/user.model";
import bcrypt from 'bcrypt';
import { checkLoginCredentials, checkRefreshTokenCredentials, createJWTAccessToken, createJWTRefreshToken } from "./auth.utils";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from "../../config";
import status from "statuses";
import { Response, response } from "express";
import { sendErrorResponse } from "../../utils/sendErrorResponse";

const createUserIntoDB = () => {

}

const loginUser = async (payload: TUser) => {
    // Check if the user exists
    const user = await User.findOne({ email: payload.email }).select(['password', 'email', 'role']);

    //all good, now proceed to issuing a jwt token to the user
    const accessToken = await createJWTAccessToken({ email: user?.email as string, role: user?.role as string }, config.jwt_secret as string, '15m');
    const refreshToken = await createJWTRefreshToken({ email: user?.email as string, role: user?.role as string }, config.jwt_refresh as string, '30d');

    return { accessToken, refreshToken };
}
const refreshToken = async (token: string) => {
    const decoded = jwt.verify(
        token,
        config.jwt_refresh as string
    ) as JwtPayload
    const { email, role } = decoded
    console.log('decoded', decoded)
    const user = await User.findOne({ email: email }) as TUser
    //const validate = await checkRefreshTokenCredentials(user, { email, role })
    //return validate

}

export const AuthService = {
    createUserIntoDB,
    loginUser,
    refreshToken
}