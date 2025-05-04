import express from 'express';
import teacherController from '../controllers/teachers_controller';
import { authMiddleware } from '../controllers/auth_controller';
import { isAdmin } from '../middleware/isAdmin';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: The teachers API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a teacher
 *         uerId:
 *           type: string
 *           description: the corresponding ID of the user used for the teacher
 *         types:
 *           type: array
 *           description: The type of teacher - homeroom  , profession or both - used for validation when assigning teachers
 *       required:
 *         - id
 *         - uerId
 *         - types
 */
/**
 * @swagger
 * /teachers/:id:
 *   get:
 *     summary: Get a teacher by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the teacher
 *     responses:
 *       200:
 *         description: A single teacher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: Teacher not found
 */
router.get('/:id', teacherController.getTeacherById);

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: A list of teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */
router.get('/', teacherController.getAllTeachers);

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Create a new teacher and a user
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *               - types
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               types:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [profession, homeroom]
 *     responses:
 *       201:
 *         description: Teacher and user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, isAdmin, teacherController.createTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     summary: Update an existing teacher
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               types:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [profession, homeroom]
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Teacher not found
 */
router.put('/:id', authMiddleware, isAdmin, teacherController.updateTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Delete a teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the teacher
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 */
router.delete('/:id', authMiddleware, isAdmin, teacherController.deleteTeacher);

export default router;