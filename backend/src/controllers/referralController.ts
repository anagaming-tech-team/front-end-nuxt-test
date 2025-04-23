import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { Referral } from "../models/Referral";
import { User } from "../models/User";

export class ReferralController {
  static async checkReferrals(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.userId!;

      // 1) find all Referral docs where this user is the referrer
      const referrals = await Referral.find({ referrer: userId }).populate(
        "referred",
        "name email createdAt"
      );

      // 2) map down to a clean DTO
      const data = referrals.map((r) => {
        const u = r.referred as any;
        return {
          id: u._id,
          name: u.name,
          email: u.email,
          createdAt: u.createdAt,
        };
      });

      // 3) grab current points
      const user = await User.findById(userId);

      res.json({
        referrals: data,
        points: user?.points,
      });
    } catch (err) {
      next(err);
    }
  }
}
