import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import { Role } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();


router.post("/register", userController.registerUser);

router.get(
  "/me",

//   middleware
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log(req.cookies);

//     const { accessToken } = req.cookies;

//     const verifiedToken = jwtUtils.verifyToken(
//       accessToken,
//       config.jwt_access_secret,
//     );

//     // if (typeof verifiedToken === "string") {
//     //   throw new Error(verifiedToken);
//     // }

//     if(!verifiedToken.success){
//         throw new Error(verifiedToken.error)
//     }

//     const { email, name, id, role } = verifiedToken.data as JwtPayload;

//     // const requiredRoles = ["ADMIN","USER","AUTHOR"]
//     const RequiredRoles = [Role.ADMIN, Role.USER, Role.AUTHOR];

//     if (!RequiredRoles.includes(role)) {
//       return res.status(403).json({
//         success: false,
//         statusCode: httpStatus.FORBIDDEN,
//         message: "Frobidden. You dont have permission to access this resource",
//       });
//     }

//     req.user = {
//       email,
//       name,
//       id,
//       role,
//     };

//     next();
//   },

// main maiddleare of getting profile
authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR),


  userController.getMyProfile,
);

router.put('/my-profile',authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR),userController.updateMyProfile)

export const userRoutes = router;
