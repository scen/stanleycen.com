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

$(document).ready(function() {
    Parallax.init();

    $(window).resize(function(evt) {
        Parallax._refresh_y_offsets();
    });

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

    // var scroll_notifier = $('#scroll-notifier')[0];

    // $(window).scroll(function() {
    //     if (window.pageYOffset > 0) {
    //         scroll_notifier.style.display = 'none';
    //     }
    //     else {
    //         scroll_notifier.style.display = 'block';
    //     }
    // });


    // use https://mango.github.io/slideout/
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
});