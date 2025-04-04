import mongoose, { Schema,Types } from 'mongoose';

export interface ISchoolClass  {
  grade: string;           
  classNumber: number;     
  description?: string;
  homeroomTeacherId: Types.ObjectId;
  studentIds: Types.ObjectId[];     
}

const classSchema = new Schema<ISchoolClass>(
  {
    grade: { type: String, required: true },
    classNumber: { type: Number, required: true },
    description: { type: String, required: false },
    homeroomTeacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentIds: [{ type: Schema.Types.ObjectId, ref: 'Student', required: true }],
  },
  {
    timestamps: true,
  }
);

const ClassModel = mongoose.model<ISchoolClass>('SchoolClass', classSchema);
export default ClassModel;