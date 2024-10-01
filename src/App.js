import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);

  // Generate random dots based on the current level
  const generateDots = () => {
    const numDots = level * 5;
    const newDots = Array.from({ length: numDots }, () => ({
      id: Math.random(),
      x: Math.random() * 90,
      y: Math.random() * 90,
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
        alert('Time is up! Game Over.');
        setScore(0);
        setLevel(1);
        setTimeLeft(30);
        generateDots();
      }
    }

    return () => clearInterval(interval);
  }, [timeLeft, dots]);

  // Handle dot click and score increase
  const handleDotClick = (id) => {
    setScore(score + 10);
    setDots(dots.filter((dot) => dot.id !== id));
  };

  return (
    <div className="App">
      <h1>BetterAim</h1>
      <h2>Level: {level}</h2>
      <h2>Score: {score}</h2>
      <h2>Time Left: {timeLeft}s</h2>

      <div className="game-area">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="dot"
            style={{ top: `${dot.y}%`, left: `${dot.x}%` }}
            onClick={() => handleDotClick(dot.id)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
