import { catchAsync } from "../utils/catchAsync"
import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from "../config";
import { AppError } from "../error/app.error";
import status from "statuses";
import { TUserRole } from '../modules/users/user.constants';

export const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        //check if the token is sent from the client
        if (!req.headers.authorization) { throw new AppError(status('unauthorized'), "You are not authorized") }
        const accessToken = req.headers.authorization.split(' ')[1];

        //retrieve auth token from the request header and verify
        const decodedToken = jwt.verify(
            accessToken as string,
            config.jwt_secret as string,
            (err, decoded) => {
                if (err) { throw new AppError(status('unauthorized'), 'Invalid Token') }
                const role = (decoded as JwtPayload).role;
                if (requiredRoles && !requiredRoles.includes(role)) {
                    throw new AppError(status('unauthorized'), 'Unauthorized', '')
                }

                req.user = decoded as JwtPayload
                //all clear... proceed to next phase
                next()
            })
    })
}