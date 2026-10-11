import { NextFunction, Request, Response } from "express";
export declare const commentController: {
    addComment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCommentByAuthorId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCommentByCommentId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateComment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteComment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    moderateComment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=comment.controller.d.ts.map