import mongoose, { Schema} from 'mongoose';

export interface IStudent  {
  id_number: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    id_number: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birth_date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudent>('Student', studentSchema);
