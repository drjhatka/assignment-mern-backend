import { sendErrorResponse } from "../../utils/sendErrorResponse";
import { TBlog } from "./blog.interface";
import Blog from "./blog.model";
import { ObjectId } from 'mongodb';

const getSingleBlog = async (id:string)=>{
    const result = await Blog.findById(id)
    console.log(result)
    return result
}
const getAllBlogs = async (query: Record<string, unknown>) => {
    //console.log(query)
    let search = ''
    const queryObj = { ...query }
    const excludeFields = ['search']
    excludeFields.forEach(elem => delete queryObj[elem])

    if (query.search) {
        search = query.search as string;
    }
    const searchQuery = Blog.find({
        $or: ['title', 'content'].map((field) => ({
            [field]: { $regex: search, $options: 'i' }
        }))
    });

    if (query.sortBy) {
        if (query?.sortBy == 'createdAt') {
            if(query.sortOrder){
                if(query.sortOrder=='desc'){
                    searchQuery.sort('-createdAt')
                }
                if(query.sortOrder=='asc'){
                    searchQuery.sort('createdAt')
                }
            }
            else{
                searchQuery.sort('-createdAt')
            }
        }
        if (query?.sortBy == 'title') {
            if(query.sortOrder){
                if(query.sortOrder=='desc'){
                    searchQuery.sort('-title')
                }
                if(query.sortOrder=='asc'){
                    searchQuery.sort('title')
                }
            }
        }

    }
    if (query.filter) { 
        searchQuery.find({author:query.filter})
    }
    // const result = await searchQuery.sort("-"+queryObj.sortBy as string)
    //console.log(result)
    return searchQuery
}
const createBlogIntoDB = async (payload: TBlog) => {
    //assign current logged in user id to blog author field id...
    return (await Blog.create(payload)).populate('author')
}

const updateBlog = async (id: string, payload: Partial<TBlog>) => {
    return await Blog.findOneAndUpdate({ _id: new ObjectId(id) }, payload).select(['_id', 'title', 'content', 'author']).populate('author')
}

const deleteBlog = async (id: string) => {
    return await Blog.deleteOne({ _id: new ObjectId(id) })
}

export const BlogService = {
    getSingleBlog,
    getAllBlogs,
    createBlogIntoDB,
    updateBlog,
    deleteBlog
}