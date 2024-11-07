import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('phoneNumber')
    .matches(/^\+254\d{8,9}$/)
    .withMessage('Phone number must start with +254 and contain 11 to 12 digits in total'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').exists().withMessage('Password is required'),
];

export const updateUserValidation = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Enter a valid email'),

  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('role')
    .optional()
    .isIn(['patient', 'medical_support', 'admin'])
    .withMessage('Invalid role specified'),

  body('phoneNumber')
    .optional()
    .matches(/^\+254\d{8,9}$/)
    .withMessage('Phone number must start with +254 and contain 11 to 12 digits in total'),
];