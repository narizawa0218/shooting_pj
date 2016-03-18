var Bullets;

Bullets = (function() {
  function Bullets(magazine_size, width, height) {
    var i;
    this.list = (function() {
      var j, ref, results;
      results = [];
      for (i = j = 0, ref = magazine_size; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        results.push(new Bullet(width, height));
      }
      return results;
    })();
  }

  Bullets.prototype.shoot = function(x, y) {
    var bullet, j, len, ref, results;
    ref = this.list;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      bullet = ref[j];
      if (KEY[SPACE] && timer % 10 === 0) {
        if (!bullet.isAlive) {
          bullet.initializePosition(x, y - bullet.img.height);
          break;
        }
      }
      if (!bullet.isAlive) {
        continue;
      }
      bullet.move();
      results.push(bullet.draw());
    }
    return results;
  };

  Bullets.prototype.draw = function() {
    var bullet, j, len, ref, results;
    ref = this.list;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      bullet = ref[j];
      results.push(bullet.draw());
    }
    return results;
  };

  Bullets.prototype.hitTo = function(enemies) {
    var bullet, enemy, j, len, ref, results;
    ref = enemies.list;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      enemy = ref[j];
      if (enemy.isAlive) {
        results.push((function() {
          var k, len1, ref1, results1;
          ref1 = this.list;
          results1 = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            bullet = ref1[k];
            if (bullet.isAlive) {
              if (bullet.hitTo(enemy)) {
                enemy.isDead();
                results1.push(bullet.isDead());
              } else {
                results1.push(void 0);
              }
            }
          }
          return results1;
        }).call(this));
      }
    }
    return results;
  };

  return Bullets;

})();
