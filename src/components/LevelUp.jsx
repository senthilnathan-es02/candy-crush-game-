import React, { useEffect } from 'react';


const LevelUp = ({ level, onContinue }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="modal-overlay">
      <div className="modal-content level-up">
        <div className="level-up-icon">
🏆
        </div>
        <h2>Level Up!</h2>
        <div className="level-display">
          <span className="level-text">Level {level}</span>
        </div>
        <p>Great job! Moving to the next challenge...</p>
        <button className="continue-button" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LevelUp;