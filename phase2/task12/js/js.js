//Tree安全类
function Tree(){
	if(this instanceof Tree)
	{//若新创建的实例不属于Tree,则创建Tree的实例
		this.nodearr=[];
		this.index=0;
		this.selectdiv;
		this.look=false;
	}else{
		return new Tree();
	}
};
Tree.prototype={
	//深度优先
	depthSearch:function(node){
		if(node){
			this.nodearr.push(node);
			for(var i=0;i<node.children.length;i++)
			{
				this.depthSearch(node.children[i]);
			}
		}
		
	},
	//广度优先
	breadthSearch:function(node){
		if(node){
			this.nodearr.push(node);
			this.breadthSearch(node.nextElementSibling);
			node = this.nodearr[this.index++];
			this.breadthSearch(node.firstElementChild);
		}
	},
	//给每个元素绑定点击事件
	addClick:function(){
		var This=this;
		for(var i=0;i<This.nodearr.length;i++)
		{
			addEvent(This.nodearr[i],'click',function(e){
				This.clear();
				preventDefault(e);//阻止默认行为
				e.stopPropagation();//阻止事件冒泡   只要在click事件中，就不会触发上层click事件
				this.style.backgroundColor="#ddd";
				This.selectdiv=this;
				console.log(This.selectdiv.firstChild.nodeValue.trim());
			});
		}
	},
	//清除
	clear:function(){
		var This=this;
		//清空所存储的树节点
		This.nodearr=[];
		//重新遍历树
		This.depthSearch(root);
		for(var i=0;i<This.nodearr.length;i++)
		{
			This.nodearr[i].style.backgroundColor="#fff";
		}
	},
	addDiv:function(content){
		var This=this;
		if(This.look)
		{
			alert("请等待任务执行完成!");
		}else{
			if(this.selectdiv)
			{
				if(content!="")
				{
	//				alert(this.selectdiv.firstChild.nodeValue.trim());
					var newdiv=document.createElement("div");
					newdiv.className="child";
					newdiv.innerHTML=content;
					//为新创建的节点添加点击事件
					addEvent(newdiv,'click',function(e){
						This.clear();
						preventDefault(e);//阻止默认行为
						e.stopPropagation();//阻止事件冒泡   只要在click事件中，就不会触发上层click事件
						this.style.backgroundColor="#ddd";
						This.selectdiv=this;
					});
					this.selectdiv.appendChild(newdiv);
				}else{
					alert("节点内容不能为空!");
				}
			}else{
				alert("请先选择节点!");
			}
		}
	},
	delDiv:function(){
		var This=this;
		if(This.look)
		{
			alert("请等待任务执行完成!");
		}else{
			if(this.selectdiv)
			{
	//			alert(This.selectdiv.parentNode.firstChild.nodeValue);
				This.selectdiv.parentNode.removeChild(This.selectdiv);
			}else{
				alert("请先选择节点!");
			}
		}
		
	},
	//
	draw:function(serch){
		var This=this;
		var nodearr=this.nodearr;
		this.nodearr=[];
		var i=0;
		var length=nodearr.length;
		var timer;
		var speed=document.getElementById("speed").value;
		var isequal=false;
		timer=setInterval(function(){
			This.look=true;
			if(i<length)
			{
				if(nodearr[i].firstChild.nodeValue.trim()==serch)
				{
					isequal=true;
					nodearr[i].style.background="red";
					if(i!=0)
					{
						if(nodearr[i-1].firstChild.nodeValue.trim()!=serch)
						{
							nodearr[i-1].style.background="#fff";
						}
					}
					
				}else{
					nodearr[i].style.background="#16324A";
					if(i!=0)
					{
						if(isequal)
						{
//							nodearr[i-1].style.background="green";
						}else{
							nodearr[i-1].style.background="#fff";
						}
					}
					isequal=false;
				}
				i++;
			}else{
				if(!isequal)
				{
					nodearr[i-1].style.background="#fff";
				}
				clearInterval(timer);
				This.look=false;
			}
		},speed);	
	},
}
var tree=new Tree();
var btnteam=document.getElementById('btnteam');
var btns=btnteam.getElementsByTagName("button");
var root=document.getElementById('content');

var operateBox=document.getElementById("operateBox");
var operatebtns=operateBox.getElementsByTagName("button");
//先遍历一遍所有的元素,并存储到数组中
tree.depthSearch(root);
//添加选择事件
tree.addClick();


//添加事件
//深度优先遍历
addEvent(btns[0],'click',function(){
	if(tree.look)
	{
		alert("请等待任务执行完成!");
	}else{
		tree.nodearr=[];
		tree.depthSearch(root);
		tree.draw(null);
	}
	
});
//广度优先遍历
addEvent(btns[1],'click',function(){
	if(tree.look)
	{
		alert("请等待任务执行完成!");
	}else{
		tree.index=0;
		tree.nodearr=[];
		tree.breadthSearch(root);
		tree.draw(null);
	}
});
//深度优先搜索
addEvent(btns[2],'click',function(){
	if(tree.look)
	{
		alert("请等待任务执行完成!");
	}else{
		tree.nodearr=[];
		var serch=document.getElementById("serch").value.trim();
		tree.depthSearch(root);
		tree.draw(serch);
	}
	
});
//广度优先搜索
addEvent(btns[3],'click',function(){
	if(tree.look)
	{
		alert("请等待任务执行完成!");
	}else{
		tree.index=0;
		tree.nodearr=[];
		var serch=document.getElementById("serch").value.trim();
		tree.breadthSearch(root);
		tree.draw(serch);
	}
});
//添加节点
addEvent(operatebtns[0],'click',function(){
	if(tree.look)
	{
		alert("请等待任务执行完成!");
	}else{
		var content=document.getElementById("neirong").value.trim();
		tree.addDiv(content);
	}
});
//删除节点
addEvent(operatebtns[1],'click',function(){
	if(tree.look)
	{
		alert("请等待任务执行完成!");
	}else{
		tree.delDiv();
	}
});


