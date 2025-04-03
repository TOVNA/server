import express from 'express';
import schoolClassController from '../controllers/schoolClass_controller';

const router = express.Router();


router.get('/:id', schoolClassController.getClassById);
router.get('/', schoolClassController.getAllClasses);


export default router;

