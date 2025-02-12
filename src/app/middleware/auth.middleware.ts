import { catchAsync } from "../utils/catchAsync"
import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from "../config";
import { AppError } from "../error/app.error";
import status from "statuses";
import { TUserRole } from '../modules/users/user.constants';
import { JWTTokenPayload } from '../modules/admins/auth.utils';
import { User } from "../modules/users/user.model";
import { TUser } from "../modules/users/user.interface";

export const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        //check if the token is sent from the client...
        if (!req.headers.authorization) { throw new AppError(status('unauthorized'), "You are not authorized") }
        //slice Bearer from the token and extract the original token...
        const accessToken = req.headers.authorization.split(' ')[1];
        //retrieve auth token from the request header and verify...
        let decodedToken: string | JwtPayload;
        try {
            decodedToken = jwt.verify(accessToken as string, config.jwt_secret as string)
        }
        catch (err) {
            throw new AppError(status('unauthorized'), 'Invalid Token')
        }

        //token is valid now check role...
        //throw error if the role is other than admin or customer
        if (requiredRoles && !requiredRoles.includes((decodedToken as JwtPayload).role)) {
            throw new AppError(status('unauthorized'), 'Unauthorized', '')
        }
        //find user and set user to request object ....
        const user:TUser = await  User.findOne({email:(decodedToken as JwtPayload).email})
        req.user = user;
        //all clear... proceed to next phase...
        next()
    })
}