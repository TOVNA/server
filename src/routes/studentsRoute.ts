import express from "express";
import studentsController from "../controllers/studentsController";
import { authMiddleware } from "../controllers/auth_controller";
import { isAdmin } from "../middleware/isAdmin";

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
router.get("/:id", studentsController.getStudentById);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of all stuents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Server error
 */
router.get("/", studentsController.getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  studentsController.deleteStudent
);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_number
 *               - first_name
 *               - last_name
 *               - birth_date
 *             properties:
 *               id_number:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Student created successfully
 *       500:
 *         description: server error
 */
router.post("/", authMiddleware, isAdmin, studentsController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update an existing student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_number:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, isAdmin, studentsController.updateStudent);

export default router;
