import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { updateUserValidation } from '../validations/authValidation';

const router = Router();

router.get('/', authenticate, getUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, authorize(['admin']), updateUserValidation, validate, updateUser );
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

export default router;
