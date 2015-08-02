!function($){"use strict";$.extend($.rsProto,{_initAnimatedBlocks:function(){function runBlocks(){var slide=self.currSlide;if(self.currSlide&&self.currSlide.isLoaded&&self._slideWithBlocks!==slide){if(self._animatedBlockTimeouts.length>0){for(i=0;i<self._animatedBlockTimeouts.length;i++)clearTimeout(self._animatedBlockTimeouts[i]);self._animatedBlockTimeouts=[]}if(self._blockAnimProps.length>0){var cItemTemp;for(i=0;i<self._blockAnimProps.length;i++)cItemTemp=self._blockAnimProps[i],cItemTemp&&(self._useCSS3Transitions?(cItemTemp.block.css(self._vendorPref+self._TD,"0s"),cItemTemp.block.css(cItemTemp.css)):cItemTemp.block.stop(!0).css(cItemTemp.css),self._slideWithBlocks=null,slide.animBlocksDisplayed=!1);self._blockAnimProps=[]}slide.animBlocks&&(slide.animBlocksDisplayed=!0,self._slideWithBlocks=slide,self._animateBlocks(slide.animBlocks))}}var i,self=this;self._blockDefaults={fadeEffect:!0,moveEffect:"top",moveOffset:20,speed:400,easing:"easeOutSine",delay:200},self.st.block=$.extend({},self._blockDefaults,self.st.block),self._blockAnimProps=[],self._animatedBlockTimeouts=[],self.ev.on("rsAfterInit",function(){runBlocks()}),self.ev.on("rsBeforeParseNode",function(e,content,obj){content=$(content),obj.animBlocks=content.find(".rsABlock").css("display","none"),obj.animBlocks.length||(obj.animBlocks=content.hasClass("rsABlock")?content.css("display","none"):!1)}),self.ev.on("rsAfterContentSet",function(e,slideObject){var currId=self.slides[self.currSlideId].id;slideObject.id===currId&&setTimeout(function(){runBlocks()},self.st.fadeinLoadedSlide?300:0)}),self.ev.on("rsAfterSlideChange",function(){runBlocks()})},_updateAnimBlockProps:function(obj,props){setTimeout(function(){obj.css(props)},6)},_animateBlocks:function(animBlocks){var item,animObj,newPropObj,transitionData,moveProp,moveEffect,isOppositeProp,self=this;self._animatedBlockTimeouts=[],animBlocks.each(function(index){item=$(this),animObj={},newPropObj={},transitionData=null;var moveOffset=item.attr("data-move-offset");if(moveOffset=moveOffset?parseInt(moveOffset,10):self.st.block.moveOffset,moveOffset>0&&(moveEffect=item.data("move-effect"),moveEffect?(moveEffect=moveEffect.toLowerCase(),"none"===moveEffect?moveEffect=!1:"left"!==moveEffect&&"top"!==moveEffect&&"bottom"!==moveEffect&&"right"!==moveEffect&&(moveEffect=self.st.block.moveEffect,"none"===moveEffect&&(moveEffect=!1))):moveEffect=self.st.block.moveEffect,moveEffect&&"none"!==moveEffect)){var moveHorizontal;moveHorizontal="right"===moveEffect||"left"===moveEffect?!0:!1;var currPos,startPos;isOppositeProp=!1,self._useCSS3Transitions?(currPos=0,moveProp=self._xProp):(moveHorizontal?isNaN(parseInt(item.css("right"),10))?moveProp="left":(moveProp="right",isOppositeProp=!0):isNaN(parseInt(item.css("bottom"),10))?moveProp="top":(moveProp="bottom",isOppositeProp=!0),moveProp="margin-"+moveProp,isOppositeProp&&(moveOffset=-moveOffset),self._useCSS3Transitions?currPos=parseInt(item.css(moveProp),10):(currPos=item.data("rs-start-move-prop"),void 0===currPos&&(currPos=parseInt(item.css(moveProp),10),isNaN(currPos)&&(currPos=0),item.data("rs-start-move-prop",currPos)))),startPos="top"===moveEffect||"left"===moveEffect?currPos-moveOffset:currPos+moveOffset,newPropObj[moveProp]=self._getCSS3Prop(startPos,moveHorizontal),animObj[moveProp]=self._getCSS3Prop(currPos,moveHorizontal)}var fadeEffect=item.attr("data-fade-effect");fadeEffect?("none"===fadeEffect.toLowerCase()||"false"===fadeEffect.toLowerCase())&&(fadeEffect=!1):fadeEffect=self.st.block.fadeEffect,fadeEffect&&(newPropObj.opacity=0,animObj.opacity=1),(fadeEffect||moveEffect)&&(transitionData={},transitionData.hasFade=Boolean(fadeEffect),Boolean(moveEffect)&&(transitionData.moveProp=moveProp,transitionData.hasMove=!0),transitionData.speed=item.data("speed"),isNaN(transitionData.speed)&&(transitionData.speed=self.st.block.speed),transitionData.easing=item.data("easing"),transitionData.easing||(transitionData.easing=self.st.block.easing),transitionData.css3Easing=$.rsCSS3Easing[transitionData.easing],transitionData.delay=item.data("delay"),isNaN(transitionData.delay)&&(transitionData.delay=self.st.block.delay*index));var blockPropsObj={};self._useCSS3Transitions&&(blockPropsObj[self._vendorPref+self._TD]="0ms"),blockPropsObj.moveProp=animObj.moveProp,blockPropsObj.opacity=animObj.opacity,blockPropsObj.display="none",self._blockAnimProps.push({block:item,css:blockPropsObj}),self._updateAnimBlockProps(item,newPropObj),self._animatedBlockTimeouts.push(setTimeout(function(cItem,animateData,transitionData,index){return function(){if(cItem.css("display","block"),transitionData){var animObj={};if(self._useCSS3Transitions){var prop="";transitionData.hasMove&&(prop+=transitionData.moveProp),transitionData.hasFade&&(transitionData.hasMove&&(prop+=", "),prop+="opacity"),animObj[self._vendorPref+self._TP]=prop,animObj[self._vendorPref+self._TD]=transitionData.speed+"ms",animObj[self._vendorPref+self._TTF]=transitionData.css3Easing,cItem.css(animObj),setTimeout(function(){cItem.css(animateData)},24)}else setTimeout(function(){cItem.animate(animateData,transitionData.speed,transitionData.easing)},16)}delete self._animatedBlockTimeouts[index]}}(item,animObj,transitionData,index),transitionData.delay<=6?12:transitionData.delay))})}}),$.rsModules.animatedBlocks=$.rsProto._initAnimatedBlocks}(jQuery);