---
layout: post
title: "MTPZ: Handshake, Part 1 - Application Certificate Message"
tags: [zune, mtpz]
---

<script type="text/javascript">addStylesheet("hextable.css");</script>

So, in the time between this post and the post [detailing my initialization notes](http://kbhomes.github.com/2011/05/29/mtpz-notes-so-far.html), I managed to fully emulate
the Zune software in its generation of its first message that is sent to the device. This is referred to as
the Application Certificate Message, which is sent with the MTP opcode of [`PTP_OC_MTP_WMDRMPD_SendWMDRMPDAppRequest`](http://kbhomes.github.com/2011/04/05/mtpz-handshake-packets.html).
It is the first of three messages that are sent back and forth between the software and the device.

To start off, here's the hex dump of an actual communication between the Zune software and the device. This is
strictly the Application Certificate Message.

<table class="hex_table simplemodal-data" id="simplemodal-data" style=""><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">02 01 01 00 00 02 75 02 00 00 01 35 01 00 00 00 00 B5 01 00 00 00 01 00 </td><td class="hex_ascii">......u....5............</td></tr><tr class="hex_row"><td class="hex_address">000018</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 12 5A 75 6E 65 20 53 6F </td><td class="hex_ascii">.................Zune So</td></tr><tr class="hex_row"><td class="hex_address">000030</td><td class="hex_value">66 74 77 61 72 65 20 43 41 20 31 00 01 00 01 00 80 33 6E E6 AA 07 BF B3 </td><td class="hex_ascii">ftware CA 1......3n.....</td></tr><tr class="hex_row"><td class="hex_address">000048</td><td class="hex_value">FF D0 40 24 CE C3 8B E6 49 7E F6 0E 3D 7F 68 2E 0F F1 5E 6C 65 FF 61 3B </td><td class="hex_ascii">..@$....I~..h...^le.a;</td></tr><tr class="hex_row"><td class="hex_address">000060</td><td class="hex_value">DE 17 6F AD 71 37 88 4E 80 A8 13 CF 53 C3 10 1A A5 1B 9E 4F 54 B2 4F D5 </td><td class="hex_ascii">..o.q7.N....S......OT.O.</td></tr><tr class="hex_row"><td class="hex_address">000078</td><td class="hex_value">14 CD C5 09 B6 B7 1E 1F 48 51 3D F0 64 44 D9 B5 59 63 E8 12 1C 4C 69 B6 </td><td class="hex_ascii">........HQ=.dD..Yc...Li.</td></tr><tr class="hex_row"><td class="hex_address">000090</td><td class="hex_value">7D 6A 13 14 F9 73 C9 58 5C 29 BB 99 0A D7 FD 15 1D BB CB 4F 9E D7 DF E2 </td><td class="hex_ascii">}j...s.X\\).........O....</td></tr><tr class="hex_row"><td class="hex_address">0000a8</td><td class="hex_value">92 BA 4E D9 C6 AC F5 8E 6A DE EF 5B 87 7A 1C 15 45 74 26 34 91 69 46 45 </td><td class="hex_ascii">..N.....j..[.z..Et&amp;4.iFE</td></tr><tr class="hex_row"><td class="hex_address">0000c0</td><td class="hex_value">9B 09 4B 25 9E D8 5E F0 2B 08 A3 18 E6 7A FD 68 C2 89 A8 C6 A6 1B C8 02 </td><td class="hex_ascii">..K%..^.+....z.h........</td></tr><tr class="hex_row"><td class="hex_address">0000d8</td><td class="hex_value">3C A8 7F E3 67 BD CC 08 56 C3 D1 57 58 C8 66 E5 3F B5 2E 86 EC 56 9C 9C </td><td class="hex_ascii">&lt;.g...V..WX.f.?....V..</td></tr><tr class="hex_row"><td class="hex_address">0000f0</td><td class="hex_value">07 0A 22 17 4F BD 7C 4D CD 39 5E C6 85 30 16 34 51 CE 1F 58 80 44 A0 6E </td><td class="hex_ascii">..".O.|M.9^..0.4Q..X.D.n</td></tr><tr class="hex_row"><td class="hex_address">000108</td><td class="hex_value">BB 95 A6 D4 BE 68 B0 89 A4 F2 5A 61 2F FC EA 56 C1 C3 F8 A6 88 0C 05 76 </td><td class="hex_ascii">.....h....Za/..V.......v</td></tr><tr class="hex_row"><td class="hex_address">000120</td><td class="hex_value">F2 65 74 B6 4F F8 3D 28 68 F0 FE 36 96 BC 84 25 48 7A E0 62 D4 8A AD FD </td><td class="hex_ascii">.et.O.=(h..6...%Hz.b....</td></tr><tr class="hex_row"><td class="hex_address">000138</td><td class="hex_value">08 8A 97 87 B8 06 81 0B ED 00 00 01 37 01 00 00 00 00 B7 03 00 00 00 00 </td><td class="hex_ascii">............7...........</td></tr><tr class="hex_row"><td class="hex_address">000150</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 14 5A 75 6E 65 20 53 </td><td class="hex_ascii">..................Zune S</td></tr><tr class="hex_row"><td class="hex_address">000168</td><td class="hex_value">6F 66 74 77 61 72 65 20 4C 65 61 66 20 31 00 01 00 01 00 80 E5 77 D3 FC </td><td class="hex_ascii">oftware Leaf 1.......w..</td></tr><tr class="hex_row"><td class="hex_address">000180</td><td class="hex_value">BE 3F 03 E2 4F E8 8C 19 F4 64 98 E1 C7 36 18 1B B2 FE BE 2E EB 1E 26 92 </td><td class="hex_ascii">.?..O....d...6........&amp;.</td></tr><tr class="hex_row"><td class="hex_address">000198</td><td class="hex_value">B6 DB D0 D1 83 EB 2B 29 B2 D3 36 45 B8 09 8D C6 74 DD 25 D2 A6 5E DA CD </td><td class="hex_ascii">......+)..6E....t.%..^..</td></tr><tr class="hex_row"><td class="hex_address">0001b0</td><td class="hex_value">16 FE 8E 3D FF 01 B2 21 3A A4 4F 3B 2C 68 36 A1 03 56 D4 24 17 01 C2 DB </td><td class="hex_ascii">...=...!:.O;,h6..V.$....</td></tr><tr class="hex_row"><td class="hex_address">0001c8</td><td class="hex_value">54 74 9D 89 77 7F 7A 80 90 0F 84 B2 97 35 69 8C 21 2D F5 16 5B 50 22 B5 </td><td class="hex_ascii">Tt..z......5i.!-..[P".</td></tr><tr class="hex_row"><td class="hex_address">0001e0</td><td class="hex_value">F3 BF B6 A7 8B F0 34 E2 9F 9B 2B 97 16 D3 D3 29 50 9A 95 AD D7 2D 34 57 </td><td class="hex_ascii">......4...+....)P....-4W</td></tr><tr class="hex_row"><td class="hex_address">0001f8</td><td class="hex_value">C3 D4 D0 CA 7E EA C9 77 6F 4D 73 A4 AA FD 89 6B AA 5A 86 85 C0 5D 5B 74 </td><td class="hex_ascii">....~..woMs....k.Z...][t</td></tr><tr class="hex_row"><td class="hex_address">000210</td><td class="hex_value">66 65 21 84 81 67 5E D6 29 B2 55 3A 9D F0 3D 74 58 66 C5 CF 24 03 51 A7 </td><td class="hex_ascii">fe!..g^.).U:..=tXf..$.Q.</td></tr><tr class="hex_row"><td class="hex_address">000228</td><td class="hex_value">6C 6D BB D0 28 30 E5 F4 72 E2 AD 24 58 7C 7C AB 60 18 FD D9 34 C0 93 DF </td><td class="hex_ascii">lm..(0..r..$X||.`...4...</td></tr><tr class="hex_row"><td class="hex_address">000240</td><td class="hex_value">41 CA B6 18 7E 6E 1E E9 BB 8D D5 99 F9 A2 10 F4 05 1F CD FD 55 28 8D 97 </td><td class="hex_ascii">A...~n..............U(..</td></tr><tr class="hex_row"><td class="hex_address">000258</td><td class="hex_value">61 CA 22 C3 21 9E 72 24 76 46 AB 50 50 B0 B2 C7 7F 1D FB 6F 95 45 64 03 </td><td class="hex_ascii">a.".!.r$vF.PP....o.Ed.</td></tr><tr class="hex_row"><td class="hex_address">000270</td><td class="hex_value">61 A2 7C AF CC 59 F3 24 42 E2 1B 7B 00 10 B5 11 F7 8F 84 CE 60 2F 70 11 </td><td class="hex_ascii">a.|..Y.$B..{........`/p.</td></tr><tr class="hex_row"><td class="hex_address">000288</td><td class="hex_value">0C 98 02 54 B1 70 01 00 80 29 63 21 CD 66 0B 34 07 43 9E A4 B4 C9 F0 0B </td><td class="hex_ascii">...T.p...)c!.f.4.C......</td></tr><tr class="hex_row"><td class="hex_address">0002a0</td><td class="hex_value">84 6A 3F B5 AF 60 0D F8 25 AF 15 33 39 2D 91 57 24 E6 77 06 3D BF 6D CE </td><td class="hex_ascii">.j?..`..%..39-.W$.w.=.m.</td></tr><tr class="hex_row"><td class="hex_address">0002b8</td><td class="hex_value">AA CC E9 BD CA 10 BB 7D 8C 08 47 E4 B8 CD 5D C8 14 AB 31 FB 41 33 70 45 </td><td class="hex_ascii">.......}..G...]...1.A3pE</td></tr><tr class="hex_row"><td class="hex_address">0002d0</td><td class="hex_value">41 46 00 58 E4 A8 7B C2 3E 9B 53 75 D4 82 F8 B9 B6 56 EA 70 49 B2 DC F0 </td><td class="hex_ascii">AF.X..{.&gt;.Su.....V.pI...</td></tr><tr class="hex_row"><td class="hex_address">0002e8</td><td class="hex_value">12 29 CE A1 01 32 4A 7E 3C 8F 97 DE 49 1C 80 6C F0 E2 91 7A 79 3E 29 07 </td><td class="hex_ascii">.)...2J~&lt;...I..l...zy&gt;).</td></tr><tr class="hex_row"><td class="hex_address">000300</td><td class="hex_value">81 9B 04 FC 14 34 A5 79 83 39 7C 58 B4 42 36 A0 6C </td><td class="hex_ascii">.....4.y.9|X.B6.l</td></tr></tbody></table>'

The first two bytes `02 01` seem to be marker bytes that simply indicate to the device that what follows
is most likely a valid message.

Certificate serialization
-------------------------

What the software does next is take its two certificates that it decrypted and deserialized during initialization, and then
reserialize them into binary format. It's clear, from looking at the above sample, that the Application Certificate Message contains the
two certificates (`Zune Software CA 1` and `Zune Software Leaf 1`), starting with the bytes `02 00 00 01 35` at offset `0x07`. 

The software indicates that what follows is certificate data by writing the marker byte `01`, followed by the 32-bit length
of the certificate data (in this case, `0x275`). Then, the software writes the certificate data itself. For the sake
of ease of implementation, this can be seen as the original block of certificate data that was decrypted during initialazation,
rather than the reserialization of the deserialized certificate data.

It's worth noting that the certificate data is always constant, and does not change.

Random byte generation
----------------------

After writing the certificate data, the software generates 16 random bytes. The software writes the 16-bit length of the random bytes 
(therefore, always `00 10`), followed by the random bytes themselves. This is seen in the above sample at offset `0x027C`. In this sample,
the random bytes are `B5 11 F7 8F 84 CE 60 2F 70 11	0C 98 02 54 B1 70`.

These random bytes are necessary from a security standpoint because without them, the certificate message would always be constant and 
therefore wouldn't necessarily need to be generated by an impersonating software.

Message signature
-----------------

This is where things get interesting. In a nutshell, the software takes the serialized certificate data (including the marker and length bytes), 
appends the random bytes (including the length bytes) and calls that the message. It then signs the message using a typical [RSA signing process](http://en.wikipedia.org/wiki/RSA#Signing_messages).
The process involves computing a hash of the message (in this case, standard SHA-1 with some byte manipulations and other techniques), and then
using the RSA private key and modulus to create a signature of the message. The benefit of having a signature is that since the message is signed with 
the private key, the recipient can use the corresponding public key to retrieve the sender's hash of the message. Then, the recipient can perform the hash
procedure on the message and compare its own computed hash with the sender's hash. If the two are the same, then the recipient can assume that whoever sent the
message is the owner of the private key and, therefore, the person they want to be communicating with.

### Hash computation

The computation of the hash of the message involves using SHA-1 multiple times, in addition to other byte manipulation techniques. Specifically,
a SHA-1 hash is computed of the message (the certificate data and random bytes). Another hash is then computed of the message hash. These
20 bytes from the hash are placed into a 128-byte buffer, which we will call `oview`, at offset 107. Then, the byte at offset 106 is set to `01`.
The 20 bytes from the hash are hashed (resulting in a new 20 byte hash), and XOR'd with `oview` at offset 0. The new 20 byte hash is
then hashed again, and XOR'd with `oview` at offset 20. This process repeats until the entire buffer has been XOR'd with a hash. Then,
the last byte is set to 188. Finally, `oview` is reversed. This is the final generated hash that is computed by both the 
software and the device.

### Signing

The RSA signing process involves raising the hash to the private key exponent, modulo the modulus (<strong><em>m<sup>d</sup> mod n</em></strong>, where _m_ is the hash,
_d_ is the private key, and _n_ is the modulus). The first matter of business is to actually compute the private key exponent, since we have every bit of information
about the private key (particularly, the two primes _p_ and _q_) except for the private key exponent itself (see the notes post for the RSA private key information
that was decrypted during the initialization stage). Luckily, this is (relatively) easy to compute:

		p = E7 B2 65 91 1C 64 9C 1B 9A 63 41 AB 67 A5 A1 90 DF 22 54 7F C2 ... [truncated]
		q = E0 16 E8 A5 B2 D7 1D B7 A9 39 B8 5C 35 B7 EB A3 BB DE 58 F2 F3 ... [truncated]

		n = p * q
		phi = (p - 1)(q - 1)
		e = 0x010001 = 65537
		
		d = inverse(e) mod phi

Once the private key is obtained, it's a simple matter of raising the hash to the private key exponent, modulo the modulus. Since the modulus and private key exponent
are both 1024 bits long, the signature should also be 1024 bits long, or 128 bytes.

The big picture
---------------

So, in essence, the general format of the Application Certificate Message is the certificate data, followed by random bytes, followed by the digital signature. Outlined
below is the specific structure of the message.

		# Marker bytes
		02 01 

			# Marker (0x01), certificates length (0x275)
			01 00 00 02 75 

				# Certificate data
				02 00 00 01 35 01 00 00 00 00 B5 01 00 00 00 01 00 00 00 00 ... [truncated]
			
			# Random bytes length (0x10 = 16)
			00 10 
				# Random bytes
				B5 11 F7 8F 84 CE 60 2F 70 11 0C 98 02 54 B1 70 

			# Marker and length of signature (0x80 = 128)
			01 00 80 

				# Signature
				29 63 21 CD 66 0B 34 07 43 9E A4 B4 C9 F0 0B 84 6A 3F B5 AF ... [truncated]

And there's the first handshake message sent between the two endpoints. After this Application Certificate Message is sent, the device's handshake response is read
by the software and validated, the topic of the next blog post.

Stay tuned!
