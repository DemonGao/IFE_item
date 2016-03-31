//除去字符串两边空白
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};
//添加事件
function addEvent(element,event,listener){
	if(element.addEventListener){
		console.log("addEventListener");
		element.addEventListener(event,listener,false);
	}else if(element.attachEvent){
		console.log("attachEvent");
		element.attachEvent("on"+event,listener);
	}else{
		console.log("on+event");
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
	}else{
		return new Tag(id,box,btn);
	}
}

Tag.prototype={
	btnclick:function(){
		var This=this;
		var key=This.id.value.trim();
		var keyarr=(key).split(/[,，;；、\s\n]+/);
		for(var i=0;i<keyarr.length;i++)
		{
			
			if(This.checkKey(keyarr[i])&&keyarr[i]!=""){
				This.addStrarr(keyarr[i]);
			}else{
				alert("您输入的标签"+keyarr[i]+"重复!");
			}
		}
		This.id.value=null;
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
		// console.log("key="+key+"---"+this.strarr.length);
		for(var i=0;i<this.strarr.length;i++)
		{
			if(this.strarr[i]==key || key == " " || key == ","){
				return false;
			}
		}
		return true;
	},
	addStrarr:function(num){
		var This=this;
		var date=new Date();
		var time=date.getTime();
		console.log("此标签创建时间:"+time);
		if(this.strarr.length==10)
		{
			var min=9999999999999;
			var minindex=0;
			for(var i=0;i<This.box.childNodes.length;i++)
			{
				if(min>This.box.childNodes[i].getAttribute("createtime"))
				{
					minindex=i;
					min=This.box.childNodes[i].getAttribute("createtime");
				}
			}
			console.log("minindex="+minindex);
			This.strarr.splice(minindex,1,num);
			This.box.childNodes[minindex].innerHTML=num;
			This.box.childNodes[minindex].setAttribute("createtime",time);
			
		}else{
			this.strarr.push(num);
			this.showTag(num,time);
		}
		for (var i =0;i< This.strarr.length ;  i++) {
			console.log("strarr["+i+"]="+This.strarr[i]);
		}
	},
	showTag:function(num,time){
		var This=this;
		var newdiv=document.createElement("div");
		newdiv.className="taglist";
		newdiv.setAttribute('createtime',time);
		newdiv.innerHTML=num;
		newdiv.style.width=num.length*15+'px';
		This.box.appendChild(newdiv);
		//添加点击事件
		addEvent(newdiv,"click",function(){
			This.box.removeChild(this);
			for(i in This.strarr)
			{
				if(This.strarr[i]==this.innerHTML.split('删除')[1])
				{
					This.strarr.splice(i, 1);
				}
			}
		});	
		//添加鼠标移入事件
		addEvent(newdiv,"mouseover",function(){
			this.innerHTML="删除"+num;
			// this.style.background="red";
			this.className="mouseover taglist";
			this.style.width=parseInt(this.style.width.split('p')[0])+60+'px';
			
		});	
		addEvent(newdiv,"mouseout",function(){
			this.innerHTML=num;
			this.className="taglist";
			this.style.width=parseInt(this.style.width.split('p')[0])-60+'px'
		});	
	},
	
};

var tag1=new Tag('TagInput','TagBox','tagbtn');
tag1.id.onkeypress=function(e){
	//标准浏览器event  IE:window.event
	var e=e||window.event;
	tag1.tagKeypress(e);
};
var tag2=new Tag('hobby','HobbyBox','hobbybtn');
addEvent(tag2.btn,'click',function(){
	tag2.btnclick();
});