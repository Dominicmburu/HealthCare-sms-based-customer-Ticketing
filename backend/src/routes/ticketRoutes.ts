import { Router } from 'express';
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  incomingSmsHandler,
} from '../controllers/ticketController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { createTicketValidation } from '../validations/ticketValidation';
import { updateTicketValidation } from '../validations/ticketValidation';


const router = Router();

router.post('/', authenticate, createTicketValidation, validate, createTicket);
router.post('/incoming-sms', incomingSmsHandler);

router.use(authenticate);
router.get('/', authorize(['patient', 'medical_support', 'admin']), getTickets);
router.get('/:id', authorize(['patient', 'medical_support', 'admin']), getTicketById);
router.put('/:id', authorize(['patient', 'medical_support', 'admin']), validate, updateTicketValidation, updateTicket);
router.delete('/:id', authorize(['admin']), deleteTicket);

export default router;
