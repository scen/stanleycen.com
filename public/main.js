var glob = {
    PARALLAX_SPEED: 3,
    SCROLL_SPEED: 500,

    resizeHomeParallax: function() {
        $("#home").height($(window).height());
    },
    updateHomeParallax: function() {
        if ($.browser.mobile) return;
        var y = -$(window).scrollTop() / glob.PARALLAX_SPEED;
        $("#home").css({
            backgroundPosition: 'center ' + y + 'px',
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
    }
};

$(document).ready(function() {

    glob.resizeHomeParallax();
    glob.updateHomeParallax();
    glob.updateScrollNotifier();
    glob.updateHomeShoutout();

    $("#header > nav > a").click(function(event) {
        var $a = $(this);
        if ($a.attr('href')[0] == '#') {
            $('html, body').stop().animate({
                scrollTop: $($a.attr('href')).offset().top - $("#header").height()
            }, glob.SCROLL_SPEED, 'easeInOutExpo');
            event.preventDefault();
        }
    });

    $(window).scroll(function(event) {
        glob.updateHomeParallax();
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