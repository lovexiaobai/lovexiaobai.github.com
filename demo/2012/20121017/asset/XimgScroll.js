/**
 *@author:小白
 *@blog:http://www.xiaobai8.com
 *@版本:v1.0
 *@des:要实现的大致的就是易迅网首页的banner效果,根据banner里面产品多少来实现不同的布局方式.
 */
(function(){
XimgScroll=function(){};
XimgScroll.prototype={
	init:function(option){
		if(typeof option == "undefined"){
			option = {};
		};
		this.moveUl=option.moveUl || ".J-moveUl";
		this.moveIco=option.moveIco || ".J-moveIco";
		this.moveIcoClass=option.moveIcoClass || "on";
		/*li要添加的样式 PS这里的样式类名在样式里面定义的一直就OK了*/
		this.bannerStyle=option.bannerStyle || "x-banner-list";
		/*li里面图片的tag*/
		this.bannerSubStyle=option.bannerSubStyle || ".x-banner-list-item";
		this.index=0;
		/*自动轮播效果,默认是不开启的*/
		this.isAuto=option.isAuto|| false;
		if(this.isAuto)
		{
			/*自动轮播时间*/
			this.offSet=option.offSet || 5000;
			this.Timer=null;
			this.fnAutoRun();
		}
		this.fnEvent();	
	},
	/*事件执行入口*/
	fnEvent:function(){
		var that=this;
		that.fnMoveIco();
		$(that.moveIco).children("li:first").addClass(this.moveIcoClass);
		that.fnCheckStyle($(that.moveUl).children("li").eq(0),that.bannerSubStyle,that.bannerStyle);
		if(that.isAuto)
		{
			$(that.moveIco).children("li").bind("mouseenter",function(){
				var _this=this;
				clearInterval(that.Timer);
				that.Timer=null;
				that.index=$(_this).index();
				that.fnImgStart(that.index);
				that.fnCheckStyle($(that.moveUl).children("li").eq(that.index),that.bannerSubStyle,that.bannerStyle);
			})
			$(that.moveIco).children("li").bind("mouseleave",function(){
				that.fnAutoRun();
			})
			$(that.moveUl).bind("mouseenter",function(){
				clearInterval(that.Timer);
				that.Timer=null;
			})
			$(that.moveUl).bind("mouseleave",function(){
				that.fnAutoRun();
			})
		}
		else
		{
			$(that.moveIco).children("li").bind("mouseenter",function(){
				var _this=this;
				that.index=$(_this).index();
				that.fnImgStart(that.index);
				that.fnCheckStyle($(that.moveUl).children("li").eq(that.index),that.bannerSubStyle,that.bannerStyle);
			})
		}
		$(that.bannerSubStyle).bind("mouseenter",function(){
			var _this=this;
			$(_this).css({"opacity":1}).siblings(that.bannerSubStyle).css({"opacity":0.3});
		})
		$(that.bannerSubStyle).bind("mouseleave",function(){
			var _this=this;
			$(that.bannerSubStyle).css({"opacity":1});
		})
	},
	/*自动处理*/
	fnAutoRun:function(){
		var that=this;
		that.Timer=setInterval(function(){
			that.index++;
			if(that.index==that.fnLength()){
				that.index=0;
				$(that.moveUl).css({top:that.fnHeight()/2});
			}
			that.fnImgStart(that.index);
			that.fnCheckStyle($(that.moveUl).children("li").eq(that.index),that.bannerSubStyle,that.bannerStyle);	
		},that.offSet);
	},
	/*图片运动*/
	fnImgStart:function(i){
		var that=this;
		that.index=i;
		that.fnAnimate($(that.moveUl),-(i*that.fnHeight()));
		that.fnAddClass($(that.moveIco).children("li"),that.moveIcoClass,i);
	},
	/*检测样式*/
	fnCheckStyle:function(obj,subClassName,className){
		var len=obj.find(subClassName).length;
		if(len>0)
		{
			var _className=className+len;
			obj.addClass(_className);
			obj.find(subClassName).each(function(i){
				obj.find(subClassName).eq(i).addClass(_className+"-"+(i+1));
			});
		}
	},
	/*图片轮播个数*/
	fnLength:function(){
		return $(this.moveUl).children("li").length;
	},
	fnHeight:function(){
		var h=$(this.moveUl).children("li:first").outerHeight(true);
		return h;
	},
	/*根据轮播个数插入数字的那个*/
	fnMoveIco:function(){
		var that=this;
		var html='';
		for(var i=1,len=that.fnLength();i<=len;i++)
		{
			html+="<li>"+i+"</li>";
		}
		$(that.moveIco).append(html);
	},
	fnAnimate:function(obj,i){
		obj.stop(true,false).animate({"top":i},300);
	},
	fnAddClass:function(obj,className,i){
		obj.removeClass(className).eq(i).addClass(className);
	}
};
})(window);