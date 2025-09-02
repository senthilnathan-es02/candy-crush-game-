import React from "react";

const GameOver = ({ onRestart, score }) => {
  return (
    <div className="gameover">
      <h1>Game Over</h1>
      <p>Your final score: {score}</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default GameOver;
