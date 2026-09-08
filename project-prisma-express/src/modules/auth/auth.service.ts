import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IloginUser } from "./auth.interface";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const loginService = async (payload: IloginUser) => {
  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("password is incorrect");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

//   const accessToken = jwt.sign(
//     jwtPayload,
//     config.jwt_access_secret!,
//     {
//       expiresIn: config.jwt_access_expires_in,
//     } as SignOptions, // for type assertion to remove error of jwt.sign
//   );

// better alternative

const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret!,
    config.jwt_access_expires_in! as SignOptions
)

//   const refreshToken = jwt.sign(
//     jwtPayload,
//     config.jwt_refresh_secret!,
//     {
//       expiresIn: config.jwt_refresh_expires_in,
//     } as SignOptions, // for type assertion to remove error of jwt.sign
//   );

// better alternative 
const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret!,
    config.jwt_refresh_expires_in! as SignOptions
)

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = {
  loginService,
};
