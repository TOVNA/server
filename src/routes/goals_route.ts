import { Router } from "express";
import { authMiddleware } from "../controllers/auth_controller"
import controller from "../controllers/goals_controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Strategy:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Strategy ID
 *         goalId:
 *           type: string
 *           description: The ID of the related goal
 *         text:
 *           type: string
 *           description: Strategy text
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Goal:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         studentId:
 *           type: string
 *         text:
 *           type: string
 *         createdBy:
 *           type: string
 *         strategies:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Strategy'
 *         generatedByAI:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: Manage student goals
 */

/**
 * @swagger
 * /goals:
 *   post:
 *     summary: Create a new goal manually
 *     tags: [Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: ID of the student
 *               text:
 *                 type: string
 *                 description: Goal text
 *               strategies:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *     responses:
 *       201:
 *         description: Created goal document
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Goal'
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/Goal'
 */
router.post("/", authMiddleware, controller.createGoal);

/**
 * @swagger
 * /goals/{studentId}:
 *   get:
 *     summary: Get all goals for a student
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The student's ID
 *     responses:
 *       200:
 *         description: List of goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 *       404:
 *         description: Student not found
 */
router.get("/:studentId", authMiddleware, controller.getGoalsByStudent);

/**
 * @swagger
 * /goals/{goalId}:
 *   put:
 *     summary: Update an existing goal
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the goal to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Updated goal text
 *               strategies:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                       description: Strategy text
 *     responses:
 *       200:
 *         description: The updated goal document
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       404:
 *         description: Goal not found
 */
router.put("/:goalId", authMiddleware, controller.updateGoal);

/**
 * @swagger
 * /goals/{goalId}:
 *   delete:
 *     summary: Delete a goal
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     responses:
 *       204:
 *         description: Goal deleted
 */
router.delete("/:goalId", authMiddleware, controller.deleteGoal);

/**
 * @swagger
 * /goals/generate:
 *   post:
 *     summary: Generate AI-based goals and strategies
 *     tags: [Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: ID of the student
 *               days:
 *                 type: number
 *                 description: The number of days ago to collect data from 
 *     responses:
 *       201:
 *         description: Generated and saved goals
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Goal'
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/Goal'
 */
router.post("/generate", authMiddleware, controller.generateGoals);

export default router;
