import mongoose, { Schema, Types } from 'mongoose';
import { TeacherType } from '../types/teacher';

export interface ITeacher {
  userId: Types.ObjectId;
  types: TeacherType[];
}

const teacherSchema = new Schema<ITeacher>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    types: [{
      type: String,
      enum:  Object.values(TeacherType),
      required: true
    }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITeacher>('Teacher', teacherSchema);
