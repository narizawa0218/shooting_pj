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

# - main ---------------------------------------------------------------------

mainLoop = ->
  startTime = new Date()

  player.move()
  player.shot()
  player.reDraw()

  deltaTime = (new Date()) - startTime
  interval = MSPF - deltaTime

  if interval > 0
    setTimeout mainLoop, interval
  else
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

  mainLoop()

window.onkeydown = (key) ->
  KEY[key.keyCode] = true

window.onkeyup = (key) ->
  KEY[key.keyCode] = false

class Player
  constructor: (@x, @y) ->
    @speed = 4
    @magazine_size = 5
    @bullets = new Array @magazine_size
    for i in [0..@magazine_size]
      @bullets[i] = new Bullet @x, @y

  move: =>
    @x += @speed if KEY[RIGHT] && @x + playerImage.width < screenCanvas.width
    @x -= @speed if KEY[LEFT] && @x > 0
    @y -= @speed if KEY[UP] && @y > 0
    @y += @speed if KEY[DOWN] && @y + playerImage.height < screenCanvas.height

  shot: ->
    for i in [0..@magazine_size]
      if KEY[SPACE]
        break unless @bullets[i].initializePosition @x, @y
    for i in [0..@magazine_size]
      continue unless @bullets[i].isDraw()
      @bullets[i].move()
    for i in [0..@magazine_size]
      @bullets[i].draw()

  reDraw: ->
    # キャンバスのクリア
    ctx.clearRect 0, 0, screenCanvas.width, screenCanvas.height
    # 描画
    ctx.drawImage playerImage, @x, @y

    for i in [0..@magazine_size]
      @bullets[i].draw()

  resetBullet: ->
    for i in [0..@magazine_size]
      @bullets[i].x = 0
      @bullets[i].y = 0
      @bullets[i].hp = 0

class Bullet
  constructor: (@x, @y) ->
    @speed = 6
    @hp = 0

  move: ->
    @y -= @speed 
    @hp = 0 if @y < bulletImage.height

  initializePosition: (x, y) ->
    if @hp == 0
      @x = x
      @y = y
      @hp = 1
      return false
    else
      return true

  draw: ->
    ctx.drawImage bulletImage, @x, @y if @isDraw()

  isDraw: ->
    @hp > 0