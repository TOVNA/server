import mongoose, { Schema } from 'mongoose';
import { Role } from '../types/roles';

export interface IUser  {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: Role;
  created_at?: Date;
  updated_at?: Date;
  refreshToken?: string[];
}

const userSchema = new Schema<IUser>(
  {
    first_name: {
         type: String,
          required: true },
    last_name: { 
        type: String, 
        required: true },
    email: 
    { type: String, 
        required: true, 
        unique: true },
    password: { type: String,
         required: false },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.Teacher
    },
    refreshToken: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }

);

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
