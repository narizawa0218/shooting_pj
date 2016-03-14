var Enemy;

Enemy = (function() {
  var _down, _left;

  function Enemy(canvas_width, canvas_height) {
    this.img = new Image();
    this.img.src = "assets/img/enemy.png";
    this.x = Math.random() * canvas_width - this.img.width;
    this.y = Math.random() * canvas_height - this.img.height;
    this.speed = 5;
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
