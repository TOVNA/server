import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion {
  text: string;
  type: 'text' | 'scale' | 'multiple_choice';
  scale?: number;
  options?: string[];
}

export interface IQuestionnaire extends Document {
  title: string;
  description?: string;
  targetRole: 'teacher' | 'homeroom';
  questions: IQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
}

const questionnaireSchema = new Schema<IQuestionnaire>(
  {
    title: { type: String, required: true },
    description: { type: String },
    targetRole: {
      type: String,
      enum: ['teacher', 'homeroom'],
      required: true,
    },
    questions: [
      {
        text: { type: String, required: true },
        type: { type: String, enum: ['text', 'scale', 'multiple_choice'], required: true },
        scale: Number,
        options: [String],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IQuestionnaire>('Questionnaire', questionnaireSchema);
