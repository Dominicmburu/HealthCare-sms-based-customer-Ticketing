import { User } from '../models/User';
import { RequestHandler } from 'express';
import { AppDataSource } from '../config/ormconfig';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

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

export const updateUser: RequestHandler = async (req, res, next): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);
  const userId = parseInt(req.params.id, 10);
  const { email, password, role, phoneNumber } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    if (email && email !== user.email) {
      const existingUser = await userRepo.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'Email is already in use by another user.' });
        return;
      }
      user.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (role) {
      user.role = role;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    await userRepo.save(user);

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ message: 'User updated successfully.', user: userWithoutPassword });
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