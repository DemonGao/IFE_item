var list={
	listarr:[],
	operatearr:["leftin","rightin","leftout","rightout","sort"],
	checkInput:function(num){
		var regNum=/\d{2,3}/;
		var numcount=document.querySelectorAll(".list");
		if(regNum.test(num)&&num>=10&&num<=100)
		{
			if(numcount.length>60)
			{
				alert("队列元素数量最多限制为60个");
				return 0;
			}
			return num;
		}else{
			alert("请输入10-100的整数");
			return 0;
		}
	},
	operate:{
		leftin:function(num){
			console.log("左侧入:"+num);
			if(!list.checkInput(num)==0)
			{
				list.add.addFrist(list.checkInput(num));
			}
		},
		rightin:function(num){
			console.log("右侧入");
			if(!list.checkInput(num)==0)
			{
				list.add.addLast(list.checkInput(num));
			}
		},
		leftout:function(){
			console.log("左侧出");
			var liarr=document.querySelectorAll(".list");
			if(liarr.length==0)
			{
				alert("队列为空!请先添加元素");
			}else{
				list.del(liarr[0]);
			}
		},
		rightout:function(){
			console.log("右侧出");
			var liarr=document.querySelectorAll(".list");
			if(liarr.length==0)
			{
				alert("队列为空!请先添加元素");
			}else{
				list.del(liarr[liarr.length-1]);
			}
		}
	},
	add:{
		//左侧入
		addFrist:function(num){
			var newli=document.createElement("li");
			newli.className="list";
			newli.style.height=num*3+'px';
			newli.innerHTML=num;
			newul.insertBefore(newli,newul.childNodes[0]);
			newli.addEventListener("click",function(){
				list.del(this);
			});
		},
		//右侧入
		addLast:function(num){
			var newli=document.createElement("li");
			newli.className="list";
			newli.style.height=num*3+'px';
			newli.innerHTML=num;
			newul.appendChild(newli);
			newli.addEventListener("click",function(){
				list.del(this);
			});
		},
	},
	del:function(e){
		alert("移除数值:"+e.innerHTML);
		newul.removeChild(e);
	},
	addEvent:function(){
		var liarr=document.querySelectorAll(".list");
		for(var i=0;i<liarr.length;i++)
		{
			liarr[i].addEventListener("click",function(){
				list.del(this);
			});
		}
	},
	sort:function(){
		console.log("sort");
		var liarr=document.querySelectorAll(".list");
		for(var i=0;i<liarr.length;i++)
		{
			list.listarr[i]=liarr[i].innerHTML;
		}
		var count=0;
		var sortanimation=setInterval(function(){
			if(count>list.listarr.length)
			{
				clearInterval(sortanimation);
			}
			for(var j=count+1;j<list.listarr.length;j++)
			{
				if(list.listarr[count]>list.listarr[j])
				{
					temp=list.listarr[count];
					list.listarr[count]=list.listarr[j];
					list.listarr[j]=temp;
				}
			}
			count++;
			for(var i=0;i<liarr.length;i++)
			{
				liarr[i].innerHTML=list.listarr[i];
				liarr[i].style.height=list.listarr[i]*3+'px';
			}
		},300);
	}
};


//按钮事件绑定
var $$=document.querySelectorAll("button");
$$[0].addEventListener("click",function(){
	var $=document.querySelector("input");
	list.operate[list.operatearr[0]]($.value);
});	
$$[1].addEventListener("click",function(){
	var $=document.querySelector("input");
	list.operate[list.operatearr[1]]($.value);
});	
$$[2].addEventListener("click",function(){
	var $=document.querySelector("input");
	list.operate[list.operatearr[2]]();
});	
$$[3].addEventListener("click",function(){
	var $=document.querySelector("input");
	list.operate[list.operatearr[3]]();
});	
$$[4].addEventListener("click",function(){
	var $=document.querySelector("input");
	list[list.operatearr[4]]();
});	

//创建ul
var box=document.getElementById("box");
var newul=document.createElement("ul");
box.appendChild(newul);
