!function($){"use strict";$.extend($.rsProto,{_initVideo:function(){var self=this;self._videoDefaults={autoHideArrows:!0,autoHideControlNav:!1,autoHideBlocks:!1,autoHideCaption:!1,disableCSS3inFF:!0,youTubeCode:'<iframe src="http://www.youtube.com/embed/%id%?rel=1&autoplay=1&showinfo=0&autoplay=1&wmode=transparent" frameborder="no"></iframe>',vimeoCode:'<iframe src="http://player.vimeo.com/video/%id%?byline=0&amp;portrait=0&amp;autoplay=1" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'},self.st.video=$.extend({},self._videoDefaults,self.st.video),self.ev.on("rsBeforeSizeSet",function(){self._isVideoPlaying&&setTimeout(function(){var content=self._currHolder;content=content.hasClass("rsVideoContainer")?content:content.find(".rsVideoContainer"),self._videoFrameHolder&&self._videoFrameHolder.css({width:content.width(),height:content.height()})},32)});var isFF=self._browser.mozilla;self.ev.on("rsAfterParseNode",function(e,content,obj){var hasVideo,jqcontent=$(content);if(obj.videoURL){self.st.video.disableCSS3inFF&&!hasVideo&&isFF&&(hasVideo=!0,self._useCSS3Transitions=self._use3dTransform=!1);var wrap=$('<div class="rsVideoContainer"></div>'),playBtn=$('<div class="rsBtnCenterer"><div class="rsPlayBtn"><div class="rsPlayBtnIcon"></div></div></div>');jqcontent.hasClass("rsImg")?obj.content=wrap.append(jqcontent).append(playBtn):obj.content.find(".rsImg").wrap(wrap).after(playBtn)}}),self.ev.on("rsAfterSlideChange",function(){self.stopVideo()})},toggleVideo:function(){var self=this;return self._isVideoPlaying?self.stopVideo():self.playVideo()},playVideo:function(){var self=this;if(!self._isVideoPlaying){var currSlide=self.currSlide;if(!currSlide.videoURL)return!1;self._playingVideoSlide=currSlide;var videoId,regExp,match,content=self._currVideoContent=currSlide.content,url=currSlide.videoURL;return url.match(/youtu\.be/i)||url.match(/youtube\.com/i)?(regExp=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,match=url.match(regExp),match&&11==match[7].length&&(videoId=match[7]),void 0!==videoId&&(self._videoFrameHolder=self.st.video.youTubeCode.replace("%id%",videoId))):url.match(/vimeo\.com/i)&&(regExp=/(www\.)?vimeo.com\/(\d+)($|\/)/,match=url.match(regExp),match&&(videoId=match[2]),void 0!==videoId&&(self._videoFrameHolder=self.st.video.vimeoCode.replace("%id%",videoId))),self.videoObj=$(self._videoFrameHolder),self.ev.trigger("rsOnCreateVideoElement",[url]),self.videoObj.length&&(self._videoFrameHolder=$('<div class="rsVideoFrameHolder"><div class="rsPreloader"></div><div class="rsCloseVideoBtn"><div class="rsCloseVideoIcn"></div></div></div>'),self._videoFrameHolder.find(".rsPreloader").after(self.videoObj),content=content.hasClass("rsVideoContainer")?content:content.find(".rsVideoContainer"),self._videoFrameHolder.css({width:content.width(),height:content.height()}).find(".rsCloseVideoBtn").off("click.rsv").on("click.rsv",function(e){return self.stopVideo(),e.preventDefault(),e.stopPropagation(),!1}),content.append(self._videoFrameHolder),self.isIPAD&&content.addClass("rsIOSVideo"),self._toggleHiddenClass(!1),setTimeout(function(){self._videoFrameHolder.addClass("rsVideoActive")},10),self.ev.trigger("rsVideoPlay"),self._isVideoPlaying=!0),!0}return!1},stopVideo:function(){var self=this;return self._isVideoPlaying?(self.isIPAD&&self.slider.find(".rsCloseVideoBtn").remove(),self._toggleHiddenClass(!0),setTimeout(function(){self.ev.trigger("rsOnDestroyVideoElement",[self.videoObj]);var ifr=self._videoFrameHolder.find("iframe");if(ifr.length)try{ifr.attr("src","")}catch(ex){}self._videoFrameHolder.remove(),self._videoFrameHolder=null},16),self.ev.trigger("rsVideoStop"),self._isVideoPlaying=!1,!0):!1},_toggleHiddenClass:function(remove){var arr=[],self=this,vst=self.st.video;if(vst.autoHideArrows&&(self._arrowLeft&&(arr.push(self._arrowLeft,self._arrowRight),self._arrowsAutoHideLocked=!remove),self._fsBtn&&arr.push(self._fsBtn)),vst.autoHideControlNav&&self._controlNav&&arr.push(self._controlNav),vst.autoHideBlocks&&self._playingVideoSlide.animBlocks&&arr.push(self._playingVideoSlide.animBlocks),vst.autoHideCaption&&self.globalCaption&&arr.push(self.globalCaption),self.slider[remove?"removeClass":"addClass"]("rsVideoPlaying"),arr.length)for(var i=0;i<arr.length;i++)remove?arr[i].removeClass("rsHidden"):arr[i].addClass("rsHidden")}}),$.rsModules.video=$.rsProto._initVideo}(jQuery);