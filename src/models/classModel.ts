import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export interface IClass extends Document {
  name: string;
  students: ObjectId[];
  created_at: Date;
}

const classSchema = new Schema<IClass>({
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  created_at: { type: Date, default: Date.now },
});

const classModel = mongoose.model<IClass>('Class', classSchema);
export default classModel;