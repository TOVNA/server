import { Request, Response } from 'express';
import ClassModel from '../models/classModel';


const getClassById = async (req: Request, res: Response): Promise<void> => {
    const class_id = req.params.id;
    try {
        const classData = await ClassModel.findById(class_id).populate('students').populate('teachers');
        if (!classData) {
            res.status(404).json({ message: 'Class not found' });
            return;
        }
        res.json(classData);
    } catch (error) {
        console.error('Error fetching class by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createClass = async (req: Request, res: Response): Promise<void> => {
    const { name, students, teachers } = req.body;
    try {
        const newClass = new ClassModel({ name, students, teachers });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const updateClass = async (req: Request, res: Response): Promise<void> => {
    const class_id = req.params.id;
    const { name, students, teachers } = req.body;
    try {
        const updatedClass = await ClassModel.findByIdAndUpdate(class_id, { name, students, teachers }, { new: true });
        if (!updatedClass) {
            res.status(404).json({ message: 'Class not found' });
            return;
        }
        res.json(updatedClass);
    } catch (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteClass = async (req: Request, res: Response): Promise<void> => {
    const class_id = req.params.id;
    try {
        const deletedClass = await ClassModel.findByIdAndDelete(class_id);
        if (!deletedClass) {
            res.status(404).json({ message: 'Class not found' });
            return;
        }
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        console.error('Error deleting class:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getAllClasses = async (req: Request, res: Response): Promise<void> => {
    try {
       
      const classes = await ClassModel.find();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch classes' });
    }
  }

export default
{
    getClassById,
    createClass,
    updateClass,
    deleteClass,
    getAllClasses
};