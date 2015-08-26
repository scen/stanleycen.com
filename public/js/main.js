// Since firefox sucks. transform: scale is hella slow
var IS_FIREFOX = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1);

// requestAnimationFrame polyfill
(function () {
    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'],
        x;

    for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame  = window[vendors[x] + 'CancelAnimationFrame']
                                   || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            window.clearTimeout(id);
        };
    }
}());


// Use native JS over jQuery for better performance.
var Parallax = {
    SPEED_RATIO: 2.0,
    SCALE_RATIO: 5000.0,

    img_cache: [],
    wrap_cache: [],
    offset_top_cache: [],
    count: 0,

    init: function() {
        $('.parallax-img').each(function(idx) {
            Parallax.img_cache.push(this);
            Parallax.wrap_cache.push(this.parentNode);
            Parallax.offset_top_cache.push(this.parentNode.offsetTop);
            Parallax.count++;
        });
        Parallax._refresh_y_offsets();
    },

    update: function() {
        var scroll_y = window.pageYOffset;
        for (var i = 0; i < Parallax.count; i++) {
            var elem = Parallax.img_cache[i];
            var offset = scroll_y - Parallax.offset_top_cache[i];
            var dist = offset / Parallax.SPEED_RATIO; // Clamp to [0, inf]?
            var scale = 1 + Math.max(offset / Parallax.SCALE_RATIO, 0);
            Parallax._translate_y_and_scale(elem, dist, scale);
        }
    },

    _translate_y_and_scale:  function(elm, dist, scale) {
        var transform = 'translate3d(0,' + dist + 'px, 0) scale3d(' + scale + ',' + scale + ', 1)';
        if (IS_FIREFOX) {
            transform += " rotate(0.01deg)";
        }
        elm.style['-webkit-transform'] = transform;
        elm.style['-moz-transform'] = transform;
        elm.style['-ms-transform'] = transform;
        elm.style['-o-transform'] = transform;
        elm.style.transform = transform;
    },

    _refresh_y_offsets: function() {
        console.log("refreshing offsets");
        for (var i = 0; i < Parallax.count; i++) {
            Parallax.offset_top_cache[i] = Parallax.wrap_cache[i].offsetTop;
        }
    }
};

function pushy_init() {
    $(function() {
        var pushy = $('.pushy'), //menu css class
            body = $('body'),
            container = $('#container'), //container css class
            push = $('.push'), //css class to add pushy capability
            siteOverlay = $('.site-overlay'), //site overlay
            pushyClass = "pushy-left pushy-open", //menu position & menu open class
            pushyActiveClass = "pushy-active", //css class to toggle site overlay
            containerClass = "container-push", //container open class
            pushClass = "push-push", //css class to add pushy capability
            menuBtn = $('.navicon-button, .pushy a'), //css classes to toggle the menu
            menuSpeed = 200, //jQuery fallback menu speed
            menuWidth = pushy.width() + "px"; //jQuery fallback menu width

        function togglePushy(){
            body.toggleClass(pushyActiveClass); //toggle site overlay
            pushy.toggleClass(pushyClass);
            container.toggleClass(containerClass);
            push.toggleClass(pushClass); //css class to add pushy capability
        }

        function openPushyFallback(){
            body.addClass(pushyActiveClass);
            pushy.animate({left: "0px"}, menuSpeed);
            container.animate({left: menuWidth}, menuSpeed);
            push.animate({left: menuWidth}, menuSpeed); //css class to add pushy capability
        }

        function closePushyFallback(){
            body.removeClass(pushyActiveClass);
            pushy.animate({left: "-" + menuWidth}, menuSpeed);
            container.animate({left: "0px"}, menuSpeed);
            push.animate({left: "0px"}, menuSpeed); //css class to add pushy capability
        }

        //checks if 3d transforms are supported removing the modernizr dependency
        cssTransforms3d = (function csstransforms3d(){
            var el = document.createElement('p'),
            supported = false,
            transforms = {
                'webkitTransform':'-webkit-transform',
                'OTransform':'-o-transform',
                'msTransform':'-ms-transform',
                'MozTransform':'-moz-transform',
                'transform':'transform'
            };

            // Add it to the body to get the computed style
            document.body.insertBefore(el, null);

            for(var t in transforms){
                if( el.style[t] !== undefined ){
                    el.style[t] = 'translate3d(1px,1px,1px)';
                    supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            return (supported !== undefined && supported.length > 0 && supported !== "none");
        })();

        if(cssTransforms3d){
            //toggle menu
            menuBtn.click(function() {
                togglePushy();
                $('.navicon-button > .navicon').toggleClass('x');
            });
            //close menu when clicking site overlay
            siteOverlay.click(function(){
                togglePushy();
                $('.navicon-button > .navicon').toggleClass('x');
            });
        }else{
            // this creates a flash in ie7 but idgaf.
            //jQuery fallback
            pushy.css({left: "-" + menuWidth}); //hide menu by default
            container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

            //keep track of menu state (open/close)
            var state = true;

            //toggle menu
            menuBtn.click(function() {
                if (state) {
                    openPushyFallback();
                    state = false;
                } else {
                    closePushyFallback();
                    state = true;
                }
                $('.navicon-button > .navicon').toggleClass('x');
            });

            //close menu when clicking site overlay
            siteOverlay.click(function(){
                if (state) {
                    openPushyFallback();
                    state = false;
                } else {
                    closePushyFallback();
                    state = true;
                }
            });
        }
    });
}

function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
        context = this;
        args = arguments;
        timestamp = new Date();
        var later = function() {
            var last = (new Date()) - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                }
            }
        };
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
        }
        return result;
    };
}

