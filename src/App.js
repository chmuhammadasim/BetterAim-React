import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming the CSS you shared is inside this file
import popSoundFile from './pop-sound.mp3'; // Placeholder for your popping sound

function App() {
  const [balloons, setBalloons] = useState([]);
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [combo, setCombo] = useState(0);
  const popSound = new Audio(popSoundFile);

  // Function to generate random color for balloons
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Generate new balloons throughout the level
  useEffect(() => {
    const balloonInterval = setInterval(() => {
      if (timeLeft > 0) {
        generateBalloon();
      }
    }, 1000); // Generate a balloon every second

    return () => clearInterval(balloonInterval);
  }, [timeLeft]);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        setGameOver(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const generateBalloon = () => {
    const newBalloon = {
      id: Math.random(),
      x: Math.random() * 90,
      y: Math.random() * 80,
      size: Math.random() * (50 - 30) + 30,
      color: generateRandomColor(), // Assign a random color
      isBonus: Math.random() < 0.1, // 10% chance for bonus
    };
    setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);
  };

  const handleBalloonClick = (balloonId) => {
    popSound.play();
    setScore((prevScore) => prevScore + 10);
    setCombo(combo + 1);
    setBalloons(balloons.filter((b) => b.id !== balloonId));
  };

  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setGameOver(false);
    setCombo(0);
    setBalloons([]);
  };

  // Game over screen
  if (gameOver) {
    return (
      <div className="expired-notice">
        <span>Game Over!</span>
        <p>Your Score: {score}</p>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="game-header">
        <h1>Balloon Pop Game</h1>
        <div id="timer">
          Time Left: {timeLeft}s
        </div>
        <div className="scoreboard">
          <span>Level: {level}</span>
          <span>Score: {score}</span>
          <span>Combo: {combo}</span>
        </div>
      </header>

      <div className="game-area">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className={`balloon ${balloon.isBonus ? 'bonus' : ''}`}
            style={{
              top: `${balloon.y}%`,
              left: `${balloon.x}%`,
              width: `${balloon.size}px`,
              height: `${balloon.size}px`, // Adjust height to match width for round shape
              backgroundColor: balloon.color, // Set background color to the random color
            }}
            onClick={() => handleBalloonClick(balloon.id)}
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
