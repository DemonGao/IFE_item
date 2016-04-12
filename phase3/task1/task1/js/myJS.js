//添加事件(兼容方式)
function addEvent(dom,type,fn){
	//对于支持DOM2级事件处理程序addeventListener方法的浏览器
	if(dom.addEventListener){
		dom.addEventListener(type,fn,false);
	}else if(dom.attachEvent){
	//对于不支持addEventListener方法但支持attchEvent方法的浏览器	
		dom.attachEvent('on'+type,fn);
	}
	else{
	//对于不支持以上两种,但支持on+'事件名'的浏览器
		dom['on'+type]=fn;
	}
}
//获取事件对象
var getEvent=function(event){
	//标准浏览器返回event      IE返回window.event
	return event || window.event;
}

//获取元素
var getTarget=function(event){
	var event=getEvent(event);
	//标准浏览器返回event.target    IE返回event.srcElement;
	return event.target || event.srcElement;
}

//阻止默认行为
var preventDefault=function(event){
	var event=getEvent(event);
	//标准浏览器
	if(event.preventDefault)
	{
		event.preventDefault();
	}else{
	//IE
		event.returnValue=false;
	}
}
//除去字符串两边空白
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};
var Gsc={
	//通过id获取元素
	getid:function(id){
		
		return typeof id==='string'?document.getElementById(id):id;
	},
	getclass:function(classname){
		return typeof classname==='string'?document.getElementsByClassName(classname):classname;
	},
	//设置元素的css属性
	css:function(id,key,value){
		var dom=typeof id==='string'?document.getElementById(id):id;
		dom.style[key]=value;
	},
	//获取css属性值
	getcss:function(id,key){
		var dom=typeof id==='string'?document.getElementById(id):id;
		return dom.style[key];
	},
	html:function(id,value){
		var dom=typeof id==='string'?document.getElementById(id):id;
		dom.innerHTML=value;
	},
	//创建元素
	newElement:function(name){
		return document.createElement(name);
	},
	//设置元素的属性
	attr:function(id,key,value){
		var dom=typeof id==='string'?document.getElementById(id):id;
		dom[key]=value;
	},
	//为元素绑定事件
	on:function(id,type,fn){
		var dom=typeof id==='string'?document.getElementById(id):id;
		//对于支持DOM2级事件处理程序addeventListener方法的浏览器
		if(dom.addEventListener){
			dom.addEventListener(type,fn,false);
		}else if(dom.attachEvent){
		//对于不支持addEventListener方法但支持attchEvent方法的浏览器	
			dom.attachEvent('on'+type,fn);
		}
		else{
		//对于不支持以上两种,但支持on+'事件名'的浏览器
			dom['on'+type]=fn;
		}
	},
	//在最后面插入元素
	append:function(id,child){
		var id=typeof id==='string'?document.getElementById(id):id;
		var child=typeof child==='string'?document.getElementById(child):child;
		id.appendChild(child);
	},
	//在最前面插入元素
	insertBefore:function(id,child){
		var id=typeof id==='string'?document.getElementById(id):id;
		var child=typeof child==='string'?document.getElementById(child):child;
		id.insertBefore(child,id.childNodes[0]);
	},
	//删除元素
	remove:function(id,child){
		var id=typeof id==='string'?document.getElementById(id):id;
		var child=typeof child==='string'?document.getElementById(child):child;
		id.removeChild(child);
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);//获取oParent的所有子集
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass;
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem);
	}
};
