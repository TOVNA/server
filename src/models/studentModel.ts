import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IStudent extends Document {
  first_name: string;
  last_name: string;
  birth_date: Date;
  class_id: ObjectId;
  learning_disabilities: string[];
  created_at: Date;
}

const studentSchema = new Schema<IStudent>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birth_date: { type: Date, required: true },
  class_id: { type: Schema.Types.ObjectId, ref: 'Class' },
  learning_disabilities: [{type: String}],
  created_at: { type: Date, default: Date.now },
});

const studentModel = mongoose.model<IStudent>('Student', studentSchema);
export default studentModel;