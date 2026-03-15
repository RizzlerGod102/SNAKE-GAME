
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board; 
var context;


//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 1;
var velocityY = 0;

var snakeBody = [];

//food
var foodX = blockSize * 10;
var foodY = blockSize * 10;

//Game over indicator
var gameOver = false;

//Initialization on page load
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placefood();
    document.addEventListener("keydown", changeDirection);
    //update();
    setInterval(update, 100); //100 milliseconds

}

//Update function
function update() {
    if(gameOver) {
        return;
    }

    //Clear the board
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    //Draw the food
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Check if snake eats the food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placefood();
    }

    //Move the snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle="lightgreen";

    //Move the snake head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        alert("Game Over")
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");

             }
        }
    }

//Change Direction
function changeDirection(e){
    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

//Place Food
function placefood() {
    //0-1 number returns 
    foodX = Math.floor(Math.random() * (cols-2) + 1) * blockSize;
    foodY = Math.floor(Math.random() * (rows - 2) + 1) * blockSize;
}