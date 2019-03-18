/**
 * 表格分页条数
 */
var pagingSize = 55;
var figureNumber = "S1325S-D0102";//图     号
var drawingLevel = "3";//图纸级别

//工程id(测试)
var project_id="e6708ef8ddc54c46a56a9b40808ad7e6";
/**
 * 分页条数
 */
var pageSize = 15;
var monitorPageSize = 5;//监测数据第一个表格的分页数
var noJWStr="该条记录暂无坐标信息,无法进行定位!";

$(function() {

	// 全选，全不选操作
	$(document).delegate(".checkboxAll", "click", function() {
		var childrenBox = $(".checkboxOne").toArray();
		if ($(".checkboxAll").prop("checked")) {
			for (var i = 0; i < childrenBox.length; i++) {
				$(childrenBox[i]).prop("checked", true);
			}
		} else {
			for (var i = 0; i < childrenBox.length; i++) {
				$(childrenBox[i]).prop("checked", false);
			}
		}
	});
});

var Tools = {
	// 提示窗，2秒后消失，不带任何按钮
	tips : function(content) {
//		layer.msg(content);
		layer.alert(content,{
			closeBtn: 0//关闭弹窗右上角的X
		});
	},
	alertMsg : function(content) {
		layer.msg(content, {
//			  icon: 1,
			  time: 2000 //2秒关闭（如果不配置，默认是3秒）
			}, function(){
				layer.closeAll();
			});   
	},
	// 提示窗，2秒后消失，不带任何按钮
	msg : function(content,refreshMethod) {
		layer.msg(content, {
//			  icon: 1,
			  time: 2000 //2秒关闭（如果不配置，默认是3秒）
			}, function(){
				refreshMethod
			});   
	},

	// 提示窗，只有提示信息，如：成功，失败，异常等,带确定按钮
	tipsMsg : function(content) {
		layer.alert(content);
	},

	// 提示窗，只有提示信息，如：成功，失败，异常等,带确定按钮,点击确定执行方法
	tipsMsgWithFunction : function(content, confirmMethod, isCancel) {
		layer.alert(content, {
			closeBtn : 0
		}, function() {
			confirmMethod();
			if (isCancel) {
				layer.closeAll();
			}
		});
	},

	// 对话提示窗
	// msg ： 提示窗提示内容，如：确认删除？确认提交？等；
	// confirmMethod : 确认按钮点击后执行的事件
	// isCancel ： boolean点击确认后是否关闭提示窗，false,不关闭，true：关闭；如果传值为
	// fasle，则需要通过另外的提示信息去关闭
	// 使用方式： Tools.tipsConfirm("确认删除？", 方法名称， true);
	tipsConfirm : function(msg, confirmMethod, isCancel) {
		layer.confirm(msg, {
			btn : [ '确认', '取消' ]
		}, function() {// 第一个按钮执行事件
			confirmMethod();
			if (isCancel) {
				layer.closeAll();
			}
		});
	},

	/**
	 * 预览
	 */
	// 对话提示窗
	tipsfileConfirm : function(msg, confirmMethod, downloadfile, isCancel) {
		layer.confirm(msg, {
			btn : [ '预览', '下载', '取消' ]
		}, function() {// 第一个按钮执行事件
			confirmMethod();
			if (isCancel) {
				layer.closeAll();
			}
		}, function() {// 第二个按钮执行事件
			downloadfile();
			if (isCancel) {
				layer.closeAll();
			}
		});
	},

	// 打开加载层，主要用于请求发送时，避免重复操作时使用
	tipsLoading : function() {
		layer.load(2);
	},

	// 关闭加载层，主要用于请求完成后关闭加载层
	tipsLoaded : function() {
		layer.closeAll();
	},
	/*************laydate 5.0版本重写 Start****************************/
	//需要引入新layDate.js
	// 只选择年份
	// id 时间选择框ID
	loadYearDate : function(id) {
		laydate.render({
			  elem:id,//指定元素
			  type:"year",//设置类型  年选择器
			  theme:"#0EBCEA",//设置背景主题颜色
			  choose : function(datas) {
				$(id).blur();
			}
		});
	},
	loadYearDateCallback : function(id,callbackFunction) {
		laydate.render({
			  elem:id,//指定元素
			  type:"year",
			  theme:"#0EBCEA",
			  choose : function(datas) {
				$(id).blur();
			   },
			  done: function(value){
				callbackFunction(value);
			}
		});
	},
	// HH:mm:ss
	loadTime: function(id) {
		laydate.render({
			  elem:id,//指定元素
			  type:"time",//时间选择器
			  theme:"#0EBCEA",
			  choose : function(datas) {
				$(id).blur();
			}
		});
	},
	//MM-dd HH:mm:ss
	loadDateTimeNoYear: function(id) {
		laydate.render({
			  elem:id,//指定元素
			  type:"datetime",//时间选择器
			  format : "MM-dd HH:mm:ss",// 时间格式
			  isyear : false,
			  theme:"#0EBCEA",
			  choose : function(datas) {
				$(id).blur();
			}
		});
	},
	
	// 时间范围
	// 选中开始时间，结束时间不能小于开始时间，选中结束时间，开始时间不能大于结束时间
	// startId 开始ID
	// endId 结束ID
	// dateType 选择器类型
	loadDateRange : function(startId, endId,dateType) {
		if ((null == dateType || "" == dadateTypete || undefined == dateType)
				&& dateType !="datetime") {
			dateType = "date";
		}
		var start ={
			elem : startId,
			type:dateType,//选择器
			theme:"#0EBCEA",
			choose: function(value){
				end.min = value; // 开始日选好后，重置结束日的最小日期
				end.start = value // 将结束日的初始值设定为开始日
			  }
		};
		var end ={
			elem : endId,
			type:dateType,//选择器
			theme:"#0EBCEA",
			choose: function(value){
				start.max = value; // 结束日选好后，重置开始日的最大日期
			  }
		};
	        laydate.render(start);  
	        laydate.render(end);  
	},

	//新版日期范围选择
	//只支持格式为： YYYY-MM-DD 或  YYYY-MM-DD HH:MM:SS 或 HH:MM:SS
	//新版日期范围选择
	loadDateRangeNew : function(sTimeId, eTimeId,dateType) {
		laydate.render({
			elem : "#"+sTimeId,
			type : dateType,
			done: function(value, date, endDate){
				Tools.loadDateRangeCheck(value, $("#"+eTimeId).val(), sTimeId, true);
			}
		});
		
		laydate.render({
			elem : "#"+eTimeId,
			type : dateType,
			done: function(value, date, endDate){
				Tools.loadDateRangeCheck($("#"+sTimeId).val(), value, eTimeId, false);
			}
		});
	},
	loadDateRangeCheck : function(sTime, eTime, clearId, isSTime){
		//两个时间都选择了
		if(null != sTime && undefined != sTime && "" != sTime && 
			null != eTime && undefined != eTime && "" != eTime){
			
			if(sTime.length <= 8 && eTime.length <= 8){
				var date = new Date();
				var dateStr = date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
				sTime = dateStr + " " + sTime;
				eTime = dateStr + " " + eTime;
			}
			
			var sTimeLong = new Date(sTime).getTime();
			var eTimeLong = new Date(eTime).getTime();
			if (sTimeLong >= eTimeLong) {
				if (isSTime) {
					layer.alert("开始时间必须小于结束时间", {
						closeBtn : 0
					}, function() {
						$("#"+ clearId).val("");
						layer.closeAll();
					});
				} else {
					layer.alert("结束时间必须大于开始时间", {
						closeBtn : 0
					}, function() {
						$("#"+ clearId).val("");
						layer.closeAll();
					});
				}
			}
		}
	},
	//时间 yyyy-MM-dd
	loadDateNew: function(id) {
		laydate.render({
			  elem:id,//指定元素
			  type:"date",//时间选择器
			  format : "yyyy-MM-dd",// 时间格式
			  theme:"#0EBCEA",
			  choose : function(datas) {
				$(id).blur();
			}
		});
	},
	
	
	initNewDateTool : function(timeId, dateType) {
		laydate.render({
			elem : "#"+timeId,
			type : dateType
		});
	},
	initNewDateToolCallback : function(timeId, dateType, callBackFunction) {
		laydate.render({
			elem : "#"+timeId,
			type : dateType,
			done: function(value, date, endDate){
				callBackFunction(value);
			}
		});
	},
  /*************laydate 5.0版本重写 end****************************/
	
  /*****************laydate old start****************************/
	// 时间 YYYY-MM-DD
	// id 时间选择框ID
	loadDate : function(id) {
		// 时间插件 laydate 官网地址：http://www.layui.com/laydate/
		// 设置laydate皮肤样式，皮肤在/assets/js/laydate/skins下面，需要什么用什么文件名称
		laydate.skin('tianlan');
		laydate({
			elem : id,// 时间控件id
			format : "YYYY-MM-DD",// 时间格式
			istime : false,// 是否显示时分秒选择框
			issure : true, // 是否显示确认
			festival : true,// 显示节假日
			istoday : true, // 是否显示今天
			isclear: true,
			choose : function(datas) {
				$(id).blur();
			}
		});
	},
	
	// 时间 YYYY-MM-DD
	// id 时间选择框ID
	loadMonthDate : function(id) {
		// 时间插件 laydate 官网地址：http://www.layui.com/laydate/
		// 设置laydate皮肤样式，皮肤在/assets/js/laydate/skins下面，需要什么用什么文件名称
		laydate.skin('tianlan');
		laydate({
			elem : id,// 时间控件id
			format : "YYYY-MM",// 时间格式
			istime : false,// 是否显示时分秒选择框
			issure : true, // 是否显示确认
			festival : false,// 显示节假日
			istoday : false, // 是否显示今天
			isclear : false,
			choose : function(datas) {
				$(id).blur();
			}
		});
	},
	// 时间选择后执行方法callBackFunction
	// format : YYYY-MM-DD 或 YYYY-MM-DD hh:mm:ss
	// id 时间选择框ID
	// 时间选择后执行事件 callBackFunction
	loadLayDateCallBack : function(id, format, callBackFunction) {
		// 时间插件 laydate 官网地址：http://www.layui.com/laydate/
		// 设置laydate皮肤样式，皮肤在/assets/js/laydate/skins下面，需要什么用什么文件名称
		laydate.skin('tianlan');
		laydate({
			elem : id,// 时间控件id
			format : format,// 时间格式
			istime : false,// 是否显示时分秒选择框
			issure : true, // 是否显示确认
			festival : true,// 显示节假日
			istoday : true, // 是否显示今天
			isclear : false,
			choose : function(datas) {
				callBackFunction();
			}
		});
	},

	// 时间 YYYY-MM-DD hh:mm:ss
	// id 时间选择框ID
	loadDateTime : function(id) {
		// 时间插件 laydate 官网地址：http://www.layui.com/laydate/
		// 设置laydate皮肤样式，皮肤在/assets/js/laydate/skins下面，需要什么用什么文件名称
		laydate.skin('tianlan');
		laydate({
			elem : id,// 时间控件id
			format : "YYYY-MM-DD hh:mm:ss",// 时间格式
			istime : true,// 是否显示时分秒选择框
			issure : true, // 是否显示确认
			festival : true,// 显示节假日
			isclear : false,
			istoday : true, // 是否显示今天
		});
	},

	// 限定时间段，向前、向后多少天
	// id 时间选择框ID
	// before 向前推多少天
	// after 向后推多少天
	loadPeriodDate : function(id, before, after) {
		// 时间插件 laydate 官网地址：http://www.layui.com/laydate/
		// 设置laydate皮肤样式，皮肤在/assets/js/laydate/skins下面，需要什么用什么文件名称
		laydate.skin('tianlan');
		laydate({
			elem : id,// 时间控件id
			format : "YYYY-MM-DD",// 时间格式
			istime : false,// 是否显示时分秒选择框
			issure : true, // 是否显示确认
			festival : true,// 显示节假日
			istoday : true, // 是否显示今天
			isclear : false,
			min : laydate.now(-before), // -1代表昨天，-2代表前天，以此类推
			max : laydate.now(+after)
		// +1代表明天，+2代表后天，以此类推
		});
	},
	loadDatePeriodMaxAndMinTime : function(startId, startTime, endId, endTime,
			format) {
		laydate.skin('tianlan');
		if ((null == format || "" == format || undefined == format)
				&& format != "YYYY-MM-DD" && format != "YYYY-MM-DD hh:mm:ss") {
			format = "YYYY-MM-DD";
		}
		var isTime = false;
		if (format == "YYYY-MM-DD hh:mm:ss") {
			isTime = true;
		}
		var start = {
			elem : startId,
			format : format,
			start : startTime,
			min : startTime, // 设定最小日期为当前日期
			max : endTime, // 最大日期
			istime : isTime,
			istoday : false,
			choose : function(datas) {
				end.min = datas; // 开始日选好后，重置结束日的最小日期
				end.start = datas // 将结束日的初始值设定为开始日
			}
		};
		var end = {
			elem : endId,
			format : format,
			start : startTime,
			min : startTime,
			max : endTime,
			istime : isTime,
			istoday : false,
			choose : function(datas) {
				start.max = datas; // 结束日选好后，重置开始日的最大日期
			}
		};
		laydate(start);
		laydate(end);
	},

	// 时间范围
	// 选中开始时间，结束时间不能小于开始时间，选中结束时间，开始时间不能大于结束时间
	// startId 开始ID
	// endId 结束ID
	// format 格式化
	loadRangeDate : function(startId, endId, format) {
		// 时间插件 laydate 官网地址：http://www.layui.com/laydate/
		// 设置laydate皮肤样式，皮肤在/assets/js/laydate/skins下面，需要什么用什么文件名称
		laydate.skin('tianlan');
		if ((null == format || "" == format || undefined == format)
				&& format != "YYYY-MM-DD" && format != "YYYY-MM-DD hh:mm:ss") {
			format = "YYYY-MM-DD";
		}
		var isTime = false;
		if (format == "YYYY-MM-DD hh:mm:ss") {
			isTime = true;
		}
		var start = {
			elem : startId,
			format : format,
			istime : isTime,
			istoday : true,
			isclear: true,
			choose : function(datas) {
				end.min = datas; // 开始日选好后，重置结束日的最小日期
				end.start = datas // 将结束日的初始值设定为开始日
			}
		};
		var end = {
			elem : endId,
			format : format,
			istime : isTime,
			istoday : true,
			isclear : true,
			choose : function(datas) {
				start.max = datas; // 结束日选好后，重置开始日的最大日期
			}
		};
		laydate(start);
		laydate(end);
	},
	bind : function(scope, funct) {
		return function() {
			return funct.apply(scope, arguments);
		};
	},
	// 初始化DataTable的空对象
	nullDataTable : function() {
		var obj = new Object();
		obj.iTotalRecords = 0;
		obj.iTotalDisplayRecords = 0;
		obj.eEcho = "0";
		obj.sColumns = "0";
		obj.aaData = new Array();
		return obj;
	},
	isEmpty : function(data) {
		if (data == null || data == "" || data == undefined) {
			return true;
		}
		return false;
	},

	// 类似bootstarp的model层，这里model层的内容是自己写
	// title 显示的标题
	// width 窗体显示宽度
	// height 窗体显示高度
	// content 窗体显示内容
	// confirmMethod 确定按钮点击事件
	// isCancel
	// boolean值，参数为：true，则点击确定后，关闭窗体，参数为false，则点击确定后窗体不关闭，这时需要另外的一个提示或其他的去关闭
	//
	// 调用方式： Tools.showModel("标题", 500, 400, "<input type='text'
	// id='testmodelinput'>", 单击确定方法, false);
	showModel : function(title, width, height, content, confirmMethod, isCancel) {
		layer.open({
			type : 1,
			skin : 'layui-layer-rim',
			title : title,
			area : [ width + 'px', height + 'px' ],
			content : content,
			btn : [ '确认', '取消' ],
			yes : function() {
				confirmMethod();
				if (isCancel) {
					layer.closeAll();
				}
			},
			btn2 : function() {
				layer.closeAll();
			}
		});
	},
	/*************laydate old end****************************/
	
	/*
	 * elem: 'id', //需显示日期的元素选择器 event: 'click', //触发事件 format: 'YYYY-MM-DD
	 * hh:mm:ss', //日期格式 istime: false, //是否开启时间选择 isclear: true, //是否显示清空
	 * istoday: true, //是否显示今天 issure: true, //是否显示确认 festival: true, //是否显示节日
	 * min: '1900-01-01 00:00:00', //最小日期 max: '2099-12-31 23:59:59', //最大日期
	 * start: '2014-6-15 23:00:00', //开始日期 fixed: false, //是否固定在可视区域
	 * zIndex:99999999, //css z-index choose: function(dates){ //选择好日期的回调函数
	 * //dates为当前选择的时间 //Execute the method after the selection }
	 */

	/**
	 * 打印方法
	 * 
	 * 参数htmlInfo为需要打印的内容代码
	 * 
	 * 1、如果htmlInfo不传值（例如：Tools.printHTML()）,打印的为当前页面可见的所有信息
	 * 
	 * 2、htmlInfo传值（例如： 需要打印的html是 var printHtml = "<table>
	 * <tr>
	 * <td>a</td>
	 * <td>a</td>
	 * </tr>
	 * <tr>
	 * <td>b</td>
	 * <td>b</td>
	 * </tr>
	 * </table>"）; 调用方法为：Tools.printHTML(printHtml);
	 * 
	 */
	printHTML : function(htmlInfo) {
		if (null == htmlInfo || "" == htmlInfo || undefined == htmlInfo) {
			htmlInfo = window.document.body.innerHTML
		}
		var htmlJson = {
			"head" : window.document.head.innerHTML,
			"body" : htmlInfo
		}
		var printUrl = path + "/web/print/print.jsp";
		window.localStorage["pringHtml"] = JSON.stringify(htmlJson);
		window.open(printUrl, '_blank');
	},
	getLocationParamString:function(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	},
	randomNum:function(n) {
	    var rnd = "";
	    for (var i = 0; i < n; i++) {
	        rnd += Math.floor(Math.random() * 10);
	    }
	    return rnd;
	},
	randomInRange:function(min,max) {
		var diff=max-min;
		var num = Math.random()*diff + min;
		num = parseInt(num, 10);
	    return num;
	},
	str2Byte:function(str) {  
        var bytes = new Array();  
        var len, c;  
        len = str.length;  
        for(var i = 0; i < len; i++) {  
            c = str.charCodeAt(i);  
            if(c >= 0x010000 && c <= 0x10FFFF) {  
                bytes.push(((c >> 18) & 0x07) | 0xF0);  
                bytes.push(((c >> 12) & 0x3F) | 0x80);  
                bytes.push(((c >> 6) & 0x3F) | 0x80);  
                bytes.push((c & 0x3F) | 0x80);  
            } else if(c >= 0x000800 && c <= 0x00FFFF) {  
                bytes.push(((c >> 12) & 0x0F) | 0xE0);  
                bytes.push(((c >> 6) & 0x3F) | 0x80);  
                bytes.push((c & 0x3F) | 0x80);  
            } else if(c >= 0x000080 && c <= 0x0007FF) {  
                bytes.push(((c >> 6) & 0x1F) | 0xC0);  
                bytes.push((c & 0x3F) | 0x80);  
            } else {  
                bytes.push(c & 0xFF);  
            }  
        }  
        return bytes;  
  
  
    },  
    byte2Str:function(arr) {  
        if(typeof arr === 'string') {  
            return arr;  
        }  
        var str = '',  
            _arr = arr;  
        for(var i = 0; i < _arr.length; i++) {  
            var one = _arr[i].toString(2),  
                v = one.match(/^1+?(?=0)/);  
            if(v && one.length == 8) {  
                var bytesLength = v[0].length;  
                var store = _arr[i].toString(2).slice(7 - bytesLength);  
                for(var st = 1; st < bytesLength; st++) {  
                    store += _arr[st + i].toString(2).slice(2);  
                }  
                str += String.fromCharCode(parseInt(store, 2));  
                i += bytesLength - 1;  
            } else {  
                str += String.fromCharCode(_arr[i]);  
            }  
        }  
        return str;  
    },
    
    
    fileDownloadOrView : function(serverUrl, fileUrl, fileName) {
		//验证服务地址或文件地址是否为空，如不为空
		if ((fileUrl != null || fileUrl != "" || undefined != fileUrl) && (serverUrl != null || serverUrl != "" || undefined != serverUrl)) {
			var fileLoadURL = "";
			var fileViewURL = "";
			var fileCheckExists = "";
			var fileViewExists = "";
			var index=fileUrl.lastIndexOf(".");
			//获取文件后缀
			var suffix = fileUrl.substring((fileUrl.lastIndexOf(".") + 1));
			var checkSuffix = "";
			if(null != suffix || undefined != suffix || "" != suffix){
				checkSuffix = suffix.toLowerCase();
				//验证后缀是否可以预览
				var fileType = 0;
				if(checkSuffix=="doc"||checkSuffix=="docx"||checkSuffix=="ppt"||checkSuffix=="pptx"||checkSuffix=="xls"||checkSuffix=="xlsx"){
					//fileViewURL = serverUrl+"/web/changePDF/viewer.html?file=/view"+fileUrl.substring(0,index)+".pdf";
					fileViewExists = serverUrl + "/RiverSystemView" + fileUrl.substring(0,index)+".pdf";
					fileLoadURL = serverUrl+"/riverBench/file/loadServerFile.action?name=" + encodeURIComponent(encodeURI(fileName)) + "&filePath=" + fileUrl;
					fileType = 1;
				}else if(checkSuffix=="pdf"){
					//fileViewURL = serverUrl+"/web/changePDF/viewer.html?file=/view"+fileUrl;
					fileViewExists = serverUrl + "/RiverSystemView" + fileUrl;
					fileLoadURL = serverUrl+"/riverBench/file/loadServerFile.action?name=" + encodeURIComponent(encodeURI(fileName)) + "&filePath=" + fileUrl;
					fileType = 1;
				//常用的图片格式
				}else if(checkSuffix == "bmp" || checkSuffix == "jpg" || checkSuffix == "jpeg" || checkSuffix == "png" || checkSuffix == "gif"){
					fileViewURL = "/RiverSystemView"+fileUrl;
					//fileViewExists = serverUrl + "/view" + fileUrl;
					fileLoadURL = serverUrl+"/riverBench/file/loadServerFile.action?name=" + encodeURIComponent(encodeURI(fileName)) + "&filePath=" + fileUrl;
					fileType = 2;
				}else{
					fileType = 0;
					fileLoadURL = serverUrl+"/riverBench/file/loadServerFile.action?name=" + encodeURIComponent(encodeURI(fileName)) + "&filePath=" + fileUrl;
				}
				//验证是否给出预览提示
				if(1 == fileType){
					layer.confirm("请选择文件打开方式", {
						btn : ['预览','下载', '取消' ]
				/*	layer.confirm("确定要下载该文件？", {
						btn : [ '确认', '取消' ]*/
				}, function() {
						// 第一个按钮执行事件,打开一个新的标签页预览
					$.ajax({
							url : serverUrl + "/riverBench/file/fileExists.action",
							data:{
								"strFileName" : fileUrl
							},
							async : false,
							success : function(data) {
								if(200 == data.pdf){
									window.open(fileViewURL);
								}else{
									window.open(serverUrl+"/web/changePDF/viewer.html");
								}
								layer.closeAll();
							}
						});
					}, function() {
						// 第二个按钮执行事件，连接到下载地址
						//验证文件是否存在
						$.ajax({
							url : serverUrl + "/riverBench/file/fileExists.action",
							data:{
								"strFileName" : fileUrl
							},
							async : false,
							success : function(data) {
								if(200 == data.file){
									location.href = fileLoadURL;
									layer.closeAll();
								}else{
									Tools.tipsMsg("文件不存在！");
								}
							}
						});
					});
				}else if(2 == fileType){
					layer.confirm("请选择文件打开方式", {
						btn : ['预览','下载', '取消' ]
					/*layer.confirm("确定要下载该文件？", {
						btn : [ '确认', '取消' ]*/
					}, function() {
						// 第一个按钮执行事件,打开一个新的标签页预览
						$.ajax({
							url : serverUrl + "/riverBench/file/fileExists.action",
							data:{
								"strFileName" : fileUrl
							},
							async : false,
							success : function(data) {
								if(200 == data.file){
									window.open(fileViewURL);
								}else{
									window.open(serverUrl+"/web/changePDF/viewer.html");
								}
								layer.closeAll();
							}
						});
					}, function() {
						// 第二个按钮执行事件，连接到下载地址
						//验证文件是否存在
						$.ajax({
							url : serverUrl + "/riverBench/file/fileExists.action",
							data:{
								"strFileName" : fileUrl
							},
							async : false,
							success : function(data) {
								if(200 == data.file){
									location.href = fileLoadURL;
									layer.closeAll();
								}else{
									Tools.tipsMsg("文件不存在！");
								}
							}
						});
					});
				}else{
					layer.confirm("确定要下载该文件？", {
						btn : [ '确认', '取消' ]
					}, function() {// 第一个按钮执行事件
						//验证文件是否存在
						$.ajax({
							url : serverUrl + "/riverBench/file/fileExists.action",
							data:{
								"strFileName" : fileUrl
							},
							async : false,
							success : function(data) {
								if(200 == data.file){
									location.href = fileLoadURL;
									layer.closeAll();
								}else{
									Tools.tipsMsg("文件不存在！");
								}
							}
						});
					});
				}
			}
		}else{
			Tools.tipsMsg("文件不存在！");
		}
	}
}
// DataTable页条汉化
var dataTableLang = {
	"sProcessing" : "加载中...",
	"sLengthMenu" : "显示_MENU_条 ",
	"sZeroRecords" : "暂无内容",
	"sInfo" : "第_START_ 到 _END_ 条 &nbsp;&nbsp;共  _TOTAL_ 条",
	"sInfoEmpty" : "第 0 到 0 条   共 0 条",
	"sInfoFiltered" : "(全部记录数 _MAX_ 条)",
	"sInfoPostFix" : "",
	"sSearch" : "搜索",
	"sUrl" : "",
	"oPaginate" : {
		"sFirst" : "首页",
		"sPrevious" : "上一页 ",
		"sNext" : "下一页 ",
		"sLast" : "尾页 "
	}
}

