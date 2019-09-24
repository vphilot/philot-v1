--- 
title: We're killing the internet with network requests
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

I had the oppotunity to attend an excellent talk by [Kyle Simpson](https://twitter.com/getify) at this year's Web Unleashed when he describes how it's like to work in isolated communities in rural India or Africa. My own experiences also add up to that: I was born in a very small town in rural Brazil and, to this day, visiting Granny means having to deal with a very slow 2G network that only arrived 5 years ago. **Data is a commodity** there and it comes with a steep price. 

Loading [cnn.com](https://cnn.com) on your phone will set you back 2.83 MB in total data tranfer (compressed). Most of it is pure JS, since their image optimization pipeline seems to work very well. This is a top notch product that is trying to do it right &mdash; can you imagine how the poorly compressed ones look like? Almost 3MB of data looks alright for us living in metropolitan areas of developed countries, but for some people with 250MB a month it can mean a big data overage bill and / or interruption in data service.

I believe must increase our awareness over how much data we're making our users download and how it affects not only their data bills but also how much battery they'll be left with by the end of the day.

### When we have it at our fingertips
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

[Minifying](https://developers.google.com/speed/docs/insights/MinifyResources) and Gzip compresion are go-to strategies to address these problems and they've been here for a while. On the other hand, responsive images with `<picture>` and `srcset` have a steep learning curve ([I have struggled myself](/snippets/2019-06-05-using-picture-with-srcset.html)) and adoption is still fairly slow.

Using external libraries and frameworks must be analyzed on a project based need and not a default behaviour. When extremely necessary to do so, [Google Hosted Libraries](https://developers.google.com/speed/libraries) are a good alternative. Use [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) regularly and re-think your workflow if the product falls below 80 on the score &mdash; also paying special attention to the [Time to Interactive metrics](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive).

### When third party are responsible for content
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Every now and then I stumble upon Wordpress implementations serving 5mb pngs, mostly because marketers and content editors who are responsible for uploading assets don't have the any idea of what image compression means. Is it their job after all? **I don't think so.** 

I've seen even worst cases when Graphic designers send over print-ready files (in CMYK!!) for content editors to upload. And they will just upload it. What now, is it the designer's job to deliver assets consistent with the medium? **I would say a 100% yes.** I lot of people still struggle to understand the fluid nature of the web and still treat is as a print medium. 

### Bottom line: we are everywhere now, and we must take accountability for the products we deliver.
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Either way, it's our job to hoook optimization and minification tools into the deployment pipeline. When it isn't possible to do so, it's fundamental to have appropriate documentation and tied up specs to try and garantee the assets will he coherent with what the page / app needs. This whole story is less about blaming others for performance issues and more about trying to foresee better ways of ensuring these mistakes will be caught midway before when can impact user experience.




