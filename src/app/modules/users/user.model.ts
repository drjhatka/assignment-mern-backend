import { model, Schema } from "mongoose";
import { TUser } from './user.interface';
import bcrypt from 'bcrypt'
import { config } from "../../config";
import { userEnums } from "../../utils/userEnums";

const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    role: {
        type: String,
        enum: userEnums.UserRolesArray,
        default:'user'
    },
    status: {
        type: String,
        enum: userEnums.UserStatusArray,
        default: 'active',
        select:false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select:false
    },
},
    { timestamps: true }
)

userSchema.pre('save',async function(next){
    const doc = this;
    doc.password= await bcrypt.hash(doc.password,10);
    console.log('hashed Pass - ',doc.password)
    next();
})

export const User = model<TUser>('User', userSchema) //create model from schema and export