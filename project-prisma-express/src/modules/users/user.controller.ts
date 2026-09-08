import { NextFunction, Request, response, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

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




// using reusable function catchAsync from utils

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

export const userController = {
  registerUser,
};
