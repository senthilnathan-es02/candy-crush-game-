import React from "react";
import "../styles/board.scss";

const Candy = ({ candy, index, onDragStart, onDrop, onDragOver }) => {
  return (
    <div 
      className="candy"
      draggable={true}
      onDragStart={(e) => onDragStart(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onDragOver={(e) => onDragOver(e)}
    >
      {candy}
    </div>
  );
};

export default Candy;
