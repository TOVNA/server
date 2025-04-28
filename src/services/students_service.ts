import students, { IStudent } from '../models/students_model';

export const getStudentById = async (student_id: string) => {
  return await students.findById(student_id);
};

export const createStudent = async (studentData: IStudent) => {
    const id_number = studentData.id_number;

    // Check if student with the same ID already exists
    const existingStudent = await students.findOne({ id_number });
    if (existingStudent) {
        throw new Error('Student with this ID already exists');
    }

    // Create and save the new student
    const student = new students(studentData);
    await student.save();
    return student;
};

export const updateStudent = async (id: string, studentData: IStudent) => {
    const student = await students.findById(id);
    if (!student) {
        throw new Error('Student not found');
    }

    // Update student fields
    student.id_number = studentData.id_number || student.id_number;
    student.first_name = studentData.first_name || student.first_name;
    student.last_name = studentData.last_name || student.last_name;
    student.birth_date = studentData.birth_date || student.birth_date;

    await student.save();
    return student;
};

export const deleteStudent = async (id: string) => {
    const student = await students.findById(id);
    if (!student) {
        throw new Error('Student not found');
    }

    await students.deleteOne({ _id: student._id });
};

export default {
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
