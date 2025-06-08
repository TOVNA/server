import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  studentId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  text: string;
  strategies: mongoose.Types.ObjectId[];
  generatedByAI: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema: Schema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    strategies: [{ type: Schema.Types.ObjectId, ref: 'Strategy' }],
    generatedByAI: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IGoal>('Goal', GoalSchema);
