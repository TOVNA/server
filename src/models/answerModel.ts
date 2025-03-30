import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IAnswer extends Document{
    questionnaire_id: ObjectId;
    student_id: ObjectId;
    teacher_id: ObjectId;
    answers: {
        question_id: ObjectId;
        answer_text?: string;
        answer_numeric?: number;
        answer_options?: string[];
    }[];
    created_at: Date;
}

const answerSchema = new Schema<IAnswer>({
    questionnaire_id: {type: Schema.Types.ObjectId, ref: 'Questionnaire'},
    student_id: {type: Schema.Types.ObjectId, ref: 'Student'},
    teacher_id: {type: Schema.Types.ObjectId, ref: 'Teacher'},
    answers: [{
        question_id: {type: Schema.Types.ObjectId, required: true},
        answer_text: String,
        answer_numeric: Number,
        answer_options: [String]
    }],
    created_at: {type: Date, default: Date.now}
});

const answerModel = mongoose.model<IAnswer>('Answer', answerSchema);
export default answerModel;