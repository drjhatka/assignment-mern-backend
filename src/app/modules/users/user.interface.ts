import { Model } from "mongoose";
//create user interface
export interface TUser {
    name:string;
    email:string;
    password:string;
    role:'admin'|'user';
    status:'active'|'blocked'
    isDeleted:boolean;
}

//for creating statics and instance method on the model
    export interface UserModel extends Model<TUser>{
        // check if user exists by the server generated id (!not _id)
        //userExistsByCustomID(id:string):Promise<TUser>
    }