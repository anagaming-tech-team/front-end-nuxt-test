import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { ApiError } from "../utils/ApiError";

export interface AuthRequest extends Request {
  userId?: string;
}

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (!auth) return next(new ApiError(401, "Authorization header missing"));
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, config.jwtSecret) as any;
    req.userId = payload.userId;
    next();
  } catch {
    next(new ApiError(401, "Invalid token"));
  }
};
