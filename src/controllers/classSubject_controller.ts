import { Request, Response } from 'express';
import * as classSubjectService from '../services/classSubject_service';

const getAllClassSubjects = async (req: Request, res: Response) => {
    try {
        const classSubjects = await classSubjectService.getAllClassSubjects();
        if (!classSubjects) {
            res.status(404).json({ message: 'No class subjects found' });
            return;
        }
        res.status(200).json(classSubjects);
    } catch (error) {
        console.error('Error fetching all class subjects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getClassSubjectById = async (req: Request, res: Response) => {
    const classSubjectId = req.params.classSubject_id;
    try {
        const classSubject = await classSubjectService.getClassSubjectById(classSubjectId);
        if (!classSubject) {
            res.status(404).json({ message: 'Class subject not found' });
            return;
        }
        res.status(200).json(classSubject);
    } catch (error) {
        console.error('Error fetching class subject with ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const createClassSubject = async (req: Request, res: Response) => {
    try {
        const { teacherId, classId, subject } = req.body;
        if (!teacherId || !classId || !subject) {
            res.status(400).json({ message: 'Missing required fields' });
        }
        const newClassSubject = await classSubjectService.createClassSubject(teacherId, classId, subject);
        res.status(201).json(newClassSubject);
      } catch (error) {
        console.error('Error creating class subject:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};
const updateClassSubject = async (req: Request, res: Response) => {
    const classSubjectId = req.params.classSubject_id;
    try {
        const updatedClassSubject = await classSubjectService.updateClassSubject(classSubjectId, req.body);
        if (!updatedClassSubject) {
            res.status(404).json({ message: 'Class subject not found' });
            return;
        }
        res.status(200).json(updatedClassSubject);
    } catch (error) {
        console.error('Error updating class subject:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteClassSubject = async (req: Request, res: Response) => {
    const classSubjectId = req.params.classSubject_id;
    try {
        const deleted = await classSubjectService.deleteClassSubject(classSubjectId);
        if (!deleted) {
            res.status(404).json({ message: 'Class subject not found' });
        }
        res.status(200).json({ message: 'Class subject deleted successfully' });
    } catch (error) {
        console.error('Error deleting class subject:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getClassSubjectByTeacherId = async (req: Request, res: Response) => {
    const teacherId = req.params.id;
    try {
        const classSubjects = await classSubjectService.getClassSubjectByTeacherId(teacherId);
        if (!classSubjects) {
            res.status(404).json({ message: 'No class subjects found for this teacher' });
            return;
        }
        res.status(200).json(classSubjects);
    } catch (error) {
        console.error('Error fetching class subjects by teacher ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getSubjectsByTeacherId = async (req: Request, res: Response) => {
    const teacherId = req.params.id;
    try {
        const subjects = await classSubjectService.getSubjectsByTeacherId(teacherId);
        if (!subjects) {
            res.status(404).json({ message: 'No subjects found for this teacher' });
            return;
        }
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects by teacher ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
 const getClassSubjectByClassId = async (req: Request, res: Response) => {
    const classId = req.params.classId;
    try {
        const classSubjects = await classSubjectService.getClassSubjectByClassId(classId);
        if (!classSubjects) {
            res.status(404).json({ message: 'No class subjects found for this class' });
            return;
        }
        res.status(200).json(classSubjects);
    } catch (error) {
        console.error('Error fetching class subjects by class ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export default {
    getAllClassSubjects,
    getClassSubjectById,
    createClassSubject,
    updateClassSubject,
    deleteClassSubject,
    getSubjectsByTeacherId,
    getClassSubjectByTeacherId,
    getClassSubjectByClassId


};

