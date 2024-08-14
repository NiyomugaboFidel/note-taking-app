import mongoose from 'mongoose';


const dbConnection = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect('mongodb://localhost:27017/notes-take');
    console.log('Database connected successfully');
  } catch (error:any) {
    console.error('Failed to connect to database:', error.message);
    throw new Error('Database connection failed');
  }
};

export default dbConnection;
