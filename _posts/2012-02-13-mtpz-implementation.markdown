---
layout: post
title: "MTPZ: Implementation"
tags: [zune, mtpz]
---

<script type="text/javascript">addStylesheet("hextable.css");</script>

Oh gosh, when did it become February? It's been quite a while, but I blame school! Anyhow, it might be a good idea
to give an update on my progress of implementing the Zune functionality onto the libmtp project.

Source code release
-------------------

I have released the source code of the MTPZ implementation in my new GitHub repository, [libmtp-zune][1]. This is a 
fork of the official [libmtp repository][2] hosted on SourceForge, with my changes on top. Keep in mind that my repository
may not be stable and thus it should only be installed by the adventurous. For the rest, I'm working on cleaning up
my code so that it can be merged into the libmtp project.

[1]: https://github.com/kbhomes/libmtp-zune		"kbhomes's libmtp-zune repository"
[2]: http://sourceforge.net/projects/libmtp		"Official libmtp repository"

I've included in my repository a file named [mtpz.md][3], a short synoptic outline of the handshake process. As well,
this file discloses the structure of the certificate data and the RSA keys used in the handshake. Bear in mind that
not all of the information about the structure of the certificate data is known to me --- I did not pursue those bits
further as they were not relevant to the handshake process.

[3]: https://github.com/kbhomes/libmtp-zune/blob/master/mtpz.md		"Synoptic outline of the handshake process"

Using the MTPZ functionality
----------------------------

The way that MTPZ is incorporated into the libmtp library is to call functions that complete the handshake process when 
an appropriate device is detected. When a device is to be opened by the library, it is checked if it contains the 
`microsoft.com/MTPZ` vendor extension. If the device is found to be an MTPZ device, the library performs the handshake 
and then continues normally.

When running the `configure` script, there is now the `--disable-mtpz` flag which, if present, will not build the MTPZ
functionality. By default, MTPZ is included. Once the project is built and installed, the command line examples can
be used to manipulate the device. For example, to download tracks from the device, use the `mtp-getfile` program. Similarly,
`mtp-sendtr` can be used to upload songs to the device.

There are some issues regarding the MTPZ functionality being backwards compatible with existent software which are being
looked into. For example, Banshee and Rhythmbox do not yet properly interface with my Zune. I have, however, found that 
[gMTP][4] does properly interface with my device, once compiled from source so that it links with my changes to libmtp.
Again, these compatibility issues are being investigated.

[4]: http://gmtp.sourceforge.net/		"gMTP: open source MTP client"

We're not done just yet
-----------------------

While this code represents very good progress on the implementation front, we still have work to do in order to finalize
this project:

*   **Separate the certificate data and RSA key data from the library.**
    The certificate data can be extracted byte-for-byte from any MTPZ handshake session. The RSA key data, however, must
    be reverse engineered from official software. As such, it is best that these pieces of data remain separate from the 
    project and be obtained by the end-user to be stored in their home directories for libmtp to read.

*   **Investigate backward compatibility issues.**
    As mentioned previously, some existent software have issues in properly interfacing with MTPZ devices using this new
    MTPZ functionality. In order for this library to be most effective, the MTPZ functionality should ideally work out of 
    the box with any pre-existing software. 

*   **Merge MTPZ functionality into libmtp.**
    The final milestone of the project is to incorporate this MTPZ research and code into the official libmtp codebase.
    Doing so will result in MTPZ functionality being easily installable and potentially even be installed out of the box
    in some systems.

With that, I get back to working on this. More updates will be posted on this blog, but also be sure to watch my GitHub
repository as well as the [mailing list for libmtp][5].

[5]: http://sourceforge.net/mailarchive/forum.php?forum_name=libmtp-discuss		"libmtp mailing list"
