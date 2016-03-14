var Player,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Player = (function() {
  var _coolDown, _down, _initializeBullets, _left, _right, _setFireInterval, _up;

  function Player(canvas_width, canvas_height) {
    this.move = bind(this.move, this);
    this.img = new Image();
    this.img.src = "assets/img/player.png";
    this.x = (canvas_width - this.img.width) / 2;
    this.y = (canvas_height - this.img.height) - 20;
    this.speed = 10;
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
