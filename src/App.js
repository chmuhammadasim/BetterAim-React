import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import popSoundFile from './pop-sound.mp3';
import { FaRegClock, FaStar, FaLevelUpAlt, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

function App() {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [combo, setCombo] = useState(0); // Used for combo display
  const [paused, setPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const popSoundRef = useRef(new Audio(popSoundFile));

  const generateRandomColor = () => {
    const colors = ['#FF6347', '#FFD700', '#8A2BE2', '#32CD32', '#FF69B4'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to generate balloons
  const generateBalloon = useCallback(() => {
    const faces = [
      '🎈', '😃', '🦄', '🐶', '🐱', '🐻', 
      '🐼', '🐸', '🌈', '🍭', '🍉', '🍕', 
      '🎉', '🎵', '🚀', '🦁', '✨', '🎂', 
      '🎈', '👑', '🌟'
    ];

    const newBalloon = {
      id: Math.random(),
      x: Math.random() * 90,
      y: Math.random() * 80,
      size: Math.max(50, Math.random() * (100 - 50) + 30 - level * 2),
      color: generateRandomColor(),
      face: faces[Math.floor(Math.random() * faces.length)],
      isBonus: Math.random() < 0.1,
      type: Math.random() < 0.05 ? 'time' : Math.random() < 0.05 ? 'slow' : null,
      multiplier: Math.random() < 0.05 ? 2 : 1, // 2x score multiplier
      powerUp: Math.random() < 0.1 ? 'extraTime' : null, // 10% chance for an extra time power-up
    };

    setBalloons((prev) => [...prev, newBalloon]);
  }, [level]);

  // Interval for generating balloons
  useEffect(() => {
    if (paused || gameOver) return;
    const interval = setInterval(generateBalloon, Math.max(500 - level * 50, 300));
    return () => clearInterval(interval);
  }, [generateBalloon, level, paused, gameOver]);

  // Timer countdown and game over logic
  useEffect(() => {
    if (timeLeft <= 0) setGameOver(true);
    if (!paused && !gameOver) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [paused, gameOver, timeLeft]);

  // Handling balloon click events
  const handleBalloonClick = (id) => {
    const balloon = balloons.find((b) => b.id === id);
    if (!balloon) return;

    if (soundOn) popSoundRef.current.play();
    setBalloons((prev) => prev.filter((b) => b.id !== id));

    const scoreIncrement = balloon.isBonus ? 20 : 10;
    setScore((prev) => prev + scoreIncrement * balloon.multiplier);

    if (balloon.type === 'time') {
      setTimeLeft((prev) => prev + 5);
    } else if (balloon.type === 'slow') {
      setPaused(true); // Temporarily pauses
    }

    if (balloon.powerUp === 'extraTime') {
      setTimeLeft((prev) => prev + 10);
    }

    // Check for combo
    setCombo((prev) => {
      const newCombo = prev + 1;
      if (newCombo % 10 === 0) {
        advanceLevel();
        return 0; // Reset combo count
      }
      return newCombo;
    });
  };

  // Function to advance level
  const advanceLevel = () => {
    setLevel((prev) => prev + 1);
    setTimeLeft(30);
  };

  // Function to restart the game
  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    setCombo(0);
    setPaused(false);
    setBalloons([]);
    setGameOver(false);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🎉 Balloon Pop!</h1>
        <div className="info">
          <span><FaRegClock /> {timeLeft}s</span>
          <span><FaLevelUpAlt /> Level {level}</span>
          <span><FaStar /> {score}</span>
          <span>Combo: {combo}</span> {/* Displaying the combo count */}
        </div>
        <div className="controls">
          <button onClick={() => setPaused(!paused)}>
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button onClick={() => setSoundOn(!soundOn)}>
            {soundOn ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
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
              height: `${balloon.size}px`,
              backgroundColor: balloon.color,
            }}
            onClick={() => handleBalloonClick(balloon.id)}
          >
            {balloon.face}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="game-over-screen">
          <h2>Game Over</h2>
          <p>Your Score: {score}</p>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
