import { ObjectId, Types } from "mongoose";

export interface TBlog  {
    title:string;
    content:string;
    author:Types.ObjectId;
    isPublished:boolean;
}