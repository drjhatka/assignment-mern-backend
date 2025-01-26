import { Request, Response,NextFunction } from "express"
import { AnyZodObject } from "zod"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from "../config";

export const ValidateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            //console.log(req.cookies)
            const zodParsedData = await schema.parseAsync(req.body)
            next()
        } catch (err) {
            next(err)
        }
    }

}
export const ValidateRefreshToken = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("RT ",req.cookies.refreshToken)
            const zodParsedData = await schema.parseAsync(req.cookies)
            next()
        } catch (err) {
            next(err)
        }
    }

}