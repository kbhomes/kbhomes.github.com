---
layout: post
title: "MTPZ: Initial Analysis"
tags: [zune, mtpz]
---

Microsoft created a now-standardized protocol called the Media Transfer Protocol (MTP)
based upon an earlier standard. MTP was designed to be used for digital media players
so that hardware vendors didn't need to bother writing their own drivers; they just
needed to implement the MTP protocol on the hardware-side and the rest was taken
care of by the computer's operating system.

So when it was Microsoft's turn to create their Zune media players (which are fantastic,
honestly), they deemed it necessary to restrict access to the Zune's media. That is, they 
extended MTP to include a proprietary handshake upon connection of the device in order to
unlock it for synchronization. This protocol extension is known as MTPZ. If the software 
didn't know how to complete the handshake, the Zune would remain locked and it cannot be 
manipulated via the MTP protocol. Perhaps it was necessary for Microsoft to restrict access
to their DRM content. Regardless, what's relevant to me is that on platforms without official
Zune-capable software (e.g.: Linux), synchronization is impossible without the use of a
different operating system.

And that's a problem.

A problem? Or a blessing!
-------------------------

A problem. <span class="secret">High five to all the Archer fans out there.</span>

Evidently the first step would be to capture a few USB sessions of this handshake, which was
done on Windows using the wonderful [USB Monitor by HHD Software](http://www.hhdsoftware.com/usb-monitor).
It's possible to tell when the Zune has completed its handshake when it displays 'connected' on its
screen, so I stopped capturing as soon as I saw this to capture as few extra bytes as possible. This was
repeated three times for a total of three outbound session captures (to the Zune) and three inbound 
sessions captures (from the Zune).

### Outbound:

<script type="text/javascript">addStylesheet("hextable.css");</script>
<div class="hex">
<table class="hex_table">
<tbody>
	<tr class="hex_line"><td class="hex_address">000000</td><td class="hex_value">10 00 00 00 01 00 02 10 00 00 00 00 01 00 00 00 0C 00 00 00 01 00 01 10 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">000018</td><td class="hex_value">01 00 00 00 10 00 00 00 01 00 16 10 02 00 00 00 06 D4 00 00 63 00 00 00 </td><td class="hex_ascii">....................c...</td></tr>
	<tr class="hex_line"><td class="hex_address">000030</td><td class="hex_value">02 00 16 10 02 00 00 00 2B 57 00 69 00 6E 00 64 00 6F 00 77 00 73 00 2F </td><td class="hex_ascii">........+W.i.n.d.o.w.s./</td></tr>
	<tr class="hex_line"><td class="hex_address">000048</td><td class="hex_value">00 36 00 2E 00 31 00 2E 00 37 00 36 00 30 00 30 00 20 00 4D 00 54 00 50 </td><td class="hex_ascii">.6...1...7.6.0.0. .M.T.P</td></tr>
	<tr class="hex_line"><td class="hex_address">000060</td><td class="hex_value">00 5A 00 43 00 6C 00 61 00 73 00 73 00 44 00 72 00 69 00 76 00 65 00 72 </td><td class="hex_ascii">.Z.C.l.a.s.s.D.r.i.v.e.r</td></tr>
	<tr class="hex_line"><td class="hex_address">000078</td><td class="hex_value">00 2F 00 34 00 2E 00 37 00 2E 00 39 00 36 00 35 00 2E 00 30 00 00 00 10 </td><td class="hex_ascii">./.4...7...9.6.5...0....</td></tr>
	<tr class="hex_line"><td class="hex_address">000090</td><td class="hex_value">00 00 00 01 00 14 10 03 00 00 00 2F D2 00 00 10 00 00 00 01 00 14 10 04 </td><td class="hex_ascii">.........../............</td></tr>
	<tr class="hex_line"><td class="hex_address">0000A8</td><td class="hex_value">00 00 00 02 D4 00 00 10 00 00 00 01 00 01 98 05 00 00 00 09 30 00 00 14 </td><td class="hex_ascii">....................0...</td></tr>
	<tr class="hex_line"><td class="hex_address">0000C0</td><td class="hex_value">00 00 00 01 00 02 98 06 00 00 00 86 DC 00 00 09 30 00 00 0C 00 00 00 01 </td><td class="hex_ascii">................0.......</td></tr>
	<tr class="hex_line"><td class="hex_address">0000D8</td><td class="hex_value">00 04 10 07 00 00 00 10 00 00 00 01 00 05 10 08 00 00 00 01 00 01 00 0C </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">0000F0</td><td class="hex_value">00 00 00 01 00 16 92 09 00 00 00 0C 00 00 00 01 00 16 92 0A 00 00 00 0C </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">000108</td><td class="hex_value">00 00 00 01 00 16 92 0B 00 00 00 0C 00 00 00 01 00 12 92 0C 00 00 00 1D </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">000120</td><td class="hex_value">03 00 00 02 00 12 92 0C 00 00 00 02 01 01 00 00 02 75 02 00 00 01 35 01 </td><td class="hex_ascii">.................u....5.</td></tr>
	<tr class="hex_line"><td class="hex_address">000138</td><td class="hex_value">00 00 00 00 B5 01 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">000150</td><td class="hex_value">00 00 00 12 5A 75 6E 65 20 53 6F 66 74 77 61 72 65 20 43 41 20 31 00 01 </td><td class="hex_ascii">....Zune Software CA 1..</td></tr>
	<tr class="hex_line"><td class="hex_address">000168</td><td class="hex_value">00 01 00 80 33 6E E6 AA 07 BF B3 FF D0 40 24 CE C3 8B E6 49 7E F6 0E 3D </td><td class="hex_ascii">....3n.......@$....I~..=</td></tr>
	<tr class="hex_line"><td class="hex_address">000180</td><td class="hex_value">7F 68 2E 0F F1 5E 6C 65 FF 61 3B DE 17 6F AD 71 37 88 4E 80 A8 13 CF 53 </td><td class="hex_ascii">h...^le.a;..o.q7.N....S</td></tr>
	<tr class="hex_line"><td class="hex_address">000198</td><td class="hex_value">C3 10 1A A5 1B 9E 4F 54 B2 4F D5 14 CD C5 09 B6 B7 1E 1F 48 51 3D F0 64 </td><td class="hex_ascii">......OT.O.........HQ=.d</td></tr>
	<tr class="hex_line"><td class="hex_address">0001B0</td><td class="hex_value">44 D9 B5 59 63 E8 12 1C 4C 69 B6 7D 6A 13 14 F9 73 C9 58 5C 29 BB 99 0A </td><td class="hex_ascii">D..Yc...Li.}j...s.X\)...</td></tr>
	<tr class="hex_line"><td class="hex_address">0001C8</td><td class="hex_value">D7 FD 15 1D BB CB 4F 9E D7 DF E2 92 BA 4E D9 C6 AC F5 8E 6A DE EF 5B 87 </td><td class="hex_ascii">......O......N.....j..[.</td></tr>
	<tr class="hex_line"><td class="hex_address">0001E0</td><td class="hex_value">7A 1C 15 45 74 26 34 91 69 46 45 9B 09 4B 25 9E D8 5E F0 2B 08 A3 18 E6 </td><td class="hex_ascii">z..Et&amp;4.iFE..K%..^.+....</td></tr>
	<tr class="hex_line"><td class="hex_address">0001F8</td><td class="hex_value">7A FD 68 C2 89 A8 C6 A6 1B C8 02 3C A8 7F E3 67 BD CC 08 56 C3 D1 57 58 </td><td class="hex_ascii">z.h........&lt;..g...V..WX</td></tr>
	<tr class="hex_line"><td class="hex_address">000210</td><td class="hex_value">C8 66 E5 3F B5 2E 86 EC 56 9C 9C 07 0A 22 17 4F BD 7C 4D CD 39 5E C6 85 </td><td class="hex_ascii">.f.?....V....".O.|M.9^..</td></tr>
	<tr class="hex_line"><td class="hex_address">000228</td><td class="hex_value">30 16 34 51 CE 1F 58 80 44 A0 6E BB 95 A6 D4 BE 68 B0 89 A4 F2 5A 61 2F </td><td class="hex_ascii">0.4Q..X.D.n.....h....Za/</td></tr>
	<tr class="hex_line"><td class="hex_address">000240</td><td class="hex_value">FC EA 56 C1 C3 F8 A6 88 0C 05 76 F2 65 74 B6 4F F8 3D 28 68 F0 FE 36 96 </td><td class="hex_ascii">..V.......v.et.O.=(h..6.</td></tr>
	<tr class="hex_line"><td class="hex_address">000258</td><td class="hex_value">BC 84 25 48 7A E0 62 D4 8A AD FD 08 8A 97 87 B8 06 81 0B ED 00 00 01 37 </td><td class="hex_ascii">..%Hz.b................7</td></tr>
	<tr class="hex_line"><td class="hex_address">000270</td><td class="hex_value">01 00 00 00 00 B7 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">000288</td><td class="hex_value">00 00 00 00 14 5A 75 6E 65 20 53 6F 66 74 77 61 72 65 20 4C 65 61 66 20 </td><td class="hex_ascii">.....Zune Software Leaf </td></tr>
	<tr class="hex_line"><td class="hex_address">0002A0</td><td class="hex_value">31 00 01 00 01 00 80 E5 77 D3 FC BE 3F 03 E2 4F E8 8C 19 F4 64 98 E1 C7 </td><td class="hex_ascii">1.......w...?..O....d...</td></tr>
	<tr class="hex_line"><td class="hex_address">0002B8</td><td class="hex_value">36 18 1B B2 FE BE 2E EB 1E 26 92 B6 DB D0 D1 83 EB 2B 29 B2 D3 36 45 B8 </td><td class="hex_ascii">6........&amp;.......+)..6E.</td></tr>
	<tr class="hex_line"><td class="hex_address">0002D0</td><td class="hex_value">09 8D C6 74 DD 25 D2 A6 5E DA CD 16 FE 8E 3D FF 01 B2 21 3A A4 4F 3B 2C </td><td class="hex_ascii">...t.%..^.....=...!:.O;,</td></tr>
	<tr class="hex_line"><td class="hex_address">0002E8</td><td class="hex_value">68 36 A1 03 56 D4 24 17 01 C2 DB 54 74 9D 89 77 7F 7A 80 90 0F 84 B2 97 </td><td class="hex_ascii">h6..V.$....Tt..wz......</td></tr>
	<tr class="hex_line"><td class="hex_address">000300</td><td class="hex_value">35 69 8C 21 2D F5 16 5B 50 22 B5 F3 BF B6 A7 8B F0 34 E2 9F 9B 2B 97 16 </td><td class="hex_ascii">5i.!-..[P".......4...+..</td></tr>
	<tr class="hex_line"><td class="hex_address">000318</td><td class="hex_value">D3 D3 29 50 9A 95 AD D7 2D 34 57 C3 D4 D0 CA 7E EA C9 77 6F 4D 73 A4 AA </td><td class="hex_ascii">..)P....-4W....~..woMs..</td></tr>
	<tr class="hex_line"><td class="hex_address">000330</td><td class="hex_value">FD 89 6B AA 5A 86 85 C0 5D 5B 74 66 65 21 84 81 67 5E D6 29 B2 55 3A 9D </td><td class="hex_ascii">..k.Z...][tfe!..g^.).U:.</td></tr>
	<tr class="hex_line"><td class="hex_address">000348</td><td class="hex_value">F0 3D 74 58 66 C5 CF 24 03 51 A7 6C 6D BB D0 28 30 E5 F4 72 E2 AD 24 58 </td><td class="hex_ascii">.=tXf..$.Q.lm..(0..r..$X</td></tr>
	<tr class="hex_line"><td class="hex_address">000360</td><td class="hex_value">7C 7C AB 60 18 FD D9 34 C0 93 DF 41 CA B6 18 7E 6E 1E E9 BB 8D D5 99 F9 </td><td class="hex_ascii">||.`...4...A...~n.......</td></tr>
	<tr class="hex_line"><td class="hex_address">000378</td><td class="hex_value">A2 10 F4 05 1F CD FD 55 28 8D 97 61 CA 22 C3 21 9E 72 24 76 46 AB 50 50 </td><td class="hex_ascii">.......U(..a.".!.r$vF.PP</td></tr>
	<tr class="hex_line"><td class="hex_address">000390</td><td class="hex_value">B0 B2 C7 7F 1D FB 6F 95 45 64 03 61 A2 7C AF CC 59 F3 24 42 E2 1B 7B 00 </td><td class="hex_ascii">.....o.Ed.a.|..Y.$B..{.</td></tr>
	<tr class="hex_line"><td class="hex_address">0003A8</td><td class="hex_value">10 B5 11 F7 8F 84 CE 60 2F 70 11 0C 98 02 54 B1 70 01 00 80 29 63 21 CD </td><td class="hex_ascii">.......`/p....T.p...)c!.</td></tr>
	<tr class="hex_line"><td class="hex_address">0003C0</td><td class="hex_value">66 0B 34 07 43 9E A4 B4 C9 F0 0B 84 6A 3F B5 AF 60 0D F8 25 AF 15 33 39 </td><td class="hex_ascii">f.4.C.......j?..`..%..39</td></tr>
	<tr class="hex_line"><td class="hex_address">0003D8</td><td class="hex_value">2D 91 57 24 E6 77 06 3D BF 6D CE AA CC E9 BD CA 10 BB 7D 8C 08 47 E4 B8 </td><td class="hex_ascii">-.W$.w.=.m........}..G..</td></tr>
	<tr class="hex_line"><td class="hex_address">0003F0</td><td class="hex_value">CD 5D C8 14 AB 31 FB 41 33 70 45 41 46 00 58 E4 A8 7B C2 3E 9B 53 75 D4 </td><td class="hex_ascii">.]...1.A3pEAF.X..{.&gt;.Su.</td></tr>
	<tr class="hex_line"><td class="hex_address">000408</td><td class="hex_value">82 F8 B9 B6 56 EA 70 49 B2 DC F0 12 29 CE A1 01 32 4A 7E 3C 8F 97 DE 49 </td><td class="hex_ascii">....V.pI....)...2J~&lt;...I</td></tr>
	<tr class="hex_line"><td class="hex_address">000420</td><td class="hex_value">1C 80 6C F0 E2 91 7A 79 3E 29 07 81 9B 04 FC 14 34 A5 79 83 39 7C 58 B4 </td><td class="hex_ascii">..l...zy&gt;)......4.y.9|X.</td></tr>
	<tr class="hex_line"><td class="hex_address">000438</td><td class="hex_value">42 36 A0 6C 0C 00 00 00 01 00 13 92 0D 00 00 00 0C 00 00 00 01 00 12 92 </td><td class="hex_ascii">B6.l....................</td></tr>
	<tr class="hex_line"><td class="hex_address">000450</td><td class="hex_value">0E 00 00 00 20 00 00 00 02 00 12 92 0E 00 00 00 02 03 00 10 CD A5 6A 66 </td><td class="hex_ascii">.... .................jf</td></tr>
	<tr class="hex_line"><td class="hex_address">000468</td><td class="hex_value">68 25 67 9D 99 CE B2 E9 28 E3 9F B9 10 00 00 00 01 00 05 10 0F 00 00 00 </td><td class="hex_ascii">h%g.....(...............</td></tr>
	<tr class="hex_line"><td class="hex_address">000480</td><td class="hex_value">01 00 01 00 10 00 00 00 01 00 14 10 10 00 00 00 02 50 00 00 10 00 00 00 </td><td class="hex_ascii">.................P......</td></tr>
	<tr class="hex_line"><td class="hex_address">000498</td><td class="hex_value">01 00 15 10 11 00 00 00 02 D1 00 00 10 00 00 00 01 00 15 10 12 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">0004B0</td><td class="hex_value">01 D1 00 00 10 00 00 00 01 00 14 10 13 00 00 00 03 D1 00 00 10 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">0004C8</td><td class="hex_value">01 00 15 10 14 00 00 00 01 D1 00 00 1C 00 00 00 01 00 04 91 15 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">0004E0</td><td class="hex_value">01 00 00 00 80 01 00 00 00 00 00 00 64 00 00 00 10 00 00 00 01 00 14 10 </td><td class="hex_ascii">............d...........</td></tr>
	<tr class="hex_line"><td class="hex_address">0004F8</td><td class="hex_value">16 00 00 00 1C D2 00 00 10 00 00 00 01 00 14 10 17 00 00 00 25 D2 00 00 </td><td class="hex_ascii">....................%...</td></tr>
	<tr class="hex_line"><td class="hex_address">000510</td><td class="hex_value">10 00 00 00 01 00 14 10 18 00 00 00 1A D2 00 00 10 00 00 00 01 00 14 10 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">000528</td><td class="hex_value">19 00 00 00 01 D4 00 00 </td><td class="hex_ascii">........</td></tr>
</tbody>
</table>
</div>

### Inbound:

<div class="hex">
<table class="hex_table">
<tbody>
	<tr class="hex_line"><td class="hex_address">000000</td><td class="hex_value">0C 00 00 00 03 00 01 20 00 00 00 00 45 03 00 00 02 00 01 10 01 00 00 00 </td><td class="hex_ascii">....... ....E...........</td></tr>
	<tr class="hex_line"><td class="hex_address">000018</td><td class="hex_value">64 00 06 00 00 00 64 00 AC 6D 00 69 00 63 00 72 00 6F 00 73 00 6F 00 66 </td><td class="hex_ascii">d.....d..m.i.c.r.o.s.o.f</td></tr>
	<tr class="hex_line"><td class="hex_address">000030</td><td class="hex_value">00 74 00 2E 00 63 00 6F 00 6D 00 3A 00 20 00 31 00 2E 00 30 00 3B 00 20 </td><td class="hex_ascii">.t...c.o.m.:. .1...0.;. </td></tr>
	<tr class="hex_line"><td class="hex_address">000048</td><td class="hex_value">00 6D 00 69 00 63 00 72 00 6F 00 73 00 6F 00 66 00 74 00 2E 00 63 00 6F </td><td class="hex_ascii">.m.i.c.r.o.s.o.f.t...c.o</td></tr>
	<tr class="hex_line"><td class="hex_address">000060</td><td class="hex_value">00 6D 00 2F 00 57 00 4D 00 44 00 52 00 4D 00 50 00 44 00 3A 00 20 00 31 </td><td class="hex_ascii">.m./.W.M.D.R.M.P.D.:. .1</td></tr>
	<tr class="hex_line"><td class="hex_address">000078</td><td class="hex_value">00 30 00 2E 00 31 00 3B 00 20 00 6D 00 69 00 63 00 72 00 6F 00 73 00 6F </td><td class="hex_ascii">.0...1.;. .m.i.c.r.o.s.o</td></tr>
	<tr class="hex_line"><td class="hex_address">000090</td><td class="hex_value">00 66 00 74 00 2E 00 63 00 6F 00 6D 00 2F 00 57 00 4D 00 50 00 50 00 44 </td><td class="hex_ascii">.f.t...c.o.m./.W.M.P.P.D</td></tr>
	<tr class="hex_line"><td class="hex_address">0000A8</td><td class="hex_value">00 3A 00 20 00 31 00 31 00 2E 00 31 00 3B 00 20 00 6D 00 69 00 63 00 72 </td><td class="hex_ascii">.:. .1.1...1.;. .m.i.c.r</td></tr>
	<tr class="hex_line"><td class="hex_address">0000C0</td><td class="hex_value">00 6F 00 73 00 6F 00 66 00 74 00 2E 00 63 00 6F 00 6D 00 2F 00 41 00 41 </td><td class="hex_ascii">.o.s.o.f.t...c.o.m./.A.A</td></tr>
	<tr class="hex_line"><td class="hex_address">0000D8</td><td class="hex_value">00 56 00 54 00 3A 00 20 00 31 00 2E 00 30 00 3B 00 20 00 6D 00 69 00 63 </td><td class="hex_ascii">.V.T.:. .1...0.;. .m.i.c</td></tr>
	<tr class="hex_line"><td class="hex_address">0000F0</td><td class="hex_value">00 72 00 6F 00 73 00 6F 00 66 00 74 00 2E 00 63 00 6F 00 6D 00 2F 00 57 </td><td class="hex_ascii">.r.o.s.o.f.t...c.o.m./.W</td></tr>
	<tr class="hex_line"><td class="hex_address">000108</td><td class="hex_value">00 4D 00 44 00 52 00 4D 00 4E 00 44 00 3A 00 20 00 31 00 2E 00 30 00 3B </td><td class="hex_ascii">.M.D.R.M.N.D.:. .1...0.;</td></tr>
	<tr class="hex_line"><td class="hex_address">000120</td><td class="hex_value">00 20 00 6D 00 69 00 63 00 72 00 6F 00 73 00 6F 00 66 00 74 00 2E 00 63 </td><td class="hex_ascii">. .m.i.c.r.o.s.o.f.t...c</td></tr>
	<tr class="hex_line"><td class="hex_address">000138</td><td class="hex_value">00 6F 00 6D 00 2F 00 4D 00 54 00 50 00 5A 00 3A 00 20 00 31 00 2E 00 30 </td><td class="hex_ascii">.o.m./.M.T.P.Z.:. .1...0</td></tr>
	<tr class="hex_line"><td class="hex_address">000150</td><td class="hex_value">00 3B 00 20 00 61 00 75 00 64 00 69 00 62 00 6C 00 65 00 2E 00 63 00 6F </td><td class="hex_ascii">.;. .a.u.d.i.b.l.e...c.o</td></tr>
	<tr class="hex_line"><td class="hex_address">000168</td><td class="hex_value">00 6D 00 3A 00 20 00 31 00 2E 00 30 00 3B 00 00 00 00 00 55 00 00 00 01 </td><td class="hex_ascii">.m.:. .1...0.;.....U....</td></tr>
	<tr class="hex_line"><td class="hex_address">000180</td><td class="hex_value">10 02 10 03 10 04 10 05 10 06 10 07 10 08 10 09 10 0B 10 0C 10 0D 10 0F </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">000198</td><td class="hex_value">10 10 10 14 10 15 10 16 10 19 10 1B 10 10 98 11 98 02 98 07 98 01 98 03 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">0001B0</td><td class="hex_value">98 04 98 05 98 06 98 08 98 29 92 2A 92 2E 92 2F 92 30 92 31 92 01 91 02 </td><td class="hex_ascii">.........).*.../.0.1....</td></tr>
	<tr class="hex_line"><td class="hex_address">0001C8</td><td class="hex_value">91 03 91 04 91 05 91 06 91 07 91 08 91 09 91 0A 91 0B 91 18 92 19 92 04 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">0001E0</td><td class="hex_value">92 17 92 32 92 26 92 25 92 24 92 27 92 28 92 12 92 13 92 14 92 15 92 16 </td><td class="hex_ascii">...2.&amp;.%.$.'.(..........</td></tr>
	<tr class="hex_line"><td class="hex_address">0001F8</td><td class="hex_value">92 70 91 71 91 72 91 1A 92 1B 92 1C 92 1D 92 80 91 81 91 82 91 83 91 84 </td><td class="hex_ascii">.p.q.r..................</td></tr>
	<tr class="hex_line"><td class="hex_address">000210</td><td class="hex_value">91 85 91 20 92 21 92 22 92 23 92 2B 92 2C 92 2D 92 42 92 43 92 40 92 08 </td><td class="hex_ascii">... .!.".#.+.,.-.B.C.@..</td></tr>
	<tr class="hex_line"><td class="hex_address">000228</td><td class="hex_value">61 04 00 00 00 0C 40 03 40 01 C7 02 C7 1F 00 00 00 01 D5 21 D2 01 D1 01 </td><td class="hex_ascii">a.....@.@..........!....</td></tr>
	<tr class="hex_line"><td class="hex_address">000240</td><td class="hex_value">D4 01 50 02 D1 02 D4 02 50 19 D2 18 D2 05 D4 25 D2 1C D2 26 D2 06 D4 17 </td><td class="hex_ascii">..P.....P......%...&amp;....</td></tr>
	<tr class="hex_line"><td class="hex_address">000258</td><td class="hex_value">D2 03 D1 1A D2 1B D2 1F D2 00 D1 20 D2 30 D2 27 D2 28 D2 2A D2 2B D2 2C </td><td class="hex_ascii">........... .0.'.(.*.+.,</td></tr>
	<tr class="hex_line"><td class="hex_address">000270</td><td class="hex_value">D2 29 D2 2D D2 2E D2 00 00 00 00 13 00 00 00 09 30 01 B9 0C 30 15 B2 03 </td><td class="hex_ascii">.).-............0...0...</td></tr>
	<tr class="hex_line"><td class="hex_address">000288</td><td class="hex_value">B9 04 B9 01 B3 16 B2 82 B9 81 B9 01 38 01 30 03 BA 05 BA 11 B2 13 B2 00 </td><td class="hex_ascii">............8.0.........</td></tr>
	<tr class="hex_line"><td class="hex_address">0002A0</td><td class="hex_value">30 02 B8 0B BA 0A 4D 00 69 00 63 00 72 00 6F 00 73 00 6F 00 66 00 74 00 </td><td class="hex_ascii">0.....M.i.c.r.o.s.o.f.t.</td></tr>
	<tr class="hex_line"><td class="hex_address">0002B8</td><td class="hex_value">00 00 05 5A 00 75 00 6E 00 65 00 00 00 15 30 00 33 00 2E 00 33 00 30 00 </td><td class="hex_ascii">...Z.u.n.e....0.3...3.0.</td></tr>
	<tr class="hex_line"><td class="hex_address">0002D0</td><td class="hex_value">2E 00 30 00 30 00 30 00 33 00 39 00 2E 00 30 00 30 00 2D 00 30 00 31 00 </td><td class="hex_ascii">..0.0.0.3.9...0.0.-.0.1.</td></tr>
	<tr class="hex_line"><td class="hex_address">0002E8</td><td class="hex_value">36 00 32 00 30 00 00 00 2A 66 00 30 00 62 00 37 00 30 00 32 00 35 00 38 </td><td class="hex_ascii">6.2.0...*f.0.b.7.0.2.5.8</td></tr>
	<tr class="hex_line"><td class="hex_address">000300</td><td class="hex_value">00 20 00 2D 00 20 00 38 00 33 00 66 00 35 00 35 00 35 00 39 00 31 00 20 </td><td class="hex_ascii">. .-. .8.3.f.5.5.5.9.1. </td></tr>
	<tr class="hex_line"><td class="hex_address">000318</td><td class="hex_value">00 2D 00 20 00 38 00 32 00 64 00 38 00 32 00 36 00 65 00 65 00 20 00 2D </td><td class="hex_ascii">.-. .8.2.d.8.2.6.e.e. .-</td></tr>
	<tr class="hex_line"><td class="hex_address">000330</td><td class="hex_value">00 20 00 61 00 64 00 63 00 63 00 30 00 63 00 65 00 38 00 00 00 00 00 00 </td><td class="hex_ascii">. .a.d.c.c.0.c.e.8......</td></tr>
	<tr class="hex_line"><td class="hex_address">000348</td><td class="hex_value">00 00 00 00 00 00 00 00 00 0C 00 00 00 03 00 01 20 01 00 00 00 0C 00 00 </td><td class="hex_ascii">................ .......</td></tr>
	<tr class="hex_line"><td class="hex_address">000360</td><td class="hex_value">00 03 00 01 20 02 00 00 00 0C 00 00 00 03 00 0A 20 03 00 00 00 1E 00 00 </td><td class="hex_ascii">.... ........... .......</td></tr>
	<tr class="hex_line"><td class="hex_address">000378</td><td class="hex_value">00 02 00 14 10 04 00 00 00 02 D4 FF FF 01 00 05 5A 00 75 00 6E 00 65 00 </td><td class="hex_ascii">................Z.u.n.e.</td></tr>
	<tr class="hex_line"><td class="hex_address">000390</td><td class="hex_value">00 00 00 0C 00 00 00 03 00 01 20 04 00 00 00 6A 00 00 00 02 00 01 98 05 </td><td class="hex_ascii">.......... ....j........</td></tr>
	<tr class="hex_line"><td class="hex_address">0003A8</td><td class="hex_value">00 00 00 2D 00 00 00 99 DE 99 DA 84 DC 44 DC 04 DC B0 DA 97 DA 4F DC 47 </td><td class="hex_ascii">...-.........D.......O.G</td></tr>
	<tr class="hex_line"><td class="hex_address">0003C0</td><td class="hex_value">DC 07 DC 02 DA 82 DA 62 DD 02 DC 8B DC 0B DC 01 DA 81 DC 01 D9 01 DC 41 </td><td class="hex_ascii">.......b...............A</td></tr>
	<tr class="hex_line"><td class="hex_address">0003D8</td><td class="hex_value">DC 9B DA 9B DC 9A DE 9A DA 9A DC 86 DC 46 DC B2 DA 48 DC 9D DC 89 DC 8C </td><td class="hex_ascii">.............F...H......</td></tr>
	<tr class="hex_line"><td class="hex_address">0003F0</td><td class="hex_value">DC 95 DC 91 DC 94 DE B4 DA 9E DA 00 DA 60 DD 8A DC 03 DA 83 DC 05 DA 93 </td><td class="hex_ascii">.............`..........</td></tr>
	<tr class="hex_line"><td class="hex_address">000408</td><td class="hex_value">DE 0C 00 00 00 03 00 01 20 05 00 00 00 1E 00 00 00 02 00 02 98 06 00 00 </td><td class="hex_ascii">........ ...............</td></tr>
	<tr class="hex_line"><td class="hex_address">000420</td><td class="hex_value">00 86 DC 02 40 01 00 00 00 00 00 00 00 00 06 00 00 10 00 0C 00 00 00 03 </td><td class="hex_ascii">....@...................</td></tr>
	<tr class="hex_line"><td class="hex_address">000438</td><td class="hex_value">00 01 20 06 00 00 00 14 00 00 00 02 00 04 10 07 00 00 00 01 00 00 00 01 </td><td class="hex_ascii">.. .....................</td></tr>
	<tr class="hex_line"><td class="hex_address">000450</td><td class="hex_value">00 01 00 0C 00 00 00 03 00 01 20 07 00 00 00 8C 00 00 00 02 00 05 10 08 </td><td class="hex_ascii">.......... .............</td></tr>
	<tr class="hex_line"><td class="hex_address">000468</td><td class="hex_value">00 00 00 03 00 02 00 00 00 00 80 B9 D8 01 00 00 00 00 80 C3 84 01 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">000480</td><td class="hex_value">00 FF FF FF FF 08 53 00 74 00 6F 00 72 00 61 00 67 00 65 00 00 00 2A 66 </td><td class="hex_ascii">......S.t.o.r.a.g.e...*f</td></tr>
	<tr class="hex_line"><td class="hex_address">000498</td><td class="hex_value">00 30 00 62 00 37 00 30 00 32 00 35 00 38 00 20 00 2D 00 20 00 38 00 33 </td><td class="hex_ascii">.0.b.7.0.2.5.8. .-. .8.3</td></tr>
	<tr class="hex_line"><td class="hex_address">0004B0</td><td class="hex_value">00 66 00 35 00 35 00 35 00 39 00 31 00 20 00 2D 00 20 00 38 00 32 00 64 </td><td class="hex_ascii">.f.5.5.5.9.1. .-. .8.2.d</td></tr>
	<tr class="hex_line"><td class="hex_address">0004C8</td><td class="hex_value">00 38 00 32 00 36 00 65 00 65 00 20 00 2D 00 20 00 61 00 64 00 63 00 63 </td><td class="hex_ascii">.8.2.6.e.e. .-. .a.d.c.c</td></tr>
	<tr class="hex_line"><td class="hex_address">0004E0</td><td class="hex_value">00 30 00 63 00 65 00 38 00 00 00 0C 00 00 00 03 00 01 20 08 00 00 00 0C </td><td class="hex_ascii">.0.c.e.8.......... .....</td></tr>
	<tr class="hex_line"><td class="hex_address">0004F8</td><td class="hex_value">00 00 00 03 00 01 20 09 00 00 00 0C 00 00 00 03 00 01 20 0A 00 00 00 0C </td><td class="hex_ascii">...... ........... .....</td></tr>
	<tr class="hex_line"><td class="hex_address">000510</td><td class="hex_value">00 00 00 03 00 01 20 0B 00 00 00 10 00 00 00 03 00 01 20 0C 00 00 00 12 </td><td class="hex_ascii">...... ........... .....</td></tr>
	<tr class="hex_line"><td class="hex_address">000528</td><td class="hex_value">00 00 00 D4 03 00 00 02 00 13 92 0D 00 00 00 02 02 00 80 3B FA 89 B4 52 </td><td class="hex_ascii">...................;...R</td></tr>
	<tr class="hex_line"><td class="hex_address">000540</td><td class="hex_value">F5 13 1A A4 70 EF DC 7D 7E 40 E8 93 DF 1B 90 3F 68 55 69 01 7D 83 5B DD </td><td class="hex_ascii">....p..}~@.....?hUi.}.[.</td></tr>
	<tr class="hex_line"><td class="hex_address">000558</td><td class="hex_value">14 5A 5C FD 0C 18 9A A8 B6 14 E2 06 D9 7A 0B E8 F7 3E 37 EF 4F 8B 26 90 </td><td class="hex_ascii">.Z\..........z...&gt;7.O.&amp;.</td></tr>
	<tr class="hex_line"><td class="hex_address">000570</td><td class="hex_value">3F 99 B0 DC 2D 9D 08 26 A8 1A 7D 1D F3 B5 67 2D 79 77 12 2E 3B F5 73 51 </td><td class="hex_ascii">?...-..&amp;..}...g-yw..;.sQ</td></tr>
	<tr class="hex_line"><td class="hex_address">000588</td><td class="hex_value">F0 CF B0 23 0B 42 77 7B 31 4D FC C7 4C DB F4 71 28 FE 30 FF 70 A3 28 1E </td><td class="hex_ascii">...#.Bw{1M..L..q(.0.p.(.</td></tr>
	<tr class="hex_line"><td class="hex_address">0005A0</td><td class="hex_value">35 1B 43 0C B8 8A D4 CA 8D C1 76 B6 6E 06 5F 8C A5 DD 94 2C A9 6F 65 B1 </td><td class="hex_ascii">5.C.......v.n._....,.oe.</td></tr>
	<tr class="hex_line"><td class="hex_address">0005B8</td><td class="hex_value">2A 64 29 00 00 03 40 EA 16 86 55 D0 69 8C 36 7E 93 C6 A1 B0 F6 FC 62 8E </td><td class="hex_ascii">*d)...@...U.i.6~......b.</td></tr>
	<tr class="hex_line"><td class="hex_address">0005D0</td><td class="hex_value">18 88 D4 FA CA C8 0F BF E2 CC 9D 7F D0 05 C7 70 9D 0C 14 6F 16 AC 84 64 </td><td class="hex_ascii">..............p...o...d</td></tr>
	<tr class="hex_line"><td class="hex_address">0005E8</td><td class="hex_value">28 CB FA FE CC 3C AA D1 4C 62 9D 6E 19 95 72 F4 82 75 0E CA 7C 90 1D 41 </td><td class="hex_ascii">(....&lt;..Lb.n..r..u..|..A</td></tr>
	<tr class="hex_line"><td class="hex_address">000600</td><td class="hex_value">EE C3 EA BB 5E 81 B8 12 91 57 64 E2 22 B3 A5 BF 25 C3 0A 13 1D A7 B0 42 </td><td class="hex_ascii">....^....Wd."...%......B</td></tr>
	<tr class="hex_line"><td class="hex_address">000618</td><td class="hex_value">C9 20 A9 A2 ED 8E E7 9F 21 BA CA 95 FF 65 5D BA 45 ED CE 85 7F C7 21 85 </td><td class="hex_ascii">. ......!....e].E....!.</td></tr>
	<tr class="hex_line"><td class="hex_address">000630</td><td class="hex_value">9C 0D DE 7B 6A F9 AE 44 D7 F9 B2 9E 48 33 FA BD 8F B6 9C A2 65 74 91 B8 </td><td class="hex_ascii">...{j..D....H3......et..</td></tr>
	<tr class="hex_line"><td class="hex_address">000648</td><td class="hex_value">71 5C B6 E9 8F 3C EF F7 EA 46 E0 0E 5B 12 8D 41 44 19 02 49 B8 14 F7 33 </td><td class="hex_ascii">q\...&lt;...F..[..AD..I...3</td></tr>
	<tr class="hex_line"><td class="hex_address">000660</td><td class="hex_value">42 A1 E0 88 FB 9F 57 50 B9 D8 68 B8 F5 9A EA F8 D8 23 F9 4D DD 09 8E BF </td><td class="hex_ascii">B.....WP..h......#.M....</td></tr>
	<tr class="hex_line"><td class="hex_address">000678</td><td class="hex_value">CE E3 D4 7A D2 B3 93 8D EB 6E 47 E8 37 5B B7 78 B1 16 54 58 85 B7 26 D6 </td><td class="hex_ascii">...z.....nG.7[.x..TX..&amp;.</td></tr>
	<tr class="hex_line"><td class="hex_address">000690</td><td class="hex_value">12 85 90 23 30 D5 4B 3B C0 98 17 FF 94 CD 36 1E 65 DC 9D DE 07 E4 0C 75 </td><td class="hex_ascii">...#0.K;......6.e......u</td></tr>
	<tr class="hex_line"><td class="hex_address">0006A8</td><td class="hex_value">EA 86 7B FE 2C F6 C2 1C BF 42 66 26 89 EB 2C E5 A0 86 0E 31 8A 3A BE 32 </td><td class="hex_ascii">..{.,....Bf&amp;..,....1.:.2</td></tr>
	<tr class="hex_line"><td class="hex_address">0006C0</td><td class="hex_value">CC FF 74 FF 10 8C E8 85 81 AC 42 79 93 14 7B 72 43 61 0C 5B 23 48 C5 E8 </td><td class="hex_ascii">..t.......By..{rCa.[#H..</td></tr>
	<tr class="hex_line"><td class="hex_address">0006D8</td><td class="hex_value">38 36 69 72 74 AD F2 E3 27 50 DA C2 59 93 C6 C8 11 2D 51 AA DC 41 5F 08 </td><td class="hex_ascii">86irt...'P..Y....-Q..A_.</td></tr>
	<tr class="hex_line"><td class="hex_address">0006F0</td><td class="hex_value">28 18 63 C8 72 8F 83 9B F9 07 3A CC D7 66 F5 D9 B7 2F A9 00 62 5D 2D EF </td><td class="hex_ascii">(.c.r.....:..f.../..b]-.</td></tr>
	<tr class="hex_line"><td class="hex_address">000708</td><td class="hex_value">26 62 C9 17 6B 48 43 5A 18 DB C5 54 D6 CB 87 AC 07 CC 67 31 CC 62 F8 95 </td><td class="hex_ascii">&amp;b..kHCZ...T......g1.b..</td></tr>
	<tr class="hex_line"><td class="hex_address">000720</td><td class="hex_value">DD 29 52 4A 17 99 C8 5E CE 11 37 98 84 6D 12 69 40 EF 1E 1A E5 B8 AC 41 </td><td class="hex_ascii">.)RJ...^..7..m.i@......A</td></tr>
	<tr class="hex_line"><td class="hex_address">000738</td><td class="hex_value">C8 06 76 79 05 EA 7A 13 83 12 73 54 33 20 DA 51 50 8B 4A A4 3B C4 6F 21 </td><td class="hex_ascii">..vy..z...sT3 .QP.J.;.o!</td></tr>
	<tr class="hex_line"><td class="hex_address">000750</td><td class="hex_value">FB E7 B7 20 77 CD DE 37 17 4B 75 35 DB 32 90 1E 8B 81 FD E6 79 DC 1F F4 </td><td class="hex_ascii">... w..7.Ku5.2......y...</td></tr>
	<tr class="hex_line"><td class="hex_address">000768</td><td class="hex_value">EB 83 6A CE 0A 05 C1 E4 ED 1B 37 10 13 04 99 0C 7E 34 9B AD DA 8A 24 F6 </td><td class="hex_ascii">..j.......7.....~4....$.</td></tr>
	<tr class="hex_line"><td class="hex_address">000780</td><td class="hex_value">E7 F1 7E EC C1 A1 EF 74 48 B5 92 81 62 C8 B3 94 F1 75 37 6D 16 F7 46 9A </td><td class="hex_ascii">..~....tH...b....u7m..F.</td></tr>
	<tr class="hex_line"><td class="hex_address">000798</td><td class="hex_value">DD 8D EF 50 DF 7A F0 19 80 74 FE 7D 83 DF 2C 9E 01 12 B4 1A 97 91 DE 59 </td><td class="hex_ascii">...P.z...t.}..,........Y</td></tr>
	<tr class="hex_line"><td class="hex_address">0007B0</td><td class="hex_value">7A DA 75 7F 89 F6 47 3A 0A F3 6E E3 F2 D1 B4 C9 95 F6 80 33 44 57 53 1D </td><td class="hex_ascii">z.u..G:..n........3DWS.</td></tr>
	<tr class="hex_line"><td class="hex_address">0007C8</td><td class="hex_value">DB DA DC 0D D0 C5 1A 24 9F 04 0A 5C 88 94 D2 BC 99 08 E2 E9 45 1E AA DA </td><td class="hex_ascii">.......$...\........E...</td></tr>
	<tr class="hex_line"><td class="hex_address">0007E0</td><td class="hex_value">64 3A C1 DD E5 6A 75 B5 4D 0F 2B 49 4D 51 69 05 DE 22 6A 49 5E E2 5A 2C </td><td class="hex_ascii">d:...ju.M.+IMQi.."jI^.Z,</td></tr>
	<tr class="hex_line"><td class="hex_address">0007F8</td><td class="hex_value">BC 0E A1 93 3C 3C 6E D7 66 D1 B5 13 8F C9 3F 3E FE 35 ED 49 04 38 DC 8B </td><td class="hex_ascii">....&lt;&lt;n.f.....?&gt;.5.I.8..</td></tr>
	<tr class="hex_line"><td class="hex_address">000810</td><td class="hex_value">D3 69 56 FD 77 A1 B9 BA C6 C3 6C 44 CF 38 C9 0F 23 C5 D1 3A 4B A6 08 03 </td><td class="hex_ascii">.iV.w.....lD.8..#..:K...</td></tr>
	<tr class="hex_line"><td class="hex_address">000828</td><td class="hex_value">05 4B E6 4D C6 96 74 34 B5 3E 50 6E 07 FB C6 DE 88 9F F2 C4 6C AE 66 DA </td><td class="hex_ascii">.K.M..t4.&gt;Pn........l.f.</td></tr>
	<tr class="hex_line"><td class="hex_address">000840</td><td class="hex_value">A1 44 15 16 0F BB 6D 2A DA 86 5A B0 E1 28 C5 9E 40 8F 52 0F 45 AD 1E 6B </td><td class="hex_ascii">.D....m*..Z..(..@.R.E..k</td></tr>
	<tr class="hex_line"><td class="hex_address">000858</td><td class="hex_value">8E BE B0 5C 54 8F 71 78 5B F0 7D 3F 11 11 3B 98 6C C4 20 DE 7A 0A 29 68 </td><td class="hex_ascii">...\T.qx[.}?..;.l. .z.)h</td></tr>
	<tr class="hex_line"><td class="hex_address">000870</td><td class="hex_value">F5 A0 76 EF 57 C9 B7 C5 BB E3 2F 14 50 21 43 20 B3 69 B1 63 6E BB 62 54 </td><td class="hex_ascii">..v.W...../.P!C .i.cn.bT</td></tr>
	<tr class="hex_line"><td class="hex_address">000888</td><td class="hex_value">09 C3 CD 48 A0 02 3C F5 02 2C 2A 4D E4 50 AF 74 41 4B D4 08 72 AC 64 71 </td><td class="hex_ascii">...H..&lt;..,*M.P.tAK..r.dq</td></tr>
	<tr class="hex_line"><td class="hex_address">0008A0</td><td class="hex_value">86 4F 4B 2D 54 77 13 D4 2E 25 0B 72 DE 90 DC 0B 3D 03 17 B2 0C 79 92 08 </td><td class="hex_ascii">.OK-Tw...%.r....=....y..</td></tr>
	<tr class="hex_line"><td class="hex_address">0008B8</td><td class="hex_value">89 74 82 67 BE DC 5A 7C F8 7A 00 E7 54 2F 39 31 88 35 95 FB A0 1D 98 80 </td><td class="hex_ascii">.t.g..Z|.z..T/91.5......</td></tr>
	<tr class="hex_line"><td class="hex_address">0008D0</td><td class="hex_value">11 16 EB CB 63 FF A0 F6 5D B4 3C 9B 45 64 46 02 AA 85 DC 23 F1 C7 9B 4A </td><td class="hex_ascii">....c...].&lt;.EdF....#...J</td></tr>
	<tr class="hex_line"><td class="hex_address">0008E8</td><td class="hex_value">A3 A8 41 CE E1 F8 C5 B1 BA 0E 8F 82 3E FE E7 D2 C6 84 23 F6 65 7B 4A 0C </td><td class="hex_ascii">..A.........&gt;.....#.e{J.</td></tr>
	<tr class="hex_line"><td class="hex_address">000900</td><td class="hex_value">00 00 00 03 00 01 20 0D 00 00 00 10 00 00 00 03 00 01 20 0E 00 00 00 12 </td><td class="hex_ascii">...... ........... .....</td></tr>
	<tr class="hex_line"><td class="hex_address">000918</td><td class="hex_value">00 00 00 18 00 00 00 04 00 0C 40 00 00 00 00 01 00 01 00 00 00 00 00 00 </td><td class="hex_ascii">..........@.............</td></tr>
	<tr class="hex_line"><td class="hex_address">000930</td><td class="hex_value">00 00 00 8C 00 00 00 02 00 05 10 0F 00 00 00 03 00 02 00 00 00 00 80 B9 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">000948</td><td class="hex_value">D8 01 00 00 00 00 80 C3 84 01 00 00 00 FF FF FF FF 08 53 00 74 00 6F 00 </td><td class="hex_ascii">..................S.t.o.</td></tr>
	<tr class="hex_line"><td class="hex_address">000960</td><td class="hex_value">72 00 61 00 67 00 65 00 00 00 2A 66 00 30 00 62 00 37 00 30 00 32 00 35 </td><td class="hex_ascii">r.a.g.e...*f.0.b.7.0.2.5</td></tr>
	<tr class="hex_line"><td class="hex_address">000978</td><td class="hex_value">00 38 00 20 00 2D 00 20 00 38 00 33 00 66 00 35 00 35 00 35 00 39 00 31 </td><td class="hex_ascii">.8. .-. .8.3.f.5.5.5.9.1</td></tr>
	<tr class="hex_line"><td class="hex_address">000990</td><td class="hex_value">00 20 00 2D 00 20 00 38 00 32 00 64 00 38 00 32 00 36 00 65 00 65 00 20 </td><td class="hex_ascii">. .-. .8.2.d.8.2.6.e.e. </td></tr>
	<tr class="hex_line"><td class="hex_address">0009A8</td><td class="hex_value">00 2D 00 20 00 61 00 64 00 63 00 63 00 30 00 63 00 65 00 38 00 00 00 0C </td><td class="hex_ascii">.-. .a.d.c.c.0.c.e.8....</td></tr>
	<tr class="hex_line"><td class="hex_address">0009C0</td><td class="hex_value">00 00 00 03 00 01 20 0F 00 00 00 1C 00 00 00 02 00 14 10 10 00 00 00 02 </td><td class="hex_ascii">...... .................</td></tr>
	<tr class="hex_line"><td class="hex_address">0009D8</td><td class="hex_value">50 04 00 00 00 00 00 00 02 02 00 00 00 01 80 0C 00 00 00 03 00 01 20 10 </td><td class="hex_ascii">P..................... .</td></tr>
	<tr class="hex_line"><td class="hex_address">0009F0</td><td class="hex_value">00 00 00 04 16 00 00 02 00 15 10 11 00 00 00 FA 0A 00 00 FF FE 3C 00 44 </td><td class="hex_ascii">.....................&lt;.D</td></tr>
	<tr class="hex_line"><td class="hex_address">000A08</td><td class="hex_value">00 45 00 56 00 43 00 45 00 52 00 54 00 20 00 76 00 65 00 72 00 73 00 69 </td><td class="hex_ascii">.E.V.C.E.R.T. .v.e.r.s.i</td></tr>
	<tr class="hex_line"><td class="hex_address">000A20</td><td class="hex_value">00 6F 00 6E 00 3D 00 22 00 31 00 2E 00 30 00 22 00 3E 00 3C 00 43 00 45 </td><td class="hex_ascii">.o.n.=.".1...0.".&gt;.&lt;.C.E</td></tr>
	<tr class="hex_line"><td class="hex_address">000A38</td><td class="hex_value">00 52 00 54 00 49 00 46 00 49 00 43 00 41 00 54 00 45 00 20 00 74 00 79 </td><td class="hex_ascii">.R.T.I.F.I.C.A.T.E. .t.y</td></tr>
	<tr class="hex_line"><td class="hex_address">000A50</td><td class="hex_value">00 70 00 65 00 3D 00 22 00 44 00 45 00 56 00 49 00 43 00 45 00 22 00 3E </td><td class="hex_ascii">.p.e.=.".D.E.V.I.C.E.".&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">000A68</td><td class="hex_value">00 3C 00 44 00 41 00 54 00 41 00 3E 00 3C 00 55 00 4E 00 49 00 51 00 55 </td><td class="hex_ascii">.&lt;.D.A.T.A.&gt;.&lt;.U.N.I.Q.U</td></tr>
	<tr class="hex_line"><td class="hex_address">000A80</td><td class="hex_value">00 45 00 49 00 44 00 20 00 70 00 72 00 69 00 76 00 61 00 74 00 65 00 3D </td><td class="hex_ascii">.E.I.D. .p.r.i.v.a.t.e.=</td></tr>
	<tr class="hex_line"><td class="hex_address">000A98</td><td class="hex_value">00 22 00 31 00 22 00 3E 00 7A 00 4E 00 47 00 48 00 50 00 6F 00 2B 00 35 </td><td class="hex_ascii">.".1.".&gt;.z.N.G.H.P.o.+.5</td></tr>
	<tr class="hex_line"><td class="hex_address">000AB0</td><td class="hex_value">00 74 00 62 00 75 00 36 00 48 00 4D 00 7A 00 69 00 70 00 62 00 53 00 4E </td><td class="hex_ascii">.t.b.u.6.H.M.z.i.p.b.S.N</td></tr>
	<tr class="hex_line"><td class="hex_address">000AC8</td><td class="hex_value">00 30 00 47 00 30 00 72 00 79 00 6C 00 49 00 3D 00 3C 00 2F 00 55 00 4E </td><td class="hex_ascii">.0.G.0.r.y.l.I.=.&lt;./.U.N</td></tr>
	<tr class="hex_line"><td class="hex_address">000AE0</td><td class="hex_value">00 49 00 51 00 55 00 45 00 49 00 44 00 3E 00 3C 00 50 00 55 00 42 00 4C </td><td class="hex_ascii">.I.Q.U.E.I.D.&gt;.&lt;.P.U.B.L</td></tr>
	<tr class="hex_line"><td class="hex_address">000AF8</td><td class="hex_value">00 49 00 43 00 4B 00 45 00 59 00 20 00 70 00 72 00 69 00 76 00 61 00 74 </td><td class="hex_ascii">.I.C.K.E.Y. .p.r.i.v.a.t</td></tr>
	<tr class="hex_line"><td class="hex_address">000B10</td><td class="hex_value">00 65 00 3D 00 22 00 31 00 22 00 3E 00 38 00 37 00 52 00 51 00 74 00 62 </td><td class="hex_ascii">.e.=.".1.".&gt;.8.7.R.Q.t.b</td></tr>
	<tr class="hex_line"><td class="hex_address">000B28</td><td class="hex_value">00 67 00 79 00 42 00 6C 00 76 00 77 00 63 00 48 00 46 00 66 00 4D 00 43 </td><td class="hex_ascii">.g.y.B.l.v.w.c.H.F.f.M.C</td></tr>
	<tr class="hex_line"><td class="hex_address">000B40</td><td class="hex_value">00 75 00 70 00 62 00 59 00 52 00 6C 00 65 00 55 00 45 00 4D 00 37 00 71 </td><td class="hex_ascii">.u.p.b.Y.R.l.e.U.E.M.7.q</td></tr>
	<tr class="hex_line"><td class="hex_address">000B58</td><td class="hex_value">00 31 00 68 00 6B 00 34 00 79 00 72 00 45 00 4B 00 6B 00 42 00 61 00 75 </td><td class="hex_ascii">.1.h.k.4.y.r.E.K.k.B.a.u</td></tr>
	<tr class="hex_line"><td class="hex_address">000B70</td><td class="hex_value">00 64 00 2F 00 57 00 46 00 35 00 4D 00 41 00 6F 00 6A 00 58 00 48 00 77 </td><td class="hex_ascii">.d./.W.F.5.M.A.o.j.X.H.w</td></tr>
	<tr class="hex_line"><td class="hex_address">000B88</td><td class="hex_value">00 3D 00 3D 00 3C 00 2F 00 50 00 55 00 42 00 4C 00 49 00 43 00 4B 00 45 </td><td class="hex_ascii">.=.=.&lt;./.P.U.B.L.I.C.K.E</td></tr>
	<tr class="hex_line"><td class="hex_address">000BA0</td><td class="hex_value">00 59 00 3E 00 3C 00 4B 00 45 00 59 00 44 00 41 00 54 00 41 00 3E 00 2F </td><td class="hex_ascii">.Y.&gt;.&lt;.K.E.Y.D.A.T.A.&gt;./</td></tr>
	<tr class="hex_line"><td class="hex_address">000BB8</td><td class="hex_value">00 36 00 38 00 4C 00 54 00 6E 00 38 00 68 00 77 00 39 00 51 00 78 00 58 </td><td class="hex_ascii">.6.8.L.T.n.8.h.w.9.Q.x.X</td></tr>
	<tr class="hex_line"><td class="hex_address">000BD0</td><td class="hex_value">00 56 00 72 00 72 00 2F 00 74 00 75 00 67 00 32 00 67 00 54 00 2F 00 6A </td><td class="hex_ascii">.V.r.r./.t.u.g.2.g.T./.j</td></tr>
	<tr class="hex_line"><td class="hex_address">000BE8</td><td class="hex_value">00 56 00 59 00 3D 00 3C 00 2F 00 4B 00 45 00 59 00 44 00 41 00 54 00 41 </td><td class="hex_ascii">.V.Y.=.&lt;./.K.E.Y.D.A.T.A</td></tr>
	<tr class="hex_line"><td class="hex_address">000C00</td><td class="hex_value">00 3E 00 3C 00 2F 00 44 00 41 00 54 00 41 00 3E 00 3C 00 4D 00 53 00 44 </td><td class="hex_ascii">.&gt;.&lt;./.D.A.T.A.&gt;.&lt;.M.S.D</td></tr>
	<tr class="hex_line"><td class="hex_address">000C18</td><td class="hex_value">00 52 00 4D 00 5F 00 53 00 49 00 47 00 4E 00 41 00 54 00 55 00 52 00 45 </td><td class="hex_ascii">.R.M._.S.I.G.N.A.T.U.R.E</td></tr>
	<tr class="hex_line"><td class="hex_address">000C30</td><td class="hex_value">00 5F 00 56 00 41 00 4C 00 55 00 45 00 3E 00 52 00 49 00 30 00 38 00 78 </td><td class="hex_ascii">._.V.A.L.U.E.&gt;.R.I.0.8.x</td></tr>
	<tr class="hex_line"><td class="hex_address">000C48</td><td class="hex_value">00 4C 00 54 00 45 00 79 00 36 00 4F 00 57 00 4F 00 36 00 70 00 76 00 74 </td><td class="hex_ascii">.L.T.E.y.6.O.W.O.6.p.v.t</td></tr>
	<tr class="hex_line"><td class="hex_address">000C60</td><td class="hex_value">00 64 00 48 00 43 00 2B 00 62 00 31 00 63 00 7A 00 6A 00 31 00 39 00 61 </td><td class="hex_ascii">.d.H.C.+.b.1.c.z.j.1.9.a</td></tr>
	<tr class="hex_line"><td class="hex_address">000C78</td><td class="hex_value">00 64 00 72 00 68 00 62 00 5A 00 45 00 45 00 48 00 74 00 62 00 49 00 48 </td><td class="hex_ascii">.d.r.h.b.Z.E.E.H.t.b.I.H</td></tr>
	<tr class="hex_line"><td class="hex_address">000C90</td><td class="hex_value">00 77 00 63 00 32 00 51 00 56 00 65 00 53 00 31 00 57 00 6C 00 4F 00 42 </td><td class="hex_ascii">.w.c.2.Q.V.e.S.1.W.l.O.B</td></tr>
	<tr class="hex_line"><td class="hex_address">000CA8</td><td class="hex_value">00 67 00 3D 00 3D 00 3C 00 2F 00 4D 00 53 00 44 00 52 00 4D 00 5F 00 53 </td><td class="hex_ascii">.g.=.=.&lt;./.M.S.D.R.M._.S</td></tr>
	<tr class="hex_line"><td class="hex_address">000CC0</td><td class="hex_value">00 49 00 47 00 4E 00 41 00 54 00 55 00 52 00 45 00 5F 00 56 00 41 00 4C </td><td class="hex_ascii">.I.G.N.A.T.U.R.E._.V.A.L</td></tr>
	<tr class="hex_line"><td class="hex_address">000CD8</td><td class="hex_value">00 55 00 45 00 3E 00 3C 00 53 00 59 00 4D 00 53 00 49 00 47 00 4E 00 41 </td><td class="hex_ascii">.U.E.&gt;.&lt;.S.Y.M.S.I.G.N.A</td></tr>
	<tr class="hex_line"><td class="hex_address">000CF0</td><td class="hex_value">00 54 00 55 00 52 00 45 00 3E 00 56 00 49 00 65 00 46 00 65 00 4E 00 62 </td><td class="hex_ascii">.T.U.R.E.&gt;.V.I.e.F.e.N.b</td></tr>
	<tr class="hex_line"><td class="hex_address">000D08</td><td class="hex_value">00 59 00 34 00 34 00 6B 00 76 00 36 00 74 00 65 00 41 00 50 00 6C 00 64 </td><td class="hex_ascii">.Y.4.4.k.v.6.t.e.A.P.l.d</td></tr>
	<tr class="hex_line"><td class="hex_address">000D20</td><td class="hex_value">00 6F 00 71 00 6D 00 7A 00 35 00 4E 00 64 00 45 00 3D 00 3C 00 2F 00 53 </td><td class="hex_ascii">.o.q.m.z.5.N.d.E.=.&lt;./.S</td></tr>
	<tr class="hex_line"><td class="hex_address">000D38</td><td class="hex_value">00 59 00 4D 00 53 00 49 00 47 00 4E 00 41 00 54 00 55 00 52 00 45 00 3E </td><td class="hex_ascii">.Y.M.S.I.G.N.A.T.U.R.E.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">000D50</td><td class="hex_value">00 3C 00 2F 00 43 00 45 00 52 00 54 00 49 00 46 00 49 00 43 00 41 00 54 </td><td class="hex_ascii">.&lt;./.C.E.R.T.I.F.I.C.A.T</td></tr>
	<tr class="hex_line"><td class="hex_address">000D68</td><td class="hex_value">00 45 00 3E 00 3C 00 46 00 41 00 4C 00 4C 00 42 00 41 00 43 00 4B 00 3E </td><td class="hex_ascii">.E.&gt;.&lt;.F.A.L.L.B.A.C.K.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">000D80</td><td class="hex_value">00 3C 00 53 00 45 00 43 00 55 00 52 00 49 00 54 00 59 00 56 00 45 00 52 </td><td class="hex_ascii">.&lt;.S.E.C.U.R.I.T.Y.V.E.R</td></tr>
	<tr class="hex_line"><td class="hex_address">000D98</td><td class="hex_value">00 53 00 49 00 4F 00 4E 00 3E 00 32 00 2E 00 34 00 2E 00 31 00 30 00 38 </td><td class="hex_ascii">.S.I.O.N.&gt;.2...4...1.0.8</td></tr>
	<tr class="hex_line"><td class="hex_address">000DB0</td><td class="hex_value">00 2E 00 31 00 30 00 33 00 3C 00 2F 00 53 00 45 00 43 00 55 00 52 00 49 </td><td class="hex_ascii">...1.0.3.&lt;./.S.E.C.U.R.I</td></tr>
	<tr class="hex_line"><td class="hex_address">000DC8</td><td class="hex_value">00 54 00 59 00 56 00 45 00 52 00 53 00 49 00 4F 00 4E 00 3E 00 3C 00 43 </td><td class="hex_ascii">.T.Y.V.E.R.S.I.O.N.&gt;.&lt;.C</td></tr>
	<tr class="hex_line"><td class="hex_address">000DE0</td><td class="hex_value">00 45 00 52 00 54 00 49 00 46 00 49 00 43 00 41 00 54 00 45 00 20 00 70 </td><td class="hex_ascii">.E.R.T.I.F.I.C.A.T.E. .p</td></tr>
	<tr class="hex_line"><td class="hex_address">000DF8</td><td class="hex_value">00 72 00 69 00 76 00 61 00 74 00 65 00 3D 00 22 00 31 00 22 00 3E 00 38 </td><td class="hex_ascii">.r.i.v.a.t.e.=.".1.".&gt;.8</td></tr>
	<tr class="hex_line"><td class="hex_address">000E10</td><td class="hex_value">00 37 00 52 00 51 00 74 00 62 00 67 00 79 00 42 00 6C 00 76 00 77 00 63 </td><td class="hex_ascii">.7.R.Q.t.b.g.y.B.l.v.w.c</td></tr>
	<tr class="hex_line"><td class="hex_address">000E28</td><td class="hex_value">00 48 00 46 00 66 00 4D 00 43 00 75 00 70 00 62 00 59 00 52 00 6C 00 65 </td><td class="hex_ascii">.H.F.f.M.C.u.p.b.Y.R.l.e</td></tr>
	<tr class="hex_line"><td class="hex_address">000E40</td><td class="hex_value">00 55 00 45 00 4D 00 37 00 71 00 31 00 68 00 6B 00 34 00 79 00 72 00 45 </td><td class="hex_ascii">.U.E.M.7.q.1.h.k.4.y.r.E</td></tr>
	<tr class="hex_line"><td class="hex_address">000E58</td><td class="hex_value">00 4B 00 6B 00 42 00 61 00 75 00 64 00 2F 00 57 00 46 00 35 00 4D 00 41 </td><td class="hex_ascii">.K.k.B.a.u.d./.W.F.5.M.A</td></tr>
	<tr class="hex_line"><td class="hex_address">000E70</td><td class="hex_value">00 6F 00 6A 00 58 00 48 00 77 00 49 00 45 00 62 00 47 00 63 00 4E 00 54 </td><td class="hex_ascii">.o.j.X.H.w.I.E.b.G.c.N.T</td></tr>
	<tr class="hex_line"><td class="hex_address">000E88</td><td class="hex_value">00 61 00 78 00 77 00 65 00 4F 00 79 00 4F 00 54 00 50 00 38 00 37 00 4A </td><td class="hex_ascii">.a.x.w.e.O.y.O.T.P.8.7.J</td></tr>
	<tr class="hex_line"><td class="hex_address">000EA0</td><td class="hex_value">00 68 00 57 00 55 00 52 00 76 00 43 00 44 00 4F 00 38 00 66 00 71 00 49 </td><td class="hex_ascii">.h.W.U.R.v.C.D.O.8.f.q.I</td></tr>
	<tr class="hex_line"><td class="hex_address">000EB8</td><td class="hex_value">00 39 00 77 00 35 00 49 00 72 00 62 00 71 00 52 00 75 00 71 00 41 00 68 </td><td class="hex_ascii">.9.w.5.I.r.b.q.R.u.q.A.h</td></tr>
	<tr class="hex_line"><td class="hex_address">000ED0</td><td class="hex_value">00 43 00 37 00 4C 00 63 00 58 00 57 00 49 00 38 00 48 00 76 00 4A 00 30 </td><td class="hex_ascii">.C.7.L.c.X.W.I.8.H.v.J.0</td></tr>
	<tr class="hex_line"><td class="hex_address">000EE8</td><td class="hex_value">00 59 00 41 00 33 00 3C 00 2F 00 43 00 45 00 52 00 54 00 49 00 46 00 49 </td><td class="hex_ascii">.Y.A.3.&lt;./.C.E.R.T.I.F.I</td></tr>
	<tr class="hex_line"><td class="hex_address">000F00</td><td class="hex_value">00 43 00 41 00 54 00 45 00 3E 00 3C 00 2F 00 46 00 41 00 4C 00 4C 00 42 </td><td class="hex_ascii">.C.A.T.E.&gt;.&lt;./.F.A.L.L.B</td></tr>
	<tr class="hex_line"><td class="hex_address">000F18</td><td class="hex_value">00 41 00 43 00 4B 00 3E 00 3C 00 43 00 45 00 52 00 54 00 49 00 46 00 49 </td><td class="hex_ascii">.A.C.K.&gt;.&lt;.C.E.R.T.I.F.I</td></tr>
	<tr class="hex_line"><td class="hex_address">000F30</td><td class="hex_value">00 43 00 41 00 54 00 45 00 20 00 74 00 79 00 70 00 65 00 3D 00 22 00 47 </td><td class="hex_ascii">.C.A.T.E. .t.y.p.e.=.".G</td></tr>
	<tr class="hex_line"><td class="hex_address">000F48</td><td class="hex_value">00 52 00 4F 00 55 00 50 00 22 00 3E 00 3C 00 44 00 41 00 54 00 41 00 3E </td><td class="hex_ascii">.R.O.U.P.".&gt;.&lt;.D.A.T.A.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">000F60</td><td class="hex_value">00 3C 00 4E 00 41 00 4D 00 45 00 3E 00 5A 00 75 00 6E 00 65 00 3C 00 2F </td><td class="hex_ascii">.&lt;.N.A.M.E.&gt;.Z.u.n.e.&lt;./</td></tr>
	<tr class="hex_line"><td class="hex_address">000F78</td><td class="hex_value">00 4E 00 41 00 4D 00 45 00 3E 00 3C 00 4D 00 41 00 4E 00 55 00 46 00 41 </td><td class="hex_ascii">.N.A.M.E.&gt;.&lt;.M.A.N.U.F.A</td></tr>
	<tr class="hex_line"><td class="hex_address">000F90</td><td class="hex_value">00 43 00 54 00 55 00 52 00 45 00 52 00 3E 00 4D 00 69 00 63 00 72 00 6F </td><td class="hex_ascii">.C.T.U.R.E.R.&gt;.M.i.c.r.o</td></tr>
	<tr class="hex_line"><td class="hex_address">000FA8</td><td class="hex_value">00 73 00 6F 00 66 00 74 00 3C 00 2F 00 4D 00 41 00 4E 00 55 00 46 00 41 </td><td class="hex_ascii">.s.o.f.t.&lt;./.M.A.N.U.F.A</td></tr>
	<tr class="hex_line"><td class="hex_address">000FC0</td><td class="hex_value">00 43 00 54 00 55 00 52 00 45 00 52 00 3E 00 3C 00 4D 00 41 00 4B 00 45 </td><td class="hex_ascii">.C.T.U.R.E.R.&gt;.&lt;.M.A.K.E</td></tr>
	<tr class="hex_line"><td class="hex_address">000FD8</td><td class="hex_value">00 3E 00 5A 00 75 00 6E 00 65 00 20 00 50 00 6C 00 61 00 79 00 65 00 72 </td><td class="hex_ascii">.&gt;.Z.u.n.e. .P.l.a.y.e.r</td></tr>
	<tr class="hex_line"><td class="hex_address">000FF0</td><td class="hex_value">00 20 00 32 00 30 00 30 00 30 00 3C 00 2F 00 4D 00 41 00 4B 00 45 00 3E </td><td class="hex_ascii">. .2.0.0.0.&lt;./.M.A.K.E.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001008</td><td class="hex_value">00 3C 00 44 00 49 00 53 00 54 00 52 00 49 00 42 00 55 00 54 00 4F 00 52 </td><td class="hex_ascii">.&lt;.D.I.S.T.R.I.B.U.T.O.R</td></tr>
	<tr class="hex_line"><td class="hex_address">001020</td><td class="hex_value">00 3E 00 4D 00 69 00 63 00 72 00 6F 00 73 00 6F 00 66 00 74 00 3C 00 2F </td><td class="hex_ascii">.&gt;.M.i.c.r.o.s.o.f.t.&lt;./</td></tr>
	<tr class="hex_line"><td class="hex_address">001038</td><td class="hex_value">00 44 00 49 00 53 00 54 00 52 00 49 00 42 00 55 00 54 00 4F 00 52 00 3E </td><td class="hex_ascii">.D.I.S.T.R.I.B.U.T.O.R.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001050</td><td class="hex_value">00 3C 00 53 00 45 00 43 00 55 00 52 00 49 00 54 00 59 00 4C 00 45 00 56 </td><td class="hex_ascii">.&lt;.S.E.C.U.R.I.T.Y.L.E.V</td></tr>
	<tr class="hex_line"><td class="hex_address">001068</td><td class="hex_value">00 45 00 4C 00 3E 00 32 00 30 00 30 00 30 00 3C 00 2F 00 53 00 45 00 43 </td><td class="hex_ascii">.E.L.&gt;.2.0.0.0.&lt;./.S.E.C</td></tr>
	<tr class="hex_line"><td class="hex_address">001080</td><td class="hex_value">00 55 00 52 00 49 00 54 00 59 00 4C 00 45 00 56 00 45 00 4C 00 3E 00 3C </td><td class="hex_ascii">.U.R.I.T.Y.L.E.V.E.L.&gt;.&lt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001098</td><td class="hex_value">00 48 00 41 00 52 00 44 00 57 00 41 00 52 00 45 00 5F 00 56 00 45 00 52 </td><td class="hex_ascii">.H.A.R.D.W.A.R.E._.V.E.R</td></tr>
	<tr class="hex_line"><td class="hex_address">0010B0</td><td class="hex_value">00 5F 00 4D 00 41 00 4A 00 4F 00 52 00 3E 00 32 00 3C 00 2F 00 48 00 41 </td><td class="hex_ascii">._.M.A.J.O.R.&gt;.2.&lt;./.H.A</td></tr>
	<tr class="hex_line"><td class="hex_address">0010C8</td><td class="hex_value">00 52 00 44 00 57 00 41 00 52 00 45 00 5F 00 56 00 45 00 52 00 5F 00 4D </td><td class="hex_ascii">.R.D.W.A.R.E._.V.E.R._.M</td></tr>
	<tr class="hex_line"><td class="hex_address">0010E0</td><td class="hex_value">00 41 00 4A 00 4F 00 52 00 3E 00 3C 00 48 00 41 00 52 00 44 00 57 00 41 </td><td class="hex_ascii">.A.J.O.R.&gt;.&lt;.H.A.R.D.W.A</td></tr>
	<tr class="hex_line"><td class="hex_address">0010F8</td><td class="hex_value">00 52 00 45 00 5F 00 56 00 45 00 52 00 5F 00 4D 00 49 00 4E 00 4F 00 52 </td><td class="hex_ascii">.R.E._.V.E.R._.M.I.N.O.R</td></tr>
	<tr class="hex_line"><td class="hex_address">001110</td><td class="hex_value">00 3E 00 30 00 3C 00 2F 00 48 00 41 00 52 00 44 00 57 00 41 00 52 00 45 </td><td class="hex_ascii">.&gt;.0.&lt;./.H.A.R.D.W.A.R.E</td></tr>
	<tr class="hex_line"><td class="hex_address">001128</td><td class="hex_value">00 5F 00 56 00 45 00 52 00 5F 00 4D 00 49 00 4E 00 4F 00 52 00 3E 00 3C </td><td class="hex_ascii">._.V.E.R._.M.I.N.O.R.&gt;.&lt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001140</td><td class="hex_value">00 46 00 49 00 52 00 4D 00 57 00 41 00 52 00 45 00 5F 00 56 00 45 00 52 </td><td class="hex_ascii">.F.I.R.M.W.A.R.E._.V.E.R</td></tr>
	<tr class="hex_line"><td class="hex_address">001158</td><td class="hex_value">00 5F 00 4D 00 41 00 4A 00 4F 00 52 00 3E 00 32 00 3C 00 2F 00 46 00 49 </td><td class="hex_ascii">._.M.A.J.O.R.&gt;.2.&lt;./.F.I</td></tr>
	<tr class="hex_line"><td class="hex_address">001170</td><td class="hex_value">00 52 00 4D 00 57 00 41 00 52 00 45 00 5F 00 56 00 45 00 52 00 5F 00 4D </td><td class="hex_ascii">.R.M.W.A.R.E._.V.E.R._.M</td></tr>
	<tr class="hex_line"><td class="hex_address">001188</td><td class="hex_value">00 41 00 4A 00 4F 00 52 00 3E 00 3C 00 46 00 49 00 52 00 4D 00 57 00 41 </td><td class="hex_ascii">.A.J.O.R.&gt;.&lt;.F.I.R.M.W.A</td></tr>
	<tr class="hex_line"><td class="hex_address">0011A0</td><td class="hex_value">00 52 00 45 00 5F 00 56 00 45 00 52 00 5F 00 4D 00 49 00 4E 00 4F 00 52 </td><td class="hex_ascii">.R.E._.V.E.R._.M.I.N.O.R</td></tr>
	<tr class="hex_line"><td class="hex_address">0011B8</td><td class="hex_value">00 3E 00 30 00 3C 00 2F 00 46 00 49 00 52 00 4D 00 57 00 41 00 52 00 45 </td><td class="hex_ascii">.&gt;.0.&lt;./.F.I.R.M.W.A.R.E</td></tr>
	<tr class="hex_line"><td class="hex_address">0011D0</td><td class="hex_value">00 5F 00 56 00 45 00 52 00 5F 00 4D 00 49 00 4E 00 4F 00 52 00 3E 00 3C </td><td class="hex_ascii">._.V.E.R._.M.I.N.O.R.&gt;.&lt;</td></tr>
	<tr class="hex_line"><td class="hex_address">0011E8</td><td class="hex_value">00 46 00 45 00 41 00 54 00 55 00 52 00 45 00 53 00 3E 00 3C 00 43 00 4C </td><td class="hex_ascii">.F.E.A.T.U.R.E.S.&gt;.&lt;.C.L</td></tr>
	<tr class="hex_line"><td class="hex_address">001200</td><td class="hex_value">00 4F 00 43 00 4B 00 3E 00 32 00 3C 00 2F 00 43 00 4C 00 4F 00 43 00 4B </td><td class="hex_ascii">.O.C.K.&gt;.2.&lt;./.C.L.O.C.K</td></tr>
	<tr class="hex_line"><td class="hex_address">001218</td><td class="hex_value">00 3E 00 3C 00 53 00 45 00 43 00 55 00 52 00 45 00 43 00 4C 00 4F 00 43 </td><td class="hex_ascii">.&gt;.&lt;.S.E.C.U.R.E.C.L.O.C</td></tr>
	<tr class="hex_line"><td class="hex_address">001230</td><td class="hex_value">00 4B 00 3E 00 3C 00 55 00 52 00 4C 00 3E 00 68 00 74 00 74 00 70 00 3A </td><td class="hex_ascii">.K.&gt;.&lt;.U.R.L.&gt;.h.t.t.p.:</td></tr>
	<tr class="hex_line"><td class="hex_address">001248</td><td class="hex_value">00 2F 00 2F 00 67 00 6F 00 2E 00 6D 00 69 00 63 00 72 00 6F 00 73 00 6F </td><td class="hex_ascii">././.g.o...m.i.c.r.o.s.o</td></tr>
	<tr class="hex_line"><td class="hex_address">001260</td><td class="hex_value">00 66 00 74 00 2E 00 63 00 6F 00 6D 00 2F 00 66 00 77 00 6C 00 69 00 6E </td><td class="hex_ascii">.f.t...c.o.m./.f.w.l.i.n</td></tr>
	<tr class="hex_line"><td class="hex_address">001278</td><td class="hex_value">00 6B 00 2F 00 3F 00 4C 00 69 00 6E 00 6B 00 49 00 64 00 3D 00 32 00 35 </td><td class="hex_ascii">.k./.?.L.i.n.k.I.d.=.2.5</td></tr>
	<tr class="hex_line"><td class="hex_address">001290</td><td class="hex_value">00 38 00 31 00 37 00 3C 00 2F 00 55 00 52 00 4C 00 3E 00 3C 00 50 00 55 </td><td class="hex_ascii">.8.1.7.&lt;./.U.R.L.&gt;.&lt;.P.U</td></tr>
	<tr class="hex_line"><td class="hex_address">0012A8</td><td class="hex_value">00 42 00 4C 00 49 00 43 00 4B 00 45 00 59 00 3E 00 21 00 43 00 4E 00 68 </td><td class="hex_ascii">.B.L.I.C.K.E.Y.&gt;.!.C.N.h</td></tr>
	<tr class="hex_line"><td class="hex_address">0012C0</td><td class="hex_value">00 76 00 76 00 7A 00 31 00 57 00 61 00 4E 00 56 00 31 00 41 00 46 00 55 </td><td class="hex_ascii">.v.v.z.1.W.a.N.V.1.A.F.U</td></tr>
	<tr class="hex_line"><td class="hex_address">0012D8</td><td class="hex_value">00 6D 00 65 00 74 00 78 00 6B 00 76 00 6D 00 39 00 69 00 44 00 34 00 55 </td><td class="hex_ascii">.m.e.t.x.k.v.m.9.i.D.4.U</td></tr>
	<tr class="hex_line"><td class="hex_address">0012F0</td><td class="hex_value">00 72 00 45 00 39 00 63 00 6E 00 47 00 55 00 69 00 21 00 71 00 63 00 71 </td><td class="hex_ascii">.r.E.9.c.n.G.U.i.!.q.c.q</td></tr>
	<tr class="hex_line"><td class="hex_address">001308</td><td class="hex_value">00 64 00 78 00 4D 00 69 00 58 00 6D 00 44 00 31 00 2A 00 69 00 6B 00 59 </td><td class="hex_ascii">.d.x.M.i.X.m.D.1.*.i.k.Y</td></tr>
	<tr class="hex_line"><td class="hex_address">001320</td><td class="hex_value">00 47 00 41 00 3D 00 3D 00 3C 00 2F 00 50 00 55 00 42 00 4C 00 49 00 43 </td><td class="hex_ascii">.G.A.=.=.&lt;./.P.U.B.L.I.C</td></tr>
	<tr class="hex_line"><td class="hex_address">001338</td><td class="hex_value">00 4B 00 45 00 59 00 3E 00 3C 00 2F 00 53 00 45 00 43 00 55 00 52 00 45 </td><td class="hex_ascii">.K.E.Y.&gt;.&lt;./.S.E.C.U.R.E</td></tr>
	<tr class="hex_line"><td class="hex_address">001350</td><td class="hex_value">00 43 00 4C 00 4F 00 43 00 4B 00 3E 00 3C 00 4D 00 45 00 54 00 45 00 52 </td><td class="hex_ascii">.C.L.O.C.K.&gt;.&lt;.M.E.T.E.R</td></tr>
	<tr class="hex_line"><td class="hex_address">001368</td><td class="hex_value">00 49 00 4E 00 47 00 3E 00 31 00 3C 00 2F 00 4D 00 45 00 54 00 45 00 52 </td><td class="hex_ascii">.I.N.G.&gt;.1.&lt;./.M.E.T.E.R</td></tr>
	<tr class="hex_line"><td class="hex_address">001380</td><td class="hex_value">00 49 00 4E 00 47 00 3E 00 3C 00 4C 00 49 00 43 00 45 00 4E 00 53 00 45 </td><td class="hex_ascii">.I.N.G.&gt;.&lt;.L.I.C.E.N.S.E</td></tr>
	<tr class="hex_line"><td class="hex_address">001398</td><td class="hex_value">00 5F 00 41 00 43 00 51 00 3E 00 30 00 3C 00 2F 00 4C 00 49 00 43 00 45 </td><td class="hex_ascii">._.A.C.Q.&gt;.0.&lt;./.L.I.C.E</td></tr>
	<tr class="hex_line"><td class="hex_address">0013B0</td><td class="hex_value">00 4E 00 53 00 45 00 5F 00 41 00 43 00 51 00 3E 00 3C 00 4C 00 49 00 43 </td><td class="hex_ascii">.N.S.E._.A.C.Q.&gt;.&lt;.L.I.C</td></tr>
	<tr class="hex_line"><td class="hex_address">0013C8</td><td class="hex_value">00 45 00 4E 00 53 00 45 00 5F 00 53 00 59 00 4E 00 43 00 3E 00 31 00 3C </td><td class="hex_ascii">.E.N.S.E._.S.Y.N.C.&gt;.1.&lt;</td></tr>
	<tr class="hex_line"><td class="hex_address">0013E0</td><td class="hex_value">00 2F 00 4C 00 49 00 43 00 45 00 4E 00 53 00 45 00 5F 00 53 00 59 00 4E </td><td class="hex_ascii">./.L.I.C.E.N.S.E._.S.Y.N</td></tr>
	<tr class="hex_line"><td class="hex_address">0013F8</td><td class="hex_value">00 43 00 3E 00 3C 00 45 00 4E 00 43 00 52 00 59 00 50 00 54 00 49 00 4F </td><td class="hex_ascii">.C.&gt;.&lt;.E.N.C.R.Y.P.T.I.O</td></tr>
	<tr class="hex_line"><td class="hex_address">001410</td><td class="hex_value">00 4E 00 3E 00 30 00 3C 00 2F 00 45 00 4E 00 43 00 52 00 59 00 50 00 54 </td><td class="hex_ascii">.N.&gt;.0.&lt;./.E.N.C.R.Y.P.T</td></tr>
	<tr class="hex_line"><td class="hex_address">001428</td><td class="hex_value">00 49 00 4F 00 4E 00 3E 00 3C 00 53 00 59 00 4D 00 4D 00 45 00 54 00 52 </td><td class="hex_ascii">.I.O.N.&gt;.&lt;.S.Y.M.M.E.T.R</td></tr>
	<tr class="hex_line"><td class="hex_address">001440</td><td class="hex_value">00 49 00 43 00 5F 00 4F 00 50 00 54 00 3E 00 31 00 3C 00 2F 00 53 00 59 </td><td class="hex_ascii">.I.C._.O.P.T.&gt;.1.&lt;./.S.Y</td></tr>
	<tr class="hex_line"><td class="hex_address">001458</td><td class="hex_value">00 4D 00 4D 00 45 00 54 00 52 00 49 00 43 00 5F 00 4F 00 50 00 54 00 3E </td><td class="hex_ascii">.M.M.E.T.R.I.C._.O.P.T.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001470</td><td class="hex_value">00 3C 00 53 00 55 00 50 00 50 00 4F 00 52 00 54 00 5F 00 52 00 45 00 56 </td><td class="hex_ascii">.&lt;.S.U.P.P.O.R.T._.R.E.V</td></tr>
	<tr class="hex_line"><td class="hex_address">001488</td><td class="hex_value">00 4F 00 43 00 41 00 54 00 49 00 4F 00 4E 00 3E 00 3C 00 47 00 55 00 49 </td><td class="hex_ascii">.O.C.A.T.I.O.N.&gt;.&lt;.G.U.I</td></tr>
	<tr class="hex_line"><td class="hex_address">0014A0</td><td class="hex_value">00 44 00 3E 00 7B 00 43 00 44 00 37 00 35 00 45 00 36 00 30 00 34 00 2D </td><td class="hex_ascii">.D.&gt;.{.C.D.7.5.E.6.0.4.-</td></tr>
	<tr class="hex_line"><td class="hex_address">0014B8</td><td class="hex_value">00 35 00 34 00 33 00 44 00 2D 00 34 00 41 00 39 00 43 00 2D 00 39 00 46 </td><td class="hex_ascii">.5.4.3.D.-.4.A.9.C.-.9.F</td></tr>
	<tr class="hex_line"><td class="hex_address">0014D0</td><td class="hex_value">00 30 00 39 00 2D 00 46 00 45 00 36 00 44 00 32 00 34 00 45 00 38 00 42 </td><td class="hex_ascii">.0.9.-.F.E.6.D.2.4.E.8.B</td></tr>
	<tr class="hex_line"><td class="hex_address">0014E8</td><td class="hex_value">00 46 00 39 00 30 00 7D 00 3C 00 2F 00 47 00 55 00 49 00 44 00 3E 00 3C </td><td class="hex_ascii">.F.9.0.}.&lt;./.G.U.I.D.&gt;.&lt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001500</td><td class="hex_value">00 47 00 55 00 49 00 44 00 3E 00 7B 00 33 00 31 00 32 00 39 00 45 00 33 </td><td class="hex_ascii">.G.U.I.D.&gt;.{.3.1.2.9.E.3</td></tr>
	<tr class="hex_line"><td class="hex_address">001518</td><td class="hex_value">00 37 00 35 00 2D 00 43 00 45 00 42 00 30 00 2D 00 34 00 37 00 44 00 35 </td><td class="hex_ascii">.7.5.-.C.E.B.0.-.4.7.D.5</td></tr>
	<tr class="hex_line"><td class="hex_address">001530</td><td class="hex_value">00 2D 00 39 00 43 00 43 00 41 00 2D 00 39 00 44 00 42 00 37 00 34 00 43 </td><td class="hex_ascii">.-.9.C.C.A.-.9.D.B.7.4.C</td></tr>
	<tr class="hex_line"><td class="hex_address">001548</td><td class="hex_value">00 46 00 44 00 34 00 33 00 33 00 32 00 7D 00 3C 00 2F 00 47 00 55 00 49 </td><td class="hex_ascii">.F.D.4.3.3.2.}.&lt;./.G.U.I</td></tr>
	<tr class="hex_line"><td class="hex_address">001560</td><td class="hex_value">00 44 00 3E 00 3C 00 2F 00 53 00 55 00 50 00 50 00 4F 00 52 00 54 00 5F </td><td class="hex_ascii">.D.&gt;.&lt;./.S.U.P.P.O.R.T._</td></tr>
	<tr class="hex_line"><td class="hex_address">001578</td><td class="hex_value">00 52 00 45 00 56 00 4F 00 43 00 41 00 54 00 49 00 4F 00 4E 00 3E 00 3C </td><td class="hex_ascii">.R.E.V.O.C.A.T.I.O.N.&gt;.&lt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001590</td><td class="hex_value">00 2F 00 46 00 45 00 41 00 54 00 55 00 52 00 45 00 53 00 3E 00 3C 00 4C </td><td class="hex_ascii">./.F.E.A.T.U.R.E.S.&gt;.&lt;.L</td></tr>
	<tr class="hex_line"><td class="hex_address">0015A8</td><td class="hex_value">00 49 00 4D 00 49 00 54 00 53 00 3E 00 3C 00 4D 00 41 00 58 00 43 00 48 </td><td class="hex_ascii">.I.M.I.T.S.&gt;.&lt;.M.A.X.C.H</td></tr>
	<tr class="hex_line"><td class="hex_address">0015C0</td><td class="hex_value">00 41 00 49 00 4E 00 44 00 45 00 50 00 54 00 48 00 3E 00 32 00 3C 00 2F </td><td class="hex_ascii">.A.I.N.D.E.P.T.H.&gt;.2.&lt;./</td></tr>
	<tr class="hex_line"><td class="hex_address">0015D8</td><td class="hex_value">00 4D 00 41 00 58 00 43 00 48 00 41 00 49 00 4E 00 44 00 45 00 50 00 54 </td><td class="hex_ascii">.M.A.X.C.H.A.I.N.D.E.P.T</td></tr>
	<tr class="hex_line"><td class="hex_address">0015F0</td><td class="hex_value">00 48 00 3E 00 3C 00 4D 00 41 00 58 00 4C 00 49 00 43 00 45 00 4E 00 53 </td><td class="hex_ascii">.H.&gt;.&lt;.M.A.X.L.I.C.E.N.S</td></tr>
	<tr class="hex_line"><td class="hex_address">001608</td><td class="hex_value">00 45 00 53 00 49 00 5A 00 45 00 3E 00 31 00 30 00 32 00 34 00 30 00 3C </td><td class="hex_ascii">.E.S.I.Z.E.&gt;.1.0.2.4.0.&lt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001620</td><td class="hex_value">00 2F 00 4D 00 41 00 58 00 4C 00 49 00 43 00 45 00 4E 00 53 00 45 00 53 </td><td class="hex_ascii">./.M.A.X.L.I.C.E.N.S.E.S</td></tr>
	<tr class="hex_line"><td class="hex_address">001638</td><td class="hex_value">00 49 00 5A 00 45 00 3E 00 3C 00 4D 00 41 00 58 00 48 00 45 00 41 00 44 </td><td class="hex_ascii">.I.Z.E.&gt;.&lt;.M.A.X.H.E.A.D</td></tr>
	<tr class="hex_line"><td class="hex_address">001650</td><td class="hex_value">00 45 00 52 00 53 00 49 00 5A 00 45 00 3E 00 35 00 31 00 32 00 30 00 3C </td><td class="hex_ascii">.E.R.S.I.Z.E.&gt;.5.1.2.0.&lt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001668</td><td class="hex_value">00 2F 00 4D 00 41 00 58 00 48 00 45 00 41 00 44 00 45 00 52 00 53 00 49 </td><td class="hex_ascii">./.M.A.X.H.E.A.D.E.R.S.I</td></tr>
	<tr class="hex_line"><td class="hex_address">001680</td><td class="hex_value">00 5A 00 45 00 3E 00 3C 00 2F 00 4C 00 49 00 4D 00 49 00 54 00 53 00 3E </td><td class="hex_ascii">.Z.E.&gt;.&lt;./.L.I.M.I.T.S.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001698</td><td class="hex_value">00 3C 00 50 00 55 00 42 00 4C 00 49 00 43 00 4B 00 45 00 59 00 3E 00 4C </td><td class="hex_ascii">.&lt;.P.U.B.L.I.C.K.E.Y.&gt;.L</td></tr>
	<tr class="hex_line"><td class="hex_address">0016B0</td><td class="hex_value">00 6A 00 57 00 4C 00 67 00 65 00 69 00 66 00 2B 00 55 00 65 00 34 00 2F </td><td class="hex_ascii">.j.W.L.g.e.i.f.+.U.e.4./</td></tr>
	<tr class="hex_line"><td class="hex_address">0016C8</td><td class="hex_value">00 30 00 36 00 61 00 49 00 50 00 65 00 54 00 56 00 54 00 4B 00 38 00 65 </td><td class="hex_ascii">.0.6.a.I.P.e.T.V.T.K.8.e</td></tr>
	<tr class="hex_line"><td class="hex_address">0016E0</td><td class="hex_value">00 33 00 74 00 74 00 61 00 71 00 43 00 67 00 34 00 79 00 4E 00 61 00 62 </td><td class="hex_ascii">.3.t.t.a.q.C.g.4.y.N.a.b</td></tr>
	<tr class="hex_line"><td class="hex_address">0016F8</td><td class="hex_value">00 66 00 6F 00 78 00 51 00 71 00 49 00 58 00 2B 00 32 00 56 00 76 00 39 </td><td class="hex_ascii">.f.o.x.Q.q.I.X.+.2.V.v.9</td></tr>
	<tr class="hex_line"><td class="hex_address">001710</td><td class="hex_value">00 54 00 53 00 33 00 62 00 67 00 3D 00 3D 00 3C 00 2F 00 50 00 55 00 42 </td><td class="hex_ascii">.T.S.3.b.g.=.=.&lt;./.P.U.B</td></tr>
	<tr class="hex_line"><td class="hex_address">001728</td><td class="hex_value">00 4C 00 49 00 43 00 4B 00 45 00 59 00 3E 00 3C 00 2F 00 44 00 41 00 54 </td><td class="hex_ascii">.L.I.C.K.E.Y.&gt;.&lt;./.D.A.T</td></tr>
	<tr class="hex_line"><td class="hex_address">001740</td><td class="hex_value">00 41 00 3E 00 3C 00 4D 00 53 00 44 00 52 00 4D 00 5F 00 53 00 49 00 47 </td><td class="hex_ascii">.A.&gt;.&lt;.M.S.D.R.M._.S.I.G</td></tr>
	<tr class="hex_line"><td class="hex_address">001758</td><td class="hex_value">00 4E 00 41 00 54 00 55 00 52 00 45 00 5F 00 56 00 41 00 4C 00 55 00 45 </td><td class="hex_ascii">.N.A.T.U.R.E._.V.A.L.U.E</td></tr>
	<tr class="hex_line"><td class="hex_address">001770</td><td class="hex_value">00 3E 00 6A 00 76 00 73 00 4C 00 57 00 79 00 47 00 4F 00 4F 00 67 00 69 </td><td class="hex_ascii">.&gt;.j.v.s.L.W.y.G.O.O.g.i</td></tr>
	<tr class="hex_line"><td class="hex_address">001788</td><td class="hex_value">00 65 00 47 00 33 00 6C 00 4C 00 43 00 32 00 77 00 75 00 64 00 5A 00 4F </td><td class="hex_ascii">.e.G.3.l.L.C.2.w.u.d.Z.O</td></tr>
	<tr class="hex_line"><td class="hex_address">0017A0</td><td class="hex_value">00 78 00 59 00 77 00 32 00 54 00 2B 00 47 00 32 00 77 00 6F 00 36 00 55 </td><td class="hex_ascii">.x.Y.w.2.T.+.G.2.w.o.6.U</td></tr>
	<tr class="hex_line"><td class="hex_address">0017B8</td><td class="hex_value">00 66 00 71 00 32 00 54 00 4B 00 6F 00 54 00 2B 00 32 00 69 00 52 00 6F </td><td class="hex_ascii">.f.q.2.T.K.o.T.+.2.i.R.o</td></tr>
	<tr class="hex_line"><td class="hex_address">0017D0</td><td class="hex_value">00 35 00 44 00 61 00 58 00 7A 00 67 00 77 00 3D 00 3D 00 3C 00 2F 00 4D </td><td class="hex_ascii">.5.D.a.X.z.g.w.=.=.&lt;./.M</td></tr>
	<tr class="hex_line"><td class="hex_address">0017E8</td><td class="hex_value">00 53 00 44 00 52 00 4D 00 5F 00 53 00 49 00 47 00 4E 00 41 00 54 00 55 </td><td class="hex_ascii">.S.D.R.M._.S.I.G.N.A.T.U</td></tr>
	<tr class="hex_line"><td class="hex_address">001800</td><td class="hex_value">00 52 00 45 00 5F 00 56 00 41 00 4C 00 55 00 45 00 3E 00 3C 00 2F 00 43 </td><td class="hex_ascii">.R.E._.V.A.L.U.E.&gt;.&lt;./.C</td></tr>
	<tr class="hex_line"><td class="hex_address">001818</td><td class="hex_value">00 45 00 52 00 54 00 49 00 46 00 49 00 43 00 41 00 54 00 45 00 3E 00 3C </td><td class="hex_ascii">.E.R.T.I.F.I.C.A.T.E.&gt;.&lt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001830</td><td class="hex_value">00 43 00 45 00 52 00 54 00 49 00 46 00 49 00 43 00 41 00 54 00 45 00 20 </td><td class="hex_ascii">.C.E.R.T.I.F.I.C.A.T.E. </td></tr>
	<tr class="hex_line"><td class="hex_address">001848</td><td class="hex_value">00 74 00 79 00 70 00 65 00 3D 00 22 00 41 00 55 00 54 00 48 00 4F 00 52 </td><td class="hex_ascii">.t.y.p.e.=.".A.U.T.H.O.R</td></tr>
	<tr class="hex_line"><td class="hex_address">001860</td><td class="hex_value">00 49 00 5A 00 41 00 54 00 49 00 4F 00 4E 00 22 00 3E 00 3C 00 44 00 41 </td><td class="hex_ascii">.I.Z.A.T.I.O.N.".&gt;.&lt;.D.A</td></tr>
	<tr class="hex_line"><td class="hex_address">001878</td><td class="hex_value">00 54 00 41 00 3E 00 3C 00 53 00 45 00 43 00 55 00 52 00 49 00 54 00 59 </td><td class="hex_ascii">.T.A.&gt;.&lt;.S.E.C.U.R.I.T.Y</td></tr>
	<tr class="hex_line"><td class="hex_address">001890</td><td class="hex_value">00 4C 00 45 00 56 00 45 00 4C 00 3E 00 32 00 30 00 30 00 30 00 3C 00 2F </td><td class="hex_ascii">.L.E.V.E.L.&gt;.2.0.0.0.&lt;./</td></tr>
	<tr class="hex_line"><td class="hex_address">0018A8</td><td class="hex_value">00 53 00 45 00 43 00 55 00 52 00 49 00 54 00 59 00 4C 00 45 00 56 00 45 </td><td class="hex_ascii">.S.E.C.U.R.I.T.Y.L.E.V.E</td></tr>
	<tr class="hex_line"><td class="hex_address">0018C0</td><td class="hex_value">00 4C 00 3E 00 3C 00 41 00 55 00 54 00 48 00 5F 00 49 00 44 00 3E 00 31 </td><td class="hex_ascii">.L.&gt;.&lt;.A.U.T.H._.I.D.&gt;.1</td></tr>
	<tr class="hex_line"><td class="hex_address">0018D8</td><td class="hex_value">00 39 00 39 00 35 00 3C 00 2F 00 41 00 55 00 54 00 48 00 5F 00 49 00 44 </td><td class="hex_ascii">.9.9.5.&lt;./.A.U.T.H._.I.D</td></tr>
	<tr class="hex_line"><td class="hex_address">0018F0</td><td class="hex_value">00 3E 00 3C 00 50 00 55 00 42 00 4C 00 49 00 43 00 4B 00 45 00 59 00 3E </td><td class="hex_ascii">.&gt;.&lt;.P.U.B.L.I.C.K.E.Y.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001908</td><td class="hex_value">00 34 00 2B 00 4F 00 62 00 41 00 74 00 78 00 30 00 76 00 70 00 4A 00 4D </td><td class="hex_ascii">.4.+.O.b.A.t.x.0.v.p.J.M</td></tr>
	<tr class="hex_line"><td class="hex_address">001920</td><td class="hex_value">00 79 00 33 00 44 00 6D 00 51 00 64 00 2B 00 55 00 58 00 77 00 53 00 61 </td><td class="hex_ascii">.y.3.D.m.Q.d.+.U.X.w.S.a</td></tr>
	<tr class="hex_line"><td class="hex_address">001938</td><td class="hex_value">00 61 00 69 00 46 00 36 00 69 00 79 00 65 00 72 00 65 00 34 00 57 00 6C </td><td class="hex_ascii">.a.i.F.6.i.y.e.r.e.4.W.l</td></tr>
	<tr class="hex_line"><td class="hex_address">001950</td><td class="hex_value">00 4F 00 39 00 2F 00 49 00 69 00 6C 00 36 00 34 00 72 00 30 00 38 00 45 </td><td class="hex_ascii">.O.9./.I.i.l.6.4.r.0.8.E</td></tr>
	<tr class="hex_line"><td class="hex_address">001968</td><td class="hex_value">00 32 00 64 00 35 00 61 00 64 00 51 00 3D 00 3D 00 3C 00 2F 00 50 00 55 </td><td class="hex_ascii">.2.d.5.a.d.Q.=.=.&lt;./.P.U</td></tr>
	<tr class="hex_line"><td class="hex_address">001980</td><td class="hex_value">00 42 00 4C 00 49 00 43 00 4B 00 45 00 59 00 3E 00 3C 00 2F 00 44 00 41 </td><td class="hex_ascii">.B.L.I.C.K.E.Y.&gt;.&lt;./.D.A</td></tr>
	<tr class="hex_line"><td class="hex_address">001998</td><td class="hex_value">00 54 00 41 00 3E 00 3C 00 4D 00 53 00 44 00 52 00 4D 00 5F 00 53 00 49 </td><td class="hex_ascii">.T.A.&gt;.&lt;.M.S.D.R.M._.S.I</td></tr>
	<tr class="hex_line"><td class="hex_address">0019B0</td><td class="hex_value">00 47 00 4E 00 41 00 54 00 55 00 52 00 45 00 5F 00 56 00 41 00 4C 00 55 </td><td class="hex_ascii">.G.N.A.T.U.R.E._.V.A.L.U</td></tr>
	<tr class="hex_line"><td class="hex_address">0019C8</td><td class="hex_value">00 45 00 3E 00 50 00 75 00 79 00 58 00 44 00 65 00 4C 00 4D 00 4F 00 6D </td><td class="hex_ascii">.E.&gt;.P.u.y.X.D.e.L.M.O.m</td></tr>
	<tr class="hex_line"><td class="hex_address">0019E0</td><td class="hex_value">00 54 00 41 00 32 00 62 00 6D 00 61 00 4D 00 42 00 66 00 46 00 4E 00 61 </td><td class="hex_ascii">.T.A.2.b.m.a.M.B.f.F.N.a</td></tr>
	<tr class="hex_line"><td class="hex_address">0019F8</td><td class="hex_value">00 61 00 48 00 75 00 6C 00 7A 00 5A 00 6F 00 74 00 6A 00 59 00 7A 00 63 </td><td class="hex_ascii">.a.H.u.l.z.Z.o.t.j.Y.z.c</td></tr>
	<tr class="hex_line"><td class="hex_address">001A10</td><td class="hex_value">00 51 00 50 00 59 00 4C 00 68 00 50 00 43 00 6D 00 2F 00 63 00 74 00 57 </td><td class="hex_ascii">.Q.P.Y.L.h.P.C.m./.c.t.W</td></tr>
	<tr class="hex_line"><td class="hex_address">001A28</td><td class="hex_value">00 71 00 57 00 77 00 45 00 64 00 36 00 4E 00 67 00 3D 00 3D 00 3C 00 2F </td><td class="hex_ascii">.q.W.w.E.d.6.N.g.=.=.&lt;./</td></tr>
	<tr class="hex_line"><td class="hex_address">001A40</td><td class="hex_value">00 4D 00 53 00 44 00 52 00 4D 00 5F 00 53 00 49 00 47 00 4E 00 41 00 54 </td><td class="hex_ascii">.M.S.D.R.M._.S.I.G.N.A.T</td></tr>
	<tr class="hex_line"><td class="hex_address">001A58</td><td class="hex_value">00 55 00 52 00 45 00 5F 00 56 00 41 00 4C 00 55 00 45 00 3E 00 3C 00 2F </td><td class="hex_ascii">.U.R.E._.V.A.L.U.E.&gt;.&lt;./</td></tr>
	<tr class="hex_line"><td class="hex_address">001A70</td><td class="hex_value">00 43 00 45 00 52 00 54 00 49 00 46 00 49 00 43 00 41 00 54 00 45 00 3E </td><td class="hex_ascii">.C.E.R.T.I.F.I.C.A.T.E.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001A88</td><td class="hex_value">00 3C 00 43 00 45 00 52 00 54 00 49 00 46 00 49 00 43 00 41 00 54 00 45 </td><td class="hex_ascii">.&lt;.C.E.R.T.I.F.I.C.A.T.E</td></tr>
	<tr class="hex_line"><td class="hex_address">001AA0</td><td class="hex_value">00 20 00 74 00 79 00 70 00 65 00 3D 00 22 00 41 00 55 00 54 00 48 00 4F </td><td class="hex_ascii">. .t.y.p.e.=.".A.U.T.H.O</td></tr>
	<tr class="hex_line"><td class="hex_address">001AB8</td><td class="hex_value">00 52 00 49 00 5A 00 41 00 54 00 49 00 4F 00 4E 00 5F 00 52 00 4F 00 4F </td><td class="hex_ascii">.R.I.Z.A.T.I.O.N._.R.O.O</td></tr>
	<tr class="hex_line"><td class="hex_address">001AD0</td><td class="hex_value">00 54 00 22 00 3E 00 3C 00 44 00 41 00 54 00 41 00 3E 00 3C 00 41 00 55 </td><td class="hex_ascii">.T.".&gt;.&lt;.D.A.T.A.&gt;.&lt;.A.U</td></tr>
	<tr class="hex_line"><td class="hex_address">001AE8</td><td class="hex_value">00 54 00 48 00 5F 00 49 00 44 00 3E 00 31 00 3C 00 2F 00 41 00 55 00 54 </td><td class="hex_ascii">.T.H._.I.D.&gt;.1.&lt;./.A.U.T</td></tr>
	<tr class="hex_line"><td class="hex_address">001B00</td><td class="hex_value">00 48 00 5F 00 49 00 44 00 3E 00 3C 00 50 00 55 00 42 00 4C 00 49 00 43 </td><td class="hex_ascii">.H._.I.D.&gt;.&lt;.P.U.B.L.I.C</td></tr>
	<tr class="hex_line"><td class="hex_address">001B18</td><td class="hex_value">00 4B 00 45 00 59 00 3E 00 61 00 31 00 74 00 33 00 68 00 78 00 72 00 67 </td><td class="hex_ascii">.K.E.Y.&gt;.a.1.t.3.h.x.r.g</td></tr>
	<tr class="hex_line"><td class="hex_address">001B30</td><td class="hex_value">00 21 00 71 00 62 00 4F 00 67 00 6B 00 74 00 6E 00 62 00 59 00 61 00 45 </td><td class="hex_ascii">.!.q.b.O.g.k.t.n.b.Y.a.E</td></tr>
	<tr class="hex_line"><td class="hex_address">001B48</td><td class="hex_value">00 45 00 69 00 34 00 74 00 65 00 43 00 73 00 65 00 21 00 67 00 7A 00 36 </td><td class="hex_ascii">.E.i.4.t.e.C.s.e.!.g.z.6</td></tr>
	<tr class="hex_line"><td class="hex_address">001B60</td><td class="hex_value">00 52 00 76 00 54 00 50 00 75 00 43 00 21 00 7A 00 69 00 7A 00 4B 00 4A </td><td class="hex_ascii">.R.v.T.P.u.C.!.z.i.z.K.J</td></tr>
	<tr class="hex_line"><td class="hex_address">001B78</td><td class="hex_value">00 6C 00 70 00 55 00 37 00 78 00 6F 00 64 00 75 00 53 00 77 00 3D 00 3D </td><td class="hex_ascii">.l.p.U.7.x.o.d.u.S.w.=.=</td></tr>
	<tr class="hex_line"><td class="hex_address">001B90</td><td class="hex_value">00 3C 00 2F 00 50 00 55 00 42 00 4C 00 49 00 43 00 4B 00 45 00 59 00 3E </td><td class="hex_ascii">.&lt;./.P.U.B.L.I.C.K.E.Y.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">001BA8</td><td class="hex_value">00 3C 00 2F 00 44 00 41 00 54 00 41 00 3E 00 3C 00 4D 00 53 00 44 00 52 </td><td class="hex_ascii">.&lt;./.D.A.T.A.&gt;.&lt;.M.S.D.R</td></tr>
	<tr class="hex_line"><td class="hex_address">001BC0</td><td class="hex_value">00 4D 00 5F 00 53 00 49 00 47 00 4E 00 41 00 54 00 55 00 52 00 45 00 5F </td><td class="hex_ascii">.M._.S.I.G.N.A.T.U.R.E._</td></tr>
	<tr class="hex_line"><td class="hex_address">001BD8</td><td class="hex_value">00 56 00 41 00 4C 00 55 00 45 00 3E 00 64 00 45 00 66 00 64 00 73 00 62 </td><td class="hex_ascii">.V.A.L.U.E.&gt;.d.E.f.d.s.b</td></tr>
	<tr class="hex_line"><td class="hex_address">001BF0</td><td class="hex_value">00 7A 00 45 00 4C 00 44 00 55 00 70 00 74 00 54 00 44 00 6F 00 55 00 4E </td><td class="hex_ascii">.z.E.L.D.U.p.t.T.D.o.U.N</td></tr>
	<tr class="hex_line"><td class="hex_address">001C08</td><td class="hex_value">00 59 00 43 00 59 00 75 00 57 00 57 00 48 00 6C 00 36 00 7A 00 45 00 66 </td><td class="hex_ascii">.Y.C.Y.u.W.W.H.l.6.z.E.f</td></tr>
	<tr class="hex_line"><td class="hex_address">001C20</td><td class="hex_value">00 5A 00 33 00 51 00 57 00 2B 00 4A 00 64 00 4A 00 41 00 32 00 46 00 48 </td><td class="hex_ascii">.Z.3.Q.W.+.J.d.J.A.2.F.H</td></tr>
	<tr class="hex_line"><td class="hex_address">001C38</td><td class="hex_value">00 39 00 4F 00 37 00 42 00 64 00 42 00 34 00 63 00 46 00 55 00 63 00 51 </td><td class="hex_ascii">.9.O.7.B.d.B.4.c.F.U.c.Q</td></tr>
	<tr class="hex_line"><td class="hex_address">001C50</td><td class="hex_value">00 3D 00 3D 00 3C 00 2F 00 4D 00 53 00 44 00 52 00 4D 00 5F 00 53 00 49 </td><td class="hex_ascii">.=.=.&lt;./.M.S.D.R.M._.S.I</td></tr>
	<tr class="hex_line"><td class="hex_address">001C68</td><td class="hex_value">00 47 00 4E 00 41 00 54 00 55 00 52 00 45 00 5F 00 56 00 41 00 4C 00 55 </td><td class="hex_ascii">.G.N.A.T.U.R.E._.V.A.L.U</td></tr>
	<tr class="hex_line"><td class="hex_address">001C80</td><td class="hex_value">00 45 00 3E 00 3C 00 2F 00 43 00 45 00 52 00 54 00 49 00 46 00 49 00 43 </td><td class="hex_ascii">.E.&gt;.&lt;./.C.E.R.T.I.F.I.C</td></tr>
	<tr class="hex_line"><td class="hex_address">001C98</td><td class="hex_value">00 41 00 54 00 45 00 3E 00 3C 00 2F 00 44 00 45 00 56 00 43 00 45 00 52 </td><td class="hex_ascii">.A.T.E.&gt;.&lt;./.D.E.V.C.E.R</td></tr>
	<tr class="hex_line"><td class="hex_address">001CB0</td><td class="hex_value">00 54 00 3E 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">.T.&gt;....................</td></tr>
	<tr class="hex_line"><td class="hex_address">001CC8</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001CE0</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001CF8</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001D10</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001D28</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001D40</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001D58</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001D70</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001D88</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001DA0</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001DB8</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001DD0</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001DE8</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001E00</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001E18</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001E30</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001E48</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001E60</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001E78</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001E90</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001EA8</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001EC0</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001ED8</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001EF0</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001F08</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001F20</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001F38</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001F50</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001F68</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001F80</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001F98</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001FB0</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001FC8</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001FE0</td><td class="hex_value">00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0C </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">001FF8</td><td class="hex_value">00 00 00 03 00 01 20 11 00 00 00 CC 00 00 00 02 00 15 10 12 00 00 00 5E </td><td class="hex_ascii">...... ................^</td></tr>
	<tr class="hex_line"><td class="hex_address">002010</td><td class="hex_value">00 00 00 3C 00 44 00 52 00 4D 00 43 00 4C 00 4F 00 43 00 4B 00 20 00 74 </td><td class="hex_ascii">...&lt;.D.R.M.C.L.O.C.K. .t</td></tr>
	<tr class="hex_line"><td class="hex_address">002028</td><td class="hex_value">00 79 00 70 00 65 00 3D 00 22 00 73 00 74 00 61 00 74 00 75 00 73 00 22 </td><td class="hex_ascii">.y.p.e.=.".s.t.a.t.u.s."</td></tr>
	<tr class="hex_line"><td class="hex_address">002040</td><td class="hex_value">00 3E 00 3C 00 56 00 41 00 4C 00 55 00 45 00 3E 00 23 00 32 00 30 00 31 </td><td class="hex_ascii">.&gt;.&lt;.V.A.L.U.E.&gt;.#.2.0.1</td></tr>
	<tr class="hex_line"><td class="hex_address">002058</td><td class="hex_value">00 31 00 33 00 33 00 31 00 36 00 20 00 31 00 37 00 3A 00 32 00 39 00 3A </td><td class="hex_ascii">.1.3.3.1.6. .1.7.:.2.9.:</td></tr>
	<tr class="hex_line"><td class="hex_address">002070</td><td class="hex_value">00 34 00 32 00 5A 00 23 00 3C 00 2F 00 56 00 41 00 4C 00 55 00 45 00 3E </td><td class="hex_ascii">.4.2.Z.#.&lt;./.V.A.L.U.E.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">002088</td><td class="hex_value">00 3C 00 46 00 4C 00 41 00 47 00 3E 00 44 00 52 00 4D 00 5F 00 43 00 4C </td><td class="hex_ascii">.&lt;.F.L.A.G.&gt;.D.R.M._.C.L</td></tr>
	<tr class="hex_line"><td class="hex_address">0020A0</td><td class="hex_value">00 4B 00 5F 00 53 00 45 00 54 00 3C 00 2F 00 46 00 4C 00 41 00 47 00 3E </td><td class="hex_ascii">.K._.S.E.T.&lt;./.F.L.A.G.&gt;</td></tr>
	<tr class="hex_line"><td class="hex_address">0020B8</td><td class="hex_value">00 3C 00 2F 00 44 00 52 00 4D 00 43 00 4C 00 4F 00 43 00 4B 00 3E 00 0C </td><td class="hex_ascii">.&lt;./.D.R.M.C.L.O.C.K.&gt;..</td></tr>
	<tr class="hex_line"><td class="hex_address">0020D0</td><td class="hex_value">00 00 00 03 00 01 20 12 00 00 00 1C 00 00 00 02 00 14 10 13 00 00 00 03 </td><td class="hex_ascii">...... .................</td></tr>
	<tr class="hex_line"><td class="hex_address">0020E8</td><td class="hex_value">D1 04 40 00 00 00 00 00 01 00 00 00 00 00 00 0C 00 00 00 03 00 01 20 13 </td><td class="hex_ascii">..@................... .</td></tr>
	<tr class="hex_line"><td class="hex_address">002100</td><td class="hex_value">00 00 00 CC 00 00 00 02 00 15 10 14 00 00 00 5E 00 00 00 3C 00 44 00 52 </td><td class="hex_ascii">...............^...&lt;.D.R</td></tr>
	<tr class="hex_line"><td class="hex_address">002118</td><td class="hex_value">00 4D 00 43 00 4C 00 4F 00 43 00 4B 00 20 00 74 00 79 00 70 00 65 00 3D </td><td class="hex_ascii">.M.C.L.O.C.K. .t.y.p.e.=</td></tr>
	<tr class="hex_line"><td class="hex_address">002130</td><td class="hex_value">00 22 00 73 00 74 00 61 00 74 00 75 00 73 00 22 00 3E 00 3C 00 56 00 41 </td><td class="hex_ascii">.".s.t.a.t.u.s.".&gt;.&lt;.V.A</td></tr>
	<tr class="hex_line"><td class="hex_address">002148</td><td class="hex_value">00 4C 00 55 00 45 00 3E 00 23 00 32 00 30 00 31 00 31 00 33 00 33 00 31 </td><td class="hex_ascii">.L.U.E.&gt;.#.2.0.1.1.3.3.1</td></tr>
	<tr class="hex_line"><td class="hex_address">002160</td><td class="hex_value">00 36 00 20 00 31 00 37 00 3A 00 32 00 39 00 3A 00 34 00 32 00 5A 00 23 </td><td class="hex_ascii">.6. .1.7.:.2.9.:.4.2.Z.#</td></tr>
	<tr class="hex_line"><td class="hex_address">002178</td><td class="hex_value">00 3C 00 2F 00 56 00 41 00 4C 00 55 00 45 00 3E 00 3C 00 46 00 4C 00 41 </td><td class="hex_ascii">.&lt;./.V.A.L.U.E.&gt;.&lt;.F.L.A</td></tr>
	<tr class="hex_line"><td class="hex_address">002190</td><td class="hex_value">00 47 00 3E 00 44 00 52 00 4D 00 5F 00 43 00 4C 00 4B 00 5F 00 53 00 45 </td><td class="hex_ascii">.G.&gt;.D.R.M._.C.L.K._.S.E</td></tr>
	<tr class="hex_line"><td class="hex_address">0021A8</td><td class="hex_value">00 54 00 3C 00 2F 00 46 00 4C 00 41 00 47 00 3E 00 3C 00 2F 00 44 00 52 </td><td class="hex_ascii">.T.&lt;./.F.L.A.G.&gt;.&lt;./.D.R</td></tr>
	<tr class="hex_line"><td class="hex_address">0021C0</td><td class="hex_value">00 4D 00 43 00 4C 00 4F 00 43 00 4B 00 3E 00 0C 00 00 00 03 00 01 20 14 </td><td class="hex_ascii">.M.C.L.O.C.K.&gt;........ .</td></tr>
	<tr class="hex_line"><td class="hex_address">0021D8</td><td class="hex_value">00 00 00 10 00 00 00 03 00 01 A1 15 00 00 00 03 01 07 80 14 00 00 00 02 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">0021F0</td><td class="hex_value">00 14 10 16 00 00 00 1C D2 FF FF 01 00 00 00 0C 00 00 00 03 00 01 20 16 </td><td class="hex_ascii">...................... .</td></tr>
	<tr class="hex_line"><td class="hex_address">002208</td><td class="hex_value">00 00 00 64 00 00 00 02 00 14 10 17 00 00 00 25 D2 FF FF 01 00 28 7B 00 </td><td class="hex_ascii">...d...........%.....({.</td></tr>
	<tr class="hex_line"><td class="hex_address">002220</td><td class="hex_value">30 00 30 00 30 00 30 00 30 00 30 00 30 00 30 00 2D 00 30 00 30 00 30 00 </td><td class="hex_ascii">0.0.0.0.0.0.0.0.-.0.0.0.</td></tr>
	<tr class="hex_line"><td class="hex_address">002238</td><td class="hex_value">30 00 2D 00 30 00 30 00 30 00 30 00 2D 00 30 00 30 00 30 00 30 00 2D 00 </td><td class="hex_ascii">0.-.0.0.0.0.-.0.0.0.0.-.</td></tr>
	<tr class="hex_line"><td class="hex_address">002250</td><td class="hex_value">30 00 30 00 30 00 30 00 30 00 30 00 30 00 30 00 30 00 30 00 30 00 30 00 </td><td class="hex_ascii">0.0.0.0.0.0.0.0.0.0.0.0.</td></tr>
	<tr class="hex_line"><td class="hex_address">002268</td><td class="hex_value">7D 00 00 00 00 00 00 0C 00 00 00 03 00 01 20 17 00 00 00 1A 00 00 00 02 </td><td class="hex_ascii">}............. .........</td></tr>
	<tr class="hex_line"><td class="hex_address">002280</td><td class="hex_value">00 14 10 18 00 00 00 1A D2 06 00 00 00 00 00 00 02 00 02 02 00 0C 00 00 </td><td class="hex_ascii">........................</td></tr>
	<tr class="hex_line"><td class="hex_address">002298</td><td class="hex_value">00 03 00 01 20 18 00 00 00 62 00 00 00 02 00 14 10 19 00 00 00 01 D4 FF </td><td class="hex_ascii">.... ....b..............</td></tr>
	<tr class="hex_line"><td class="hex_address">0022B0</td><td class="hex_value">FF 01 00 27 7B 00 39 00 45 00 30 00 35 00 31 00 31 00 42 00 31 00 2D 00 </td><td class="hex_ascii">...'{.9.E.0.5.1.1.B.1.-.</td></tr>
	<tr class="hex_line"><td class="hex_address">0022C8</td><td class="hex_value">43 00 30 00 30 00 38 00 2D 00 34 00 32 00 41 00 35 00 2D 00 41 00 31 00 </td><td class="hex_ascii">C.0.0.8.-.4.2.A.5.-.A.1.</td></tr>
	<tr class="hex_line"><td class="hex_address">0022E0</td><td class="hex_value">34 00 38 00 2D 00 42 00 43 00 44 00 42 00 42 00 37 00 41 00 44 00 31 00 </td><td class="hex_ascii">4.8.-.B.C.D.B.B.7.A.D.1.</td></tr>
	<tr class="hex_line"><td class="hex_address">0022F8</td><td class="hex_value">35 00 43 00 43 00 7D 00 00 00 00 0C 00 00 00 03 00 01 20 19 00 00 00    </td><td class="hex_ascii">5.C.C.}........... ....</td></tr>
</tbody>
</table>
</div>

What is of note here is that all of this data adheres to the MTP protocol; that is, this data can properly be split into correct
MTP packets, with the packets containing the handshake data seeming to have the MTP type of WMDRMPD_* (see the MTP documentation
in the [libmtp project](http://libmtp.sourcearchive.com/documentation/0.3.0-1ubuntu1/ptp_8h-source.html)).

As seen in the outbound session, what is sent first seems to be information about what software is currently handling the Zune.
This seems to be constant in every session I've inspected. A bit later, two pieces of data, which seem to be certificates, are
sent to the device. Again, this is constant in every session (at least for the software used). At hex address `0x0003A7` up until 
`0x00043C` is where the generated data lies. When observed in realtime, you can see that the software doesn't send any more packets
until it has received the next step of the handshake from the Zune.

Unfortunately, without yet knowing the format of the Zune handshake (I'll have to disassemble something to find out), I can't 
accurately say exactly what further is sent back and forth. Once I do, I'll be sure to make a detailed post on said format.
