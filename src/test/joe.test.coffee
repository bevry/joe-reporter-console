# Requires
{exec} = require('child_process')
assert = require('assert')

# Prepare
everythingTestPath = __dirname+'/../example/everything.test.js'
expected = "9/10 tests ran successfully, with 1 errors"

# Test
exec "node #{everythingTestPath}", (error, stdout, stderr) ->
	result = stdout.indexOf(expected) isnt -1
	console.log(stdout)
	message = 'the correct number of tests passed, ran, and failed'
	assert.ok(result, message)
	console.log(message)