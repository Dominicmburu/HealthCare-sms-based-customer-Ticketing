import { Router } from 'express';
import { getTicketStats } from '../controllers/dashboardController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);
router.use(authorize(['admin', 'staff', 'medical_support']));

router.get('/tickets', getTicketStats);

export default router;
