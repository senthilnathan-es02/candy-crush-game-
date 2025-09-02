import React from 'react';
import Candy from './Candy';

const Board = ({ board, selectedCandy, onCandyClick, isSwapping }) => {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) =>
        row.map((candy, colIndex) => (
          <Candy
            key={candy?.id || `${rowIndex}-${colIndex}`}
            candy={candy}
            isSelected={
              selectedCandy?.row === rowIndex && selectedCandy?.col === colIndex
            }
            onClick={() => onCandyClick(rowIndex, colIndex)}
            isAnimating={isSwapping}
          />
        ))
      )}
    </div>
  );
};

export default Board;