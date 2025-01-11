// import { Router, Request, Response, NextFunction } from 'express';
// import { createTicket } from '../controllers/ticketController';
// import { body } from 'express-validator';
// import { validate } from '../middlewares/validationMiddleware';

// const router = Router();

// // Twilio sends data in a specific format
// router.post(
//   '/sms',
//   [
//     body('From').isString().withMessage('Sender phone number is required'),
//     body('Body').isString().withMessage('Message body is required'),
//   ],
//   validate,
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { From, Body } = req.body;
//     const [subject, ...descriptionParts] = Body.split('\n');
//     const description = descriptionParts.join('\n');

//     // Assuming sender's email can be derived or stored based on phone number
//     const customerEmail = `${From}@sms.healthline.com`; // Placeholder

//     await createTicket(
//       {
//         body: { subject, description, customerEmail },
//         // Mock request and response for internal controller
//       } as Request,
//       res,
//       next
//     );

//     // Respond to Twilio
//     res.set('Content-Type', 'text/xml');
//     res.send('<Response></Response>');
//   }
// );

// export default router;
