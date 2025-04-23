import { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ status: "error", message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
