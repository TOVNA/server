import { Request, Response } from 'express';
import * as schoolService from '../services/schoolClass_serv';


const getAllClasses = async (req: Request, res: Response)=> {
    try {
        const classes = await schoolService.getAllClasses();
        res.status(200).json(classes);
    } catch (error) {
        console.error('Error fetching all classes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getClassById = async (req: Request, res: Response) => {
    const class_id = req.params.id;
    try {
        const schoolClass = await schoolService.getClassById(class_id);
        if (schoolClass === undefined || schoolClass === null) {
            res.status(404).json({ message: 'Class not found' });
            return;
        }
        res.json(schoolClass);
    } catch (error) {
        console.error('Error fetching class by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const createClass = async (req: Request, res: Response) => {
    try {
        const { grade, description, homeroomTeacherId,classNumber, studentIds } = req.body;
        if (!grade  || !homeroomTeacherId || !studentIds) {
            res.status(400).json({ message: 'Invalid request body' });
            return;
        }
        const newClass = await schoolService.createClass(grade,classNumber, description, homeroomTeacherId, studentIds);
        res.status(201).json(newClass);
    }
    catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const updateClass = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedClass = await schoolService.updateClass(id, req.body);
        res.status(200).json(updatedClass);
    } catch (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteClass = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await schoolService.deleteClass(id);
        res.status(200).send('Class deleted');
    } catch (error) {
        console.error('Error deleting class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getClassByHomeroomTeacherId = async (req: Request, res: Response) => {
    const teacherId = req.params.id;
    try {
        const classes = await schoolService.getClassByHomeroomTeacherId(teacherId);
        if (!classes) {
            res.status(404).json({ message: 'Classes not found' });
            return;
        }
        res.json(classes);
    } catch (error) {
        console.error('Error fetching classes by homeroom teacher ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getClassByStudentId = async (req: Request, res: Response) => {
    const studentId = req.params.id;
    try {
        const classes = await schoolService.getClassByStudentId(studentId);
        if (!classes) {
            res.status(404).json({ message: 'Classes not found' });
            return;
        }
        res.json(classes);
    } catch (error) {
        console.error('Error fetching classes by student ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




export default {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass,
    getClassByHomeroomTeacherId,
    getClassByStudentId
};



