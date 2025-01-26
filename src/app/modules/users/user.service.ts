import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB=async(payload:TUser)=>{
    return await User.create(payload)
}

export const UserService = {
    createUserIntoDB,
}