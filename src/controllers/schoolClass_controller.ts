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

export default {
    getAllClasses,
    getClassById,
};



