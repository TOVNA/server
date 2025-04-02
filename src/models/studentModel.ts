import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  first_name: string;
  last_name: string;
  birth_date: Date;
  class_id: mongoose.Types.ObjectId;
  created_at?: Date;
  updated_at?: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birth_date: { type: Date, required: true },
    class_id: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudent>('Student', studentSchema);
