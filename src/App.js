import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Welcome to Balloon Pop!');
  const [snackbarVisible, setSnackbarVisible] = useState(true);

  // Generate random balloons with a special balloon chance
  const generateBalloons = () => {
    const numBalloons = level * 5;
    const colors = ['bg-red-400', 'bg-yellow-300', 'bg-blue-400', 'bg-green-400', 'bg-pink-300'];
    const newBalloons = Array.from({ length: numBalloons }, () => ({
      id: Math.random(),
      x: Math.random() * 85, // Ensure x and y are within the visible range
      y: Math.random() * 85,
      size: Math.random() * (60 - 40) + 40, // Balloon size range
      isSpecial: Math.random() < 0.1, // 10% chance for a special balloon
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setBalloons(newBalloons);
  };

  // Trigger balloon generation for each level
  useEffect(() => {
    generateBalloons();
    setSnackbarMessage(`Level ${level} starts!`);
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000);
  }, [level]);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      if (balloons.length === 0) {
        setLevel(level + 1);
        setTimeLeft(30);
        setSnackbarMessage(`Great job! Level ${level + 1} starts now.`);
        setSnackbarVisible(true);
        setTimeout(() => setSnackbarVisible(false), 3000);
      } else {
        setGameOver(true);
        setSnackbarMessage(`Game over! You reached level ${level}.`);
        setSnackbarVisible(true);
      }
    }

    return () => clearInterval(interval);
  }, [timeLeft, balloons, level]);

  // Handle balloon click logic
  const handleBalloonClick = (balloon) => {
    const points = balloon.isSpecial ? 50 : 10;
    setScore(score + points);

    if (balloon.isSpecial) {
      setSnackbarMessage('Special Balloon! Bonus points!');
      setSnackbarVisible(true);
      setTimeout(() => setSnackbarVisible(false), 2000);
    }

    setBalloons(balloons.filter((b) => b.id !== balloon.id)); // Remove clicked balloon

    // Check if all balloons are popped
    if (balloons.length === 1) {
      setLevel(level + 1);
      setTimeLeft(30);
      setSnackbarMessage(`Level ${level + 1} starts now!`);
      setSnackbarVisible(true);
      setTimeout(() => setSnackbarVisible(false), 3000);
    }
  };

  // Restart game after game over
  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setGameOver(false);
    generateBalloons();
    setSnackbarMessage('Game restarted! Pop the balloons!');
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000);
  };

  // Game over screen
  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
        <h1 className="text-5xl font-bold animate-pulse">Game Over!</h1>
        <p className="text-3xl mt-4">Your Score: {score}</p>
        <button
          onClick={restartGame}
          className="mt-6 px-8 py-3 bg-blue-600 rounded-full text-xl flex items-center gap-2 hover:bg-blue-700 transition-all transform hover:scale-110"
        >
          Restart Game
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-200 to-blue-500">
      <h1 className="text-6xl font-extrabold text-white mb-6 animate-bounce">Balloon Pop!</h1>
      <div className="flex justify-between items-center w-full max-w-lg p-4">
        <h2 className="text-2xl font-semibold text-white">Level: {level}</h2>
        <h2 className="text-2xl font-semibold text-white">Score: {score}</h2>
        <h2 className="text-2xl font-semibold text-white">Time: {timeLeft}s</h2>
      </div>

      <div className="relative w-full max-w-2xl h-96 bg-gray-200 rounded-lg shadow-lg overflow-hidden border-4 border-blue-500">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className={`balloon ${balloon.color} ${balloon.isSpecial ? 'border-4 border-yellow-400' : ''} 
            absolute cursor-pointer rounded-full shadow-lg transform transition-all hover:scale-110 animate-pop`}
            style={{
              top: `${balloon.y}%`,
              left: `${balloon.x}%`,
              width: `${balloon.size}px`,
              height: `${balloon.size}px`,
            }}
            onClick={() => handleBalloonClick(balloon)}
          ></div>
        ))}
      </div>

      {snackbarVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md animate-slideIn">
          {snackbarMessage}
        </div>
      )}
    </div>
  );
}

export default App;
