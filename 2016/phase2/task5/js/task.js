/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];
function getWidth(width, len) {
    var posObj = {};
    posObj.width = Math.floor(width / (len*2));
    posObj.left = Math.floor(width / len);
    posObj.offsetLeft = (width - posObj.left * (len - 1) - posObj.width) / 2;
    return posObj;
}
function getTitle() {
    switch (pageState.nowGraTime) {
        case "day":
            return "每日";
        case "week":
            return "周平均";
        case "month":
            return "月平均";
    }
}
/**
 * 渲染图表
 */
function renderChart() {
	var innerHTML = "", i = 0;
    var wrapper = document.getElementById("aqi-chart-wrap");
    var width = wrapper.clientWidth;
    var selectedData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
    var len = Object.keys(selectedData).length;
    var posObj = getWidth(width, len);
    innerHTML += "<div class='title'>" + pageState.nowSelectCity + "市01-03月"+ getTitle() +"空气质量报告</div>"
    for (var key in selectedData) {
        innerHTML += "<div class='aqi-bar " + pageState.nowGraTime + "' style='height:" + selectedData[key] + "px; width: " + posObj.width +"px; left:" + (posObj.left * i + posObj.offsetLeft) + "px; background-color:" + colors[Math.floor(Math.random() * 11)] + "'></div>"
        innerHTML += "<div class='aqi-hint' style='bottom: " + (selectedData[key] + 10) + "px; left:" + (posObj.left * (i++) + posObj.offsetLeft + posObj.width / 2 - 60) + "'>" + key + "<br/> [AQI]: " + selectedData[key] + "</div>"
    }
    wrapper.innerHTML = innerHTML;
	
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  // 确定是否选项发生了变化 
	
	console.log(e.target.value);
  // 设置对应数据
	var gratime=e.target.value;
	pageState.nowGraTime=gratime;
  // 调用图表渲染函数
  	renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
  // 确定是否选项发生了变化 
  	var city=e.target.value;
  	
  // 设置对应数据
	pageState.nowSelectCity=city;
	console.log(pageState.nowSelectCity);
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var radio =document.getElementsByName("gra-time");
	
	for(var i=0;i<radio.length;i++)
	{
		radio[i].addEventListener("change",function(e){
			graTimeChange(e);
		});
	}
	

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var cityselect=document.getElementById("city-select");
	cityselect.options.remove(0);
	for(e in aqiSourceData)
	{
		cityselect.options.add(new Option(e,e)); 
	}
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	cityselect.addEventListener("change",function(e){
		citySelectChange(e);
	});
}

/**
 * 初始化图表需要的数据格式
 */

//var aqiSourceData = {
//"北京": {
//  "2016-01-01": 10,
//  "2016-01-02": 10,
//  "2016-01-03": 10,
//  "2016-01-04": 10
//}
//};
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  	var week={},month={},singleWeek={},singleMonth={};
  	var count=0,mcount=0;
	for(key in aqiSourceData)
	{
		var tempcity = aqiSourceData[key];
		var keyArr = Object.getOwnPropertyNames(tempcity).sort();//日期 -  Object.getOwnPropertyNames() 返回一个数组,该数组是属性名称字符串
		var tempMonth = keyArr[0].slice(5, 7);
		for (var i = 0; i < keyArr.length; i++) {
			count += tempcity[keyArr[i]];//keyArr[i]:日期      tempcity[keyArr[i]]:每一天的数据
			mcount += tempcity[keyArr[i]];
			if(i!=0&&i%7==0)
			{
//				console.log(keyArr[i].slice(0, 4)+"第"+i/7+"周");
				var tempKey=keyArr[i].slice(0, 4)+"第"+i/7+"周";
				singleWeek[tempKey] = Math.floor(count / 7);
                count = 0;
			}
			if(keyArr[i].slice(5,7)!==tempMonth ||i==keyArr.length-1)
			{
				tempMonth = keyArr[i].slice(5, 7);
				var tempMKey=keyArr[i-1].slice(0,7);
//				console.log(tempMKey);
				var tempDays = (i == keyArr.length - 1) ? keyArr[i].slice(-2) : keyArr[i-1].slice(-2);
//				console.log(tempDays)
				singleMonth[tempMKey] = Math.floor(mcount / tempDays);
				mcount = 0;
			}
		}
		week[key] = singleWeek;
        month[key] = singleMonth;
        singleWeek = {};
        singleMonth = {};
	}
  // 处理好的数据存到 chartData 中
  	
  	chartData.day=aqiSourceData;
	chartData.week=week;
	chartData.month=month;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
