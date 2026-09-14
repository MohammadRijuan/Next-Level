import { Router } from "express";
import { postController } from "./post.controller";
import { authMiddleware } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

// creating post
router.post('/',authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR), postController.addPost)

// get all post 
router.get('/',postController.getAllPosts)

// post stats
router.get('/stats',authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR),postController.getPostsStats)

// my post
router.get("/my-posts",authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR),postController.getMyPosts)

// get post by id
router.get('/:postId',postController.getPostById);

// update post 
router.patch("/:postId",authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR),postController.updatePost)

// delete post
router.delete("/:postId",authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR),postController.deletePost)

export const postRoutes = router