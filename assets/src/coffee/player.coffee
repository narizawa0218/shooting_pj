class Player extends Actor
  MAGAZINE_SIZE = 5
  constructor: (canvasWidth, canvasHeight) ->
    super(
      "assets/img/player.png",
      0,
      0,
      10,
      canvasWidth,
      canvasHeight
    )
    @speed = 10
    @bullets = new Bullets MAGAZINE_SIZE, canvasWidth, canvasHeight
    @setPosition @xCanvasCenter(), @yCanvasCenter()

  move: =>
    @right() if KEY[RIGHT] && @isInsideOfCanvasWidth()
    @left() if KEY[LEFT] && @x > 0
    @up() if KEY[UP] && @y > 0
    @down() if KEY[DOWN] && @isInsideOfCanvasHeight()

  # 各弾に対して処理する
  shot: ->
    @bullets.shoot (@x + @img.width / 4), @y

  reDraw: ->
    # キャンバスのクリア
    ctx.clearRect 0, 0, @canvasWidth, @canvasHeight
    # 描画
    ctx.drawImage @img, @x, @y if @isAlive

    @bullets.draw()

  xCanvasCenter: ->
    (@canvasWidth - @img.width) / 2

  yCanvasCenter: ->
    (@canvasHeight - @img.height) - 20
