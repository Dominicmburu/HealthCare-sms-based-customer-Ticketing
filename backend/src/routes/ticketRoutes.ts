import { Router, Request, Response, NextFunction } from 'express';
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from '../controllers/ticketController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { createTicketValidation } from '../validations/ticketValidation';
import { validate } from '../middlewares/validationMiddleware';

const router = Router();

router.post('/', createTicketValidation, validate, createTicket);

router.get('/', authenticate, authorize(['admin', 'staff', 'medical_support']), getTickets);
router.get('/:id', authenticate, authorize(['admin', 'staff', 'medical_support']), getTicketById);
router.put('/:id', authenticate, authorize(['admin', 'staff', 'medical_support']), updateTicket);
router.delete('/:id', authenticate, authorize(['admin']), deleteTicket);

export default router;
