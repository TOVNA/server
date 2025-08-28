import express from 'express';
import questionnaireController from '../controllers/questionnaire_controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questionnaires
 *   description: API for managing questionnaires
 */

/**
 * @swagger
 * /questionnaires:
 *   get:
 *     summary: Get all questionnaires
 *     tags: [Questionnaires]
 *     responses:
 *       200:
 *         description: List of questionnaires
 */
router.get('/', questionnaireController.getAllQuestionnaires);

/**
 * @swagger
 * /questionnaires/{id}:
 *   get:
 *     summary: Get a questionnaire by ID
 *     tags: [Questionnaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Questionnaire ID
 *     responses:
 *       200:
 *         description: Questionnaire found
 *       404:
 *         description: Questionnaire not found
 */
router.get('/:id', questionnaireController.getQuestionnaireById);

/**
 * @swagger
 * /questionnaires:
 *   post:
 *     summary: Create a new questionnaire
 *     tags: [Questionnaires]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - targetRole
 *               - questionIds
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               targetRole:
 *                 type: string
 *                 enum: [teacher, homeroom]
 *               questionIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Questionnaire created
 */
router.post('/', questionnaireController.createQuestionnaire);

/**
 * @swagger
 * /questionnaires/{id}:
 *   put:
 *     summary: Update a questionnaire
 *     tags: [Questionnaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Questionnaire ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Questionnaire updated
 *       404:
 *         description: Questionnaire not found
 */
router.put('/:id', questionnaireController.updateQuestionnaire);

/**
 * @swagger
 * /questionnaires/{id}:
 *   delete:
 *     summary: Delete a questionnaire
 *     tags: [Questionnaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Questionnaire ID
 *     responses:
 *       200:
 *         description: Questionnaire deleted
 *       404:
 *         description: Questionnaire not found
 */
router.delete('/:id', questionnaireController.deleteQuestionnaire);

/**
 * @swagger
 * /questionnaires/{id}/questions/{questionId}:
 *   post:
 *     summary: Add a question to a questionnaire
 *     tags: [Questionnaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Questionnaire ID
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID to add
 *     responses:
 *       200:
 *         description: Question added to questionnaire
 *       404:
 *         description: Questionnaire or question not found
 */
//router.post('/:id/questions/:questionId', questionnaireController.addQuestionToQuestionnaire);

/**
 * @swagger
 * /questionnaires/{id}/questions/{questionId}:
 *   delete:
 *     summary: Remove a question from a questionnaire
 *     tags: [Questionnaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Questionnaire ID
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Question ID to remove
 *     responses:
 *       200:
 *         description: Question removed from questionnaire
 *       404:
 *         description: Questionnaire or question not found
 */
//router.delete('/:id/questions/:questionId', questionnaireController.removeQuestionFromQuestionnaire);

/**
 * @swagger
 * /questionnaires/target/{role}:
 *   get:
 *     summary: Get questionnaires by target role
 *     tags: [Questionnaires]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [teacher, homeroom]
 *         description: Role the questionnaire targets
 *     responses:
 *       200:
 *         description: List of questionnaires for role
 *       400:
 *         description: Invalid role
 */
router.get('/target/:role', questionnaireController.getQuestionnairesByTargetRole);

router.post('/with-questions', questionnaireController.createWithQuestions);

router.put('/:id/with-questions', questionnaireController.updateWithQuestions);



export default router;
