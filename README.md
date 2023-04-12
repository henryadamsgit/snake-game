--Snake Game Project--
This is a simple implementation of the classic Snake game using JavaScript, HTML Canvas and some additional CSS stylings.

--Game Mechanics--
The objective of the game is to control the snake to eat as much food as possible without hitting the walls or its own body. The game ends if the snake hits the wall or its own body. The player can control the direction of the snake using the arrow keys on the keyboard.

--CODE OVERVIEW--

Part 1. Creating the board, snake, and food.

    BOARD--
    My game board/canvas is represented by a two-dimensional canvas, which is created using HTML5 Canvas. The blockSize, rows, columns, board, and context variables are used to set the board dimensions and draw the canvas.
    I accessed the canvas using an id, then called the getContext() method on the canvas element. The getContext() method takes a string argument that specifies the type of context to create, in this case 2D drawing context.

    SNAKE--
    The snake is represented by the snakeX and snakeY variables, which represent the position of the snake's head on the canvas. The velocityX and velocityY variables are used to control the direction of the snake's movement. The snakeBody array is used to keep track of the location of the snake's body segments on the canvas

    FOOD--
    The food is represented by the foodX and foodY variables, which are randomly generated within the board dimensions using the foodLocation() function.

Part 2. Functions 
    1. window.onload() – This function sets up the game board and initializes some variables when the window loads. It does the following: - Finds the HTML element with the ID "board" and sets its height and width based on the number of rows and columns and the size of each block. - Gets the 2D rendering context of the canvas element using the getContext() method. - Calls the foodLocation() function to randomly place the game's food on the board. - Adds an event listener to the document for the "keyup" event, which will call the handleKeyPress() function when a key is released. - Sets up a loop to update the game state every 120 milliseconds using the setInterval() method.

    2.	update () --. This function updates the canvas on each iteration in a loop, so the changing position of the snake and food are displayed. It does the following:
    -	Firstly it sets the canvas background colour to black and fills in the canvas area.
    -	Draws a brown square on the canvas to represent the game's food at the position (foodX, foodY).
    -	In a conditional statement, the function should check if the snake's head is at the same position as the food (snake eats).  If condition is met, the snake grows by adding a new block to its body at the position of the food using  .push to add to the snakeBody array.. It then generates a new food location.
    -	Each time the snake eats, the function increments the players score variable and updates the score display on the HTML page.
    -	Draws the snake’s head as a green square on the canvas. Also dictates that the snakes velocity should cover the distance on one blocksize per update so the movement is swift.
    -	Then, it Iterates over the snake's body array and draws each additional block as a green square on the canvas.
    -	Finally, if the length of the snake's body is greater than zero, it updates the first block of the body to the position of the head so that the body array updates to follow the snake head.


    3.	foodLocation () -- This function generates a random location for the game's food within the game board. It is called when the game is loaded, restarted, and when the snake eats (snake location == food location).
    -	When the function is called,  two built in JS methods, Math.random and Math.floor, return a random number between 0-1.  Floor rounds the randomly generated floating number down to a whole number. The resulting column and row indices and multiplied by the size of each block (blockSize) to obtain the x and y coordinates of the food's position.

    4.	handleKeyPress () -- This function handles the user's keyboard input and updates the snake's direction accordingly. The function Checks the “event.code”  JS property to determine which arrow key was pressed. Using conditional if statements, the snakes head will move based on the direction key that is pressed. The snake cannot move in the opposite direction it is currently moving in as this would end the game. The values I applied to the velocity variables within the statements. In Canvas, movement Up/Left is achieved by a negative velocity and Down/Right by a positive velocity for both X and Y values. The velocityX and velocityY variables store the current velocity of the snake in the x and y directions, respectively. These are used in the update function to move the snake's head in the correct direction.

    5.	handleGameover () -- This function handles the conditions for the game ending using conditional statements and a for loop. It uses clearInterval() to stop the updateInterval loop set by the setInterval() method in the window.onload function.
    If the snake hits the wall, it stops the game and shows the game over screen with a true value. If the snake hits its own body, it stops the game and shows the game over screen with a false value. These values are displayed because of the different messages I wish to display for each of the two outcomes that end the game.

    6.	showGameOverScreen () -- This function will show the game over screen with either a positive or negative value. This is because it takes a boolean parameter ‘hitWall’ which is true if the snake hits the wall, false otherwise. I wanted to use this ternary operator in order to display 2 different game over messages.
    To do this,  the function accesses the game over screen element from the HTML document using a query selector. It then selects the paragraph element inside the game over screen <div> and sets its innerText to the appropriate message based on the outcome of the game.
    
    7.	restartGame() -- This function resets the game when the user clicks the "Restart" button after losing. It does this by hiding the game over screen, resetting the initial position and velocity of the snake, clearing the snake body, setting the score to zero, and calling the window.onload() function to start a new game.
