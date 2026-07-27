// config.ts
import dotenv from "dotenv";
import path from "path";
import type { SignOptions } from "jsonwebtoken";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: process.env.CONNECTIONSTRING as string,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET as string,
  refresh_secret: process.env.JWT_REFRESH_SECRET as string,
  access_expires_in: (process.env.JWT_ACCESS_EXPIRES_IN ?? "1d") as NonNullable<SignOptions["expiresIn"]>,
  refresh_expires_in: (process.env.JWT_REFRESH_EXPIRES_IN ?? "7d") as NonNullable<SignOptions["expiresIn"]>,
};

export default config;