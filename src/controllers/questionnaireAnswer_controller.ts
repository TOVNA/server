import { Request, Response } from 'express';
import * as questionnaireAnswerService from '../services/questionnaireAnswer_service';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const answer = await questionnaireAnswerService.createQuestionnaireAnswer(req.body);
    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Error creating answer', error: err });
  }
};

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const answers = await questionnaireAnswerService.getAllQuestionnaireAnswers();
    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving answers', error: err });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await questionnaireAnswerService.getQuestionnaireAnswerById(req.params.id);
    if (!item){
      res.status(404).json({ message: 'Questionnaire Answer not found' });
      return;
    } 
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving answer', error: err });
  }
};

export const getByStudentId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = req.params;
      const items = await questionnaireAnswerService.getQuestionnaireAnswersByStudentId(studentId);
      if (!items){
        res.status(404).json({message: 'Questionanaire answers for studentId not fround'});
        return;
      }
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving questionnaire answers for student', error: err });
    }
  };
  

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await questionnaireAnswerService.updateQuestionnaireAnswer(req.params.id, req.body);
    if (!updated)
      { 
        res.status(404).json({ message: 'Questionanaire Answer not found' });
        return;
      }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating answer', error: err });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await questionnaireAnswerService.deleteQuestionnaireAnswer(req.params.id);
    if (!deleted){
      res.status(404).json({ message: 'Answer not found' });
      return;
    } 
    res.json({ message: 'Answer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting answer', error: err });
  }
};
