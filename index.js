/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author - Stefan Friedl @DoubleU23
*/
var loaderUtils = require('loader-utils')
,	path = require('path')
,	nativeCss = require('../native-css')
,	fetchUrl = require('fetch').fetchUrl
,	fs = require('fs')
,	childProcess = require('child_process')
;
module.exports = function(content) {
	this.cacheable && this.cacheable();
	if(!this.emitFile)
		throw new Error('emitFile is required from module system');
	var callback 	= this.async()
	,	query 		= loaderUtils.parseQuery(this.query)
	,	url 			= loaderUtils.interpolateName(this, query.name || '[hash].[ext]', {
			context: query.context || this.options.context,
			content: content,
			regExp: query.regExp
		})
	,	path 	= this._compiler.options.output.path + '/' + url
	,	result 	=  fs.writeFile(path, content, function() {
			var result 		= nativeCss.convert(path, true)
			,	returnVal 	= 'module.exports =  ' + JSON.stringify(result);
			callback(null, returnVal);
		})
	;
	/**
	 *	Async variant per emiFile's content
	 * 
	 * 	emitFile writes later (fileWrites.push)
	 * 	if there would be a callback to emitFile, this should be run.
	 *
	this.emitFile(url, content);
	var emitFileCallback = function() {
		var url = this._compiler.options.output.path + 'url';
		compiled = nativeCss.convertAsync(url, true )
					.then(function(result) {
						console.log('result', result);
						callback(null,
							'module.exports =  ' + JSON.stringify(result)
						);
					})
					.catch(function(err) {
						callback(err);
					});
	};
	 */
}
module.exports.raw = true;
