/**
 *@author:小白
 *@blog:http://www.xiaobai8.com
 *@版本:v1.1
 *@update:2012-10-17 09:18
 *@des:图片无缝滚动,带自动轮播
 *@不带轮播参数 必须配置 moveUl,Prev,Next,可选moveNum,moveTime,isAuto
 *@带轮播参数的,可选offSet,AutoDirection
 *@例如：
 *使用demo结构类似这样的
 *<div class="xxx">
 *	<div class="xxx J-prev01"></div>
 *	<div class="xxx">
 *		<ul class="clearfix J-ul01">
 *			<li><a title="img01" href="#" target="_blank"><img border="0" title="img01" alt="img01" src="images/20121016.jpg"></a><p>标题1</p></li>
 *			<li><a title="img02" href="#" target="_blank"><img border="0" title="img02" alt="img02" src="images/20121016.jpg"></a><p>标题2</p></li>
 *			<li><a title="img03" href="#" target="_blank"><img border="0" title="img03" alt="img03" src="images/20121016.jpg"></a><p>标题3</p></li>
 *			<li><a title="img04" href="#" target="_blank"><img border="0" title="img04" alt="img04" src="images/20121016.jpg"></a><p>标题4</p></li>
 *			<li><a title="img05" href="#" target="_blank"><img border="0" title="img05" alt="img05" src="images/20121016.jpg"></a><p>标题5</p></li>
 *			<li><a title="img06" href="#" target="_blank"><img border="0" title="img06" alt="img06" src="images/20121016.jpg"></a><p>标题6</p></li>
 *			<li><a title="img07" href="#" target="_blank"><img border="0" title="img07" alt="img07" src="images/20121016.jpg"></a><p>标题7</p></li>
 *			<li><a title="img08" href="#" target="_blank"><img border="0" title="img08" alt="img08" src="images/20121016.jpg"></a><p>标题8</p></li>
 *		</ul>
 *	</div>
 *	<div class="xxx J-right01"></div>
 *</div>
 *var test=new imgScroll();
 *test.init({moveUl:".J-ul01",moveTime:500,moveNum:4,prev:".J-prev01",next:".J-right01"});
 *具体的可参看注释.
 */
(function(){
imgScroll=function(){};
imgScroll.prototype={
	init:function(option){
		if(typeof option == "undefined"){
			option = {};
		};
		/*要移动的ul*/
		this.moveUl=option.moveUl;
		/*移动的个数*/
		this.moveNum=option.moveNum || 5;
		/*移动的时间*/
		this.moveTime=option.moveTime || 500;
		this.Prev=option.prev;
		this.Next=option.next;
		/*新增自动轮播效果,默认是不开启的*/
		this.isAuto=option.isAuto|| false;
		
		/*图片个数小于移动的个数*/
		if(this._fnLength()<=this.moveNum)
		{
			this.isAuto=false;
			$(this.Prev).hide();
			$(this.Next).hide();
		}
		
		if(this.isAuto)
		{
			/*自动轮播时间*/
			this.offSet=option.offSet || 5000;
			this.Timer=null;
			/*自动的方向默认右边0 左边1*/
			this.AutoDirection=option.AutoDirection || 0;
			this._fnAuto(this.AutoDirection);
		}
		/*防止点击按钮过快*/
		this.nextAllow=true;
		this.prevAllow=true;
		/*事件执行入口*/
		this._fnEvent();	
	},
	_fnEvent:function(){
		var _this=this;
		if(_this.isAuto)
		{
			$(_this.Prev).bind("mouseenter",function(){clearInterval(_this.Timer);_this.Timer=null;});
			$(_this.Next).bind("mouseenter",function(){clearInterval(_this.Timer);_this.Timer=null;});
			$(_this.Prev).bind("mouseleave",function(){_this._fnAuto(_this.AutoDirection);});
			$(_this.Next).bind("mouseleave",function(){_this._fnAuto(_this.AutoDirection);});
			$(_this.Prev).bind("click",function(){_this.AutoDirection=0;_this._fnPrev();});
			$(_this.Next).bind("click",function(){_this.AutoDirection=1;_this._fnNext();});
		}
		else
		{
			$(_this.Prev).bind("click",function(){_this._fnPrev();});
			$(_this.Next).bind("click",function(){_this._fnNext();});
		}
	},
	_fnAuto:function(direction){
		var _this=this;
		/*目前只有左、右方向*/
		if(direction==0)
		{
			_this.Timer=setInterval(function(){_this._fnPrev();},_this.offSet);
		}
		if(direction==1)
		{
			_this.Timer=setInterval(function(){_this._fnNext();},_this.offSet);
		}
	},
	_fnLength:function(){
		var len=$(this.moveUl).find("li").length;
		return len;
	},
	_fnMoveWidth:function(){
		/*这里计算出一个li的宽度包括内边距和外边距*/
		return $(this.moveUl).find("li:first").outerWidth(true);
	},
	_fnNext:function(){
		var _this=this,
			$ul=$(_this.moveUl),
			_moveWidth=_this._fnMoveWidth()*_this.moveNum,
			/*克隆要移动的li*/
			$li=$ul.find("li:lt("+_this.moveNum+")");
		if(_this.nextAllow)
		{
			_this.nextAllow=false;
			$li.clone().appendTo($ul);
			$ul.stop(true,false).animate({"left":"-"+_moveWidth+"px"},_this.moveTime,function(){
				$ul.css({"left":0});
				$li.remove();
				_this.nextAllow=true;		
			});
		}
	},
	_fnPrev:function(){
		var _this=this,
			$ul=$(_this.moveUl),
			num=_this._fnLength()-_this.moveNum-1,
			_moveWidth=_this._fnMoveWidth()*_this.moveNum,
			$li=$ul.find("li:gt("+num+"):lt("+_this._fnLength()+")");
		if(_this.Next)
		{
			_this.Next=false;
			$li.clone().prependTo($ul);
			$ul.css({"left":"-"+_moveWidth+"px"});
			$ul.stop(true,false).animate({"left":0},_this.moveTime,function(){
				$ul.css({"left":0});
				$li.remove();
				_this.Next=true;	
			});
		}
	}
};
})(window);