/*!
 * Buttons helper for fancyBox
 * version: 1.0.5 (Mon, 15 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             buttons: {
 *                 position : 'top'
 *             }
 *         }
 *     });
 *
 */
!function($){var F=$.fancybox;F.helpers.buttons={defaults:{skipSingle:!1,position:"top",tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'},list:null,buttons:null,beforeLoad:function(opts,obj){return opts.skipSingle&&obj.group.length<2?(obj.helpers.buttons=!1,void(obj.closeBtn=!0)):void(obj.margin["bottom"===opts.position?2:0]+=30)},onPlayStart:function(){this.buttons&&this.buttons.play.attr("title","Pause slideshow").addClass("btnPlayOn")},onPlayEnd:function(){this.buttons&&this.buttons.play.attr("title","Start slideshow").removeClass("btnPlayOn")},afterShow:function(opts,obj){var buttons=this.buttons;buttons||(this.list=$(opts.tpl).addClass(opts.position).appendTo("body"),buttons={prev:this.list.find(".btnPrev").click(F.prev),next:this.list.find(".btnNext").click(F.next),play:this.list.find(".btnPlay").click(F.play),toggle:this.list.find(".btnToggle").click(F.toggle),close:this.list.find(".btnClose").click(F.close)}),obj.index>0||obj.loop?buttons.prev.removeClass("btnDisabled"):buttons.prev.addClass("btnDisabled"),obj.loop||obj.index<obj.group.length-1?(buttons.next.removeClass("btnDisabled"),buttons.play.removeClass("btnDisabled")):(buttons.next.addClass("btnDisabled"),buttons.play.addClass("btnDisabled")),this.buttons=buttons,this.onUpdate(opts,obj)},onUpdate:function(opts,obj){var toggle;this.buttons&&(toggle=this.buttons.toggle.removeClass("btnDisabled btnToggleOn"),obj.canShrink?toggle.addClass("btnToggleOn"):obj.canExpand||toggle.addClass("btnDisabled"))},beforeClose:function(){this.list&&this.list.remove(),this.list=null,this.buttons=null}}}(jQuery);