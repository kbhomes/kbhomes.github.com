---
layout: post
title: "MTPZ: Syncing - MAC Count Hash"
tags: [zune, mtpz]
nav: blog
---

I actually did not catch this part of the MTPZ protocol until just recently, the reason being that this part occurs when you are
sending files to the device. As I said in the MTP Handshake Packets post, I stopped capturing the traffic as soon as the device
had completed the handshake, and so this part was not known to me until I tried to actually send a file to my Zune.

For starters, the MTP command to start a sync session with the device is `0x9214`, `PTP_OC_MTP_WMDRMPD_EnableTrustedFilesOperations`.
This command actually has four parameters, although it's more sensible to consider these parameters as one 16-byte hash that has been
split over four 4-byte parameters.

Open secure sync session
-----------------------

So let's start again with our 32-byte hash from part 3 of the handshake, our validate handshake response step.

<em><sub>CBC-MAC/SHA-256 hash:</sub></em>
<table class="hex_table"><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">7F E1 15 37 D4 47 8B 1F A8 DB 3D A6 AF DF 18 14 0D 52 47 85 FC 6F E7 54 </td><td class="hex_ascii">...7.G....=......RG..o.T</td></tr><tr class="hex_row"><td class="hex_address">000018</td><td class="hex_value">18 36 FD 58 A6 00 06 E9 </td><td class="hex_ascii">.6.X....</td></tr></tbody></table>

A variable, which we'll call `macCount`, is a 4-byte integer which is set to the 4 bytes that are 16 bytes into the hash (confusing sentence,
I know). So, in this instance, it will have the value of `0x0D524785`.

The next parts of the process are exactly the same as during part 3. That is, the last 16 bytes of the CBC-MAC/SHA-256 hash are truncated,
and the remaining 16 bytes are used as an encryption key. Empty bytes are then encrypted with this key, and two transformations are applied
to obtain two different 16-byte blocks of data. There is at this point a slight alteration in the process. We first create a new 16-byte
block of data, set the first four bytes to the bytes of `macCount`, and then set the fifth byte to `128`. Then, we XOR this entire block
of data with the second transformed block from earlier. Finally, we encrypt this 16-byte block with our truncated hash as a key.

This 16-byte block is then split into four 4-byte blocks, and each of these blocks is used as a parameter in our `EnableTrustedFilesOperations`
MTP packet. After sending this MTP packet, files can be sent to the device with absolute freedom.

Implementation progress
-----------------------

Up until this point, I had implemented the entire handshake in... JavaScript. I'm not kidding. Its typed arrays and quick prototyping made me
just go with it. Unfortunately, libmtp is implemented entirely in C, so in order to add on the MTPZ extensions, I need to port my JavaScript to C.
Absolutely not an impossible task (rather, it's very plausible), but it will take a bit of time. 

Right now, I've basically jury-rigged a system for libmtp to make sure that using the Zune from Linux was actually viable:

* libmtp connects to the Zune
* libmtp prompts me for the Application Certificate Message, which I generate and copy from my JavaScript implementation
* libmtp sends off the ACM to the Zune
* libmtp receives and displays the handshake response
* I copy the handshake response, paste it into my JavaScript implementation and generate the confirmation message
* libmtp prompts me for the confirmation message and sends it off to the Zune

You won't believe how excited I was when the Zune displayed the 'connected' text on its screen after this point. The Zune storage, after this, is
unlocked for _reading_ only. In order to write to the Zune, I generate the four 4-byte blocks as explained above and enter them as libmtp prompts for them.
Once the `EnableTrustedFilesOperations` MTP packet is sent, the Zune displays the 'syncing' text on its screen, and its storage is accessible for writing.

Fantastic progress, I have to say.

