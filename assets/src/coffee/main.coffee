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

# - main ---------------------------------------------------------------------

mainLoop = ->
  startTime = new Date()

  player.move()
  player.shot()
  player.reDraw()
  for enemy in enemies when enemy.isAlive
    enemy.move()
    enemy.draw()

  if player.isAlive
    for enemy in enemies when enemy.isAlive
      if hitTo player.x, player.y, player.img, enemy.x, enemy.y, enemy.img
        player.isAlive = false
        enemy.isAlive = false
      for bullet in player.bullets when bullet.isDraw
        if hitTo bullet.x, bullet.y, bullet.img, enemy.x, enemy.y, enemy.img
          bullet.isDraw = false
          enemy.isAlive = false

  deltaTime = (new Date()) - startTime
  interval = MSPF - deltaTime

  if interval > 0
    setTimeout mainLoop, interval
  else
    mainLoop()

hitTo = (x1, y1, img1, x2, y2, img2) ->
  # 中心座標の取得
  cx1 = x1 + img1.width / 2
  cy1 = y1 + img1.height / 2
  cx2 = x2 + img2.width / 2
  cy2 = y2 + img2.height / 2
  # 半径の計算
  r1 = (img1.width + img1.height) / 4
  r2 = (img2.width + img2.height) / 4
  # 中心座標同士の距離の測定
  # Math.sqrt(d) -- dのルートを返す
  # Math.pow(x, a) -- xのa乗を返す
  d = Math.sqrt Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2)
  # 当たっているか判定
  r1 + r2 > d

window.onload = ->
  SCREEN_WIDTH = 800
  SCREEN_HEIGHT = 500
  
  # スクリーンの初期化
  screenCanvas = $("canvas#screen")[0]
  screenCanvas.width = SCREEN_WIDTH
  screenCanvas.height = SCREEN_HEIGHT

  ctx = screenCanvas.getContext '2d'

  player = new Player screenCanvas.width, screenCanvas.height
  enemies = new Array 5
  for i in [0..9]
    enemies[i] = new Enemy screenCanvas.width, screenCanvas.height

  mainLoop()

window.onkeydown = (e) ->
  KEY[e.keyCode] = true

window.onkeyup = (e) ->
  KEY[e.keyCode] = false
