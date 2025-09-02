import React, { useState, useEffect } from "react";
import Candy from "./Candy";
import { generateBoard } from "../utils/generateBoard";
import { checkMatches, dropCandies } from "../utils/checkMatches";
import "../styles/board.scss";

const Board = ({
  size = 8,
  score,
  setScore,
  moves,
  setMoves,
  targetScore,
  level,
  onLevelUp,
  onGameOver
}) => {
  const [board, setBoard] = useState([]);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [replacingIdx, setReplacingIdx] = useState(null);

  useEffect(() => {
    setBoard(generateBoard(size));
  }, [level]);

  // Detect matches after swap
  useEffect(() => {
    const interval = setInterval(() => {
      const { newBoard, scoreGained } = checkMatches(board, size);
      if (scoreGained > 0) {
        setBoard(dropCandies(newBoard, size));
        setScore((prev) => prev + scoreGained);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [board, setScore, size]);

  // Check win/lose
  useEffect(() => {
    if (score >= targetScore) {
      onLevelUp();
    } else if (moves <= 0) {
      onGameOver();
    }
  }, [score, moves, targetScore, onLevelUp, onGameOver]);

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
  };

  const handleDrop = (e, index) => {
    setReplacingIdx(index);
    if (draggedIdx === null) return;

    const validMoves = [
      draggedIdx - 1,
      draggedIdx + 1,
      draggedIdx - size,
      draggedIdx + size,
    ];
    if (!validMoves.includes(index)) return;

    let newBoard = [...board];
    [newBoard[draggedIdx], newBoard[index]] = [
      newBoard[index],
      newBoard[draggedIdx],
    ];
    setBoard(newBoard);
    setMoves((prev) => prev - 1);
  };

  return (
    <div className="board">
      {board.map((candy, idx) => (
        <Candy
          key={idx}
          candy={candy}
          index={idx}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        />
      ))}
    </div>
  );
};

export default Board;
