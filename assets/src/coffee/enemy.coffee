class Enemy extends Actor
  constructor: (canvas_width, canvas_height) ->
    @img = new Image()
    @img.src = "assets/img/enemy.png"
    @x = Math.random() * canvas_width - @img.width
    @y = Math.random() * canvas_height - @img.height
    @speed = 10

  move: ->
    @down()
    if @y > screenCanvas.height
      @y = -@img.height
      @x = Math.random() * (screenCanvas.width - @img.width)

  initializePosition: ->
    @setPosition 0, 0

  draw: ->
    ctx.drawImage @img, @x, @y
