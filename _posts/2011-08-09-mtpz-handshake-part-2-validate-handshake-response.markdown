---
layout: post
title: "MTPZ: Handshake, Part 2 - Validate Handshake Response"
tags: [zune, mtpz]
nav: blog
---

It's been a fair amount of time since the [last post on part 1 of the handshake](http://kbhomes.github.com/2011/07/06/mtpz-handshake-part-1-application-certificate-message.html), 
which dealt with generation of the Application Certificate Message (ACM for short). 
This post will talk about the next part, which is validation of the device's response to our message.

This message is, for the most part, encrypted and so at first glance is indecipherable.

<table class="hex_table simplemodal-data" id="simplemodal-data" style=""><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">02 02 00 80 3B FA 89 B4 52 F5 13 1A A4 70 EF DC 7D 7E 40 E8 93 DF 1B 90 </td><td class="hex_ascii">....;...R....p..}~@.....</td></tr><tr class="hex_row"><td class="hex_address">000018</td><td class="hex_value">3F 68 55 69 01 7D 83 5B DD 14 5A 5C FD 0C 18 9A A8 B6 14 E2 06 D9 7A 0B </td><td class="hex_ascii">?hUi.}.[..Z\..........z.</td></tr><tr class="hex_row"><td class="hex_address">000030</td><td class="hex_value">E8 F7 3E 37 EF 4F 8B 26 90 3F 99 B0 DC 2D 9D 08 26 A8 1A 7D 1D F3 B5 67 </td><td class="hex_ascii">..&gt;7.O.&amp;.?...-..&amp;..}...g</td></tr><tr class="hex_row"><td class="hex_address">000048</td><td class="hex_value">2D 79 77 12 2E 3B F5 73 51 F0 CF B0 23 0B 42 77 7B 31 4D FC C7 4C DB F4 </td><td class="hex_ascii">-yw..;.sQ...#.Bw{1M..L..</td></tr><tr class="hex_row"><td class="hex_address">000060</td><td class="hex_value">71 28 FE 30 FF 70 A3 28 1E 35 1B 43 0C B8 8A D4 CA 8D C1 76 B6 6E 06 5F </td><td class="hex_ascii">q(.0.p.(.5.C.......v.n._</td></tr><tr class="hex_row"><td class="hex_address">000078</td><td class="hex_value">8C A5 DD 94 2C A9 6F 65 B1 2A 64 29 00 00 03 40 EA 16 86 55 D0 69 8C 36 </td><td class="hex_ascii">....,.oe.*d)...@...U.i.6</td></tr><tr class="hex_row"><td class="hex_address">000090</td><td class="hex_value">7E 93 C6 A1 B0 F6 FC 62 8E 18 88 D4 FA CA C8 0F BF E2 CC 9D 7F D0 05 C7 </td><td class="hex_ascii">~......b................</td></tr><tr class="hex_row"><td class="hex_address">0000a8</td><td class="hex_value">70 9D 0C 14 6F 16 AC 84 64 28 CB FA FE CC 3C AA D1 4C 62 9D 6E 19 95 72 </td><td class="hex_ascii">p...o...d(....&lt;..Lb.n..r</td></tr><tr class="hex_row"><td class="hex_address">0000c0</td><td class="hex_value">F4 82 75 0E CA 7C 90 1D 41 EE C3 EA BB 5E 81 B8 12 91 57 64 E2 22 B3 A5 </td><td class="hex_ascii">..u..|..A....^....Wd.&quot;..</td></tr><tr class="hex_row"><td class="hex_address">0000d8</td><td class="hex_value">BF 25 C3 0A 13 1D A7 B0 42 C9 20 A9 A2 ED 8E E7 9F 21 BA CA 95 FF 65 5D </td><td class="hex_ascii">.%......B. ......!....e]</td></tr><tr class="hex_row"><td class="hex_address">0000f0</td><td class="hex_value">BA 45 ED CE 85 7F C7 21 85 9C 0D DE 7B 6A F9 AE 44 D7 F9 B2 9E 48 33 FA </td><td class="hex_ascii">.E.....!....{j..D....H3.</td></tr><tr class="hex_row"><td class="hex_address">000108</td><td class="hex_value">BD 8F B6 9C A2 65 74 91 B8 71 5C B6 E9 8F 3C EF F7 EA 46 E0 0E 5B 12 8D </td><td class="hex_ascii">.....et..q\...&lt;...F..[..</td></tr><tr class="hex_row"><td class="hex_address">000120</td><td class="hex_value">41 44 19 02 49 B8 14 F7 33 42 A1 E0 88 FB 9F 57 50 B9 D8 68 B8 F5 9A EA </td><td class="hex_ascii">AD..I...3B.....WP..h....</td></tr><tr class="hex_row"><td class="hex_address">000138</td><td class="hex_value">F8 D8 23 F9 4D DD 09 8E BF CE E3 D4 7A D2 B3 93 8D EB 6E 47 E8 37 5B B7 </td><td class="hex_ascii">..#.M.......z.....nG.7[.</td></tr><tr class="hex_row"><td class="hex_address">000150</td><td class="hex_value">78 B1 16 54 58 85 B7 26 D6 12 85 90 23 30 D5 4B 3B C0 98 17 FF 94 CD 36 </td><td class="hex_ascii">x..TX..&amp;....#0.K;......6</td></tr><tr class="hex_row"><td class="hex_address">000168</td><td class="hex_value">1E 65 DC 9D DE 07 E4 0C 75 EA 86 7B FE 2C F6 C2 1C BF 42 66 26 89 EB 2C </td><td class="hex_ascii">.e......u..{.,....Bf&amp;..,</td></tr><tr class="hex_row"><td class="hex_address">000180</td><td class="hex_value">E5 A0 86 0E 31 8A 3A BE 32 CC FF 74 FF 10 8C E8 85 81 AC 42 79 93 14 7B </td><td class="hex_ascii">....1.:.2..t.......By..{</td></tr><tr class="hex_row"><td class="hex_address">000198</td><td class="hex_value">72 43 61 0C 5B 23 48 C5 E8 38 36 69 72 74 AD F2 E3 27 50 DA C2 59 93 C6 </td><td class="hex_ascii">rCa.[#H..86irt...'P..Y..</td></tr><tr class="hex_row"><td class="hex_address">0001b0</td><td class="hex_value">C8 11 2D 51 AA DC 41 5F 08 28 18 63 C8 72 8F 83 9B F9 07 3A CC D7 66 F5 </td><td class="hex_ascii">..-Q..A_.(.c.r.....:..f.</td></tr><tr class="hex_row"><td class="hex_address">0001c8</td><td class="hex_value">D9 B7 2F A9 00 62 5D 2D EF 26 62 C9 17 6B 48 43 5A 18 DB C5 54 D6 CB 87 </td><td class="hex_ascii">../..b]-.&amp;b..kHCZ...T...</td></tr><tr class="hex_row"><td class="hex_address">0001e0</td><td class="hex_value">AC 07 CC 67 31 CC 62 F8 95 DD 29 52 4A 17 99 C8 5E CE 11 37 98 84 6D 12 </td><td class="hex_ascii">...g1.b...)RJ...^..7..m.</td></tr><tr class="hex_row"><td class="hex_address">0001f8</td><td class="hex_value">69 40 EF 1E 1A E5 B8 AC 41 C8 06 76 79 05 EA 7A 13 83 12 73 54 33 20 DA </td><td class="hex_ascii">i@......A..vy..z...sT3 .</td></tr><tr class="hex_row"><td class="hex_address">000210</td><td class="hex_value">51 50 8B 4A A4 3B C4 6F 21 FB E7 B7 20 77 CD DE 37 17 4B 75 35 DB 32 90 </td><td class="hex_ascii">QP.J.;.o!... w..7.Ku5.2.</td></tr><tr class="hex_row"><td class="hex_address">000228</td><td class="hex_value">1E 8B 81 FD E6 79 DC 1F F4 EB 83 6A CE 0A 05 C1 E4 ED 1B 37 10 13 04 99 </td><td class="hex_ascii">.....y.....j.......7....</td></tr><tr class="hex_row"><td class="hex_address">000240</td><td class="hex_value">0C 7E 34 9B AD DA 8A 24 F6 E7 F1 7E EC C1 A1 EF 74 48 B5 92 81 62 C8 B3 </td><td class="hex_ascii">.~4....$...~....tH...b..</td></tr><tr class="hex_row"><td class="hex_address">000258</td><td class="hex_value">94 F1 75 37 6D 16 F7 46 9A DD 8D EF 50 DF 7A F0 19 80 74 FE 7D 83 DF 2C </td><td class="hex_ascii">..u7m..F....P.z...t.}..,</td></tr><tr class="hex_row"><td class="hex_address">000270</td><td class="hex_value">9E 01 12 B4 1A 97 91 DE 59 7A DA 75 7F 89 F6 47 3A 0A F3 6E E3 F2 D1 B4 </td><td class="hex_ascii">........Yz.u...G:..n....</td></tr><tr class="hex_row"><td class="hex_address">000288</td><td class="hex_value">C9 95 F6 80 33 44 57 53 1D DB DA DC 0D D0 C5 1A 24 9F 04 0A 5C 88 94 D2 </td><td class="hex_ascii">....3DWS........$...\...</td></tr><tr class="hex_row"><td class="hex_address">0002a0</td><td class="hex_value">BC 99 08 E2 E9 45 1E AA DA 64 3A C1 DD E5 6A 75 B5 4D 0F 2B 49 4D 51 69 </td><td class="hex_ascii">.....E...d:...ju.M.+IMQi</td></tr><tr class="hex_row"><td class="hex_address">0002b8</td><td class="hex_value">05 DE 22 6A 49 5E E2 5A 2C BC 0E A1 93 3C 3C 6E D7 66 D1 B5 13 8F C9 3F </td><td class="hex_ascii">..&quot;jI^.Z,....&lt;&lt;n.f.....?</td></tr><tr class="hex_row"><td class="hex_address">0002d0</td><td class="hex_value">3E FE 35 ED 49 04 38 DC 8B D3 69 56 FD 77 A1 B9 BA C6 C3 6C 44 CF 38 C9 </td><td class="hex_ascii">&gt;.5.I.8...iV.w.....lD.8.</td></tr><tr class="hex_row"><td class="hex_address">0002e8</td><td class="hex_value">0F 23 C5 D1 3A 4B A6 08 03 05 4B E6 4D C6 96 74 34 B5 3E 50 6E 07 FB C6 </td><td class="hex_ascii">.#..:K....K.M..t4.&gt;Pn...</td></tr><tr class="hex_row"><td class="hex_address">000300</td><td class="hex_value">DE 88 9F F2 C4 6C AE 66 DA A1 44 15 16 0F BB 6D 2A DA 86 5A B0 E1 28 C5 </td><td class="hex_ascii">.....l.f..D....m*..Z..(.</td></tr><tr class="hex_row"><td class="hex_address">000318</td><td class="hex_value">9E 40 8F 52 0F 45 AD 1E 6B 8E BE B0 5C 54 8F 71 78 5B F0 7D 3F 11 11 3B </td><td class="hex_ascii">.@.R.E..k...\T.qx[.}?..;</td></tr><tr class="hex_row"><td class="hex_address">000330</td><td class="hex_value">98 6C C4 20 DE 7A 0A 29 68 F5 A0 76 EF 57 C9 B7 C5 BB E3 2F 14 50 21 43 </td><td class="hex_ascii">.l. .z.)h..v.W...../.P!C</td></tr><tr class="hex_row"><td class="hex_address">000348</td><td class="hex_value">20 B3 69 B1 63 6E BB 62 54 09 C3 CD 48 A0 02 3C F5 02 2C 2A 4D E4 50 AF </td><td class="hex_ascii"> .i.cn.bT...H..&lt;..,*M.P.</td></tr><tr class="hex_row"><td class="hex_address">000360</td><td class="hex_value">74 41 4B D4 08 72 AC 64 71 86 4F 4B 2D 54 77 13 D4 2E 25 0B 72 DE 90 DC </td><td class="hex_ascii">tAK..r.dq.OK-Tw...%.r...</td></tr><tr class="hex_row"><td class="hex_address">000378</td><td class="hex_value">0B 3D 03 17 B2 0C 79 92 08 89 74 82 67 BE DC 5A 7C F8 7A 00 E7 54 2F 39 </td><td class="hex_ascii">.=....y...t.g..Z|.z..T/9</td></tr><tr class="hex_row"><td class="hex_address">000390</td><td class="hex_value">31 88 35 95 FB A0 1D 98 80 11 16 EB CB 63 FF A0 F6 5D B4 3C 9B 45 64 46 </td><td class="hex_ascii">1.5..........c...].&lt;.EdF</td></tr><tr class="hex_row"><td class="hex_address">0003a8</td><td class="hex_value">02 AA 85 DC 23 F1 C7 9B 4A A3 A8 41 CE E1 F8 C5 B1 BA 0E 8F 82 3E FE E7 </td><td class="hex_ascii">....#...J..A.........&gt;..</td></tr><tr class="hex_row"><td class="hex_address">0003c0</td><td class="hex_value">D2 C6 84 23 F6 65 7B 4A </td><td class="hex_ascii">...#.e{J</td></tr></tbody></table>

