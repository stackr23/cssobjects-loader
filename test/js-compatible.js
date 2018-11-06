var should 				= require('should')
var path 				= require('path')

function run(resourcePath, query, content) {
	content = content || new Buffer('1234')
	var result = null
	var context = {
		resourcePath: resourcePath,
		query: '?' + query,
		options: {
			context: ''
		},
		emitFile: function(url, content2) {
			content2.should.be.eql(content)
			result = url
		}
	}
	cssobjectsLoader.call(context, content)
	return result
}

function test(excepted, resourcePath, query, content) {
	run(resourcePath, query, content).should.be.eql(excepted)
}

describe('module import', function() {
	it('should be imported without error', function() {

		try {
			var cssobjectsLoader = require('../index.js')
		}
		catch (err) {
			err.should.be.eql(null)
			console.error(err)
		}
	})
})


// describe('correct-filename', function() {
// 	it('should return valid js', function() {

// 		// var cssObject = require('cssobjects-loader!')

// 		cssObject.should.be.eql(content)

// 	})
// })