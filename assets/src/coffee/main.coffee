# - global -------------------------------------------------------------------
screenCanvas = this
ctx = this
playerImage = this
player = this
FPS = 60
MSPF = 1000 / FPS

# key
LEFT = 37
RIGHT = 39
UP = 38
DOWN = 40
KEY = 
  LEFT: false
  RIGHT: false
  UP: false
  DOWN: false

# - main ---------------------------------------------------------------------

mainLoop = (x, y) ->
  startTime = new Date()

  player.move()
  player.reDraw()

  deltaTime = (new Date()) - startTime
  interval = MSPF - deltaTime

  if interval > 0
    setTimeout mainLoop, interval
  else
    mainLoop player

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
  
  mainLoop player.x, player.y

window.onkeydown = (key) ->
  KEY[key.keyCode] = true

window.onkeyup = (key) ->
  KEY[key.keyCode] = false

class Player
  constructor: (@x, @y) ->
    @speed = 4

  move: =>
    @x += @speed if KEY[RIGHT] && @x + playerImage.width < screenCanvas.width
    @x -= @speed if KEY[LEFT] && @x > 0
    @y -= @speed if KEY[UP] && @y > 0
    @y += @speed if KEY[DOWN] && @y + playerImage.height < screenCanvas.height

  reDraw: ->
    # キャンバスのクリア
    ctx.clearRect 0, 0, screenCanvas.width, screenCanvas.height
    # 描画
    ctx.drawImage playerImage, @x, @y
