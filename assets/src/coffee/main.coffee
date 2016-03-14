# - global -------------------------------------------------------------------
screenCanvas = this
ctx = this
playerImage = this
player = this
FPS = 60
MSPF = 1000 / FPS

# key
SPACE = 32
LEFT = 37
RIGHT = 39
UP = 38
DOWN = 40

KEY = 
  SPACE: false
  LEFT: false
  RIGHT: false
  UP: false
  DOWN: false

# bullet
bulletImage = this

# enemy
enemy = this
enemyImage = this

# - main ---------------------------------------------------------------------

mainLoop = ->
  startTime = new Date()

  player.move()
  player.shot()
  player.reDraw()
  enemy.move()
  enemy.draw()

  deltaTime = (new Date()) - startTime
  interval = MSPF - deltaTime

  if interval > 0
    setTimeout mainLoop, interval
  else
    count++
    mainLoop()

window.onload = ->
  SCREEN_WIDTH = 800
  SCREEN_HEIGHT = 500
  
  # スクリーンの初期化
  screenCanvas = $("canvas#screen")[0]
  screenCanvas.width = SCREEN_WIDTH
  screenCanvas.height = SCREEN_HEIGHT

  ctx = screenCanvas.getContext '2d'

  playerImage = new Image()
  playerImage.src = "assets/img/player.png"

  # 初期位置調整
  playerX = (screenCanvas.width - playerImage.width) / 2;
  playerY = (screenCanvas.height - playerImage.height) - 20;

  player = new Player playerX, playerY
  player.reDraw()

  bulletImage = new Image()
  bulletImage.src = "assets/img/bullet.png"

  player.resetBullet()

  enemyImage = new Image()
  enemyImage.src = "assets/img/enemy.png"

  enemy = new Enemy Math.random() * screenCanvas.width - enemyImage.width, Math.random() * screenCanvas.height - enemyImage.height
  enemy.draw()

  mainLoop()

window.onkeydown = (e) ->
  KEY[e.keyCode] = true

window.onkeyup = (e) ->
  KEY[e.keyCode] = false

class Player
  constructor: (@x, @y) ->
    @speed = 4
    @magazine_size = 5
    @bullets = new Array @magazine_size
    _setFireInterval.call @, 0
    _initializeBullets.call @

  move: =>
    _right.call @ if KEY[RIGHT] && @x + playerImage.width < screenCanvas.width
    _left.call @ if KEY[LEFT] && @x > 0
    _up.call @ if KEY[UP] && @y > 0
    _down.call @ if KEY[DOWN] && @y + playerImage.height < screenCanvas.height

  # 各弾に対して処理する
  shot: ->
    for i in [0..@magazine_size]
      if KEY[SPACE] && @fireInterval == 0
        unless @bullets[i].initializePosition (@x + playerImage.width / 4), (@y - bulletImage.height)
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
    ctx.drawImage playerImage, @x, @y

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

class Bullet
  constructor: (@x, @y) ->
    @speed = 6
    @fireInterval = 0
    @isDraw = false

  move: ->
    _up.call @
    @isDraw = false if @y < bulletImage.height

  initializePosition: (x, y) ->
    return true if @isDraw
    @setPosition x, y
    @enabled()
    false

  draw: ->
    ctx.drawImage bulletImage, @x, @y if @isDraw

  setPosition: (x, y) ->
    @x = x
    @y = y

  enabled: ->
    @isDraw = true

  disabled: ->
    @isDraw = false

  _up = ->
    @y -= @speed

class Enemy
  constructor: (@x, @y) ->
    @speed = 4

  move: ->
    _down.call @
    if @y > screenCanvas.height
      @y = -enemyImage.height
      @x = Math.random() * (screenCanvas.width - enemyImage.width)

  initializePosition: ->
    @setPosition 0, 0

  draw: ->
    ctx.drawImage enemyImage, @x, @y

  setPosition: (x, y) ->
    @x = x
    @y = y

  _down = ->
    @y += @speed + 5

  _left = ->
    @x -= @speed - 10