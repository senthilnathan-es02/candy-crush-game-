import React from 'react';


const GameOver = ({ score, level, onRestart }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content game-over">
        <h2>Game Over!</h2>
        <div className="game-over-stats">
          <div className="stat">
            <span className="stat-label">Final Score</span>
            <span className="stat-value">{score.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Level Reached</span>
            <span className="stat-value">{level}</span>
          </div>
        </div>
        <button className="restart-button" onClick={onRestart}>
🥹
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;