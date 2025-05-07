import ClassSubjectModel, { IClassSubject } from '../models/classsSubject_model';

export const getAllClassSubjects = async () => {
    return await ClassSubjectModel.find()
        .populate('teacherId','firstName lastName email')
        .populate('classId','grade classNumber description')
}
export const getClassSubjectById = async (classSubject_id: string) => {
    return await ClassSubjectModel.findById(classSubject_id)
        .populate('teacherId','firstName lastName email')
        .populate('classId','grade classNumber description')
}
export const createClassSubject = async (teacherId: string, classId: string, subject: string) => {
    const newClassSubject = new ClassSubjectModel({ teacherId, classId, subject });
    return await newClassSubject.save();
  };
export const updateClassSubject = async (id: string, updatedData: { teacherId?: string, classId?: string, subject?: string }) => {
  return await ClassSubjectModel.findByIdAndUpdate(id, updatedData, { new: true })
    .populate('teacherId', 'firstName lastName email')
    .populate('classId', 'grade classNumber description');
};

export const deleteClassSubject = async (classSubject_id: string) => {
    return await ClassSubjectModel.findByIdAndDelete(classSubject_id);
}
export const getSubjectsByTeacherId = async (teacherId: string) => {
    return await ClassSubjectModel.find({ teacherId })
      .populate('classId', 'grade classNumber description')
      .select('subject classId');
}
export const getClassSubjectByTeacherId = async (teacherId: string) => {
    return await ClassSubjectModel.find({ teacherId: teacherId })
        .populate('teacherId','firstName lastName email')
        .populate('classId','grade classNumber description')
        .select('subject classId');
}
export const getClassSubjectByClassId = async (classId: string) => {
    return await ClassSubjectModel.find({ classId: classId })
        .populate('teacherId','firstName lastName email')
        .populate('classId','grade classNumber description')
        .select('subject teacherId');
}