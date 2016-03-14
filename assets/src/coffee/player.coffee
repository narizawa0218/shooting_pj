class Player
  constructor: (canvas_width, canvas_height) ->
    @img = new Image()
    @img.src = "assets/img/player.png"
    @x = (canvas_width - @img.width) / 2
    @y = (canvas_height - @img.height) - 20;
    @speed = 4
    @magazine_size = 5
    @bullets = new Array @magazine_size
    _setFireInterval.call @, 0
    _initializeBullets.call @

  move: =>
    _right.call @ if KEY[RIGHT] && @x + @img.width < screenCanvas.width
    _left.call @ if KEY[LEFT] && @x > 0
    _up.call @ if KEY[UP] && @y > 0
    _down.call @ if KEY[DOWN] && @y + @img.height < screenCanvas.height

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
    ctx.clearRect 0, 0, screenCanvas.width, screenCanvas.height
    # 描画
    ctx.drawImage @img, @x, @y

    for i in [0..@magazine_size]
      @bullets[i].draw()

  resetBullet: ->
    for i in [0..@magazine_size]
      @bullets[i].setPosition(0, 0)
      @bullets[i].disabled()

  _up = ->
    @y -= @speed

  _down = ->
    @y += @speed

  _right = ->
    @x += @speed

  _left = ->
    @x -= @speed

  _initializeBullets = ->
    for i in [0..@magazine_size]
      @bullets[i] = new Bullet @x, @y

  _setFireInterval = (interval) ->
    @fireInterval = interval

  _coolDown = ->
    @fireInterval--