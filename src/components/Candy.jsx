import React from 'react';

const Candy = ({ candy, isSelected, onClick, isAnimating = false }) => {
  if (!candy) {
    return <div className="candy-cell empty" />;
  }

  return (
    <div
      className={`candy-cell ${isSelected ? 'selected' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={onClick}
    >
      <span className="candy-emoji">{candy.type}</span>
    </div>
  );
};

export default Candy;