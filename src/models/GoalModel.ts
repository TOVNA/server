// models/Goal.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISubGoal {
  text: string;
  priority: 'high' | 'medium' | 'low';
  confidence?: number;
  source?: 'ai' | 'manual';
  isAchieved?: boolean;
  achievedAt?: Date;
}

export interface IGoal extends Document {
  student_id: Types.ObjectId;
  createdBy: Types.ObjectId;
  generated_by_ai: boolean;
  goals: ISubGoal[];
  createdAt?: Date;
  updatedAt?: Date;
}

const goalSchema = new Schema<IGoal>(
  {
    student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    generated_by_ai: { type: Boolean, required: true },
    goals: [
      {
        text: { type: String, required: true },
        priority: { type: String, enum: ['high', 'medium', 'low'], required: true },
        confidence: Number,
        source: { type: String, enum: ['ai', 'manual'] },
        isAchieved: { type: Boolean, default: false },
        achievedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IGoal>('Goal', goalSchema);
