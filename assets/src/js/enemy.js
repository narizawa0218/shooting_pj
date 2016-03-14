var Enemy,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Enemy = (function(superClass) {
  extend(Enemy, superClass);

  function Enemy(canvas_width, canvas_height) {
    this.img = new Image();
    this.img.src = "assets/img/enemy.png";
    this.x = Math.random() * canvas_width - this.img.width;
    this.y = Math.random() * canvas_height - this.img.height;
    this.speed = 10;
  }

  Enemy.prototype.move = function() {
    this.down();
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

  return Enemy;

})(Actor);
