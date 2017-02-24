/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/*定义正则表达式,用于验证表单的输入*/
var regCity = /^[\u4e00-\u9fa5a-zZ\/\(\)]+$/;
var regData = /\d/;
//去除两边空格
var trim = function(str) {
	return str.replace(/\s+/g, '');
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=document.getElementById("aqi-city-input").value;
	var num=document.getElementById("aqi-value-input").value;
	if (!regCity.test(trim(city))) {
		alert("城市的名称必须为中英文字符");
	} else if (!regData.test(trim(num))) {
		alert("空气质量必须为整数");
	} else {
		aqiData[city]=num;
	}
	
//	for(e in aqiData)
//	{
//		alert(e+":"+aqiData[e]);
//	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table=document.getElementById("aqi-table");
	var str="<tr><td>城市</td><td>空气质量</td><td>操作</td>";
	
	for(event in aqiData)
	{
		str+="</tr><tr><td>"+event+"</td><td>"+aqiData[event]+"</td><td><button>删除</button></td></tr>"
	}
	table.innerHTML=str;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(obj) {
  // do sth.
   var city = obj.target.parentNode.parentNode.firstChild.innerHTML;

	delete aqiData[city];
	renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var addbtn=document.getElementById("add-btn");
	addbtn.addEventListener("click",function(){
		addBtnHandle();
	});
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var table = document.getElementById("aqi-table");
	table.addEventListener("click",delBtnHandle);
}

init();