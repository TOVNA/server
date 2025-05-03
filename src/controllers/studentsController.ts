import { Request, Response } from 'express';
import studentModel from '../models/students_model';
import StudentService from '../services/students_service';

const getStudentById = async (req: Request, res: Response) => {
    const student_id = req.params.id;
    try {
        const student = await StudentService.getStudentById(student_id);
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

const createStudent = async (req: Request, res: Response) => {
    try {
        const student = await StudentService.createStudent(req.body);
        res.status(201).json(student);
    } catch (err) {
        console.error('Error creating student:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedStudent = await StudentService.updateStudent(id, req.body);
        res.status(200).json(updatedStudent);
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await StudentService.deleteStudent(id);
        res.status(200).send('Student deleted');
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export default {
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};