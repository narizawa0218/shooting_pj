class Actor
  constructor: (img_path, @x, @y, @speed, @canvasWidth, @canvasHeight) ->
    @img = new Image()
    @img.src = img_path

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

  xCenter: ->
    (@canvasWidth - @img.width) / 2

  yCenter: ->
    (@canvasHeight - @img.height) - 20

  isOutsideOfCanvasHeight: ->
    @y + @img.height >= @canvasHeight

  isOutsideOfCanvasWidth: ->
    @x + @img.width >= @canvasWidth

  isInsideOfCanvasHeight: ->
    !@isOutsideOfCanvasHeight()

  isInsideOfCanvasWidth: ->
    !@isOutsideOfCanvasWidth()