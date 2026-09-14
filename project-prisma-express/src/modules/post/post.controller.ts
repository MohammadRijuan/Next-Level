import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"


// creating post
const addPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
})


// get all post
const getAllPosts=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})


// get all post stats
const getPostsStats=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})


// get my post
const getMyPosts=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

// get my post by id
const getPostById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

// update my post
const updatePost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

// delete post
const deletePost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})

export const postController = {
    addPost,
    getAllPosts,
    getPostsStats,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost
}