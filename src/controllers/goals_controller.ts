import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import * as goalService from "../services/goals_service";
import { deleteStrategiesByGoal } from "../services/strategies_service";

export const generateGoals = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { studentId, days } = req.body;

  try {
    const createdBy = req.user?._id;
    if (!createdBy) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const result = await goalService.generateGoalsFromAnswers(
      studentId,
      createdBy,
      days
    );
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createGoal = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const createdBy = req.user?._id;
    if (!createdBy) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const { studentId, text, strategies } = req.body;

    if (!studentId || !text) {
      res
        .status(400)
        .json({ error: "Missing required fields: studentId or text" });
      return;
    }

    const goal = await goalService.createGoal(
      { studentId, text, strategies },
      createdBy
    );
    res.status(201).json(goal);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getGoalsByStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.params.studentId;
    const goals = await goalService.getGoalsByStudentId(studentId);
    res.status(200).json(goals);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getGoalById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const goalId = req.params.goalId;
    const goal = await goalService.getGoalById(goalId);
    res.status(200).json(goal);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateGoal = async (req: Request, res: Response) => {
  try {
    const goal = await goalService.updateGoal(req.params.goalId, req.body);
    res.status(200).json(goal);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteGoal = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const goalId = req.params.goalId;
    await goalService.deleteGoals(goalId);
    await deleteStrategiesByGoal(goalId);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getGoalsByStudent,
  createGoal,
  updateGoal,
  deleteGoal,
  generateGoals,
  getGoalById,
};
