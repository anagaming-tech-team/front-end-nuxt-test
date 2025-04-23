import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";

export class UserController {
  static async getAllUsers(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.json(await User.find());
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) throw new ApiError(404, "User not found");

      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getReferralCode(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.userId!;
      const user = await User.findById(userId).select("referralCode");
      if (!user) throw new ApiError(404, "User not found");

      res.json({ referralCode: user.referralCode.toString() });
    } catch (err) {
      next(err);
    }
  }
}
