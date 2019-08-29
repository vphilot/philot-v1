--- 
title: HTML email 101 for Web Developers
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

I first started building emails out of a job necessity more than anything else. From one day to another, I was suddenly spinning in a loop of marketing campaigns and client requests. My only way of surviving was adapting and trying to learn as much as I could while still delivering it.

### Know your medium a.k.a *Don't go crazy on the mockup*
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Understanding that an HTML email is not an HTML website is a great way to start. Saying that email rendering lagged behind in many web technologies is an understatement It lagged *way* behind and that's all due to compatibility issues. The more you understand email design, the more you acknowledge that the skill set and tools available for the job are very specific and way different from what we know as web development.

Those differences must be considered from the drawing board to client approval. I've seen clients approve lockups designed by people with no idea on how an email works only to watch them cringe in frustration when these projects had to be adjusted because of responsiveness, compatibility, and accessibility. It's not to say that we should limit our creativity, but if the big tech companies are not implementing crazy JavaScript features in their email campaigns you can be assured there is ~~Outlook~~ a good reason for that.

### Spoiler alert: say goodbye to fancy typefaces
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

One of the biggest frustrations I came across as a web developer diving into the email marketing world was the inability to use custom fonts. Importing web fonts via `@import` may work on a few email clients, but one valuable lesson I learned after some years hard working on HTML templates is **to avoid limited compatibility solutions**.

It's not a rule of thumbs, but working with solutions that only apply to certain scenarios is a good way to dive into a fallback hell. Let's say your email campaign looks really good with Proxima Nova loaded via Google Fonts, but does it really work when this styling rule does not apply and all you have are system native fonts? You're creating a problem you did not have in the first place. You're better off with a campaign that looks *really good* with native fonts and then progresses to custom typefaces *if* they are supported. **If a client approves a creative with Proxima Nova, be assured that they'll not be happy when they see Arial displayed in Outlook 2013.**

Going back to my own experience, I was working for designers who had little idea of the limitations presented by HTML emails (see: *don't go crazy on the mockup!*) and clients who were used to the idea of simply exporting flat images. For the whole email. To preserve styling. **This is a terrible practice** for several reasons: it makes campaigns inaccessible for most screen readers, may trigger spam filters, increases bandwidth needed to load the email, only to name a few. I not only had the challenge to make those designs come alive but also to *educate* designers and clients on the best practices we should be implementing.

Being a good email developer means not only paying attention to the technical aspects of the product you're creating but also achieving a holistic perspective on everything that happens from the moment the campaign is deployed &mdash; like accessibility and performance. 

### Email clients change all the time
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

The tech ecosystem is dynamic, we all love it, but sometimes it can be a hassle to handle every single new app update out there. 

I recently stumbled upon a bug on Samsung devices running the stock email app that adds a weird margin to the right of every single email. Testing and researching these little bugs is time-consuming, but thankfully I found that I needed to add a simple CSS rule to my `<head>` element and it'd do the trick.

Who knows what will happen on the next update in your client's preferred email client? Keeping up with these iterations is necessary to maintain consistency and deliver a good product.

### There are many Marketing platforms out there
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

I have a fair amount of experience with Salesforce, one of the biggest (and more expensive) integrated marketing solutions out there. But many others use Mailchimp, Campaign Monitor, Sendinblue and many other custom solutions. It depends on the company you're working for and how their marketing team prefers to do business. These platforms are a fundamental part of how email campaigns work and they allow marketers to integrate user journeys, customer segmentation, and tracking information in the code you'll be delivering. 

Each platform has its own sets of features and limitations -- Salesforce, as an example, does not allow full source code editing (but keeps `<style>` tags in the body) and has a powerful scripting platform (AMPscript) that lets you use variables to customize the email content based on its subscribers. Other platforms will allow full source code editing but will blacklist several HTML tags and styling rules that will limit how further you can go. You can't expect these platforms to change in the short term and learning how to deal with these limitations will only come with time exploring these tools.

### How about Outlook?
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Each email client has its own limitations that you have to be prepared for in the long run, but Outlook is still the main culprit. It has its own way of dealing with formatting and styling, all because it uses *Word* as its rendering engine. This strategy enabled amazing possibilities for users, who can copy and paste directly from Microsoft Office in Outlook and keep their formatting &mdash; however, it's a nightmare for anyone willing to master Email Design and Development.

The latest Outlook builds for Windows and MacOS are getting better at understanding modern HTML syntax, but they still can't compare to most web clients when it comes to rendering layouts properly. Simple styling rules like `border-radius` are completely ignored. What looked great on Apple Mail suddenly looks a little too flat in Outlook for Windows. You have to be technically skilled and *psychologically prepared* for that.

### But it's not only Outlook 
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Every single email client will bring different challenges to be the table. Web Gmail, as an example, will strip every single `<style>` tag that's not in the `<head>` for security reasons, so you have to make sure your campaign looks good with inline rules. The app will respect these rules though, so it's a good strategy to have in mind to ensure responsiveness.

### Alt text is fundamental
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Long story short: make sure every image has a meaningful alternative text in it! This will not only help screen readers but also provide a fallback for older email clients and slow connections. 

### Inline is king here
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Inline styles are not the best practice when it comes to web pages and apps, but they're an essential part of making HTML emails come to life since several email clients will strip your `<style> ` tags and ignore any CSS imported with  `<link>`. I prefer to do most of the process manually, because 1) I'm used to it already and 2) it gives me more granular control over what's happening. But [Mailchimp has a great inliner tool](https://templates.mailchimp.com/resources/inline-css/) that will make your life way easier if you're just starting.

