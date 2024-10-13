import React, { useState, useEffect } from 'react';
import './App.css'; // You can still use this for any additional custom styles
import popSoundFile from './pop-sound.mp3';

function App() {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [combo, setCombo] = useState(0);
  const popSound = new Audio(popSoundFile);

  useEffect(() => {
    const balloonInterval = setInterval(() => {
      if (timeLeft > 0) {
        generateBalloon();
      }
    }, 1000 - level * 50); 

    return () => clearInterval(balloonInterval);
  }, [timeLeft, level]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        setGameOver(true);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  const generateBalloon = () => {
    const newBalloon = {
      id: Math.random(),
      x: Math.random() * 90,
      y: Math.random() * 80,
      size: Math.random() * (50 - 30) + 30 - level * 2, // Balloons get smaller
      color: generateRandomColor(),
      isBonus: Math.random() < 0.1,
    };
    setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleBalloonClick = (balloonId) => {
    popSound.play();
    const clickedBalloon = balloons.find(b => b.id === balloonId);
    setScore((prevScore) => prevScore + (clickedBalloon.isBonus ? 20 : 10));
    setCombo((prevCombo) => prevCombo + 1);
    setBalloons(balloons.filter((b) => b.id !== balloonId));

    if (combo % 10 === 0) {
      advanceLevel();
    }
  };

  const advanceLevel = () => {
    setLevel((prevLevel) => prevLevel + 1);
    setTimeLeft(30); // Reset time for each level
  };

  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setGameOver(false);
    setCombo(0);
    setBalloons([]);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background animation or effect */}
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="w-full h-full animate-pulse bg-blue-500" style={{ clipPath: 'circle(75% at 50% 50%)' }} />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-5xl font-extrabold text-yellow-300 animate-bounce">Game Over!</span>
          <p className="text-2xl mt-2">Your Score: <span className="font-bold text-yellow-500">{score}</span></p>
          <button 
            className="mt-6 px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-blue-500 active:scale-95 shadow-lg"
            onClick={restartGame}>
            Restart Game
          </button>
        </div>
      </div>
    );
  }
  

  return (
    <div className="App flex flex-col items-center justify-between h-screen bg-gradient-to-b from-blue-500 to-indigo-500">
      <header className="w-full bg-gray-800 text-white p-4 flex justify-around items-center">
        <h1 className="text-2xl">Balloon Pop Game</h1>
        <div id="timer" className="text-2xl">
          Time Left: {timeLeft}s
        </div>
        <div className="flex space-x-4">
          <span>Level: {level}</span>
          <span>Score: {score}</span>
          <span>Combo: {combo}</span>
        </div>
      </header>

      <div className="game-area relative w-full flex-1 overflow-hidden">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className={`balloon ${balloon.isBonus ? 'bonus' : ''}`}
            style={{
              top: `${balloon.y}%`,
              left: `${balloon.x}%`,
              width: `${balloon.size}px`,
              height: `${balloon.size}px`,
              backgroundColor: balloon.color,
              animation: `float ${3 - level * 0.2}s infinite ease-in-out`, // Floating animation
            }}
            onClick={() => handleBalloonClick(balloon.id)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
