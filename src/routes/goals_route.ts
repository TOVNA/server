import { Router } from "express";
import { authMiddleware } from "../controllers/auth_controller"
import controller from "../controllers/goals_controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: Manage student goals and strategies
 */

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
 *       404:
 *         description: Student not found
 */
router.get("/:studentId", authMiddleware, controller.getGoalsByStudent);

/**
 * @swagger
 * /goals/{goalId}:
 *   put:
 *     summary: Update a goal or its strategies
 *     tags: [Goals]
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     priority:
 *                       type: string
 *                     isAchieved:
 *                       type: boolean
 *               strategies:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *     responses:
 *       200:
 *         description: Updated goal document
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
 *       200:
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
 *     responses:
 *       200:
 *         description: Generated and saved goals
 */
router.post("/generate", authMiddleware, controller.generateGoals);

export default router;
