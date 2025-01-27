import { AppError } from "../../error/app.error";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async(payload:TUser)=>{
        const result= await User.create(payload)
        return result
}
const getSingleUser = async(email:string)=>{
    return await User.findOne({email:email})
}
export const UserService = {
    createUserIntoDB,
    getSingleUser
}