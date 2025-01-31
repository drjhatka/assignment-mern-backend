import { Model } from "mongoose";

export interface TUser {
    name:string;
    email:string;
    password:string;
    role:'admin'|'customer';
    phone:string;
    address:string;
    city:string;
    status:'active'|'blocked';
    isDeleted:boolean;
}

//for creating statics and instance method on the model
    export interface UserModel extends Model<TUser>{
        // check if user exists by the server generated id (!not _id)
        //userExistsByCustomID(id:string):Promise<TUser>
    }