The first two bytes `02 02` serve as marker bytes that the software checks for as a preliminary step. The marker bytes are followed by two blocks of 
data, each preceded by its length: a 128-byte block, and an 832-byte block.

The 128-byte block
------------------

It turns out that this block of data is encrypted, but not in the way that you might expect. For example, the blocks of data that were decrypted
during [initialization](http://kbhomes.github.com/2011/04/26/mtpz-initialization-part-1.html) were encrypted using AES, which is a symmetric cipher. That is, the same key is used to encrypt a message using AES as is
used to decrypt it. In this case, however, this block of data was encrypted by using asymmetric cryptography (the same key is not used for both encryption
and decryption); specifically, RSA was used.

A quick lesson about [RSA](http://en.wikipedia.org/wiki/RSA) (since I realized I didn't really explain it very well in the previous post): it employs a public key and a private key.
The private key, of course, remains a secret and cannot be known to anybody besides the owner of that key. The public key, on the other hand,
is released to whomever wants it. The security of RSA comes from the fact that if a message is encrypted using the public key, only the owner
of the private key will be able to decrypt it. During initialization, we decrypted certificates and RSA private key information. The private key
information corresponded to one of the certificates (which contains the public key) that were sent to the device. Now the device has the public
key and can thus encrypt messages which are guaranteed to be read only by someone who has access to the corresponding private key.

<em><sub>Original and encrypted block:</sub></em>
<table class="hex_table"><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">3B FA 89 B4 52 F5 13 1A A4 70 EF DC 7D 7E 40 E8 93 DF 1B 90 3F 68 55 69 </td><td class="hex_ascii">;...R....p..}~@.....?hUi</td></tr><tr class="hex_row"><td class="hex_address">000018</td><td class="hex_value">01 7D 83 5B DD 14 5A 5C FD 0C 18 9A A8 B6 14 E2 06 D9 7A 0B E8 F7 3E 37 </td><td class="hex_ascii">.}.[..Z\..........z...&gt;7</td></tr><tr class="hex_row"><td class="hex_address">000030</td><td class="hex_value">EF 4F 8B 26 90 3F 99 B0 DC 2D 9D 08 26 A8 1A 7D 1D F3 B5 67 2D 79 77 12 </td><td class="hex_ascii">.O.&amp;.?...-..&amp;..}...g-yw.</td></tr><tr class="hex_row"><td class="hex_address">000048</td><td class="hex_value">2E 3B F5 73 51 F0 CF B0 23 0B 42 77 7B 31 4D FC C7 4C DB F4 71 28 FE 30 </td><td class="hex_ascii">.;.sQ...#.Bw{1M..L..q(.0</td></tr><tr class="hex_row"><td class="hex_address">000060</td><td class="hex_value">FF 70 A3 28 1E 35 1B 43 0C B8 8A D4 CA 8D C1 76 B6 6E 06 5F 8C A5 DD 94 </td><td class="hex_ascii">.p.(.5.C.......v.n._....</td></tr><tr class="hex_row"><td class="hex_address">000078</td><td class="hex_value">2C A9 6F 65 B1 2A 64 29 </td><td class="hex_ascii">,.oe.*d)</td></tr></tbody></table>

Well, what the device did is it encrypted whatever message it wanted to encrypt using our public key, that was transmitted with our certificate data. But since
we have the private key, we can simply decrypt this block and see what it's all about. Mathematically, we raise the encrypted message to the private key exponent,
modulo the modulus (<strong><em>c<sup>d</sup> mod n</em></strong>, where _c_ is the encrypted message, _d_ is the private key exponent, and _n_ is the modulus) 
to obtain the original value. See the previous post for the algorithm to obtain the private key exponent from our two prime numbers (that we decrypted during initialization).

Okay, so now we have everything we need to decrypt this 128-byte block. Let's go ahead and do just that, then.

<em><sub>Decrypted block:</sub></em>
<table class="hex_table"><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">00 E9 C5 4C D4 B9 C5 BE 19 44 09 28 BD AF 9E F7 74 BC F9 0D 31 C7 09 AA </td><td class="hex_ascii">...L.....D.(....t...1...</td></tr><tr class="hex_row"><td class="hex_address">000018</td><td class="hex_value">63 7C 15 11 7A D4 71 4F 41 E4 2B 98 DA 64 D7 10 3A 92 78 29 52 5B 8F A0 </td><td class="hex_ascii">c|..z.qOA.+..d..:.x)R[..</td></tr><tr class="hex_row"><td class="hex_address">000030</td><td class="hex_value">9E EC EC 49 3A B7 68 7A DE 8C DC C4 25 C0 BB B9 BB 4E 61 77 D4 8F 8A EF </td><td class="hex_ascii">...I:.hz....%....Naw....</td></tr><tr class="hex_row"><td class="hex_address">000048</td><td class="hex_value">E9 B0 4B 8B A8 CE D2 F4 BA B8 37 48 A5 6A A6 1D 1C 1E 74 56 F8 B8 12 E1 </td><td class="hex_ascii">..K.......7H.j....tV....</td></tr><tr class="hex_row"><td class="hex_address">000060</td><td class="hex_value">68 03 66 73 F8 B2 85 6C A9 3C 9A ED 46 17 64 2A FE 4D 41 47 CA B4 89 BB </td><td class="hex_ascii">h.fs...l.&lt;..F.d*.MAG....</td></tr><tr class="hex_row"><td class="hex_address">000078</td><td class="hex_value">78 74 AC A0 B1 C5 F6 F8 </td><td class="hex_ascii">xt......</td></tr></tbody></table>

That doesn't necessarily look any better. However, if multiple responses are decrypted and inspected, you'll notice that the first byte always seems
to be `00`, so at least we know we're on the right track. After this block is decrypted, hash operations are performed, extremely similar to the hash
operations that are performed during the signature generation of the ACM. That is, a slight variation of SHA-1 is used on this block of data, among other
transformations. Once everything is done, we're left with a 16-byte block of data.

<em><sub>Hash block:</sub></em>
<table class="hex_table"><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">87 62 52 7F 68 59 10 F1 F7 93 B9 E8 F1 85 5A F2 </td><td class="hex_ascii">.bR.hY........Z.</td></tr></tbody></table>

Fantastic, but this again does not seem necessarily helpful. It turns out, however, that this calculated hash value is used as the decryption key for our 
second, larger block of data.

The 832-byte block
------------------

Contrary to the previous block of data, this block is encrypted using AES. The last time we encountered AES was during [initialization](http://kbhomes.github.com/2011/04/26/mtpz-initialization-part-1.html), 
and fortunately, not much has changed. This time, instead of using the 16 bytes `B1 CE 71 1C 1E 1B 46 87 84 A0 84 90 D5 96 22 16` as our key, we use 16-byte hash 
block that we calculated earlier. The key is still expanded as it was during initialization.

This large block of data is decrypted by taking it as 16-byte chunks and decrypting those. The decryption process is the same AES decryption process used during initialization,
with the exception that the 16-byte chunk is then XOR-ed with the previous chunk. From a security standpoint, this technique is useful as it can significantly alter the encrypted
message even if the original message is very insignificantly altered.

<em><sub>Decrypted block:</sub></em>
<table class="hex_table"><tbody><tr class="hex_row"><td class="hex_address">000000</td><td class="hex_value">01 00 00 02 6A 02 00 00 01 33 01 00 00 00 00 B3 01 00 00 00 01 00 00 00 </td><td class="hex_ascii">....j....3..............</td></tr><tr class="hex_row"><td class="hex_address">000018</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 10 5A 75 6E 65 20 44 65 76 69 </td><td class="hex_ascii">...............Zune Devi</td></tr><tr class="hex_row"><td class="hex_address">000030</td><td class="hex_value">63 65 20 43 41 20 31 00 01 00 01 00 80 7B 15 9D CE D1 FB 9E 21 17 3E 7D </td><td class="hex_ascii">ce CA 1......{......!.&gt;}</td></tr><tr class="hex_row"><td class="hex_address">000048</td><td class="hex_value">01 9C 4F 1F 84 71 3D 48 B9 4C F7 4D CB 06 E9 F2 02 27 4F DC 25 39 16 82 </td><td class="hex_ascii">..O..q=H.L.M.....'O.%9..</td></tr><tr class="hex_row"><td class="hex_address">000060</td><td class="hex_value">41 B3 47 E0 7C B2 02 11 30 6F 26 68 43 D2 1B 01 DB E0 1E E0 25 BC 8B 70 </td><td class="hex_ascii">A.G.|...0o&amp;hC.......%..p</td></tr><tr class="hex_row"><td class="hex_address">000078</td><td class="hex_value">02 DA F0 CB 45 1A 11 2D 2C 5D B7 71 7D FE 45 09 F2 F5 48 7F A7 27 98 A7 </td><td class="hex_ascii">....E..-,].q}.E...H..'..</td></tr><tr class="hex_row"><td class="hex_address">000090</td><td class="hex_value">02 3F FC 70 37 2E 22 B3 1F 2A 97 78 2A 76 34 54 B1 C0 7B 4E 59 52 A5 15 </td><td class="hex_ascii">.?.p7."..*.x*v4T..{NYR..</td></tr><tr class="hex_row"><td class="hex_address">0000a8</td><td class="hex_value">7F A9 B2 A7 3A 6F E1 73 9C 64 D6 87 80 B9 1B 74 4B BE 75 FC B5 4B 4C 03 </td><td class="hex_ascii">....:o.s.d.....tK.u..KL.</td></tr><tr class="hex_row"><td class="hex_address">0000c0</td><td class="hex_value">EA 8C 31 B7 06 17 21 D1 14 AA C2 4E 5B EC F5 64 0B A5 BB 78 44 1A 1E 49 </td><td class="hex_ascii">..1...!....N[..d...xD..I</td></tr><tr class="hex_row"><td class="hex_address">0000d8</td><td class="hex_value">9F CB A9 D6 5C F9 33 6E A7 D6 84 C2 7F BD EA C3 B3 11 16 AD 3A AF 7D BE </td><td class="hex_ascii">....\.3n............:.}.</td></tr><tr class="hex_row"><td class="hex_address">0000f0</td><td class="hex_value">6C 1D 25 19 46 4A AA EA B6 A6 68 44 97 88 B0 6A C6 DD C5 C5 9C 17 69 F2 </td><td class="hex_ascii">l.%.FJ....hD...j......i.</td></tr><tr class="hex_row"><td class="hex_address">000108</td><td class="hex_value">8D 5D 56 4E AB 74 CC 59 4F F5 6B 63 3E B3 7A C8 53 12 46 EE 2A EF 6B C7 </td><td class="hex_ascii">.]VN.t.YO.kc&gt;.z.S.F.*.k.</td></tr><tr class="hex_row"><td class="hex_address">000120</td><td class="hex_value">78 34 57 B6 C8 F2 45 DF 9C 4A 29 8A 87 02 12 C4 07 06 FF DB 56 3A FA 98 </td><td class="hex_ascii">x4W...E..J).........V:..</td></tr><tr class="hex_row"><td class="hex_address">000138</td><td class="hex_value">C8 B1 A6 78 E9 00 00 01 2E 01 00 00 00 00 AE 02 00 00 00 02 00 00 00 00 </td><td class="hex_ascii">...x....................</td></tr><tr class="hex_row"><td class="hex_address">000150</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 0B 5A 75 6E 65 20 44 65 76 69 63 </td><td class="hex_ascii">..............Zune Devic</td></tr><tr class="hex_row"><td class="hex_address">000168</td><td class="hex_value">65 00 01 00 01 00 80 69 69 1E 3F EC EF 51 E8 8C 50 E2 54 02 9A 79 27 2D </td><td class="hex_ascii">e......ii.?..Q..P.T..y'-</td></tr><tr class="hex_row"><td class="hex_address">000180</td><td class="hex_value">07 38 1E B4 A3 E4 20 49 A2 7C E1 42 69 B9 6C 6B 54 91 49 E4 EA 8F FC D8 </td><td class="hex_ascii">.8.... I.|.Bi.lkT.I.....</td></tr><tr class="hex_row"><td class="hex_address">000198</td><td class="hex_value">8B D7 CF 41 4F E2 1F 3F 85 1A 8A 98 E8 6A 03 D2 C6 E2 52 09 35 6D F3 64 </td><td class="hex_ascii">...AO..?.....j....R.5m.d</td></tr><tr class="hex_row"><td class="hex_address">0001b0</td><td class="hex_value">C6 BB 18 B0 DD 01 A0 5E 1C 73 A1 E0 D9 14 95 13 AE BB 40 23 C4 5B 8C 9C </td><td class="hex_ascii">.......^.s........@#.[..</td></tr><tr class="hex_row"><td class="hex_address">0001c8</td><td class="hex_value">65 90 BF C0 08 ED 99 58 A5 9E F0 93 F4 E8 8B 7D 8E 94 38 6D C0 33 DB 13 </td><td class="hex_ascii">e......X.......}..8m.3..</td></tr><tr class="hex_row"><td class="hex_address">0001e0</td><td class="hex_value">6A 8C D6 6E 46 75 B1 BA 10 CC 99 09 A9 8D A9 54 42 A3 51 A3 D6 C6 61 55 </td><td class="hex_ascii">j..nFu.........TB.Q...aU</td></tr><tr class="hex_row"><td class="hex_address">0001f8</td><td class="hex_value">A0 F4 F5 8B BA ED FA 88 29 2B 26 DC D1 7F 8C DB 11 71 2B 91 08 7B 18 CB </td><td class="hex_ascii">........)+&amp;......q+..{..</td></tr><tr class="hex_row"><td class="hex_address">000210</td><td class="hex_value">78 4F F8 E0 FA 83 46 A4 98 EE D3 D6 22 47 A4 27 F1 1D 8B 48 E8 CF 37 42 </td><td class="hex_ascii">xO....F....."G.'...H..7B</td></tr><tr class="hex_row"><td class="hex_address">000228</td><td class="hex_value">43 06 1D 02 97 CD 7D 75 B1 F9 F9 9C 26 BC BD 62 69 4B BA E3 F2 B4 64 AA </td><td class="hex_ascii">C.....}u....&amp;..biK....d.</td></tr><tr class="hex_row"><td class="hex_address">000240</td><td class="hex_value">B3 34 E5 75 EF AA 52 84 63 D4 BC 22 18 3B 31 05 25 1B C8 79 FC 0E 29 AF </td><td class="hex_ascii">.4.u..R.c..".;1.%..y..).</td></tr><tr class="hex_row"><td class="hex_address">000258</td><td class="hex_value">5E 8C 1B 08 F6 96 92 FC 07 37 D4 8B 4D 94 BA 2C 3A 3F E1 6F D8 81 E0 00 </td><td class="hex_ascii">^........7..M..,:?.o....</td></tr><tr class="hex_row"><td class="hex_address">000270</td><td class="hex_value">10 B5 11 F7 8F 84 CE 60 2F 70 11 0C 98 02 54 B1 70 00 10 6C 9E B5 A6 6C </td><td class="hex_ascii">.......`/p....T.p..l...l</td></tr><tr class="hex_row"><td class="hex_address">000288</td><td class="hex_value">CD 29 B0 66 C4 E3 D9 35 86 30 20 01 00 80 1F 00 C3 E6 8E C4 BB 63 9B FB </td><td class="hex_ascii">.).f...5.0 ..........c..</td></tr><tr class="hex_row"><td class="hex_address">0002a0</td><td class="hex_value">D0 2F B4 C6 5F 38 37 CF 93 17 44 62 B4 1F B4 6D FE 7E 6C 55 26 9D 85 48 </td><td class="hex_ascii">./.._87...Db...m.~lU&amp;..H</td></tr><tr class="hex_row"><td class="hex_address">0002b8</td><td class="hex_value">12 16 03 9E 23 8A D2 2C 08 F8 6E 24 9E FE 25 2A CD FB D0 56 CB DD 49 63 </td><td class="hex_ascii">....#..,..n$..%*...V..Ic</td></tr><tr class="hex_row"><td class="hex_address">0002d0</td><td class="hex_value">FA 3C 9D 0A 47 13 F9 51 7B 1E 64 BA B8 67 5D FB BB B0 90 78 DE 71 58 1A </td><td class="hex_ascii">.&lt;..G..Q{.d..g]....x.qX.</td></tr><tr class="hex_row"><td class="hex_address">0002e8</td><td class="hex_value">76 20 76 CF 6E 87 F7 94 04 75 D1 67 39 C6 66 32 D9 2C F9 52 D1 4B 2C 17 </td><td class="hex_ascii">v v.n....u.g9.f2.,.R.K,.</td></tr><tr class="hex_row"><td class="hex_address">000300</td><td class="hex_value">53 0A 3B A7 26 09 17 F2 83 99 D7 59 70 85 FD 17 05 6F 24 65 61 7D 01 00 </td><td class="hex_ascii">S.;.&amp;......Yp....o$ea}..</td></tr><tr class="hex_row"><td class="hex_address">000318</td><td class="hex_value">20 7F E1 15 37 D4 47 8B 1F A8 DB 3D A6 AF DF 18 14 0D 52 47 </td><td class="hex_ascii"> ...7.G....=......RG</td></tr></tbody></table>

Jackpot
-------

Through some creative guessing in addition to inspection of the application, you can determine the format of this block of data.

        # Marker (0x01) and length of certificate data (0x026A)
        01 00 00 02 6A 

            # Marker or number of certificates
            02 

                # First certificate (Zune Device CA 1)
                00 00 01 33 01 00 00 00 00 B3 01 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... [truncated]
            
                # Second certificate (Zune Device)
                00 00 01 2E 01 00 00 00 00 AE 02 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... [truncated]
            
        # Length of software's random bytes
        00 10 

            # Software's random bytes
            B5 11 F7 8F 84 CE 60 2F 70 11 0C 98 02 54 B1 70  
    
        # Length of device's random bytes
        00 10 

            # Device's random bytes
            6C 9E B5 A6 6C CD 29 B0 66 C4 E3 D9 35 86 30 20 
    
        # Marker and length of message signature
        01 00 80 
            
            # Message signature
            F0 0C 3E 68 EC 4B B6 39 BF BD 02 FB 4C 65 F3 83 7C F9 31 74 46 2B 41 FB 46 DF E7 E6 C5 52 69 D8  ... [truncated]
        
        # Marker and length of CBC-MAC/SHA-256 hash
        01 00 20 

            # CBC-MAC/SHA-256 hash
            7F E1 15 37 D4 47 8B 1F A8 DB 3D A6 AF DF 18 14 0D 52 47 85 FC 6F E7 54 18 36 FD 58 A6 00 06 E9

        # Extra
        00 00 00 00 00 00 00 

So, what do we have? Well, the first portion of data is the device's certificate data. Here we have two certificates, with the names
of `Zune Device CA 1` and `Zune Device`. Each of these certificates have their corresponding RSA public key and modulus. Also, as was 
the case with the ACM, the second certificate seems to be the primary certificate (I didn't make a point of this
in the earlier post, but you might remember that our RSA private key information corresponded to the second certificate's public key data).

Following the certificate data is a copy of the random bytes that we sent to the device. If the random bytes we sent in the ACM do not
match the bytes in this response, then _something_ went wrong and we might as well just give up and quit.

Following those are another 16 random bytes, this time seemingly generated by the device. They likely serve the same purpose 
as the random bytes we generated; that is, to prevent the message from being constant.

Following that are 128 bytes, which is the message signature. It is generated in a fashion similar to our own ACM's signature, which is to 
concatenate the certificate data with the random bytes, perform a hash operation, and then sign it using RSA.

Lastly, there are 32 bytes which seem to be a [CBC-MAC](http://en.wikipedia.org/wiki/CBC-MAC) code with [SHA-256](http://en.wikipedia.org/wiki/SHA-2) applied (based on the strings within the application). 
This is similar to a digital signature, but it differs in that it uses a symmetric cipher as opposed to an asymmetric one like RSA.

### Message signature

I will be perfectly honest, I haven't finished this section. And frankly, I'm not sure if I intend to. I've looked it over and it seems
to be similar to the signature generation algorithm we use for the ACM, but the differences are significant enough that I would have
to inspect the entire thing fairly thoroughly. As I wrote in a comment:

		// Verify Message Signature:
		//
		// We almost basically don't even care about this. Why do we have to verify? 
		// What else besides the Zune devices will know what to send? And if somebody else 
		// does know what exactly to send, well, what's the big deal? 
		//
		// TL;DR reverse engineering can be frustrating sometimes.

If I suddenly get the urge to try and replicate the signature generation, I'll try my best. But as I said, this is not even necessary
since we can almost assume that only the device will be capable of sending a message that adheres to this specific format.

### CBC-MAC/SHA-256 hash

... I also have not finished this section. As far as I can tell, the two random blocks of data (our 16 random bytes and the device's 16
random bytes) are concatenated. For our purposes, we'll call this 32-byte block the token. Then, a CBC-MAC code is calculated of this token.
This portion is really a big puzzle, since it's very cryptic and I'm frankly not sure I even understand it. According to the definition
of a CBC-MAC, a cipher is first applied and then a MAC calculated, but I've been unable to even determine what cipher is applied.

Once the CBC-MAC is calculated, the token and the CBC-MAC are both hashed via SHA-256, which is our final calculated hash. This hash is then
stored, since it is used during the final part of the handshake, the confirmation message. The convenient thing about all of
this is that the software checks to make sure that our calculated hash is equivalent to the 32-byte hash that's at the end of this handshake
response, similar to how a signature works. Since it seems that the process of calculating the hash is not important, we can simply copy
the 32-byte hash at the end of the response and "pretend" that we calculated it.

It's cheating, sure, but the cost of implementation of this section of the algorithm is an unnecessary one.

Overview
--------

So let's recap. We've figured out how to decrypt this message, and we've figured out the format of the decrypted message. We have not, however,
figured out how to implement the message signature and the CBC-MAC/SHA-256 hash, due in part to my laziness as well the cryptic nature of both 
parts.

The unencrypted message begins with two marker bytes, `02 02`. A 128-byte block of data follows (preceded by its 16-bit length, `00 80`). This block
was encrypted with our RSA public key, so we can use our RSA private key to decrypt it. Once decrypted, we perform some hash operations to transform
it into a 16-byte block, which we'll call the hash-key.

Following the 128-byte block of data is an 832-byte block of data (preceded by its 32-bit length, `00 00 03 40`). This block was encrypted using AES,
and so we can decrypt it using our recently generated hash-key, in a process that was similar to the decryption process used during initialization.

This decrypted block of data has a more familiar format. It begins with the device's certificates, two in total. The certificates have the names of
`Zune Device CA 1` and `Zune Device`. The second certificate seems to be the primary certificate of the device, and as such, its RSA public key information 
is used to decrypt the signature later on in the message.

Following the certificates are a copy of the random bytes we sent in the ACM.

After those bytes are the device's 16 random bytes. 

Then, a 128-byte signature follows, which was generated in a fashion similar to our signature in the ACM. In order to decrypt this signature and obtain the calculated
hash of the message, we can use the RSA public key information contained within the device's second certificate. Then, we can calculate the hash of the message
on our own and compare it with the hash we obtained from the signature. However, sicne we can almost already assume that the device that is sending
this message is valid, we can skip this verification step for the sake of ease of implementation.

Lastly, a 32-byte hash follows. This is a SHA-256 hash of the CBC-MAC calculated of the random bytes in the message. Again, for sake of ease of implementation,
we can skip generation of this hash for verification, and can instead simply copy this 32-byte hash for later use.

All in all, I cheated. I cheated a lot on this part of the handshake. But I believe it's justified, since it will allow me to get to the final part of the handshake
quicker. 

Stay tuned for the next post, which will detail the last part of the handshake, the confirmation message.
