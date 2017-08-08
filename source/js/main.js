// Since firefox sucks. transform: scale is hella slow
var IS_FIREFOX = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1);

// requestAnimationFrame appears to be fubar
var IS_SAFARI_IOS_7 = navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i);

// the addressbar on android chrome screws up the vh unit.
var IS_ANDROID_MOBILE = /(android)/i.test(navigator.userAgent.toLowerCase()) && /(mobile)/i.test(navigator.userAgent.toLowerCase());

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

// Fluidbox

!function(a,b,c,d){"use strict";function e(b,c){this.element=b;var d={};a.each(a(this.element).data(),function(a,b){var c=function(a){return a&&a[0].toLowerCase()+a.slice(1)},e=c(a.replace("fluidbox",""));(""!==e||null!==e)&&("false"==b?b=!1:"true"==b&&(b=!0),d[e]=b)}),this.settings=a.extend({},i,c,d),this.settings.viewportFill=Math.max(Math.min(parseFloat(this.settings.viewportFill),1),0),this.settings.stackIndex<this.settings.stackIndexDelta&&(settings.stackIndexDelta=settings.stackIndex),this._name=h,this.init()}var f=a(b),g=a(c),h="fluidbox",i={immediateOpen:!1,loader:!1,maxWidth:0,maxHeight:0,resizeThrottle:500,stackIndex:1e3,stackIndexDelta:10,viewportFill:.95},j={},k=0;("undefined"==typeof console||"undefined"===console.warn)&&(console={},console.warn=function(){}),a.isFunction(a.throttle)||console.warn("Fluidbox: The jQuery debounce/throttle plugin is not found/loaded. Even though Fluidbox works without it, the window resize event will fire extremely rapidly in browsers, resulting in significant degradation in performance upon viewport resize.");var l=function(){var a,b=c.createElement("fakeelement"),e={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(a in e)if(b.style[a]!==d)return e[a]},m=l(),n={dom:function(){var b=a("<div />",{"class":"fluidbox__wrap",css:{zIndex:this.settings.stackIndex-this.settings.stackIndexDelta}});if(a(this.element).addClass("fluidbox--closed").wrapInner(b).find("img").first().css({opacity:1}).addClass("fluidbox__thumb").after('<div class="fluidbox__ghost" />'),this.settings.loader){var c=a("<div />",{"class":"fluidbox__loader",css:{zIndex:2}});a(this.element).find(".fluidbox__wrap").append(c)}},prepareFb:function(){var b=this,c=a(this.element);c.trigger("thumbloaddone.fluidbox"),n.measure.fbElements.call(this),b.bindEvents(),c.addClass("fluidbox--ready"),b.bindListeners(),c.trigger("ready.fluidbox")},measure:{viewport:function(){j.viewport={w:f.width(),h:f.height()}},fbElements:function(){var b=this,c=a(this.element),d=c.find("img").first(),e=c.find(".fluidbox__ghost"),f=c.find(".fluidbox__wrap");b.instanceData.thumb={natW:d[0].naturalWidth,natH:d[0].naturalHeight,w:d.width(),h:d.height()},e.css({width:d.width(),height:d.height(),top:d.offset().top-f.offset().top+parseInt(d.css("borderTopWidth"))+parseInt(d.css("paddingTop")),left:d.offset().left-f.offset().left+parseInt(d.css("borderLeftWidth"))+parseInt(d.css("paddingLeft"))})}},checkURL:function(a){var b=0;return/[\s+]/g.test(a)?(console.warn("Fluidbox: Fluidbox opening is halted because it has detected characters in your URL string that need to be properly encoded/escaped. Whitespace(s) have to be escaped manually. See RFC3986 documentation."),b=1):/[\"\'\(\)]/g.test(a)&&(console.warn("Fluidbox: Fluidbox opening will proceed, but it has detected characters in your URL string that need to be properly encoded/escaped. These will be escaped for you. See RFC3986 documentation."),b=0),b},formatURL:function(a){return a.replace(/"/g,"%22").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29")}};a.extend(e.prototype,{init:function(){var b=this,c=a(this.element),d=c.find("img").first();if(n.measure.viewport(),(!b.instanceData||!b.instanceData.initialized)&&c.is("a")&&1===c.children().length&&(c.children().is("img")||c.children().is("picture")&&1===c.find("img").length)&&"none"!==c.css("display")&&"none"!==c.children().css("display")&&"none"!==c.parents().css("display")){c.removeClass("fluidbox--destroyed"),b.instanceData={},b.instanceData.initialized=!0,b.instanceData.originalNode=c.html(),k+=1,b.instanceData.id=k,c.addClass("fluidbox__instance-"+k),c.addClass("fluidbox--initialized"),n.dom.call(b),c.trigger("init.fluidbox");var e=new Image;d.width()>0&&d.height()>0?n.prepareFb.call(b):(e.onload=function(){n.prepareFb.call(b)},e.onerror=function(){c.trigger("thumbloadfail.fluidbox")},e.src=d.attr("src"))}},open:function(){var b=this,c=a(this.element),d=c.find("img").first(),e=c.find(".fluidbox__ghost"),f=c.find(".fluidbox__wrap");b.instanceData.state=1,e.off(m),a(".fluidbox--opened").fluidbox("close");var g=a("<div />",{"class":"fluidbox__overlay",css:{zIndex:-1}});if(f.append(g),c.removeClass("fluidbox--closed").addClass("fluidbox--loading"),n.checkURL(d.attr("src")))return b.close(),!1;e.css({"background-image":"url("+n.formatURL(d.attr("src"))+")",opacity:1}),n.measure.fbElements.call(b);var h;b.settings.immediateOpen?(c.addClass("fluidbox--opened fluidbox--loaded").find(".fluidbox__wrap").css({zIndex:b.settings.stackIndex+b.settings.stackIndexDelta}),c.trigger("openstart.fluidbox"),b.compute(),d.css({opacity:0}),a(".fluidbox__overlay").css({opacity:1}),e.one(m,function(){c.trigger("openend.fluidbox")}),h=new Image,h.onload=function(){if(c.trigger("imageloaddone.fluidbox"),1===b.instanceData.state){if(b.instanceData.thumb.natW=h.naturalWidth,b.instanceData.thumb.natH=h.naturalHeight,c.removeClass("fluidbox--loading"),n.checkURL(h.src))return b.close({error:!0}),!1;e.css({"background-image":"url("+n.formatURL(h.src)+")"}),b.compute()}},h.onerror=function(){b.close({error:!0}),c.trigger("imageloadfail.fluidbox"),c.trigger("delayedloadfail.fluidbox")},h.src=c.attr("href")):(h=new Image,h.onload=function(){return c.trigger("imageloaddone.fluidbox"),c.removeClass("fluidbox--loading").addClass("fluidbox--opened fluidbox--loaded").find(".fluidbox__wrap").css({zIndex:b.settings.stackIndex+b.settings.stackIndexDelta}),c.trigger("openstart.fluidbox"),n.checkURL(h.src)?(b.close({error:!0}),!1):(e.css({"background-image":"url("+n.formatURL(h.src)+")"}),b.instanceData.thumb.natW=h.naturalWidth,b.instanceData.thumb.natH=h.naturalHeight,b.compute(),d.css({opacity:0}),a(".fluidbox__overlay").css({opacity:1}),void e.one(m,function(){c.trigger("openend.fluidbox")}))},h.onerror=function(){b.close({error:!0}),c.trigger("imageloadfail.fluidbox")},h.src=c.attr("href"))},compute:function(){var b=this,c=a(this.element),d=c.find("img").first(),e=c.find(".fluidbox__ghost"),g=c.find(".fluidbox__wrap"),h=b.instanceData.thumb.natW,i=b.instanceData.thumb.natH,k=b.instanceData.thumb.w,l=b.instanceData.thumb.h,m=h/i,n=j.viewport.w/j.viewport.h;b.settings.maxWidth>0?(h=b.settings.maxWidth,i=h/m):b.settings.maxHeight>0&&(i=b.settings.maxHeight,h=i*m);var o,p,q,r,s;n>m?(o=i<j.viewport.h?i:j.viewport.h*b.settings.viewportFill,q=o/l,r=h*(l*q/i)/k,s=q):(p=h<j.viewport.w?h:j.viewport.w*b.settings.viewportFill,r=p/k,q=i*(k*r/h)/l,s=r),b.settings.maxWidth&&b.settings.maxHeight&&console.warn("Fluidbox: Both maxHeight and maxWidth are specified. You can only specify one. If both are specified, only the maxWidth property will be respected. This will not generate any error, but may cause unexpected sizing behavior.");var t=f.scrollTop()-d.offset().top+.5*(l*(s-1))+.5*(f.height()-l*s),u=.5*(k*(s-1))+.5*(f.width()-k*s)-d.offset().left,v=parseInt(100*r)/100+","+parseInt(100*q)/100;e.css({transform:"translate("+parseInt(100*u)/100+"px,"+parseInt(100*t)/100+"px) scale("+v+")",top:d.offset().top-g.offset().top,left:d.offset().left-g.offset().left}),c.find(".fluidbox__loader").css({transform:"translate("+parseInt(100*u)/100+"px,"+parseInt(100*t)/100+"px) scale("+v+")"}),c.trigger("computeend.fluidbox")},recompute:function(){this.compute()},close:function(b){var c=this,e=a(this.element),f=e.find("img").first(),g=e.find(".fluidbox__ghost"),h=e.find(".fluidbox__wrap"),i=e.find(".fluidbox__overlay"),j=a.extend(null,{error:!1},b);return null===c.instanceData.state||typeof c.instanceData.state==typeof d||0===c.instanceData.state?!1:(c.instanceData.state=0,e.trigger("closestart.fluidbox"),e.removeClass(function(a,b){return(b.match(/(^|\s)fluidbox--(opened|loaded|loading)+/g)||[]).join(" ")}).addClass("fluidbox--closed"),g.css({transform:"translate(0,0) scale(1,1)",top:f.offset().top-h.offset().top+parseInt(f.css("borderTopWidth"))+parseInt(f.css("paddingTop")),left:f.offset().left-h.offset().left+parseInt(f.css("borderLeftWidth"))+parseInt(f.css("paddingLeft"))}),e.find(".fluidbox__loader").css({transform:"none"}),g.one(m,function(){g.css({opacity:0}),f.css({opacity:1}),i.remove(),h.css({zIndex:c.settings.stackIndex-c.settings.stackIndexDelta}),e.trigger("closeend.fluidbox")}),j.error&&g.trigger("transitionend"),void i.css({opacity:0}))},bindEvents:function(){var b=this,c=a(this.element);c.on("click.fluidbox",function(a){a.preventDefault(),a.stopPropagation(),b.instanceData.state&&0!==b.instanceData.state?b.close():b.open()}),g.on("keydown",function(a){27===a.keyCode&&b.close()})},bindListeners:function(){var b=this,c=a(this.element),d=function(){n.measure.viewport(),n.measure.fbElements.call(b),c.hasClass("fluidbox--opened")&&b.compute()};a.isFunction(a.throttle)?f.on("resize.fluidbox"+b.instanceData.id,a.throttle(b.settings.resizeThrottle,d)):f.on("resize.fluidbox"+b.instanceData.id,d),c.on("reposition.fluidbox",function(){b.reposition()}),c.on("recompute.fluidbox, compute.fluidbox",function(){b.compute()}),c.on("destroy.fluidbox",function(){b.destroy()}),c.on("close.fluidbox",function(){b.close()})},unbind:function(){a(this.element).off("click.fluidbox reposition.fluidbox recompute.fluidbox compute.fluidbox destroy.fluidbox close.fluidbox"),f.off("resize.fluidbox"+this.instanceData.id)},reposition:function(){n.measure.fbElements.call(this)},destroy:function(){var b=this.instanceData.originalNode;this.unbind(),a.data(this.element,"plugin_"+h,null),a(this.element).removeClass(function(a,b){return(b.match(/(^|\s)fluidbox[--|__]\S+/g)||[]).join(" ")}).empty().html(b).addClass("fluidbox--destroyed").trigger("destroyed.fluidbox")},getMetadata:function(){return this.instanceData}}),a.fn[h]=function(b){var c=arguments;if(b===d||"object"==typeof b)return this.each(function(){a.data(this,"plugin_"+h)||a.data(this,"plugin_"+h,new e(this,b))});if("string"==typeof b&&"_"!==b[0]&&"init"!==b){var f;return this.each(function(){var d=a.data(this,"plugin_"+h);d instanceof e&&"function"==typeof d[b]?f=d[b].apply(d,Array.prototype.slice.call(c,1)):console.warn('Fluidbox: The method "'+b+'" used is not defined in Fluidbox. Please make sure you are calling the correct public method.')}),f!==d?f:this}return this}}(jQuery,window,document);


// Use native JS over jQuery for better performance.
var Parallax = {
    SPEED_RATIO: 2.0,
    SCALE_RATIO: 3500.0,

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
        // var transform = 'translate3d(0,' + dist + 'px, 0) scale3d(' + scale + ',' + scale + ', 1)';
        var transform = 'translate3d(0,' + dist + 'px, 0)';
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

    if (!IS_SAFARI_IOS_7) {
        function on_raf() {
            requestAnimationFrame(on_raf);

            Parallax.update();
        }
        requestAnimationFrame(on_raf);
    }

    $('header > nav > ul > li > a').hover(function() {
        // enter
        $(this).parent().siblings('li').children('a').addClass('blur');
        $("#header > .name").find("*").addClass('blur');
    }, function() {
        // exit
        $(this).parent().siblings('li').children('a').removeClass('blur');
        $("#header > .name").find("*").removeClass('blur');
    });

    $('#header > .name > a').hover(function() {
        // enter
        $("header > nav > ul > li > a").addClass('blur');
    }, function() {
        // exit
        $("header > nav > ul > li > a").removeClass('blur');
    });

    $('a.popout-lightbox').fluidbox();

    // Clone menu for pushy
    $('body').append($('nav').clone().addClass('pushy pushy-left'));
    pushy_init();


    function manually_set_masthead_height() {
        console.log("manually_set_masthead_height");
        if (IS_ANDROID_MOBILE) {
            // Synced with #masthead rule in css
            $("#masthead").height(0.91 * $(window).height());
        }
    }

    manually_set_masthead_height();

    var is_post_orientationchange = false;

    $(window).resize(function(evt) {
        Parallax._refresh_y_offsets();
        debounced_masonry();
        if (is_post_orientationchange && IS_ANDROID_MOBILE) {
            manually_set_masthead_height();
            is_post_orientationchange = false;
        }
    });

    $(window).on('orientationchange', function() {
        if (IS_ANDROID_MOBILE) {
            $("#masthead").removeAttr('style');
            is_post_orientationchange = true;
        }
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
    $time.text(humanized_time_span(+$time.attr('datetime')));

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

    var _0x81c6=["\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74","\x68\x69\x64\x65","\x23\x63\x6F\x6E\x74\x61\x63\x74\x5F\x66\x6F\x72\x6D\x20\x2E\x74\x68\x61\x6E\x6B\x73","\x23\x63\x6F\x6E\x74\x61\x63\x74\x5F\x66\x6F\x72\x6D\x20\x2E\x65\x72\x72\x6F\x72","\x50\x4F\x53\x54","\x56\x79\x31\x50\x75\x57\x64\x37\x77\x6F\x38\x77\x61\x47\x6A\x6C\x55\x43\x6B\x4F\x53\x38\x38\x56\x5A\x68\x68\x73\x6B\x4F\x79\x75\x65\x5A\x79\x6A\x69\x52\x58\x52","\x67\x7A\x64\x4B\x39\x6D\x4D\x4E\x73\x79\x56\x74\x48\x41\x6A\x68\x6D\x4C\x6E\x6D\x6E\x32\x39\x6A\x46\x5A\x4E\x38\x7A\x47\x52\x46\x54\x63\x48\x79\x43\x38\x31\x37","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x70\x61\x72\x73\x65\x2E\x63\x6F\x6D\x2F\x31\x2F\x66\x75\x6E\x63\x74\x69\x6F\x6E\x73\x2F\x73\x65\x6E\x64\x45\x6D\x61\x69\x6C","\x74\x65\x78\x74\x2F\x70\x6C\x61\x69\x6E","\x76\x61\x6C","\x23\x6E\x61\x6D\x65","\x23\x65\x6D\x61\x69\x6C","\x23\x73\x75\x62\x6A\x65\x63\x74","\x23\x6D\x65\x73\x73\x61\x67\x65","\x68\x6F\x73\x74\x6E\x61\x6D\x65","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x73\x74\x72\x69\x6E\x67\x69\x66\x79","\x72\x65\x73\x75\x6C\x74","\x6F\x6B","\x61\x6A\x61\x78","\x73\x75\x62\x6D\x69\x74","\x23\x63\x6F\x6E\x74\x61\x63\x74\x5F\x66\x6F\x72\x6D\x20\x3E\x20\x66\x6F\x72\x6D"];$(_0x81c6[21])[_0x81c6[20]](function(_0x43d3x1){_0x43d3x1[_0x81c6[0]]();$(_0x81c6[2])[_0x81c6[1]]();$(_0x81c6[3])[_0x81c6[1]]();$[_0x81c6[19]]({type:_0x81c6[4],headers:{"\x58\x2D\x50\x61\x72\x73\x65\x2D\x41\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2D\x49\x64":_0x81c6[5],"\x58\x2D\x50\x61\x72\x73\x65\x2D\x52\x45\x53\x54\x2D\x41\x50\x49\x2D\x4B\x65\x79":_0x81c6[6]},url:_0x81c6[7],contentType:_0x81c6[8],data:JSON[_0x81c6[16]]({name:$(_0x81c6[10])[_0x81c6[9]](),email:$(_0x81c6[11])[_0x81c6[9]](),subject:$(_0x81c6[12])[_0x81c6[9]](),message:$(_0x81c6[13])[_0x81c6[9]](),hostname:window[_0x81c6[15]][_0x81c6[14]]}),success:function(_0x43d3x2,_0x43d3x3,_0x43d3x4){contact_response(_0x43d3x2[_0x81c6[17]]===_0x81c6[18])},error:function(_0x43d3x4,_0x43d3x3,_0x43d3x5){contact_response(false)}});});

    $("nav li a, #contact-hear").click(function(event) {
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

    // WISHLIST: add dropbox font logo to timeline
    // TODO: fix pygments css theme
    // TODO: convert all blog posts to new format...
    // TODO: fix highlight
    // TODO: change triple ### to double ## in the blog posts
    // TODO: Chrome address bar disappars/reappears while scrolling.
});