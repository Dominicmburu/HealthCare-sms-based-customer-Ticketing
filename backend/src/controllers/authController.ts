import { RequestHandler } from 'express';
import { AppDataSource } from '../config/ormconfig';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const register: RequestHandler = async (req, res, next) => {
  const userRepo = AppDataSource.getRepository(User);
  const { email, password, role } = req.body;

  try {
    let user = await userRepo.findOne({ where: { email } });
    if (user) {
      res.status(400).json({ message: 'User already exists.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = userRepo.create({ email, password: hashedPassword, role });
    await userRepo.save(user);

    const token = generateToken(user);
    res
      .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 })
      .status(201)
      .json({ message: 'User registered successfully', token });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const userRepo = AppDataSource.getRepository(User);
  const { email, password } = req.body;

  try {
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials.' });
      return;
    }

    const token = generateToken(user);
    res
      .cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 })
      .status(200)
      .json({ message: 'Logged in successfully', token });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logged out successfully' });
};


