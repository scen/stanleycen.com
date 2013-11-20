var glob = {
    PARALLAX_SPEED: 3,
    SCROLL_SPEED: 500,
    MENU_SPEED: 500,

    menu_open: false,

    resizeHomeParallax: function() {
        $("#home_internal").height($(window).height());
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
    scrollTo: function(to)
    {
        $('html, body').stop().animate({
            scrollTop: $(to + "_internal").offset().top - $("#header").height()
            }, glob.SCROLL_SPEED, 'easeInOutExpo');
    }
};


$(document).ready(function() {
    glob.resizeHomeParallax();
    glob.updateScrollNotifier();
    glob.updateHomeShoutout();

    $("#project-slider").royalSlider({
        arrowsNav: true,
        loopRewind: true,
        keyboardNavEnabled: true,
        controlsInside: true,
        arrowsNavAutoHide: false,
        arrowsNavHideOnTouch: true,
        autoScaleSlider: true,
        numImagesToPreload: 1,
        controlNavigation: "bullets",
        navigateByClick: true,
        transitionType: "move",
        globalCaption: false,
        slidesSpacing: 4,
        imageScalePadding: 0,
        imgWidth: 1840,
        imgHeight: 900
    });

    $("#header a, .scrollup a").click(function(event) {
        var $a = $(this);
        if ($a.attr('href') != null && $a.attr('href')[0] == '#') {
            if (glob.menu_open) {
                glob.toggleNav();
            }
            glob.scrollTo($a.attr('href'));
            event.preventDefault();
        }
    });

    $(".navicon-button").click(function(event) {
        glob.toggleNav();
    });

    $("#submit_message").click(function(evt) {
        $("#send-error").hide();
        $("#contact_form").ajaxSubmit({
            success: function(res) {
                if (res == "success") {
                    $("#submit_message").addClass("bueno");
                    $("#submit_message").text("Message sent!");
                    $("#contact_form :input").prop("disabled", true);
                }
                else {
                    $("#send-error").fadeIn(200);
                }
            }
        });

        evt.preventDefault();
        return false;
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

    if (location.hash != "" && location.hash[0] == '#') {
        glob.scrollTo(location.hash);
        history.pushState("", document.title, window.location.pathname);
    }
    glob.updateParallax();

    $('a.popout-lightbox').fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic',
        closeClick: true,
        openEasing: 'easeOutBack',
        closingEasing: 'easeInBack',
        helpers : { overlay : { locked : false } }
    });
});