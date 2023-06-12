// ゲームの設定
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var gridSize = 10;
var snake = [{x: 0, y: 0}];
var food = {x: 0, y: 0};
var direction = "right";
var score = 0;

// キーボード入力の処理
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 37 && direction != "right") {
    direction = "left";
  } else if (event.keyCode == 38 && direction != "down") {
    direction = "up";
  } else if (event.keyCode == 39 && direction != "left") {
    direction = "right";
  } else if (event.keyCode == 40 && direction != "up") {
    direction = "down";
  }
});

// スネークの移動と描画
function moveSnake() {
  var head = {x: snake[0].x, y: snake[0].y};
  if (direction == "left") {
    head.x -= gridSize;
  } else if (direction == "up") {
    head.y -= gridSize;
  } else if (direction == "right") {
    head.x += gridSize;
  } else if (direction == "down") {
    head.y += gridSize;
  }
  snake.unshift(head);
  if (head.x == food.x && head.y == food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
  drawSnake();
}

// 食べ物の生成と描画
function generateFood() {
  food.x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
  food.y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
  drawFood();
}

// スネークと食べ物の描画
function drawSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  for (var i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
  }
  drawFood();
  document.getElementById("score").innerHTML = "Score: " + score;
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// ゲームループ
function gameLoop() {
  moveSnake();
  if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
    alert("Game over!");
    location.reload();
  }
  for (var i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      alert("Game over!");
      location.reload();
    }
  }
  var waitTime = 100 - score * 20;
  setTimeout(gameLoop, waitTime);
}

// ゲームの開始
generateFood();
gameLoop();
