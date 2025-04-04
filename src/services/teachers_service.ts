import teachers, { ITeacher } from '../models/teachers_model';

export const getTeacherById = async (teacher_id: string) => {
  return await teachers.findById(teacher_id)
        .populate('userId');
};

