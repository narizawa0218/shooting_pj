var Bullet,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Bullet = (function(superClass) {
  extend(Bullet, superClass);

  function Bullet(canvasWidth, canvasHeight) {
    Bullet.__super__.constructor.call(this, "assets/img/bullet.png", 0, 0, 6, canvasWidth, canvasHeight);
    this.fireInterval = 0;
    this.isDraw = false;
  }

  Bullet.prototype.move = function() {
    this.up();
    if (this.y < this.img.height) {
      return this.isDraw = false;
    }
  };

  Bullet.prototype.initializePosition = function(x, y) {
    this.setPosition(x, y);
    return this.enabled();
  };

  Bullet.prototype.draw = function() {
    if (this.isDraw) {
      return ctx.drawImage(this.img, this.x, this.y);
    }
  };

  Bullet.prototype.enabled = function() {
    return this.isDraw = true;
  };

  Bullet.prototype.disabled = function() {
    return this.isDraw = false;
  };

  return Bullet;

})(Actor);
