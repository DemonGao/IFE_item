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
		this.top='0';
		this.left='0';
		this.move=false;
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
//			Gsc.attr(dom,'className','surface show');
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
		}
		//创建surface-head-title 浮出层-页头-标题
		var surface_content=Gsc.newElement('div');
		Gsc.attr(surface_content,'className','surface-content');
		Gsc.css(surface_content,'height',base['head_height']);
		//向标题中添加内容
		Gsc.html(surface_content,base['head_content']);
		Gsc.append(dom,surface_content);
		//若foot:true 则创建surface-foot 浮出层-页尾
		if(base['foot']){
			var surface_foot=Gsc.newElement('div');
			Gsc.attr(surface_foot,'className','surface-foot');
			//向标题中添加内容
			Gsc.html(surface_foot,base['foot_content']);
			Gsc.append(dom,surface_foot);
		}
		
		////若ismove:true 则创建surface 浮出层可移动
		if(base['ismove']){
			var disX = dixY = 0;
			Gsc.css(dom,'cursor','move');
			//	鼠标按钮被按下
			Gsc.on(dom,'mousedown',function(event){
				preventDefault(event);
				this.move=true;
//				this.left=event.clientX;
//				this.top=event.clientY;		
//				console.log('mousedown'+this.left+','+this.top);

				disX = event.clientX - dom.offsetLeft;
				disY = event.clientY - dom.offsetTop;
			});
			//鼠标按键被松开。
			Gsc.on(dom,'mouseup',function(event){
				preventDefault(event);
				this.move=false;
				
//				xValue=this.left;
//				yValue=this.top;
				console.log('mouseup'+this.left+','+this.top);
			});
			Gsc.on(dom,'mousemove',function(event){
				if(this.move){
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
//					xValue=(parseInt(event.clientX)-parseInt(this.left))*2;
//					yValue=(parseInt(event.clientY)-parseInt(this.top))*2;
//					Gsc.css(dom,'left',xValue+'px');
//					Gsc.css(dom,'top',yValue+'px');
					
//					this.left=Gsc.getcss(dom,'left').split('px');
//					this.top=Gsc.getcss(dom,'top').split('px');
//					console.log('mousemove'+Gsc.getcss(dom,'left')+','+Gsc.getcss(dom,'top'));
//					console.log('mousemove'+xValue+','+yValue);
//					console.log('mousemove this.left top'+this.left+','+this.top);
				}
			});
		}
	},
	
};
var base={
	width:'600px',//浮出层层宽度
	height:'300px',//浮出层高度
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
};
var surfaced=Surfaced('surface',base);
surfaced.init();
