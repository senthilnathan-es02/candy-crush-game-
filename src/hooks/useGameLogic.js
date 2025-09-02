import { useState, useCallback, useEffect } from 'react';
import { generateBoard, refillBoard } from '../utils/generateBoard';
import { findMatches, removeMatches, canSwap } from '../utils/checkMatches';

const INITIAL_MOVES = 20;
const BASE_TARGET_SCORE = 100;

export const useGameLogic = () => {
  const [gameState, setGameState] = useState(() => ({
    board: generateBoard(),
    score: 0,
    targetScore: BASE_TARGET_SCORE,
    movesLeft: INITIAL_MOVES,
    level: 1,
    gameStatus: 'playing',
    selectedCandy: null,
  }));

  // ✅ helper: swap candies in a board copy
  const swapOnBoard = (board, r1, c1, r2, c2) => {
    const newBoard = board.map(row => [...row]);
    const temp = newBoard[r1][c1];
    newBoard[r1][c1] = newBoard[r2][c2];
    newBoard[r2][c2] = temp;
    return newBoard;
  };

  const handleCandyClick = useCallback((row, col) => {
    setGameState(prevState => {
      if (prevState.gameStatus !== 'playing') return prevState;

      const { selectedCandy, board, movesLeft } = prevState;

      // First click → select candy
      if (!selectedCandy) {
        return { ...prevState, selectedCandy: { row, col } };
      }

      // Clicking same candy → deselect
      if (selectedCandy.row === row && selectedCandy.col === col) {
        return { ...prevState, selectedCandy: null };
      }

      // Check if swap is valid (adjacent)
      if (canSwap(board, selectedCandy.row, selectedCandy.col, row, col)) {
        // Try swap temporarily
        const swappedBoard = swapOnBoard(board, selectedCandy.row, selectedCandy.col, row, col);

        // Check if swap creates matches
        const matches = findMatches(swappedBoard);
        if (matches.length > 0) {
          // ✅ Valid swap → accept & reduce moves
          return {
            ...prevState,
            board: swappedBoard,
            movesLeft: movesLeft - 1,
            selectedCandy: null,
          };
        } else {
          // ❌ Invalid swap → reject, keep moves same
          return { ...prevState, selectedCandy: null };
        }
      }

      // Not adjacent → change selection
      return { ...prevState, selectedCandy: { row, col } };
    });
  }, []);

  const processMatches = useCallback(() => {
    setGameState(prevState => {
      let newBoard = [...prevState.board.map(row => [...row])];
      let totalScore = prevState.score;
      let hasMatches = true;

      while (hasMatches) {
        const matches = findMatches(newBoard);

        if (matches.length === 0) {
          hasMatches = false;
          break;
        }

        // Add score
        matches.forEach(match => {
          totalScore += match.candies.length * 10;
        });

        // Remove & refill
        newBoard = removeMatches(newBoard, matches);
        newBoard = refillBoard(newBoard);
      }

      return { ...prevState, board: newBoard, score: totalScore };
    });
  }, []);

  const levelUp = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      level: prevState.level + 1,
      targetScore: BASE_TARGET_SCORE * prevState.level * 1.5,
      movesLeft: Math.max(15, INITIAL_MOVES - prevState.level * 2),
      gameStatus: 'playing',
    }));
  }, []);

  const restartGame = useCallback(() => {
    setGameState({
      board: generateBoard(),
      score: 0,
      targetScore: BASE_TARGET_SCORE,
      movesLeft: INITIAL_MOVES,
      level: 1,
      gameStatus: 'playing',
      selectedCandy: null,
    });
  }, []);

  // Process matches automatically
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      const timer = setTimeout(() => {
        processMatches();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [gameState.board, processMatches, gameState.gameStatus]);

  // Check win/lose state
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      if (gameState.score >= gameState.targetScore) {
        setGameState(prevState => ({ ...prevState, gameStatus: 'levelUp' }));
      } else if (gameState.movesLeft <= 0) {
        setGameState(prevState => ({ ...prevState, gameStatus: 'gameOver' }));
      }
    }
  }, [gameState.score, gameState.targetScore, gameState.movesLeft, gameState.gameStatus]);

  return { gameState, handleCandyClick, levelUp, restartGame };
};
