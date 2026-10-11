import { IloginUser } from "./auth.interface";
declare const loginService: (payload: IloginUser) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
declare const refreshToken: (refreshToken: string) => Promise<{
    accessToken: string;
}>;
export declare const authService: {
    loginService: typeof loginService;
    refreshToken: typeof refreshToken;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map