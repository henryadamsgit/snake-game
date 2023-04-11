//board
const blockSize = 25;
const rows = 18;
const columns = 18;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

// food

window.onload = () => {
  board = document.querySelector("#board");
  board.height = rows * blockSize;
  board.width = columns * blockSize;
  context = board.getContext("2d");

  foodLocation();
  document.addEventListener("keyup", handleKeyPress);
  //update
  setInterval(update, 1500 / 10);
};

const update = () => {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "brown";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
};

const foodLocation = () => {
  // returns num 0-1 * col/row (18) floor gives whole number * blovkSize
  foodX = Math.floor(Math.random() * columns) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
};

const handleKeyPress = (event) => {
  if (event.code == "ArrowUp") {
    velocityX = 0;
    velocityY = -1;
  }
  if (event.code == "ArrowDown") {
    velocityX = 0;
    velocityY = 1;
  }
  if (event.code == "ArrowLeft") {
    velocityX = -1;
    velocityY = 0;
  }
  if (event.code == "ArrowRight") {
    velocityX = 1;
    velocityY = 0;
  }
};
