'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformToNestedDomStyleObjects;
// f.e. font-family => fontFamily; border-radius => borderRadius
var transformPropertiesToCamelCase = function transformPropertiesToCamelCase (object) {
  var output = {};

  for (var _key in object) {
    if (typeof object === 'string') return object.replace(' !important', '');

    var key = _key;
    var value = object[_key];

    console.log('old key', key);

    if (~key.indexOf('-')) {
      var splittedKeys = key.split('-');
      splittedKeys = splittedKeys.map(function (v, i) {
        return i > 0
        // UCFIRST if ! first element
        ? v.charAt(0).toUpperCase() + v.substr(1) : v;
      });
      key = splittedKeys.join('');
    }
    console.log('new key', key);

    output[key] = transformPropertiesToCamelCase(value);
  }
  return output;
};

// only for one level down
// tbd: make it recursive
// transforms
//    {className__subClassName: {property: value}}
// to {className: {subClassName: {property: value}}}
var injectSubClasses = function injectSubClasses (_object) {
  var object = _object;
  for (var key in object) {
    if (~key.indexOf('__')) {
      var keySplit = key.split('__');
      var parentkey = keySplit[0];
      var newKey = keySplit.slice(1).join('__');

      object[parentkey][newKey] = object[key];
      delete object[key];
    }
  }
  return object;
};

function transformToNestedDomStyleObjects (cssObject) {
  var transformTo = arguments.length <= 1 || arguments[1] === undefined ? 'js' : arguments[1];

  if (transformTo !== 'js') {
    throw Error('[transformToNestedDomStyleObjects] transforming js to css is not supported yet');
  }

  var output = {};
  var jsStyle = injectSubClasses(transformPropertiesToCamelCase(cssObject));

  return jsStyle;
}
