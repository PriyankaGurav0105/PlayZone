import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();  // Load the environment variables from .env file

const app = express();
const server = http.createServer(app);

// Enable CORS for Express and Socket.io using the environment variable
app.use(cors({
  origin: process.env.FRONTEND_URL,  // Allow frontend to access the backend dynamically
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,  // Allow frontend to connect dynamically
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send('Game Backend is running');
});

let rooms = {};

io.on('connection', (socket) => {
  console.log('a user connected: ', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
