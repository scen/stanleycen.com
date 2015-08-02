!function($){"use strict";/**
	 *
	 * RoyalSlider Deep Linking Module
	 * @version 1.0.6 + jQuery hashchange plugin v1.3 Copyright (c) 2010 Ben Alman:
   *
   * 1.0.1:
   * - Added timeout before hash changes to 750ms to avoid reloading animation.
   *
   * 1.0.2:
   * - Added multiple slider with hash support
   *
   * 1.0.3
   * - Removed hashchange listener on destroy()
   *
   * 1.0.4
   * - Decreased timeout from 750 to 400ms
   *
   * 1.0.5
   * - History state is now replaced instead of pushing to avoid back button confusion
   * - jQuery 1.9.0 compability
   *
   * 1.0.6
   * - Namespaced hashchange event
   *
   * 1.0.7
   * - Multiple sliders on one page
	 */
$.extend($.rsProto,{_initDeeplinking:function(){var isBlocked,hashTimeout,hashChangeTimeout,self=this;if(self._hashDefaults={enabled:!1,change:!1,prefix:""},self.st.deeplinking=$.extend({},self._hashDefaults,self.st.deeplinking),self.st.deeplinking.enabled){var hashChange=self.st.deeplinking.change,pText=self.st.deeplinking.prefix,prefix="#"+pText,getSlideIdByHash=function(){var hash=window.location.hash;return hash&&hash.indexOf(pText)>0&&(hash=parseInt(hash.substring(prefix.length),10),hash>=0)?hash-1:-1},id=getSlideIdByHash();-1!==id&&(self.st.startSlideId=id),hashChange&&($(window).on("hashchange"+self.ns,function(){if(!isBlocked){var id=getSlideIdByHash();if(0>id)return;id>self.numSlides-1&&(id=self.numSlides-1),self.goTo(id)}}),self.ev.on("rsBeforeAnimStart",function(){hashTimeout&&clearTimeout(hashTimeout),hashChangeTimeout&&clearTimeout(hashChangeTimeout)}),self.ev.on("rsAfterSlideChange",function(){hashTimeout&&clearTimeout(hashTimeout),hashChangeTimeout&&clearTimeout(hashChangeTimeout),hashChangeTimeout=setTimeout(function(){isBlocked=!0,window.location.replace((""+window.location).split("#")[0]+prefix+(self.currSlideId+1)),hashTimeout=setTimeout(function(){isBlocked=!1,hashTimeout=null},60)},400)})),self.ev.on("rsBeforeDestroy",function(){hashChangeTimeout=null,hashTimeout=null,hashChange&&$(window).off("hashchange"+self.ns)})}}}),$.rsModules.deeplinking=$.rsProto._initDeeplinking}(jQuery),/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
function($,window,undefined){"$:nomunge";function get_fragment(url){return url=url||location.href,"#"+url.replace(/^[^#]*#?(.*)$/,"$1")}var fake_onhashchange,str_hashchange="hashchange",doc=document,special=$.event.special,doc_mode=doc.documentMode,supports_onhashchange="on"+str_hashchange in window&&(doc_mode===undefined||doc_mode>7);$.fn[str_hashchange]=function(fn){return fn?this.bind(str_hashchange,fn):this.trigger(str_hashchange)},$.fn[str_hashchange].delay=50,special[str_hashchange]=$.extend(special[str_hashchange],{setup:function(){return supports_onhashchange?!1:void $(fake_onhashchange.start)},teardown:function(){return supports_onhashchange?!1:void $(fake_onhashchange.stop)}}),fake_onhashchange=function(){function poll(){var hash=get_fragment(),history_hash=history_get(last_hash);hash!==last_hash?(history_set(last_hash=hash,history_hash),$(window).trigger(str_hashchange)):history_hash!==last_hash&&(location.href=location.href.replace(/#.*/,"")+history_hash),timeout_id=setTimeout(poll,$.fn[str_hashchange].delay)}var timeout_id,self={},last_hash=get_fragment(),fn_retval=function(val){return val},history_set=fn_retval,history_get=fn_retval;return self.start=function(){timeout_id||poll()},self.stop=function(){timeout_id&&clearTimeout(timeout_id),timeout_id=undefined},window.attachEvent&&!window.addEventListener&&!supports_onhashchange&&function(){var iframe,iframe_src;self.start=function(){iframe||(iframe_src=$.fn[str_hashchange].src,iframe_src=iframe_src&&iframe_src+get_fragment(),iframe=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){iframe_src||history_set(get_fragment()),poll()}).attr("src",iframe_src||"javascript:0").insertAfter("body")[0].contentWindow,doc.onpropertychange=function(){try{"title"===event.propertyName&&(iframe.document.title=doc.title)}catch(e){}})},self.stop=fn_retval,history_get=function(){return get_fragment(iframe.location.href)},history_set=function(hash,history_hash){var iframe_doc=iframe.document,domain=$.fn[str_hashchange].domain;hash!==history_hash&&(iframe_doc.title=doc.title,iframe_doc.open(),domain&&iframe_doc.write('<script>document.domain="'+domain+'"</script>'),iframe_doc.close(),iframe.location.hash=hash)}}(),self}()}(jQuery,this);