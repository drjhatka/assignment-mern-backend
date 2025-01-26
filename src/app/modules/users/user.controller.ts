import status from "statuses";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";


const createUser=catchAsync((req, res, next)=>{
    const user = UserService.createUserIntoDB(req.body)
    sendResponse(res, {success:true, statusCode:status('created'), data:user})
})

export const UserController = {
    createUser,
}