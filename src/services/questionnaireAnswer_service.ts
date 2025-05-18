import QuestionnaireAnswerModel from '../models/questionnaireAnswer_model';
import { QuestionnaireAnswer } from '../models/questionnaireAnswer_model';
import { Types } from 'mongoose';

export const createQuestionnaireAnswer = async (data: Partial<QuestionnaireAnswer>) => {
  return await QuestionnaireAnswerModel.create(data);
};

export const getAllQuestionnaireAnswers = async () => {
  return await QuestionnaireAnswerModel.find()
    .populate('questionnaireId')
    .populate('teacherId')
    .populate('studentId')
    .populate('answerIds');
};

export const getQuestionnaireAnswerById = async (id: string) => {
  return await QuestionnaireAnswerModel.findById(id)
    .populate('questionnaireId')
    .populate('teacherId')
    .populate('studentId')
    .populate('answerIds');
};

export const getQuestionnaireAnswersByStudentId = async (studentId: string) => {
  return await QuestionnaireAnswerModel.find({ studentId })
    .populate('questionnaireId')
    .populate('teacherId')
    .populate('studentId')
    .populate('answerIds');
};

export const updateQuestionnaireAnswer = async (id: string, data: Partial<QuestionnaireAnswer>) => {
  return await QuestionnaireAnswerModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteQuestionnaireAnswer = async (id: string) => {
  return await QuestionnaireAnswerModel.findByIdAndDelete(id);
};
