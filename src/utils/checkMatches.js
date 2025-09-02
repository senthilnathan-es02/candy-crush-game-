export const findMatches = (board) => {
  const matches = [];
  
  // Check horizontal matches
  for (let row = 0; row < 8; row++) {
    let currentMatch = [];
    let currentType = '';
    
    for (let col = 0; col < 8; col++) {
      const candy = board[row][col];
      
      if (candy && candy.type === currentType) {
        currentMatch.push(candy);
      } else {
        if (currentMatch.length >= 3) {
          matches.push({
            candies: [...currentMatch],
            direction: 'horizontal',
          });
        }
        currentMatch = candy ? [candy] : [];
        currentType = candy ? candy.type : '';
      }
    }
    
    if (currentMatch.length >= 3) {
      matches.push({
        candies: [...currentMatch],
        direction: 'horizontal',
      });
    }
  }
  
  // Check vertical matches
  for (let col = 0; col < 8; col++) {
    let currentMatch = [];
    let currentType = '';
    
    for (let row = 0; row < 8; row++) {
      const candy = board[row][col];
      
      if (candy && candy.type === currentType) {
        currentMatch.push(candy);
      } else {
        if (currentMatch.length >= 3) {
          matches.push({
            candies: [...currentMatch],
            direction: 'vertical',
          });
        }
        currentMatch = candy ? [candy] : [];
        currentType = candy ? candy.type : '';
      }
    }
    
    if (currentMatch.length >= 3) {
      matches.push({
        candies: [...currentMatch],
        direction: 'vertical',
      });
    }
  }
  
  return matches;
};

export const removeMatches = (board, matches) => {
  const newBoard = board.map(row => [...row]);
  
  matches.forEach(match => {
    match.candies.forEach(candy => {
      newBoard[candy.row][candy.col] = null;
    });
  });
  
  return newBoard;
};

export const canSwap = (board, row1, col1, row2, col2) => {
  // Check if positions are adjacent
  const rowDiff = Math.abs(row1 - row2);
  const colDiff = Math.abs(col1 - col2);
  
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};

export const wouldCreateMatch = (board, row1, col1, row2, col2) => {
  // Simulate the swap
  const tempBoard = board.map(row => [...row]);
  const temp = tempBoard[row1][col1];
  tempBoard[row1][col1] = tempBoard[row2][col2];
  tempBoard[row2][col2] = temp;
  
  // Update positions
  if (tempBoard[row1][col1]) {
    tempBoard[row1][col1].row = row1;
    tempBoard[row1][col1].col = col1;
  }
  if (tempBoard[row2][col2]) {
    tempBoard[row2][col2].row = row2;
    tempBoard[row2][col2].col = col2;
  }
  
  // Check if this creates any matches
  const matches = findMatches(tempBoard);
  return matches.length > 0;
};