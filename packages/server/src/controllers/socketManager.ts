import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';

export const initializeSocket = (server: HTTPServer) => {
   const io = new Server(server);
   return io;
};
