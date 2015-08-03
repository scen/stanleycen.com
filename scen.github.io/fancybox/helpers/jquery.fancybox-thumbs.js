/*!
 * Thumbnail helper for fancyBox
 * version: 1.0.7 (Mon, 01 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             thumbs: {
 *                 width  : 50,
 *                 height : 50
 *             }
 *         }
 *     });
 *
 */
!function($){var F=$.fancybox;F.helpers.thumbs={defaults:{width:50,height:50,position:"bottom",source:function(item){var href;return item.element&&(href=$(item.element).find("img").attr("src")),!href&&"image"===item.type&&item.href&&(href=item.href),href}},wrap:null,list:null,width:0,init:function(opts,obj){var list,that=this,thumbWidth=opts.width,thumbHeight=opts.height,thumbSource=opts.source;list="";for(var n=0;n<obj.group.length;n++)list+='<li><a style="width:'+thumbWidth+"px;height:"+thumbHeight+'px;" href="javascript:jQuery.fancybox.jumpto('+n+');"></a></li>';this.wrap=$('<div id="fancybox-thumbs"></div>').addClass(opts.position).appendTo("body"),this.list=$("<ul>"+list+"</ul>").appendTo(this.wrap),$.each(obj.group,function(i){var href=thumbSource(obj.group[i]);href&&$("<img />").load(function(){var widthRatio,heightRatio,parent,width=this.width,height=this.height;that.list&&width&&height&&(widthRatio=width/thumbWidth,heightRatio=height/thumbHeight,parent=that.list.children().eq(i).find("a"),widthRatio>=1&&heightRatio>=1&&(widthRatio>heightRatio?(width=Math.floor(width/heightRatio),height=thumbHeight):(width=thumbWidth,height=Math.floor(height/widthRatio))),$(this).css({width:width,height:height,top:Math.floor(thumbHeight/2-height/2),left:Math.floor(thumbWidth/2-width/2)}),parent.width(thumbWidth).height(thumbHeight),$(this).hide().appendTo(parent).fadeIn(300))}).attr("src",href)}),this.width=this.list.children().eq(0).outerWidth(!0),this.list.width(this.width*(obj.group.length+1)).css("left",Math.floor(.5*$(window).width()-(obj.index*this.width+.5*this.width)))},beforeLoad:function(opts,obj){return obj.group.length<2?void(obj.helpers.thumbs=!1):void(obj.margin["top"===opts.position?0:2]+=opts.height+15)},afterShow:function(opts,obj){this.list?this.onUpdate(opts,obj):this.init(opts,obj),this.list.children().removeClass("active").eq(obj.index).addClass("active")},onUpdate:function(opts,obj){this.list&&this.list.stop(!0).animate({left:Math.floor(.5*$(window).width()-(obj.index*this.width+.5*this.width))},150)},beforeClose:function(){this.wrap&&this.wrap.remove(),this.wrap=null,this.list=null,this.width=0}}}(jQuery);