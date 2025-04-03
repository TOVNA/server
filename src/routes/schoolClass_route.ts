import express from 'express';
import schoolClassController from '../controllers/schoolClass_controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API for managing school classes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SchoolClass:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ID of the class
 *         grade:
 *           type: string
 *           description: Grade name (e.g., ד)
 *         classNumber:
 *           type: integer
 *           description: Class number within the grade (e.g., 1)
 *         description:
 *           type: string
 *           description: Optional description of the class
 *         homeroomTeacherId:
 *           type: object
 *           description: Reference to the homeroom teacher
 *         studentIds:
 *           type: array
 *           items:
 *             type: object
 *           description: Array of students in the class
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all school classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: A list of all school classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SchoolClass'
 *       500:
 *         description: Server error
 */
router.get('/', schoolClassController.getAllClasses);

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class
 *     responses:
 *       200:
 *         description: A class object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolClass'
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */
router.get('/:id', schoolClassController.getClassById);

export default router;
