---
layout: post
title: "MTPZ: Handshake, Part 3 - Confirmation Message"
tags: [zune, mtpz]
nav: blog
---

Welcome back! Unlike the other sections of the handshake, I was able to reverse engineer this final part with relative ease, 
due to the fact that much of the process involved code that was used in the other sections.

Let's take a look at this message.

<table class="hex_table simplemodal-data" id="simplemodal-data" style=""><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">02 03 00 10 CD A5 6A 66 68 25 67 9D 99 CE B2 E9 28 E3 9F B9 </td><td class="hex_ascii">......jfh%g.....(...</td></tr></tbody></table>

Very short, in comparison to the other two messages. As usual, it begins with marker bytes -- in this case, `02 03`. Following
that is a 16-byte block of _something_ (as always, preceded by its length, `00 10`).

Message generation
------------------

Before we begin the process, we have to recall [part 2 of the handshake](kbhomes.github.com/2011/08/09/mtpz-handshake-part-2-validate-handshake-response.html), which was validation of the device's response. Once we
had decrypted the message and discovered the format, we could see that there was a 32-byte block at the end of the message,
which was a CBC-MAC code with SHA-256 applied. For the sake of ease of implementation (or perhaps even just laziness), we didn't
calculate this code on our own, but rather opted to copy the code they sent us. The reason we copy these 32-bytes as opposed
to simply ignoring them is because they are necessary to generate our confirmation message.

<em><sub>CBC-MAC/SHA-256 hash:</sub></em>
<table class="hex_table"><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">7F E1 15 37 D4 47 8B 1F A8 DB 3D A6 AF DF 18 14 0D 52 47 85 FC 6F E7 54 </td><td class="hex_ascii">...7.G....=......RG..o.T</td></tr><tr class="hex_row"><td class="hex_address">000018</td><td class="hex_value">18 36 FD 58 A6 00 06 E9 </td><td class="hex_ascii">.6.X....</td></tr></tbody></table>

Firstly, the last 16 bytes of the hash are truncated, so that our hash is conveniently 16 bytes long. Going back to part 2,
the message was decrypted by using a hash as the key using what is essentially a modified AES cipher. This time, however, we're
going to use this 16-byte hash as our key for _encryption_. What are we going to encrypt with this key, though? Seemingly, the
software encrypts empty (zero) bytes with our key, providing us with a 16-byte encrypted value.

<em><sub>Encrypted value:</sub></em>
<table class="hex_table"><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">5B 52 7A 07 01 24 D4 40 8B F5 15 35 EE 42 7A 81 </td><td class="hex_ascii">[Rz..$.@...5.Bz.</td></tr></tbody></table>

Now we create two 16-byte blocks, which will end up storing transformed versions of this encrypted value. The first transformation
involves taking the encrypted value and multiplying each of its bytes by two and bitwise OR-ing it with the next byte. Then, if the first byte
is negative, it XOR's the last byte by `0x87`. The result of this transformation goes into the first of our new 16-byte blocks.

The second transformation is the same as the first transformation, except instead of taking the bytes of the encrypted value, it takes the bytes
of our first, freshly transformed bytes. This transformation is stored in the second byte block.

<em><sub>Block 1:</sub></em>
<table class="hex_table"><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">B6 A4 F4 0E 02 49 A8 81 17 EA 2A 6B DC 84 F5 02 </td><td class="hex_ascii">.....I....*k....</td></tr></tbody></table>

<em><sub>Block 2:</sub></em>
<table class="hex_table"><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">6D 49 E8 1C 04 93 51 02 2F D4 54 D7 B9 09 EA 83 </td><td class="hex_ascii">mI....Q./.T.....</td></tr></tbody></table>

Now, we're going to need our truncated 16-byte CBC-MAC/SHA-256 hash from earlier again since we are going to have to encrypt one more thing. Our second block that we transformed
just earlier actually is not even going to be used (it would be used in case our hash was longer than 16 bytes, but since it's not, and never will be,
this second block is effectively useless). What we do with the first block is XOR the last byte with `01`, and then encrypt this using our 16-byte hash as a key. Once
this is done, we end up with another 16-byte encrypted value.

<em><sub>Encrypted value:</sub></em>
<table class="hex_table"><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">CD A5 6A 66 68 25 67 9D 99 CE B2 E9 28 E3 9F B9 </td><td class="hex_ascii">..jfh%g.....(...</td></tr></tbody></table>

Bingo! This is the exact 16-byte block that is sent in the confirmation message.

What the device presumably does is perform this same process and compare its own calculated value with the value we send in the confirmation message.
If the two values are the same, then the handshake is complete and the device unlocks itself for synchronization and other matters.

What's next?
------------

So, after all these months, I've managed to completely reverse engineer the handshake in its entirety. However, that doesn't mean that everything's fantastic and 
my work is done. There's still the task of actually implementing this handshake into the [libmtp](http://libmtp.sourceforge.net/) project so that any media player that uses
that will be able to take advantage of it. 

Stay tuned for blog posts about my progress on that front! All in all, we should be able to look forward to Zune support on Linux fairly soon.

