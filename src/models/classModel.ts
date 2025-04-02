import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

const classSchema = new Schema<IClass>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IClass>('Class', classSchema);
