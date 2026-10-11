import { Router } from "express";
import { commentController } from "./comment.controller";
import { authMiddleware } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

// craete comment 
router.post('/',authMiddleware(Role.ADMIN,Role.AUTHOR,Role.USER), commentController.addComment)

// get comment by author id
router.get("/author/:authorId",commentController.getCommentByAuthorId)

// get comment by id
router.get("/:commentId",commentController.getCommentByCommentId);

// update comment
router.patch('/:commentId',authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR),commentController.updateComment)

// delete comment
router.delete("/:commentId",authMiddleware(Role.ADMIN,Role.USER,Role.AUTHOR),commentController.deleteComment)


// moderate comment
router.put("/:commnetId/moderate",authMiddleware(Role.ADMIN,Role.AUTHOR,Role.USER),commentController.moderateComment)


export const commentRoutes = router