import { NextFunction, Request, Response, Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { authMiddleware } from "../../middlewares/auth";
import { Role, SubscriptionStatus } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { prisma } from "../../lib/prisma";
import { subscriptionGuard } from "../../middlewares/premiumGuard";

const router = Router()


router.post('/checkout',authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR),subscriptionController.createCheckoutSession)

router.post("/webhook",subscriptionController.handleWebhook)


router.get("/status",authMiddleware(Role.USER,Role.AUTHOR,Role.ADMIN),
subscriptionGuard()
,subscriptionController.getSubscriptionStatus)


export const subscriptionRoutes = router