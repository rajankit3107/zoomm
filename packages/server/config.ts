import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
   if (!process.env.MONGO_URI)
      throw new Error('Could not find MONGO_URI, chech your env files');

   try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`✅ Database conncected: ${conn.connection.host}`);
      return conn;
   } catch (err) {
      console.error(`❌ Error connecting to Database`, err);
      process.exit(1);
   }
}
