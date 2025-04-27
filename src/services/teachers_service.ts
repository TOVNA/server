import teachers, { ITeacher } from '../models/teachers_model';

export const getTeacherById = async (teacher_id: string) => {
  return await teachers.findById(teacher_id)
        .populate('userId');
};
const getAllTeachers = async () => {
  return await teachers.find().populate('userId', 'first_name last_name email role');
};

export default {
  getTeacherById,
  getAllTeachers
};

