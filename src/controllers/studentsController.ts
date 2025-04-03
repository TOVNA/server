import { Request, Response } from 'express';
import studentModel from '../models/students_model';
import * as studentService from '../services/students_service';

const getStudentById = async (req: Request, res: Response) => {
    const student_id = req.params.id;
    try {
        const student = await studentService.getStudentById(student_id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.json(student);
    } catch (error) {
        console.error('Error fetching student with ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export default {
    getStudentById,
};