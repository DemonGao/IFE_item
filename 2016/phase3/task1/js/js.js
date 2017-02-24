/*浮出层
 * @parameter:name 浮出层容器id
 * @parameter:base 基础样式和功能
 * 
 */
var Surfaced=function(id,base){
	if(this instanceof Surfaced)
	{
		this.id=id;
		this.base=base;
	}else{
		return new Surfaced(id,base);
	}
}
Surfaced.prototype={
	//初始化
	init:function(){
		//如果传递的参数是字符串则以id处理,否则以元素对象处理
		var dom=typeof this.id==='string'?document.getElementById(this.id):this.id;
		this.setSurface(dom);
		//浮出层显示绑定
		Gsc.on(this.base['showElementL'],'click',function(){
			Gsc.css(dom,'display','block');
			//创建遮盖图层
			var covering=Gsc.newElement('div');
			Gsc.css(covering,'width','100%');
			Gsc.css(covering,'height','100%');
			Gsc.css(covering,'background','#fff');
			Gsc.css(covering,'opacity','.5');
			Gsc.css(covering,'z-index','99998');
			Gsc.css(covering,'position','fixed');
			Gsc.css(covering,'top','0');
			Gsc.attr(covering,'id','covering');
			Gsc.insertBefore('body',covering);
		});

	},
	//设置浮出层样式
	setSurface:function(dom){
		var base=this.base;
		Gsc.css(dom,'width',base['width']);
		Gsc.css(dom,'height',base['height']);
		Gsc.css(dom,'left',base['left']);
		Gsc.css(dom,'top',base['top']);
		Gsc.css(dom,'margin-left','-'+parseInt(base['width'].split('px')[0])/2+'px');
		Gsc.css(dom,'margin-top','-'+parseInt(base['height'].split('px')[0])/2+'px');
		//创建surface-head 浮出层-页头
		var surface_head=Gsc.newElement('div');
		Gsc.attr(surface_head,'className','surface-head');
		Gsc.append(dom,surface_head);
		//创建surface-head-title 浮出层-页头-标题
		var surface_head_title=Gsc.newElement('div');
		Gsc.attr(surface_head_title,'className','surface-head-title');
		//向标题中添加内容
		Gsc.html(surface_head_title,base['head_title_content']);
		Gsc.append(surface_head,surface_head_title);
		//若closebtn:true 则创建surface-head-icon 浮出层-页头-关闭按钮
		if(base['closebtn']){
			var surface_head_icon=Gsc.newElement('div');
			Gsc.attr(surface_head_icon,'className','surface-head-icon');
			Gsc.append(surface_head,surface_head_icon);
			//创建关闭按钮
			var icon_close=Gsc.newElement('span');
			Gsc.attr(icon_close,'className','icon-close');
			Gsc.append(surface_head_icon,icon_close);
			//绑定关闭按钮
			Gsc.on(icon_close,'click',function(){
				Gsc.css(dom,'display','none');
//				Gsc.attr(dom,'className','surface');
				//删除遮盖层
				Gsc.remove('body','covering');
			});	
			//委托模式
			addEvent(document.body,'click',function(event){
				var event=getEvent(event);
				var target=getTarget(event);
				preventDefault(event);
				if(target.id==="covering")
				{
					Gsc.remove('body','covering');
					Gsc.css(dom,'display','none');
				}
			});
		}
		//创建surface-head-title 浮出层-页头-标题
		var surface_content=Gsc.newElement('div');
		Gsc.attr(surface_content,'className','surface-content');
		Gsc.css(surface_content,'height',base['head_height']);
		//向标题中添加内容
		Gsc.html(surface_content,base['head_content']);
		Gsc.append(dom,surface_content);
		
		//创建拖拽大小的div 设置className 添加到浮出层dom中
		var resizeL=Gsc.newElement('div');
		var resizeT=Gsc.newElement('div');
		var resizeR=Gsc.newElement('div');
		var resizeB=Gsc.newElement('div');
		var resizeLT=Gsc.newElement('div');
		var resizeTR=Gsc.newElement('div');
		var resizeBR=Gsc.newElement('div');
		var resizeLB=Gsc.newElement('div');
		Gsc.attr(resizeL,'className','resizeL');
		Gsc.attr(resizeT,'className','resizeT');
		Gsc.attr(resizeR,'className','resizeR');
		Gsc.attr(resizeB,'className','resizeB');
		Gsc.attr(resizeLT,'className','resizeLT');
		Gsc.attr(resizeTR,'className','resizeTR');
		Gsc.attr(resizeBR,'className','resizeBR');
		Gsc.attr(resizeLB,'className','resizeLB');
		
		Gsc.append(dom,resizeL);
		Gsc.append(dom,resizeT);
		Gsc.append(dom,resizeR);
		Gsc.append(dom,resizeB);
		Gsc.append(dom,resizeLT);
		Gsc.append(dom,resizeTR);
		Gsc.append(dom,resizeBR);
		Gsc.append(dom,resizeLB);
		//若foot:true 则创建surface-foot 浮出层-页尾
		if(base['foot']){
			var surface_foot=Gsc.newElement('div');
			Gsc.attr(surface_foot,'className','surface-foot');
			//向标题中添加内容
			Gsc.html(surface_foot,base['foot_content']);
			Gsc.append(dom,surface_foot);
		}
		
		//若ismove:true 则创建surface 浮出层可移动
		if(base['ismove']){
			
			var handle = Gsc.byClass("surface-head", dom)[0];
			this.drag(dom,handle);
		}
		//若isresize:true 则可以改变浮出层的大小
		if(base['isresize'])
		{
			var oDrag = Gsc.getid('surface');
			var oTitle = Gsc.byClass("surface-head", oDrag)[0];
			var oL = Gsc.byClass("resizeL", oDrag)[0];
			var oT = Gsc.byClass("resizeT", oDrag)[0];
			var oR = Gsc.byClass("resizeR", oDrag)[0];
			var oB = Gsc.byClass("resizeB", oDrag)[0];
			var oLT = Gsc.byClass("resizeLT", oDrag)[0];
			var oTR = Gsc.byClass("resizeTR", oDrag)[0];
			var oBR = Gsc.byClass("resizeBR", oDrag)[0];
			var oLB = Gsc.byClass("resizeLB", oDrag)[0];
			this.drag(oDrag, oTitle);
			//四角
			this.resize(oDrag, oLT, true, true, false, false);
			this.resize(oDrag, oTR, false, true, false, false);
			this.resize(oDrag, oBR, false, false, false, false);
			this.resize(oDrag, oLB, true, false, false, false);
			//四边
			this.resize(oDrag, oL, true, false, false, true);
			this.resize(oDrag, oT, false, true, true, false);
			this.resize(oDrag, oR, false, false, false, true);
			this.resize(oDrag, oB, false, false, true, false);
			oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
			oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
	
		}
	},
	//浮出层拖拽
	drag:function(dom,handle){
		var disX = dixY = 0;
		Gsc.css(handle,'cursor','move');
		//	鼠标按钮被按下
		Gsc.on(handle,'mousedown',function(event){
			preventDefault(event);
			disX = event.clientX - dom.offsetLeft;
			disY = event.clientY - dom.offsetTop;
			document.onmousemove = function (event){
				var event=getEvent(event);
				preventDefault(event);
				var iL = event.clientX - disX+parseInt(base['width'].split('px')[0])/2;
				var iT = event.clientY - disY+parseInt(base['height'].split('px')[0])/2;
				var maxL = document.documentElement.clientWidth - dom.offsetWidth+parseInt(base['width'].split('px')[0])/2;
				var maxT = document.documentElement.clientHeight - dom.offsetHeight+parseInt(base['height'].split('px')[0])/2;
					
				iL <= parseInt(base['width'].split('px')[0])/2 && (iL = parseInt(base['width'].split('px')[0])/2);
				iT <= parseInt(base['height'].split('px')[0])/2 && (iT = parseInt(base['height'].split('px')[0])/2);
				iL >= maxL && (iL = maxL);
				iT >= maxT && (iT = maxT);
				Gsc.css(dom,'left',iL+'px');
				Gsc.css(dom,'top',iT+'px');
				return false;
			};
			//鼠标按键被松开。
			document.onmouseup = function ()
			{
				document.onmousemove = null;
				document.onmouseup = null;
				this.releaseCapture && this.releaseCapture()
			};
			return false;
		});
	},
	//浮出层缩放
	resize:function(oParent, handle, isLeft, isTop, lockX, lockY){
		//	鼠标按钮被按下
		Gsc.on(handle,'mousedown',function(event){
			var event=getEvent(event);
			var disX=event.clientX-handle.offsetLeft;//初始X
			var disY=event.clientY-handle.offsetTop;//初始Y
			var iParentTop = oParent.offsetTop;//浮出层相对于父容器的上边距
			var iParentLeft = oParent.offsetLeft;//浮出层相对于父容器的左边距
			var iParentWidth = oParent.offsetWidth;//浮出层的宽度
			var iParentHeight = oParent.offsetHeight;//浮出层的高度
//			console.log('iParentTop:'+iParentTop+'|'+'iParentLeft:'+iParentLeft+'|'+'iParentWidth:'+iParentWidth+'|'+'iParentHeight:'+iParentHeight);
			document.onmousemove = function (event){
				//document.onmousemove 能监控整个屏幕,这样不会丢失鼠标 而导致出错
				var event=getEvent(event);
				var iL = event.clientX - disX;
				var iT = event.clientY - disY;
				var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;//最大宽度   document.documentElement.clientWidth:当前浏览器的宽度
				var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;//最大高度   document.documentElement.clientHeight 当前浏览器的高度
				var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL; //判断是否是可以左右伸缩
				var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;//判断是否可以上下伸缩
				var dragMinWidth=parseInt(base['min_width'].split('px')[0]);  //设置最小宽度
				var dragMinHeight=parseInt(base['min_height'].split('px')[0]);//设置最小高度
				
				isLeft && (Gsc.css(oParent,'left',iParentLeft + iL + parseInt(base['width'].split('px')[0])/2 +'px'));//因为定位是top:50% left:50% margin-left margin-right定位的 所以 left:还要在+上1半的宽度
				isTop && (Gsc.css(oParent,'top',iParentTop + iT + parseInt(base['height'].split('px')[0])/2 +'px'));
				
				iW < dragMinWidth && (iW=dragMinWidth); //判断最小宽度
				iW > maxW && (iW = maxW);
				lockX || (Gsc.css(oParent,'width',iW+'px'));
				
				iH < dragMinHeight && (iH = dragMinHeight);//判断最小高度
				lockY || (Gsc.css(oParent,'height',iH + 'px'));
				iH > maxH && (iH = maxH);
				
				if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove=null;
				return false;
			}
			//鼠标松开
			document.onmouseup = function ()
			{
				document.onmousemove = null;
				document.onmouseup = null;
			};
			return false;
		});
		//鼠标移动
	},
	
};
var base={
	width:'600px',//浮出层层宽度
	min_width:'400px',
	height:'300px',//浮出层高度
	min_height:'300px',
	left:'50%',
	top:'50%',
	head_height:'260px',
	head_title_content:'<p>这是一个浮出层的头部</p>',//浮出层的页头内容
	head_content:'<p>这是个浮出层的内容区</p>',
	foot_content:'<p>这是浮出层的页脚</p>',
	showElementL:'clickbtn',//浮出层显示按钮
	closebtn:true,//关闭按钮是否存在
	foot:true,//页脚是否存在
	ismove:true,//是否可移动
	isresize:true,//是否可以改变大小
};
var surfaced=Surfaced('surface',base);
surfaced.init();
