//事件绑定函数，兼容浏览器差异
function addEvent(element,event,listener){
	if(element.addEventListener){
		element.addEventListener(event,listener,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+event,listener);
	}else{
		element["on"+event]=listener;
	}
}

var list={
	inputArray:[],
	//工具类
	Util:{
		//拆分textarea获取的字符串,将其转换成数组
		splittextarea:function(){
			var text=document.getElementById("textstr").value;
			list.inputArray = (text).split(/[,，;；、\s\n]+/);
		},
		//遍历数组,对每一个数组元素执行fun函数,并将索引和元素作为参数传递
		each:function(arr,fun){
			console.log("each");
			for(var i=0;i<arr.length;i++)
			{
				fun(arr[i]);
			}
		},
		//添加方法
		wordadd:function(word){
			var newli=document.createElement("li");
			newli.className="list";
			newli.innerHTML=word;
			return newli;
		},
		//删除方法
		worddel:function(e){
			alert(e.innerHTML);
			newul.removeChild(e);
		},
		//查询方法(模糊查询)
		fuzzyQuery:function(serchtext){
			//清除上一次查询的标记
			list.Util.clearState();

			var liarr=document.querySelectorAll(".list");
			for(var i=0;i<liarr.length;i++)
			{
				if(liarr[i].innerHTML.indexOf(serchtext)!=-1)
				{
					liarr[i].style.background="#E25C60";
					liarr[i].style.color="#fff";
				}
			}
		},
		clearState:function(){
			var liarr=document.querySelectorAll(".list");
			for(var i=0;i<liarr.length;i++)
			{
				liarr[i].style.background="#fff";
				liarr[i].style.color="#E25C60";
			}
		}
	},
	operate:{
		//左侧进
		leftin:function(word){
			var newli=list.Util.wordadd(word);
			newul.insertBefore(newli,newul.childNodes[0]);
			//添加鼠标点击删除事件
			addEvent(newli,"click",function(){list.Util.worddel(this);});
		},
		//右侧进
		rightin:function(word){
			var newli=list.Util.wordadd(word);
			newul.appendChild(newli);
			//添加鼠标点击删除事件
			addEvent(newli,"click",function(){list.Util.worddel(this);});
		},
		//左侧出
		leftout:function(){
			var liarr=document.querySelectorAll(".list");
			if(liarr.length==0)
			{
				alert("队列为空!请先添加元素");
			}else{
				list.Util.worddel(liarr[0]);
			}
		},
		//右侧出
		rightout:function(){
			var liarr=document.querySelectorAll(".list");
			if(liarr.length==0)
			{
				alert("队列为空!请先添加元素");
			}else{
				list.Util.worddel(liarr[liarr.length-1]);
			}
		},
		serch:function(){
			var serchtext=document.getElementById("select").value;
			list.Util.fuzzyQuery(serchtext);
		}
	},
	add:{
		left:function(){
			list.Util.splittextarea();
			list.Util.each(list.inputArray,function(word){list.operate.leftin(word)});
		},
		right:function(){
			list.Util.splittextarea();
			list.Util.each(list.inputArray,function(word){list.operate.rightin(word)});
		}
	},
};


var btns=document.getElementsByTagName("button");
addEvent(btns[0],"click",function(){list.add["left"]();});
addEvent(btns[1],"click",function(){list.add["right"]();});
addEvent(btns[2],"click",function(){list.operate["leftout"]()});
addEvent(btns[3],"click",function(){list.operate["rightout"]()});
addEvent(btns[4],"click",function(){list.operate["serch"]()});


//插入ul
var box=document.getElementById("box");
var newul=document.createElement("ul");
box.appendChild(newul);
