import express from 'express';
import classSubjectController from '../controllers/classSubject_controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ClassSubjects
 *   description: API for managing class subjects (teacher - class - subject connections)
 */

/**
 * @swagger
 * /api/class-subjects:
 *   get:
 *     summary: Get all class subjects
 *     tags: [ClassSubjects]
 *     responses:
 *       200:
 *         description: List of all class subjects
 */
router.get('/', classSubjectController.getAllClassSubjects);

/**
 * @swagger
 * /api/class-subjects/{classSubject_id}:
 *   get:
 *     summary: Get a class subject by ID
 *     tags: [ClassSubjects]
 *     parameters:
 *       - in: path
 *         name: classSubject_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class subject
 *     responses:
 *       200:
 *         description: Class subject found
 *       404:
 *         description: Class subject not found
 */
router.get('/:classSubject_id', classSubjectController.getClassSubjectById);

/**
 * @swagger
 * /api/class-subjects:
 *   post:
 *     summary: Create a new class subject
 *     tags: [ClassSubjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherId:
 *                 type: string
 *               classId:
 *                 type: string
 *               subject:
 *                 type: string
 *     responses:
 *       201:
 *         description: Class subject created
 */
router.post('/', classSubjectController.createClassSubject);

/**
 * @swagger
 * /api/class-subjects/{classSubject_id}:
 *   put:
 *     summary: Update a class subject
 *     tags: [ClassSubjects]
 *     parameters:
 *       - in: path
 *         name: classSubject_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class subject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherId:
 *                 type: string
 *               classId:
 *                 type: string
 *               subject:
 *                 type: string
 *     responses:
 *       200:
 *         description: Class subject updated
 *       404:
 *         description: Class subject not found
 */
router.put('/:classSubject_id', classSubjectController.updateClassSubject);

/**
 * @swagger
 * /api/class-subjects/{classSubject_id}:
 *   delete:
 *     summary: Delete a class subject
 *     tags: [ClassSubjects]
 *     parameters:
 *       - in: path
 *         name: classSubject_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class subject
 *     responses:
 *       200:
 *         description: Class subject deleted
 *       404:
 *         description: Class subject not found
 */
router.delete('/:classSubject_id', classSubjectController.deleteClassSubject);

/**
 * @swagger
 * /api/class-subjects/teacher/{teacherId}:
 *   get:
 *     summary: Get all class subjects by teacher ID
 *     tags: [ClassSubjects]
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the teacher
 *     responses:
 *       200:
 *         description: List of class subjects for the teacher
 */
router.get('/teacher/:teacherId', classSubjectController.getClassSubjectByTeacherId);

/**
 * @swagger
 * /api/class-subjects/class/{classId}:
 *   get:
 *     summary: Get all class subjects by class ID
 *     tags: [ClassSubjects]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the class
 *     responses:
 *       200:
 *         description: List of class subjects for the class
 */
router.get('/class/:classId', classSubjectController.getClassSubjectByClassId);

export default router;
