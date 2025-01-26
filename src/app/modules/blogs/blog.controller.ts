import { config } from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";

import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWTTokenPayload, sanitizePostBlogData } from '../auth/auth.utils';
import { retrieveUserCredentialsFromToken } from "./blog.utils";
import { User } from "../users/user.model";
import { TBlog } from "./blog.interface";
import { TUser } from "../users/user.interface";
import { ObjectId } from 'mongodb';
import Blog from "./blog.model";
import status from "statuses";
import { sendErrorResponse } from "../../utils/sendErrorResponse";
// @ts-ignore: Object is possibly 'null'.

const getAllBlogs = catchAsync(async (req, res, next) => {
    console.log(req.user)
    const result = await BlogService.getAllBlogs(req.query)
    //const sanitizedBlog = sanitizePostBlogData(result.every(elem=>{}),[''])
    if(!result.length){
        sendResponse(res, { success: false, statusCode: status('not found'), message: 'Nothing Found', data: result })
        return
    }
    sendResponse(res, { success: true, statusCode: status('ok'), message: 'Blog(s) Fetched successfully', data: result })

})
const getSingleBlog = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const blog = await BlogService.getSingleBlog(id)
    if (!blog) {
        sendResponse(res, { success: true, message: "Blog not Found", statusCode: status('not found'), data: {} })
    }
    sendResponse(res, { success: true, message: "Blog fetched successfully", statusCode: status('ok'), data: blog })
})
const createBlog = catchAsync(async (req, res, next) => {
    //retrieve user email and role from jwt header as an array...
    const decoded = retrieveUserCredentialsFromToken(req.headers.authorization.split(' ')[1] as string, config.jwt_secret as string)
    //find user in the database with the email provided....
    const user = await User.findOne({ email: decoded.email })

    //assign user ID to blog author
    const blog: TBlog = {
        title: req.body.title,
        author: user._id,
        content: req.body.content,
        isPublished: true
    };
    const result = await BlogService.createBlogIntoDB(blog)
    const data = await sanitizePostBlogData(result._id.toString(), ['-isPublished'])
    sendResponse(res, { success: true, message: 'Blog Created Successfully', statusCode: status('ok'), data: data })
})

const updateBlog = catchAsync(async (req, res, next) => { //ONLY User can update blog NOT Admin...
    //retrieve user email and role from jwt header as an array

    //const decoded = retrieveUserCredentialsFromToken(req.headers.authorization.split(' ')[1] as string, config.jwt_secret as string)
    if (req.user.role === 'admin') {
        sendResponse(res, { success: false, message: "Admin Cannot Update Blogs", statusCode: status('unauthorized'), data: {} })
        return
    }
    // else{
    //check if the user id is same 
    const blog = await Blog.findOne({ _id: req.params.id })
    const user = await User.findById(blog.author)
    console.log('BU ', user.email, req.user.email)

    if (user.email !== req.user.email) {
        sendResponse(res, { success: false, message: "You can't update other people's blog", statusCode: status('unauthorized'), data: {} })
        return
    }
    const result = await BlogService.updateBlog(req.params.id, req.body)

    //console.log(result)
    if (!result) {
        res.send({
            success: false,
            statusCode: status('bad request'),
            message: 'Cannot find Blog by the ID supplied',


        })
    }
    // console.log('result-',result)
    const updatedDoc = await sanitizePostBlogData(req.params.id, ['_id', 'title', 'content', 'author'])
    console.log('updatedDoc', updatedDoc)
    sendResponse(res, { success: true, message: "Blog updated Successfully!", statusCode: status('ok'), data: updatedDoc })
    // }
})

const deleteBlog = catchAsync(async (req, res, next) => {
    //admin can delete any blog but user can delete only their blog...
    const decoded = retrieveUserCredentialsFromToken(req.headers.authorization.split(' ')[1] as string, config.jwt_secret as string)
    //find blog and match user
    const blogID = req.params.id;
    const blog = await Blog.findById(blogID)
    const user = await User.findById(blog.author)

    if (decoded.role === 'user') {
        //check if the blog is authored by the current logged in user...
        console.log(blog.author._id.toString(), user._id.toString())
        if (decoded.email === user.email) {
            const result = await BlogService.deleteBlog(blogID)
            sendResponse(res, { success: true, statusCode: status('ok'), message: "Blog Deleted", data: result })
            return
        }
        sendResponse(res, { success: false, statusCode: status('unauthorized'), message: "User cannot delete other User's blog", data: { blogID } })
        return
    }
    else {
        const result = await BlogService.deleteBlog(blogID)
        sendResponse(res, { success: true, statusCode: status('ok'), message: "Blog Deleted", data: result })
        return
    }
})

export const BlogController = {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
}