var Actor;

Actor = (function() {
  function Actor(img_path, x1, y1, speed, canvasWidth, canvasHeight) {
    this.x = x1;
    this.y = y1;
    this.speed = speed;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.img = new Image();
    this.img.src = img_path;
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

  Actor.prototype.xCenter = function() {
    return (this.canvasWidth - this.img.width) / 2;
  };

  Actor.prototype.yCenter = function() {
    return (this.canvasHeight - this.img.height) - 20;
  };

  Actor.prototype.isOutsideOfCanvasHeight = function() {
    return this.y + this.img.height >= this.canvasHeight;
  };

  Actor.prototype.isOutsideOfCanvasWidth = function() {
    return this.x + this.img.width >= this.canvasWidth;
  };

  Actor.prototype.isInsideOfCanvasHeight = function() {
    return !this.isOutsideOfCanvasHeight();
  };

  Actor.prototype.isInsideOfCanvasWidth = function() {
    return !this.isOutsideOfCanvasWidth();
  };

  return Actor;

})();
