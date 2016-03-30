//除去字符串两边空白
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};
//添加事件
function addEvent(element,event,listener){
	if(element.addEventListener){
		element.addEventListener(event,listener,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+event,listener);
	}else{
		element["on"+event]=listener;
	}
}
function Tag(id,box,btn){
	if(this instanceof Tag)
	{
		this.id=document.getElementById(id);
		this.box=document.getElementById(box);
		this.btn=document.getElementById(btn);
		this.strarr=[];
		this.count=0;
	}else{
		return new Tag(id,box,btn);
	}
}

Tag.prototype={
	//初始化
	init:function(){

	},
	// 处理文本框,若遇到回车、空格、逗号则生成一个Tag标签
	tagKeypress:function(e){
		var key=this.id.value.trim();
		//keyCode=13回车 keyCode=32 空格 keyCode=188 逗号
		if(e.keyCode===32|| e.keyCode === 13 || e.keyCode === 44)
		{
			if(this.checkKey(key)&&key!=""){
				this.addStrarr(key);
			}else{
				alert("您输入的标签重复!");
			}
			//文本框内容清空
			this.id.value=null;
		}
	},
	//检验查重
	checkKey:function(key){
		console.log("key="+key+"---"+this.strarr.length);
		for(var i=0;i<this.strarr.length;i++)
		{
			console.log("strarr["+i+"]="+this.strarr[i]);
			if(this.strarr[i]==key || key == " " || key == ","){
				return false;
			}
		}
		return true;
	},
	addStrarr:function(num){
		var This=this;
		if(this.strarr.length==10)
		{
			this.strarr.shift();
			this.strarr.push(num);
			this.box.childNodes[This.count].innerHTML=num;
			This.count++;
			if(This.count>9)
			{
				This.count=0;
			}
		}else{
			this.strarr.push(num);
			this.showTag(num);
		}
		
	},
	showTag:function(num){
		var This=this;
		var newdiv=document.createElement("div");
		newdiv.className="taglist";
		newdiv.setAttribute('createtime', date.getTime());
		newdiv.innerHTML=num;
		this.box.appendChild(newdiv);
		addEvent(newdiv,"click",function(){
			This.box.removeChild(this);
			for(i in This.strarr)
			{
				if(This.strarr[i]==this.innerHTML)
				{
					This.strarr.splice(i, 1);
				}
			}
		});		
	},
	del:function(node){
		this.box.removeChild(node);
	},
};
var date=new Date();
var tag1=new Tag('TagInput','TagBox','tagbtn');
tag1.id.onkeypress=function(e){
	//标准浏览器event  IE:window.event
	var e=e||window.event;
	tag1.tagKeypress(e);
}