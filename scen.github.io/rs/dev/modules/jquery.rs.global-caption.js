!function($){"use strict";$.extend($.rsProto,{_initGlobalCaption:function(){var self=this;if(self.st.globalCaption){var setCurrCaptionHTML=function(){self.globalCaption.html(self.currSlide.caption)};self.ev.on("rsAfterInit",function(){self.globalCaption=$('<div class="rsGCaption"></div>').appendTo(self.st.globalCaptionInside?self._sliderOverflow:self.slider),setCurrCaptionHTML()}),self.ev.on("rsBeforeAnimStart",function(){setCurrCaptionHTML()})}}}),$.rsModules.globalCaption=$.rsProto._initGlobalCaption}(jQuery);