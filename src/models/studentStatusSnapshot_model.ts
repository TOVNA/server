import mongoose, { Schema, Types } from "mongoose";

export enum GradeCategory {
  Learning = "לימודי",
  Social = "חברתי",
  Behavioral = "התנהגותי",
}

export interface IStudentGrade {
  category: GradeCategory;
  value: number;
}

export interface IStudentStatusSnapshot {
  student_id: Types.ObjectId;
  createdBy: Types.ObjectId;
  summary: string;
  grades: IStudentGrade[];
  timestamp: Date;
  createdAt?: Date;
}

const studentStatusSnapshotSchema = new Schema<IStudentStatusSnapshot>(
  {
    student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    summary: { type: String, required: true },
    grades: [
      {
        category: {
          type: String,
          enum: Object.values(GradeCategory),
          required: true,
        },
        value: { type: Number, required: true },
      },
    ],
    timestamp: { type: Date, required: true },
  },
  { timestamps: true }
);

const StudentStatusSnapshotModel = mongoose.model<IStudentStatusSnapshot>(
  "StudentStatusSnapshot",
  studentStatusSnapshotSchema
);

export default StudentStatusSnapshotModel;
