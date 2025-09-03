import { useState, useCallback, useEffect } from "react";
import { generateBoard, refillBoard } from "../utils/generateBoard";
import { findMatches, removeMatches, canSwap } from "../utils/checkMatches";

const INITIAL_MOVES = 20;
const BASE_TARGET_SCORE = 100;

export const useGameLogic = () => {
  const [gameState, setGameState] = useState(() => ({
    board: generateBoard(),
    score: 0,
    targetScore: BASE_TARGET_SCORE,
    movesLeft: INITIAL_MOVES,
    level: 1,
    gameStatus: "playing",
    selectedCandy: null,
  }));

  // ✅ helper: swap candies in a board copy
  const swapOnBoard = (board, r1, c1, r2, c2) => {
    const newBoard = board.map((row) => [...row]);
    const temp = newBoard[r1][c1];
    newBoard[r1][c1] = newBoard[r2][c2];
    newBoard[r2][c2] = temp;
    return newBoard;
  };

  // ✅ handle clicks like Candy Crush
  const handleCandyClick = useCallback((row, col) => {
    setGameState((prev) => {
      if (prev.gameStatus !== "playing") return prev;

      const { selectedCandy, board, movesLeft } = prev;

      if (!selectedCandy) {
        return { ...prev, selectedCandy: { row, col } };
      }

      if (selectedCandy.row === row && selectedCandy.col === col) {
        return { ...prev, selectedCandy: null };
      }

      if (canSwap(board, selectedCandy.row, selectedCandy.col, row, col)) {
        const swappedBoard = swapOnBoard(
          board,
          selectedCandy.row,
          selectedCandy.col,
          row,
          col
        );

        const matches = findMatches(swappedBoard);
        if (matches.length > 0) {
          return {
            ...prev,
            board: swappedBoard,
            movesLeft: movesLeft - 1,
            selectedCandy: null,
          };
        } else {
          return { ...prev, selectedCandy: null };
        }
      }

      return { ...prev, selectedCandy: { row, col } };
    });
  }, []);

  // ✅ handle swipe (mobile)
  const handleSwipe = useCallback((row, col, direction) => {
    const dRow = { up: -1, down: 1, left: 0, right: 0 };
    const dCol = { up: 0, down: 0, left: -1, right: 1 };

    const newRow = row + dRow[direction];
    const newCol = col + dCol[direction];

    if (
      newRow >= 0 &&
      newRow < gameState.board.length &&
      newCol >= 0 &&
      newCol < gameState.board[0].length
    ) {
      handleCandyClick(row, col); // select current
      handleCandyClick(newRow, newCol); // select + swap with neighbor
    }
  }, [gameState.board, handleCandyClick]);

  // ✅ Process matches
  const processMatches = useCallback(() => {
    setGameState((prev) => {
      let newBoard = prev.board.map((row) => [...row]);
      let newScore = prev.score;
      let hasMatches = true;

      while (hasMatches) {
        const matches = findMatches(newBoard);

        if (matches.length === 0) {
          hasMatches = false;
          break;
        }

        matches.forEach((match) => {
          newScore += match.candies.length * 10;
        });

        newBoard = removeMatches(newBoard, matches);
        newBoard = refillBoard(newBoard);
      }

      return { ...prev, board: newBoard, score: newScore };
    });
  }, []);

  // ✅ Level Up
  const levelUp = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      level: prev.level + 1,
      targetScore: BASE_TARGET_SCORE * prev.level * 1.5,
      movesLeft: Math.max(15, INITIAL_MOVES - prev.level * 2),
      gameStatus: "playing",
    }));
  }, []);

  // ✅ Restart game
  const restartGame = useCallback(() => {
    setGameState({
      board: generateBoard(),
      score: 0,
      targetScore: BASE_TARGET_SCORE,
      movesLeft: INITIAL_MOVES,
      level: 1,
      gameStatus: "playing",
      selectedCandy: null,
    });
  }, []);

  // Auto-process matches after board updates
  useEffect(() => {
    if (gameState.gameStatus === "playing") {
      const timer = setTimeout(() => {
        processMatches();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [gameState.board, gameState.gameStatus, processMatches]);

  // Check game status
  useEffect(() => {
    if (gameState.gameStatus === "playing") {
      if (gameState.score >= gameState.targetScore) {
        setGameState((prev) => ({ ...prev, gameStatus: "levelUp" }));
      } else if (gameState.movesLeft <= 0) {
        setGameState((prev) => ({ ...prev, gameStatus: "gameOver" }));
      }
    }
  }, [gameState.score, gameState.targetScore, gameState.movesLeft, gameState.gameStatus]);

  return { gameState, handleCandyClick, handleSwipe, levelUp, restartGame };
};
