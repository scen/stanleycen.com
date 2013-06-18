$(document).ready(function() {
	console.log("running");
    $('a.lightbox').fancybox({
        padding: 0,
        openEffect: 'elastic',
        openSpeed: 150,
        closeEffect: 'elastic',
        closeSpeed: 150
    });
});