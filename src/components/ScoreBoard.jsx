import React from "react";

const ScoreBoard = ({ score, targetScore, moves, level }) => {
  return (
    <div className="scoreboard">
      <p>Level: {level}</p>
      <p>Score: {score}</p>
      <p>Target: {targetScore}</p>
      <p>Moves Left: {moves}</p>
    </div>
  );
};

export default ScoreBoard;
