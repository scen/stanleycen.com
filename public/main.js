$(document).ready(function() {
    $('a.lightbox').fancybox({
        padding: 0,
        openEffect: 'elastic',
        openSpeed: 150,
        closeEffect: 'elastic',
        closeSpeed: 150,
        closeClick: true,
        helpers: {
            overlay: null
        }
    });
    $('a.lightbox.center').wrap("<div style='text-align: center;'>");
});
