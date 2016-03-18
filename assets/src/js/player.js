var Player,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Player = (function(superClass) {
  var MAGAZINE_SIZE;

  extend(Player, superClass);

  MAGAZINE_SIZE = 5;

  function Player(canvasWidth, canvasHeight) {
    this.move = bind(this.move, this);
    Player.__super__.constructor.call(this, "assets/img/player.png", 0, 0, 10, canvasWidth, canvasHeight);
    this.speed = 10;
    this.bullets = new Bullets(MAGAZINE_SIZE, canvasWidth, canvasHeight);
    this.setPosition(this.xCanvasCenter(), this.yCanvasCenter());
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
    return this.bullets.shoot(this.x + this.img.width / 4, this.y);
  };

  Player.prototype.reDraw = function() {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    if (this.isAlive) {
      ctx.drawImage(this.img, this.x, this.y);
    }
    return this.bullets.draw();
  };

  Player.prototype.xCanvasCenter = function() {
    return (this.canvasWidth - this.img.width) / 2;
  };

  Player.prototype.yCanvasCenter = function() {
    return (this.canvasHeight - this.img.height) - 20;
  };

  return Player;

})(Actor);
