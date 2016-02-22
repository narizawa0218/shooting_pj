(function() {
  var DOWN, FPS, KEY, LEFT, MSPF, RIGHT, UP, ctx, mainLoop, movePlayer, playerImage, playerX, playerY, reDraw, screenCanvas;

  screenCanvas = this;

  ctx = this;

  playerImage = this;

  playerX = this;

  playerY = this;

  FPS = 60;

  MSPF = 1000 / FPS;

  LEFT = 37;

  RIGHT = 39;

  UP = 38;

  DOWN = 40;

  KEY = {
    LEFT: false,
    RIGHT: false,
    UP: false,
    DOWN: false
  };

  movePlayer = function() {
    var SPEED;
    SPEED = 2;
    if (KEY[RIGHT] && playerX + playerImage.width < screenCanvas.width) {
      playerX += SPEED;
    }
    if (KEY[LEFT] && playerX > 0) {
      playerX -= SPEED;
    }
    if (KEY[UP] && playerY > 0) {
      playerY -= SPEED;
    }
    if (KEY[DOWN] && playerY + playerImage.height < screenCanvas.height) {
      return playerY += SPEED;
    }
  };

  mainLoop = function() {
    var deltaTime, interval, startTime;
    startTime = new Date();
    movePlayer();
    reDraw();
    deltaTime = (new Date()) - startTime;
    interval = MSPF - deltaTime;
    if (interval > 0) {
      return setTimeout(mainLoop, interval);
    } else {
      return mainLoop();
    }
  };

  window.onload = function() {
    var SCREEN_HEIGHT, SCREEN_WIDTH;
    SCREEN_WIDTH = 800;
    SCREEN_HEIGHT = 500;
    screenCanvas = $("canvas#screen")[0];
    screenCanvas.width = SCREEN_WIDTH;
    screenCanvas.height = SCREEN_HEIGHT;
    ctx = screenCanvas.getContext('2d');
    playerImage = new Image();
    playerImage.src = "assets/img/player.png";
    playerX = (screenCanvas.width - playerImage.width) / 2;
    playerY = (screenCanvas.height - playerImage.height) - 20;
    ctx.drawImage(playerImage, playerX, playerY);
    return mainLoop();
  };

  window.onkeydown = function(key) {
    return KEY[key.keyCode] = true;
  };

  window.onkeyup = function(key) {
    return KEY[key.keyCode] = false;
  };

  reDraw = function() {
    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
    return ctx.drawImage(playerImage, playerX, playerY);
  };

}).call(this);
