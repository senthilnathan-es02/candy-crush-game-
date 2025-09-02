import React, { useState } from "react";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import GameOver from "./components/GameOver";
import LevelUp from "./components/LevelUp";
import "./styles/app.scss";

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetScore, setTargetScore] = useState(100);
  const [moves, setMoves] = useState(20);
  const [gameOver, setGameOver] = useState(false);
  const [levelUp, setLevelUp] = useState(false);

  const handleLevelUp = () => {
    setLevelUp(true);
    setTimeout(() => {
      setLevelUp(false);
      setLevel((prev) => prev + 1);
      setTargetScore((prev) => prev + 50);
      setMoves((prevLevel) => Math.max(5, 20 - level)); // safer
    }, 2000);
  };

  const handleGameOver = () => setGameOver(true);

  const handleRestart = () => {
    setScore(0);
    setLevel(1);
    setTargetScore(100);
    setMoves(20);
    setGameOver(false);
    setLevelUp(false);
  };

  return (
    <div className="app">
      <h1>🍭 Candy Crush Clone</h1>
      {!gameOver ? (
        <>
          <ScoreBoard
            score={score}
            targetScore={targetScore}
            moves={moves}
            level={level}
          />
          <Board
            score={score}
            setScore={setScore}
            moves={moves}
            setMoves={setMoves}
            targetScore={targetScore}
            level={level}
            onLevelUp={handleLevelUp}
            onGameOver={handleGameOver}
          />
          {levelUp && <LevelUp level={level} />}
        </>
      ) : (
        <GameOver onRestart={handleRestart} score={score} />
      )}
    </div>
  );
}

export default App;
