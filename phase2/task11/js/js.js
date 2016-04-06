//Tree安全类
function Tree(){
	if(this instanceof Tree)
	{//若新创建的实例不属于Tree,则创建Tree的实例
		this.nodearr=[];
		this.index=0;
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
	draw:function(serch){
		var This=this;
		var nodearr=this.nodearr;
		this.nodearr=[];
		var i=0;
		var length=nodearr.length;
		var timer;
		var speed=document.getElementById("speed").value;
		timer=setInterval(function(){
			if(i<length)
			{
				if(nodearr[i].firstChild.nodeValue.trim()==serch)
				{
					nodearr[i].style.background="red";
					if(i!=0)
					{
						nodearr[i-1].style.background="#fff";
					}
					i++;
				}else{
					nodearr[i].style.background="#16324A";
					if(i!=0)
					{
						nodearr[i-1].style.background="#fff";
					}
				}
				i++;
			}else{
				nodearr[i-1].style.background="#fff";
				clearInterval(timer);
			}
		},speed);	
	},
}
var tree=new Tree();
var btnteam=document.getElementById('btnteam');
var btns=btnteam.getElementsByTagName("button");
var root=document.getElementById('content');

//添加事件
addEvent(btns[0],'click',function(){
	tree.depthSearch(root);
	tree.draw(null);
	
});
addEvent(btns[1],'click',function(){
	tree.index=0;
	tree.breadthSearch(root);
//	for(var i=0;i<tree.nodearr.length;i++)
//	{
//		console.log(tree.nodearr[i]);
//	}
	tree.draw(null);
});
addEvent(btns[2],'click',function(){
	var serch=document.getElementById("serch").value.trim();
	tree.depthSearch(root);
	tree.draw(serch);
	
});
addEvent(btns[3],'click',function(){
	tree.index=0;
	var serch=document.getElementById("serch").value.trim();
	tree.breadthSearch(root);
	tree.draw(serch);
	
});

