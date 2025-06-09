import { Router } from "express";
import { authMiddleware } from "../controllers/auth_controller"
import * as strategiesController  from "../controllers/strategies_controller";

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Strategy:
 *       type: object
 *       required:
 *         - text
 *         - goalId
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique ID of the strategy
 *         text:
 *           type: string
 *           description: The content of the strategy
 *         goalId:
 *           type: string
 *           description: ID of the related goal
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Strategy creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         _id: "60c72b2f5f1b2c001c8e4b1d"
 *         text: "Use visual schedules to help the student organize tasks"
 *         goalId: "60c72b2f5f1b2c001c8e4b10"
 *         createdAt: "2025-06-01T10:00:00.000Z"
 *         updatedAt: "2025-06-01T10:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   name: Strategies
 *   description: API endpoints to manage strategies
 */

/**
 * @swagger
 * /strategies:
 *   post:
 *     summary: Create a new strategy
 *     tags: [Strategies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Strategy'
 *     responses:
 *       201:
 *         description: Strategy created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Strategy'
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleware, strategiesController.createStrategy);


/**
 * @swagger
 * /strategies/goal/{goalId}:
 *   get:
 *     summary: Get strategies by goal ID
 *     tags: [Strategies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         schema:
 *           type: string
 *         required: true
 *         description: Goal ID to get strategies for
 *     responses:
 *       200:
 *         description: List of strategies for the goal
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Strategy'
 *       500:
 *         description: Server error
 */
router.get("/goal/:goalId", authMiddleware, strategiesController.getStrategiesByGoal);

/**
 * @swagger
 * /strategies/{id}:
 *   put:
 *     summary: Update a strategy by ID
 *     tags: [Strategies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Strategy ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Strategy'
 *     responses:
 *       200:
 *         description: Updated strategy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Strategy'
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, strategiesController.updateStrategy);

/**
 * @swagger
 * /strategies/{id}:
 *   delete:
 *     summary: Delete a strategy by ID
 *     tags: [Strategies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Strategy ID
 *     responses:
 *       204:
 *         description: Strategy deleted successfully
 *       500:
 *         description: Server error
 */
router.delete("/:id", authMiddleware, strategiesController.deleteStrategy);

/**
 * @swagger
 * /strategies/generate:
 *   post:
 *     summary: Generate strategies for a student based on goals
 *     tags: [Strategies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - goalId
 *             properties:
 *               goalId:
 *                 type: string
 *                 description: Goal ID to generate strategies for
 *     responses:
 *       201:
 *         description: Generated strategies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Strategy'
 *       400:
 *         description: Missing studentId in request body
 *       500:
 *         description: Server error
 */
router.post("/generate", authMiddleware, strategiesController.generateStrategies);

export default router;
