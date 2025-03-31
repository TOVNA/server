import { Request, Response } from 'express';
import studentModel, { IStudent } from '../models/studentModel';

const getStudentById = async (req: Request, res: Response) => {
    const student_id = req.params.id;
    try {
        const student = await studentModel.findById(student_id).populate('class_id');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getStudentsByClass = async (req: Request, res: Response) => {
    try {
        const students = await studentModel.find({class_id: req.params.classId}).populate('class_id');
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students by class:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export default {
    getStudentById,
    getStudentsByClass
};