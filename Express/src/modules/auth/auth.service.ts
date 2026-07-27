import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDb = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  // check user exist
  // compare password
  // generate token

  const userData = await pool.query(
    `
        SELECT * FROM USERS WHERE email=$1
        `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid credentials!");
  }

  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid credentials!");
  }

  // generate token

  const jwtpayload = {
    id: user.id,
    name: user.name,
    is_Active: user.is_Active,
    role: user.role,
    email: user.email,
  };

  // access token
  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: config.access_expires_in ,
  });
  // refresh token
  const refreshToken = jwt.sign(jwtpayload, config.refresh_secret as string, {
    expiresIn: config.refresh_expires_in ,
  });

  return { accessToken, refreshToken };
};

const generateFreshToken = async (token: string) => {
  if (!token) {
    throw new Error("unauthorized");
  }

  const decoded = jwt.verify(
    token as string,
    config.refresh_secret as string,
  ) as JwtPayload;

  const userData = await pool.query(
    `
        SELECT * FROM USERS WHERE email=$1
        `,
    [decoded.email],
  );

  const user = userData.rows[0];

  if (userData.rows.length === 0) {
    throw new Error("user not found!!!");
  }

  if (!user.is_active) {
    throw new Error("forbidden!!!");
  }

  const jwtpayload = {
    id: user.id,
    name: user.name,
    is_Active: user.is_Active,
    role: user.role,
    email: user.email,
  };

  // access token
  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: "1d",
  });

  return { accessToken };
};

export const authService = {
  loginUserIntoDb,
  generateFreshToken,
};
