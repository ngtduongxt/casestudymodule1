let khoi = 25;
let cot = 20;
let hang = 20;
let bang;
let ctx;


let snakeX = khoi * 5;
let snakeY = khoi * 5;


let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

let score = 0;

let foodX;
let foodY;

let snakeSpeed = 0;
let scoreToSpeedUp = 5;

let gameOver = false;


window.onload = function () {
    bang = document.getElementById("myCanvas");
    bang.width = hang * khoi;
    bang.height = cot * khoi;
    ctx = bang.getContext("2d");


    placeFood();
    document.addEventListener("keyup", changeDirection);
    update();
    drawScore();
}

function update() {
    if (gameOver) {
        return;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, bang.width, bang.height);

    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, khoi, khoi);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += 1;
        if (score % scoreToSpeedUp === 0) {
            snakeSpeed++;
        }
    }
    drawScore();

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    ctx.fillStyle = 'lime';
    snakeX += velocityX * khoi;
    snakeY += velocityY * khoi;
    ctx.fillRect(snakeX, snakeY, khoi, khoi);
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], khoi, khoi);
    }

    if (snakeX < 0 || snakeX > cot * khoi || snakeY < 0 || snakeY > hang * khoi) {
        gameOver = true;
        alert("Game Over");
    }
    
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }

    setTimeout(function () {
        update();
    }, 1000 / (5 + snakeSpeed) );
}


function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cot) * khoi;
    foodY = Math.floor(Math.random() * hang) * khoi;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "15px Verdana";
    ctx.fillText("Điểm số: " + score, 10, 20);
}