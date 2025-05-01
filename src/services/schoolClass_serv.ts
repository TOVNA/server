import schoolClass, { ISchoolClass } from "../models/schoolClass_model";

export const getAllClasses = async () => {
  return await schoolClass
    .find()
    .populate("homeroomTeacherId")
    .populate("studentIds");
};

export const getClassById = async (class_id: string) => {
  return await schoolClass
    .findById(class_id)
    .populate("homeroomTeacherId")
    .populate("studentIds");
};

export const updateStudentClassRelation = async (
  studentId: string,
  oldClassId: string | undefined,
  newClassId: string | undefined
) => {
  try {
    if (oldClassId) {
      await schoolClass.updateOne(
        { _id: oldClassId },
        { $pull: { studentIds: studentId } }
      );
    }

    if (newClassId) {
      await schoolClass.updateOne(
        { _id: newClassId },
        { $addToSet: { studentIds: studentId } }
      );
    }
  } catch (err) {
    throw err;
  }
};
