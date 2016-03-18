var DOWN, FPS, KEY, LEFT, MSPF, RIGHT, SPACE, UP, ctx, enemies, hitTo, mainLoop, player, screenCanvas;

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

mainLoop = function() {
  var bullet, deltaTime, enemy, interval, j, k, l, len, len1, len2, ref, startTime;
  startTime = new Date();
  player.move();
  player.shot();
  player.reDraw();
  for (j = 0, len = enemies.length; j < len; j++) {
    enemy = enemies[j];
    if (!enemy.isAlive) {
      continue;
    }
    enemy.move();
    enemy.draw();
  }
  if (player.isAlive) {
    for (k = 0, len1 = enemies.length; k < len1; k++) {
      enemy = enemies[k];
      if (!enemy.isAlive) {
        continue;
      }
      if (hitTo(player.x, player.y, player.img, enemy.x, enemy.y, enemy.img)) {
        player.isAlive = false;
        enemy.isAlive = false;
      }
      ref = player.bullets;
      for (l = 0, len2 = ref.length; l < len2; l++) {
        bullet = ref[l];
        if (bullet.isDraw) {
          if (hitTo(bullet.x, bullet.y, bullet.img, enemy.x, enemy.y, enemy.img)) {
            bullet.isDraw = false;
            enemy.isAlive = false;
          }
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

hitTo = function(x1, y1, img1, x2, y2, img2) {
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
  var SCREEN_HEIGHT, SCREEN_WIDTH, i, j;
  SCREEN_WIDTH = 800;
  SCREEN_HEIGHT = 500;
  screenCanvas = $("canvas#screen")[0];
  screenCanvas.width = SCREEN_WIDTH;
  screenCanvas.height = SCREEN_HEIGHT;
  ctx = screenCanvas.getContext('2d');
  player = new Player(screenCanvas.width, screenCanvas.height);
  enemies = new Array(5);
  for (i = j = 0; j <= 9; i = ++j) {
    enemies[i] = new Enemy(screenCanvas.width, screenCanvas.height);
  }
  return mainLoop();
};

window.onkeydown = function(e) {
  return KEY[e.keyCode] = true;
};

window.onkeyup = function(e) {
  return KEY[e.keyCode] = false;
};
