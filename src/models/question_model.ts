import mongoose, { Schema, Types } from 'mongoose';



export interface IQuestion  {
    questionnaireId: Types.ObjectId; 
    text: string;
    type: 'text' | 'numeric' | 'multiple-choice' | 'scale';
    scale?: {
      min: number;
      max: number;
    };
    options?: string[]; 
  }

const questionSchema = new Schema<IQuestion>(
    {
        questionnaireId: { type: Schema.Types.ObjectId, ref: 'Questionnaire', required: true },
        text: { type: String, required: true },
        type: {
            type: String,
            enum: ['text', 'numeric', 'multiple-choice', 'scale'],
            required: true
        },
        scale: {
            min: { type: Number },
            max: { type: Number }
        },
        options: [{ type: String }]
    },
    {
        timestamps: true
    }
);
const QuestionModel = mongoose.model<IQuestion>('Question', questionSchema);
export default QuestionModel;
