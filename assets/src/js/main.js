var DOWN, FPS, KEY, LEFT, MSPF, RIGHT, SPACE, UP, ctx, enemy, mainLoop, player, screenCanvas;

screenCanvas = this;

ctx = this;

player = this;

FPS = 60;

MSPF = 1000 / FPS;

SPACE = 32;

LEFT = 37;

RIGHT = 39;

UP = 38;

DOWN = 40;

KEY = {
  SPACE: false,
  LEFT: false,
  RIGHT: false,
  UP: false,
  DOWN: false
};

enemy = this;

mainLoop = function() {
  var deltaTime, interval, startTime;
  startTime = new Date();
  player.move();
  player.shot();
  player.reDraw();
  enemy.move();
  enemy.draw();
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
  player = new Player(screenCanvas.width, screenCanvas.height);
  enemy = new Enemy(screenCanvas.width, screenCanvas.height);
  return mainLoop();
};

window.onkeydown = function(e) {
  return KEY[e.keyCode] = true;
};

window.onkeyup = function(e) {
  return KEY[e.keyCode] = false;
};
