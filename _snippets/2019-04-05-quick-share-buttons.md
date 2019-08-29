--- 
title: Quick Share buttons
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

There are many Share This implementations out there, but my goal with this one was to provide something that's highly customizable, lightweight, and requires no external libraries.

HTML:

```html
<div class="share">
    <p>Share this:</p>
    <a href="https://www.facebook.com/sharer/sharer.php?u={url}" class="share-btn">Facebook</a> 
    <a href="https://twitter.com/share?url={url}&amp;text={text}" class="share-btn">Twitter</a> 
    <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url={url}" class="share-btn">Linkedin</a> 
    <a href="mailto:?subject={subject}&amp;body={url}" class="share-btn">Email</a>
</div>
```

CSS:

```css
.share {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }

.share a {
    font-size: 1rem;
    color: #00a990;
    padding: 0.5rem;
  }
```

JavaScript:

```js
window.addEventListener('DOMContentLoaded', (e) => {
  var shareButtons = document.querySelectorAll(".share-btn");
  if (shareButtons) {
        [].forEach.call(shareButtons, function (button) {
            button.addEventListener("click", function (event) {
                var width = 650,
                    height = 450;
                event.preventDefault();
                window.open(this.href, 'Share Dialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' + width + ',height=' + height + ',top=' + (screen.height / 2 - height / 2) + ',left=' + (screen.width / 2 - width / 2));
            });
        });
  }
}
```

Codepen:

<p class="codepen" data-height="267" data-theme-id="dark" data-default-tab="js,result" data-user="vphilot" data-slug-hash="vqExLZ" data-preview="true" style="height: 267px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Quick Share Buttons">
  <span>See the Pen <a href="https://codepen.io/vphilot/pen/vqExLZ/">
  Quick Share Buttons</a> by Vinicius Philot (<a href="https://codepen.io/vphilot">@vphilot</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>