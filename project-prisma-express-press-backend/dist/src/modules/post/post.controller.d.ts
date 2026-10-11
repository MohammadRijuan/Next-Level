import { NextFunction, Request, Response } from "express";
export declare const postController: {
    addPost: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllPosts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPostsStats: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyPosts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPostById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updatePost: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deletePost: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=post.controller.d.ts.map