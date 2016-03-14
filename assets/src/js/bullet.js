var Bullet,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Bullet = (function(superClass) {
  extend(Bullet, superClass);

  function Bullet() {
    this.img = new Image();
    this.img.src = "assets/img/bullet.png";
    this.speed = 6;
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

  Bullet.prototype.enabled = function() {
    return this.isDraw = true;
  };

  Bullet.prototype.disabled = function() {
    return this.isDraw = false;
  };

  return Bullet;

})(Actor);
