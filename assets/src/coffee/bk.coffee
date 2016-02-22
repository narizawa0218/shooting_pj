# - global -------------------------------------------------------------------
screenCanvas = this
ctx = this
playerImage = this
playerX = this
playerY = this
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
movePlayer = ->
  SPEED = 2

  playerX += SPEED if KEY[RIGHT] && playerX + playerImage.width < screenCanvas.width
  playerX -= SPEED if KEY[LEFT] && playerX > 0
  playerY -= SPEED if KEY[UP] && playerY > 0
  playerY += SPEED if KEY[DOWN] && playerY + playerImage.height < screenCanvas.height

mainLoop = ->
  startTime = new Date()

  movePlayer()

  reDraw()

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

  playerX = (screenCanvas.width - playerImage.width) / 2;
  playerY = (screenCanvas.height - playerImage.height) - 20;

  ctx.drawImage playerImage, playerX, playerY
  

  mainLoop()

window.onkeydown = (key) ->
  KEY[key.keyCode] = true

window.onkeyup = (key) ->
  KEY[key.keyCode] = false

reDraw = ->
  # キャンバスのクリア
  ctx.clearRect 0, 0, screenCanvas.width, screenCanvas.height

  # 描画
  ctx.drawImage playerImage, playerX, playerY
