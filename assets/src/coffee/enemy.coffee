class Enemy
  constructor: (canvas_width, canvas_height) ->
    @img = new Image()
    @img.src = "assets/img/enemy.png"
    @x = Math.random() * canvas_width - @img.width
    @y = Math.random() * canvas_height - @img.height
    @speed = 5

  move: ->
    _down.call @
    if @y > screenCanvas.height
      @y = -@img.height
      @x = Math.random() * (screenCanvas.width - @img.width)

  initializePosition: ->
    @setPosition 0, 0

  draw: ->
    ctx.drawImage @img, @x, @y

  setPosition: (x, y) ->
    @x = x
    @y = y

  _down = ->
    @y += @speed + 5

  _left = ->
    @x -= @speed - 10