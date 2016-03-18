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
enemies = this
timer = 0

# - main ---------------------------------------------------------------------

mainLoop = ->
  startTime = new Date()

  player.move()
  player.shot()
  player.reDraw()

  enemies.move()
  enemies.draw()

  # 当たり判定
  if player.isAlive
    enemies.hitTo(player)
    player.bullets.hitTo(enemies)

  deltaTime = (new Date()) - startTime
  interval = MSPF - deltaTime
  timer++

  if interval > 0
    setTimeout mainLoop, interval
  else
    mainLoop()

window.onload = ->
  # スクリーンの初期化
  screenCanvas = $("canvas#screen")[0]
  screenCanvas.width = 800
  screenCanvas.height = 500

  ctx = screenCanvas.getContext '2d'

  player = new Player screenCanvas.width, screenCanvas.height
  enemies = new Enemies 5, screenCanvas.width, screenCanvas.height

  mainLoop()

window.onkeydown = (e) ->
  KEY[e.keyCode] = true

window.onkeyup = (e) ->
  KEY[e.keyCode] = false
