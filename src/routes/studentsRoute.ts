import express from 'express';
import studentsController from '../controllers/studentsController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: The students API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a student
 *         first_name:
 *           type: string
 *           description: The first name of the student
 *         last_name:
 *           type: string
 *           description: The last name of the student
 *         birtdh_date:
 *           type: Date
 *           description: the birth date of the student
 *       required:
 *         - id
 *         - first_name
 *         - last_name
 *         - birth_date
 */
/**
 * @swagger
 * /students/:id:
 *   get:
 *     summary: Get a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student
 *     responses:
 *       200:
 *         description: A single student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 */
router.get('/:id', studentsController.getStudentById);

export default router;