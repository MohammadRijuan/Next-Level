import { Router} from "express";

import { userController } from "./user.controller";

const router = Router()

// add a user
router.post("/", userController.createUser);

// get all user
router.get("/", userController.getAllUser);

// single user
router.get("/:id",userController.getSingleUser );

// update user

router.put("/:id", userController.updateSingleUser);

// delete user
router.delete("/:id",userController.deleteSingleUser);



export const userRoute = router