var Calendar=function(base,fun){
	this.base=base;
	this.calendar;//日历box
	this.calendar_content;
	this.yearSelect;//年份
	this.monthSelect;//月份
	this.day;//日
	this.date=new Date();
	this.lock='day';//默认按钮锁定为日
	this.count=0;//当前页数
	this.pageNums=0;//年份页数
	this.bingDate;//绑定的文本框(用来存储日期)
	this.isclose=true;//日历是否关闭
	this.selectArr={
		selectFirst:null,//起始日期元素
		selectEnd:null,//结束日期元素
//		selectFirstDate:null;
//		selectEndDate:null
	};
}
Calendar.prototype={
	init:function(){
		var This=this,
			base=This.base;
		//判断是否绑定元素 用来显示日期
		if(base.isBind){
			This.bingDate=This.base.bingId.getElementsByClassName('calendar_Text')[0];
			This.createCalendar(true);
			//添加事件
			if(!base.isDays){
				addEvent(This.calendar,'click',function(event){
					var event=getEvent(event);
					var target=getTarget(event);
					preventDefault(event);
					if(target.className==='content_day'){
						var day=target.innerHTML.length==1?'0'+target.innerHTML:target.innerHTML;
						var month=This.monthSelect.innerHTML.length==1?'0'+This.monthSelect.innerHTML:This.monthSelect.innerHTML;
						This.bingDate.value=This.yearSelect.innerHTML+'-'+month+'-'+day;
	//					console.log(base.bingId.offsetWidth+'px')
						Gsc.attr(This.calendar,'className','calendar hidden');
						Gsc.css(This.calendar,'left','-'+base.bingId.offsetWidth+'px');
						This.isclose=true;
					}
				});
			}
			
			//对日历输出框进行事件绑定
			addEvent(This.base.bingId,'click',function(event){
				var event=getEvent(event);
				var target=getTarget(event);
				preventDefault(event);
				if(target.className==='calendar_icon'||target.className==='calendar_Text'){
					if(This.isclose){
						This.isclose=false;
						Gsc.attr(This.calendar,'className','calendar show');
						Gsc.css(This.calendar,'left',This.base.bingId.offsetLeft+'px');
					}else{
						This.isclose=true;
						Gsc.css(This.calendar,'left','-'+base.bingId.offsetWidth+'px');
						Gsc.attr(This.calendar,'className','calendar hidden');
					}
				}
			});
		}else{
			This.createCalendar(false);
		}
		This.getnowYearCount();
		This.createDate(This.calendar_content,'day');
		//判断日历组件是选择具体某天日期，还是选择一个时间段
		if(base.isDays){
			console.log('选择一个时间段');
			This.createBtnteam();//创建btn按钮
			addEvent(This.calendar,'click',function(event){
				var event=getEvent();
				var target=getTarget(event);
				if(target.className==='calendar_btnteam_OK'){
					console.log('确认');
					if(This.selectArr.selectFirst&&This.selectArr.selectEnd){
						Gsc.attr(This.selectArr.selectFirst,'className','content_day');
						Gsc.attr(This.selectArr.selectEnd,'className','content_day');
						//如果绑定,元素则显示时间段  不绑定,则执行回调函数
						if(base.isBind){
							var firstdate=This.selectArr.selectFirst.date;
							var enddate=This.selectArr.selectEnd.date;
							This.bingDate.value=firstdate+'  到  '+enddate;
							Gsc.attr(This.calendar,'className','calendar hidden');
							Gsc.css(This.calendar,'left','-'+base.bingId.offsetWidth+'px');
							This.base.getDatefn_DaysBind();//不绑定元素时,选择完时间段后执行的回调函数
						}else{
							This.base.getDatefn_DaysnoBind();//不绑定元素时,选择完时间段后执行的回调函数
							
						}
						This.isclose=true;
						This.selectArr.selectFirst=null;
						This.selectArr.selectEnd=null;
					}else{
						alert('请先选择日期范围');
					}
				}
				if(target.className==='calendar_btnteam_NO'){
					if(This.selectArr.selectFirst!=null){
						Gsc.attr(This.selectArr.selectFirst,'className','content_day');
						This.selectArr.selectFirst=null;
					}
					if(This.selectArr.selectEnd!=null){
						Gsc.attr(This.selectArr.selectEnd,'className','content_day');
						This.selectArr.selectEnd=null;
					}
				}
			});
		}
	},
//	日历初始定位
	calendarPosition:function(className,position,top,left){
		var base=this.base,
			calendar=this.calendar;
		Gsc.attr(calendar,'className',className);
		Gsc.css(calendar,'position',position);
		Gsc.css(calendar,'top',top);
		Gsc.css(calendar,'left',left);
	},
	//创建日历
	createCalendar:function(isBind)
	{
		var base=this.base;
		var date=this.date;
		var calendar=Gsc.newElement('div');
		this.calendar=calendar;
		//对calendar(日历)定位
		if(isBind){
			var top=base.bingId.offsetTop+this.base.bingId.offsetHeight+'px';
			var left='-'+(base.bingId.offsetLeft+base.bingId.offsetWidth)+'px'
			this.calendarPosition('calendar hidden',base.base_css.position,top,left);
		}else{
			var top=base.base_css.top;
			var left=base.base_css.left;
			this.calendarPosition('calendar show',base.base_css.position,top,left);
		}
		Gsc.insertBefore(document.body,calendar);
		//创建calendar_head(日历头部)
		var calendar_head=Gsc.newElement('div');
		Gsc.attr(calendar_head,'className','calendar_head');
		Gsc.append(calendar,calendar_head);
		//日历头部内容进行装修
		var icon_back=Gsc.newElement('span');//上一个月图标
		Gsc.attr(icon_back,'className','icon_back');
		Gsc.append(calendar_head,icon_back);
		var yearSelect=Gsc.newElement('div');//年份
		
		Gsc.attr(yearSelect,'className','yearSelect');
		Gsc.html(yearSelect,date.getFullYear());
		Gsc.append(calendar_head,yearSelect);	
		this.yearSelect=yearSelect;
		
		var monthSelect=Gsc.newElement('div');//月份
		Gsc.attr(monthSelect,'className','monthSelect');
		Gsc.html(monthSelect,date.getMonth()+1);
		Gsc.append(calendar_head,monthSelect);	
		this.monthSelect=monthSelect;
		
		var icon_go=Gsc.newElement('span');//下一个月图标
		Gsc.attr(icon_go,'className','icon_go');
		Gsc.append(calendar_head,icon_go);
		//创建日历(内容区)
		var calendar_content=Gsc.newElement('div');
		Gsc.attr(calendar_content,'className','calendar_content');
		Gsc.append(calendar,calendar_content);
		this.calendar_content=calendar_content;
		//绘制
		this.bindDefaultEvent(calendar_content);
	},
	//创建btn组,在弹出的日期段选择面板中增加确认和取消按钮
	createBtnteam:function(){
		var This=this;
		var calendar=This.calendar;
		var calendar_btnteam=Gsc.newElement('div');
		Gsc.attr(calendar_btnteam,'className','calendar_btnteam');
		var btnteamStr= '<button class="calendar_btnteam_OK">确认</button>'+
						'<button class="calendar_btnteam_NO">取消</button>';
		Gsc.html(calendar_btnteam,btnteamStr);
		Gsc.append(calendar,calendar_btnteam);
	},
	isDaysMethod:function(target){
		var This=this;
		//重选日期范围
		This.isDays_reselect(target);
	},
	//isDays(相关函数操作)
	//重选日期范围
	isDays_reselect:function(target){
		if(parseInt(this.selectArr.selectFirst.innerHTML)>parseInt(target.innerHTML)||parseInt(target.innerHTML)<this.selectArr.selectEnd.innerHTML){
			Gsc.attr(this.selectArr.selectFirst,'className','content_day');
			this.selectArr.selectFirst=target;
			if(!this.isDays_OOR(target)){
				Gsc.attr(this.selectArr.selectFirst,'className','content_day selectFirst');
//				var firstdate=this.yearSelect.innerHTML+'-'+this.monthSelect.innerHTML+'-'+ this.selectArr.selectFirst.innerHTML;
//				Gsc.attr(this.selectArr.selectFirst,'date',firstdate);
//				console.log("起始日期:"+this.selectArr.selectFirst.date);
			}
		}else{
			Gsc.attr(this.selectArr.selectEnd,'className','content_day');
			this.selectArr.selectEnd=target;
			var enddate=this.yearSelect.innerHTML+'-'+this.monthSelect.innerHTML+'-'+this.selectArr.selectEnd.innerHTML;
			Gsc.attr(this.selectArr.selectEnd,'date',enddate);
			console.log("终止日期:"+this.selectArr.selectEnd.date);
			
			if(!this.isDays_OOR(target)){
				Gsc.attr(this.selectArr.selectEnd,'className','content_day selectEnd');
//				var enddate=this.yearSelect.innerHTML+'-'+this.monthSelect.innerHTML+'-'+this.selectArr.selectEnd.innerHTML;
//				Gsc.attr(this.selectArr.selectEnd,'date',enddate);
//				console.log("终止日期:"+this.selectArr.selectEnd.date);
			}
		}
	}
	,
	//判断是否超出范围 返回布尔值 超出范围返回true 没超出范围返回false
	isDays_OOR:function(target){
		var This=this;
		var len=parseInt(This.selectArr.selectEnd.innerHTML)-parseInt(This.selectArr.selectFirst.innerHTML);
		if(len<0){
			len=-len;
			var team;
			team=This.selectArr.selectEnd;
			This.selectArr.selectEnd=This.selectArr.selectFirst;
			This.selectArr.selectFirst=team;
			Gsc.attr(This.selectArr.selectFirst,'className','content_day selectFirst');
			Gsc.attr(This.selectArr.selectEnd,'className','content_day selectEnd');
		}
		console.log(This.selectArr.selectFirst.date+'----'+This.selectArr.selectEnd.date);
		if(len>=This.base.daylimit[0]&&len<=This.base.daylimit[1]){
			console.log('没超出最大范围:'+len);
			Gsc.attr(This.selectArr.selectEnd,'className','content_day selectEnd');
			return false;
		}else{
			alert("超出允许设置时间段选择的最大跨度");
			Gsc.attr(This.selectArr.selectEnd,'className','content_day');	
			This.selectArr.selectEnd=null;
			console.log("回调函数1");
			return true;
		}
	},
	//获取选择的日期
	getSelectDay:function(target){
		var This=this;
		//如果是选择连续日期时
		if(This.base.isDays){
//			console.log("连续日期:"+target.innerHTML);
			if(This.selectArr.selectFirst!=null){
				if(This.selectArr.selectEnd!=null){
					This.isDaysMethod(target);	
				}else{
					//给结束日期设置一个class
					This.selectArr.selectEnd=target;
					var enddate=This.yearSelect.innerHTML+'-'+This.monthSelect.innerHTML+'-'+This.selectArr.selectEnd.innerHTML;
					Gsc.attr(This.selectArr.selectEnd,'date',enddate);
					console.log("终止日期:"+This.selectArr.selectEnd.date);
					This.isDays_OOR();//判断是否超出规定的范围
				}
			}else{
				//给开始日期设置一个class
				This.selectArr.selectFirst=target;
				var firstdate=This.yearSelect.innerHTML+'-'+This.monthSelect.innerHTML+'-'+ This.selectArr.selectFirst.innerHTML;
				Gsc.attr(This.selectArr.selectFirst,'date',firstdate);
				console.log("起始日期:"+This.selectArr.selectFirst.date);
				Gsc.attr(This.selectArr.selectFirst,'className','content_day selectFirst');
			}
		}else{
			//选择单个日期	
			This.base.getDatefn();
		}
	},
	//向calendar_content 中添加默认事件
	bindDefaultEvent:function(calendar_content){
		var This=this;
		//对日历进行事件绑定
		addEvent(This.calendar,'click',function(event){
			var event=getEvent(event);
			var target=getTarget(event);
			preventDefault(event);
			switch(target.className){
				//点击年份选择时
				case 'yearSelect':
					Gsc.removeChildren(calendar_content);//清空日历content内容
					This.createDate(calendar_content,'year');
					This.lock='year';
				break;
				//点击月份选择时
				case 'monthSelect':
					Gsc.removeChildren(calendar_content);//清空日历content内容
					This.createDate(calendar_content,'month');
					This.lock='month';
				break;
				case 'content_year':
					This.yearSelect.innerHTML=target.innerHTML;//将选择的年份赋值给
					Gsc.removeChildren(calendar_content);//清空年份选择
					This.createDate(calendar_content,'month');
					This.lock='month';
				break;
				case 'content_month':
					This.monthSelect.innerHTML=target.innerHTML;//将选择的年份赋值给
					Gsc.removeChildren(calendar_content);//清空年份选择
					This.createDate(calendar_content,'day');
					break;
				case 'content_day':				
					This.getSelectDay(target);//回调函数
				break;
			}
			//go  back 按钮事件
			if(target.className==='icon_back'){
				switch(This.lock){
					case 'year':
						This.count<=0?This.count=0:This.count=This.count-1;
						Gsc.removeChildren(calendar_content);
						This.createDate(calendar_content,'year');
						break;
					case 'month':
						var year=parseInt(This.yearSelect.innerHTML);
						year<=parseInt(This.base.limit[0])?year=This.base.limit[0]:year=year-1;
						This.yearSelect.innerHTML=year;
						break;
					case 'day':	
						Gsc.removeChildren(calendar_content);//清空日历content内容
						var month=parseInt(This.monthSelect.innerHTML);
						month<=1?month=1:month=month-1;
						This.monthSelect.innerHTML=month;
						This.createDate(calendar_content,'day');
						break;
				}
			}
			if(target.className==='icon_go'){
				switch(This.lock){
					case 'year':
						Gsc.removeChildren(calendar_content);
						This.count>=This.pageNums-1?This.count=This.pageNums-1:This.count=This.count+1;
						This.createDate(calendar_content,'year');					
						break;
					case 'month':
						var year=parseInt(This.yearSelect.innerHTML);
						year>=parseInt(This.base.limit[1])?year=This.base.limit[1]:year=year+1;
						This.yearSelect.innerHTML=year;
						break;
					case 'day':	
						Gsc.removeChildren(calendar_content);//清空日历content内容
						var month=parseInt(This.monthSelect.innerHTML);
						month>=12?month=12:month=month+1;
						This.monthSelect.innerHTML=month;
						This.createDate(calendar_content,'day');
						break;	
				}
			}
			
		});
	},
	//获取今天年份的页数
	getnowYearCount:function(){
		var limit=this.base.limit,
			nowyear=this.date.getFullYear(),
			pagenum=0,
			count=1;
			len=parseInt(this.base.limit[1])-parseInt(this.base.limit[0]);
		this.pageNums=Math.ceil(len/12);
		for(var i=0;i<=parseInt(limit[1])-parseInt(limit[0]);i++){
			if(count%12==0){
				pagenum++;
			}
			if(nowyear===parseInt(i+limit[0])){
				this.count=pagenum;
			}
			count++;
		}
	},
	createDate:function(calendar_content,type){
		var This=this;
		switch(type){
			case 'year':
				var limit=this.base.limit,
					len=parseInt(limit[1])-parseInt(limit[0]),
					num=this.pageNums,
					m=11;
					i=0;
				for(var n=0;n<num;n++){
					if(n==this.count)
					{
						for(i;i<=len&&i<=m;i++){
							var yearNum=Gsc.newElement('div');
							Gsc.attr(yearNum,'className','content_year');
							Gsc.html(yearNum,i+limit[0]);
							Gsc.append(calendar_content,yearNum);
						}
					}else{
						i=i+12;
						m=m+12;
					}
				}
				break;
			case 'month':
				for(var i=1;i<=12;i++)
				{
					var monthNum=Gsc.newElement('div');
					Gsc.attr(monthNum,'className','content_month');
					Gsc.html(monthNum,i);
					Gsc.append(calendar_content,monthNum);
				}
				break;
			case 'day':
				var year=parseInt(this.yearSelect.innerHTML),
					month=parseInt(this.monthSelect.innerHTML),
					isleapyear=false,
					daysNum=0;
				var weeks=['日', '一','二','三','四','五','六'],
					//new Date(year, month, 0)  设置的是 year年month+1月 0号 也就是month的最后一天
					daysNum = new Date(year, month, 0).getDate(),
					//获取当前月份的第一天是星期几
					weekStart = new Date(year, month - 1, 1).getDay();
					console.log(weekStart+'days:'+daysNum);
				for(var i=0;i<weeks.length;i++){
					var week=Gsc.newElement('div');
					Gsc.attr(week,'className','content_week');
					Gsc.html(week,weeks[i]);
					Gsc.append(calendar_content,week);
				}
				for(var i=0;i<weekStart;i++){
					var dayEmpty=Gsc.newElement('div');
					Gsc.attr(dayEmpty,'className','content_dayEmpty');
					Gsc.append(calendar_content,dayEmpty);
				}
				for(var i=1;i<=daysNum;i++){
					var dayNum=Gsc.newElement('div');
					Gsc.attr(dayNum,'className','content_day');
					var date=This.date,
						nowdate=date.getFullYear()+'-'+parseInt(date.getMonth()+1)+'-'+date.getDate();
					Gsc.attr(dayNum,'calendar_date',year+'-'+month+'-'+i);
					if(nowdate==dayNum.calendar_date){
						Gsc.css(dayNum,'background-color','rgba(76,181,247,.6)');
					}
//					console.log(This.selectArr.selectFirst.date);
					if(This.selectArr.selectFirst){
						if(This.selectArr.selectFirst.date==dayNum.calendar_date){
							Gsc.attr(dayNum,'className','content_day selectFirst');
						}
					}
					if(This.selectArr.selectEnd){
						if(This.selectArr.selectEnd.date==dayNum.calendar_date){
							Gsc.attr(dayNum,'className','content_day selectEnd');
						}
					}
					
					Gsc.html(dayNum,i);
					Gsc.append(calendar_content,dayNum);
				}
				this.lock='day';
		}
	}
};

