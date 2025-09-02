
const candyTypes = ["🍬","🍭","🍫","🍪","🍩","🍎"];

export const generateBoard = (size = 8) => {
  const board = [];
  for (let i = 0; i < size * size; i++) {
    const randomCandy = candyTypes[Math.floor(Math.random() * candyTypes.length)];
    board.push(randomCandy);
  }
  return board;
};

export default candyTypes;
