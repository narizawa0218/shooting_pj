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

  move: ->
    @up()
    @isDead() if @y < @img.height

  initializePosition: (x, y) ->
    @setPosition x, y
    @isRevived()

  draw: ->
    ctx.drawImage @img, @x, @y if @isAlive
