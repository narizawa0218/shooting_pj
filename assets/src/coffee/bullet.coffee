class Bullet
  constructor: (@x, @y) ->
    @img = new Image()
    @img.src = "assets/img/bullet.png"
    @speed = 6
    @fireInterval = 0
    @isDraw = false

  move: ->
    _up.call @
    @isDraw = false if @y < @img.height

  initializePosition: (x, y) ->
    return true if @isDraw
    @setPosition x, y
    @enabled()
    false

  draw: ->
    ctx.drawImage @img, @x, @y if @isDraw

  setPosition: (x, y) ->
    @x = x
    @y = y

  enabled: ->
    @isDraw = true

  disabled: ->
    @isDraw = false

  _up = ->
    @y -= @speed