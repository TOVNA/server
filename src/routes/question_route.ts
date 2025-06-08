import express from "express";
import * as QuestionController from "../controllers/questions_controller";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Scale:
 *       type: object
 *       properties:
 *         min:
 *           type: integer
 *           example: 1
 *         max:
 *           type: integer
 *           example: 5
 *     Question:
 *       type: object
 *       required:
 *         - questionnaireId
 *         - text
 *         - type
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the question
 *         questionnaireId:
 *           type: string
 *           description: The questionnaire this question belongs to (ObjectId)
 *           example: "64a4e2f8a2f3c02b9e4a7b5d"
 *         text:
 *           type: string
 *           description: The question text
 *           example: "How often do you read books?"
 *         type:
 *           type: string
 *           description: The question type
 *           enum: [text, numeric, multiple-choice, scale]
 *           example: "multiple-choice"
 *         scale:
 *           $ref: '#/components/schemas/Scale'
 *         options:
 *           type: array
 *           description: List of options for multiple-choice type
 *           items:
 *             type: string
 *           example: ["Never", "Sometimes", "Often", "Always"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 */

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Question ID
 *     responses:
 *       200:
 *         description: The question data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 */
router.get("/:id", QuestionController.getQuestion);

/**
 * @swagger
 * /questions/questionnaire/{questionnaireId}:
 *   get:
 *     summary: Get all questions for a specific questionnaire
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionnaireId
 *         schema:
 *           type: string
 *         required: true
 *         description: Questionnaire ID
 *     responses:
 *       200:
 *         description: List of questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */
router.get("/questionnaire/:questionnaireId", QuestionController.getQuestionsByQuestionnaire);

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionnaireId:
 *                 type: string
 *                 example: "64a4e2f8a2f3c02b9e4a7b5d"
 *               text:
 *                 type: string
 *                 example: "How often do you read books?"
 *               type:
 *                 type: string
 *                 enum: [text, numeric, multiple-choice, scale]
 *                 example: "multiple-choice"
 *               scale:
 *                 $ref: '#/components/schemas/Scale'
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Never", "Sometimes", "Often", "Always"]
 *     responses:
 *       201:
 *         description: The created question
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 */
router.post("/", QuestionController.createQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Update a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Updated question text?"
 *               type:
 *                 type: string
 *                 enum: [text, numeric, multiple-choice, scale]
 *                 example: "text"
 *               scale:
 *                 $ref: '#/components/schemas/Scale'
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Option 1", "Option 2"]
 *     responses:
 *       200:
 *         description: The updated question
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 */
router.put("/:id", QuestionController.updateQuestion);

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Confirmation of deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Question deleted
 *       404:
 *         description: Question not found
 */
router.delete("/:id", QuestionController.deleteQuestion);

export default router;
