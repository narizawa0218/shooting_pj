class Bullet extends Actor
  constructor: (canvasWidth, canvasHeight) ->
    super(
      "assets/img/bullet.png",
      0,
      0,
      6,
      canvasWidth,
      canvasHeight
    )
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
