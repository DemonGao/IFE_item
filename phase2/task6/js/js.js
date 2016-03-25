var list={
	queue:[],
	//左侧入
	"left-in":function(num){
		this.queue.unshift(num);
		this.paint();
	},
	//右侧入
	"right-in":function(num){
		this.queue.push(num);
		this.paint();
	},
	//左侧出
	"left-out":function(){
		this.queue.shift();
		list.paint();
	},
	//右侧出
	"right-out":function(){
		this.queue.pop();
		list.paint();
	},
	del:function(num){
		this.queue.splice(num,1);
		this.paint();
	},
	paint:function(){   //重绘
			var str=list.queue.reduce(function(s,v){
				return s+"<div>"+v+"</div>";
				},"");
			container.innerHTML=str;
			addDivEvent();
	},
	test:function(){
		//测试方法
		var num=list.queue.length;
		for(var i=0;i<num;i++)
		{
			console.log(this.queue.pop());
		}
	}
};
function addDivEvent(){  //重新绑定数字div的事件
		var btn=container.getElementsByTagName("div");
		for(var i=0;i<btn.length;i++){
			btn[i].onclick=function(i){  //这里不做个闭包的话，i值无法传入。
				return function(){       //因为变量的活动对象是“静态”的，只能为最后一个固定的值。如var i=1;i=2;最后i的值毫无疑问是2；
					return list.del(i);  //解决的方法，就是闭包，在内形成另一个作用域，并引用内作用域的i而不是外作用域的i
				}
			}(i)
		}
}
var container=document.getElementById("queueBox");
var btnli=document.getElementById("left-in");
var btnri=document.getElementById("right-in");
var btnlo=document.getElementById("left-out");
var btnro=document.getElementById("right-out");
btnli.addEventListener("click",function(){
	var inputValue=document.getElementById("inputnum").value;
	list["left-in"](inputValue);
	console.log("左侧入");
});
btnri.addEventListener("click",function(){
	var inputValue=document.getElementById("inputnum").value;
	list["right-in"](inputValue);
	console.log("右侧入");
});
btnlo.addEventListener("click",function(){
	list["left-out"]();
	console.log("左侧出");
});
btnro.addEventListener("click",function(){
	list["right-out"]();
	console.log("右侧出");
});
addDivEvent();


	