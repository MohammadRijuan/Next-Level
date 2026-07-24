import { Router} from "express";

import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router()


const userRole = {
    admin:"admin",
    agent:"agent"
} as const


// add a user
router.post("/", userController.createUser);

// get all user
router.get("/",auth(userRole.admin,userRole.agent), userController.getAllUser);

// single user
router.get("/:id",userController.getSingleUser );

// update user

router.put("/:id", userController.updateSingleUser);

// delete user
router.delete("/:id",userController.deleteSingleUser);



export const userRoute = router