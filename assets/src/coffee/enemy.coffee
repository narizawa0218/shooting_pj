class Enemy extends Actor
  constructor: (canvasWidth, canvasHeight) ->
    super(
      "assets/img/enemy.png",
      0,
      0,
      10,
      canvasWidth,
      canvasHeight
    )
    @initializePosition()

  move: ->
    @down()
    if @isOutsideOfCanvasHeight()
      @setPosition(
        Math.random() * @canvasWidth - @img.width,
        -@img.height
      )

  initializePosition: ->
    @setPosition(
      Math.random() * @canvasWidth - @img.width,
      Math.random() * @canvasHeight - @img.height
    )

  draw: ->
    ctx.drawImage @img, @x, @y
