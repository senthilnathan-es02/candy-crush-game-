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

  const swapCandies = useCallback((row1, col1, row2, col2) => {
    setGameState(prevState => {
      const newBoard = prevState.board.map(row => [...row]);
      
      // Swap candies
      const temp = newBoard[row1][col1];
      newBoard[row1][col1] = newBoard[row2][col2];
      newBoard[row2][col2] = temp;
      
      // Update positions
      newBoard[row1][col1].row = row1;
      newBoard[row1][col1].col = col1;
      newBoard[row2][col2].row = row2;
      newBoard[row2][col2].col = col2;
      
      return {
        ...prevState,
        board: newBoard,
        movesLeft: prevState.movesLeft - 1,
        selectedCandy: null,
      };
    });
  }, []);

  const handleCandyClick = useCallback((row, col) => {
    setGameState(prevState => {
      if (prevState.gameStatus !== 'playing') return prevState;

      const { selectedCandy } = prevState;
      
      if (!selectedCandy) {
        // Select the candy
        return {
          ...prevState,
          selectedCandy: { row, col },
        };
      }
      
      if (selectedCandy.row === row && selectedCandy.col === col) {
        // Deselect the same candy
        return {
          ...prevState,
          selectedCandy: null,
        };
      }
      
      // Try to swap
      if (canSwap(prevState.board, selectedCandy.row, selectedCandy.col, row, col)) {
        swapCandies(selectedCandy.row, selectedCandy.col, row, col);
        return prevState;
      }
      
      // Select new candy if swap is not valid
      return {
        ...prevState,
        selectedCandy: { row, col },
      };
    });
  }, [swapCandies]);

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
        
        // Calculate score
        matches.forEach(match => {
          totalScore += match.candies.length * 10;
        });
        
        // Remove matches
        newBoard = removeMatches(newBoard, matches);
        
        // Refill board
        newBoard = refillBoard(newBoard);
      }
      
      return {
        ...prevState,
        board: newBoard,
        score: totalScore,
      };
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

  // Check for matches after board updates
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      const timer = setTimeout(() => {
        processMatches();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [gameState.board, processMatches, gameState.gameStatus]);

  // Check game state
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      if (gameState.score >= gameState.targetScore) {
        setGameState(prevState => ({
          ...prevState,
          gameStatus: 'levelUp',
        }));
      } else if (gameState.movesLeft <= 0) {
        setGameState(prevState => ({
          ...prevState,
          gameStatus: 'gameOver',
        }));
      }
    }
  }, [gameState.score, gameState.targetScore, gameState.movesLeft, gameState.gameStatus]);

  return {
    gameState,
    handleCandyClick,
    levelUp,
    restartGame,
  };
};