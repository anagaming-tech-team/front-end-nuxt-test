import { Request, Response, NextFunction } from "express";
import { IUser, User } from "../models/User";
import { Referral } from "../models/Referral";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { ApiError } from "../utils/ApiError";
import { Types } from "mongoose";

async function calculateReferralPoints(
  referrerId: Types.ObjectId
): Promise<number> {
  // start of “today” in local time
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // how many referrals they’ve made so far today (including the one just created)
  const count = await Referral.countDocuments({
    referrer: referrerId,
    createdAt: { $gte: startOfDay },
  });

  const base = 100;

  // only add a bonus when count hits exactly 1, 3, or 5
  let bonus = 0;
  switch (count) {
    case 1:
      bonus = 100;
      break;
    case 3:
      bonus = 200;
      break;
    case 5:
      bonus = 500;
      break;
  }

  return base + bonus;
}

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, referralCode } = req.body;
      if (await User.findOne({ $or: [{ email }, { name }] })) {
        throw new ApiError(400, "Name or email already in use");
      }

      let user: IUser | undefined;

      if (referralCode) {
        if (!Types.ObjectId.isValid(referralCode)) {
          throw new ApiError(400, "Invalid referral code");
        }

        const referrer = await User.findById(referralCode);
        if (referrer) {
          const passwordHash = await bcrypt.hash(password, 10);
          user = await User.create({ name, email, passwordHash });

          await Referral.create({
            referrer: referrer._id,
            referred: user._id,
          });

          // 2) calculate and add points
          const pts = await calculateReferralPoints(referrer._id as any);
          referrer.points += pts;
          await referrer.save();
        } else {
          throw new ApiError(404, "Referrer not found");
        }
      } else {
        const passwordHash = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, passwordHash });
      }

      if (!user) return res.status(400).json({ message: "User not created" });

      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: "1h",
      });
      res.status(201).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        throw new ApiError(401, "Invalid credentials");
      }
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
}
