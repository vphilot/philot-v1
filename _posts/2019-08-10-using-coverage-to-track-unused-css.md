--- 
title: Using Chrome Dev Tools to track down unused CSS
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

Maintaining and updating web projects developed by other people has its specificities. Sometimes you're working on a page or application that has been maintained by several different people over the years and you realize stylesheets can become *messy*, to say the least. 
w
There are great tools out there such as [PurgeCSS](https://www.purgecss.com/){:target="_blank"} that will automate this process for us, but when development is made on a CMS and/or you don't have the time to set up a local developing environment, Chrome Dev Tools is a great alternative.

Let's try the process with [cbc.ca](https://www.cbc.ca/){:target="_blank"} just for education purposes. The first step is bringing up the Chrome Dev Tools panel with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows) <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac). Click on the **Sources** tab and then open the **Command Menu** wih <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Windows) <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac), type in and select *Show Coverage*.

One in the **Coverage Tab** it's a very simple process: click on the *reload* button to reload the page and start capturing coverage. The page will reload and the panel will populate with many (sometimes too many) sources. When you click once on an element, its source code will pop up as a tab right above the Coverage tab:

![the Coverage tab](/assets/images/post/using-coverage-to-track-unused-css-1.jpg "the Coverage tab")

Throughout the source code, Chrome will highlight with *green* the rules being applied on the page and with *red* the unused CSS. On the Coverage tab below, you can see the percentage of unused CSS in relation to the total file size: **94.2 %**. That looks like a lot! 

Before we go thinking it's a matter of deleting every rule that shows up as red, hold my beer for a second. In this case for CBC, the source CSS is very tidy and organized, so it's easy for us to see that this CSS is a general big bundle for different pages inside their website. Even though this could be a little more modularized for performance matters, it's a common practice to have this kind of centralized styling process.

A good way of testing this is clicking thought different pages inside their website while looking at the Coverage tab: the percentage of unused CSS will change drastically from one page to the other, and that means that several rules only apply to certain pages/components.

What I mean here is: **Coverage is a great way of finding unused CSS but it needs a lot of testing to avoid errors**. Another example is media queries: many are not being used on Desktop and therefore will show up as red (unused), but we have to be mindful that they will be used in another viewport sizes.

I believe we must make all efforts to serve users only what they need. Combining the Coverage tab with some fine grain testing, I've been able to track down thousands of lines of unused CSS and speed up many projects I've been working on without the need for third-party tools. It's a good solution for small scale / short term projects and last-minute optimization. 