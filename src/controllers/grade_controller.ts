import { Request, Response } from 'express';
import * as gradeService from '../services/grade_service';

export const createGrade = async (req: Request, res: Response) => {
  try {
    const newGrade = await gradeService.createGrade(req.body);
    res.status(201).json(newGrade);
  } catch (err) {
    res.status(500).json({ message: 'Error creating grade', error: err });
  }
};

export const getGradesByStudentId = async (req: Request, res: Response) => {
  try {
    const grades = await gradeService.getGradesByStudentId(req.params.studentId);
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching grades by student', error: err });
  }
};

export const getGradesByClassSubjectId = async (req: Request, res: Response) => {
  try {
    const grades = await gradeService.getGradesByClassSubjectId(req.params.classSubjectId);
    res.json(grades);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching grades by subject', error: err });
  }
};

export const deleteGrade = async (req: Request, res: Response) => {
  try {
    await gradeService.deleteGrade(req.params.id);
    res.json({ message: 'Grade deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting grade', error: err });
  }
};

export const updateGrade = async (req: Request, res: Response) => {
  try {
    const updated = await gradeService.updateGrade(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating grade', error: err });
  }
};
