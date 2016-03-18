var Enemy,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Enemy = (function(superClass) {
  extend(Enemy, superClass);

  function Enemy(canvasWidth, canvasHeight) {
    Enemy.__super__.constructor.call(this, "assets/img/enemy.png", 0, 0, 5, canvasWidth, canvasHeight);
    this.initializePosition();
  }

  Enemy.prototype.move = function() {
    this.down();
    if (this.isOutsideOfCanvasHeight()) {
      return this.setPosition(Math.random() * this.canvasWidth - this.img.width, -this.img.height);
    }
  };

  Enemy.prototype.initializePosition = function() {
    return this.setPosition(Math.random() * this.canvasWidth - this.img.width, Math.random() * this.canvasHeight - this.img.height);
  };

  Enemy.prototype.draw = function() {
    if (this.isAlive) {
      return ctx.drawImage(this.img, this.x, this.y);
    }
  };

  return Enemy;

})(Actor);
