import mongoose, { Schema} from 'mongoose';

export interface IStudent  {
  first_name: string;
  last_name: string;
  birth_date: Date;
  created_at?: Date;
  updated_at?: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birth_date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudent>('Student', studentSchema);
