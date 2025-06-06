import express from "express";
import * as QuestionController from "../controllers/questions_controller";

const router = express.Router();

// Get one question by ID
router.get("/:id", QuestionController.getQuestion);

// Get all questions for a specific questionnaire
router.get("/questionnaire/:questionnaireId", QuestionController.getQuestionsByQuestionnaire);

// Create a new question
router.post("/", QuestionController.createQuestion);

// Update a question
router.put("/:id", QuestionController.updateQuestion);

// Delete a question
router.delete("/:id", QuestionController.deleteQuestion);

export default router;
