(function() {
  var DOWN, FPS, KEY, LEFT, MSPF, Player, RIGHT, UP, ctx, mainLoop, player, playerImage, screenCanvas,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  screenCanvas = this;

  ctx = this;

  playerImage = this;

  player = this;

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

  mainLoop = function(x, y) {
    var deltaTime, interval, startTime;
    startTime = new Date();
    player.move();
    player.reDraw();
    deltaTime = (new Date()) - startTime;
    interval = MSPF - deltaTime;
    if (interval > 0) {
      return setTimeout(mainLoop, interval);
    } else {
      return mainLoop(player);
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
    return mainLoop(player.x, player.y);
  };

  window.onkeydown = function(key) {
    return KEY[key.keyCode] = true;
  };

  window.onkeyup = function(key) {
    return KEY[key.keyCode] = false;
  };

  Player = (function() {
    function Player(x1, y1) {
      this.x = x1;
      this.y = y1;
      this.move = bind(this.move, this);
      this.speed = 4;
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

    Player.prototype.reDraw = function() {
      ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
      return ctx.drawImage(playerImage, this.x, this.y);
    };

    return Player;

  })();

}).call(this);
