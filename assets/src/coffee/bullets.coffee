class Bullets
  constructor: (magazine_size, width, height) ->
    @list = (new Bullet width, height for i in [0..magazine_size])

  shoot: (x, y) ->
    for bullet in @list
      if KEY[SPACE] && timer % 10 == 0
        unless bullet.isAlive
          bullet.initializePosition x, (y - bullet.img.height)
          break
      continue unless bullet.isAlive
      bullet.move()
      bullet.draw()

  draw: ->
    for bullet in @list
      bullet.draw()

  hitTo: (enemies) ->
    for enemy in enemies.list when enemy.isAlive
      for bullet in @list when bullet.isAlive
        if bullet.hitTo(enemy)
          enemy.isDead() 
          bullet.isDead()
