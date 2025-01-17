const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const tileSize = 30;
const rows = 20;
const cols = 20;

// Player and Goal
let player = { x: 0, y: 0, size: tileSize - 4 };
let goal = { x: cols - 1, y: rows - 1, size: tileSize - 4 };

// Maze Layout
const maze = [
    "11111111111111111111",
    "10000000001111111111",
    "10111111001111111111",
    "10000001000000000001",
    "10111111101111111001",
    "10111111101111111001",
    "10000000000000001001",
    "11110111111101111001",
    "11110000000001111001",
    "11110111111100001001",
    "11110100000000001001",
    "10000101111111111001",
    "10111101111111111001",
    "10100000000000000001",
    "10101111110111111001",
    "10100000110000001001",
    "10101111111111101001",
    "10000000000000000001",
    "11111111111111111101",
    "11111111111111111111",
];

// Draw Functions
function drawMaze() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (maze[row][col] === "1") {
                ctx.fillStyle = "#444";
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x * tileSize + 2, player.y * tileSize + 2, player.size, player.size);
}

function drawGoal() {
    ctx.fillStyle = "limegreen";
    ctx.fillRect(goal.x * tileSize + 2, goal.y * tileSize + 2, goal.size, goal.size);
}

// Game Logic
function checkCollision(x, y) {
    return maze[y]?.[x] === "1";
}

function checkWin() {
    if (player.x === goal.x && player.y === goal.y) {
        alert("Congratulations! You completed the maze!");
        resetGame();
    }
}

function resetGame() {
    player.x = 0;
    player.y = 0;
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawPlayer();
    drawGoal();
}

// Movement
function movePlayer(direction) {
    let newX = player.x;
    let newY = player.y;

    if (direction === "ArrowUp") newY--;
    if (direction === "ArrowDown") newY++;
    if (direction === "ArrowLeft") newX--;
    if (direction === "ArrowRight") newX++;

    // Ensure the new position is within bounds and doesn't hit a wall
    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && !checkCollision(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }

    draw();
    checkWin();
}

// Add Event Listener
document.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        movePlayer(e.key);
    }
});

// Initialize Game
draw();
