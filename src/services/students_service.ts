import students, { IStudent } from "../models/students_model";
import classes from "../models/schoolClass_model";

export const getStudentById = async (student_id: string) => {
  const student = await students.findById(student_id).lean();
  if (!student) return null;

  const studentClass = await classes
    .findOne({ studentIds: student._id }, { _id: 1, grade: 1, classNumber: 1 })
    .lean();

  return {
    ...student,
    class: studentClass || null,
  };
};

export const getAllStudents = async () => {
    const studentsList = await students.find().lean();
    const classList = await classes.find().lean();
  
    const classByStudentId = new Map<string, any>();
    for (const cls of classList) {
      for (const sid of cls.studentIds) {
        classByStudentId.set(sid.toString(), cls);
      }
    }
  
    return studentsList.map((student) => ({
      ...student,
      class: classByStudentId.get(student._id.toString()) || null,
    }));
  };

export const createStudent = async (studentData: IStudent) => {
  const student = new students(studentData);
  await student.save();

  return student;
};

export const updateStudent = async (id: string, studentData: IStudent) => {
  const student = await students.findById(id);
  if (!student) {
    throw new Error("Student not found");
  }

  // Update student fields
  student.first_name = studentData.first_name || student.first_name;
  student.last_name = studentData.last_name || student.last_name;
  student.birth_date = studentData.birth_date || student.birth_date;

  await student.save();
  return student;
};

export const deleteStudent = async (id: string) => {
  const student = await students.findById(id);
  if (!student) {
    throw new Error("Student not found");
  }

  await students.deleteOne({ _id: student._id });
};

export default {
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
};
