function b64encode(str) {
    if (typeof btoa != 'undefined') {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var encoded = [];
        var c = 0;
        while (c < str.length) {
            var b0 = str.charCodeAt(c++);
            var b1 = str.charCodeAt(c++);
            var b2 = str.charCodeAt(c++);
            var buf = (b0 << 16) + ((b1 || 0) << 8) + (b2 || 0);
            var i0 = (buf & (63 << 18)) >> 18;
            var i1 = (buf & (63 << 12)) >> 12;
            var i2 = isNaN(b1) ? 64 : (buf & (63 << 6)) >> 6;
            var i3 = isNaN(b2) ? 64 : (buf & 63);
            encoded[encoded.length] = chars.charAt(i0);
            encoded[encoded.length] = chars.charAt(i1);
            encoded[encoded.length] = chars.charAt(i2);
            encoded[encoded.length] = chars.charAt(i3);
        }
        return encoded.join('');
    }
    else {
        return btoa(str);
    }
}

function b64decode(str) {
    if (typeof atob == 'undefined') {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var invalid = {
            strlen: (str.length % 4 != 0),
            chars:  new RegExp('[^' + chars + ']').test(str),
            equals: (/=/.test(str) && (/=[^=]/.test(str) || /={3}/.test(str)))
        };
        if (invalid.strlen || invalid.chars || invalid.equals)
            throw new Error('Invalid base64 data');
        var decoded = [];
        var c = 0;
        while (c < str.length) {
            var i0 = chars.indexOf(str.charAt(c++));
            var i1 = chars.indexOf(str.charAt(c++));
            var i2 = chars.indexOf(str.charAt(c++));
            var i3 = chars.indexOf(str.charAt(c++));
            var buf = (i0 << 18) + (i1 << 12) + ((i2 & 63) << 6) + (i3 & 63);
            var b0 = (buf & (255 << 16)) >> 16;
            var b1 = (i2 == 64) ? -1 : (buf & (255 << 8)) >> 8;
            var b2 = (i3 == 64) ? -1 : (buf & 255);
            decoded[decoded.length] = String.fromCharCode(b0);
            if (b1 >= 0) decoded[decoded.length] = String.fromCharCode(b1);
            if (b2 >= 0) decoded[decoded.length] = String.fromCharCode(b2);
        }
        return decoded.join('');
    }
    else {
        return atob(str);
    }
}

function hexEncode(x,dir) {
	var hex="0123456789ABCDEF";
	r="";
	
	for (var i = 0; i < x.length; i++) {
		var pos = x.charCodeAt(i);
		var h16 = Math.floor(pos/16); 
		var h1 = pos % 16;
		r += hex.charAt(h16) + hex.charAt(h1) + '';
	}

	return r;
}

function padding(s,l) { return( l.substr(0, (l.length-s.length) )+s ); }

function hexTableEncode(x) {
	var hex="0123456789ABCDEF";
	var r= '<table class="hex_table"><tbody>';
	var ascii = '';
	var i = 0;
	var doLast = true;

	for (i = 0; i < x.length; i++) {
		if (i % 24 == 0) {
			r += '<tr class="hex_row">';
			r += '<td class="hex_address">' + padding((0x10 * (i / 8)).toString(16), '000000') + '</td>';
			r += '<td class="hex_value">';
			doLast = true;
		}

		var pos = x.charCodeAt(i);
		var h16 = Math.floor(pos/16); 
		var h1 = pos % 16;
		r += hex.charAt(h16) + hex.charAt(h1) + ' ';

		if (pos < 32 || pos >= 128) {
			ascii += '.';
		}
		else {
			ascii += x.charAt(i);
		}

		if (i % 24 == 23) {
			r += '</td>';
			r += '<td class="hex_ascii">' + htmlEncode(ascii) + '</td>';
			r += '</tr>';

			doLast = false;
			ascii = '';
		}
	}

	if (doLast) {
		r += '</td>';
		r += '<td class="hex_ascii">' + ascii + '</td>';
		r += '</tr>';

		ascii = '';
	}

	r += '</tbody></table>';
	return r;
}

function htmlEncode(str) {
	return str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
}

