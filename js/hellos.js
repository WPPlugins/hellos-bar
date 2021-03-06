/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


jQuery(document).ready(
	function($) {
		var Version	 = $.fn.jquery;
		
		function Hellos_Bar() {
			var hellobar = $('#hellobar-container');
				
			if ( hellobar.length > 0 ) {
				var top			= $('#hellobar').outerHeight(true);
				var shortime	= 300;
				var longtime	= 1700;
				
				if ( Version > '1.6' )
					var URL			= $(location).prop('href');
				else
					var URL			= $(location).attr('href');
					
				var cookieName	= 'hellos_bar';
				var cookieVal	= $.cookie(cookieName);
				//console.log(top);
				
				//$.cookie(cookieName, 'opened', { expires: 30, path: '/', domain: $(location).prop('href'), secure: true });
				
				$('#hellobar').css('top','-' + top + 'px')
				$('#hellobar-container,#hellobar').removeClass('show-if-no-js');
				
				if ( cookieVal != null && cookieVal == 'opened'  ) {
					$('#hellobar').delay(shortime).animate({top: '0'}).delay(shortime).addClass('opened');
					$('body').delay(shortime).animate({paddingTop: top});
					$('#hellobar-container .toggle a').delay(shortime).toggle();
					$('#hellobar-container .toggle a').delay(shortime).toggle();
				} else {
					$('#hellobar').addClass('closed');
					$('#hellobar-container .toggle a').delay(longtime).toggle();
				}
				
				/* Close the hellosbar */
				$('#hellobar-container .toggle .open').click( function() {
					//alert( get_cookie( cookieName ) );
					if ( $('#hellobar').css('top') != '0' )
						$('#hellobar').css('top','0');
					$('#hellobar').slideDown();
					$('body').animate({paddingTop: top});
					$('#hellobar').removeClass('opened');
					$('#hellobar').addClass('closed');
					$.cookie(cookieName, 'opened');
					//$.cookie(cookieName, 'opened', { expires: 30, path: '/' });
				});
				
				/* Open the hellosbar */
				$('#hellobar-container .toggle .close').click( function() {
					$('#hellobar').slideUp('fast');
					$('#hellobar').animate({top: '0'});
					$('body').animate({paddingTop: '0'});
					$('#hellobar').removeClass('closed');
					$('#hellobar').addClass('opened');
					$.cookie(cookieName, 'closed');
					//$.cookie(cookieName, 'closed', { expires: 30, path: '/' });
				});
				
				$('#hellobar-container .toggle a').click( function(e) {
					$('#hellobar-container .toggle a').toggle();
					e.preventDefault();
				});				
				
				//Pre-caution
				$('#hellobar .branding').delay(longtime).show();			
			}
		}
		Hellos_Bar();		
		
		// External links		
		if ( Version > '1.6' ) {
			$('#hellobar a').filter(function() {
				return this.hostname && this.hostname !== location.hostname;
			}).prop('target','_blank');
		} else {
			$('#hellobar a').filter(function() {
				return this.hostname && this.hostname !== location.hostname;
			}).attr('target','_blank');
		}
	
	}
);