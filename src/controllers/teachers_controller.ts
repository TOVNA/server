import { Request, Response } from 'express';
import  teacherModel from '../models/teachers_model';
import * as teacherService from '../services/teachers_service';

const getTeacherById = async (req: Request, res: Response) => {
    const teacher_id = req.params.id;
    try {
        const teacher = await teacherService.getTeacherById(teacher_id);
        if (!teacher) {
            res.status(404).json({ message: 'Teacher not found' });
            return;
        }
        res.json(teacher);
    } catch (error) {
        console.error('Error fetching teacher with ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export default {
    getTeacherById,
};