import { Request,Response } from "express";
import * as questionnaireService from "../services/questionnaire_service";

 const getAllQuestionnaires = async (req: Request, res: Response) => {
    try {
        const questionnaires = await questionnaireService.getAllQuestionnaires();
        res.status(200).json(questionnaires);
    } catch (error) {
        console.error('Error fetching all questionnaires:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
 const getQuestionnaireById = async (req: Request, res: Response) => {
    const questionnaireId = req.params.id;
    try {
        const questionnaire = await questionnaireService.getQuestionnaireById(questionnaireId);
        if (!questionnaire) {
            res.status(404).json({ message: 'Questionnaire not found' });
            return;
        }
        res.status(200).json(questionnaire);
    } catch (error) {
        console.error('Error fetching questionnaire by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
 const createQuestionnaire = async (req: Request, res: Response) => {
    try {
        const { title, description, targetRole, questionIds = [] } = req.body;
    if (!title || !targetRole) {
     res.status(400).json({ message: 'Missing required fields' });
     return;
        }
        const newQuestionnaire = await questionnaireService.createQuestionnaire(req.body);
        if (!newQuestionnaire) {
            res.status(400).json({ message: 'Failed to create questionnaire' });
            return;
        }
        res.status(201).json(newQuestionnaire);
    } catch (error) {
        console.error('Error creating questionnaire:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
 const updateQuestionnaire = async (req: Request, res: Response) => {
    const questionnaireId = req.params.id;
    try {
        const updatedQuestionnaire = await questionnaireService.updateQuestionnaire(questionnaireId, req.body);
        if (!updatedQuestionnaire) {
            res.status(404).json({ message: 'Questionnaire not found' });
            return;
        }
        res.status(200).json(updatedQuestionnaire);
    } catch (error) {
        console.error('Error updating questionnaire:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
 const deleteQuestionnaire = async (req: Request, res: Response) => {
    const questionnaireId = req.params.id;
    try {
        const deletedQuestionnaire = await questionnaireService.deleteQuestionnaire(questionnaireId);
        if (!deletedQuestionnaire) {
            res.status(404).json({ message: 'Questionnaire not found' });
            return;
        }
        res.status(200).json(deletedQuestionnaire);
    } catch (error) {
        console.error('Error deleting questionnaire:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
/*
 const addQuestionToQuestionnaire = async (req: Request, res: Response) => {
    const { questionnaireId, questionId } = req.body;
    try {
        const updatedQuestionnaire = await questionnaireService.addQuestionToQuestionnaire(questionnaireId, questionId);
        if (!updatedQuestionnaire) {
            res.status(404).json({ message: 'Questionnaire not found' });
            return;
        }
        res.status(200).json(updatedQuestionnaire);
    } catch (error) {
        console.error('Error adding question to questionnaire:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
    */
  /* 
 const removeQuestionFromQuestionnaire = async (req: Request, res: Response) => {
    const { questionnaireId, questionId } = req.body;
    try {
        const updatedQuestionnaire = await questionnaireService.removeQuestionFromQuestionnaire(questionnaireId, questionId);
        if (!updatedQuestionnaire) {
            res.status(404).json({ message: 'Questionnaire not found' });
            return;
        }
        res.status(200).json(updatedQuestionnaire);
    } catch (error) {
        console.error('Error removing question from questionnaire:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
    */
 const getQuestionnairesByTargetRole = async (req: Request, res: Response) => {
    const targetRole = req.params.role;
  
    if (targetRole !== 'teacher' && targetRole !== 'homeroom') {
        res.status(400).json({ message: 'Invalid target role' });
        return;
    }
  
    try {
      const questionnaires = await questionnaireService.getQuestionnairesByTargetRole(targetRole);
      if (!questionnaires || questionnaires.length === 0) {
        res.status(404).json({ message: 'No questionnaires found for this target role' });
      }
      res.status(200).json(questionnaires);
    } catch (error) {
      console.error('Error fetching questionnaires by target role:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }; 
  export const createWithQuestions = async (req: Request, res: Response) => {
  try {
    const questionnaire = await questionnaireService.createQuestionnaireWithQuestions(req.body);
    res.status(201).json(questionnaire);
  } catch (err) {
    console.error('Error creating questionnaire with questions:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 
export const updateWithQuestions = async (req: Request, res: Response) => {
  try {
    const questionnaire = await questionnaireService.updateQuestionnaireWithQuestions(
      req.params.id,
      req.body
    );

    if (!questionnaire) {
      res.status(404).json({ message: 'Questionnaire not found' });
      return;
    }

    res.status(200).json(questionnaire);
  } catch (err) {
    console.error('Error updating questionnaire with questions:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  
  export default {  
    getAllQuestionnaires,
    getQuestionnaireById,
    createQuestionnaire,
    updateQuestionnaire,
    deleteQuestionnaire,
   // addQuestionToQuestionnaire,
   //removeQuestionFromQuestionnaire,
    getQuestionnairesByTargetRole,
    createWithQuestions,
    updateWithQuestions
    };
