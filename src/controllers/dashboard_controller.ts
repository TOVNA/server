import { Request, Response } from 'express';
import GradeModel from '../models/grade_model';
import ClassSubjectModel from '../models/classSubject_model';
import QuestionnaireAnswerModel from '../models/questionnaireAnswer_model';
import QuestionModel from '../models/question_model';
import mongoose from "mongoose";

export const getGradesSummaryByStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { from, to } = req.query;

    const dateFilter: any = {};

    if (from) dateFilter.$gte = new Date(from as string);
    if (to) dateFilter.$lte = new Date(to as string);

    if (!from && !to) {
      // If no date range is provided, default to the start of the current year
      dateFilter.$gte = new Date(new Date().getFullYear(), 0, 1);
    }

    const grades = await GradeModel.find({
      studentId,
      date: dateFilter
    }).populate({
      path: 'classSubjectId',
      select: 'subject'
    });

    const subjectMap: Record<string, { total: number; count: number }> = {};

    grades.forEach((grade) => {
      const subject = (grade.classSubjectId as any)?.subject || 'לא ידוע';
      if (!subjectMap[subject]) subjectMap[subject] = { total: 0, count: 0 };

      subjectMap[subject].total += grade.score;
      subjectMap[subject].count += 1;
    });

    const summary = Object.entries(subjectMap).map(([subject, data]) => ({
      subject,
      average: Math.round((data.total / data.count) * 100) / 100,
      count: data.count
    }));

    res.json({
      studentId,
      dateRange: {
        from: dateFilter.$gte ? dateFilter.$gte.toISOString() : null,
        to: dateFilter.$lte ? dateFilter.$lte.toISOString() : null
      },
      summary
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get grade summary', error: err });
  }
};

export const getGradesOverTimeForStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { from, to } = req.query;

    const dateFilter: any = {};

    if (from) dateFilter.$gte = new Date(from as string);
    if (to) dateFilter.$lte = new Date(to as string);

    // If no date range is provided, default to the start of the current year
    if (!from && !to) {
      dateFilter.$gte = new Date(new Date().getFullYear(), 0, 1);
    }

    const grades = await GradeModel.find({
      studentId,
      date: dateFilter
    }).populate({
      path: 'classSubjectId',
      select: 'subject'
    });

    const result = grades.map((grade) => ({
      studentId: grade.studentId,                       
      subject: (grade.classSubjectId as any)?.subject || 'לא ידוע',
      score: grade.score,
      date: grade.date                                  
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch grades over time', error: err });
  }
};

