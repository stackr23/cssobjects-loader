/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require('loader-utils'),
	path = require('path'),
	nativeCss = require('native-css/index.js')
	fs = require('fs'),
	querystring = require('querystring');

module.exports = function(content) {

// console.log('process.env', process.env);
console.log('__dirname', __dirname);
console.log('__filename', __filename);


	this.cacheable && this.cacheable();
	if(!this.emitFile) throw new Error('emitFile is required from module system');
	// parameters
	var query = loaderUtils.parseQuery(this.query);
	var url = loaderUtils.interpolateName(this, query.name || '[hash].[ext]', {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});


var newUrl 		= 'tmp/'+url;
fs.readdir('tmp', function(err) {
	if (err)
		throw err;

	console.log('tmp dir found' );
	fs.writeFile(newUrl, content, 'utf8', function(err) {
		console.log('writeFile newUrl', newUrl,  err);
	});
});

var compiled 		= nativeCss.convert( newUrl );
console.log('compiled', compiled);
var compiledJson = JSON.stringify(compiled);

this.options.outputDirectory = 'tmp';

console.log('typeof, nativeCss', typeof compiled, compiled);





this.emitFile(url, content);
// newUrlRealtive 	= '../../..'+url;
// return 'module.exports =  ' + JSON.stringify(newUrlRealtive) + ';';

	return 'module.exports =  __webpack_public_path__ + ' + JSON.stringify(url) + ';';
}
module.exports.raw = true;
