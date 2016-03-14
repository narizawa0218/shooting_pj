var Bullet;

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
