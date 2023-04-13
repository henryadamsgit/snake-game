//SETTING VARIABLES

//draw board and set canvas
const rows = 18;
const columns = 18;
const blockSize = 22;
let board;
let context;

// snake head starting position
let snakeHeadX = blockSize * 5;
let snakeHeadY = blockSize * 5;

// snake speed
let velocityX = 0;
let velocityY = 0;

// snake body
let snakeBodyArr = [];

// keep track of scores
let score = 0;
let highScore = 0;

// game update rate
let updateInterval;

//FUNCTIONS
window.onload = () => {
  board = document.querySelector("#board");
  board.height = rows * blockSize;
  board.width = columns * blockSize;
  context = board.getContext("2d");

  foodLocation();

  document.addEventListener("keyup", handleKeyPress);
  updateInterval = setInterval(() => {
    update();
    handleGameOver();
  }, 110);
};

const update = () => {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);
  context.fillStyle = "brown";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  // food eating
  if (snakeHeadX == foodX && snakeHeadY == foodY) {
    snakeBodyArr.push([foodX, foodY]); //grow where food was
    foodLocation();
    const eatSound = document.getElementById("eatSound");
    playEatSound();
    score++;
    if (score > highScore) {
      highScore = score;
      const highScoreElement = document.querySelector("#highScore");
      highScoreElement.innerHTML = highScore;
    }
    let displayScore = document.querySelector("#displayScore");
    displayScore.innerHTML = score;
  }

  // Important
  if (snakeBodyArr.length) {
    snakeBodyArr[0] = [snakeHeadX, snakeHeadY];
  }
  for (let i = snakeBodyArr.length - 1; i > 0; i--) {
    snakeBodyArr[i] = snakeBodyArr[i - 1];
  }
  context.fillStyle = "lime";
  snakeHeadX += velocityX * blockSize;
  snakeHeadY += velocityY * blockSize;
  context.fillRect(snakeHeadX, snakeHeadY, blockSize, blockSize);
  for (let i = 0; i < snakeBodyArr.length; i++) {
    context.fillRect(
      snakeBodyArr[i][0],
      snakeBodyArr[i][1],
      blockSize,
      blockSize
    );
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
    snakeHeadX < 0 ||
    snakeHeadX >= board.width ||
    snakeHeadY < 0 ||
    snakeHeadY >= board.height
  ) {
    clearInterval(updateInterval);
    playGameOverSound();
    showGameOverScreen(true);
  }
  // Check if snake hits its own body
  for (let i = 0; i < snakeBodyArr.length; i++) {
    if (
      snakeHeadX === snakeBodyArr[i][0] &&
      snakeHeadY === snakeBodyArr[i][1]
    ) {
      clearInterval(updateInterval);
      const gameOverSound = document.getElementById("gameOverSound");
      playGameOverSound();
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
  snakeHeadX = blockSize * 5;
  snakeHeadY = blockSize * 5;
  velocityX = 0;
  velocityY = 0;
  snakeBodyArr = [];
  score = 0;
  window.onload();
};

const playEatSound = () => {
  eatSound.currentTime = 0;
  eatSound.play();
};

const playGameOverSound = () => {
  gameOverSound.currentTime = 0;
  gameOverSound.play();
};
