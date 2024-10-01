import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// import clickSoundFile from './click-sound.mp3';
// import bonusSoundFile from './bonus-sound.mp3';

function App() {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [slowMotion, setSlowMotion] = useState(false);
  const [doublePoints, setDoublePoints] = useState(false);
  const [combo, setCombo] = useState(0);
  const [highScores, setHighScores] = useState(JSON.parse(localStorage.getItem('highScores')) || []);
  
  // const clickSound = new Audio(clickSoundFile);
  // const bonusSound = new Audio(bonusSoundFile);
  const dotMoveInterval = useRef(null);

  // Generate random dots
  const generateDots = () => {
    const numDots = level * 5;
    const newDots = Array.from({ length: numDots }, () => ({
      id: Math.random(),
      x: Math.random() * 90,
      y: Math.random() * 90,
      size: Math.random() * (30 - 10) + 10, // Random size between 10px and 30px
      isBonus: Math.random() < 0.1, // 10% chance for bonus
      speed: Math.random() * 0.5 + 0.5, // Speed for moving dots
    }));
    setDots(newDots);
  };

  // Move dots based on level difficulty
  const moveDots = () => {
    if (level > 1) {
      dotMoveInterval.current = setInterval(() => {
        setDots((prevDots) =>
          prevDots.map((dot) => ({
            ...dot,
            x: (dot.x + dot.speed * (slowMotion ? 0.5 : 1)) % 90,
            y: (dot.y + dot.speed * (slowMotion ? 0.5 : 1)) % 90,
          }))
        );
      }, 100);
    }
  };

  useEffect(() => {
    generateDots();
    moveDots();
    return () => clearInterval(dotMoveInterval.current);
  }, [level]);

  // Timer logic and power-ups
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
        updateHighScores(score);
      }
    }

    return () => clearInterval(interval);
  }, [timeLeft, dots]);

  // Handle dot click
  const handleDotClick = (dot) => {
    // clickSound.play();
    let points = dot.isBonus ? 50 : 10;
    if (doublePoints) points *= 2;
    setScore(score + points);
    setDots(dots.filter((d) => d.id !== dot.id));

    // Increase combo count
    setCombo(combo + 1);

    // Trigger slow motion power-up every 10 combo hits
    if (combo > 0 && combo % 10 === 0) {
      activatePowerUp('slowMotion');
    }

    // Trigger double points at random
    if (Math.random() < 0.05) {
      activatePowerUp('doublePoints');
    }
  };

  // Activate power-ups
  const activatePowerUp = (type) => {
    if (type === 'slowMotion') {
      setSlowMotion(true);
      setTimeout(() => setSlowMotion(false), 5000);
    } else if (type === 'doublePoints') {
      setDoublePoints(true);
      setTimeout(() => setDoublePoints(false), 5000);
    }
  };

  // Update leaderboard
  const updateHighScores = (newScore) => {
    const updatedScores = [...highScores, newScore].sort((a, b) => b - a).slice(0, 5);
    setHighScores(updatedScores);
    localStorage.setItem('highScores', JSON.stringify(updatedScores));
  };

  // Restart game
  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setGameOver(false);
    setCombo(0);
    generateDots();
  };

  if (gameOver) {
    return (
      <div className="game-over fade-in">
        <h1>Game Over!</h1>
        <p>Your Score: {score}</p>
        <button onClick={restartGame}>Restart Game</button>
        <h3>Leaderboard:</h3>
        <ol>
          {highScores.map((highScore, index) => (
            <li key={index}>{highScore}</li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="App fade-in" style={{ backgroundColor: level % 2 === 0 ? '#f0f0f0' : '#e0ffe0' }}>
      <h1>BetterAim</h1>
      <h2>Level: {level}</h2>
      <h2 className="score-counter">Score: {score}</h2>
      <h2>Combo: {combo}</h2>
      <h2>Time Left: {timeLeft}s</h2>
      <ProgressBar timeLeft={timeLeft} />

      {slowMotion && <p className="power-up glow-effect">Slow Motion Activated!</p>}
      {doublePoints && <p className="power-up glow-effect">Double Points Activated!</p>}

      <div className="game-area">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className={`dot bounce ${dot.isBonus ? 'bonus' : ''}`}
            style={{
              top: `${dot.y}%`,
              left: `${dot.x}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.size < 20 ? 'blue' : dot.size > 25 ? 'green' : 'red',
            }}
            onClick={() => handleDotClick(dot)}
          ></div>
        ))}
      </div>
    </div>
  );
}

function ProgressBar({ timeLeft }) {
  const percentage = (timeLeft / 30) * 100;
  return <div className="progress-bar" style={{ width: `${percentage}%` }}></div>;
}

export default App;