// Copyright (C) 2011 by Will Tomlins
//
// Github profile: http://github.com/layam
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


function humanized_time_span(date, ref_date, date_formats, time_units) {
  //Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
  date_formats = date_formats || {
    past: [
      { ceiling: 60, text: "$seconds seconds ago" },
      { ceiling: 3600, text: "$minutes minutes ago" },
      { ceiling: 86400, text: "$hours hours ago" },
      { ceiling: 2629744, text: "$days days ago" },
      { ceiling: 31556926, text: "$months months ago" },
      { ceiling: null, text: "$years years ago" }
    ],
    future: [
      { ceiling: 60, text: "in $seconds seconds" },
      { ceiling: 3600, text: "in $minutes minutes" },
      { ceiling: 86400, text: "in $hours hours" },
      { ceiling: 2629744, text: "in $days days" },
      { ceiling: 31556926, text: "in $months months" },
      { ceiling: null, text: "in $years years" }
    ]
  };
  //Time units must be be ordered largest -> smallest
  time_units = time_units || [
    [31556926, 'years'],
    [2629744, 'months'],
    [86400, 'days'],
    [3600, 'hours'],
    [60, 'minutes'],
    [1, 'seconds']
  ];

  date = new Date(date);
  ref_date = ref_date ? new Date(ref_date) : new Date();
  var seconds_difference = (ref_date - date) / 1000;

  var tense = 'past';
  if (seconds_difference < 0) {
    tense = 'future';
    seconds_difference = 0-seconds_difference;
  }

  function get_format() {
    for (var i=0; i<date_formats[tense].length; i++) {
      if (date_formats[tense][i].ceiling == null || seconds_difference <= date_formats[tense][i].ceiling) {
        return date_formats[tense][i];
      }
    }
    return null;
  }

  function get_time_breakdown() {
    var seconds = seconds_difference;
    var breakdown = {};
    for(var i=0; i<time_units.length; i++) {
      var occurences_of_unit = Math.floor(seconds / time_units[i][0]);
      seconds = seconds - (time_units[i][0] * occurences_of_unit);
      breakdown[time_units[i][1]] = occurences_of_unit;
    }
    return breakdown;
  }

  function render_date(date_format) {
    var breakdown = get_time_breakdown();
    var time_ago_text = date_format.text.replace(/\$(\w+)/g, function() {
      return breakdown[arguments[1]];
    });
    return depluralize_time_ago_text(time_ago_text, breakdown);
  }

  function depluralize_time_ago_text(time_ago_text, breakdown) {
    for(var i in breakdown) {
      if (breakdown[i] == 1) {
        var regexp = new RegExp("\\b"+i+"\\b");
        time_ago_text = time_ago_text.replace(regexp, function() {
          return arguments[0].replace(/s\b/g, '');
        });
      }
    }
    return time_ago_text;
  }

  return render_date(get_format());
}

jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
});

function scrollTo(to) {
    console.log("scrollTo", to);
    $('html, body').stop().animate({
        scrollTop: $(to).offset().top
        }, 500, 'easeInOutExpo');
}

$(document).ready(function() {
    Parallax.init();

    function on_raf() {
        requestAnimationFrame(on_raf);

        Parallax.update();
    }
    requestAnimationFrame(on_raf);

    $('header > nav > ul > li > a').hover(function() {
        // enter
        $(this).parent().siblings('li').children('a').addClass('blur');
    }, function() {
        // exit
        $(this).parent().siblings('li').children('a').removeClass('blur');
    });

    $('a.popout-lightbox').fluidbox();

    // Clone menu for pushy
    $('body').append($('nav').clone().addClass('pushy pushy-left'));
    pushy_init();

    $posts = $('.posts-wrap');

    $posts = $posts.masonry({
        itemSelector: '.blog-masonry-post',
    });
    var debounced_masonry = debounce(function() {
        $posts.masonry();
    }, 300);

    $(window).resize(function(evt) {
        Parallax._refresh_y_offsets();
        debounced_masonry();
    });

    $('.blog-masonry-post article').hover(function() {
        var img = $(this).find('.post-header')[0];
        Parallax._translate_y_and_scale(img, 0, 1.2);
        $(img).find('.darken-filter').addClass('less');
        // $(this).css('cursor', 'pointer');
    }, function() {
        var img = $(this).find('.post-header')[0];
        Parallax._translate_y_and_scale(img, 0, 1);
        $(img).find('.darken-filter').removeClass('less');
        // $(this).css('cursor', 'pointer');
    });

    var $time = $('footer time');
    $time.text(humanized_time_span($time.attr('datetime')));

    function contact_response(success) {
        $('#contact_form input, #contact_form textarea, #contact_form button').prop('disabled', success);
        if (success) {
            $('#contact_form .thanks').show();
            $('#contact_form .error').hide();
        } else {
            $('#contact_form .thanks').hide();
            $('#contact_form .error').show();
        }
    }

    $('#contact_form > form').submit(function(evt) {
        evt.preventDefault();
        $.ajax({
            type: 'POST',
            headers: {
                'X-Parse-Application-Id': "Vy1PuWd7wo8waGjlUCkOS88VZhhskOyueZyjiRXR",
                'X-Parse-REST-API-Key': "gzdK9mMNsyVtHAjhmLnmn29jFZN8zGRFTcHyC817"
            },
            url: "https://api.parse.com/1/functions/sendEmail",
            contentType: 'text/plain',
            data: JSON.stringify({
                name: $('#name').val(),
                email: $('#email').val(),
                subject: $('#subject').val(),
                message: $('#message').val(),
            }),
            success: function(res, status, xhr) {
                contact_response(res.result === 'ok');
            },
            error: function(xhr, status, error) {
                contact_response(false);
            }
        });
    });

    $("nav li a").click(function(event) {
        console.log("click");
        var $a = $(this);
        if ($a.attr('href') != null && $a.attr('href')[0] == '#') {
            scrollTo($a.attr('href'));
            event.preventDefault();
        }
    });

    if (location.hash != "" && location.hash[0] == '#') {
        scrollTo(location.hash);
        history.pushState("", document.title, window.location.pathname);
    }

    // TODO: make a favicon
    // TODO: specificly extract the necessary classes from animate.css
    // TODO: add dropbox font logo to timeline
    // TODO: fix a href styles
    // TODO: fix pygments css theme
    // TODO: convert all blog posts to new format...
    // TODO: fix highlight
    // TODO: read http://stackoverflow.com/questions/21099528/multiple-files-on-cdn-vs-one-file-locally
    // TODO: responsive design for the blog
    // TODO: change triple ### to double ## in the blog posts
    // TODO: chrome idle cpu usage?
    // TODO: move scripts to bottom of page
    // TODO: combine js, css files
    // TODO: why the fuck is scale so slow on firefox. shoudl we disable for firefox?
    // TODO: optimize parallax3
});