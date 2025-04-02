import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'homeroom';
  homeroom_classes: mongoose.Types.ObjectId[];
  subject_classes: {
    class_id: mongoose.Types.ObjectId;
    subject: string;
  }[];
  refreshTokens: string[];
  created_at?: Date;
  updated_at?: Date;
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
    homeroom_classes:
     [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    subject_classes: [
      {
        class_id: { type: Schema.Types.ObjectId, ref: 'Class' },
        subject: { type: String }
      }
    ],
    refreshTokens: [{ type: String, default: [] }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', userSchema);
