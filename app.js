//board
const blockSize = 25;
const rows = 20;
const columns = 20;
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

let updateInterval;

window.onload = () => {
  board = document.querySelector("#board");
  board.height = rows * blockSize;
  board.width = columns * blockSize;
  context = board.getContext("2d");

  foodLocation();

  document.addEventListener("keyup", handleKeyPress);
  // Screen updates
  updateInterval = setInterval(() => {
    update();
    handleGameOver();
  }, 120);
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
  }
  // keep track of score
  let score = 0;
  let displayScore = document.querySelector("#displayScore");
  if (snakeX == foodX && snakeY == foodY) {
    score++;
    displayScore.innerHTML = score;
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
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
  // rounds down num 0-1 * col/row (20) floor gives whole number * blovkSize
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

const handleGameOver = () => {
  // Check if snake hits the wall
  if (
    snakeX < 0 ||
    snakeX >= board.width ||
    snakeY < 0 ||
    snakeY >= board.height
  ) {
    clearInterval(updateInterval);
    showGameOverScreen(true);
  }

  // Check if snake hits its own body
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      clearInterval(updateInterval);
      showGameOverScreen(false);
      break;
    }
  }
};

const showGameOverScreen = (hitWall) => {
  const gameOverScreen = document.querySelector("#game-over-screen");
  const message = hitWall ? "You hit the wall!" : "You ate yourself!";
  const messageElement = gameOverScreen.querySelector("p");
  messageElement.innerText = message;
  gameOverScreen.style.display = "block";
};

const restartGame = () => {
  const gameOverScreen = document.querySelector("#game-over-screen");
  gameOverScreen.style.display = "none";
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
  score = 0;
  window.onload();
};
