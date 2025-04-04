import students, { IStudent } from '../models/students_model';

export const getStudentById = async (student_id: string) => {
  return await students.findById(student_id);
};


