import { body } from 'express-validator';
import validator from 'validator';

export const createTicketValidation = [
  body('subject').notEmpty().withMessage('Subject is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

export const updateTicketValidation = [
  body('status')
    .optional()
    .isIn(['open', 'in_progress', 'resolved', 'closed'])
    .withMessage('Invalid status value'),

  body('assignedToId')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('assignedToId must be a positive integer'),
];