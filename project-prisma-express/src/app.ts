import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import httpStatus from "http-status";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.routes";
import { postRoutes } from "./modules/post/post.route";
import { commentRoutes } from "./modules/comment/comment.route";
import { notFound } from "./middlewares/notFound";
import { error } from "node:console";
import { golbalErrorHandler } from "./middlewares/globalErrorHandler";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// all api

app.get("/", (req: Request, res: Response) => {
  res.send("hello mamma ki obosta???");
});

// user api middleware
app.use("/api/user", userRoutes);

// auth api middleware
app.use("/api/auth", authRoutes);

// posts api middleware
app.use("/api/posts", postRoutes);

// comment api middleware
app.use("/api/comments", commentRoutes);

// not found middleware
app.use(notFound);

// global error middleware
app.use(golbalErrorHandler);

export default app;
