import mongoose, { Schema, Types } from 'mongoose';



export interface IAnswer {
  questionId: Types.ObjectId;             
  questionnaireAnswerId: Types.ObjectId;  
  answerText?: string;
  answerNumeric?: number;
  answerOptions?: string[];
}

const answerSchema = new Schema<IAnswer>(
  {
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    questionnaireAnswerId: { type: Schema.Types.ObjectId, ref: 'QuestionnaireAnswer', required: true },
    answerText: { type: String, required: false },
    answerNumeric: { type: Number, required: false },
    answerOptions: { type: [String], required: false },
  },
  {
    timestamps: true,
  }
);

const AnswerModel = mongoose.model<IAnswer>('Answer', answerSchema);
export default AnswerModel;
