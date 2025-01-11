import { Router } from 'express';
import { getUsers, getUserById, deleteUser } from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticate, getUsers);
router.get('/:id', authenticate, getUserById);
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

export default router;
