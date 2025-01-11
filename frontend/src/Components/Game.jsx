/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000',{
    transports: ['websocket'],
});

const Game = () => {
  const { roomCode } = useParams();
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', roomCode, 'Player1'); // Adjust player name
    
    socket.on('playerJoined', (players) => {
      setPlayers(players);
    });

    socket.on('moveMade', (moveData) => {
      setGameState(moveData);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomCode]);

  const handleMove = (moveData) => {
    socket.emit('makeMove', roomCode, moveData);
  };

  return (
    <div>
      <h1>Game Room: {roomCode}</h1>
      <p>Players: {players.map(player => player.name).join(', ')}</p>
      {/* Game board goes here */}
      <button onClick={() => handleMove({ move: 'X' })}>Make Move</button>
    </div>
  );
};

export default Game;
