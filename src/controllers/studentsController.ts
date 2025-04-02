import { Request, Response } from 'express';
import studentModel from '../models/studentModel';

const getStudentById = async (req: Request, res: Response):  Promise<void> => {
    const student_id = req.params.id;
    try {
        const student = await studentModel.findById(student_id).populate('class_id');
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.json(student);
    } catch (error) {
        console.error('Error fetching student by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getStudentsByClass = async (req: Request, res: Response): Promise<void> => {
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