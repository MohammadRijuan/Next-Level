import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDb(req.body);

    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false, // in production will be true
      httpOnly: true,
      sameSite: "lax", // lax means its applicable for only get request not will be for post request
    });

    res.status(200).json({
      success: true,
      message: "user login succesfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.generateFreshToken(req.cookies.refreshToken);



    // res.cookie("refreshToken", refreshToken, {
    //   secure: false, // in production will be true
    //   httpOnly: true,
    //   sameSite: "lax", // lax means its applicable for only get request not will be for post request
    // });

    res.status(200).json({
      success: true,
      message: "convert refresh token into access token",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

export const authController = {
  loginUser,
  refreshToken,
};
