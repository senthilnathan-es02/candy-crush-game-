import candyTypes from "./generateBoard";

// Check for row/column matches of 3+
export const checkMatches = (board, size = 8) => {
  let newBoard = [...board];
  let scoreGained = 0;

  // Row matches
  for (let i = 0; i < size * size; i++) {
    const rowEnd = Math.floor(i / size) * size + (size - 3);
    if (i % size <= size - 3) { 
      const candy = newBoard[i];
      if (candy && newBoard[i+1] === candy && newBoard[i+2] === candy) {
        // Expand further match
        let j = i;
        while (j % size < size && newBoard[j] === candy) {
          newBoard[j] = "";
          j++;
          scoreGained += 10;
        }
      }
    }
  }

  // Col matches
  for (let i = 0; i < size*(size-2); i++) {
    const candy = newBoard[i];
    if (candy && newBoard[i+size] === candy && newBoard[i+2*size] === candy) {
      let k = i;
      while (k < size*size && newBoard[k] === candy) {
        newBoard[k] = "";
        k += size;
        scoreGained += 10;
      }
    }
  }

  return { newBoard, scoreGained };
};

// Refilling gaps
export const dropCandies = (board, size = 8) => {
  let newBoard = [...board];
  for (let i = size*(size-1)-1; i >= 0; i--) {
    if (newBoard[i + size] === "" && i + size < size*size) {
      newBoard[i + size] = newBoard[i];
      newBoard[i] = "";
    }
  }
  // Fill empty spaces at top
  for (let i = 0; i < size; i++) {
    if (newBoard[i] === "") {
      newBoard[i] = candyTypes[Math.floor(Math.random() * candyTypes.length)];
    }
  }
  return newBoard;
};
