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
    return mainLoop();
  };

  window.onkeydown = function(key) {
    return KEY[key.keyCode] = true;
  };

  window.onkeyup = function(key) {
    return KEY[key.keyCode] = false;
  };

  Player = (function() {
    function Player(x, y) {
      this.x = x;
      this.y = y;
      this.move = bind(this.move, this);
      this.speed = 4;
      this.bullet = new Bullet(this.x, this.y);
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
      if (KEY[SPACE]) {
        this.bullet.set();
      }
      this.bullet.move();
      if (this.bullet.hp > 0) {
        return this.bullet.draw();
      }
    };

    Player.prototype.reDraw = function() {
      ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
      ctx.drawImage(playerImage, this.x, this.y);
      return this.bullet.draw();
    };

    return Player;

  })();

  Bullet = (function() {
    function Bullet(x, y) {
      this.x = x;
      this.y = y;
      this.speed = 6;
      this.hp = 0;
    }

    Bullet.prototype.move = function() {
      this.y -= this.speed;
      if (this.y < bulletImage.height) {
        return this.hp = 0;
      }
    };

    Bullet.prototype.set = function() {
      if (this.hp === 0) {
        this.x = player.x;
        this.y = player.y;
        return this.hp = 1;
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
