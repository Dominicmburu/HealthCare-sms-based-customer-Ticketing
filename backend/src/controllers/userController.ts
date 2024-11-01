import { User } from '../models/User';
import { RequestHandler } from 'express';
import { AppDataSource } from '../config/ormconfig';

export const getUsers: RequestHandler = async (req, res, next) => {
  const userRepo = AppDataSource.getRepository(User);

  try {
    const users = await userRepo.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById: RequestHandler = async (req, res, next): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    res.status(200).json(user);
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);
  const userId = parseInt(req.params.id, 10); 

  try {
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    await userRepo.remove(user);
    res.status(200).json({ message: 'User deleted successfully' });
    return;
  } catch (error) {
    next(error);
  }
};