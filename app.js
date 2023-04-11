//board
const blockSize = 25;
const rows = 18;
const columns = 18;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// snake speed
let velocityX = 0;
let velocityY = 0;

// snake body
let snakeBody = [];
//score
let score = 0;

window.onload = () => {
  board = document.querySelector("#board");
  board.height = rows * blockSize;
  board.width = columns * blockSize;
  context = board.getContext("2d");

  foodLocation();
  document.addEventListener("keyup", handleKeyPress);
  //update
  setInterval(update, 1200 / 10);
};

const update = () => {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "brown";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  // food eating
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]); //grow where food was
    foodLocation();
    //score++;
    //displayScore.innerHTML = score;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
};
const foodLocation = () => {
  // returns num 0-1 * col/row (18) floor gives whole number * blovkSize
  foodX = Math.floor(Math.random() * columns) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
};

const handleKeyPress = (event) => {
  if (event.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
  if (event.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
  if (event.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  if (event.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};
