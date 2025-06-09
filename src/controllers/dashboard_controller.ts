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

/*
export const getAverageGradeFromQuestionnaire = async (req: Request, res: Response) => {
  try {
    const { studentId, questionnaireId } = req.params;

    // הבאת כל התשובות של השאלון עבור התלמיד
    const answerDoc = await QuestionnaireAnswerModel.findOne({
      studentId: new mongoose.Types.ObjectId(studentId),
      questionnaireId: new mongoose.Types.ObjectId(questionnaireId)
    }).populate('answerIds');

    if (!answerDoc) {
      res.status(404).json({ message: 'No questionnaire answers found' });
      return;
    }

    const answerIds = answerDoc.answerIds as any[];
    const numericAnswers = answerIds.filter((ans) => typeof ans.answerNumeric === 'number');

    if (numericAnswers.length === 0) {
       res.status(200).json({ averageScore: null, message: 'No numeric answers found' });
      return;
    }

    const total = numericAnswers.reduce((sum, ans) => sum + ans.answerNumeric, 0);
    const avg = total / numericAnswers.length;

    res.json({ averageScore: Math.round(avg * 100) / 100 });
  } catch (err) {
    res.status(500).json({ message: 'Failed to calculate average score', error: err });
  }
};

export const getClosedQuestionsAverages = async (req: Request, res: Response) => {
  try {
    const { studentId, questionnaireId } = req.params;

    const answersDocs = await QuestionnaireAnswerModel.find({
      studentId: new mongoose.Types.ObjectId(studentId),
      questionnaireId: new mongoose.Types.ObjectId(questionnaireId)
    }).populate('answerIds');

    if (!answersDocs || answersDocs.length === 0) {
       res.status(404).json({ message: 'No answers found for student & questionnaire' });
      return;
    }

    const questionMap: {
      [questionId: string]: {
        scores: number[];
        dates: Date[];
      };
    } = {};

    for (const doc of answersDocs) {
      for (const ans of doc.answerIds as any[]) {
        if (typeof ans.answerNumeric === 'number') {
          const qId = ans.questionId.toString();
          if (!questionMap[qId]) {
            questionMap[qId] = { scores: [], dates: [] };
          }
          questionMap[qId].scores.push(ans.answerNumeric);
          questionMap[qId].dates.push(ans.createdAt);
        }
      }
    }

    const questionIds = Object.keys(questionMap);
    const questions = await QuestionModel.find({ _id: { $in: questionIds } });

    const results = questions.map((q) => {
      const data = questionMap[q._id.toString()];
      const average = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
      return {
        question: q.text,
        average: Math.round(average * 100) / 100,
        count: data.scores.length,
        dates: data.dates.map((d) => d.toISOString())
      };
    });

    res.json({ questionnaireId, studentId, results });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving question averages', error: err });
  }
};
*/