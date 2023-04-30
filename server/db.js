import mongoose from 'mongoose';
import {DB_NAME} from './config.js'

async function connectDB() {
  try {
    const {connection} = await mongoose.connect(DB_NAME);
    console.log(`Connected to DB ${connection.name}`);
  } catch (error) {
    console.error("Failed to connect to DB");
  }
}

connectDB();