var base={
	isBind:true,//是否绑定元素
	bingId:Gsc.getid('calendarText'),//盒子id
	
	isDays:true,////是否可以多选(时间段)
	daylimit:[1,7],//允许设置时间段选择的最小或最大跨度
	getDatefn_DaysBind:function(){console.log("回调处理");alert("绑定元素,可多选的回调处理")},
	limit:[1994,2039],//日期的上下限
	base_css:{//日历的css属性
		position:'absolute'
	},
};

var calendar=new Calendar(base);
calendar.init();

var base1={
	isBind:true,//是否绑定元素
	isDays:false,//是否可以多选(时间段)
	bingId:Gsc.getid('calendarText1'),//盒子id
	getDatefn:function(){alert('绑定元素,不可多选:回调函数');},
	limit:[1994,2039],//日期的上下限
	base_css:{//日历的css属性
		position:'absolute',
	},
};
var calendar1=new Calendar(base1);
calendar1.init();

//不绑定元素可以多选
var base2={
	isBind:false,//是否绑定元素
	isDays:true,//是否可以多选(时间段)
	daylimit:[1,7],//允许设置时间段选择的最小或最大跨度
	limit:[1994,2039],//日期的上下限
	getDatefn_DaysnoBind:function(){console.log("回调处理");alert("不绑定元素,可多选的回调处理")},//不绑定元素时的回调处理
	base_css:{//日历的css属性
		position:'absolute',
		top:'80px',//绑定元素后,top 和left就不需要设置了
		left:'600px'
	},
};
var calendar2=new Calendar(base2);
calendar2.init();

var base3={
	isBind:false,//是否绑定元素
	isDays:false,//是否可以多选(时间段)
	limit:[1994,2039],//日期的上下限
	getDatefn:function(){console.log("回调处理");alert("不绑定元素,不可多选的回调处理")},//不绑定元素时的回调处理
	base_css:{//日历的css属性
		position:'absolute',
		top:'80px',//绑定元素后,top 和left就不需要设置了
		left:'900px'
	},
};
var calendar3=new Calendar(base3);
calendar3.init();