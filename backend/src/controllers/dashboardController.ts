import { Request, Response } from 'express';
import { getRepository, Between } from 'typeorm';
import { Ticket } from '../models/Ticket';

export const getTicketStats = async (req: Request, res: Response) => {
  const ticketRepo = getRepository(Ticket);
  const { startDate, endDate } = req.query;

  try {
    const stats = await ticketRepo.find({
      where: {
        createdAt: Between(new Date(startDate as string), new Date(endDate as string)),
      },
    });

    const totalTickets = stats.length;
    const openTickets = stats.filter((t) => t.status === 'open').length;
    const inProgressTickets = stats.filter((t) => t.status === 'in_progress').length;
    const closedTickets = stats.filter((t) => t.status === 'closed').length;

    res.status(200).json({
      totalTickets,
      openTickets,
      inProgressTickets,
      closedTickets,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
