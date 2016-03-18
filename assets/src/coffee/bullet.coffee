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
    @setPosition x, y
    @enabled()

  draw: ->
    ctx.drawImage @img, @x, @y if @isDraw && @isAlive

  enabled: ->
    @isDraw = true

  disabled: ->
    @isDraw = false
