---
title: HTML5 MP4 videos not working on iOS? Here's a fix.
layout: post
author: Vinicius Philot
bgcolor: "#f4f4f4"
---

I've been trought a pickle these days trying to make a simple HTML5 video with a MP4 source load on iOS. It just wouldn't load.

### Long story short
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

* Run your source file through Adobe Media Encoder
* Choose ***Mobile 1080 HD preset***
* On Video Settings, click Match Source to keep the original dimensions
* Still in Video Settings, uncheck the checkbox that locks ***Field Order*** and change it to ***Progressive***
* Play around with the target bitrate until your video is below ***50mb***
* Render the queue
{: .has-bullet}


### To sum up, the video should:
{: .intro .title .is-3 .has-text-weight-normal .has-line-spacing-tall}

* Be rendered with Field Order = progressive
* Be below 50mb in total size
{: .has-bullet}

If you ever googled your issue and ended up in a StackOverflow thread reading about server headers and response codes you never heard of, maybe this would help. I hope the solution worked on your end! [**Maybe let me know ?**](https://twitter.com/vphilot/)

