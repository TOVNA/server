import { Request, Response } from 'express';
import GradeModel from '../models/grade_model';
import ClassSubjectModel from '../models/classSubject_model';
import QuestionnaireAnswerModel from '../models/questionnaireAnswer_model';
import QuestionModel from '../models/question_model';


export const getGradesSummaryByStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { from, to } = req.query;

    const dateFilter: any = {};

    if (from) dateFilter.$gte = new Date(from as string);
    if (to) dateFilter.$lte = new Date(to as string);

    
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

    const subjectMap: Record<string, { total: number; count: number }> = {};

    grades.forEach((grade) => {
      const subject = (grade.classSubjectId as any)?.subject || 'לא ידוע';
      if (!subjectMap[subject]) subjectMap[subject] = { total: 0, count: 0 };

      subjectMap[subject].total += grade.score;
      subjectMap[subject].count += 1;
    });

    const result = Object.entries(subjectMap).map(([subject, data]) => ({
      subject,
      average: Math.round((data.total / data.count) * 100) / 100,
      count: data.count
    }));

    res.json(result);
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

    // Default: from 1 January of current year
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
      subject: (grade.classSubjectId as any)?.subject || 'לא ידוע',
      score: grade.score,
      date: grade.date
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch grades over time', error: err });
  }
};

export const getQuestionnaireSummaryForStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const { from, to } = req.query;

    const filter: any = { studentId };

    if (from) filter.createdAt = { ...(filter.createdAt || {}), $gte: new Date(from as string) };
    if (to) filter.createdAt = { ...(filter.createdAt || {}), $lte: new Date(to as string) };

   
    const answersDocs = await QuestionnaireAnswerModel.find(filter).populate('answerIds');

    const numericMap: { [questionId: string]: number[] } = {};
    const choiceMap: { [questionId: string]: { [option: string]: number } } = {};

    for (const qAnswer of answersDocs) {
      for (const ans of qAnswer.answerIds as any[]) {
        const qId = ans.questionId.toString();

        if (typeof ans.answerNumeric === 'number') {
          if (!numericMap[qId]) numericMap[qId] = [];
          numericMap[qId].push(ans.answerNumeric);
        }

        if (Array.isArray(ans.answerOptions)) {
          if (!choiceMap[qId]) choiceMap[qId] = {};
          ans.answerOptions.forEach((opt: string) => {
         choiceMap[qId][opt] = (choiceMap[qId][opt] || 0) + 1;
     });

        }
      }
    }

    const questionIds = [...new Set([...Object.keys(numericMap), ...Object.keys(choiceMap)])];
    const questions = await QuestionModel.find({ _id: { $in: questionIds } });

    const result = questions.map((q) => {
      const qId = q._id.toString();

      if (numericMap[qId]) {
        const values = numericMap[qId];
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        return {
          question: q.text,
          type: 'numeric',
          average: Math.round(avg * 100) / 100,
          count: values.length
        };
      }

      if (choiceMap[qId]) {
        return {
          question: q.text,
          type: 'multiple-choice',
          distribution: choiceMap[qId]
        };
      }

      return null;
    }).filter(Boolean);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error processing questionnaire summary', error: err });
  }
};
