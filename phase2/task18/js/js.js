//表单验证的安全类
function CheckFrom(){
	if(!this instanceof CheckFrom)
	{
		return new CheckFrom();
	}
}
CheckFrom.prototype={
	checkNum:function(inputNode,prompt,title){
		var value=inputNode.value,
			msg='error',
			len=0,
			istrue=0;	
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
		istrue=this.promptStyle(msg,title,prompt,inputNode);
		return istrue;
	},
	checkPwd:function(psd,repsd,title,prompt){
		var msg,
			psdValue=psd.value,
			repsdValue=repsd.value,
			istrue=0;
		psdValue==repsdValue?msg='success':msg='repwd_error';
		if(repsdValue.length==0)
			msg='empty';
		istrue=this.promptStyle(msg,title,prompt,repsd);
		return istrue;
	},	
	//提示栏样式
	promptStyle:function(msg,title,prompt,inputNode){
		var istrue=0;
		switch(msg){
			case 'empty':
				prompt.innerHTML=title+"不能为空";
				prompt.style.color='red';
				inputNode.style.borderColor='red';
				break;
			case 'success': 
				prompt.innerHTML=title+"格式正确";
				prompt.style.color='green';
				inputNode.style.borderColor='green';
				istrue=1;
				break;
			case 'error':
				prompt.innerHTML=title+"必填，长度为4~16个字符";
				prompt.style.color='#aaa';
				inputNode.style.borderColor='';
				break;
			case 'repwd_error':
				prompt.innerHTML=title+"与密码不一致";
				prompt.style.color='red';
				inputNode.style.borderColor='red';
				break;
		}
		return istrue;
	},
	//事件绑定
	bindEvent:function(dom,type,fn){
		addEvent(dom,type,fn);
	},
};
var checkFrom=new CheckFrom();
var section=document.getElementsByTagName("section")[0];
var name_istrue=0,
	pwd_istrue=0,
	repwd_istrue=0;
//名称
var nameinput=document.getElementById("nameinput");
checkFrom.bindEvent(nameinput,'focus',function(){
	var nameresult=document.getElementById("nameresult");
	checkFrom.promptStyle('error','名称',nameresult,nameinput);
});
checkFrom.bindEvent(nameinput,'blur',function(){
	var nameresult=document.getElementById("nameresult");
	name_istrue=checkFrom.checkNum(nameinput,nameresult,'名称');
});

//密码
var password=document.getElementById("password");
checkFrom.bindEvent(password,'focus',function(){
	var pwdresult=document.getElementById("pwdresult");
	checkFrom.promptStyle('error','密码',pwdresult,password);
});
checkFrom.bindEvent(password,'blur',function(){
	var pwdresult=document.getElementById("pwdresult");
	pwd_istrue=checkFrom.checkNum(password,pwdresult,'密码');
	console.log(pwd_istrue);
});

//确认密码
var repassword=document.getElementById("repassword");
checkFrom.bindEvent(repassword,'focus',function(){
	var repwdresult=document.getElementById("repwdresult");
	checkFrom.promptStyle('error','确认密码',repwdresult,repassword);
});
checkFrom.bindEvent(repassword,'blur',function(){
	var repwdresult=document.getElementById("repwdresult");
	repwd_istrue=checkFrom.checkPwd(password,repassword,'确认密码',repwdresult);
});

// var submitbtn=doucment.getElementById("submitbtn");
checkFrom.bindEvent(submitbtn,'click',function(){
	name_istrue&&pwd_istrue&&repwd_istrue?alert('提交成功'):alert('提交失败');
});