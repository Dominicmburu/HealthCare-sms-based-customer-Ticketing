import { RequestHandler, NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../config/ormconfig';
import { Ticket } from '../models/Ticket';
import { User } from '../models/User';
import { sendSMS } from '../utils/sms';
import { sendEmail } from '../utils/email';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const ticketRepo = AppDataSource.getRepository(Ticket);
  const userRepo = AppDataSource.getRepository(User);
  const { subject, description } = req.body;

  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    if (!user.phoneNumber) {
      res.status(400).json({ message: 'User phone number is missing. Please update your profile.' });
      return;
    }

    if (!user.email) {
      res.status(400).json({ message: 'User email is missing. Please update your profile.' });
      return;
    }

    const ticket = ticketRepo.create({
      subject,
      description,
      patientPhoneNumber: user.phoneNumber,
      patientEmail: user.email,
      status: 'open',
      createdBy: user,
    });

    let emailSent = false;
    let smsSent = false;

    const message = `Your ticket (ID: ${ticket.id}) has been created. We will contact you soon.`;
    try {
      await sendSMS(ticket.patientPhoneNumber, message);
      smsSent = true;
      ticket.smsSentAt = new Date();
    } catch (smsError) {
    }

    const emailMessage = `Dear ${ticket.patientEmail},

Your ticket (ID: ${ticket.id}) has been created. We will contact you soon.

Best regards,
HealthLine Support Team`;

    if (ticket.patientEmail) {
      try {
        await sendEmail(ticket.patientEmail, 'Ticket Created', emailMessage);
        emailSent = true;
        ticket.emailSentAt = new Date();
      } catch (emailError) {
      }
    }

    ticket.emailSent = emailSent;
    ticket.smsSent = smsSent;

    await ticketRepo.save(ticket);

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket,
      notifications: {
        emailSent,
        smsSent,
        emailSentAt: ticket.emailSentAt,
        smsSentAt: ticket.smsSentAt,
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get Tickets
export const getTickets: RequestHandler = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const ticketRepo = AppDataSource.getRepository(Ticket);
  const userRole = req.user?.role;
  const userId = req.user?.id;

  try {
    const tickets = await ticketRepo.find({
      where:
        userRole === 'admin'
          ? undefined
          : userRole === 'patient'
          ? { createdBy: { id: userId } }
          : { assignedTo: { id: userId } },
      relations: ['createdBy', 'assignedTo'],
    });

    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};


export const getTicketById: RequestHandler = async (req, res, next) => {
  const ticketRepo = AppDataSource.getRepository(Ticket);
  const ticketId = parseInt(req.params.id, 10);

  try {
    const ticket = await ticketRepo.findOne({
      where: { id: ticketId },
      relations: ['createdBy', 'assignedTo'],
    });
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found.' });
      return;
    }
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

export const updateTicket: RequestHandler = async (req, res, next) => {
  const ticketRepo = AppDataSource.getRepository(Ticket);
  const userRepo = AppDataSource.getRepository(User);
  const ticketId = parseInt(req.params.id, 10);
  const { status, assignedToId } = req.body;

  try {
    const ticket = await ticketRepo.findOne({
      where: { id: ticketId },
      relations: ['assignedTo'],
    });
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found.' });
      return;
    }

    let statusChanged = false;
    let assignedToChanged = false;
    let emailSent = false;
    let smsSent = false;

    if (status && status !== ticket.status) {
      ticket.status = status;
      statusChanged = true;
    }

    if (assignedToId && assignedToId !== (ticket.assignedTo?.id || null)) {
      const user = await userRepo.findOne({ where: { id: assignedToId } });
      if (!user) {
        res.status(404).json({ message: 'Assigned user not found.' });
        return;
      }
      ticket.assignedTo = user;
      assignedToChanged = true;
    }

    await ticketRepo.save(ticket);

    if (statusChanged) {
      const message = `Your ticket (ID: ${ticket.id}) status has been updated to ${ticket.status}.`;

      if (ticket.patientPhoneNumber) {
        try {
          await sendSMS(ticket.patientPhoneNumber, message);
          smsSent = true;
          ticket.smsSentAt = new Date();
        } catch (smsError) {
          console.error(`Failed to send SMS for Ticket ID ${ticket.id}:`, smsError);
        }
      }

      if (ticket.patientEmail) {
        console.log(ticket.patientPhoneNumber);
        const emailContent = `Dear ${ticket.patientEmail},

Your ticket (ID: ${ticket.id}) status has been updated to ${ticket.status}.

Best regards,
HealthLine Support Team`;

        try {
          await sendEmail(ticket.patientEmail, 'Ticket Status Updated', emailContent);
          emailSent = true;
          ticket.emailSentAt = new Date();
        } catch (emailError) {
          console.error(`Failed to send Email for Ticket ID ${ticket.id}:`, emailError);
        }
      }
    }

    ticket.emailSent = emailSent || ticket.emailSent;
    ticket.smsSent = smsSent || ticket.smsSent;
    await ticketRepo.save(ticket);

    res.status(200).json({
      message: 'Ticket updated successfully',
      ticket,
      notifications: {
        emailSent,
        smsSent,
        emailSentAt: ticket.emailSentAt,
        smsSentAt: ticket.smsSentAt,
      },
    });
  } catch (error) {
    console.error(`Error updating Ticket ID ${ticketId}:`, error);
    next(error);
  }
};

export const deleteTicket: RequestHandler = async (req, res, next) => {
  const ticketRepo = AppDataSource.getRepository(Ticket);
  const ticketId = parseInt(req.params.id, 10);

  try {
    const ticket = await ticketRepo.findOne({ where: { id: ticketId } });
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found.' });
      return;
    }

    await ticketRepo.remove(ticket);
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const incomingSmsHandler: RequestHandler = async (req, res, next) => {
  const ticketRepo = AppDataSource.getRepository(Ticket);
  const { message, from } = req.body;

  try {
    const ticket = ticketRepo.create({
      subject: 'SMS Inquiry',
      description: message,
      patientPhoneNumber: from,
      status: 'open',
    });

    await ticketRepo.save(ticket);

    const responseMessage = `Your ticket (ID: ${ticket.id}) has been created. We will contact you soon.`;
    await sendSMS(ticket.patientPhoneNumber, responseMessage);

    res.status(200).json({ message: 'Ticket created successfully', ticket });
  } catch (error) {
    next(error);
  }
};
