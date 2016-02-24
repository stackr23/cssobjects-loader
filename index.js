/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author - Stefan Friedl @DoubleU23
*/
var loaderUtils 	= require('loader-utils')
,	path 			= require('path')
,	nativeCss 		= require('../native-css')
,	fs 				= require('fs')
;
module.exports = function(content) {
	this.cacheable && this.cacheable();
	if(!this.emitFile) throw new Error('emitFile is required from module system');
	var callback 	= this.async()
	,	query 		= loaderUtils.parseQuery(this.query)
	,	url 		= loaderUtils.interpolateName(this, query.name || '[hash].[ext]', {
			context: query.context || this.options.context,
			content: content,
			regExp: query.regExp
		})
	,	path 		= this._compiler.options.output.path + '/' + url
	/**
	 *  'ugly' writeFile solution
	 *	Async variant per emiFile's URL not possible
	 * 	because emitFile writes later (fileWrites.push)
	 *
	 *  wait until nativeCss accepts buffers
	 */
	,	result 		=  fs.writeFile(path, content, function() {
			var result 		= nativeCss.convert(path, true)
			,	returnVal 	= 'module.exports =  ' + JSON.stringify(result);
			callback(null, returnVal);
		})
	;
}
module.exports.raw = true;