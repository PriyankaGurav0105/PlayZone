/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
    transports: ['websocket'],
  });
  socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

const Lobby = () => {
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();  // Replace history with navigate

  const games = [
    { id: 'tic-tac-toe', name: 'Tic-Tac-Toe', image: '/images/tic-tac-toe.png' },
    { id: 'chess', name: 'Chess', image: '/images/chess.png' },
    { id: 'battleship', name: 'Battleship', image: '/images/battleship.png' },
    // Add more games here with their respective images
  ];

  const createRoom = (gameId) => {
    const newRoomCode = Math.floor(Math.random() * 10000);
    setRoomCode(newRoomCode);
    socket.emit('joinRoom', newRoomCode, playerName);
    navigate(`/game/${newRoomCode}`);  // Use navigate instead of history.push
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Game Lobby</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="px-4 py-2 text-lg border border-gray-300 rounded-md"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
        {games.map((game) => (
          <div
            key={game.id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer"
            onClick={() => createRoom(game.id)}
          >
            <img src={game.image} alt={game.name} className="w-24 h-24 object-contain mb-4" />
            <h3 className="text-xl font-semibold">{game.name}</h3>
          </div>
        ))}
      </div>
      {roomCode && <p className="mt-4 text-lg">Room Code: {roomCode}</p>}
    </div>
  );
};

export default Lobby;
