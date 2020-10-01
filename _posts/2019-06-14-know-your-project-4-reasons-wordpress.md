--- 
title: ! 'Know your project: 4 reasons why I left Wordpress'
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

Wordpress is huge, and is probably one of the reasons I started working with web development in the first place. From my first online portfolio to my first clients in web design, the platform always provided a straightforward way for clients and “webmasters” (which is even a thing anymore) to communicate and exchange information, providing seamless updates and separation of data, functionality, and content that was groundbreaking at the time.

That was back then, when Progressive Web Apps, Graceful Degradation, Progressive Enhancement, and Javascript Frameworks weren’t still here. Wordpress was the choice for many projects, no matter the scale. It is still the platform-to-go for many companies and professionals because it’s so accessible and easy to use. But **its accessibility comes at a cost**, and there is an increasing community of developers who believe the price too high. I am on board, by the way.

To understand how Wordpress became a little problematic, first we need to have a better understanding of how it works. In very superficial terms, Wordpress is composed of PHP code and MySQL databases. PHP is responsible for generating the pages dynamically with content that is read from the MySQL databases. The same dynamic PHP is responsible for outputting the pages to the front end, serving them with HTML, CSS, and JS. Wordpress is popular because PHP is relatively easy to learn and MySQL has a robust structure when it comes to querying, inserting and updating data.

The other reason Wordpress is so popular is because it was the mainstream solution for code-free website management. There are several CMS solutions today, but back then they were hard to implement and a real pain to update. Wordpress came with a dashboard, a simple but very effective interface to tell clients *”you should care about the content, leave the rest to your web developer”*.  This was the origin of many solutions we see today, with popular mainstream platforms like Squarespace and Wix.  The idea alone of separating content and code gave birth to a whole new industry whose main product was selling the possibility of building your own website to people who didn’t know how to code.

And that’s why Wordpress is so important: it builds the base work to empower people and bring their ideas to life, not only limited to a blog page anymore but translating any idea into the WWW. There are developers who make a living out of building themes, plugins, and widgets for Wordpress. There are marketplaces dedicated exclusively to selling content for the platform. **Wordpress is huge &mdash; but it’s also slow** because:

### 1. Querying databases shouldn’t be the norm
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Every time a request is made for a Wordpress page to render, the PHP scripts will query the database on its current state, populate the templates, and output the Front End. That is **a lot of effort and time** to render a single page. There are solutions out there, such as caching plugins for WP, but they don’t necessarily mean that the performance will be the same as a static page. Moreover, the more robust the implementation gets, with added plugins, widgets, and custom post types, the bigger the performance hit. 

The open source side of Wordpress also matters here: with many plugins written by many developers, it’s hard to guarantee every single one is tested for optimal performance. And as much as WP is relatively easy to develop, it can suddenly become extremely convoluted when plugins are added to the mix. Troubleshooting a slow Wordpress implementation is a very hard task, I can speak by my own professional experience here. Is it your server? A weird line of script hidden inside the last plugin you installed? Is there something wrong with the database? **It’s hard to debug,** especially considering you’re only looking at the front end on your browser.

### 2. You probably don’t need so many features
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Most Wordpress installations come with a **one-size-fits-all** approach. It means that it packs a lot of features and many (*so many*) plugins out of the box as an attempt to serve most use cases, from bloggers to e-commerce. It also means that the default database structure is more robust than what any user will ever need. It’s like buying a truck to take your dog to the vet. It will surely do the job, but at what cost? 

### 3. Wordpress is vulnerable
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}


If you’ve ever hosted a Wordpress installation, you probably know that security updates are vital to keeping your website running. There’s a reason for that: Wordpress (and most legacy CMS) databases [are prone to hacking](https://www.wpwhitesecurity.com/statistics-70-percent-wordpress-installations-vulnerable/){:target="_blank"}.   

This is not an issue if you have a simple online portfolio with a small to medium audience &mdash; just set a good backup plugin (*another plugin??* ) and you’re good to go. The problem is, again, **understanding the scale**: the impact of a database injection/hack on an e-commerce website can be huge. Good luck explaining to your client that this was not your fault.

### 4. Setting a local development environment is kind of a pain
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

After a couple of years using `npm` and Node JS, thinking about setting up a local Wordpress environment makes me cringe. You’ll need something that can serve files, interpret PHP, make MySQL database queries, and run phpMyAdmin to make handling the database less of a pain. XAMPP and MAMP are popular solutions for this problem, to begin with. Then you’ll need to make a local installation of Wordpress, create the databases, and start testing. 

After every single line of code you change, wait for the data querying slowly redraw your pages. This can be very time consuming, especially for junior and intermediate developers who do a lot of back-and-forth tweaks before coming to a reasonable solution. When the project is ready, it’s time to migrate everything to your actual server (there’s *also* a plugin for that) and you’re… good to go?! But are you, really?

Compare this with installing some node modules with hot reload, building static files, and pushing everything to a Github repository deployed in real time with Netlify. Just think about it.

### Bottom line: know your client and their needs
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Wordpress is trusted by millions of consumers worldwide, and it has a fundamental role in making the web open to more people. It’s not a *bad* platform by any means, but it’s not a standard boilerplate for every single project either. How badly does your client need a robust database solution? How often will the content be updated? How does it *scale* over time? 

The good thing about the current state of the web is that solutions come and go every day. Implementing content that is served dynamically and depends on constant queries is not the only option anymore. There are many static site generators out there that can provide a friendly user interface for clients. [Jekyll](https://jekyllrb.com/){:target="_blank"} (my personal favourite) and [Hugo](https://gohugo.io/){:target="_blank"} are good examples. Learning how to understand what each project needs and planning for maximum performance is the best way to avoid unnecessary headaches in the long term and making clients happy. Don't you love happy clients? I do.
