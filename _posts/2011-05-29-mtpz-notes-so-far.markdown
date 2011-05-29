---
layout: post
title: "MTPZ: Notes, So Far"
tags: [zune, mtpz]
---

So it has been quite a while, and between the last blog post and now, I haven't gotten too much
accomplished, but at least I'll have far more time now to pursue this project. Publishing my
notes (so far) might be a good idea, so here we are.

Initialization notes
--------------------

Refer to my [previous blog post](http://kbhomes.github.com/2011/04/26/mtpz-initialization-part-1.html)
for the two blocks of data that are decrypted when the software initializes a connection to the Zune.

The first block are the certificates sent to the device. Through analysis of the Windows Phone 7
Connector for Mac application, along with some intuitive guesses, I've been able to deduce most of
the structure of each certificate, presented below. Some parts have been truncated for brevity.

#### Certificate structure

	# How many certificates
	02 
	
		# First cert (follows same format as below)
		00 00 01 35 01 00 00 00 00 B5 01 00 00 00 01 00 00 00 ... [truncated]
	
		# Second cert
		# Length of cert (0x137)
		00 00 01 37 
	
			# Some word (0x0100)
			01 00 
		
			# Length of inner data (0xB7)
			00 00 00 B7 
		
				# Some byte - must be <= 5 (0x03)
				03 
			
				# Some int (0x00000000)
				00 00 00 00 
			
				# Skipped over
				00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
			
				# Length of canonical name (0x14)
				00 14 
			
					# Canonical name ("Zune Software Leaf 1")
					5A 75 6E 65 20 53 6F 66 74 77 61 72 65 20 4C 65 61 66 20 31 
			
				# Public key exponent (0x010001 or 65537)
				00 01 00 01 
			
				# RSA modulus length (0x80)
				00 80 
			
					# RSA modulus
					E5 77 D3 FC BE 3F 03 E2 4F E8 8C 19 F4 64 98 E1 C7 36 ... [truncated]
				
			# Rest of the data, unknown.
			7E EA C9 77 6F 4D 73 A4 AA FD 89 6B AA 5A 86 85 C0 5D 5B 74 66 65 21  ... [truncated]
	

-------------------------------------------------------------------------------------------------------------

The second block, based on the first three bytes, are public/private key RSA information. The value
`52 53 41 32` represents RSA2 in ASCII, marking that what follows is [private key information](http://msdn.microsoft.com/en-us/library/aa387401(v=vs.85\).aspx).
As per that structure represented on the MSDN page, the private key information involves the bit length
of the key, the public exponent, the modulus (n), the two primes (p and q), the two exponents, the 
coefficient, and the private exponent (d). Curiously, the private exponent is not present in the 
decrypted RSA block, although this is not too big of a deal given that it can be calculated from the
two primes. The structure, presented below, of this information was almost all guessed at based on the dividing `00 00 00 00`'s, 
though they were very good guesses given that the information checks out.

#### RSA private key structure

	# RSA private key ("RSA2")
	52 53 41 32 

		# Bit length / 8 + 8 (0x88 = 136)
		88 00 00 00 

		# Bit length (0x400 = 1024)
		00 04 00 00 

		# Bit length / 8 - 1 (0x7F = 127)
		7F 00 00 00 

		# Public exponent (0x10001 = 65537)
		01 00 01 00 

		# Modulus (n = p * q)
		E5 77 D3 FC BE 3F 03 E2 4F E8 8C 19 F4 64 98 E1 C7 36 18 1B B2 ... [truncated]

			00 00 00 00 

			00 00 00 00 

		# Prime 1 (p)
		E7 B2 65 91 1C 64 9C 1B 9A 63 41 AB 67 A5 A1 90 DF 22 54 7F C2 ... [truncated]

			00 00 00 00 

		# Prime 2 (q)
		E0 16 E8 A5 B2 D7 1D B7 A9 39 B8 5C 35 B7 EB A3 BB DE 58 F2 F3 ... [truncated]

			00 00 00 00 

		# Exponent 1 (d mod (p - 1))
		45 4E A3 FB 28 57 20 2B 51 9F 67 41 72 9B A5 1C C4 E2 6C 0C 5B ... [truncated]

			00 00 00 00 

		# Exponent 2 (d mod (q - 1))
		05 E4 34 4B 9E EF 0E E5 F4 3A 03 41 D1 5B BB 83 3B 7E 36 02 75 ... [truncated]

			00 00 00 00 

		# Coefficient
		04 47 B4 EB EF D7 3B F0 EF 05 A5 2D 7D F5 6F 87 4F 5F 72 94 39 ... [truncated]
	

You might notice that the modulus presented here is the same as the RSA modulus from the second certificate.
The modulus, in the RSA algorithm, is publicly released and is contained in both the public and private keys. Since
that certificate has the modulus and the public exponent, it can be assumed that the private key information
here is the corresponding private key to that certificate's public key.

Deserializing the certificates
------------------------------

After the two blocks of data are decrypted, data structures are created and initialized to hold the
certificates after they are deserialized. C-style code follows, that demonstrate the structures,
although somewhat incompletely, used by the application.

{% highlight c linenos=table %}
struct DeserializedCertificates
{
	CertificateCollection *collection;
	NativeCertificate *cert;
}
{% endhighlight %}

The `CertificateCollection` seems simply to be a container around an array of certificates. In this case, 
there are only two certificates used by the application. Also, the second certificate ("Zune
Software Leaf") seems to be assigned to the `cert` field.

{% highlight c linenos=table %}
struct NativeCertificate
{
	// Seems to be a pointer to an array of private methods.
	int field_0;
	
	// The length of the certificate, and a pointer to the beginning of the data.
	int certLength;
	void *certData;

	int field_C;

	// The length of the inner portion of the certificate.
	int innerCertLength;

	int field_14;
	int field_18;

	// Duplicate of rsaModuluslength.
	int rsaModulusLength_dup;

	// Pointer to the beginning of the unknown data at the end.
	void *restData;

	int field_24;

	// Encrypted public key information and length.
	void *rsaPubKeyEnc;
	int rsaPubKeyLength;

	// Encrypted private key information and length.
	void *rsaPrivKeyEnc;
	int rsaPrivKeyLength

	// Duplicate of certData, and pointer to certificate data starting at the length
	void *certData_dup;
	void *certData_startAtLength;

	int field_40;
	int field_44;
	int field_48;
	int field_4C;

	// Canonical name of this certificate.
	char *canonicalName;

	// Public key exponent.
	int pubKeyExp;

	// Length and contents of the RSA modulus.
	int rsaModulusLength;
	void *rsaModulusData;
}
{% endhighlight %}

What's left?
------------

I'll have to investigate a few more method calls, and then hopefully _initialization_ will have
been thoroughly covered. Phew.
