var DOWN, FPS, KEY, LEFT, MSPF, RIGHT, SPACE, UP, ctx, enemies, mainLoop, player, screenCanvas, timer;

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

enemies = this;

timer = 0;

mainLoop = function() {
  var deltaTime, interval, startTime;
  startTime = new Date();
  player.move();
  player.shot();
  player.reDraw();
  enemies.move();
  enemies.draw();
  if (player.isAlive) {
    enemies.hitTo(player);
    player.bullets.hitTo(enemies);
  }
  deltaTime = (new Date()) - startTime;
  interval = MSPF - deltaTime;
  timer++;
  if (interval > 0) {
    return setTimeout(mainLoop, interval);
  } else {
    return mainLoop();
  }
};

window.onload = function() {
  screenCanvas = $("canvas#screen")[0];
  screenCanvas.width = 800;
  screenCanvas.height = 500;
  ctx = screenCanvas.getContext('2d');
  player = new Player(screenCanvas.width, screenCanvas.height);
  enemies = new Enemies(5, screenCanvas.width, screenCanvas.height);
  return mainLoop();
};

window.onkeydown = function(e) {
  return KEY[e.keyCode] = true;
};

window.onkeyup = function(e) {
  return KEY[e.keyCode] = false;
};