var errorPlacement = function(error, element) {// error为错误提示对象，element为出错的组件对象
	if (element.parent().find("div.error") != null) {
		element.parent().find("div.error").remove();
	}
	if (error.html() != "") {
		element
				.parent()
				.append(
						"<div class=\"common-info error\"><span class=\" common_wrong\">"
								+ error.html()
								+ "</span><span class=\"dec\"><s class=\"dec1\">&#9670;</s><s class=\"dec2\">&#9670;</s></span></div>");
	}
}

// 时间格式化 YYYY-MM-DD hh:mm:ss
// 需要得到的时间转换成Date
// 调用方式 Date.format("YYYY-MM-DD hh:mm:ss")
// 时间格式根据需要填入，例如： YYYY-MM-DD , hh:mm:ss, YYYY-MM-DD hh:mm, MM-DD等
Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1,
		"D+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	};
	if (/(Y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

function ExcelConvertor(excel, FileName) {
	var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
	excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
	excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
	excelFile += '; charset=UTF-8">';
	excelFile += "<head>";
	excelFile += "<!--[if gte mso 9]>";
	excelFile += "<xml>";
	excelFile += "<x:ExcelWorkbook>";
	excelFile += "<x:ExcelWorksheets>";
	excelFile += "<x:ExcelWorksheet>";
	excelFile += "<x:Name>";
	excelFile += "{worksheet}";
	excelFile += "</x:Name>";
	excelFile += "<x:WorksheetOptions>";
	excelFile += "<x:DisplayGridlines/>";
	excelFile += "</x:WorksheetOptions>";
	excelFile += "</x:ExcelWorksheet>";
	excelFile += "</x:ExcelWorksheets>";
	excelFile += "</x:ExcelWorkbook>";
	excelFile += "</xml>";
	excelFile += "<![endif]-->";
	excelFile += "</head>";
	excelFile += "<body>";
	excelFile += excel;
	excelFile += "</body>";
	excelFile += "</html>";

	var uri = 'data:application/vnd.ms-excel;charset=utf-8,'
			+ encodeURIComponent(excelFile);

	var link = document.createElement("a");
	link.href = uri;

	link.style = "visibility:hidden";
	link.download = FileName + ".xls";

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}  

//获取到类型需要判断当前浏览器需要调用的方法，目前项目中火狐，谷歌，360没有问题
//win10自带的IE无法导出
var idTmr;
//获取当前浏览器类型
function getExplorer() {
  var explorer = window.navigator.userAgent ;
  //ie
  if (explorer.indexOf("MSIE") >= 0) {
      return 'ie';
  }
  //firefox
  else if (explorer.indexOf("Firefox") >= 0) {
      return 'Firefox';
  }
  //Chrome
  else if(explorer.indexOf("Chrome") >= 0){
      return 'Chrome';
  }
  //Opera
  else if(explorer.indexOf("Opera") >= 0){
      return 'Opera';
  }
  //Safari
  else if(explorer.indexOf("Safari") >= 0){
      return 'Safari';
  }
}

/**
 * 导出excel
 * @param 表格id tableid
 * @param excel名称 name
 * @returns
 */
function exportExcel(tableid,name) {
  if(getExplorer()=='ie')
  {
      var curTbl = document.getElementById(tableid);
      var oXL = new ActiveXObject("Excel.Application");
      var oWB = oXL.Workbooks.Add();
      var xlsheet = oWB.Worksheets(1);
      var sel = document.body.createTextRange();
      sel.moveToElementText(curTbl);
      sel.select();
      sel.execCommand("Copy");
      xlsheet.Paste();
      oXL.Visible = true;

      try {
          var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
      } catch (e) {
          print("Nested catch caught " + e);
      } finally {
          oWB.SaveAs(fname);
          oWB.Close(savechanges = false);
          oXL.Quit();
          oXL = null;
          idTmr = window.setInterval("Cleanup();", 1);
      }

  }
  else
  {
      tableToExcel(tableid,name)
  }
}
function Cleanup() {
  window.clearInterval(idTmr);
  CollectGarbage();
}


//判断浏览器后调用的方法，把table的id传入即可
var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html><head><meta charset="UTF-8"><style type="text/css"> td{padding: 0;word-wrap:break-word; text-align:center;}</style></head><body><table class="text-center" style="border: 1px solid;">{table}</table></body></html>',
      base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
      format = function(s, c) {
          return s.replace(/{(\w+)}/g,
              function(m, p) { return c[p]; }) }
  return function(table, name) {
      if (!table.nodeType) table = document.getElementById(table)
      var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
  	var link = document.createElement("A");
  	link.href =  uri + base64(format(template, ctx));
  	link.download = name+'.xls';
  	link.target = '_blank';
  	document.body.appendChild(link);
  	link.click();
  	document.body.removeChild(link);
  }
})()


