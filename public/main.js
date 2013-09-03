$(document).ready(function() {
    $('a.popout-lightbox').fancybox({
        // padding: 0,
        openEffect: 'elastic',
        // openSpeed: 150,
        closeEffect: 'elastic',
        // closeSpeed: 150,
        closeClick: true,
        openEasing: 'easeOutBack',
        closingEasing: 'easeInBack',
        helpers: {
            // overlay: null
        }
    });
});
