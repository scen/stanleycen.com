var glob={PARALLAX_SPEED:3,SCROLL_SPEED:500,MENU_SPEED:500,menu_open:!1,resizeHomeParallax:function(){$("#home_internal").height($(window).height())},updateParallax:function(){glob.shouldParallax()&&$(".parallax").each(function(){var $banner=$(this),y=-($(window).scrollTop()-$banner.position().top)/glob.PARALLAX_SPEED;$banner.css({backgroundPosition:"center "+y+"px"})})},updateScrollNotifier:function(){0!=$(window).scrollTop()?$("#scroll-notifier").hide():$("#scroll-notifier").show()},updateHomeShoutout:function(){$("#home-shoutout").css({top:$(window).height()/2+"px",marginTop:-($("#home-shoutout").height()/2)+"px"})},toggleNav:function(){var $a=$(".navicon-button");$a.find(".navicon").toggleClass("x"),glob.menu_open=!glob.menu_open,$("#header").toggleClass("hide-nav",!glob.menu_open)},scrollTo:function(to){$("html, body").stop().animate({scrollTop:$(to+"_internal").offset().top-$("#header").height()},glob.SCROLL_SPEED,"easeInOutExpo")},shouldParallax:function(){return!$.browser.mobile}};$(document).ready(function(){glob.resizeHomeParallax(),glob.updateScrollNotifier(),glob.updateHomeShoutout(),glob.shouldParallax()||$(".parallax").css({backgroundAttachment:"scroll"}),$("#header a, .scrollup a").click(function(event){var $a=$(this);null!=$a.attr("href")&&"#"==$a.attr("href")[0]&&(glob.menu_open&&glob.toggleNav(),glob.scrollTo($a.attr("href")),event.preventDefault())}),$(".navicon-button").click(function(){glob.toggleNav()}),$("#submit_message").click(function(evt){$("#send-error").hide();var old=$("#salt").val();return $("#salt").val(CryptoJS.SHA1($("#salt").val())),$("#contact_form").ajaxSubmit({success:function(res){"success"==res?($("#submit_message").addClass("bueno"),$("#submit_message").text("Message sent!"),$("#contact_form :input").prop("disabled",!0)):($("#send-error").fadeIn(200),$("#salt").val(old))}}),evt.preventDefault(),!1}),$(window).scroll(function(){glob.updateParallax(),glob.updateScrollNotifier()}),$(window).resize(function(){$.browser.mobile||(glob.resizeHomeParallax(),glob.updateHomeShoutout())}),$(window).bind("orientationchange",function(){glob.updateHomeShoutout(),glob.resizeHomeParallax()}),""!=location.hash&&"#"==location.hash[0]&&(glob.scrollTo(location.hash),history.pushState("",document.title,window.location.pathname)),glob.updateParallax(),$("a.popout-lightbox").fancybox({openEffect:"elastic",closeEffect:"elastic",closeClick:!0,openEasing:"easeOutBack",closingEasing:"easeInBack",helpers:{overlay:{locked:!1}}})});var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;return a&&c.mixIn(a),c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)}),c.init.prototype=c,c.$super=this,c},create:function(){var a=this.extend();return a.init.apply(a,arguments),a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[],this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;if(a=a.sigBytes,this.clamp(),d%4)for(var b=0;a>b;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;a>b;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);return this.sigBytes+=a,this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<32-8*(c%4),a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);return a.words=this.words.slice(0),a},random:function(a){for(var c=[],b=0;a>b;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;a>d;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16)),b.push((15&f).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;c>d;d+=2)b[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;a>d;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;c>d;d++)b[d>>>2]|=(255&a.charCodeAt(d))<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data")}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init,this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a)),this._data.concat(a),this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((0|h)-this._minBufferSize,0);if(a=h*f,d=e.min(4*a,d),a){for(var g=0;a>g;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a),c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);return a._data=this._data.clone(),a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a),this.reset()},reset:function(){k.reset.call(this),this._doReset()},update:function(a){return this._append(a),this._process(),this},finalize:function(a){return a&&this._append(a),this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return new a.init(b).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return new s.HMAC.init(a,f).finalize(b)}}});var s=p.algo={};return p}(Math);!function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=0|f[n+a];else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a],c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^k)-899497514),j=k,k=e,e=g<<30|g>>>2,g=h,h=c}b[0]=b[0]+h|0,b[1]=b[1]+g|0,b[2]=b[2]+e|0,b[3]=b[3]+k|0,b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;return e[h>>>5]|=128<<24-h%32,e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296),e[(h+64>>>9<<4)+15]=b,f.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var e=j.clone.call(this);return e._hash=this._hash.clone(),e}});e.SHA1=j._createHelper(m),e.HmacSHA1=j._createHmacHelper(m)}();