--- 
title: Using the Picture element with srcset
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

Grabbed from [NYStudio](https://nystudio107.com/blog/the-css-background-image-property-as-an-anti-pattern). This snippet provides: lazy load­ing if the brows­er sup­ports it, webp if the brows­er sup­ports it, and 
a srcset of opti­mized respon­sive images that the brows­er can choose from.

```html
<picture>
    <source
        srcset="/path/_1170x658/man-with-a-dog.jpg 1170w,
                /path/_970x545/man-with-a-dog.jpg 970w,
                /path/_750x562/man-with-a-dog.jpg 750w,
                /path/_320x240/man-with-a-dog.jpg 320w"
        sizes="100vw" />
    <source
        srcset="/path/_1170x658/man-with-a-dog.webp 1170w,
                /path/_970x545/man-with-a-dog.webp 970w,
                /path/_750x562/man-with-a-dog.webp 750w,
                /path/_320x240/man-with-a-dog.webp 320w"
        sizes="100vw"
        type="image/webp"
    />
    <img
        src="/path/man-with-a-dog-placeholder.jpg"
        alt="Man with a dog"
        style="object-fit: cover;"
        loading="lazy"
    />
</picture>
```