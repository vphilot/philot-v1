--- 
title: We're killing the internet with network requests
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---



### We need to sit down as a community and think about the assumptions we make regarding how people interact with our products. 
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

I had the oppotunity to attend an excellent talk by [Kyle Simpson](https://twitter.com/getify) at this year's Web Unleashed when he describes how it's like to work in isolated communities in rural India or Africa. My own experiences also add up to that: I was born in a very small town in rural Brazil and, to this day, visiting Granny means having to deal with a very slow 2G network that only arrived 5 years ago. **Data is a commodity** there and it comes with a steep price. 

### We are everywhere now, and we are responsible for the products we deliver.
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Loading cnn.com on your mobile phone will set you back 2.83 MB in total data tranfer (compressed). Most of it is pure JS, since their image optimization pipeline seems to work very well. This is a top notch product that is trying to do it right &mdash; can you imagine how the poorly compressed ones look like? Almost 3MB of data looks alright for us living in metropolitan areas of developed countries, but for some people with 250MB a month it can mean a big data overage bill. 

### Problem 1: when we have it at our fingertips
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Responsive images with `<picture>` and `srcset` have a steep learning curve ([I'm struggling myself](/snippets/2019-06-05-using-picture-with-srcset.html)) and adoption is still fairly slow.

### Problem 2: when third party are responsible for content
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Every now and then I stumble upon Wordpress implementations serving 5mb pngs, mostly because marketers and content editors who are responsible for uploading assets don't have the any idea of what image compression means. Is it their job after all? **I don't think so.** 

I've seen even worst cases when Graphic designers send over print-ready files (in CMYK!!) for content editors to upload. And they will just upload it. What now, is it the designer's job to deliver assets consistent with the medium? **I would say a 100% yes.** 

Either way, it's our job to hoook optimization and minification tools into the deployment pipeline. When it isn't possible to do so, it's fundamental to have appropriate documentation and tied up specs to try and garantee the assets will he coherent with what the page / app needs. This whole story is less about blaming others for performance issues and more about trying to foresee better ways of ensuring these mistakes will be caught midway before when can impact user experience.




