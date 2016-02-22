(function() {
  var i, j, str;

  for (i = j = 1; j <= 100; i = ++j) {
    str = i % 3 === 0 && i % 5 === 0 ? "fizzbuzz" : i % 3 === 0 ? "fizz" : i % 5 === 0 ? "buzz" : i;
    console.log(str);
  }

}).call(this);
