import express from 'express';
import studentsController from '../controllers/studentsController';

const router = express.Router();

router.get('/:id', studentsController.getStudentById);
router.get('/class/:classId', studentsController.getStudentsByClass);

export default router;