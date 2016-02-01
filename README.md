# cssobjects-loader

### to be done  
* write tests
* sync callback
* enable [nativeCss](https://github.com/doubleu23/native-css) to accept buffers
	* load content per Buffer

### usage 
```npm install cssobjects-loader```

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
let style 	= require('css-loader!postcss-loader!cssobjects-loader!stylus-loader!./test.so');
```