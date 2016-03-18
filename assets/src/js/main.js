var DOWN, FPS, KEY, LEFT, MSPF, RIGHT, SPACE, UP, ctx, enemy, hitCheck, mainLoop, player, screenCanvas;

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
  var bullet, deltaTime, i, interval, len, ref, startTime;
  startTime = new Date();
  player.move();
  player.shot();
  player.reDraw();
  enemy.move();
  enemy.draw();
  if (player.isAlive && enemy.isAlive) {
    if (hitCheck(player.x, player.y, player.img, enemy.x, enemy.y, enemy.img)) {
      player.isAlive = false;
      enemy.isAlive = false;
    }
    ref = player.bullets;
    for (i = 0, len = ref.length; i < len; i++) {
      bullet = ref[i];
      if (bullet.isAlive) {
        if (hitCheck(bullet.x, bullet.y, bullet.img, enemy.x, enemy.y, enemy.img)) {
          bullet.isAlive = false;
          enemy.isAlive = false;
        }
      }
    }
  }
  deltaTime = (new Date()) - startTime;
  interval = MSPF - deltaTime;
  if (interval > 0) {
    return setTimeout(mainLoop, interval);
  } else {
    return mainLoop();
  }
};

hitCheck = function(x1, y1, img1, x2, y2, img2) {
  var cx1, cx2, cy1, cy2, d, r1, r2;
  cx1 = x1 + img1.width / 2;
  cy1 = y1 + img1.height / 2;
  cx2 = x2 + img2.width / 2;
  cy2 = y2 + img2.height / 2;
  r1 = (img1.width + img1.height) / 4;
  r2 = (img2.width + img2.height) / 4;
  d = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
  return r1 + r2 > d;
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
