import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

dotenv.config();

export const generateToken = (user: User) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
