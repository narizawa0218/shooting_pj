var Actor;

Actor = (function() {
  function Actor(x1, y1, speed) {
    this.x = x1;
    this.y = y1;
    this.speed = speed;
  }

  Actor.prototype.up = function() {
    return this.y -= this.speed;
  };

  Actor.prototype.down = function() {
    return this.y += this.speed;
  };

  Actor.prototype.right = function() {
    return this.x += this.speed;
  };

  Actor.prototype.left = function() {
    return this.x -= this.speed;
  };

  Actor.prototype.setPosition = function(x, y) {
    this.x = x;
    return this.y = y;
  };

  return Actor;

})();
