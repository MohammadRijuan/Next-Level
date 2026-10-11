import { Router } from "express";
import { authController } from "./auth.controller";
import { userService } from "../users/user.service";

const router = Router()


router.post('/login',authController.loginUser)


// we will use this after expiring our access token then we will use our previous refresh token 
router.post('/refresh-token',authController.refreshToken)



export const authRoutes = router