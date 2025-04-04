import express from 'express';
import teacherController from '../controllers/teachers_controller';

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

export default router;