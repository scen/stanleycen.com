(function () {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-4253037-6']);
    _gaq.push(['_setDomainName', 'stanleycen.com']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();
})();

(function () {
    var _paq = _paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function () {
        var u = (("https:" == document.location.protocol) ? "https" : "http") + "://analytics.stanleycen.com//";
        _paq.push(['setTrackerUrl', u + 'piwik.php']);
        _paq.push(['setSiteId', 1]);
        var d = document,
            g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0];
        g.type = 'text/javascript';
        g.defer = true;
        g.async = true;
        g.src = u + 'piwik.js';
        s.parentNode.insertBefore(g, s);
    })();
})();