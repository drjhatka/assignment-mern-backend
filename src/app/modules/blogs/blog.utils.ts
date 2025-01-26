import jwt, { JwtPayload } from 'jsonwebtoken';
export const retrieveUserCredentialsFromToken= (token:string, secret:string)=>{
    const decoded = jwt.verify(token, secret) as JwtPayload
    return {
        email:decoded.email,
        role:decoded.role
    }
}