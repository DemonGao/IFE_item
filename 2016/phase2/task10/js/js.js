//Tree安全类
function Tree(){
	if(this instanceof Tree)
	{//若新创建的实例不属于Tree,则创建Tree的实例
		this.nodearr=[];
		 this.ifdraw = false;
	}else{
		return new Tree();
	}
};
Tree.prototype={
	//先序遍历
	preOrder:function(node){
		this.nodearr.push(node);
		if(node.firstElementChild)
		{
			this.preOrder(node.firstElementChild);
		}
		if(node.lastElementChild)
		{
			this.preOrder(node.lastElementChild);
		}
	},
	//中序遍历
	middOrder:function(node){
		if(node.firstElementChild)
		{
			this.middOrder(node.firstElementChild);
		}
		this.nodearr.push(node);
		if(node.lastElementChild)
		{
			this.middOrder(node.lastElementChild);
		}
	},
	//后序遍历
	endOrder:function(node){
		if(node.firstElementChild)
		{
			this.endOrder(node.firstElementChild);
		}
		if(node.lastElementChild)
		{
			this.endOrder(node.lastElementChild);
		}
		this.nodearr.push(node);
	},
	toDraw:function(){
		var This=this;
		var speed=document.getElementById("speed").value;
		var i=0;
		//将数组中的元素放到新数组中
		var nodearr=this.nodearr;
		//清空数组
		This.nodearr=[];
		var draw;
		console.log(nodearr.length);
		if(!This.ifdraw)
		{
			This.ifdraw=true;
			nodearr[i].style.background="#16324A";
			draw=setInterval(function(){
				if(i==nodearr.length-1){
					This.ifdraw=false;
					nodearr[i].style.background="#fff";
					clearInterval(draw);
				}else{
					++i;
					nodearr[i].style.background="#16324A";
					nodearr[i-1].style.background="#fff";
				}
			},speed);
		}
	}
}
var tree=new Tree();
var btnteam=document.getElementById('btnteam');
var btns=btnteam.getElementsByTagName("button");
var root=document.getElementById('content');

//添加事件
addEvent(btns[0],'click',function(){
	tree.preOrder(root);
	tree.toDraw();
});
addEvent(btns[1],'click',function(){
	tree.middOrder(root);
	tree.toDraw();
});
addEvent(btns[2],'click',function(){
	tree.endOrder(root);
	tree.toDraw();
});
