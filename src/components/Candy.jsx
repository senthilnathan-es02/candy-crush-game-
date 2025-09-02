import React from 'react';
import '../styles/board.scss';

const Candy = ({ candy, isSelected, onClick, isAnimating = false, row, col }) => {
  const emoji = typeof candy === 'string' ? candy : candy?.type;
  const isEmpty = !emoji;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={
        `candy-cell` +
        (isSelected ? ' selected' : '') +
        (isAnimating ? ' animating' : '') +
        (isEmpty ? ' empty' : '')
      }
      onClick={() => !isEmpty && onClick?.()}
      role="button"
      aria-pressed={!!isSelected}
      tabIndex={isEmpty ? -1 : 0}
      data-row={row}
      data-col={col}
      onKeyDown={handleKeyDown}
    >
      {!isEmpty && <span className="candy-emoji">{emoji}</span>}
    </div>
  );
};

export default Candy;
