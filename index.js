/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author - Stefan Friedl @DoubleU23
*/
var loaderUtils               = require('loader-utils')
,   path                      = require('path')
,   nativeCss                 = require('native-css')
,   fs                        = require('fs')

var transformToNestedDomStyleObjects = require('./lib/transformToNestedDomStyleObjects.js').default

module.exports = function(content) {

  if (process.env.NODE_ENV === 'production')
    this.cacheable && this.cacheable()

  var options   = Object.assign(
    {},
    {transform: true}, // defaultOptions
    loaderUtils.getOptions(this) // could be null
  )

  // TBD: interpolateName()
  // https://github.com/webpack/loader-utils#interpolatename  

  var result    = nativeCss.convert(content)
  //  TBD: use "humps" for transformation
  ,   returnVal = options.transform ? transformToNestedDomStyleObjects(result) : result

  return 'module.exports =  ' + JSON.stringify(returnVal)
}
module.exports.raw = true
