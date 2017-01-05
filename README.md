# cssobjects-loader [![npm version](https://badge.fury.io/js/cssobjects-loader.svg)](https://badge.fury.io/js/cssobjects-loader) [![Known Vulnerabilities](https://snyk.io/test/npm/cssobjects-loader/badge.svg)](https://snyk.io/test/npm/cssobjects-loader)  
> load Styles as JS-Objects

### basic information
* webpack loader
* per [nativeCss](https://github.com/raphamorim/native-css)
* transforms css-properties to camelCase
* very handy for react style injections

### usage 
```npm install cssobjects-loader --save```

__your.so__
```Stylus
.test
	font-size 20px
#anotherTest
	padding-top 5px
.test23
	font-size 23px
    .testInner
        font-decoration none
```

__your.js__
```Javascript
let style 	= require('cssobjects-loader!stylus-loader!./your.so');

console.log(style);
// {
// 	test: {
// 		'fontSize': '20px'
// 	},
// 	anotherTest: {
// 		'paddingTop': '5px'
// 	},
// 	test23: {
// 		'fontSize': '23px'
//      testInner: { // atm: only 1 lvl deep
//          'fontDecoration': 'none'
//      }
// 	}
// }
```

__additional information__
> to __keep the style properties__ as they are, pass the query 'transform=false' to the loader  
```Javascript
let style   = require('cssobjects-loader?transform=false!stylus-loader!./your.so');
```

> for __pure css__ just use
```Javascript
let style   = require('cssobjects-loader!./your.css');
```

> for __other style preprocessor__ syntax (less, sass, scss, ...)
> just add the realated loader (the loader has to output css!)
```Javascript
let style   = require('cssobjects-loader!sass-loader!./your.sass');
```

> for ES6/7 usage, __define loaders in the webpack config__  
```Javascript
{
    test: /\.(so)$/, // .so = custom file extension
    loader: 'cssobjects-loader?transform=true!stylus-loader'
}
// so you can just
// import yourStyleObject from '/styles/your.so'
```

### issues
* for objectformat and enhanced usage go to [nativeCss](https://github.com/raphamorim/native-css)
* loader related issues or PR's are welcome
* style's subclasses recognized only 1 lvl deep
  * others are defined as followed: {parentClass__subClass1__subClass2: {}}

### to be done  
* inject style's subclasses recursively
* write testscripts, DocBlocks, Comments
* ES6 (/dist + buildScript)
