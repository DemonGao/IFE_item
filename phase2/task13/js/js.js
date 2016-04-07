/*
 用委托模式封装一个事件委托方法(通过判断className的值来添加事件)
 参数:
	 parent:父元素
	 classname:class的名称
	 type:操作方式
	 fun:执行函数
 * */
function delegate(parent,classname,type,fun){
	addEvent(parent,type,function(event){
		////获取事件对象
		var e=getEvent(),
			target=getTarget();
		if(target.className===classname){
			fun(target);
		}
	});
}
/*
 * Tree
 * 参数:
 */
var Tree=function(){
	if(this instanceof Tree)
	{
		this.nodearr=[];
	}else{
		return new Tree();
	}
	
};
Tree.prototype={
	/*
	 *添加节点
	 * 参数:
	 * 		parent:父节点
	 * 		content:内容
	 * */
	addNode:function(parent,content){
		//创建div:tree
		var tree=document.createElement('div');
		tree.className='tree';
		var tree_head=document.createElement('p');
		tree_head.className='tree-head';
		var icon_icon_empty=document.createElement('span');
		icon_icon_empty.className='icon icon-empty';
		var icon_icon_title=document.createElement('span');
		icon_icon_title.className='tree-head-title';
		icon_icon_title.innerHTML=content;
		var icon_icon_add=document.createElement('span');
		icon_icon_add.className='icon_icon_add';
		var icon_icon_del=document.createElement('span');
		icon_icon_del.className='icon icon-del';
		parent.appendChild(tree);
		tree.appendChild(tree_head);
		tree_head.appendChild(icon_icon_empty);
		tree_head.appendChild(icon_icon_title);
		tree_head.appendChild(icon_icon_add);
		tree_head.appendChild(icon_icon_del);
		//将添加的节点放入数组中
		this.nodearr.push(tree);
		return tree;
	},
	/*事件绑定
	 * 参数:
	 * 		event:节点
	 */
	bindEvent:function(){
		var This=this;
		//事件委托----树的显隐(点击事件)
		delegate(root,"icon icon-add show","click",function(target){
			var content=prompt("请输入要添加的节点名称","");
			if (content!=null && content!="")
			{
				This.addNode(target.parentNode.parentNode,content);
			}
			
		});
	},
	/*树的显示隐藏
	 * 
	 * */
	toggle:function(){
		var root=document.getElementById("root");
		//事件委托----树的显隐(点击事件)
		delegate(root,"tree-head-title","click",function(target){
			var len=target.parentNode.parentNode.children.length;
			if(len>1)
			{
				console.log(target.parentNode.parentNode.children[0].className);
				if(target.parentNode.parentNode.children[0].className=="tree-head")
				{
					for(var i=1;i<len;i++)
					{
						target.parentNode.parentNode.children[i].className="tree tree-hidden";
						target.parentNode.children[0].className="icon icon-close";
					}
					target.parentNode.parentNode.children[0].className="tree-head tree-head-hidden";
				}else{
					for(var i=1;i<len;i++)
					{
						target.parentNode.parentNode.children[i].className="tree";
						target.parentNode.children[0].className="icon icon-open";
					}
					target.parentNode.parentNode.children[0].className="tree-head";
				}
				
			}
		});
	},
	/*显示添加删除
	 *
	 * */
	operateshow:function(){
		var This=this;
		//事件委托----onmouseover
		delegate(root,"tree-head","mouseover",function(target){
//			target.parentNode.children[2].className="icon icon-add show";
//			target.parentNode.children[3].className="icon icon-del show";
			target.children[2].className="icon icon-add show";
			target.children[3].className="icon icon-del show";
		});
	},
	//隐藏添加删除
	operatehidden:function(){
		//事件委托----onmouseout
		delegate(root,"tree-head","mouseout",function(target){
			target.children[2].className="icon icon-add";
			target.children[3].className="icon icon-del";
		});	
	},
};
var tree=new Tree();
	tree.toggle();
	tree.operateshow();
	tree.operatehidden();
	tree.bindEvent();
