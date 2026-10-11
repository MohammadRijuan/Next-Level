import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { PremiumControllers } from "./premium.controller";

const router = Router()


router.get("/",authMiddleware(Role.ADMIN,Role.AUTHOR,Role.USER),PremiumControllers.getPremiumContent)


export const premiumRoutes = router