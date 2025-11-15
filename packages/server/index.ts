import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { connectDB } from './config';
import cors from 'cors';
import userRoutes from './src/routes/user.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set('port', process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: '40kb' }));
app.use(express.urlencoded({ limit: '40kb' }));

//routes
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
   return res.json({ hello: 'world' });
});

const start = async () => {
   connectDB();
   server.listen(app.get('port'), () => {
      console.log(`server is running on port 8000`);
   });
};

start();
