import mongoose, { Schema, Types } from 'mongoose';

export interface QuestionnaireAnswer
{
    questionnaireId: Types.ObjectId; 
    teacherId?: Types.ObjectId;      
    studentId?: Types.ObjectId;     
    answerIds: Types.ObjectId[];     
    createdAt: Date;
    updatedAt: Date;
}

const questionnaireAnswerSchema = new Schema<QuestionnaireAnswer>(
    {
        questionnaireId: { type: Schema.Types.ObjectId, ref: 'Questionnaire', required: true },
        teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
        studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
        answerIds: [{ type: Schema.Types.ObjectId, ref: 'Answer', required: true }],
    },
    {
        timestamps: true,
    }
);

const QuestionnaireAnswerModel = mongoose.model<QuestionnaireAnswer>('QuestionnaireAnswer', questionnaireAnswerSchema);
export default QuestionnaireAnswerModel;