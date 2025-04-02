import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAnswerItem {
  question_id: Types.ObjectId;
  answer_text?: string;
  answer_numeric?: number;
  answer_options?: string[];
}

export interface IAnswer extends Document {
  questionnaire_id: Types.ObjectId;
  student_id: Types.ObjectId;
  teacher_id: Types.ObjectId;
  answers: IAnswerItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

const answerSchema = new Schema<IAnswer>(
  {
    questionnaire_id: { type: Schema.Types.ObjectId, ref: 'Questionnaire', required: true },
    student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    teacher_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [
      {
        question_id: { type: Schema.Types.ObjectId, required: true },
        answer_text: { type: String },
        answer_numeric: { type: Number },
        answer_options: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAnswer>('Answer', answerSchema);
