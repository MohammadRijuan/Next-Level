import type { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";

type Roles = "admin" | "agent" | "user"

const auth = (...roles:Roles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(roles)
    try {
      // console.log("This is a protected route");
      // console.log(req.headers.authorization)

      // 1. check if the token exists
      // 2. verify the token
      // 3. find the user into database
      // 4. if the user active or not

      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({
          success: false,
          message: "unauthorization access!!",
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.secret as string,
      ) as JwtPayload;

      const userData = await pool.query(
        `
        SELECT * FROM USERS WHERE email=$1
        `,
        [decoded.email],
      );

      const user = userData.rows[0];

      if (userData.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "user not found!!",
        });
      }

      if (!user.is_active) {
        res.status(403).json({
          success: false,
          message: "forbidden!!",
        });
      }


      if(roles.length && !roles.includes(user.role)){
        res.status(403).json({
          success: false,
          message: "forbidden!! this user dont have access",
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
        next(error);
    }
  };
};

export default auth;
