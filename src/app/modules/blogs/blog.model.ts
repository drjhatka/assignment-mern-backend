import mongoose, { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogPostSchema: Schema = new Schema<TBlog>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    isPublished: { type: Boolean, default: true }, // Default is true
},
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    });

const Blog = model<TBlog>('Blog', blogPostSchema)
export default Blog;