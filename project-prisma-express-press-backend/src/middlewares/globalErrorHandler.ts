import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";

export const golbalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error : ", err);

  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;

  let errorMessage = err.message || "Internal Server Error";
  let errorName = err.name || "Internal Server Error";
  let errorDetails = err.stack;

  if (err instanceof Prisma.PrismaClientValidationError) {
    const statusCode = httpStatus.BAD_REQUEST;
    const errorMessage =
      "You have provided incorrect field type or missing fields";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const statusCode = httpStatus.BAD_REQUEST;
      const errorMessage = "Duplicate key error";
    } else if (err.code === "P2003") {
      const statusCode = httpStatus.BAD_REQUEST;
      const errorMessage = "Foreign constraint failed";
    } else if (err.code === "P2025") {
      const statusCode = httpStatus.BAD_REQUEST;
      const errorMessage =
        "An operation failed because it depends on one or more records that were required but not found";
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      const statusCode = httpStatus.UNAUTHORIZED;
      const errorMessage =
        "Authentication failed..Please check your credentials";
    } else if (err.errorCode === "P1001") {
      const statusCode = httpStatus.BAD_REQUEST;
      const errorMessage = "Can't reach database server";
    }
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = "Error Occured during query execution";
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    name: errorName,
    message: errorMessage,
    error: errorDetails,
  });
};
