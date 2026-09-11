import { Router } from "express";
import { authController } from "./auth.controller";
import { userService } from "../users/user.service";

const router = Router()


router.post('/login',authController.loginUser)



export const authRoutes = router