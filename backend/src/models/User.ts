import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  referralCode: Types.ObjectId;
  points: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    points: { type: Number, default: 0 },
    referralCode: {
      type: Schema.Types.ObjectId,
      required: false,
      unique: true,
      default: function () {
        return this._id as any;
      },
    },
  },
  { timestamps: true }
);

userSchema.index({ referralCode: 1 }, { unique: true, sparse: true });

export const User = model<IUser>("User", userSchema);
