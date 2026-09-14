import RegisterUserPayload from "./user.interface";
declare const registerUserIntoDb: (payload: RegisterUserPayload) => Promise<({
    profileId: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    name: string;
    email: string;
    activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
    role: import("../../../generated/prisma/enums").Role;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
declare const getMyProfileFromDB: (userId: string) => Promise<({
    profileId: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    name: string;
    email: string;
    activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
    role: import("../../../generated/prisma/enums").Role;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
declare const updateMyProfileInDb: (userId: string, payload: any) => Promise<{
    profileId: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    } | null;
} & {
    id: string;
    name: string;
    email: string;
    activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
    role: import("../../../generated/prisma/enums").Role;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const userService: {
    registerUserIntoDb: typeof registerUserIntoDb;
    getMyProfileFromDB: typeof getMyProfileFromDB;
    updateMyProfileInDb: typeof updateMyProfileInDb;
};
export {};
//# sourceMappingURL=user.service.d.ts.map