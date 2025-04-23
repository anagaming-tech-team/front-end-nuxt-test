import { Schema, model, Document, Types } from 'mongoose';

export interface IReferral extends Document {
  referrer: Types.ObjectId;
  referred: Types.ObjectId;
  createdAt: Date;
}

const referralSchema = new Schema<IReferral>(
  {
    referrer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    referred: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Referral = model<IReferral>('Referral', referralSchema);
