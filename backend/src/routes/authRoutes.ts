import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { registerValidation, loginValidation } from '../validations/authValidation';
import { validate } from '../middlewares/validationMiddleware';

const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/logout', logout);

export default router;
