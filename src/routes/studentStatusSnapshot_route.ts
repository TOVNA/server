import { Router } from "express";
import * as controller from "../controllers/studentStatusSnapshot_controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: StudentStatusSnapshot
 *   description: AI-generated summaries and grades
 */

/**
 * @swagger
 * /status-snapshot/{studentId}:
 *   get:
 *     summary: Get latest status snapshot for a student
 *     tags: [StudentStatusSnapshot]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Latest snapshot found
 *       404:
 *         description: Snapshot not found
 */
router.get("/:studentId", controller.getSnapshotsByStudent);

/**
 * @swagger
 * /status-snapshot/generate:
 *   post:
 *     summary: Generate and save a student status snapshot (summary and grades)
 *     tags: [StudentStatusSnapshot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: The student's ID
 *     responses:
 *       200:
 *         description: Snapshot generated and saved
 */
router.post("/generate", controller.generateSnapshot);

export default router;
