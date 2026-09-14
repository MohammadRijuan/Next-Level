import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const loginUser = catchAsync(async (req, res, next) => {
    const payload = req.body;
    // this one is ok.... 
    // const loginResult = await authService.loginService(payload)
    // but we will do this one for setting login result as destructuring accesstoken and refresh token in cookie
    const { accessToken, refreshToken } = await authService.loginService(payload);
    // setting up accesstoken and refreshtoken in cookie
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 // 24hour means 1 day
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7day
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user logged in successfully",
        // data: loginResult
        data: { accessToken, refreshToken }
    });
});
// refresh token
const refreshToken = catchAsync(async (req, res, next) => {
    const takeRefreshToken = req.cookies.refreshToken;
    const { accessToken } = await authService.refreshToken(takeRefreshToken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 // 24hour means 1 day
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Token Refreshed successfully",
        data: {
            accessToken
        }
    });
});
export const authController = {
    loginUser,
    refreshToken
};
//# sourceMappingURL=auth.controller.js.map