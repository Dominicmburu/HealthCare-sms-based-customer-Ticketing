import { body } from 'express-validator';

export const createTicketValidation = [
  body('subject').notEmpty().withMessage('Subject is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('customerEmail').isEmail().withMessage('Enter a valid email'),
];
