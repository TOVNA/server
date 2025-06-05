import mongoose, { Schema, Types } from 'mongoose';

export interface IGrade {
  studentId: Types.ObjectId;
  teacherId: Types.ObjectId;
  classSubjectId: Types.ObjectId; 
  score: number;
  date: Date;
  type: string; // e.g., 'exam', 'assignment', 'participation'
  description?: string;
}

const gradeSchema = new Schema<IGrade>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    classSubjectId: { type: Schema.Types.ObjectId, ref: 'ClassSubject', required: true },
    score: { type: Number, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

const GradeModel = mongoose.model<IGrade>('Grade', gradeSchema);
export default GradeModel;
