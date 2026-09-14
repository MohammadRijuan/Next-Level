import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { postService } from "./post.service"
import { sendResponse } from "../../utils/sendResponse"
import httpsStatus from "http-status"


// creating post
const addPost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
    const id = req.user?.id

    const payload = req.body
    const result = await postService.addPostService(payload,id as string)

    sendResponse(res,{
        success:true,
        statusCode:httpsStatus.CREATED,
        message:"post created successfully",
        data: result

    })
})


// get all post
const getAllPosts=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const result = await postService.getAllPostsService()

    sendResponse(res,{
        success:true,
        statusCode:httpsStatus.OK,
        message:"post retrieved successfully",
        data:result

    })

})


// get all post stats
const getPostsStats=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

})


// get my post
const getMyPosts=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
    const authorId= req.user?.id;

    const result = await postService.getMyPostsService(authorId as string)

    sendResponse(res,{
        success:true,
        statusCode:httpsStatus.OK,
        message:"my all posts retrieved successfully",
        data: result
    })

})

// get my post by id
const getPostById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const postId = req.params.postId

    if(!postId){
        throw new Error("post id required in params")
    }

    const result = await postService.getPostByIdService(postId as string)

    sendResponse(res,{
        success:true,
        statusCode:httpsStatus.OK,
        message:"single post retrieved successfully",
        data: result
    })

})

// update my post
const updatePost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const authorId = req.user?.id
    const isAdmin = req.user?.role === "ADMIN";

    const postId = req.params.postId;

    if(!postId){
        throw new Error("post id required in params")
    }


    const payload = req.body;

    const result = await postService.updatePostService(postId as string,payload,authorId as string,isAdmin)

    sendResponse(res,{
        success:true,
        statusCode:httpsStatus.OK,
        message:"post updated successfully",
        data: result
    })

})

// delete post
const deletePost=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const authorId = req.user?.id
    const isAdmin = req.user?.role === "ADMIN";

    const postId = req.params.postId;

    if(!postId){
        throw new Error("post id required in params")
    }

    await postService.deletePostService(postId as string,authorId as string,isAdmin)

    sendResponse(res,{
        success:true,
        statusCode:httpsStatus.OK,
        message:"post deleted successfully",
        data: null
    })

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