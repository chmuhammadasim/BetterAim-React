import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Snackbar from './Snackbar';
// import clickSoundFile from './click-sound.mp3';
// import comboSoundFile from './combo-sound.mp3';
// import bonusSoundFile from './bonus-sound.mp3';

function App() {
  const [dots, setDots] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [combo, setCombo] = useState(0);
  const [streak, setStreak] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState('Welcome to BetterAim!');
  const [snackbarVisible, setSnackbarVisible] = useState(true);
  const [specialDot, setSpecialDot] = useState(null);
  const dotMoveInterval = useRef(null);

  // const clickSound = new Audio(clickSoundFile);
  // const comboSound = new Audio(comboSoundFile);
  // const bonusSound = new Audio(bonusSoundFile);

  // Generate random dots with special dot chance
  const generateDots = () => {
    const numDots = level * 5;
    const newDots = Array.from({ length: numDots }, () => ({
      id: Math.random(),
      x: Math.random() * 90,
      y: Math.random() * 90,
      size: Math.random() * (30 - 10) + 10,
      isSpecial: Math.random() < 0.05, // 5% chance for a special dot
      speed: Math.random() * 0.5 + 0.5,
    }));
    setDots(newDots);
  };

  // Move dots dynamically
  const moveDots = () => {
    if (level > 1) {
      dotMoveInterval.current = setInterval(() => {
        setDots((prevDots) =>
          prevDots.map((dot) => ({
            ...dot,
            x: (dot.x + dot.speed) % 90,
            y: (dot.y + dot.speed) % 90,
          }))
        );
      }, 100);
    }
  };

  useEffect(() => {
    generateDots();
    moveDots();
    setSnackbarMessage(`Level ${level} starts!`);
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000);

    return () => clearInterval(dotMoveInterval.current);
  }, [level]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      if (dots.length === 0) {
        setLevel(level + 1);
        setTimeLeft(30);
        setSnackbarMessage(`Great job! Moving to level ${level + 1}.`);
        setSnackbarVisible(true);
        setTimeout(() => setSnackbarVisible(false), 3000);
      } else {
        setGameOver(true);
        setSnackbarMessage(`Game over! You reached level ${level}.`);
        setSnackbarVisible(true);
      }
    }

    return () => clearInterval(interval);
  }, [timeLeft, dots, level]);

  // Handle dot click logic with combos and streaks
  const handleDotClick = (dot) => {
    // clickSound.play();
    let points = dot.isSpecial ? 100 : 10;
    setScore(score + points);

    if (dot.isSpecial) {
      // bonusSound.play();
      setSnackbarMessage('Special dot hit! Extra points!');
      setSnackbarVisible(true);
      setTimeout(() => setSnackbarVisible(false), 2000);
    }

    setDots(dots.filter((d) => d.id !== dot.id));

    // Increase combo and streak
    setCombo(combo + 1);
    setStreak(streak + 1);

    if (combo > 0 && combo % 10 === 0) {
      // comboSound.play();
      setSnackbarMessage('Combo streak! Keep it up!');
      setSnackbarVisible(true);
      setTimeout(() => setSnackbarVisible(false), 2000);
    }
  };

  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setGameOver(false);
    setCombo(0);
    setStreak(0);
    generateDots();
    setSnackbarMessage('Game restarted!');
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000);
  };

  if (gameOver) {
    return (
      <div className="game-over fade-in">
        <h1>Game Over!</h1>
        <p>Your Score: {score}</p>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    );
  }

  return (
    <div className="App fade-in">
      <h1>BetterAim</h1>
      <h2>Level: {level}</h2>
      <h2 className="score-counter">Score: {score}</h2>
      <h2>Combo: {combo}</h2>
      <h2>Time Left: {timeLeft}s</h2>
      <h2>Streak: {streak}</h2>

      <div className="game-area">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className={`dot ${dot.isSpecial ? 'special-dot' : ''}`}
            style={{
              top: `${dot.y}%`,
              left: `${dot.x}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.isSpecial ? 'gold' : 'red',
            }}
            onClick={() => handleDotClick(dot)}
          ></div>
        ))}
      </div>

      {snackbarVisible && <Snackbar message={snackbarMessage} />}
    </div>
  );
}

export default App;
