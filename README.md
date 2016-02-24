# cssobjects-loader  
> load Styles as JS-Objects

### basic information
* webpack loader
* for react style properties
* per [nativeCss](https://github.com/raphamorim/native-css)

### usage 
```npm install cssobjects-loader --save```

```Stylus
// test.styl
.test
	font-size 20px
#anotherTest
	padding-top 5px
.test23
	font-size 23px

```

```Javascript
// in your JS
let style 	= require('cssobjects-loader!stylus-loader!./test.styl');
console.log(style);
// {
// 	test: {
// 		'font-size': '20px'
// 	},
// 	anotherTest: {
// 		'padding-top': '5px'
// 	},
// 	test23: {
// 		'font-size': '23px'
// 	}
// }
```
> for ES6/7 usage, define loaders in the webpack config

### issues
* for objectformat and enhanced usage go to [nativeCss](https://github.com/raphamorim/native-css)
* loader related issues or PR's are welcome

### to be done  
* check loader enhancements (cachable, params, ...)
* react usage (native-css --react)
* write testscripts
* sync callback
* enable nativeCss to accept buffers
	* load content per Buffer