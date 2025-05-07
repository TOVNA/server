import schoolClass, { ISchoolClass } from '../models/schoolClass_model';

export const getAllClasses = async () => {
  return await schoolClass.find()
    .populate('homeroomTeacherId')
    .populate('studentIds');
};

export const getClassById = async (class_id: string) => {
  return await schoolClass.findById(class_id)
    .populate('homeroomTeacherId')
    .populate('studentIds');
};

export const createClass = async (grade: string, classNumber: number, description: string, homeroomTeacherId: string, studentIds: string[]) => {
  const newClass = new schoolClass({
    grade,
    classNumber,
    description,
    homeroomTeacherId,
    studentIds,
  });
  return await newClass.save();
};
export const updateClass = async (class_id: string, updatedClass: ISchoolClass) => {
  return await schoolClass.findByIdAndUpdate(class_id, updatedClass, { new: true })
    .populate('homeroomTeacherId')
    .populate('studentIds');
}
export const deleteClass = async (class_id: string) => {
  return await schoolClass.findByIdAndDelete(class_id);
};

export const getClassByHomeroomTeacherId = async (teacherId: string) => {
  return await schoolClass.find({ homeroomTeacherId: teacherId })
    .populate('homeroomTeacherId')
    .populate('studentIds');
};
export const getClassByStudentId = async (studentId: string) => {
  return await schoolClass.find({ studentIds: studentId })
    .populate('homeroomTeacherId')
    .populate('studentIds');
};
export const addStudentToClass = async (classId: string, studentId: string) => {
  return await schoolClass.findByIdAndUpdate(
    classId,
    { $addToSet: { studentIds: studentId } },
    { new: true }
  )
    .populate('homeroomTeacherId')
    .populate('studentIds');
}
