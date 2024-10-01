import React, { useState, useEffect } from 'react';
import './App.css';
// import clickSoundFile from './click-sound.mp3'; // Add sound file
// import bonusSoundFile from './bonus-sound.mp3'; // Add sound file

function App() {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  // Sounds
  // const clickSound = new Audio(clickSoundFile);
  // const bonusSound = new Audio(bonusSoundFile);

  const generateDots = () => {
    const numDots = level * 5;
    const newDots = Array.from({ length: numDots }, () => ({
      id: Math.random(),
      x: Math.random() * 90,
      y: Math.random() * 90,
      size: Math.random() * (30 - 10) + 10, // Random size between 10px and 30px
      isBonus: Math.random() < 0.1 // 10% chance to be a bonus dot
    }));
    setDots(newDots);
  };

  useEffect(() => {
    generateDots();
  }, [level]);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      if (dots.length === 0) {
        alert(`Level ${level} complete! Moving to the next level.`);
        setLevel(level + 1);
        setTimeLeft(30);
      } else {
        setGameOver(true);
      }
    }

    return () => clearInterval(interval);
  }, [timeLeft, dots]);

  // Handle dot click
  const handleDotClick = (dot) => {
    // clickSound.play();
    if (dot.isBonus) {
      // bonusSound.play();
      setScore(score + 50); // Bonus dot gives more points
    } else {
      setScore(score + 10);
    }
    setDots(dots.filter((d) => d.id !== dot.id));
  };

  // Restart game
  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setGameOver(false);
    generateDots();
  };

  if (gameOver) {
    return (
      <div className="game-over">
        <h1>Game Over!</h1>
        <p>Your Score: {score}</p>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    );
  }

  return (
    <div className="App" style={{ backgroundColor: level % 2 === 0 ? '#f0f0f0' : '#e0ffe0' }}>
      <h1>BetterAim</h1>
      <h2>Level: {level}</h2>
      <h2>Score: {score}</h2>
      <h2>Time Left: {timeLeft}s</h2>

      <div className="game-area">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className={`dot ${dot.isBonus ? 'bonus' : ''}`}
            style={{ top: `${dot.y}%`, left: `${dot.x}%`, width: `${dot.size}px`, height: `${dot.size}px` }}
            onClick={() => handleDotClick(dot)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
