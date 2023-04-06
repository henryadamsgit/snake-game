const backgroundScreen = document.querySelector("#background");
const gameScreen = document.querySelector("#board");
const snake = document.querySelector(".snake");
const displayScore = document.querySelector(".scoreDisplay");

const keyPressed = document.querySelectorAll(".key");
const playButton = document.querySelector(".buttons__play");
const resetButton = document.querySelector(".buttons__reset");

let direction = "right";
// snakey
let snakeArr = [];
const startingLength = 3;
// loop to increase snake size by 1
for (let i = 0; i < startingLength; i++) {
  snakeArr.push({ x: i, y: 0 });
}
// fucntion to display snake on screen
const displaySnake = () => {
  for (let i = 0; i < startingLength; i++) {}
};

//FUNCTIONS

const handleKeyPress = (event) => {
  if (event.key == "up" && direction !== "up") {
    return direction == "up";
  } else if (event.key == "down" && direction !== "down") {
    return direction == "down";
  } else if (event.key == "left" && direction !== "left") {
    return direction == "left";
  } else if (event.key == "right" && direction !== "right") {
    return direction == "right";
  }
};

const handleStartGame = (event) => {};

const handleResetGame = (event) => {
  if (event.target === resetButton) {
    location.reload();
  }
};

// EVENT LISTENERS
for (let i = 0; i < keyPressed.length; i++) {
  keyPressed[i].addEventListener("keypress", handleKeyPress);
}
playButton.addEventListener("click", handleStartGame);
resetButton.addEventListener("click", handleResetGame);
