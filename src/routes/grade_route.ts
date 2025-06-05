import express from 'express';
import * as gradeController from '../controllers/grade_controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: API for managing student grades by subject and teacher
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Grade:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the grade
 *         studentId:
 *           type: string
 *           description: ID of the student
 *         teacherId:
 *           type: string
 *           description: ID of the teacher who gave the grade
 *         classSubjectId:
 *           type: string
 *           description: ID of the class-subject (e.g., Math for Class 7A)
 *         score:
 *           type: number
 *           description: Numeric score (e.g., 92)
 *         date:
 *           type: string
 *           format: date
 *           description: Date when the grade was given
 *         type:
 *           type: string
 *           description: Type of assessment (e.g., "Quiz", "Midterm", "Final")
 *         description:
 *           type: string
 *           description: Additional notes about the grade
 *       required:
 *         - studentId
 *         - teacherId
 *         - classSubjectId
 *         - score
 *         - date
 */

/**
 * @swagger
 * /grades:
 *   post:
 *     summary: Create a new grade for a student
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       201:
 *         description: Grade successfully created
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /grades/student/{studentId}:
 *   get:
 *     summary: Get all grades for a specific student
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student
 *     responses:
 *       200:
 *         description: List of grades for the student
 */

/**
 * @swagger
 * /grades/classSubject/{classSubjectId}:
 *   get:
 *     summary: Get all grades for a specific class subject
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: classSubjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class subject
 *     responses:
 *       200:
 *         description: List of grades for the subject
 */

/**
 * @swagger
 * /grades/{id}:
 *   delete:
 *     summary: Delete a grade by its ID
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The grade's unique ID
 *     responses:
 *       204:
 *         description: Grade successfully deleted
 *       404:
 *         description: Grade not found
 */

/**
 * @swagger
 * /grades/{id}:
 *   put:
 *     summary: Update an existing grade
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The grade's unique ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       200:
 *         description: Grade successfully updated
 *       404:
 *         description: Grade not found
 */

router.post('/', gradeController.createGrade);
router.get('/student/:studentId', gradeController.getGradesByStudentId);
router.get('/classSubject/:classSubjectId', gradeController.getGradesByClassSubjectId);
router.delete('/:id', gradeController.deleteGrade);
router.put('/:id', gradeController.updateGrade);

export default router;
