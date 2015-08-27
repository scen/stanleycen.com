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

function whichTransitionEvent(){var a,b=document.createElement("fakeelement"),c={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(a in c)if(void 0!==b.style[a])return c[a]}!function(a,b){var c=function(a,b,c){var d;return function(){function g(){c||a.apply(e,f),d=null}var e=this,f=arguments;d?clearTimeout(d):c&&a.apply(e,f),d=setTimeout(g,b||100)}};jQuery.fn[b]=function(a){return a?this.bind("resize",c(a)):this.trigger(b)}}(jQuery,"smartresize");var customTransitionEnd=whichTransitionEvent();!function(a){var b=0;a.fn.fluidbox=function(c){var d=a.extend(!0,{viewportFill:.95,debounceResize:!0,stackIndex:1e3,stackIndexDelta:10,closeTrigger:[{selector:".fluidbox-overlay",event:"click"},{selector:"document",event:"keyup",keyCode:27}],immediateOpen:!1,loadingEle:!0},c),e=["keyup","keydown","keypress"];d.stackIndex<d.stackIndexDelta&&(d.stackIndexDelta=d.stackIndex),$fbOverlay=a("<div />",{"class":"fluidbox-overlay",css:{"z-index":d.stackIndex}});var h,f=this,g=a(window),i=function(b){a(b+".fluidbox-opened").trigger("click")},j=function(b,c){var e=b.find("img").first(),f=b.find(".fluidbox-ghost"),i=b.find(".fluidbox-loader"),j=b.find(".fluidbox-wrap"),k=b.data(),l=0,m=0;e.data().imgRatio=k.natWidth/k.natHeight,h>e.data().imgRatio?(l=k.natHeight<g.height()*d.viewportFill?k.natHeight:g.height()*d.viewportFill,k.imgScale=l/e.height(),k.imgScaleY=k.imgScale,k.imgScaleX=k.natWidth*(e.height()*k.imgScaleY/k.natHeight)/e.width()):(m=k.natWidth<g.width()*d.viewportFill?k.natWidth:g.width()*d.viewportFill,k.imgScale=m/e.width(),k.imgScaleX=k.imgScale,k.imgScaleY=k.natHeight*(e.width()*k.imgScaleX/k.natWidth)/e.height());var n=g.scrollTop()-e.offset().top+.5*e.data("imgHeight")*(e.data("imgScale")-1)+.5*(g.height()-e.data("imgHeight")*e.data("imgScale")),o=.5*e.data("imgWidth")*(e.data("imgScale")-1)+.5*(g.width()-e.data("imgWidth")*e.data("imgScale"))-e.offset().left,p=parseInt(1e3*k.imgScaleX)/1e3+","+parseInt(1e3*k.imgScaleY)/1e3;f.add(i).css({transform:"translate("+parseInt(10*o)/10+"px,"+parseInt(10*n)/10+"px) scale("+p+")",top:e.offset().top-j.offset().top,left:e.offset().left-j.offset().left}),f.one(customTransitionEnd,function(){a.each(c,function(a,c){b.trigger(c)})})},k=function(a){function j(){i.imgWidth=b.width(),i.imgHeight=b.height(),i.imgRatio=b.width()/b.height(),c.add(e).css({width:b.width(),height:b.height(),top:b.offset().top-f.offset().top+parseInt(b.css("borderTopWidth"))+parseInt(b.css("paddingTop")),left:b.offset().left-f.offset().left+parseInt(b.css("borderLeftWidth"))+parseInt(b.css("paddingLeft"))}),i.imgScale=h>i.imgRatio?g.height()*d.viewportFill/b.height():g.width()*d.viewportFill/b.width()}if(h=g.width()/g.height(),a.hasClass("fluidbox")){var b=a.find("img").first(),c=a.find(".fluidbox-ghost"),e=a.find(".fluidbox-loader"),f=a.find(".fluidbox-wrap"),i=b.data();j(),b.load(j)}},l=function(b){if(a(this).hasClass("fluidbox")){var c=a(this),e=a(this).find("img").first(),f=a(this).find(".fluidbox-ghost"),g=a(this).find(".fluidbox-loader"),h=a(this).find(".fluidbox-wrap"),i=encodeURI(c.attr("href")),k={},l=function(){c.trigger("openstart"),c.append($fbOverlay).data("fluidbox-state",1).removeClass("fluidbox-closed").addClass("fluidbox-opened"),k.close&&window.clearTimeout(k.close),k.open=window.setTimeout(function(){a(".fluidbox-overlay").css({opacity:1})},10),a(".fluidbox-wrap").css({zIndex:d.stackIndex-d.stackIndexDelta-1}),h.css({"z-index":d.stackIndex+d.stackIndexDelta})},m=function(){c.trigger("closestart"),c.data("fluidbox-state",0).removeClass("fluidbox-opened fluidbox-loaded fluidbox-loading").addClass("fluidbox-closed"),k.open&&window.clearTimeout(k.open),k.close=window.setTimeout(function(){a(".fluidbox-overlay").remove(),h.css({"z-index":d.stackIndex-d.stackIndexDelta})},10),a(".fluidbox-overlay").css({opacity:0}),f.add(g).css({transform:"translate(0,0) scale(1,1)",opacity:0,top:e.offset().top-h.offset().top+parseInt(e.css("borderTopWidth"))+parseInt(e.css("paddingTop")),left:e.offset().left-h.offset().left+parseInt(e.css("borderLeftWidth"))+parseInt(e.css("paddingLeft"))}),f.one(customTransitionEnd,function(){c.trigger("closeend")}),e.css({opacity:1})};0!==a(this).data("fluidbox-state")&&a(this).data("fluidbox-state")?m():(c.addClass("fluidbox-loading"),e.css({opacity:0}),f.css({"background-image":"url("+e.attr("src")+")",opacity:1}),d.immediateOpen?(c.data("natWidth",e[0].naturalWidth).data("natHeight",e[0].naturalHeight),l(),j(c,["openend"]),a("<img />",{src:i}).load(function(){c.trigger("imageloaddone").trigger("delayedloaddone").removeClass("fluidbox-loading").addClass("fluidbox-loaded").data("natWidth",a(this)[0].naturalWidth).data("natHeight",a(this)[0].naturalHeight),f.css({"background-image":"url("+i+")"}),j(c,["delayedreposdone"])}).error(function(){c.trigger("imageloadfail"),m()})):a("<img />",{src:i}).load(function(){c.trigger("imageloaddone").removeClass("fluidbox-loading").addClass("fluidbox-loaded").data("natWidth",a(this)[0].naturalWidth).data("natHeight",a(this)[0].naturalHeight),d.immediateOpen=!0,f.css({"background-image":"url("+i+")"}),l(),j(c,["openend"])}).error(function(){c.trigger("imageloadfail"),m()})),b.preventDefault()}},m=function(b){b?k(b):f.each(function(){k(a(this))});var c=a("a.fluidbox.fluidbox-opened");c.length>0&&j(c,["resizeend"])};return d.debounceResize?a(window).smartresize(function(){m()}):a(window).resize(function(){m()}),f.each(function(){if(a(this).is("a")&&1===a(this).children().length&&a(this).children().is("img")&&"none"!==a(this).css("display")&&"none"!==a(this).parents().css("display")){var f=a("<div />",{"class":"fluidbox-wrap",css:{"z-index":d.stackIndex-d.stackIndexDelta}}),h=a("<div />",{"class":"fluidbox-loader"});b+=1;var j=a(this);j.addClass("fluidbox fluidbox-closed").attr("id","fluidbox-"+b).wrapInner(f).find("img").first().css({opacity:1}).after('<div class="fluidbox-ghost" />').each(function(){var b=a(this);b.width()>0&&b.height()>0?(k(j),j.click(l)):b.load(function(){k(j),j.click(l),j.trigger("thumbloaddone")}).error(function(){j.trigger("thumbloadfail")})}),d.loadingEle&&j.find(".fluidbox-ghost").after(h),a(this).on("recompute",function(){m(a(this)),a(this).trigger("recomputeend")});var n="#fluidbox-"+b;d.closeTrigger&&a.each(d.closeTrigger,function(b){var c=d.closeTrigger[b];"window"!=c.selector?"document"==c.selector&&(c.keyCode&&e.indexOf(c.event)>-1?a(document).on(c.event,function(a){a.keyCode==c.keyCode&&i(n)}):a(document).on(c.event,n,function(){i(n)})):g.on(c.event,function(){i(n)})})}}),f}}(jQuery);

// Masonry

!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c("object"==typeof exports?require("jquery"):a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(window),function(){function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:e.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a){function b(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function c(){}function d(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=g.length;c>b;b++){var d=g[b];a[d]=0}return a}function e(c){function e(){if(!m){m=!0;var d=a.getComputedStyle;if(j=function(){var a=d?function(a){return d(a,null)}:function(a){return a.currentStyle};return function(b){var c=a(b);return c||f("Style returned "+c+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),c}}(),k=c("boxSizing")){var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style[k]="border-box";var g=document.body||document.documentElement;g.appendChild(e);var h=j(e);l=200===b(h.width),g.removeChild(e)}}}function h(a){if(e(),"string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var c=j(a);if("none"===c.display)return d();var f={};f.width=a.offsetWidth,f.height=a.offsetHeight;for(var h=f.isBorderBox=!(!k||!c[k]||"border-box"!==c[k]),m=0,n=g.length;n>m;m++){var o=g[m],p=c[o];p=i(a,p);var q=parseFloat(p);f[o]=isNaN(q)?0:q}var r=f.paddingLeft+f.paddingRight,s=f.paddingTop+f.paddingBottom,t=f.marginLeft+f.marginRight,u=f.marginTop+f.marginBottom,v=f.borderLeftWidth+f.borderRightWidth,w=f.borderTopWidth+f.borderBottomWidth,x=h&&l,y=b(c.width);y!==!1&&(f.width=y+(x?0:r+v));var z=b(c.height);return z!==!1&&(f.height=z+(x?0:s+w)),f.innerWidth=f.width-(r+v),f.innerHeight=f.height-(s+w),f.outerWidth=f.width+t,f.outerHeight=f.height+u,f}}function i(b,c){if(a.getComputedStyle||-1===c.indexOf("%"))return c;var d=b.style,e=d.left,f=b.runtimeStyle,g=f&&f.left;return g&&(f.left=b.currentStyle.left),d.left=c,c=d.pixelLeft,d.left=e,g&&(f.left=g),c}var j,k,l,m=!1;return h}var f="undefined"==typeof console?c:function(a){console.error(a)},g=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],e):"object"==typeof exports?module.exports=e(require("desandro-get-style-property")):a.getSize=e(a.getStyleProperty)}(window),function(a){function b(a){"function"==typeof a&&(b.isReady?a():g.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==f.readyState;b.isReady||c||d()}function d(){b.isReady=!0;for(var a=0,c=g.length;c>a;a++){var d=g[a];d()}}function e(e){return"complete"===f.readyState?d():(e.bind(f,"DOMContentLoaded",c),e.bind(f,"readystatechange",c),e.bind(a,"load",c)),b}var f=a.document,g=[];b.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],e):"object"==typeof exports?module.exports=e(require("eventie")):a.docReady=e(a.eventie)}(window),function(a){function b(a,b){return a[g](b)}function c(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function d(a,b){c(a);for(var d=a.parentNode.querySelectorAll(b),e=0,f=d.length;f>e;e++)if(d[e]===a)return!0;return!1}function e(a,d){return c(a),b(a,d)}var f,g=function(){if(a.matches)return"matches";if(a.matchesSelector)return"matchesSelector";for(var b=["webkit","moz","ms","o"],c=0,d=b.length;d>c;c++){var e=b[c],f=e+"MatchesSelector";if(a[f])return f}}();if(g){var h=document.createElement("div"),i=b(h,"div");f=i?b:e}else f=d;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return f}):"object"==typeof exports?module.exports=f:window.matchesSelector=f}(Element.prototype),function(a,b){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(c,d){return b(a,c,d)}):"object"==typeof exports?module.exports=b(a,require("doc-ready"),require("desandro-matches-selector")):a.fizzyUIUtils=b(a,a.docReady,a.matchesSelector)}(window,function(a,b,c){var d={};d.extend=function(a,b){for(var c in b)a[c]=b[c];return a},d.modulo=function(a,b){return(a%b+b)%b};var e=Object.prototype.toString;d.isArray=function(a){return"[object Array]"==e.call(a)},d.makeArray=function(a){var b=[];if(d.isArray(a))b=a;else if(a&&"number"==typeof a.length)for(var c=0,e=a.length;e>c;c++)b.push(a[c]);else b.push(a);return b},d.indexOf=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},d.removeFrom=function(a,b){var c=d.indexOf(a,b);-1!=c&&a.splice(c,1)},d.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1==a.nodeType&&"string"==typeof a.nodeName},d.setText=function(){function a(a,c){b=b||(void 0!==document.documentElement.textContent?"textContent":"innerText"),a[b]=c}var b;return a}(),d.getParent=function(a,b){for(;a!=document.body;)if(a=a.parentNode,c(a,b))return a},d.getQueryElement=function(a){return"string"==typeof a?document.querySelector(a):a},d.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},d.filterFindElements=function(a,b){a=d.makeArray(a);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f];if(d.isElement(h))if(b){c(h,b)&&e.push(h);for(var i=h.querySelectorAll(b),j=0,k=i.length;k>j;j++)e.push(i[j])}else e.push(h)}return e},d.debounceMethod=function(a,b,c){var d=a.prototype[b],e=b+"Timeout";a.prototype[b]=function(){var a=this[e];a&&clearTimeout(a);var b=arguments,f=this;this[e]=setTimeout(function(){d.apply(f,b),delete f[e]},c||100)}},d.toDashed=function(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()};var f=a.console;return d.htmlInit=function(c,e){b(function(){for(var b=d.toDashed(e),g=document.querySelectorAll(".js-"+b),h="data-"+b+"-options",i=0,j=g.length;j>i;i++){var k,l=g[i],m=l.getAttribute(h);try{k=m&&JSON.parse(m)}catch(n){f&&f.error("Error parsing "+h+" on "+l.nodeName.toLowerCase()+(l.id?"#"+l.id:"")+": "+n);continue}var o=new c(l,k),p=a.jQuery;p&&p.data(l,e,o)}})},d}),function(a,b){"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(c,d,e,f){return b(a,c,d,e,f)}):"object"==typeof exports?module.exports=b(a,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils")):(a.Outlayer={},a.Outlayer.Item=b(a,a.EventEmitter,a.getSize,a.getStyleProperty,a.fizzyUIUtils))}(window,function(a,b,c,d,e){function f(a){for(var b in a)return!1;return b=null,!0}function g(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}function h(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}var i=a.getComputedStyle,j=i?function(a){return i(a,null)}:function(a){return a.currentStyle},k=d("transition"),l=d("transform"),m=k&&l,n=!!d("perspective"),o={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[k],p=["transform","transition","transitionDuration","transitionProperty"],q=function(){for(var a={},b=0,c=p.length;c>b;b++){var e=p[b],f=d(e);f&&f!==e&&(a[e]=f)}return a}();e.extend(g.prototype,b.prototype),g.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.getSize=function(){this.size=c(this.element)},g.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=q[c]||c;b[d]=a[c]}},g.prototype.getPosition=function(){var a=j(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=a[c?"left":"right"],f=a[d?"top":"bottom"],g=parseInt(e,10),h=parseInt(f,10),i=this.layout.size;g=-1!=e.indexOf("%")?g/100*i.width:g,h=-1!=f.indexOf("%")?h/100*i.height:h,g=isNaN(g)?0:g,h=isNaN(h)?0:h,g-=c?i.paddingLeft:i.paddingRight,h-=d?i.paddingTop:i.paddingBottom,this.position.x=g,this.position.y=h},g.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={},d=b.isOriginLeft?"paddingLeft":"paddingRight",e=b.isOriginLeft?"left":"right",f=b.isOriginLeft?"right":"left",g=this.position.x+a[d];c[e]=this.getXValue(g),c[f]="";var h=b.isOriginTop?"paddingTop":"paddingBottom",i=b.isOriginTop?"top":"bottom",j=b.isOriginTop?"bottom":"top",k=this.position.y+a[h];c[i]=this.getYValue(k),c[j]="",this.css(c),this.emitEvent("layout",[this])},g.prototype.getXValue=function(a){var b=this.layout.options;return b.percentPosition&&!b.isHorizontal?a/this.layout.size.width*100+"%":a+"px"},g.prototype.getYValue=function(a){var b=this.layout.options;return b.percentPosition&&b.isHorizontal?a/this.layout.size.height*100+"%":a+"px"},g.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={};j.transform=this.getTranslate(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},g.prototype.getTranslate=function(a,b){var c=this.layout.options;return a=c.isOriginLeft?a:-a,b=c.isOriginTop?b:-b,a=this.getXValue(a),b=this.getYValue(b),n?"translate3d("+a+", "+b+", 0)":"translate("+a+", "+b+")"},g.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},g.prototype.moveTo=m?g.prototype._transitionTo:g.prototype.goTo,g.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},g.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},g.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var r="opacity,"+h(q.transform||"transform");g.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:r,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(o,this,!1))},g.prototype.transition=g.prototype[k?"_transition":"_nonTransition"],g.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},g.prototype.onotransitionend=function(a){this.ontransitionend(a)};var s={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};g.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,c=s[a.propertyName]||a.propertyName;if(delete b.ingProperties[c],f(b.ingProperties)&&this.disableTransition(),c in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[c]),c in b.onEnd){var d=b.onEnd[c];d.call(this),delete b.onEnd[c]}this.emitEvent("transitionEnd",[this])}},g.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(o,this,!1),this.isTransitioning=!1},g.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var t={transitionProperty:"",transitionDuration:""};return g.prototype.removeTransitionStyles=function(){this.css(t)},g.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},g.prototype.remove=function(){if(!k||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.once("transitionEnd",function(){a.removeElem()}),this.hide()},g.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("visibleStyle");b[c]=this.onRevealTransitionEnd,this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},g.prototype.getHideRevealTransitionEndProperty=function(a){var b=this.layout.options[a];if(b.opacity)return"opacity";for(var c in b)return c},g.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options,b={},c=this.getHideRevealTransitionEndProperty("hiddenStyle");b[c]=this.onHideTransitionEnd,this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:b})},g.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},g.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},g}),function(a,b){"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(c,d,e,f,g){return b(a,c,d,e,f,g)}):"object"==typeof exports?module.exports=b(a,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):a.Outlayer=b(a,a.eventie,a.EventEmitter,a.getSize,a.fizzyUIUtils,a.Outlayer.Item)}(window,function(a,b,c,d,e,f){function g(a,b){var c=e.getQueryElement(a);if(!c)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(c||a)));this.element=c,i&&(this.$element=i(this.element)),this.options=e.extend({},this.constructor.defaults),this.option(b);var d=++k;this.element.outlayerGUID=d,l[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var h=a.console,i=a.jQuery,j=function(){},k=0,l={};return g.namespace="outlayer",g.Item=f,g.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e.extend(g.prototype,c.prototype),g.prototype.option=function(a){e.extend(this.options,a)},g.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},g.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},g.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},g.prototype._filterFindItemElements=function(a){return e.filterFindElements(a,this.options.itemSelector)},g.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},g.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},g.prototype._init=g.prototype.layout,g.prototype._resetLayout=function(){this.getSize()},g.prototype.getSize=function(){this.size=d(this.element)},g.prototype._getMeasurement=function(a,b){var c,f=this.options[a];f?("string"==typeof f?c=this.element.querySelector(f):e.isElement(f)&&(c=f),this[a]=c?d(c)[b]:f):this[a]=0},g.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},g.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},g.prototype._layoutItems=function(a,b){if(this._emitCompleteOnItems("layout",a),a&&a.length){for(var c=[],d=0,e=a.length;e>d;d++){var f=a[d],g=this._getItemLayoutPosition(f);g.item=f,g.isInstant=b||f.isLayoutInstant,c.push(g)}this._processLayoutQueue(c)}},g.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},g.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},g.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},g.prototype._postLayout=function(){this.resizeContainer()},g.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},g.prototype._getContainerSize=j,g.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},g.prototype._emitCompleteOnItems=function(a,b){function c(){e.dispatchEvent(a+"Complete",null,[b])}function d(){g++,g===f&&c()}var e=this,f=b.length;if(!b||!f)return void c();for(var g=0,h=0,i=b.length;i>h;h++){var j=b[h];j.once(a,d)}},g.prototype.dispatchEvent=function(a,b,c){var d=b?[b].concat(c):c;if(this.emitEvent(a,d),i)if(this.$element=this.$element||i(this.element),b){var e=i.Event(b);e.type=a,this.$element.trigger(e,c)}else this.$element.trigger(a,c)},g.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},g.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},g.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},g.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e.removeFrom(this.stamps,d),this.unignore(d)}},g.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=e.makeArray(a)):void 0},g.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},g.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},g.prototype._manageStamp=j,g.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,e=d(a),f={left:b.left-c.left-e.marginLeft,top:b.top-c.top-e.marginTop,right:c.right-b.right-e.marginRight,bottom:c.bottom-b.bottom-e.marginBottom};return f},g.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},g.prototype.bindResize=function(){this.isResizeBound||(b.bind(a,"resize",this),this.isResizeBound=!0)},g.prototype.unbindResize=function(){this.isResizeBound&&b.unbind(a,"resize",this),this.isResizeBound=!1},g.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},g.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},g.prototype.needsResizeLayout=function(){var a=d(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},g.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},g.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},g.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},g.prototype.reveal=function(a){this._emitCompleteOnItems("reveal",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.reveal()}},g.prototype.hide=function(a){this._emitCompleteOnItems("hide",a);for(var b=a&&a.length,c=0;b&&b>c;c++){var d=a[c];d.hide()}},g.prototype.revealItemElements=function(a){var b=this.getItems(a);this.reveal(b)},g.prototype.hideItemElements=function(a){var b=this.getItems(a);this.hide(b)},g.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},g.prototype.getItems=function(a){a=e.makeArray(a);for(var b=[],c=0,d=a.length;d>c;c++){var f=a[c],g=this.getItem(f);g&&b.push(g)}return b},g.prototype.remove=function(a){var b=this.getItems(a);if(this._emitCompleteOnItems("remove",b),b&&b.length)for(var c=0,d=b.length;d>c;c++){var f=b[c];f.remove(),e.removeFrom(this.items,f)}},g.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize();var e=this.element.outlayerGUID;delete l[e],delete this.element.outlayerGUID,i&&i.removeData(this.element,this.constructor.namespace)},g.data=function(a){a=e.getQueryElement(a);var b=a&&a.outlayerGUID;return b&&l[b]},g.create=function(a,b){function c(){g.apply(this,arguments)}return Object.create?c.prototype=Object.create(g.prototype):e.extend(c.prototype,g.prototype),c.prototype.constructor=c,c.defaults=e.extend({},g.defaults),e.extend(c.defaults,b),c.prototype.settings={},c.namespace=a,c.data=g.data,c.Item=function(){f.apply(this,arguments)},c.Item.prototype=new f,e.htmlInit(c,a),i&&i.bridget&&i.bridget(a,c),c},g.Item=f,g}),function(a,b){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],b):"object"==typeof exports?module.exports=b(require("outlayer"),require("get-size"),require("fizzy-ui-utils")):a.Masonry=b(a.Outlayer,a.getSize,a.fizzyUIUtils)}(window,function(a,b,c){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}var d=this.columnWidth+=this.gutter,e=this.containerWidth+this.gutter,f=e/d,g=d-e%d,h=g&&1>g?"round":"floor";f=Math[h](f),this.cols=Math.max(f,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c.indexOf(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d});

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
        var transform = 'translate3d(0,' + dist + 'px, 0) scale3d(' + scale + ',' + scale + ', 1)';
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
        console.log("refreshing offsets");
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
    }, function() {
        // exit
        $(this).parent().siblings('li').children('a').removeClass('blur');
    });

    $('a.popout-lightbox').fluidbox();

    // Clone menu for pushy
    $('body').append($('nav').clone().addClass('pushy pushy-left'));
    pushy_init();

    $posts = $('.posts-wrap');

    $posts = $posts.masonry({
        itemSelector: '.blog-masonry-post',
    });
    var debounced_masonry = debounce(function() {
        $posts.masonry();
    }, 300);

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
        console.log("orientationchange");
        $("#masthead").removeAttr('style');
        is_post_orientationchange = true;
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

    // TODO: make a favicon
    // WISHLIST: add dropbox font logo to timeline
    // TODO: fix pygments css theme
    // TODO: convert all blog posts to new format...
    // TODO: fix highlight
    // TODO: change triple ### to double ## in the blog posts
    // TODO: Chrome address bar disappars/reappears while scrolling.
});