import mongoose, { Schema, Types } from 'mongoose';

export interface ITeacher {
  userId: Types.ObjectId;
  types: ('profession' | 'homeroom')[];
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
      enum: ['profession', 'homeroom'],
      required: true
    }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITeacher>('Teacher', teacherSchema);
