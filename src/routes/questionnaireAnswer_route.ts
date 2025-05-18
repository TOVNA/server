import express from 'express';
import * as controller from '../controllers/questionnaireAnswer_controller';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     QuestionnaireAnswer:
 *       type: object
 *       required:
 *         - questionnaireId
 *         - answerIds
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the questionnaire answer
 *         questionnaireId:
 *           type: string
 *           description: The id of the questionnaire
 *         teacherId:
 *           type: string
 *           description: The id of the teacher (optional)
 *         studentId:
 *           type: string
 *           description: The id of the student (optional)
 *         answerIds:
 *           type: array
 *           items:
 *             type: string
 *           description: List of answer IDs
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update date
 *       example:
 *         _id: "608d9b6fbcf86cd799439011"
 *         questionnaireId: "608d9b6fbcf86cd799439010"
 *         teacherId: "608d9b6fbcf86cd799439012"
 *         studentId: "608d9b6fbcf86cd799439013"
 *         answerIds: ["608d9b6fbcf86cd799439014", "608d9b6fbcf86cd799439015"]
 *         createdAt: "2023-01-01T12:00:00.000Z"
 *         updatedAt: "2023-01-02T12:00:00.000Z"
 */

/**
 * @swagger
 * /questionnare-answer/by-student/{studentId}:
 *   get:
 *     summary: Get questionnaire answers by student ID
 *     tags: [QuestionnaireAnswer]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *     responses:
 *       200:
 *         description: List of questionnaire answers for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QuestionnaireAnswer'
 *       500:
 *         description: Server error
 */
router.get('/by-student/:studentId', controller.getByStudentId);

/**
 * @swagger
 * /questionnare-answer/{id}:
 *   get:
 *     summary: Get a questionnaire answer by ID
 *     tags: [QuestionnaireAnswer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The questionnaire answer ID
 *     responses:
 *       200:
 *         description: Questionnaire answer found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionnaireAnswer'
 *       404:
 *         description: Questionnaire answer not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /questionnare-answer/{id}:
 *   put:
 *     summary: Update a questionnaire answer by ID
 *     tags: [QuestionnaireAnswer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The questionnaire answer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionnaireAnswer'
 *     responses:
 *       200:
 *         description: Questionnaire answer updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionnaireAnswer'
 *       404:
 *         description: Questionnaire answer not found
 *       500:
 *         description: Server error
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /questionnare-answer/{id}:
 *   delete:
 *     summary: Delete a questionnaire answer by ID
 *     tags: [QuestionnaireAnswer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The questionnaire answer ID
 *     responses:
 *       200:
 *         description: Questionnaire answer deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Answer deleted
 *       404:
 *         description: Questionnaire answer not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.remove);

/**
 * @swagger
 * /questionnare-answer:
 *   post:
 *     summary: Create a new questionnaire answer
 *     tags: [QuestionnaireAnswer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionnaireAnswer'
 *     responses:
 *       201:
 *         description: Questionnaire answer created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuestionnaireAnswer'
 *       500:
 *         description: Server error
 */
router.post('/', controller.create);

/**
 * @swagger
 * /questionnare-answer:
 *   get:
 *     summary: Get all questionnaire answers
 *     tags: [QuestionnaireAnswer]
 *     responses:
 *       200:
 *         description: List of all questionnaire answers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QuestionnaireAnswer'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getAll);

export default router;
