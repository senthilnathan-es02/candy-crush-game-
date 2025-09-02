const CANDY_TYPES = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒'];

export const generateBoard = () => {
  const board = [];
  
  for (let row = 0; row < 8; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      let candyType;
      let attempts = 0;
      
      // Avoid creating immediate matches
      do {
        candyType = CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)];
        attempts++;
      } while (attempts < 10 && wouldCreateMatch(board, row, col, candyType));
      
      board[row][col] = {
        id: `${row}-${col}-${Date.now()}-${Math.random()}`,
        type: candyType,
        row,
        col,
      };
    }
  }
  
  return board;
};

const wouldCreateMatch = (board, row, col, candyType) => {
  // Check horizontal matches
  if (col >= 2 && 
      board[row][col - 1]?.type === candyType && 
      board[row][col - 2]?.type === candyType) {
    return true;
  }
  
  // Check vertical matches
  if (row >= 2 && 
      board[row - 1][col]?.type === candyType && 
      board[row - 2][col]?.type === candyType) {
    return true;
  }
  
  return false;
};

export const refillBoard = (board) => {
  const newBoard = board.map(row => [...row]);
  
  for (let col = 0; col < 8; col++) {
    let emptySpaces = 0;
    
    // Count empty spaces and move candies down
    for (let row = 7; row >= 0; row--) {
      if (!newBoard[row][col]) {
        emptySpaces++;
      } else if (emptySpaces > 0) {
        newBoard[row + emptySpaces][col] = {
          ...newBoard[row][col],
          row: row + emptySpaces,
        };
        newBoard[row][col] = null;
      }
    }
    
    // Fill empty spaces with new candies
    for (let i = 0; i < emptySpaces; i++) {
      const row = i;
      newBoard[row][col] = {
        id: `${row}-${col}-${Date.now()}-${Math.random()}`,
        type: CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)],
        row,
        col,
      };
    }
  }
  
  return newBoard;
};