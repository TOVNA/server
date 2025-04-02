import express from 'express';
import classesController from '../controllers/classesController';

const router = express.Router();


router.get('/', classesController.getAllClasses);
router.get('/:id', classesController.getClassById);
router.post('/', classesController.createClass);
router.put('/:id', classesController.updateClass);
router.delete('/:id', classesController.deleteClass);
router.get('/:id/students', classesController.getStudentsByClassId);
router.get('/:id/teachers', classesController.getTeachersByClassId);

export default router;
