import { Router } from 'express';
import reportController from '../controllers/report.controller';

const router = Router();

router.get('/', reportController.getAllReports);
router.post('/', reportController.createReport);

export default router;