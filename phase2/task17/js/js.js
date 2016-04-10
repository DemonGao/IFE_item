//表单验证的安全类
function CheckFrom(){
	if(!this instanceof CheckFrom)
	{
		return new CheckFrom();
	}
}
CheckFrom.prototype={
	checkNum:function(inputNode,prompt){
		var value=inputNode.value.trim(),
			msg='error',
			len=0;	
		for(var i=0;i<value.length;i++)
		{
			//获取每个字符的 Unicode 编码
			charCode = value.charCodeAt(i);
			charCode >= 0 && charCode <= 128?len += 1:len += 2;   
		}
		if(len==0){
			msg='empty';
		}else if(len>=4&&len<=16)
		{
			msg='success';

		}else{
			msg='error';
		}
		this.promptStyle(msg,prompt,inputNode);
	},
	//提示栏样式
	promptStyle:function(msg,prompt,inputNode){
		switch(msg){
			case 'empty':
				prompt.innerHTML="姓名不能为空";
				prompt.style.color='red';
				inputNode.style.borderColor='red';
				break;
			case 'success': 
				prompt.innerHTML="名称格式正确";
				prompt.style.color='green';
				inputNode.style.borderColor='green';
				break;
			case 'error':
				prompt.innerHTML="必填，长度为4~16个字符";
				prompt.style.color='#aaa';
				inputNode.style.borderColor='';
				break;
		}
	}
};
var checkFrom=new CheckFrom();
var section=document.getElementsByTagName("section")[0];
//事件委托
delegate(section,'checkbtn','click',function(){
	var checkInput=document.getElementById("checkInput");
	var checkresult=document.getElementById("checkresult");
	checkFrom.checkNum(checkInput,checkresult);
});