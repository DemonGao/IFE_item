var Calendar=function(base,fun){
	this.base=base;
	this.fun=fun;//回调处理
	this.calendar;//日历box
	this.calendar_content;
		this.yearSelect;//年份
		this.monthSelect;//月份
		this.day;//日
	this.date=new Date();
	this.lock='day';//默认按钮锁定为日
	this.count=0;//当前页数
	this.pageNums=0;//年份页数
	this.bingDate=base.bingId.getElementsByClassName('calendar_Text')[0];//绑定的文本框(用来存储日期)
	this.isclose=true;//日历是否关闭
}
Calendar.prototype={
	init:function(){
		this.createCalendar();
		this.getnowYearCount();
		this.createDate(this.calendar_content,'day');
		console.log()
	},
	createCalendar:function()
	{
		var base=this.base;
		var date=this.date;
		var calendar=Gsc.newElement('div');
		this.calendar=calendar;
		Gsc.attr(calendar,'className','calendar hidden');
		//对calendar(日历)定位
		if(this.base.isBind){
			Gsc.css(calendar,'position',base.base_css.position);
			Gsc.css(calendar,'top',base.bingId.offsetTop+this.base.bingId.offsetHeight+'px');
			console.log(base.bingId.offsetTop+this.base.bingId.offsetHeight+'px');
			console.log(base.bingId.offsetLeft+'px');
			Gsc.css(calendar,'left',base.bingId.offsetLeft+'px');
			
		}else{
			Gsc.css(calendar,'position',base.base_css.position);
			Gsc.css(calendar,'top',base.base_css.top);
			Gsc.css(calendar,'left',base.base_css.left);
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
		this.bindEvent(calendar_content);
	},
	//向calendar_content 中添加事件
	bindEvent:function(calendar_content){
		var This=this;
		//对日历输出框进行事件绑定
		if(This.base.isBind){
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
					}
				}
			});
		}
		
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
					var day=target.innerHTML.length==1?'0'+target.innerHTML:target.innerHTML;
					var month=This.monthSelect.innerHTML.length==1?'0'+This.monthSelect.innerHTML:This.monthSelect.innerHTML;
					This.bingDate.value=This.yearSelect.innerHTML+'-'+month+'-'+day;
					Gsc.attr(This.calendar,'className','calendar hidden');
					console.log(base.bingId.offsetWidth+'px')
					Gsc.css(This.calendar,'left','-'+base.bingId.offsetWidth+'px');
					This.isclose=true;
					This.fun();
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
		var That=this;
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
					var date=That.date,
						nowdate=date.getFullYear()+'-'+parseInt(date.getMonth()+1)+'-'+date.getDate();
					Gsc.attr(dayNum,'calendar_date',year+'-'+month+'-'+i);
					if(nowdate==dayNum.calendar_date){
						Gsc.css(dayNum,'background-color','rgba(76,181,247,.6)');
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
	limit:[1994,2039],//日期的上下限
	base_css:{//日历的css属性
		position:'absolute',
		top:'50px',
		left:'50px'
	},
};

var calendar=new Calendar(base,function(){alert("回调处理");});
calendar.init();
calendarBox=Gsc.getid('calendarText');
//addEvent(calendarBox,'click',function(){
//	Gsc.attr(calendar.calendar,'className','calendar show');
//	Gsc.css(calendar.calendar,'left',base.bingId.offsetLeft+'px');
//});

