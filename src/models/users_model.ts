import mongoose, { Schema } from 'mongoose';

export interface IUser  {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'homeroom';
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
      enum: ['admin', 'teacher', 'homeroom'],
      default: 'teacher'
    },
    refreshToken: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }

);

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
