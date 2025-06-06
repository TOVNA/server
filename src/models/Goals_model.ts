import mongoose, { Schema, Types } from 'mongoose';

export interface ISubGoal {
  text: string;
  priority: 'high' | 'medium' | 'low';
  confidence?: number;
  source?: 'ai' | 'manual';
  isAchieved?: boolean;
  achievedAt?: Date;
}

export interface IStrategy {
  text: string;
  relatedGoal?: string;
  source?: 'ai' | 'manual';
}

export interface IGoal {
  student_id: Types.ObjectId;
  createdBy: Types.ObjectId;
  generated_by_ai: boolean;
  goals: ISubGoal[];
  strategies: IStrategy[];
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
        confidence: { type: Number, default: 0.5 },
        source: { type: String, enum: ['ai', 'manual'], default: 'ai' },
        isAchieved: { type: Boolean, default: false },
        achievedAt: { type: Date },
      },
    ],
    strategies: [
      {
        text: { type: String, required: true },
        relatedGoal: { type: String },
        source: { type: String, enum: ['ai', 'manual'], default: 'ai' },
      },
    ],
  },
  { timestamps: true }
);

const GoalModel = mongoose.model<IGoal>('Goal', goalSchema);
export default GoalModel;
