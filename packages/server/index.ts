import express from 'express';
import { createServer } from 'node:http';

import { Server } from 'socket.io';

import mongoose from 'mongoose';

import cors from 'cors';
import { connectDB } from './config';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set('port', process.env.PORT || 8000);

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
