import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { authMiddleware } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()


router.post('/checkout',authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR),subscriptionController.createCheckoutSession)

export const subscriptionRoutes = router