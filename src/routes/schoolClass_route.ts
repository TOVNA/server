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

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create a new school class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolClass'
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolClass'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', schoolClassController.createClass);

/**
 * @swagger
 * /api/classes/{id}:
 *   put:
 *     summary: Update a school class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the class to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolClass'
 *     responses:
 *       200:
 *         description: Class updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolClass'
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */
router.put('/:id', schoolClassController.updateClass);

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Delete a school class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the class to delete
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', schoolClassController.deleteClass);

/**
 * @swagger
 * /api/classes/homeroomTeacher/{id}:
 *   get:
 *     summary: Get class by homeroom teacher ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the homeroom teacher
 *     responses:
 *       200:
 *         description: Class found for the homeroom teacher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolClass'
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */
router.get('/homeroomTeacher/:id', schoolClassController.getClassByHomeroomTeacherId);

/**
 * @swagger
 * /api/classes/student/{id}:
 *   get:
 *     summary: Get class by student ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the student
 *     responses:
 *       200:
 *         description: Class found for the student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchoolClass'
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */
router.get('/student/:id', schoolClassController.getClassByStudentId);


export default router;
