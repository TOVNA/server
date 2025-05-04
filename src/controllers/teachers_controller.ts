import { Request, Response } from 'express';
import  teacherModel from '../models/teachers_model';
import  teacherService from '../services/teachers_service';

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

const getAllTeachers = async (req: Request, res: Response) => {
    try {
        const teachers = await teacherService.getAllTeachers();
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createTeacher = async (req: Request, res: Response) => {
    try {
        const { email, first_name, last_name, password, types } = req.body;
        if (!email || !first_name || !last_name || !password || !Array.isArray(types)) {
            res.status(400).json({ message: 'Missing or Invalid fields in request body' });
            return;
        }
        const newTeacher = await teacherService.createTeacher( 
            email,
            first_name,
            last_name,
            password,
            types);
        res.status(201).json(newTeacher);
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateTeacher = async (req: Request, res: Response) => {
    const teacherId = req.params.id;
    try {
        const { types } = req.body;
        if (!types || !Array.isArray(types)) {
            res.status(400).json({ message: 'Invalid request body' });
            return;
        }
        const updatedTeacher = await teacherService.updateTeacher(teacherId, types);
        if (!updatedTeacher) {
            res.status(404).json({ message: 'Teacher not found' });
            return;
        }
        res.status(200).json(updatedTeacher);
    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteTeacher = async (req: Request, res: Response) => {
    const teacherId = req.params.id;
    try {
        const deleted = await teacherService.deleteTeacher(teacherId);
        if (!deleted) {
            res.status(404).json({ message: 'Teacher not found' });
            return;
        }
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    getTeacherById,
    getAllTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
};