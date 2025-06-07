import { Request, Response } from "express";
import * as statusService from "../services/studentStausSnapshot_service";

export const generateSnapshot = async (req: Request, res: Response): Promise<void> => {
  const { studentId, createdBy, days } = req.body;

  try {
    const snapshot = await statusService.generateStatusSnapshot(studentId, createdBy, days);
    res.status(201).json(snapshot);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getSnapshotsByStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.studentId;
    const snapshots = await statusService.getSnapshotsByStudentId(studentId);
    res.status(200).json(snapshots);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
