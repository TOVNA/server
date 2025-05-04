import teachers, { ITeacher } from '../models/teachers_model';
import UserModel from '../models/users_model';
import { TeacherType } from '../types/teacher';
import { Role } from '../types/roles';
import bcrypt from 'bcrypt';


export const getTeacherById = async (teacher_id: string) => {
  return await teachers.findById(teacher_id)
        .populate('userId');
};

const getAllTeachers = async () => {
  return await teachers.find().populate('userId', 'first_name last_name email role');
};

export const createTeacher = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  types: TeacherType[]
) => {
  try{
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error('Email already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: Role.Teacher
    });

    const teacher = await teachers.create({
      userId: user._id,
      types
    });

    return {user, teacher};
  } catch (error){
    throw new Error(`Failed to create teacher with user: ${error}`);
  }
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

