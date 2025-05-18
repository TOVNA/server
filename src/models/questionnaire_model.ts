import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IQuestionnaire extends Document {
  title: string;
  description?: string;
  targetRole: 'teacher' | 'homeroom';
  questionIds: Types.ObjectId[]; // ref: 'Question'
}

const questionnaireSchema = new Schema<IQuestionnaire>(
  {
    title: { type: String, required: true },
    description: { type: String },
    targetRole: {
      type: String,
      enum: ['teacher', 'homeroom'],
      required: true
    },
    questionIds: [{ type: Schema.Types.ObjectId, ref: 'Question'}]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IQuestionnaire>('Questionnaire', questionnaireSchema);
