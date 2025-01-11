import dotenv from 'dotenv';
import 'reflect-metadata';
import app from './app';
import { connectDB } from './config/ormconfig';


dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); 
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); 
  }
};

startServer();
