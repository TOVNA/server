import mongoose, { Schema, Document } from 'mongoose';

export interface IStrategy extends Document {
  goalId: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const StrategySchema: Schema = new Schema(
  {
    goalId: { type: Schema.Types.ObjectId, ref: 'Goal', required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IStrategy>('Strategy', StrategySchema);
