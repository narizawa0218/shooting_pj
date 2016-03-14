class Bullet extends Actor
  constructor: ->
    @img = new Image()
    @img.src = "assets/img/bullet.png"
    @speed = 6
    @fireInterval = 0
    @isDraw = false

  move: ->
    @up()
    @isDraw = false if @y < @img.height

  initializePosition: (x, y) ->
    return true if @isDraw
    @setPosition x, y
    @enabled()
    false

  draw: ->
    ctx.drawImage @img, @x, @y if @isDraw

  enabled: ->
    @isDraw = true

  disabled: ->
    @isDraw = false
