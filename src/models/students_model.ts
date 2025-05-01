import mongoose, { Schema, Types } from "mongoose";

export interface IStudent {
  first_name: string;
  last_name: string;
  birth_date: Date;
  created_at?: Date;
  updated_at?: Date;
  class_id?: Types.ObjectId;
}

const studentSchema = new Schema<IStudent>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birth_date: { type: Date, required: true },
    class_id: { type: Schema.Types.ObjectId, ref: "SchoolClass" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudent>("Student", studentSchema);
