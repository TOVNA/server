import teachers, { ITeacher } from '../models/teachers_model';
import { TeacherType } from '../types/teacher';

export const getTeacherById = async (teacher_id: string) => {
  return await teachers.findById(teacher_id)
        .populate('userId');
};

const getAllTeachers = async () => {
  return await teachers.find().populate('userId', 'first_name last_name email role');
};

export const createTeacher = async (userId: string, types: TeacherType[]) => {
  return await teachers.create({ userId, types });
};

export const updateTeacher = async (teacherId: string, types: TeacherType[]) => {
  return await teachers.findByIdAndUpdate(
      teacherId,
      { types },
      { new: true }
  );
};

export const deleteTeacher = async (teacherId: string) => {
  const deletedTeacher = await teachers.findByIdAndDelete(teacherId);
  return deletedTeacher !== null;
};

export default {
  getTeacherById,
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
};

