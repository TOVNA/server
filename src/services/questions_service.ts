import QuestionModel from "../models/question_model";
import { IQuestion } from "../models/question_model";
import { Types } from "mongoose";

export const getQuestionById = async (id: string) => {
  return await QuestionModel.findById(id);
};

export const getQuestionsByQuestionnaireId = async (questionnaireId: string) => {
  return await QuestionModel.find({ questionnaireId });
};

export const createQuestion = async (data: IQuestion) => {
  return await QuestionModel.create(data);
};

export const updateQuestion = async (id: string, data: Partial<IQuestion>) => {
  return await QuestionModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteQuestion = async (id: string) => {
  return await QuestionModel.findByIdAndDelete(id);
};
