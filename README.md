# cssobjects-loader  
> load Styles as JS-Objects

### basic information
* webpack loader
* per [nativeCss](https://github.com/raphamorim/native-css)
* transforms css-properties to camelCase
* very handy for react/material-ui style injections

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
// 		'fontSize': '20px'
// 	},
// 	anotherTest: {
// 		'paddingTop': '5px'
// 	},
// 	test23: {
// 		'fontSize': '23px'
// 	}
// }
```

> to keep the properties as they are, pass the query 'transform=false' to the loader

> for ES6/7 usage, define loaders in the webpack config

### issues
* for objectformat and enhanced usage go to [nativeCss](https://github.com/raphamorim/native-css)
* loader related issues or PR's are welcome
* subClass structure
    * stabilize 'injectSubClasses'
    * if transform = false, 'injectSubClasses' isn't called

### to be done  
* check loader arguments (params, query, ...)
	* react usage (native-css --react)
* write testscripts, DocBlocks, Comments
* clean dependecies
* enhanced 'transform' handling
* ES6 ?