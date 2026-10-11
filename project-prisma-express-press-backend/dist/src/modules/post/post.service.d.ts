import { IAddPostPayload } from "./post.interface";
declare const addPostService: (payload: IAddPostPayload) => Promise<void>;
declare const getAllPostsService: () => Promise<void>;
declare const getPostsStats: () => Promise<void>;
declare const getMyPostsService: () => Promise<void>;
declare const getPostByIdService: () => Promise<void>;
declare const updatePostService: () => Promise<void>;
declare const deletePostService: () => Promise<void>;
export declare const postService: {
    addPostService: typeof addPostService;
    getAllPostsService: typeof getAllPostsService;
    getPostsStats: typeof getPostsStats;
    getMyPostsService: typeof getMyPostsService;
    getPostByIdService: typeof getPostByIdService;
    updatePostService: typeof updatePostService;
    deletePostService: typeof deletePostService;
};
export {};
//# sourceMappingURL=post.service.d.ts.map