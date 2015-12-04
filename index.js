/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require('loader-utils'),
	path = require('path'),
	nativeCss = require('native-css')
	fs = require('fs'),
	childProcess = require('child_process');

module.exports = function(content) {

	this.cacheable && this.cacheable();
	if(!this.emitFile) throw new Error('emitFile is required from module system');
	// parameters
	var query = loaderUtils.parseQuery(this.query);
	var url = loaderUtils.interpolateName(this, query.name || '[hash].[ext]', {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});

// var path 			= 'tmp/';
var that 			= this
,	path 			= __dirname + '/tmp/'
,	newUrl 		= path+url
,	compiled, compiledJson, exportString
;

var callback 	= function() {
	compiled 		= nativeCss.convert( 'node_modules/cssobjects-loader/tmp/'+url );
	compiledJson = JSON.stringify(compiled);
	that.emitFile(url, compiledJson);
	exportString = ''+compiledJson;
}

fs.readdir(path, function(err) {
	if (err) // dir not found
		throw err;
	console.log('tmp dir found' );

	fs.writeFile(newUrl, content, 'utf8', function(err) {
		console.log('writeFile newUrl', newUrl,  err);
		callback();
	});
});

compiled 		= nativeCss.convert( 'node_modules/cssobjects-loader/tmp/'+url );
compiledJson = JSON.stringify(compiled);
that.emitFile(url, compiledJson);
exportString = ''+compiledJson;

this.emitFile(url, compiledJson);
// // newUrlRealtive 	= '../../..'+url;
return 'module.exports =  ' + exportString + ';';

	// return 'module.exports =  __webpack_public_path__ + ' + JSON.stringify(url) + ';';
}
module.exports.raw = true;
