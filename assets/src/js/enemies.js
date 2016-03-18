var Enemies;

Enemies = (function() {
  function Enemies(enemyNumber, CanvasWidth, CanvasHeight) {
    var i;
    this.list = (function() {
      var j, ref, results;
      results = [];
      for (i = j = 0, ref = enemyNumber; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        results.push(new Enemy(CanvasWidth, CanvasHeight));
      }
      return results;
    })();
  }

  Enemies.prototype.move = function() {
    var enemy, j, len, ref, results;
    ref = this.list;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      enemy = ref[j];
      if (enemy.isAlive) {
        results.push(enemy.move());
      }
    }
    return results;
  };

  Enemies.prototype.draw = function() {
    var enemy, j, len, ref, results;
    ref = this.list;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      enemy = ref[j];
      if (enemy.isAlive) {
        results.push(enemy.draw());
      }
    }
    return results;
  };

  Enemies.prototype.hitTo = function(player) {
    var enemy, j, len, ref, results;
    ref = this.list;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      enemy = ref[j];
      if (enemy.isAlive) {
        if (enemy.hitTo(player)) {
          enemy.isDead();
          results.push(player.isDead());
        } else {
          results.push(void 0);
        }
      }
    }
    return results;
  };

  return Enemies;

})();
