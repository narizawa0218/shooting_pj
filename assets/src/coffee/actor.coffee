class Actor
  constructor: (img_path, @x, @y, @speed, @canvasWidth, @canvasHeight) ->
    @img = new Image()
    @img.src = img_path
    @isAlive = true

  up: ->
    @y -= @speed

  down: ->
    @y += @speed

  right: ->
    @x += @speed

  left: ->
    @x -= @speed

  setPosition: (x, y) ->
    @x = x
    @y = y

  isOutsideOfCanvasHeight: ->
    @y + @img.height >= @canvasHeight

  isOutsideOfCanvasWidth: ->
    @x + @img.width >= @canvasWidth

  isInsideOfCanvasHeight: ->
    !@isOutsideOfCanvasHeight()

  isInsideOfCanvasWidth: ->
    !@isOutsideOfCanvasWidth()

  isDead: ->
    @isAlive = false

  isRevived: ->
    @isAlive = true

  xCenter: ->
    @x + @img.width / 2

  yCenter: ->
    @y + @img.height / 2

  # 半径の計算
  radius: ->
    (@img.width + @img.height) / 4

  hitTo: (actor) ->
    # 中心座標同士の距離の測定
    # Math.sqrt(d) -- dのルートを返す
    # Math.pow(x, a) -- xのa乗を返す
    d = Math.sqrt Math.pow(@xCenter() - actor.xCenter(), 2) + Math.pow(@yCenter() - actor.yCenter(), 2)
    # 当たっているか判定
    @radius() + actor.radius() > d