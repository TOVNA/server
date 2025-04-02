import express from 'express';
import classesController from '../controllers/classesController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API for managing school classes
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: List of all classes
 */
router.get('/', classesController.getAllClasses);

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class found
 *       404:
 *         description: Class not found
 */
router.get('/:id', classesController.getClassById);

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', classesController.createClass);

/**
 * @swagger
 * /classes/{id}:
 *   put:
 *     summary: Update a class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Class updated successfully
 *       404:
 *         description: Class not found
 */
router.put('/:id', classesController.updateClass);

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 */
router.delete('/:id', classesController.deleteClass);

export default router;
