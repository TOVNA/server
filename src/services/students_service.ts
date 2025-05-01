import students, { IStudent } from "../models/students_model";
import { updateStudentClassRelation } from "./schoolClass_serv";

export const getStudentById = async (student_id: string) => {
  return await students.findById(student_id).populate("class_id");
};

export const getAllStudents = async () => {
  return await students.find().populate("class_id");
};

export const createStudent = async (studentData: IStudent) => {
  const student = new students(studentData);
  await student.save();

  if (studentData.class_id) {
    await updateStudentClassRelation(
      student._id.toString(),
      undefined,
      studentData.class_id.toString()
    );
  }

  return student;
};

export const updateStudent = async (id: string, studentData: IStudent) => {
  const student = await students.findById(id);

  if (!student) {
    throw new Error("Student not found");
  }

  const oldClassId = student.class_id;
  student.first_name = studentData.first_name || student.first_name;
  student.last_name = studentData.last_name || student.last_name;
  student.birth_date = studentData.birth_date || student.birth_date;
  student.class_id = studentData.class_id;

  await student.save();
  await updateStudentClassRelation(
    student._id.toString(),
    oldClassId?.toString(),
    studentData?.class_id?.toString()
  );

  return student;
};

export const deleteStudent = async (id: string) => {
  const student = await students.findById(id);
  if (!student) {
    throw new Error("Student not found");
  }

  await students.deleteOne({ _id: student._id });
};

export default {
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
};
