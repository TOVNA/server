import { Request, Response } from "express";
import * as QuestionService from "../services/questions_service";

export const getQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const question = await QuestionService.getQuestionById(req.params.id);
    if (!question) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getQuestionsByQuestionnaire = async (req: Request, res: Response): Promise<void> => {
  try {
    const questions = await QuestionService.getQuestionsByQuestionnaireId(req.params.questionnaireId);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const question = await QuestionService.createQuestion(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await QuestionService.updateQuestion(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await QuestionService.deleteQuestion(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Question not found" });
      return;
    }
    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
