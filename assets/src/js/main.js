(function() {
  var Bullet, DOWN, FPS, KEY, LEFT, MSPF, Player, RIGHT, SPACE, UP, bulletImage, ctx, mainLoop, player, playerImage, screenCanvas,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  screenCanvas = this;

  ctx = this;

  playerImage = this;

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

  bulletImage = this;

  mainLoop = function() {
    var deltaTime, interval, startTime;
    startTime = new Date();
    player.move();
    player.shot();
    player.reDraw();
    deltaTime = (new Date()) - startTime;
    interval = MSPF - deltaTime;
    if (interval > 0) {
      return setTimeout(mainLoop, interval);
    } else {
      return mainLoop();
    }
  };

  window.onload = function() {
    var SCREEN_HEIGHT, SCREEN_WIDTH, playerX, playerY;
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
    player = new Player(playerX, playerY);
    player.reDraw();
    bulletImage = new Image();
    bulletImage.src = "assets/img/bullet.png";
    player.resetBullet();
    return mainLoop();
  };

  window.onkeydown = function(key) {
    return KEY[key.keyCode] = true;
  };

  window.onkeyup = function(key) {
    return KEY[key.keyCode] = false;
  };

  Player = (function() {
    function Player(x1, y1) {
      var i, j, ref;
      this.x = x1;
      this.y = y1;
      this.move = bind(this.move, this);
      this.speed = 4;
      this.magazine_size = 5;
      this.bullets = new Array(this.magazine_size);
      for (i = j = 0, ref = this.magazine_size; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        this.bullets[i] = new Bullet(this.x, this.y);
      }
    }

    Player.prototype.move = function() {
      if (KEY[RIGHT] && this.x + playerImage.width < screenCanvas.width) {
        this.x += this.speed;
      }
      if (KEY[LEFT] && this.x > 0) {
        this.x -= this.speed;
      }
      if (KEY[UP] && this.y > 0) {
        this.y -= this.speed;
      }
      if (KEY[DOWN] && this.y + playerImage.height < screenCanvas.height) {
        return this.y += this.speed;
      }
    };

    Player.prototype.shot = function() {
      var i, j, k, l, ref, ref1, ref2, results;
      for (i = j = 0, ref = this.magazine_size; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        if (KEY[SPACE]) {
          if (!this.bullets[i].initializePosition(this.x, this.y)) {
            break;
          }
        }
      }
      for (i = k = 0, ref1 = this.magazine_size; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
        if (this.bullets[i].hp <= 0) {
          continue;
        }
        this.bullets[i].move();
      }
      results = [];
      for (i = l = 0, ref2 = this.magazine_size; 0 <= ref2 ? l <= ref2 : l >= ref2; i = 0 <= ref2 ? ++l : --l) {
        if (this.bullets[i].hp > 0) {
          results.push(this.bullets[i].draw());
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    Player.prototype.reDraw = function() {
      var i, j, ref, results;
      ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
      ctx.drawImage(playerImage, this.x, this.y);
      results = [];
      for (i = j = 0, ref = this.magazine_size; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        results.push(this.bullets[i].draw());
      }
      return results;
    };

    Player.prototype.resetBullet = function() {
      var i, j, ref, results;
      results = [];
      for (i = j = 0, ref = this.magazine_size; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        this.bullets[i].x = 0;
        this.bullets[i].y = 0;
        results.push(this.bullets[i].hp = 0);
      }
      return results;
    };

    return Player;

  })();

  Bullet = (function() {
    function Bullet(x1, y1) {
      this.x = x1;
      this.y = y1;
      this.speed = 6;
      this.hp = 0;
    }

    Bullet.prototype.move = function() {
      this.y -= this.speed;
      if (this.y < bulletImage.height) {
        return this.hp = 0;
      }
    };

    Bullet.prototype.initializePosition = function(x, y) {
      if (this.hp === 0) {
        this.x = x;
        this.y = y;
        this.hp = 1;
        return false;
      } else {
        return true;
      }
    };

    Bullet.prototype.draw = function() {
      if (this.hp > 0) {
        return ctx.drawImage(bulletImage, this.x, this.y);
      }
    };

    return Bullet;

  })();

}).call(this);
