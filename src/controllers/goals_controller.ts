import { Request, Response } from "express";
import * as goalService from "../services/goals_service";

export const generateGoals = async (req: Request, res: Response): Promise<void> => {
  const { studentId, createdBy } = req.body;

  try {
    const result = await goalService.generateGoalsFromAnswers(studentId, createdBy);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getGoalsByStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.studentId;
    const goals = await goalService.getGoalsByStudentId(studentId);
    res.status(200).json(goals);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goalId = req.params.goalId;
    const updatedGoals = req.body.goals;
    const updated = await goalService.updateGoals(goalId, updatedGoals);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goalId = req.params.goalId;
    await goalService.deleteGoals(goalId);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getGoalsByStudent,
  updateGoal,
  deleteGoal,
  generateGoals,
};
