import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IGoal extends Document{
    student_id: ObjectId;
    generated_by_ai: boolean;
    goals: {
        text: string;
        priority: string;
        confidence?: number;
        source?: string;
    }[];
    created_at: Date;
}

const GoalSchema = new Schema<IGoal>({
    student_id: {type: Schema.Types.ObjectId, ref: 'Student'},
    generated_by_ai: {type: Boolean, required: true},
    goals: [{
        text: {type: String, required: true},
        priority: {type: String, required: true},
        confidence: Number,
        source: String,
    }],
    created_at: {type: Date, default: Date.now}
});

const GoalModel = mongoose.model<IGoal>('Goal', GoalSchema);
export default GoalModel;