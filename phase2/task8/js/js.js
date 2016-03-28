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
		wordadd:function(word){
			var newli=document.createElement("li");
			newli.className="list";
			newli.innerHTML=word;
			newli.style.height=word*3+'px';
			newul.appendChild(newli);
		},
	},
	operate:{
		//左侧进
		leftin:function(word){
			list.Util.wordadd(word);
		},
		//右侧进
		rightin:function(){

		},
		//左侧出
		leftout:function(){

		},
		//右侧出
		rightout:function(){

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

//插入ul
var box=document.getElementById("box");
var newul=document.createElement("ul");
box.appendChild(newul);
