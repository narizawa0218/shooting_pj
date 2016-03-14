var Bullet, DOWN, Enemy, FPS, KEY, LEFT, MSPF, Player, RIGHT, SPACE, UP, ctx, enemy, mainLoop, player, screenCanvas,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
    count++;
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
  player.reDraw();
  player.resetBullet();
  enemy = new Enemy(screenCanvas.width, screenCanvas.height);
  enemy.draw();
  return mainLoop();
};

window.onkeydown = function(e) {
  return KEY[e.keyCode] = true;
};

window.onkeyup = function(e) {
  return KEY[e.keyCode] = false;
};

Player = (function() {
  var _coolDown, _down, _initializeBullets, _left, _right, _setFireInterval, _up;

  function Player(canvas_width, canvas_height) {
    this.move = bind(this.move, this);
    this.img = new Image();
    this.img.src = "assets/img/player.png";
    this.x = (canvas_width - this.img.width) / 2;
    this.y = (canvas_height - this.img.height) - 20;
    this.speed = 4;
    this.magazine_size = 5;
    this.bullets = new Array(this.magazine_size);
    _setFireInterval.call(this, 0);
    _initializeBullets.call(this);
  }

  Player.prototype.move = function() {
    if (KEY[RIGHT] && this.x + this.img.width < screenCanvas.width) {
      _right.call(this);
    }
    if (KEY[LEFT] && this.x > 0) {
      _left.call(this);
    }
    if (KEY[UP] && this.y > 0) {
      _up.call(this);
    }
    if (KEY[DOWN] && this.y + this.img.height < screenCanvas.height) {
      return _down.call(this);
    }
  };

  Player.prototype.shot = function() {
    var i, j, ref;
    for (i = j = 0, ref = this.magazine_size; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (KEY[SPACE] && this.fireInterval === 0) {
        if (!this.bullets[i].initializePosition(this.x + this.img.width / 4, this.y - this.bullets[i].img.height)) {
          _setFireInterval.call(this, 20);
          break;
        }
      }
      if (!this.bullets[i].isDraw) {
        continue;
      }
      this.bullets[i].move();
      this.bullets[i].draw();
    }
    if (this.fireInterval > 0) {
      return _coolDown.call(this);
    }
  };

  Player.prototype.reDraw = function() {
    var i, j, ref, results;
    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
    ctx.drawImage(this.img, this.x, this.y);
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
      this.bullets[i].setPosition(0, 0);
      results.push(this.bullets[i].disabled());
    }
    return results;
  };

  _up = function() {
    return this.y -= this.speed;
  };

  _down = function() {
    return this.y += this.speed;
  };

  _right = function() {
    return this.x += this.speed;
  };

  _left = function() {
    return this.x -= this.speed;
  };

  _initializeBullets = function() {
    var i, j, ref, results;
    results = [];
    for (i = j = 0, ref = this.magazine_size; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      results.push(this.bullets[i] = new Bullet(this.x, this.y));
    }
    return results;
  };

  _setFireInterval = function(interval) {
    return this.fireInterval = interval;
  };

  _coolDown = function() {
    return this.fireInterval--;
  };

  return Player;

})();

Bullet = (function() {
  var _up;

  function Bullet(x1, y1) {
    this.x = x1;
    this.y = y1;
    this.img = new Image();
    this.img.src = "assets/img/bullet.png";
    this.speed = 6;
    this.fireInterval = 0;
    this.isDraw = false;
  }

  Bullet.prototype.move = function() {
    _up.call(this);
    if (this.y < this.img.height) {
      return this.isDraw = false;
    }
  };

  Bullet.prototype.initializePosition = function(x, y) {
    if (this.isDraw) {
      return true;
    }
    this.setPosition(x, y);
    this.enabled();
    return false;
  };

  Bullet.prototype.draw = function() {
    if (this.isDraw) {
      return ctx.drawImage(this.img, this.x, this.y);
    }
  };

  Bullet.prototype.setPosition = function(x, y) {
    this.x = x;
    return this.y = y;
  };

  Bullet.prototype.enabled = function() {
    return this.isDraw = true;
  };

  Bullet.prototype.disabled = function() {
    return this.isDraw = false;
  };

  _up = function() {
    return this.y -= this.speed;
  };

  return Bullet;

})();

Enemy = (function() {
  var _down, _left;

  function Enemy(canvas_width, canvas_height) {
    this.img = new Image();
    this.img.src = "assets/img/enemy.png";
    this.x = Math.random() * canvas_width - this.img.width;
    this.y = Math.random() * canvas_height - this.img.height;
    this.speed = 4;
  }

  Enemy.prototype.move = function() {
    _down.call(this);
    if (this.y > screenCanvas.height) {
      this.y = -this.img.height;
      return this.x = Math.random() * (screenCanvas.width - this.img.width);
    }
  };

  Enemy.prototype.initializePosition = function() {
    return this.setPosition(0, 0);
  };

  Enemy.prototype.draw = function() {
    return ctx.drawImage(this.img, this.x, this.y);
  };

  Enemy.prototype.setPosition = function(x, y) {
    this.x = x;
    return this.y = y;
  };

  _down = function() {
    return this.y += this.speed + 5;
  };

  _left = function() {
    return this.x -= this.speed - 10;
  };

  return Enemy;

})();
