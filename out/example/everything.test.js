// Generated by CoffeeScript 1.4.0
var assert, joe, wait;

assert = (typeof require === "function" ? require('assert') : void 0) || this.assert;

joe = (typeof require === "function" ? require(__dirname + '/../lib/joe') : void 0) || this.joe;

wait = function(delay, fn) {
  return setTimeout(fn, delay);
};

wait(1 * 1000, function() {
  joe.test('api is readonly within node', function() {
    if ((typeof require !== "undefined" && require !== null) && (Object.freeze != null) && process.version.slice(0, 4) !== 'v0.4') {
      joe.blah = true;
      return assert.ok((joe.blah != null) === false);
    }
  });
  return joe.suite('tests', function(suite, test) {
    suite('async-suite', function(suite, test, done) {
      wait(1 * 1000, function() {
        return test('1/2', function() {
          return assert.ok(true);
        });
      });
      wait(2 * 1000, function() {
        return test('2/2', function() {
          return assert.ok(true);
        });
      });
      return wait(3 * 1000, function() {
        return done();
      });
    });
    suite('async-tests', function(suite, test) {
      test('1/2', function(done) {
        return wait(1 * 1000, function() {
          assert.ok(true);
          return done();
        });
      });
      return test('2/2', function(done) {
        return wait(2 * 1000, function() {
          assert.ok(true);
          return done();
        });
      });
    });
    suite('sync', function(suite, test) {
      test('1/2', function() {
        return assert.ok(true);
      });
      return test('2/2', function() {
        return assert.ok(true);
      });
    });
    suite('async-sync', function(suite, test) {
      test('1/2', function(done) {
        return wait(1 * 1000, function() {
          assert.ok(true);
          return done();
        });
      });
      return test('2/2', function() {
        return assert.ok(true);
      });
    });
    return suite('deliberate-failure', function(suite, test) {
      test('1/2', function(done) {
        return wait(1 * 1000, function() {
          assert.ok(true);
          return done();
        });
      });
      return test('2/2', function() {
        return assert.ok(false);
      });
    });
  });
});
