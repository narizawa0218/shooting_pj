(function() {
  var Hello, coffee;

  Hello = (function() {
    function Hello(helloText) {
      this.helloText = helloText;
    }

    Hello.prototype.renderView = function() {
      return $("#view_area").text(this.helloText);
    };

    Hello.prototype.renderConsole = function() {
      return console.log(this.helloText);
    };

    Hello.prototype.viewAlert = function() {
      return alert(this.helloText);
    };

    return Hello;

  })();

  coffee = new Hello("Hello World!!");

  coffee.renderView();

  coffee.renderConsole();

  coffee.viewAlert();

}).call(this);
