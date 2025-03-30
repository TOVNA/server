import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IQuestionnaire extends Document{
    title: string;
    description: string;
    questions: {
        _id: ObjectId;
        text: string;
        type: string;
        scale?: number;
        options?: string[];
    }[];
    created_at: Date;
}

const questionnaireSchema = new Schema<IQuestionnaire>({
    title: {type: String, required: true},
    description: String,
    questions: [{
        text: {type: String, required: true},
        type: {type: String, required: true},
        scale: Number,
        options: [String]
    }],
    created_at: {type: Date, default: Date.now}
});

const questionnaireModel = mongoose.model<IQuestionnaire>('Questionnaire', questionnaireSchema);
export default questionnaireModel;