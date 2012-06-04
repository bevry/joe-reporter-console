// Generated by CoffeeScript 1.3.3
(function() {
  var Group, Suite, balUtilFlow, createSuite, joe, report, reporters,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  balUtilFlow = typeof require !== "undefined" && require !== null ? require('bal-util/lib/flow') : this.balUtilFlow;

  Group = balUtilFlow.Group;

  Suite = (function(_super) {

    __extends(Suite, _super);

    function Suite(name, fn, parentSuite) {
      var suite;
      suite = this;
      Suite.__super__.constructor.call(this, function(err) {
        var _ref;
        report('finishSuite', suite, err);
        return (_ref = suite.parentSuite) != null ? _ref.complete(err) : void 0;
      });
      suite.name = name;
      suite.parentSuite = parentSuite;
      suite.mode = 'sync';
      report('startSuite', suite);
      if (fn.length === 3) {
        suite.total = Infinity;
      }
      fn(function(name, fn) {
        return suite.suite(name, fn);
      }, function(name, fn) {
        return suite.test(name, fn);
      }, function(err) {
        return suite.exit(err);
      });
      if (fn.length !== 3) {
        suite.run();
      }
    }

    Suite.prototype.suite = function(name, fn) {
      var push, suite;
      suite = this;
      push = function(complete) {
        if (suite.total === Infinity) {
          return suite.pushAndRun(complete);
        } else {
          return suite.push(complete);
        }
      };
      push(function() {
        var subSuite;
        return subSuite = new Suite(name, fn, suite);
      });
      return this;
    };

    Suite.prototype.test = function(name, fn) {
      var push, suite;
      suite = this;
      push = function(complete) {
        if (suite.total === Infinity) {
          return suite.pushAndRun(complete);
        } else {
          return suite.push(complete);
        }
      };
      push(function(complete) {
        var preComplete;
        preComplete = function(err) {
          report('finishTest', suite, name, err);
          return complete(err);
        };
        report('startTest', suite, name);
        if (fn.length < 1) {
          try {
            fn();
            return preComplete();
          } catch (err) {
            return preComplete(err);
          }
        } else {
          try {
            return fn(preComplete);
          } catch (err) {
            return preComplete(err);
          }
        }
      });
      return this;
    };

    return Suite;

  })(Group);

  createSuite = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args), t = typeof result;
      return t == "object" || t == "function" ? result || child : child;
    })(Suite, args, function(){});
  };

  report = function() {
    var args, event, reporter, _i, _len, _ref, _ref1, _results;
    event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    _ref = joe.reporters;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      reporter = _ref[_i];
      _results.push((_ref1 = reporter[event]) != null ? _ref1.apply(reporter, args) : void 0);
    }
    return _results;
  };

  reporters = [];

  joe = {
    Suite: Suite,
    reporters: reporters,
    createSuite: createSuite
  };

  if (typeof process !== "undefined" && process !== null) {
    process.on('exit', function() {
      return report('exit');
    });
  }

  if (typeof global !== "undefined" && global !== null) {
    global.describe = global.suite = createSuite;
  } else {
    this.describe = this.suite = createSuite;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = joe;
  } else {
    this.joe = joe;
  }

}).call(this);