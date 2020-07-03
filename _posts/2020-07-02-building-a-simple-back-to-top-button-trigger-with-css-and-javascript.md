---
title: Building a simple Back to Top button trigger with CSS and JavaScript
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

I've been trying to decouple my projects from dependencies and libraries as much as I can lately. It not only gives me a good opportunity to exercise some skills I have been neglecting but having the extra control over bugs and errors is also a welcome addition.

My latest adventure was the need to create a Back to Top button that would only show up after a specific element was on the page, and would then disappear when scrolled past a boundary container. Here is the basic acceptance criteria:

* A **top container** triggers the button visibility state to true when intersecting the viewport
* A **bottom container** removes the visible state from the button
* **Vanilla JS** only
* Back to Top button has a subtle opacity transition when changing states
* Back to Top button cannot be clickable when hidden
{: .has-bullet}

With these basic conditions given, let's stretch our coding muscles and bootstrap this solution!

### Understanding the problem
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Considering our markup to be composed of a Back to Top Button `#back-to-top`, a top container `#section-top`, and a bottom container `#section-bottom`, let's start by storing pointer references to these DOM Elements:

```js
    const btn = document.querySelector("#back-to-top");
    const topSection = document.querySelector("#section-top");
    const bottomSection = document.querySelector("#section-bottom");
```

Our first step is finding where both our section elements will intersect the page scroll flow. It seems like a simple task as you can state it as ***just find their scroll position value relative to the vertical space available on the page!***. Well, this is the solution itself, but JavasScript doesn't provide a specific method to find these values straight away. Instead, it provides a lot of helper methods available at the object level to deal with these types of calculations.

```js
     const topScrollTreshold =  topSection.getBoundingClientRect().top + window.pageYOffset
```

The `getBoundingClientRect` method can be called from a DOM element (in this case, the topSection) and will return a `DOMRect` object with properties that describe its size and its position relative to the viewport:

{% include webp.html
webp = "/assets/images/post/building-a-simple-back-to-top-button-trigger-with-css-and-javascript-1.webp"
legacy = "/assets/images/post/building-a-simple-back-to-top-button-trigger-with-css-and-javascript-1.jpg"
alt = "using element.getBoundingClientRect"
%} 

One important thing to consider is that the position properties (`top`, `left`, and so forth) returned by this method are **relative to the viewport** and are not aware of our total page height, which is fundamental for us to understand when the Back to Top button should show up. To work around this issue, we add the `top` value of our element to the current scroll position by accessing `window.PageYOffset`.
Property names are also important here: `window.pageYOffset` is the same as `window.scrollY`, but it has native support on IE.

A more in-depth look of the values `getBoundingClientRect` can also teach us that `padding` `and border-width` are added to the total width/height values if we're using the standard box model: 

{% include webp.html
webp = "/assets/images/post/building-a-simple-back-to-top-button-trigger-with-css-and-javascript-2.webp"
legacy = "/assets/images/post/building-a-simple-back-to-top-button-trigger-with-css-and-javascript-2.jpg"
alt = "using element.getBoundingClientRect"
%} 

Making use of `box-sizing: border-box` is a way to get rid of this behaviour, but for our case just being mindful of this rule is enough.

### Observing if we're already past the containers
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}


As a way of streamlining this process, we're going to add a conditional logic to our `topScrollTreshold` so it returns a boolean. We're now planning on making these variables live inside a `scroll` window event, so every time users scroll the variables will be checked and return a new set of values:

```js
  window.addEventListener("scroll", function (e) {
   const topScrollTreshold = topSection.getBoundingClientRect().top + window.pageYOffset < window.pageYOffset;
  }
```

We're adding our top container `.top` property to `pageYOffset` to find its position relative to the entire page scroll, and then checking if that value is smaller than the page scroll position (`pageYOffset`). For the bottom container the logic has a little caveat:

```js
  const bottomScrollTreshold = btn.getBoundingClientRect().top + window.pageYOffset > bottomSection.getBoundingClientRect().top + window.pageYOffset;
```
Back to our requirements:

* A bottom container removes the visible state from the button
{: .has-bullet}

**There is a chance that nothing will live below the Bottom container and it will never reach the top of the page**. According to MDN:

> The read-only Window property pageYOffset (...) returns the number of pixels the document is currently scrolled along the vertical axis (that is, up or down) with a value of 0.0, indicating that the **top edge of the Document** is currently aligned with the **top edge of the window's content area**.

That's the issue with measuring its position alone as we did to the Top container. Checking its intersection with the Back to Top button is a more fail-proof choice in this case.

### A little CSS
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

The extra CSS to make this button work is pretty simple: in its default state (hidden), no `pointer-events` will be observed and the `opacity` is set to zero. We're also positioning it as `fixed` relative to the viewport:

```css
.back-to-top {
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.back-to-top.visible {
    opacity: 1;
    pointer-events: all;
}
```

The `.visible` class describes its active state when it's clickable and fully opaque.

### Putting it all together
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

The final steps are adding more simple logic to trigger our button state based on the final outcome of the threshold checkers:

```js
//setting visibility based on scroll pos
    if (topScrollTreshold) {
      btn.classList.add("visible");
    } else if (btn.classList.contains("visible")) {
      btn.classList.remove("visible");
    }

    if (bottomScrollTreshold) {
      btn.classList.remove("visible");
    }
```
See the codepen below:

<p class="codepen" data-height="556" data-theme-id="dark" data-default-tab="result" data-user="vphilot" data-slug-hash="jOWmpdb" data-preview="true" style="height: 556px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Simple Back to Top trigger with CSS + JS (Vanilla)">
  <span>See the Pen <a href="https://codepen.io/vphilot/pen/jOWmpdb">
  Simple Back to Top trigger with CSS + JS (Vanilla)</a> by Vinicius Philot (<a href="https://codepen.io/vphilot">@vphilot</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>