const CANDY_TYPES = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒'];

// Generate board without initial matches
export const generateBoard = () => {
  const board = [];

  for (let row = 0; row < 8; row++) {
    board[row] = [];
    for (let col = 0; col < 8; col++) {
      let candyType;
      let attempts = 0;

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

// Avoid immediate 3-match
const wouldCreateMatch = (board, row, col, candyType) => {
  if (
    col >= 2 &&
    board[row][col - 1]?.type === candyType &&
    board[row][col - 2]?.type === candyType
  ) {
    return true;
  }

  if (
    row >= 2 &&
    board[row - 1][col]?.type === candyType &&
    board[row - 2][col]?.type === candyType
  ) {
    return true;
  }

  return false;
};

// Swap two candies
export const swapCandies = (board, row1, col1, row2, col2) => {
  const newBoard = board.map(r => [...r]);

  const temp = newBoard[row1][col1];
  newBoard[row1][col1] = { ...newBoard[row2][col2], row: row1, col: col1 };
  newBoard[row2][col2] = { ...temp, row: row2, col: col2 };

  return newBoard;
};

// Find matches (3 or more)
export const findMatches = (board) => {
  const matches = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const candy = board[row][col];
      if (!candy) continue;

      // Horizontal check
      if (
        col <= 5 &&
        board[row][col + 1]?.type === candy.type &&
        board[row][col + 2]?.type === candy.type
      ) {
        matches.push([candy, board[row][col + 1], board[row][col + 2]]);
      }

      // Vertical check
      if (
        row <= 5 &&
        board[row + 1][col]?.type === candy.type &&
        board[row + 2][col]?.type === candy.type
      ) {
        matches.push([candy, board[row + 1][col], board[row + 2][col]]);
      }
    }
  }

  return matches.flat();
};

// Remove matched candies
export const removeMatches = (board, matches) => {
  const newBoard = board.map(r => [...r]);

  matches.forEach(candy => {
    newBoard[candy.row][candy.col] = null;
  });

  return newBoard;
};

// Drop + refill
export const refillBoard = (board) => {
  const newBoard = board.map(row => [...row]);

  for (let col = 0; col < 8; col++) {
    let emptySpaces = 0;

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
