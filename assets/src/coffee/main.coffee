# - global -------------------------------------------------------------------
screenCanvas = this
ctx = this
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

# enemy
enemy = this

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
    mainLoop()

window.onload = ->
  SCREEN_WIDTH = 800
  SCREEN_HEIGHT = 500
  
  # スクリーンの初期化
  screenCanvas = $("canvas#screen")[0]
  screenCanvas.width = SCREEN_WIDTH
  screenCanvas.height = SCREEN_HEIGHT

  ctx = screenCanvas.getContext '2d'

  player = new Player screenCanvas.width, screenCanvas.height
  player.reDraw()
  player.resetBullet()

  enemy = new Enemy screenCanvas.width, screenCanvas.height
  enemy.draw()

  mainLoop()

window.onkeydown = (e) ->
  KEY[e.keyCode] = true

window.onkeyup = (e) ->
  KEY[e.keyCode] = false
