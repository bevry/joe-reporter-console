// Generated by CoffeeScript 1.4.0
var assert, joe;

assert = (typeof require === "function" ? require('assert') : void 0) || this.assert;

joe = (typeof require === "function" ? require(__dirname + '/../lib/joe') : void 0) || this.joe;

joe.suite('our suite', function(suite, test) {
  test('first test', function(complete) {
    return setTimeout(function() {
      console.log('this will be outputted second');
      return complete();
    }, 1000);
  });
  test('second test', function() {
    return console.log('this will be outputted third');
  });
  return console.log('this will be outputted first');
});
