import express from 'express';
import {
  getGradesSummaryByStudent,
  getGradesOverTimeForStudent,
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
router.get('/student/:studentId/grades-summary', getGradesSummaryByStudent);
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
router.get('/student/:studentId/grades-over-time', getGradesOverTimeForStudent);



export default router;
