import { RequestHandler } from 'express';
import { getRepository } from 'typeorm';
import { Ticket } from '../models/Ticket';
import { User } from '../models/User';
// import { sendSMS } from '../utils/smsService';


export const createTicket: RequestHandler = async (req, res, next) => {
  const ticketRepo = getRepository(Ticket);
  const { subject, description, customerEmail } = req.body;

  try {
    const ticket = ticketRepo.create({
      subject,
      description,
      customerEmail,
      status: 'open',
    });
    await ticketRepo.save(ticket);

    // await sendSMS(customerEmail, `Your ticket #${ticket.id} has been created.`);

    res.status(201).json({ message: 'Ticket created successfully', ticket });
  } catch (error) {
    next(error); 
  }
};

export const getTickets: RequestHandler = async (req, res, next) => {
  const ticketRepo = getRepository(Ticket);

  try {
    const tickets = await ticketRepo.find({ relations: ['assignedTo'] });
    res.status(200).json({ tickets });
  } catch (error) {
    next(error);
  }
};

export const getTicketById: RequestHandler = async (req, res, next) => {
  const ticketRepo = getRepository(Ticket);
  const { id } = req.params;

  try {
    const ticket = await ticketRepo.findOne({
      where: { id: Number(id) },
      relations: ['assignedTo']
    });

    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return; 
    }
    res.status(200).json({ ticket });
  } catch (error) {
    next(error);
  }
};

export const updateTicket: RequestHandler = async (req, res, next) => {
  const ticketRepo = getRepository(Ticket);
  const userRepo = getRepository(User);
  const { id } = req.params;
  const { status, assignedTo } = req.body;

  try {
    const ticket = await ticketRepo.findOne({
      where: { id: Number(id) },
    });

    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    if (status) ticket.status = status;
    if (assignedTo) {
      const user = await userRepo.findOne(assignedTo);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      ticket.assignedTo = user;
    }

    await ticketRepo.save(ticket);

    // await sendSMS(ticket.customerEmail, `Your ticket #${ticket.id} status has been updated to ${ticket.status}.`);

    res.status(200).json({ message: 'Ticket updated successfully', ticket });
  } catch (error) {
    next(error);
  }
};

export const deleteTicket: RequestHandler = async (req, res, next) => {
  const ticketRepo = getRepository(Ticket);
  const { id } = req.params;

  try {
    const ticket = await ticketRepo.findOne({
      where: { id: Number(id) },
    });

    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }

    await ticketRepo.remove(ticket);
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    next(error);
  }
};
