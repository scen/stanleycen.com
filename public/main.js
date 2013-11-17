var glob = {
    PARALLAX_SPEED: 3,
    SCROLL_SPEED: 500,

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
    }
};

$(document).ready(function() {

    glob.resizeHomeParallax();
    glob.updateParallax();
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