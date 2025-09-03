import React from 'react';

const LevelUp = ({ level, onContinue }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content level-up">
        <div className="level-up-icon">🏆</div>
        <h2>Level Up!</h2>
        <div className="level-display">
          <span className="level-text">Level {level}</span>
        </div>
        <p>Great job! Moving to the next challenge...</p>
        
        {/* ✅ Only button will control next level */}
        <button className="continue-button" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LevelUp;