/**
 * 导出excel包含多个sheet
 * @param {Object} tables  tableId的数组;
 * @param {Object} wsnames sheet的名字数组;
 * @param {Object} wbname  wbname:工作簿名字;
 * @param {Object} appname Excel
 */
function tablesToExcel(tables, wsnames, wbname, appname) {
	var uri = 'data:application/vnd.ms-excel;base64,',
		tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' +
		'<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>' +
		'<Styles>' +
		'<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>' +
		'<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>' +
		'</Styles>' +
		'{worksheets}</Workbook>',
		tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>',
		tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>',
		base64 = function(s) {
			return window.btoa(unescape(encodeURIComponent(s)))
		},
		format = function(s, c) {
			return s.replace(/{(\w+)}/g, function(m, p) {
				return c[p];
			})
		}
	var ctx = "";
	var workbookXML = "";
	var worksheetsXML = "";
	var rowsXML = "";
	for(var i = 0; i < tables.length; i++) {
		if(!tables[i].nodeType) tables[i] = document.getElementById(tables[i]); // 控制要导出的行数
		for(var j = 0; j < tables[i].rows.length; j++) {
			rowsXML += '<Row>';
			for(var k = 0; k < tables[i].rows[j].cells.length; k++) {
				var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
				var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
				var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
				dataValue = (dataValue) ? dataValue : tables[i].rows[j].cells[k].innerHTML;
				var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");
				dataFormula = (dataFormula) ? dataFormula : (appname == 'Calc' && dataType == 'DateTime') ? dataValue : null;
				ctx = {
					attributeStyleID: (dataStyle == 'Currency' || dataStyle == 'Date') ? ' ss:StyleID="' + dataStyle + '"' : '',
					nameType: (dataType == 'Number' || dataType == 'DateTime' || dataType == 'Boolean' || dataType == 'Error') ? dataType : 'String',
					data: (dataFormula) ? '' : dataValue,
					attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : ''
				};
				rowsXML += format(tmplCellXML, ctx);
			}
			rowsXML += '</Row>'
		}
		ctx = {
			rows: rowsXML,
			nameWS: wsnames[i] || 'Sheet' + i
		};
		worksheetsXML += format(tmplWorksheetXML, ctx);
		rowsXML = "";
	}
	ctx = {
		created: (new Date()).getTime(),
		worksheets: worksheetsXML
	};
	workbookXML = format(tmplWorkbookXML, ctx); // 查看后台的打印输出

	var link = document.createElement("A");
	link.href = uri + base64(workbookXML);
	link.download = wbname || 'Workbook.xls';
	link.target = '_blank';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

/**
 * 导出word
 * @param id
 * @returns
 */
function tableExport(id){
	var doc="";
	doc+="<table style='border:1px solid;'>";
	var html=document.getElementById(id).innerHTML;
	doc+=html;
	doc+="</table>";
	var docFile="<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:"+doc+"' xmlns='http://www.w3.org/TR/REC-html40'>";
	docFile=docFile+"<head></head>"+doc+"</body></html>";
	var base64data="base64,"+window.btoa(unescape(encodeURIComponent(docFile)));
	window.open('data:application/msword;'+ base64data);
	}

