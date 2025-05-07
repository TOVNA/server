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