### Example: coding a responsive CTA button
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Here's a very simple example on how to be aware of each email client's limitations to build something a nice and responsive button:

```html
<table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:5px;" width="100%">
    <tr>
        <td class="mobile-hidden" width="35%">
        </td>
        <td align="center" bgcolor="#E19617" nowrap="nowrap" style="border-radius: 2px;padding-left:15px; padding-right: 15px; padding-top: 15px; padding-bottom: 15px;" width="*">
            <a href="https://www.your-url-here" style="color:#ffffff;font-family: Google Sans, Arial, Helvetica, sans-serif;font-size:20px;font-weight:bold;line-height:110%;text-decoration:none;" target="_blank">
                    Check it out!
            </a>
        </td>
        <td class="mobile-hidden" width="35%">
        </td>
    </tr>
</table>
```

Considering a 600px wide email, there is one table row on each side of the main `<tr>` with 35% width each, letting `width="*"` do its job and give whatever's space is left to the main button (in this case, 30% or 180px). The `mobile-hidden` class lives in the head of the email set to `display: none`. It's ignored by most desktop clients, but it does render in Gmail and Apple Mail, which means that these two "spacing" table rows will disappear and provide a nice full width button. Remember the issue with custom fonts? Well, Gmail lets you call its own `Google Sans` in the browser which is a nice typace to have in case clients are using it. That can change anytime though, and I cannot hide my excitement to know that these platforms are ever changing for the better.

### Bottom line: coding a good responsive email is hard and it takes time 
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

Take a closer look at some marketing campaigns on your inbox. I'm sure you'll find that many of them render the same on desktop and mobile. That's because **building a good responsive email is hard**, and some businesses can't afford the slow turnaround for developing and testing a fully customized solution. Here are some resources to get you started:

* [Lee Munroe's starting template (nice reference for studying)](https://github.com/leemunroe/responsive-html-email-template)

* [An Introduction To Building And Sending HTML Email For Web Developers](https://www.smashingmagazine.com/2017/01/introduction-building-sending-html-email-for-web-developers/)

* [The Ultimate Guide to Web Fonts](https://litmus.com/blog/the-ultimate-guide-to-web-fonts)
