var glob = {
    PARALLAX_SPEED: 3,
    SCROLL_SPEED: 500,
    MENU_SPEED: 500,

    menu_open: false,

    resizeHomeParallax: function() {
        $("#home").height($(window).height());
    },
    updateParallax: function() {
        if ($.browser.mobile) return;
        $(".parallax").each(function(idx) {
            var $banner = $(this);
            var y = -($(window).scrollTop() - $banner.position().top) / glob.PARALLAX_SPEED;
            $banner.css({
                backgroundPosition: 'center ' + y + 'px',
            });
        });
    },
    updateScrollNotifier: function() {
        if ($(window).scrollTop() != 0) {
            $("#scroll-notifier").hide();
        }
        else {
            $("#scroll-notifier").show();
        }
    },
    updateHomeShoutout: function() {
        $("#home-shoutout").css({
            top: ($(window).height() / 2) + 'px',
            marginTop: -($("#home-shoutout").height() / 2) + 'px'
        });
    },
    toggleNav: function() {
        var $a = $(".navicon-button");
        $a.find(".navicon").toggleClass('x');
        glob.menu_open = !glob.menu_open;
        $("#header").toggleClass('hide-nav', !glob.menu_open);
    },
    isScrolledIntoView: function(elem)
    {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).position().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
};


$(document).ready(function() {
    glob.resizeHomeParallax();
    glob.updateParallax();
    glob.updateScrollNotifier();
    glob.updateHomeShoutout();

    $("#header a, .scrollup a").click(function(event) {
        var $a = $(this);
        if ($a.attr('href') != null && $a.attr('href')[0] == '#') {
            if (glob.menu_open) {
                glob.toggleNav();
            }
            $('html, body').stop().animate({
                scrollTop: $($a.attr('href')).offset().top - $("#header").height()
            }, glob.SCROLL_SPEED, 'easeInOutExpo');
            event.preventDefault();
        }
    });

    $(".navicon-button").click(function(event) {
        glob.toggleNav();
    });

    $(window).scroll(function(event) {
        glob.updateParallax();
        glob.updateScrollNotifier();
    });
    $(window).resize(function(event) {
        if (!$.browser.mobile) {
            glob.resizeHomeParallax();
            glob.updateHomeShoutout();
        }
    });
    $(window).bind('orientationchange', function(event) {
        glob.updateHomeShoutout();
        glob.resizeHomeParallax();
    });
});