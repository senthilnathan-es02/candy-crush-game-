import React from 'react';
import Candy from './Candy';

const Board = ({
  board,
  selectedCandy,
  onCandyClick,
  swappingCells = null,   // { from: {row, col}, to: {row, col} } or null
  disabled = false
}) => {
  const isCellAnimating = (row, col) => {
    if (!swappingCells) return false;
    const { from, to } = swappingCells;
    return (
      (from?.row === row && from?.col === col) ||
      (to?.row === row && to?.col === col)
    );
  };

  return (
    <div className="game-board" aria-label="Candy Board">
      {board.map((row, rowIndex) =>
        row.map((candy, colIndex) => (
          <Candy
            key={(typeof candy === 'object' && candy?.id) ?? `${rowIndex}-${colIndex}`}
            candy={candy}
            isSelected={
              selectedCandy?.row === rowIndex && selectedCandy?.col === colIndex
            }
            isAnimating={isCellAnimating(rowIndex, colIndex)}
            onClick={() => !disabled && onCandyClick?.(rowIndex, colIndex)}
            row={rowIndex}
            col={colIndex}
          />
        ))
      )}
    </div>
  );
};

export default Board;
