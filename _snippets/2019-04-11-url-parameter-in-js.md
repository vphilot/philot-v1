--- 
title: URL Parameters implementation in JavaScript
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

Sometimes we want to be able to use url parameters not to query a database or serve dynamic content, but for triggering specific actions on a page instead. Here's a simple implementation of this technique:

```js

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), 
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

document.addEventListener("DOMContentLoaded", function() {
    // format will be www.myurl.com?query=term
  if (getParameterByName("query") === 'term') {
      //do your magic here
    }
});
```