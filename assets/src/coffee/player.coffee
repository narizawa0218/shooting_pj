class Player extends Actor
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
    @magazine_size = 5
    @bullets = new Array @magazine_size
    @setPosition @xCenter(), @yCenter()
    _setFireInterval.call @, 0
    _initializeBullets.call @

  move: =>
    @right() if KEY[RIGHT] && @isInsideOfCanvasWidth()
    @left() if KEY[LEFT] && @x > 0
    @up() if KEY[UP] && @y > 0
    @down() if KEY[DOWN] && @isInsideOfCanvasHeight()

  # 各弾に対して処理する
  shot: ->
    for i in [0..@magazine_size]
      if KEY[SPACE] && @fireInterval == 0
        unless @bullets[i].initializePosition (@x + @img.width / 4), (@y - @bullets[i].img.height)
          _setFireInterval.call @, 20
          break
      continue unless @bullets[i].isDraw
      @bullets[i].move()
      @bullets[i].draw()
    _coolDown.call @ if @fireInterval > 0

  reDraw: ->
    # キャンバスのクリア
    ctx.clearRect 0, 0, @canvasWidth, @canvasHeight
    # 描画
    ctx.drawImage @img, @x, @y

    for i in [0..@magazine_size]
      @bullets[i].draw()

  resetBullet: ->
    for i in [0..@magazine_size]
      @bullets[i].setPosition(0, 0)
      @bullets[i].disabled()

  _initializeBullets = ->
    for i in [0..@magazine_size]
      @bullets[i] = new Bullet @x, @y

  _setFireInterval = (interval) ->
    @fireInterval = interval

  _coolDown = ->
    @fireInterval--