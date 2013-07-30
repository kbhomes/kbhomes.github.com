---
layout: post
title: "MTPZ: Initialization, Part 2"
tags: [zune, mtpz]
nav: blog
---

Well, as I found out soon enough after [publishing my notes](http://kbhomes.github.com/2011/05/29/mtpz-notes-so-far.html),
it seems that essentially I _had_ solved the mystery of initialization. Go figure.

So, as much as I hate writing a blog post so short and insubstantial, I felt it necessary to create one to give closure to initialization.

A quick recap of what is done in initialization:

* Two blocks of data are decrypted by the software; the first is the certificate data, and the second is the RSA private key data.
* The certificate data is deserialized into a certificate structure for easy access, and the RSA private key data is stored.

That's really it.

Go ahead and just meet me [at the next post](http://kbhomes.github.com/2011/07/06/mtpz-handshake-part-1-application-certificate-message.html), 
which deals with generating the first message that is sent by the software to the device.
