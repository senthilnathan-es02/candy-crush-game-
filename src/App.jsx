import React from 'react';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameOver from './components/GameOver';
import LevelUp from './components/LevelUp';
import { useGameLogic } from './hooks/useGameLogic';
import './styles/app.scss';
import './styles/board.scss';

function App() {
  const { gameState, handleCandyClick, levelUp, restartGame } = useGameLogic();

  return (
    <div className="app">
      <ScoreBoard gameState={gameState} />
      
      <Board
        board={gameState.board}
        selectedCandy={gameState.selectedCandy}
        onCandyClick={handleCandyClick}
      />
      
      {gameState.gameStatus === 'gameOver' && (
        <GameOver
          score={gameState.score}
          level={gameState.level}
          onRestart={restartGame}
        />
      )}
      
      {gameState.gameStatus === 'levelUp' && (
        <LevelUp
          level={gameState.level}
          onContinue={levelUp}
        />
      )}
    </div>
  );
}

export default App;