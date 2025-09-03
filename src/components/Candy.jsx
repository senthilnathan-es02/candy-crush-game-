import React, { useRef } from 'react';
import '../styles/board.scss';

const Candy = ({ candy, isSelected, onClick, row, col, onSwipe }) => {
  const emoji = typeof candy === 'string' ? candy : candy?.type;
  const isEmpty = !emoji;

  // touch positions for swipe
  const touchStart = useRef(null);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    let direction = null;

    if (absDx > absDy && absDx > 20) {
      direction = dx > 0 ? "right" : "left";
    } else if (absDy > absDx && absDy > 20) {
      direction = dy > 0 ? "down" : "up";
    }

    if (direction && onSwipe) {
      onSwipe(row, col, direction);
    }

    touchStart.current = null;
  };

  return (
    <div
      className={
        `candy-cell` +
        (isSelected ? ' selected' : '') +
        (isEmpty ? ' empty' : '')
      }
      onClick={() => !isEmpty && onClick?.(row, col)}
      role="button"
      aria-pressed={!!isSelected}
      tabIndex={isEmpty ? -1 : 0}
      data-row={row}
      data-col={col}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {!isEmpty && <span className="candy-emoji">{emoji}</span>}
    </div>
  );
};

export default Candy;
