import { AppError } from "../../error/app.error";
import { TUser } from "../users/user.interface"
import { User } from "../users/user.model";

import bcrypt from 'bcrypt';
import { checkLoginCredentials, createJWTToken } from "./auth.utils";
import jwt from 'jsonwebtoken';
import { config } from "../../config";

const createUserIntoDB = () => {

}

const loginUser = async (payload: TUser) => {
    // Check if the user exists
        const user = await User.findOne({ email:payload.email }).select(['password','email', 'role'] );

    //check if the user exists, password match, status is active and user is not deleted
        checkLoginCredentials(user as TUser, payload);

    //all good, now proceed to issuing a jwt token to the user
        return await createJWTToken({email:user?.email as string, role:user?.role as string},config.jwt_secret as string,'1h');
    }

export const AuthService = {
    createUserIntoDB,
    loginUser
}