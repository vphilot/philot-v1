--- 
title: I believe you should try functional CSS
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

Functional CSS (or Atomic CSS, Utility-first CSS, and so forth) is a thing and it looks like it's here to stay. My first trials with this technology were quite lazy attempts to make my styling more organized and utilitarian. There's something that always bothered me with the regular approach to CSS classes and their taxonomy: **elements accumulate and transform their meanings over time**. In my opinion, no matter how tidy and organized your styling is, even BEM will let you down when you need last minute tweaks or a super urgent new feature.

### We see different meanings for the same thing even over a small period of time. That's why CSS classes based on semantics become a problem in the long run. 
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

As designers and developers, it's very unlikely that we'll have enough time to plan to predict all of the visual categories and semantic elements their project will require from ground zero to launch. We can use wireframes and high fidelity mockups to guide our ways through development, however these assets can be quite time consuming to change or rebuild when you have a day or so to implement a new section or feature on a website. 

### A use case: let's follow Hannah on a typical work week
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Hannah works for a big company in the media business. She's responsible for updating and maintaining their front end based on requests created by different departments. The projects she works on vary from very small to huge scales, and she very often touches designs developed by different co-workers and third-party providers. 

On a specific project, she needed to update the following hero:

![hero to be updated by Hannah](/assets/images/post/I-believe-you-should-try-functional-css-mockup.jpg "hero to be updated by Hannah")

And here are the markup and stylesheet being used on the page:


~~~ html
<section class="hero container">
  <div class="container">
    <div class="hgroup">
      <h1>Event Name</h1>
      <p><span class="larger">Wednesday, September 14, 2019</span><br> 
			4820th Street, Edmonton AB, T5J 2R4</p>
    </div>
    <div class="hero-logo"><img src="img/logo.jpg" alt="company logo">
      <p style="background: none; font-size: 20px; padding: 10px; border-radius: 10px; color: #fff;">
        Registration callout</p>
    </div>
  </div>
</section>
~~~

~~~css
.hero {
	background: url('img/hero.jpg');
	background-size: cover;
	background-position: bottom center;
	padding: 100px 25px;
	margin-top: 51px;
	text-align: center;
	color: #FFF;
}

.container {
	margin: 0 auto;
	width: 90%;
	max-width: 1000px;
}

section {
	padding: 50px 25px;
}

.larger {
	font-size: 20px;
}
~~~


Good practices aside, Hannah cringed a little to see that the naming convention did not make sense to her. What does the class *`.larger`* even mean? Why is there a *`<span>`* element with inline styling inside a paragraph? Is there a specific reason to force a line break instead of a block element? And this is just the tip of the iceberg in a set of 4 long pages she had to update.

What if she tried a different, **BEM** based approach? Let's see how that would go:

~~~css
.hero-card {
	background: url('img/hero.jpg') bottom center cover;
	text-align: center;
	color: #ffffff;
}

.hero-card__content {
	padding: 2rem;
}

.hero-card__title {
	font-size: 1.8rem;
}

.hero-card__date {
	font-size: 1.2rem;
}

.hero-card__body {
	font-size: 0.85rem;
}

.hero-card__logo {
	width: 20%;
	height: 20%;
	object-fit: cover;
}
~~~

Hannah believes this approach makes her styling and markup way more readable and easier to update. If the client wants to add more information in the future, she can reuse any of the classes she created here or simply add a new `.hero-card__element--modifier` class and keep the car running. This is important to her company and the fast turnaround she has for most projects. Spending less time understanding what things **mean** and more time fine-tuning what they **do** is fundamental here.

With her code based refactored for all the pages, Hannah presented the result the next day (did I mention the turnaround is *very, very fast*?) and waited for client approval to deploy the new version. Everything should be live the next day so the attendees could shop for tickets and accommodation.

That's when the clients decided they wanted not only one, but several changes in the way the pages were working. On the hero, they wanted to include a brief description below the callout, add in a legal type, and introduce a second sponsor logo along with the existing one.

Some of those changes were pretty straightforward, but others start to complicate the readability of Hanna's styling &mdash; especially the ones that depend on **meaning**. For text classes, she already had `title`, `date`, and `body`. Would she add two extra classes named `description` and `legal` respectively? What's the hierarchy rule for `body` and `description` anyway? The meaning of these categories starts to blend and become a blurry, arbitrary set of assumptions hard to read in the future. This happens very often on last-minute changes, and achieving the desired result can compromise the logic of the naming conventions very easily.


### Functional CSS comes in handy as an easier to maintain solution for fast-paced environments and last minute tweaks
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Let's see how these text classes can be optimized using **Functional CSS**:

~~~css
.has-text-xl {
	font-size: 2rem;
}

.has-text-lg {
	font-size: 1.5rem;
}

.has-text-md {
	font-size: 1rem;
}

.has-text-sm {
	font-size: 0.85rem;
}

.has-text-xs {
	font-size: 0.7rem;
}
~~~

The same logic can be used for padding, margin, and other styling elements that need fine grain control. Hannah now has 5 classes for type size that can be used throughout the whole project, with a **mixed** BEM-functional approach. 


I first started to explore a functional approach to CSS with the amazing [Bulma](https://bulma.io/) framework. It saved me **tons** of hours and headaches for a large scale, last minute website I was working on. There was obviously a learning curve and a feeling of *"why am I writing so much CSS?"* in the beginning, but I quickly found out that detaching my styling from meaning and trusting it to be handled by [semantic HTML5](https://www.w3schools.com/html/html5_semantic_elements.asp) was a pretty good choice for most projects.

As it often happens to web development, each use case might bring a new set of needs and a different approach on how to solve a problem, but my experience with Functional CSS has been very rewarding so far and I believe it's a very good practice to keep in mind.

Want to learn a little more about Functional CSS? Has something to share? **[Drop me a line!](mailto:vphilot@gmail.com?subject=I%20found%20this%20very%20nice%20article%20on%20your%20website%20and%20I%20have%20something%20to%20share)**


