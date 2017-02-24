//添加事件(兼容方式)
function addEvent(dom,type,fn){
	if(dom.addEventListener){
		dom.addEventListener(type,fn,false);
	}else if(dom.attachEvent){
		dom.attachEvent('on'+type);
	}else{
		dom['on'+type]=fn;
	}
};
/*
 用委托模式封装一个事件委托方法(通过判断id的值来添加事件)
 参数:
	 parent:父元素
	 id:id的名称
	 type:操作方式
	 fun:执行函数
 * */
function delegate(parent,id,type,fn){
	addEvent(parent,type,function(){
		var e=event||window.event;
			target=event.target||event.srcElement;
		if(target.id==id){
			fn();
		}
	});
};