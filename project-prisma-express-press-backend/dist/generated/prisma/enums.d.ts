export declare const CommentStatus: {
    readonly APPROVED: 'APPROVED';
    readonly REJECTED: 'REJECTED';
};
export type CommentStatus = (typeof CommentStatus)[keyof typeof CommentStatus];
export declare const ActiveStatus: {
    readonly ACTIVE: 'ACTIVE';
    readonly BLOCKED: 'BLOCKED';
};
export type ActiveStatus = (typeof ActiveStatus)[keyof typeof ActiveStatus];
export declare const Role: {
    readonly USER: 'USER';
    readonly AUTHOR: 'AUTHOR';
    readonly ADMIN: 'ADMIN';
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const PostStatus: {
    readonly DRAFT: 'DRAFT';
    readonly PUBLISHED: 'PUBLISHED';
    readonly ARCHIVED: 'ARCHIVED';
};
export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];
//# sourceMappingURL=enums.d.ts.map