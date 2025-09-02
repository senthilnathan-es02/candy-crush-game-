import React from 'react';

const ScoreBoard = ({ gameState }) => {
  const { score, targetScore, movesLeft, level } = gameState;
  const progress = Math.min((score / targetScore) * 100, 100);

  return (
    <div className="scoreboard">
      <div className="scoreboard-header">
        <h1 className="game-title">Candy Puzzle</h1>
        <div className="level-badge">Level {level}</div>
      </div>
      
      <div className="score-section">
        <div className="score-item">
          <label>Score</label>
          <span className="score-value">{score.toLocaleString()}</span>
        </div>
        
        <div className="score-item">
          <label>Target</label>
          <span className="target-value">{targetScore.toLocaleString()}</span>
        </div>
        
        <div className="score-item">
          <label>Moves Left</label>
          <span className={`moves-value ${movesLeft <= 5 ? 'warning' : ''}`}>
            {movesLeft}
          </span>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="progress-text">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default ScoreBoard;