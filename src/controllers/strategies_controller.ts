import { Request, Response } from "express";
import * as strategyService from "../services/strategies_service";

export const createStrategy = async (req: Request, res: Response) => {
  try {
    const strategy = await strategyService.createStrategy(req.body);
    res.status(201).json(strategy);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getStrategiesByGoal = async (req: Request, res: Response) => {
  try {
    const strategies = await strategyService.getStrategiesByGoal(req.params.goalId);
    res.status(200).json(strategies);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStrategy = async (req: Request, res: Response) => {
  try {
    const updated = await strategyService.updateStrategy(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteStrategy = async (req: Request, res: Response) => {
  try {
    await strategyService.deleteStrategy(req.params.id);
    res.status(204).send();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const generateStrategies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.body;
    if (!studentId) {
      res.status(400).json({ error: "Missing studentId" });
      return;
    }

    const strategies = await strategyService.generateStrategiesForStudent(studentId);
    res.status(201).json(strategies);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};