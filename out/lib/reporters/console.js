// Generated by CoffeeScript 1.4.0
var ConsoleReporter, cliColor, isWindows,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

try {
  cliColor = typeof require === "function" ? require('cli-color') : void 0;
} catch (err) {
  cliColor = null;
}

isWindows = (typeof process !== "undefined" && process !== null) && process.platform.indexOf('win') === 0;

ConsoleReporter = (function() {

  ConsoleReporter.prototype.errors = null;

  ConsoleReporter.prototype.config = null;

  function ConsoleReporter(config) {
    var _base, _base1, _base2, _base3, _base4, _base5, _base6, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    this.errors || (this.errors = []);
    this.config || (this.config = config || {});
    if ((_ref = (_base = this.config).start) == null) {
      _base.start = '';
    }
    if ((_ref1 = (_base1 = this.config).fail) == null) {
      _base1.fail = isWindows ? ' ERR!' : ' ✘  ';
    }
    if ((_ref2 = (_base2 = this.config).pass) == null) {
      _base2.pass = isWindows ? ' OK' : ' ✔  ';
    }
    if ((_ref3 = (_base3 = this.config).sub) == null) {
      _base3.sub = isWindows ? ' > ' : ' ➞  ';
    }
    if ((_ref4 = (_base4 = this.config).failHeading) == null) {
      _base4.failHeading = 'Error #%s:';
    }
    if ((_ref5 = (_base5 = this.config).summaryPass) == null) {
      _base5.summaryPass = "%s/%s tests ran successfully, everything passed";
    }
    if ((_ref6 = (_base6 = this.config).summaryFail) == null) {
      _base6.summaryFail = "FAILURE: %s/%s tests ran successfully; %s failed, %s incomplete, %s errors";
    }
    if (cliColor != null) {
      if (__indexOf.call(typeof process !== "undefined" && process !== null ? process.argv : void 0, '--no-colors') < 0) {
        this.config.fail = cliColor.red(this.config.fail);
        this.config.pass = cliColor.green(this.config.pass);
        this.config.sub = cliColor.black(this.config.sub);
        this.config.failHeading = cliColor.red.underline(this.config.failHeading);
        this.config.summaryPass = cliColor.green.underline(this.config.summaryPass);
        this.config.summaryFail = cliColor.red.bold.underline(this.config.summaryFail);
      }
    }
  }

  ConsoleReporter.prototype.getSuiteName = function(suite) {
    return this.joe.getSuiteName(suite, this.config.sub);
  };

  ConsoleReporter.prototype.getTestName = function(suite, testName) {
    var result, suiteName;
    result = '';
    if (suite != null) {
      suiteName = this.getSuiteName(suite);
      result += "" + suiteName;
      if (testName) {
        result += "" + this.config.sub + testName;
      }
    } else {
      result = testName;
    }
    return result;
  };

  ConsoleReporter.prototype.startSuite = function(suite) {
    var message, suiteName;
    suiteName = this.getSuiteName(suite);
    if (!suiteName) {
      return this;
    }
    message = "" + suiteName + this.config.start;
    console.log(message);
    return this;
  };

  ConsoleReporter.prototype.finishSuite = function(suite, err) {
    var check, message, suiteName;
    suiteName = this.getSuiteName(suite);
    if (!suiteName) {
      return this;
    }
    check = (err ? this.config.fail : this.config.pass);
    message = "" + suiteName + check;
    console.log(message);
    return this;
  };

  ConsoleReporter.prototype.startTest = function(suite, testName) {
    var message;
    testName = this.getTestName(suite, testName);
    if (!testName) {
      return this;
    }
    message = "" + testName + this.config.start;
    console.log(message);
    return this;
  };

  ConsoleReporter.prototype.finishTest = function(suite, testName, err) {
    var check, message;
    testName = this.getTestName(suite, testName);
    if (!testName) {
      return this;
    }
    check = (err ? this.config.fail : this.config.pass);
    message = "" + testName + check;
    console.log(message, (typeof process !== "undefined" && process !== null) === false && err ? [err, err.stack] : '');
    return this;
  };

  ConsoleReporter.prototype.exit = function(exitCode) {
    var errorLog, errorLogs, index, suite, testName, totalErrors, totalFailedTests, totalIncompleteTests, totalPassedTests, totalTests, _i, _len, _ref, _ref1;
    _ref = this.joe.getTotals(), totalTests = _ref.totalTests, totalPassedTests = _ref.totalPassedTests, totalFailedTests = _ref.totalFailedTests, totalIncompleteTests = _ref.totalIncompleteTests, totalErrors = _ref.totalErrors;
    if (exitCode) {
      errorLogs = this.joe.getErrorLogs();
      console.log("\n" + this.config.summaryFail, totalPassedTests, totalTests, totalFailedTests, totalIncompleteTests, totalErrors);
      for (index = _i = 0, _len = errorLogs.length; _i < _len; index = ++_i) {
        errorLog = errorLogs[index];
        suite = errorLog.suite, testName = errorLog.testName, err = errorLog.err;
        testName = this.getTestName(suite, testName);
        console.log("\n" + this.config.failHeading, index + 1);
        console.log(testName);
        console.log(((_ref1 = err.stack) != null ? _ref1.toString() : void 0) || err);
      }
      console.log('');
    } else {
      console.log("\n" + this.config.summaryPass, totalPassedTests, totalTests);
    }
    return this;
  };

  return ConsoleReporter;

})();

if (typeof module !== "undefined" && module !== null) {
  module.exports = ConsoleReporter;
} else {
  this.joe.ConsoleReporter = ConsoleReporter;
}
