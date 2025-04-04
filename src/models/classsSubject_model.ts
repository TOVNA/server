import mongoose, { Schema, Types } from 'mongoose';
import { Type } from 'typescript';

export interface IClassSubject  {
    teacherId: Types.ObjectId;   
    classId: Types.ObjectId;    
    subject: string;   
}

const classSubjectSchema = new Schema<IClassSubject>(
    {
        teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
        classId: { type: Schema.Types.ObjectId, ref: 'SchoolClass', required: true },
        subject: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const ClassModel= mongoose.model<IClassSubject>('ClassSubject', classSubjectSchema);
export default ClassModel;