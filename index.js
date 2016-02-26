/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author - Stefan Friedl @DoubleU23
*/
var loaderUtils 		= require('loader-utils')
,	path 			= require('path')
,	nativeCss 		= require('../native-css')
,	fs 				= require('fs')
;
module.exports = function(content) {
	// questionable - i dont like to cache styles as its dev-madness
	// this.cacheable && this.cacheable();
	if(!this.emitFile)
		throw new Error('emitFile is required from module system');
	var query 		= loaderUtils.parseQuery(this.query)
	,	url 			= loaderUtils.interpolateName(this, query.name || '[hash].[ext]', {
			context: query.context || this.options.context,
			content: content,
			regExp: query.regExp
		})
	,	result 	= nativeCss.convert(content)
	;
	return 'module.exports =  ' + JSON.stringify(result);
}
module.exports.raw = true;
