--- 
title: CSS Object Fit for Internet Explorer
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

Here's a nice polyfill by [Federico Brigante](https://github.com/bfred-it/object-fit-images) for the object-fit property which is not natively supported by Internet Explorer.

HTML:

```html
<script src="ofi.min.js"></script>
<img class='img-fit ' src='image.jpg'>
```

CSS:

```css
.img-fit     {
	object-fit: contain;
    /* font-family necessary for IE */
	font-family: 'object-fit: contain;';
}
```

JavaScript:

```js
//when content loaded
objectFitImages();
```