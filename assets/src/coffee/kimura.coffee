class Hello

  constructor: (@helloText) ->

  renderView: ->
    $("#view_area").text(@helloText)

  renderConsole: ->
    console.log @helloText

  viewAlert: ->
    alert @helloText

coffee = new Hello("Hello World!!")
coffee.renderView()
coffee.renderConsole()
coffee.viewAlert()