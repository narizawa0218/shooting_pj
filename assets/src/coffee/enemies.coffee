class Enemies
  constructor: (enemyNumber, CanvasWidth, CanvasHeight) ->
    @list = (new Enemy CanvasWidth, CanvasHeight for i in [0..enemyNumber])

  move: ->
    for enemy in @list when enemy.isAlive
      enemy.move()
      
  draw: ->
    for enemy in @list when enemy.isAlive
      enemy.draw()

  hitTo: (player) ->
    for enemy in @list when enemy.isAlive
      if enemy.hitTo(player)
        enemy.isDead() 
        player.isDead()
