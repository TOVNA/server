import GradeModel, { IGrade } from '../models/grade_model';


export const createGrade = async (data: IGrade) => {
  return await GradeModel.create(data);
};


export const getGradesByStudentId = async (studentId: string) => {
  return await GradeModel.find({ studentId })
    .populate('teacherId', 'userId')
    .populate('classSubjectId');
};


export const getGradesByClassSubjectId = async (classSubjectId: string) => {
  return await GradeModel.find({ classSubjectId })
    .populate('studentId')
    .populate('teacherId', 'userId');
};


export const deleteGrade = async (id: string) => {
  return await GradeModel.findByIdAndDelete(id);
};


export const updateGrade = async (id: string, data: Partial<IGrade>) => {
  return await GradeModel.findByIdAndUpdate(id, data, { new: true });
};
