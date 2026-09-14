declare const addCommentService: () => Promise<void>;
declare const getCommentByAuthorIdService: () => Promise<void>;
declare const getCommentByCommentIdService: () => Promise<void>;
declare const updateCommentService: () => Promise<void>;
declare const deleteCommentService: () => Promise<void>;
declare const moderateCommentService: () => Promise<void>;
export declare const commentService: {
    addCommentService: typeof addCommentService;
    getCommentByAuthorIdService: typeof getCommentByAuthorIdService;
    getCommentByCommentIdService: typeof getCommentByCommentIdService;
    updateCommentService: typeof updateCommentService;
    deleteCommentService: typeof deleteCommentService;
    moderateCommentService: typeof moderateCommentService;
};
export {};
//# sourceMappingURL=comment.service.d.ts.map