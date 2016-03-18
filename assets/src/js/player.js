var Player,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Player = (function(superClass) {
  var _coolDown, _initializeBullets, _setFireInterval;

  extend(Player, superClass);

  function Player(canvasWidth, canvasHeight) {
    this.move = bind(this.move, this);
    Player.__super__.constructor.call(this, "assets/img/player.png", 0, 0, 10, canvasWidth, canvasHeight);
    this.speed = 10;
    this.magazine_size = 5;
    this.bullets = new Array(this.magazine_size);
    this.setPosition(this.xCenter(), this.yCenter());
    _setFireInterval.call(this, 0);
    _initializeBullets.call(this);
  }

  Player.prototype.move = function() {
    if (KEY[RIGHT] && this.isInsideOfCanvasWidth()) {
      this.right();
    }
    if (KEY[LEFT] && this.x > 0) {
      this.left();
    }
    if (KEY[UP] && this.y > 0) {
      this.up();
    }
    if (KEY[DOWN] && this.isInsideOfCanvasHeight()) {
      return this.down();
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
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
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

})(Actor);
