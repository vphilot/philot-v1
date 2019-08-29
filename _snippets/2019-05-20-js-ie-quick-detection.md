--- 
title: Detecting Internet Explorer with JavaScript
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

Detecting Internet Explorer is an important part of some projects, especially when implementing any kind of progressive enhancement technique. Unfortunately, [Microsoft changes the User Agent string to make it look ike something else](https://blogs.msdn.microsoft.com/ieinternals/2013/09/21/internet-explorer-11s-many-user-agent-strings/). Here's a quick workaround to detect IE:

```js
function isIE() {
  var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
  var msie = ua.indexOf('MSIE '); // IE 10 or older
  var trident = ua.indexOf('Trident/'); //IE 11
  return (msie > 0 || trident > 0);
}
```