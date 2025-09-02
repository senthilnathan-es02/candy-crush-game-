import React from 'react';
import Candy from './Candy';

const Board = ({ board, selectedCandy, onCandyClick }) => {
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
          />
        ))
      )}
    </div>
  );
};

export default Board;