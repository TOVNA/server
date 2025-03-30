import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface ITeacher extends Document {
  first_name: string;
  last_name: string;
  email: string;
  homeroom_classes: ObjectId[];
  subject_classes: { class_id: ObjectId; subject: string }[];
  created_at: Date;
}

const teacherSchema = new Schema<ITeacher>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  homeroom_classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  subject_classes: [
    {
      class_id: { type: Schema.Types.ObjectId, ref: 'Class' },
      subject: String,
    },
  ],
  created_at: { type: Date, default: Date.now },
});

const teacherModel = mongoose.model<ITeacher>('Teacher', teacherSchema);
export default teacherModel;