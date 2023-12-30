const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 20;
let snake = [{ x: 100, y: 100 }];
let direction = { x: cellSize, y: 0 };
let food = { x: 300, y: 300 };

function drawSnakePart(snakePart) {
    ctx.fillStyle = 'green';
    ctx.fillRect(snakePart.x, snakePart.y, cellSize, cellSize);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        placeFood();
    } else {
        snake.pop();
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / cellSize)) * cellSize;
    food.y = Math.floor(Math.random() * (canvas.height / cellSize)) * cellSize;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, cellSize, cellSize);
}

function update() {
    moveSnake();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp': direction = { x: 0, y: -cellSize }; break;
        case 'ArrowDown': direction = { x: 0, y: cellSize }; break;
        case 'ArrowLeft': direction = { x: -cellSize, y: 0 }; break;
        case 'ArrowRight': direction = { x: cellSize, y: 0 }; break;
    }
});

setInterval(update, 200);
placeFood();
