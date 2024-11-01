import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Ticket } from '../models/Ticket';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Ticket],
  migrations: ['src/migration/**/*.ts'],
  subscribers: [],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database initialization failed');
    process.exit(1); 
  }
};
