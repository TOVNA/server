import express from 'express';
import {
  getGradesSummaryByStudent,
  getGradesOverTimeForStudent,
  getQuestionnaireSummaryForStudent
} from '../controllers/dashboard_controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard endpoints for student insights
 */

/**
 * @swagger
 * /dashboard/student/{studentId}/grades-summary:
 *   get:
 *     summary: Get average grades per subject for a student
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the student
 *     responses:
 *       200:
 *         description: List of subjects with average grades
 */

/**
 * @swagger
 * /dashboard/student/{studentId}/grades-over-time:
 *   get:
 *     summary: Get all grades over time for a student
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the student
 *     responses:
 *       200:
 *         description: List of grades by date
 */

/**
 * @swagger
 * /dashboard/student/{studentId}/questionnaire-summary:
 *   get:
 *     summary: Get questionnaire summary (numeric and multiple-choice) for a student
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the student
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Optional start date filter (e.g. 2024-01-01)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Optional end date filter (e.g. 2024-12-31)
 *     responses:
 *       200:
 *         description: Summary of closed question answers
 */

router.get('/student/:studentId/grades-summary', getGradesSummaryByStudent);
router.get('/student/:studentId/grades-over-time', getGradesOverTimeForStudent);
router.get('/student/:studentId/questionnaire-summary', getQuestionnaireSummaryForStudent);

export default router;
