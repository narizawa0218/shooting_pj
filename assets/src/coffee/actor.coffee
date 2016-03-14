class Actor
  constructor: (@x, @y, @speed) ->

  up: ->
    @y -= @speed

  down: ->
    @y += @speed

  right: ->
    @x += @speed

  left: ->
    @x -= @speed

  setPosition: (x, y) ->
    @x = x
    @y = y