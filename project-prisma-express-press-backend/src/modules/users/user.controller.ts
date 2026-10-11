import { NextFunction, Request, response, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken"
import { jwtUtils } from "../../utils/jwt";


// const registerUser = async (req: Request, res: Response) => {
//   // const payload = req.body;
//   try {
//     const payload = req.body;

//     const user = await userService.registerUserIntoDb(payload);

//     res.status(httpStatus.CREATED).json({
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: "user registered successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     console.log(error)

//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//         success:false,
//         statusCode : httpStatus.INTERNAL_SERVER_ERROR,
//         message:"failed to register user",
//         error : (error as Error).message
//     })
//   }
// };




// using reusable function catchAsync from utils so that code looks clean

const registerUser = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payload = req.body

    const user = await userService.registerUserIntoDb(payload)

    // res.status(httpStatus.CREATED).json({
    //     success:true,
    //     statusCode : httpStatus.CREATED,
    //     message:"user created successfully",
    //     data:{
    //         user
    //     }
    // })

     
    // using reusable function sendResponse from utils
    
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"user registered successfully",
        data:{
            user
        }
    })
})


// getting profile
const getMyProfile = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    

    // we dont need this one... but for checking we can have it
    
    const {accessToken} = req.cookies
    console.log(req.user,"user-request")

    // const verifiedToken = jwtUtils.verifyToken(accessToken,config.jwt_access_secret)

    // if(typeof verifiedToken === "string"){
    //     throw new Error(verifiedToken)
    // }

    // const profile = await userService.getMyProfileFromDB(verifiedToken.id)
    const profile = await userService.getMyProfileFromDB(req.user?.id as string)

    // console.log(verifiedToken)

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"User profile fetched successfully",
        data: {
            profile
        }
    })

})

// updating my profile
const updateMyProfile = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const userId = req.user?.id as string;

    const payload = req.body;

    const updatedProfile = await userService.updateMyProfileInDb(
        userId,payload);

    
        sendResponse(res,{
            success:true,
            statusCode:httpStatus.OK,
            message:"user profile updated successfully",
            data:{
                updatedProfile
            }
        }

        )

})


export const userController = {
  registerUser,
  getMyProfile,
  updateMyProfile
};
