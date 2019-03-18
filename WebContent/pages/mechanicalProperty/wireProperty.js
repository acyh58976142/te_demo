/*导线力学特性表*/
var Zcell1 = null;
/*地线力学特性表*/
var Zcell2 = null;
/*地线计算书*/
var Zcell3 = null;
/*导线计算书*/
var Zcell5 = null;
/*导线架线表*/
var Zcell6 = null;
/*地线架线表*/
var Zcell4 = null;
/*导地线参数*/
var Wirelist = null;
/*已激活的标签页的名称*/
var ActiveTab = "导线计算书";
function wireProperty() {
	// 初始化表格
	this.initCellTableData();
	// 初始化数据
	this.initData();
	$('#addBtn').on("click",function() {
		let tableHtml = '';
		let tableObj = null;
		if (ActiveTab == "导线计算书") {
			tableObj = document.getElementById("wireComputeBookContainer").getElementsByTagName("table")[1];
			deleteRow1Col1(tableObj);
			tableHtml = $("#wireComputeBookContainer #tabl1").html();
		} else if (ActiveTab == "导线力学特性表") {
			tableObj = document.getElementById("wirePropertyContainer").getElementsByTagName("table")[1];
			deleteRow1Col1(tableObj);
			tableHtml = $("#wirePropertyContainer #tabl1").html();
		} else if (ActiveTab == "导线架线表") {
			tableObj = document.getElementById("wireStringingContainer").getElementsByTagName("table")[1];
			deleteRow1Col1(tableObj);
			tableHtml = $("#wireStringingContainer #tabl1").html();
		} else if (ActiveTab == "地线计算书") {
			tableObj = document.getElementById("groundComputeBookContainer").getElementsByTagName("table")[1];
			deleteRow1Col1(tableObj);
			tableHtml = $("#groundComputeBookContainer #tabl1").html();
		} else if (ActiveTab == "地线力学特性表") {
			tableObj = document.getElementById("groundPropertyContainer").getElementsByTagName("table")[1];
			deleteRow1Col1(tableObj);
			tableHtml = $("#groundPropertyContainer #tabl1").html();
		} else if (ActiveTab == "地线架线表") {
			tableObj = document.getElementById("groundStringingContainer").getElementsByTagName("table")[1];
			deleteRow1Col1(tableObj);
			tableHtml = $("#groundStringingContainer #tabl1").html();
		}
		table2Excel(tableHtml,ActiveTab);
		location.reload();
	})
	//	计算按钮
	$('#calcBtn').on("click",function() {
		wireProperty.executeWireProperty();
	})
	//	保存按钮
	$('#saveBtn').on("click",function() {
		layer.load(2,{shade: [0.1, '#393D49']});
		wireProperty.saveResult();
	})
	//下拉框监听事件
	this.selectListener();
	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		// 获取已激活的标签页的名称
		ActiveTab = $(e.target).text(); 
	});
}
/**
 * 下拉框监听
 */
wireProperty.prototype.selectListener = function() {
	// 导线型号下拉框
	$("#wireType").on("change",function(){
	    var type = $(this).children('option:selected').val();
	    $("#wireType_val").html(type);
	    for (var i = 0; i < Wirelist.length; i++) {
			if (type==Wirelist[i].conductor_type) {
				setCellValue(Zcell5,0,
						[[14,4],[14,5],[14,6],[14,7],[14,8],[14,9]],
						[Wirelist[i].modulus_elasticity,parseFloat(Wirelist[i].tem_exp_coefficient).toExponential(2),Wirelist[i].unit_weight,
							Wirelist[i].diameter,Wirelist[i].cross_section_area,Wirelist[i].breaking_force]);
			}
		}
	});
}
/**
 * 获取输入参数条件
 */
wireProperty.prototype.getWirePropertyParam = function() {
	/*基本条件*/
	var dxxh = $("#wireType_val").html();	//	导线型号
	var zdzl = Zcell5.GetSheet(0).GetCellValue(5,5).replace("%","")/100;//	最大平均运行张力
	var aqxs = Zcell5.GetSheet(0).GetCellValue(5,6);//	设计安全系数
	var jxjw = Zcell5.GetSheet(0).GetCellValue(5,7);//	架线初伸长降温
	var hzgd = Zcell5.GetSheet(0).GetCellValue(5,8);//	风荷载计算高度
	var jzgd = $(".fhzjzgd").children("option:selected").val();//	风荷载基准高度
	var czlb = $(".dxcclb").children("option:selected").val();//	地形粗糙度类别
	var baseParam = {"dxxh":dxxh,"zdzl":zdzl,"aqxs":aqxs,"jxjw":jxjw,"hzgd":hzgd,"jzgd":jzgd,"czlb":czlb};	
	/*导线参数*/
	var txxs = Zcell5.GetSheet(0).GetCellValue(14,4);//	弹性系数
	var pzxs = new Number(Zcell5.GetSheet(0).GetCellValue(14,5));//	线膨胀系数
	var cdzl = Zcell5.GetSheet(0).GetCellValue(14,6);//	单位长度重量
	var wj = Zcell5.GetSheet(0).GetCellValue(14,7);//	外径
	var jsjm = Zcell5.GetSheet(0).GetCellValue(14,8);//	计算截面
	var ldl = Zcell5.GetSheet(0).GetCellValue(14,9);//	拉断力
	var wirewayParam = {"txxs":txxs,"pzxs":pzxs,"cdzl":cdzl,"wj":wj,"jsjm":jsjm,"ldl":ldl};	
	/*气象条件*/
	var weatherConditions = [];
	for (var i = 14; i <= 28; i++) {
		var isCalculation = Zcell5.GetSheet(0).GetCellValue(2,i)=="√"?1:0;
		var workingConditionNo = Zcell5.GetSheet(0).GetCellValue(3,i);
		var workingConditionName = Zcell5.GetSheet(0).GetCellValue(4,i);
		var temperature = Zcell5.GetSheet(0).GetCellValue(5,i);
		var windSpeed = Zcell5.GetSheet(0).GetCellValue(6,i);
		var iceThickness = Zcell5.GetSheet(0).GetCellValue(7,i);
		var isWindSpeedConversion = Zcell5.GetSheet(0).GetCellValue(8,i)=="√"?1:0;
		var remarks = Zcell5.GetSheet(0).GetCellValue(9,i);
		if (i>=23) {
			var _thisCalc = Zcell5.GetSheet(0).GetCell(2, i).childNodes[1];
			isCalculation =  _thisCalc.previousSibling.innerHTML=="true"?1:0;
			var _thisConv = Zcell5.GetSheet(0).GetCell(8, i).childNodes[1];
			isWindSpeedConversion =  _thisConv.previousSibling.innerHTML=="true"?1:0;
		}
		weatherConditions.push({"isCalculation":isCalculation,"workingConditionNo":workingConditionNo,
			"workingConditionName":workingConditionName,"temperature":temperature,"windSpeed":windSpeed,
			"iceThickness":iceThickness,"isWindSpeedConversion":isWindSpeedConversion,"remarks":remarks});
	}
	/*计算代表档距范围和步长*/
	var	startRange =  Zcell5.GetSheet(0).GetCellValue(13,12);
	var endRange =  Zcell5.GetSheet(0).GetCellValue(15,12);
	var step =  Zcell5.GetSheet(0).GetCellValue(13,13);
	var rangeLength = (endRange-startRange)/step;
	var stepsList = [];
	for (var i = 0; i <= rangeLength; i++) {
		stepsList.push(startRange);
		startRange += step;
	}
	var param = {"baseParam":baseParam,"wirewayParam":wirewayParam,"weatherConditions":weatherConditions,"steps":stepsList};
	return param;
}
/**
 * 计算导地线数据
 */
wireProperty.prototype.executeWireProperty = function() {
	layer.load(2);
	var param = wireProperty.getWirePropertyParam();
	var url= basePath + 'mechanicsProperty/executeWireProperty.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": JSON.stringify(param),
		"contentType": "application/json; charset=utf-8",
		"dataType":"json",
		"async" : false,
		"success":function(data){
			layer.closeAll();
			if (!Tools.isEmpty(data)) {
				wireProperty.initWirePropertyCellData(data);
				groundProperty.initWirePropertyCellData(data);
			}
		},
		"error": function(e) {
			layer.closeAll();
			layer.msg("服务器出错");
			console.info(e);
		}
	});
}
/**
 * 保存导地线数据
 */
wireProperty.prototype.saveResult = function() {
	var param = wireProperty.getWirePropertyParam();
	var url= basePath + 'mechanicsProperty/saveResult.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": JSON.stringify(param),
		"contentType": "application/json; charset=utf-8",
		"dataType":"json",
		"success":function(data){
			layer.closeAll();
			if (data.result==true) {
				layer.msg("保存成功");
			}
		},
		"error": function(e) {
			layer.closeAll();
			layer.msg("服务器出错");
			console.info(e);
		}
	});
}
wireProperty.prototype.initWirePropertyCellData = function(data) {
	var horizontalTensions = data.horizontalTensions;	//	水平张力
	var meterSag100 = data.meterSag100;	//	百米弧垂
	var sags = data.sags;	//	弧垂
	for (var j = 0; j < horizontalTensions.length; j++) {
		if (j<=41) {
			//	水平张力数据
			Zcell1.GetSheet(0).SetCellValue(4, j+5, (horizontalTensions[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell1.GetSheet(0).SetCellValue(5, j+5, (horizontalTensions[j].minTemperature).toFixed());	//	最低气温
			Zcell1.GetSheet(0).SetCellValue(6, j+5, (horizontalTensions[j].avgTemperature).toFixed());	//	平均气温
			Zcell1.GetSheet(0).SetCellValue(7, j+5, (horizontalTensions[j].maxWind).toFixed());		//	最大风
			Zcell1.GetSheet(0).SetCellValue(8, j+5, (horizontalTensions[j].icing).toFixed());		//	覆冰
			Zcell1.GetSheet(0).SetCellValue(9, j+5, (horizontalTensions[j].maxTemperature).toFixed());	//	最高气温
			Zcell1.GetSheet(0).SetCellValue(10, j+5, (horizontalTensions[j].installV).toFixed());	//	安装
			Zcell1.GetSheet(0).SetCellValue(11, j+5, (horizontalTensions[j].abroadNoWind).toFixed());	//	外过(无风)
			Zcell1.GetSheet(0).SetCellValue(12, j+5, (horizontalTensions[j].abroadWind).toFixed());	//	外过(有风)
			Zcell1.GetSheet(0).SetCellValue(13, j+5, (horizontalTensions[j].internalOvervoltage).toFixed());	// 内过电压
//		Zcell1.GetSheet(0).SetCellValue(14, j, horizontalTensions[j].second5Wind);	//	5m/s风速
			//	弧垂数据
			Zcell1.GetSheet(0).SetCellValue(26, j+5, (sags[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell1.GetSheet(0).SetCellValue(27, j+5, (sags[j].icing).toFixed(2));	//	覆冰
			Zcell1.GetSheet(0).SetCellValue(28, j+5, (sags[j].maxTemperature).toFixed(2));	//	最高气温
			Zcell1.GetSheet(0).SetCellValue(29, j+5, (sags[j].abroadNoWind).toFixed(2));		//	外过(无风)
			//	百米弧垂数据
			Zcell6.GetSheet(0).SetCellValue(3, j+5, (meterSag100[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell6.GetSheet(0).SetCellValue(4, j+5, (meterSag100[j].t20A).toFixed(4));	//	-20
			Zcell6.GetSheet(0).SetCellValue(5, j+5, (meterSag100[j].t10A).toFixed(4));	//	-10
			Zcell6.GetSheet(0).SetCellValue(6, j+5, (meterSag100[j].t0).toFixed(4));	//	0
			Zcell6.GetSheet(0).SetCellValue(7, j+5, (meterSag100[j].t10B).toFixed(4));	//	10
			Zcell6.GetSheet(0).SetCellValue(8, j+5, (meterSag100[j].t20B).toFixed(4));	//	20
			Zcell6.GetSheet(0).SetCellValue(9, j+5, (meterSag100[j].t30B).toFixed(4));	//	30
			Zcell6.GetSheet(0).SetCellValue(10,j+5, (meterSag100[j].t40B).toFixed(4));	//	40
			
		}else{
			//	水平张力数据
			Zcell1.GetSheet(0).SetCellValue(15, j-37, (horizontalTensions[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell1.GetSheet(0).SetCellValue(16, j-37, (horizontalTensions[j].minTemperature).toFixed());	//	最低气温
			Zcell1.GetSheet(0).SetCellValue(17, j-37, (horizontalTensions[j].avgTemperature).toFixed());	//	平均气温
			Zcell1.GetSheet(0).SetCellValue(18, j-37, (horizontalTensions[j].maxWind).toFixed());		//	最大风
			Zcell1.GetSheet(0).SetCellValue(19, j-37, (horizontalTensions[j].icing).toFixed());		//	覆冰
			Zcell1.GetSheet(0).SetCellValue(20, j-37, (horizontalTensions[j].maxTemperature).toFixed());	//	最高气温
			Zcell1.GetSheet(0).SetCellValue(21, j-37, (horizontalTensions[j].installV).toFixed());	//	安装
			Zcell1.GetSheet(0).SetCellValue(22, j-37, (horizontalTensions[j].abroadNoWind).toFixed());	//外过(无风)
			Zcell1.GetSheet(0).SetCellValue(23, j-37, (horizontalTensions[j].abroadWind).toFixed());	//外过(有风)
			Zcell1.GetSheet(0).SetCellValue(24, j-37, (horizontalTensions[j].internalOvervoltage).toFixed());	// 内过电压
//		Zcell1.GetSheet(0).SetCellValue(14, j-36, horizontalTensions[j].second5Wind);	//	5m/s风速
			//	弧垂数据
			Zcell1.GetSheet(0).SetCellValue(31, j-37, (sags[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell1.GetSheet(0).SetCellValue(32, j-37, (sags[j].icing).toFixed(1));	//	覆冰
			Zcell1.GetSheet(0).SetCellValue(33, j-37, (sags[j].maxTemperature).toFixed(1));	//	最高气温
			Zcell1.GetSheet(0).SetCellValue(34, j-37, (sags[j].abroadNoWind).toFixed(1));		//	外过(无风)
//			百米弧垂数据
			Zcell6.GetSheet(0).SetCellValue(12, j-37, (meterSag100[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell6.GetSheet(0).SetCellValue(13, j-37, (meterSag100[j].t20A).toFixed(4));	//	-20
			Zcell6.GetSheet(0).SetCellValue(14, j-37, (meterSag100[j].t10A).toFixed(4));	//	-10
			Zcell6.GetSheet(0).SetCellValue(15, j-37, (meterSag100[j].t0).toFixed(4));		//	0
			Zcell6.GetSheet(0).SetCellValue(16, j-37, (meterSag100[j].t10B).toFixed(4));	//	10
			Zcell6.GetSheet(0).SetCellValue(17, j-37, (meterSag100[j].t20B).toFixed(4));	//	20
			Zcell6.GetSheet(0).SetCellValue(18, j-37, (meterSag100[j].t30B).toFixed(4));	//	30
			Zcell6.GetSheet(0).SetCellValue(19, j-37, (meterSag100[j].t40B).toFixed(4));	//	40
		}
	}
}
wireProperty.prototype.initData = function() {
	var url= basePath + 'mechanicsProperty/getInitData.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": "",
		"async" : false,
		"success":function(data){
			if (!Tools.isEmpty(data)) {
				Wirelist = data.entryContition.wirewayParam;
				const p = new Promise(function(resolve,reject){
					  resolve(initConductorParam(data.entryContition.baseParam1[0],data.entryContition.weatherConditions1,data.entryContition.steps1[0]));
					});
					p.then(function(value){
						wireProperty.executeWireProperty();
					});
			}
		},
		"error": function(e) {
			layer.msg("服务器出错");
			console.info(e);
		}
	});
}

//	初始化导线参数
var initConductorParam = function(baseParam,weatherCondition,steps){
	/*下拉框生成*/
	multipleGerateSelect(Zcell5,0,[[5,9],[5,10],[2,23],[2,24],[2,25],[2,26],[2,27],[2,28],
		[8,23],[8,24],[8,25],[8,26],[8,27],[8,28]],
			['fhzjzgd','dxcclb','calculation','calculation','calculation','calculation','calculation','calculation',
				'windConversion','windConversion','windConversion','windConversion','windConversion','windConversion'],
				[[10,15],['A','B','C','D'],['√','×'],['√','×'],['√','×'],['√','×'],['√','×'],['√','×'],
					['√','×'],['√','×'],['√','×'],['√','×'],['√','×'],['√','×']]);
	/*基本条件*/
	var wireSelect = '<a id="wireType_val" class="Alabel"></a><select id="wireType" style="background-color:#92D050;text-align-last:center;width:98%;">';
	var conductorCondition = null;
	for (var i = 0; i < Wirelist.length; i++) {
		if (baseParam.wireType==Wirelist[i].conductor_type) {
			conductorCondition = Wirelist[i];
			wireSelect+= '<option selected>'+Wirelist[i].conductor_type+'</option>';
		}else{
			wireSelect+= '<option>'+Wirelist[i].conductor_type+'</option>';
		}
	}
	wireSelect+='</select>';
	Zcell5.GetSheet(0).SetCellType(5, 4, {
	    "code": "object",
	    "object":wireSelect
	});
	$("#wireType_val").html(baseParam.wireType);	//	导线型号
	Zcell5.GetSheet(0).SetCellValue(5,5,toPercent(baseParam.maxTension));//	最大平均运行张力
	Zcell5.GetSheet(0).SetCellValue(5,6,baseParam.securityCoefficient);//	设计安全系数
	Zcell5.GetSheet(0).SetCellValue(5,7,baseParam.stringingCooling);//	架线初伸长降温
	Zcell5.GetSheet(0).SetCellValue(5,8,baseParam.windLoadCalcHeight);//	风荷载计算高度
	$("#wireComputeBook .fhzjzgd").val(baseParam.windLoadRefeHeight);//	风荷载基准高度  
	$("#wireComputeBook .dxcclb").val(baseParam.terrainRoughness);//	地形粗糙度类别
	/*导线参数*/
	Zcell5.GetSheet(0).SetCellValue(14,4,conductorCondition.modulus_elasticity);//	弹性系数
	Zcell5.GetSheet(0).SetCellValue(14,5,conductorCondition.tem_exp_coefficient);//	线膨胀系数
	Zcell5.GetSheet(0).SetCellValue(14,6,conductorCondition.unit_weight);//	单位长度重量
	Zcell5.GetSheet(0).SetCellValue(14,7,conductorCondition.diameter);//	外径
	Zcell5.GetSheet(0).SetCellValue(14,8,conductorCondition.cross_section_area);//	计算截面
	Zcell5.GetSheet(0).SetCellValue(14,9,conductorCondition.breaking_force);//	拉断力
	/*气象条件*/
	for (var i = 0; i < weatherCondition.length; i++) {
		Zcell5.GetSheet(0).SetCellValue(2,i+14,weatherCondition[i].isCalculation==true?"√":"×");//	参与计算
		Zcell5.GetSheet(0).SetCellValue(3,i+14,weatherCondition[i].workingConditionNo);//	工况序号
		Zcell5.GetSheet(0).SetCellValue(4,i+14,weatherCondition[i].workingConditionName);//	工况名称
		Zcell5.GetSheet(0).SetCellValue(5,i+14,weatherCondition[i].temperature);//	温度℃
		Zcell5.GetSheet(0).SetCellValue(6,i+14,weatherCondition[i].windSpeed);//	风速m/s
		Zcell5.GetSheet(0).SetCellValue(7,i+14,weatherCondition[i].iceThickness);//	冰厚mm
		Zcell5.GetSheet(0).SetCellValue(8,i+14,weatherCondition[i].isWindSpeedConversion==true?"√":"×");//	风速折算
		Zcell5.GetSheet(0).SetCellValue(9,i+14,weatherCondition[i].remarks);//	备注
		if (i>=9) {
			$(".calculation").eq(i-9).val(weatherCondition[i].isCalculation+"");
			$(".windConversion").eq(i-9).val(weatherCondition[i].isWindSpeedConversion+"");
			var _thisCalc = Zcell5.GetSheet(0).GetCell(2, i+14).childNodes[1];
			_thisCalc.previousSibling.innerHTML  = weatherCondition[i].isCalculation;
			var _thisConv = Zcell5.GetSheet(0).GetCell(8, i+14).childNodes[1];
			_thisConv.previousSibling.innerHTML  = weatherCondition[i].isWindSpeedConversion;
		}
	}
	/*计算代表档距范围和步长*/
	Zcell5.GetSheet(0).SetCellValue(13,12,steps.spanStart);
	Zcell5.GetSheet(0).SetCellValue(13,13,steps.steps);
	
}

wireProperty.prototype.initCellTableData = function(data){
	groundStringingContainer();
	groundPropertyCellTable();
	groundComputeBookCellTable();
	wireStringingContainer();
	wirePropertyCellTable();
	wireComputeBookCellTable();
}


/**
 * 导线计算书
 */
var wireComputeBookCellTable = function(){
	/*EXCEL列宽比 : 1字符≈2.27mm*/
	const colWidth = 2.27; 
	// 创建JSCELL，指明承载容器
	Zcell5 = new ZCell(document.getElementById("wireComputeBookContainer"));
	// 创建表，并指定列，行数
	Zcell5.InserSheet(0, 17, 36);
	// 加载数据
	Zcell5.GetSheet(0).LoadArrData([]);
	// 设置行高
	for (var i = 1; i <= 36; i++) {
		Zcell5.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(7.5)*colWidth);
		if (i==1) {
			Zcell5.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(1.13)*colWidth);
		}
	}
	//	样式
	for (var i = 2; i <= 6; i++) {
		for (var j = 3; j <= 10; j++) {
			Zcell5.GetSheet(0).SetCellStyle(i, j, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 11; i <= 16; i++) {
		for (var j = 3; j <= 9; j++) {
			Zcell5.GetSheet(0).SetCellStyle(i, j, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 2; i <= 9; i++) {
		for (var j = 13; j <= 28; j++) {
			Zcell5.GetSheet(0).SetCellStyle(i, j, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 5; i <= 8; i++) {
		for (var j = 14; j <= 28; j++) {
			Zcell5.GetSheet(0).SetCellStyle(i, j, {
				"background-color" : "#FFFF00"
			});
		}
	}
	setCellStyle(Zcell5,0,[[5,5],[5,6],[5,7],[5,8],[4,24],[4,25],[4,26],[4,27],[4,28],[13,12],[13,13]],{"background-color" : "#FFFF00"});
	setCellStyle(Zcell5,0,[[5,4],[5,9],[5,10],[2,23],[2,24],[2,25],[2,26],[2,27],[2,28],[8,23],[8,24],[8,25],[8,26],[8,27],[8,28]],{"background-color" : "#92D050"});
	//合并单元格
	Zcell5.GetSheet(0).MergeCells(1,1,17,1);
	Zcell5.GetSheet(0).MergeCells(2,2,9,2);
	Zcell5.GetSheet(0).MergeCells(10,2,17,2);
	Zcell5.GetSheet(0).MergeCells(2,12,9,12);
	Zcell5.GetSheet(0).MergeCells(10,11,17,11);
	for (var i = 3; i <= 10; i++) {
		Zcell5.GetSheet(0).MergeCells(2,i,3,i);
		Zcell5.GetSheet(0).MergeCells(5,i,6,i);
	}
	for (var i = 3; i <= 13; i++) {
		if (i==11) continue;
		Zcell5.GetSheet(0).MergeCells(11,i,12,i);
		if (i<=9) {
			Zcell5.GetSheet(0).MergeCells(14,i,15,i);
		}
	}	
	// 单元格赋值
	setCellValueAndStyle(Zcell5,0,
	[[1,1],[2,2],[10,2],[2,12],[11,11],[12,12],[12,13],
		[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],],
	["输入条件","（1）基本条件","（3）导线参数","（2）气象条件","（4）计算代表档距范围和步长","代表档距范围：","代表档距步长值：",
		"导线型号","最大平均运行张力","设计安全系数","架线初伸长降温","风荷载计算高度","风荷载基准高度","地形粗糙度类别",],
		{"text-align" : "left"});
	setCellValue(Zcell5,0,
			[[2,3],[4,3],[5,3],[11,3],[13,3],[15,3],[16,3],[2,13],[3,13],[4,13],[5,13],[6,13],[7,13],[8,13],[9,13],
				[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[11,4],[11,5],[11,6],[11,7],[11,8],[11,9],
				[13,4],[13,5],[13,6],[13,7],[13,8],[13,9],[16,4],[16,5],[16,6],[16,7],[16,8],[16,9],[14,12],[15,12],
					],
			["名称","单位","数值","名称","符号","数值","单位","参与计算","工况序号","工况","温度℃","风速m/s","冰厚mm","风速折算","备注",
				"/","/","/","℃","m","m","m","弹性系数","线膨胀系数","单位长度重量","外径","计算截面","拉断力",
					"E","α","W","d","S","Tp","MPa","1/℃","kg/m","mm","mm2","N","-",800,	]);
}

/**
 * 地线计算书
 */
var groundComputeBookCellTable = function(){
	/*EXCEL列宽比 : 1字符≈2.27mm*/
	const colWidth = 2.27; 
	// 创建JSCELL，指明承载容器
	Zcell3 = new ZCell(document.getElementById("groundComputeBookContainer"));
	// 创建表，并指定列，行数
	Zcell3.InserSheet(0, 17, 36);
	// 加载数据
	Zcell3.GetSheet(0).LoadArrData([]);
	// 设置行高
	for (var i = 1; i <= 36; i++) {
		Zcell3.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(7.5)*colWidth);
		if (i==1) {
			Zcell3.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(1.13)*colWidth);
		}
	}
	//	样式
	for (var i = 2; i <= 6; i++) {
		for (var j = 3; j <= 8; j++) {
			Zcell3.GetSheet(0).SetCellStyle(i, j, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 11; i <= 16; i++) {
		for (var j = 3; j <= 9; j++) {
			Zcell3.GetSheet(0).SetCellStyle(i, j, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 2; i <= 9; i++) {
		for (var j = 13; j <= 28; j++) {
			Zcell3.GetSheet(0).SetCellStyle(i, j, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 11; i <= 14; i++) {
		for (var j = 16; j <= 17; j++) {
			Zcell3.GetSheet(0).SetCellStyle(i, j, {
				"border" : "0.5px solid black"
			});
		}
	}
	setCellStyle(Zcell3,0,[[5,5]],{"background-color" : "#FFFF00"});
	setCellStyle(Zcell3,0,[[5,4],[2,23],[2,24],[2,25],[2,26],[2,27],[2,28]],{"background-color" : "#92D050"});
	//合并单元格
	Zcell3.GetSheet(0).MergeCells(1,1,17,1);
	Zcell3.GetSheet(0).MergeCells(2,2,9,2);
	Zcell3.GetSheet(0).MergeCells(10,2,17,2);
	Zcell3.GetSheet(0).MergeCells(2,12,9,12);
	Zcell3.GetSheet(0).MergeCells(10,11,17,11);
	Zcell3.GetSheet(0).MergeCells(10,15,17,15);
	Zcell3.GetSheet(0).MergeCells(11,16,12,16);
	Zcell3.GetSheet(0).MergeCells(11,17,12,17);
	Zcell3.GetSheet(0).MergeCells(13,16,14,16);
	Zcell3.GetSheet(0).MergeCells(13,17,14,17);
	Zcell3.GetSheet(0).SetCellValue(11,16,"是否与导线配合计算");
	Zcell3.GetSheet(0).SetCellValue(11,17,"导地线间距控制式");
	for (var i = 3; i <= 10; i++) {
		Zcell3.GetSheet(0).MergeCells(2,i,3,i);
		Zcell3.GetSheet(0).MergeCells(5,i,6,i);
	}
	for (var i = 3; i <= 13; i++) {
		if (i==11) continue;
		Zcell3.GetSheet(0).MergeCells(11,i,12,i);
		if (i<=9) {
			Zcell3.GetSheet(0).MergeCells(14,i,15,i);
		}
	}	
	for (var i = 19; i <= 24; i++) {
		Zcell3.GetSheet(0).MergeCells(11,i,12,i);
		Zcell3.GetSheet(0).MergeCells(14,i,15,i);
	}	
	// 单元格赋值
	setCellValueAndStyle(Zcell3,0,
	[[1,1],[2,2],[10,2],[2,12],[11,11],[10,15],[12,12],[12,13],
		[3,4],[3,5],[3,6],[3,7],[3,8]],
	["输入条件","（1）基本条件","（3）地线参数","（2）气象条件","（4）计算代表档距范围和步长","（5）控制因素","代表档距范围：","代表档距步长值：",
		"导线型号","架线初伸长降温","风荷载计算高度","风荷载基准高度","地形粗糙度类别",],
		{"text-align" : "left"});
	setCellValue(Zcell3,0,
			[[2,3],[4,3],[5,3],[11,3],[13,3],[15,3],[16,3],[2,13],[3,13],[4,13],[5,13],[6,13],[7,13],[8,13],[9,13],[11,19],[13,19],[14,19],
				[4,4],[4,5],[4,6],[4,7],[4,8],[11,4],[11,5],[11,6],[11,7],[11,8],[11,9],
				[13,4],[13,5],[13,6],[13,7],[13,8],[13,9],[16,4],[16,5],[16,6],[16,7],[16,8],[16,9],[14,12],[15,12],
					],
			["名称","单位","数值","名称","符号","数值","单位","参与计算","工况序号","工况","温度℃","风速m/s","冰厚mm","风速折算","备注","名称","单位","数值",
				"/","℃","m","m","m","弹性系数","线膨胀系数","单位长度重量","外径","计算截面","拉断力",
					"E","α","W","d","S","Tp","MPa","1/℃","kg/m","mm","mm2","N","-",800,
				]);
	var count = 1;
	var workCondition=  ["最低气温","平均气温","最大风","覆冰","最高气温","安装","外过电压","外过电压","内过电压","5m/s风速","地线+5","三跨导线","三跨地线","验算4","验算5"];
	for (var i = 14; i <= 28; i++) {
		Zcell3.GetSheet(0).SetCellValue(3,i,count);
		Zcell3.GetSheet(0).SetCellValue(4,i,workCondition[count-1]);
		Zcell3.GetSheet(0).SetCellValue(2,i,["√","√","√","√","√","√","√","√","√"][count-1]);
		Zcell3.GetSheet(0).SetCellValue(5,i,[-20,15,-5,-5,40,-10,15,15,15,15,-5,-5,-5,-5,-5][count-1]);
		Zcell3.GetSheet(0).SetCellValue(6,i,[0,0,27,10,0,10,0,10,15,5,10,10,10,0,0][count-1]);
		Zcell3.GetSheet(0).SetCellValue(7,i,[0,0,0,10,0,0,0,0,0,0,15,20,25,3,4][count-1]);
		Zcell3.GetSheet(0).SetCellValue(8,i,["×","×","√","×","×","×","×","×","×","×","×","×","×","×","×"][count-1]);
		Zcell3.GetSheet(0).SetCellValue(9,i,["","","","","","","(无风)","(有风)","","钢管杆用","验算1","验算2","验算3","验算4","验算5"][count-1]);
		count++;
	}
}


/**
 * 地线力学特性表
 */
var groundPropertyCellTable = function(){
	/*EXCEL行高比 : 1磅≈0.35mm*/
	const rowHeight = 0.35;	
	// 创建JSCELL，指明承载容器
	Zcell2 = new ZCell(document.getElementById("groundPropertyContainer"));
	// 创建表，并指定列，行数
	Zcell2.InserSheet(0, 44, 55);
	// 加载数据
	Zcell2.GetSheet(0).LoadArrData([]);
	var table = document.getElementById("tabl1");
//	var len = table.rows.length; 
//    for(var i = 0;i < len;i++){
//        table.rows[i].cells[0].style.display="none";
//        table.rows[i].cells[0].textContent="";
//    }
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		 table.rows[0].cells[i].textContent=i;
	}
	
	// 设置列宽
	setConversionColWidth(Zcell2,0,
			[8.38,2.63,1,5,5,5,5,5,5,5,5,5,5,0.77,5,5,5,5,5,5,5,5,5,5,0.77,4,4,4,4,0.77,
				4,4,4,4,0.77,6.63,3.25,0.77,1.13,3.63,1.38,4,0.92,1.38]);
	var colsWidthArr = [8.38,2.63,1,5,5,5,5,5,5,5,5,5,5,0.77,5,5,5,5,5,5,5,5,5,5,0.77,4,4,4,4,0.77,
		4,4,4,4,0.77,6.63,3.25,0.77,1.13,3.63,1.38,4,0.92,1.38];
	// 设置行高
	for (var i = 1; i <= 56; i++) {
		if (i==1) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(15)*rowHeight);
		}else if (i==2) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(9.75)*rowHeight);
		}else if (i==3) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(14.25)*rowHeight);
		}else if (i==4) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(22.5)*rowHeight);
		}else if (i>=5&&i<=46) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(14.25)*rowHeight);
		}else if (i>=47&&i<=54) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(18)*rowHeight);
		}else if (i==55) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(16.8)*rowHeight);
		}
	}
	//合并单元格
	Zcell2.GetSheet(0).MergeCells(4,3,4,4);
	Zcell2.GetSheet(0).SetCellType(4,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	Zcell2.GetSheet(0).MergeCells(5,3,13,3);
	Zcell2.GetSheet(0).SetCellValue(5,3,"工  况  / 张  力（N）");
	Zcell2.GetSheet(0).MergeCells(15,3,15,4);
	Zcell2.GetSheet(0).SetCellType(15,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	Zcell2.GetSheet(0).MergeCells(16,3,24,3);
	Zcell2.GetSheet(0).SetCellValue(16,3,"工  况  / 张  力（N）");
	Zcell2.GetSheet(0).MergeCells(26,3,26,4);
	Zcell2.GetSheet(0).SetCellType(26,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	Zcell2.GetSheet(0).MergeCells(27,3,29,3);
	Zcell2.GetSheet(0).SetCellValue(27,3,"弧  垂（m）");
	Zcell2.GetSheet(0).MergeCells(31,3,31,4);
	Zcell2.GetSheet(0).SetCellType(31,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	Zcell2.GetSheet(0).MergeCells(32,3,34,3);
	Zcell2.GetSheet(0).SetCellValue(32,3,"弧  垂（m）");
	Zcell2.GetSheet(0).MergeCells(36,5,41,5);
	Zcell2.GetSheet(0).SetCellValue(36,5,"导线参数");
	Zcell2.GetSheet(0).MergeCells(36,14,42,14);
	Zcell2.GetSheet(0).SetCellValue(36,14,"荷载表(N/m)");
	Zcell2.GetSheet(0).MergeCells(36,28,42,28);
	Zcell2.GetSheet(0).SetCellValue(36,28,"气象条件");
	
	for (var i = 6; i <= 12; i++) {
		Zcell2.GetSheet(0).MergeCells(37,i,39,i);
		Zcell2.GetSheet(0).MergeCells(40,i,41,i);
	}
	for (var i = 15; i <= 26; i++) {
		Zcell2.GetSheet(0).MergeCells(36,i,37,i);
		Zcell2.GetSheet(0).MergeCells(38,i,40,i);
		Zcell2.GetSheet(0).MergeCells(41,i,42,i);
	}
	for (var i = 29; i <= 38; i++) {
		Zcell2.GetSheet(0).MergeCells(37,i,38,i);
		Zcell2.GetSheet(0).MergeCells(39,i,40,i);
		Zcell2.GetSheet(0).MergeCells(41,i,42,i);
	}
	
	Zcell2.GetSheet(0).MergeCells(22,49,31,50);
	Zcell2.GetSheet(0).MergeCells(32,49,38,50);
	Zcell2.GetSheet(0).SetCellValue(32,49,"0");
	Zcell2.GetSheet(0).MergeCells(39,49,41,50);
	Zcell2.GetSheet(0).SetCellValue(39,49,"施工图");
	Zcell2.GetSheet(0).MergeCells(42,49,43,50);
	Zcell2.GetSheet(0).SetCellType(42,49,{
        "code": "object",
        "object":"设计<br>阶段"
    });
	Zcell2.GetSheet(0).MergeCells(32,51,43,53);
	Zcell2.GetSheet(0).SetCellType(32,51,{
		"code": "object",
		"object":"JL/G1A-300/25导线力学特性表[2710,k=8.0]"
	});
	Zcell2.GetSheet(0).MergeCells(33,54,38,54);
	Zcell2.GetSheet(0).SetCellValue(32,54,"图 号");
	Zcell2.GetSheet(0).SetCellValue(33,54,"S1363C-A-10");
	
	Zcell2.GetSheet(0).MergeCells(39,54,41,54);
	Zcell2.GetSheet(0).SetCellValue(39,54,"图纸级别");
	Zcell2.GetSheet(0).MergeCells(42,54,43,54);
	Zcell2.GetSheet(0).SetCellValue(42,54,"3");
	
	
	for (var i = 51; i <= 54; i++) {
		Zcell2.GetSheet(0).MergeCells(24,i,26,i);
		Zcell2.GetSheet(0).MergeCells(27,i,28,i);
		Zcell2.GetSheet(0).MergeCells(29,i,31,i);
	}
	Zcell2.GetSheet(0).MergeCells(22,51,23,51);
	Zcell2.GetSheet(0).SetCellValue(22,51,"批 准");
	Zcell2.GetSheet(0).MergeCells(22,52,23,53);
	Zcell2.GetSheet(0).SetCellValue(22,52,"审 核");
	Zcell2.GetSheet(0).MergeCells(22,54,23,54);
	Zcell2.GetSheet(0).SetCellValue(22,54,"校 核");
	
	// 单元格赋值
	setCellType(Zcell2,0,
			[[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4]],
				["最低<br>气温","平均<br>气温","大风","覆冰","最高<br>气温","安装",
					"外过<br>(无风)","外过<br>(有风)","内过<br>电压"]);
	setCellType(Zcell2,0,
			[[16,4],[17,4],[18,4],[19,4],[20,4],[21,4],[22,4],[23,4],[24,4]],
			["最低<br>气温","平均<br>气温","大风","覆冰","最高<br>气温","安装",
				"外过<br>(无风)","外过<br>(有风)","内过<br>电压"]);
	setCellType(Zcell2,0,
			[[27,4],[28,4],[29,4],[32,4],[33,4],[34,4]],
			["覆冰","最高<br>气温",	"外过<br>(无风)","覆冰","最高<br>气温","外过<br>(无风)"]);
	setCellValue(Zcell2,0,
			[[36,6],[36,7],[36,8],[36,9],[36,10],[36,11],[36,12],
				[36,15],[36,16],[36,17],[36,18],[36,19],[36,20],[36,21],[36,22],[36,23],[36,24],[36,25],[36,26],
					[36,29],[36,30],[36,31],[36,32],[36,33],[36,34],[36,35],[36,36],[36,37],[36,38]],
				["项目","计算截面","外径","线密度","弹性系数","温度系数","拉断力",
					"名称","自荷载","冰荷载","自荷载加冰荷载","无冰风荷载","无冰风荷载","无冰风荷载","覆冰风荷载","无冰综合荷载","无冰综合荷载","无冰综合荷载","覆冰综合荷载",
						"工况","最低气温","平均气温","最大风","覆冰","最高气温","安装","外过电压","外过电压","内过电压"]
			);
	setCellValue(Zcell2,0,
			[[37,6],[40,6],[38,15],[41,15],[37,29],[39,29],[41,29],
				[37,7],[37,8],[37,9],[37,10],[37,11],[37,12],
					[27,51],[27,52],[27,53],[27,54]],
			["单位","数值","符号(b,v)","数值","温度℃","风速m/s","冰厚mm",
				"mm2","mm","kg/m","MPa","1/℃","N",
					"设 计","CAD制图","比 例","日 期"]);
	//	样式
	for (var i = 3; i <= 46; i++) {
		for (var j = 4; j <= 13; j++) {
			Zcell2.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 3; i <= 45; i++) {
		for (var j = 15; j <= 24; j++) {
			Zcell2.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 3; i <= 46; i++) {
		for (var j = 26; j <= 29; j++) {
			Zcell2.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 3; i <= 45; i++) {
		for (var j = 31; j <= 34; j++) {
			Zcell2.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 6; i <= 12; i++) {
		for (var j = 36; j <= 41; j++) {
			Zcell2.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 15; i <= 26; i++) {
		for (var j = 36; j <= 42; j++) {
			Zcell2.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 29; i <= 38; i++) {
		for (var j = 36; j <= 42; j++) {
			Zcell2.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 49; i <= 54; i++) {
		for (var j = 22; j <= 43; j++) {
			Zcell2.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 2; i <= 43; i++) {
		Zcell2.GetSheet(0).SetCellStyle(i, 2, {
			"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell2.GetSheet(0).SetCellStyle(i, 54, {
			"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	for (var i = 2; i <= 54; i++) {
		Zcell2.GetSheet(0).SetCellStyle(2, i, {
			"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell2.GetSheet(0).SetCellStyle(43, i, {
			"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	//背景图片
	Zcell2.GetSheet(0).SetCellType(22, 49,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/hdLogo.png' width='"+
		UnitConversion.mmConversionPx(82)+"' height='"+
		UnitConversion.mmConversionPx(10)+"'/>"
	});
}


/**
 * 导线力学特性表
 */
var wirePropertyCellTable = function(){
	/*EXCEL行高比 : 1磅≈0.35mm*/
	const rowHeight = 0.35;	
	// 创建JSCELL，指明承载容器
	Zcell1 = new ZCell(document.getElementById("wirePropertyContainer"));
	// 创建表，并指定列，行数
	Zcell1.InserSheet(0, 44, 55);
	// 加载数据
	Zcell1.GetSheet(0).LoadArrData([]);
	var table = document.getElementById("tabl1");
//	var len = table.rows.length; 
//    for(var i = 0;i < len;i++){
//        table.rows[i].cells[0].style.display="none";
//        table.rows[i].cells[0].textContent="";
//    }
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		 table.rows[0].cells[i].textContent=i;
	}
	
	// 设置列宽
	setConversionColWidth(Zcell1,0,
			[8.38,2.63,1,5,5,5,5,5,5,5,5,5,5,0.77,5,5,5,5,5,5,5,5,5,5,0.77,4,4,4,4,0.77,
				4,4,4,4,0.77,6.63,3.25,0.77,1.13,3.63,1.38,4,0.92,1.38]);
	var colsWidthArr = [8.38,2.63,1,5,5,5,5,5,5,5,5,5,5,0.77,5,5,5,5,5,5,5,5,5,5,0.77,4,4,4,4,0.77,
		4,4,4,4,0.77,6.63,3.25,0.77,1.13,3.63,1.38,4,0.92,1.38];
	// 设置行高
	for (var i = 1; i <= 56; i++) {
		if (i==1) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(15)*rowHeight);
		}else if (i==2) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(9.75)*rowHeight);
		}else if (i==3) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(14.25)*rowHeight);
		}else if (i==4) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(22.5)*rowHeight);
		}else if (i>=5&&i<=46) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(14.25)*rowHeight);
		}else if (i>=47&&i<=54) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(18)*rowHeight);
		}else if (i==55) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(16.8)*rowHeight);
		}
	}
	//合并单元格
	Zcell1.GetSheet(0).MergeCells(4,3,4,4);
	Zcell1.GetSheet(0).SetCellType(4,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	Zcell1.GetSheet(0).MergeCells(5,3,13,3);
	Zcell1.GetSheet(0).SetCellValue(5,3,"工  况  / 张  力（N）");
	Zcell1.GetSheet(0).MergeCells(15,3,15,4);
	Zcell1.GetSheet(0).SetCellType(15,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	Zcell1.GetSheet(0).MergeCells(16,3,24,3);
	Zcell1.GetSheet(0).SetCellValue(16,3,"工  况  / 张  力（N）");
	Zcell1.GetSheet(0).MergeCells(26,3,26,4);
	Zcell1.GetSheet(0).SetCellType(26,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	Zcell1.GetSheet(0).MergeCells(27,3,29,3);
	Zcell1.GetSheet(0).SetCellValue(27,3,"弧  垂（m）");
	Zcell1.GetSheet(0).MergeCells(31,3,31,4);
	Zcell1.GetSheet(0).SetCellType(31,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	Zcell1.GetSheet(0).MergeCells(32,3,34,3);
	Zcell1.GetSheet(0).SetCellValue(32,3,"弧  垂（m）");
	Zcell1.GetSheet(0).MergeCells(36,5,41,5);
	Zcell1.GetSheet(0).SetCellValue(36,5,"导线参数");
	Zcell1.GetSheet(0).MergeCells(36,14,42,14);
	Zcell1.GetSheet(0).SetCellValue(36,14,"荷载表(N/m)");
	Zcell1.GetSheet(0).MergeCells(36,28,42,28);
	Zcell1.GetSheet(0).SetCellValue(36,28,"气象条件");
	
	for (var i = 6; i <= 12; i++) {
		Zcell1.GetSheet(0).MergeCells(37,i,39,i);
		Zcell1.GetSheet(0).MergeCells(40,i,41,i);
	}
	for (var i = 15; i <= 26; i++) {
		Zcell1.GetSheet(0).MergeCells(36,i,37,i);
		Zcell1.GetSheet(0).MergeCells(38,i,40,i);
		Zcell1.GetSheet(0).MergeCells(41,i,42,i);
	}
	for (var i = 29; i <= 38; i++) {
		Zcell1.GetSheet(0).MergeCells(37,i,38,i);
		Zcell1.GetSheet(0).MergeCells(39,i,40,i);
		Zcell1.GetSheet(0).MergeCells(41,i,42,i);
	}
	
	Zcell1.GetSheet(0).MergeCells(22,49,31,50);
	Zcell1.GetSheet(0).MergeCells(32,49,38,50);
	Zcell1.GetSheet(0).SetCellValue(32,49,"0");
	Zcell1.GetSheet(0).MergeCells(39,49,41,50);
	Zcell1.GetSheet(0).SetCellValue(39,49,"施工图");
	Zcell1.GetSheet(0).MergeCells(42,49,43,50);
	Zcell1.GetSheet(0).SetCellType(42,49,{
        "code": "object",
        "object":"设计<br>阶段"
    });
	Zcell1.GetSheet(0).MergeCells(32,51,43,53);
	Zcell1.GetSheet(0).SetCellType(32,51,{
		"code": "object",
		"object":"JL/G1A-300/25导线力学特性表[2710,k=8.0]"
	});
	Zcell1.GetSheet(0).MergeCells(33,54,38,54);
	Zcell1.GetSheet(0).SetCellValue(32,54,"图 号");
	Zcell1.GetSheet(0).SetCellValue(33,54,"S1363C-A-10");
	
	Zcell1.GetSheet(0).MergeCells(39,54,41,54);
	Zcell1.GetSheet(0).SetCellValue(39,54,"图纸级别");
	Zcell1.GetSheet(0).MergeCells(42,54,43,54);
	Zcell1.GetSheet(0).SetCellValue(42,54,"3");
	
	
	for (var i = 51; i <= 54; i++) {
		Zcell1.GetSheet(0).MergeCells(24,i,26,i);
		Zcell1.GetSheet(0).MergeCells(27,i,28,i);
		Zcell1.GetSheet(0).MergeCells(29,i,31,i);
	}
	Zcell1.GetSheet(0).MergeCells(22,51,23,51);
	Zcell1.GetSheet(0).SetCellValue(22,51,"批 准");
	Zcell1.GetSheet(0).MergeCells(22,52,23,53);
	Zcell1.GetSheet(0).SetCellValue(22,52,"审 核");
	Zcell1.GetSheet(0).MergeCells(22,54,23,54);
	Zcell1.GetSheet(0).SetCellValue(22,54,"校 核");
	
	// 单元格赋值
	setCellType(Zcell1,0,
			[[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4]],
				["最低<br>气温","平均<br>气温","大风","覆冰","最高<br>气温","安装",
					"外过<br>(无风)","外过<br>(有风)","内过<br>电压"]);
	setCellType(Zcell1,0,
			[[16,4],[17,4],[18,4],[19,4],[20,4],[21,4],[22,4],[23,4],[24,4]],
			["最低<br>气温","平均<br>气温","大风","覆冰","最高<br>气温","安装",
				"外过<br>(无风)","外过<br>(有风)","内过<br>电压"]);
	setCellType(Zcell1,0,
			[[27,4],[28,4],[29,4],[32,4],[33,4],[34,4]],
			["覆冰","最高<br>气温",	"外过<br>(无风)","覆冰","最高<br>气温","外过<br>(无风)"]);
	setCellValue(Zcell1,0,
			[[36,6],[36,7],[36,8],[36,9],[36,10],[36,11],[36,12],
				[36,15],[36,16],[36,17],[36,18],[36,19],[36,20],[36,21],[36,22],[36,23],[36,24],[36,25],[36,26],
					[36,29],[36,30],[36,31],[36,32],[36,33],[36,34],[36,35],[36,36],[36,37],[36,38]],
				["项目","计算截面","外径","线密度","弹性系数","温度系数","拉断力",
					"名称","自荷载","冰荷载","自荷载加冰荷载","无冰风荷载","无冰风荷载","无冰风荷载","覆冰风荷载","无冰综合荷载","无冰综合荷载","无冰综合荷载","覆冰综合荷载",
						"工况","最低气温","平均气温","最大风","覆冰","最高气温","安装","外过电压","外过电压","内过电压"]
			);
	setCellValue(Zcell1,0,
			[[37,6],[40,6],[38,15],[41,15],[37,29],[39,29],[41,29],
				[37,7],[37,8],[37,9],[37,10],[37,11],[37,12],
					[27,51],[27,52],[27,53],[27,54]],
			["单位","数值","符号(b,v)","数值","温度℃","风速m/s","冰厚mm",
				"mm2","mm","kg/m","MPa","1/℃","N",
					"设 计","CAD制图","比 例","日 期"]);
	//	样式
	for (var i = 3; i <= 46; i++) {
		for (var j = 4; j <= 13; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 3; i <= 45; i++) {
		for (var j = 15; j <= 24; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 3; i <= 46; i++) {
		for (var j = 26; j <= 29; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 3; i <= 45; i++) {
		for (var j = 31; j <= 34; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 6; i <= 12; i++) {
		for (var j = 36; j <= 41; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 15; i <= 26; i++) {
		for (var j = 36; j <= 42; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 29; i <= 38; i++) {
		for (var j = 36; j <= 42; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 49; i <= 54; i++) {
		for (var j = 22; j <= 43; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 2; i <= 43; i++) {
		Zcell1.GetSheet(0).SetCellStyle(i, 2, {
			"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell1.GetSheet(0).SetCellStyle(i, 54, {
			"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	for (var i = 2; i <= 54; i++) {
		Zcell1.GetSheet(0).SetCellStyle(2, i, {
			"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell1.GetSheet(0).SetCellStyle(43, i, {
			"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	//背景图片
	Zcell1.GetSheet(0).SetCellType(22, 49,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/hdLogo.png' width='"+
		UnitConversion.mmConversionPx(82)+"' height='"+
		UnitConversion.mmConversionPx(10)+"'/>"
	});
}

/*
 * 地线架线表
 */
var groundStringingContainer = function(){
	/*EXCEL行高比 : 1磅≈0.35mm*/
	const rowHeight = 0.35;	
	// 创建JSCELL，指明承载容器
	Zcell4 = new ZCell(document.getElementById("groundStringingContainer"));
	// 创建表，并指定列，行数
	Zcell4.InserSheet(0, 25, 56);
	// 加载数据
	Zcell4.GetSheet(0).LoadArrData([]);
	var table = document.getElementById("tabl1");
//	var len = table.rows.length; 
//    for(var i = 0;i < len;i++){
//        table.rows[i].cells[0].style.display="none";
//        table.rows[i].cells[0].textContent="";
//    }
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		 table.rows[0].cells[i].textContent=i;
	}
	
	// 设置列宽
	setConversionColWidth(Zcell4,0,
			[8.38,5.5,8.88,10,10,10,10,10,10,10,1.13,8.88,10,10,10,10,10,10,5,5,5,5,0.23,0.23,0.23]);
	var colsWidthArr = [8.38,5.5,8.88,10,10,10,10,10,10,10,1.13,8.88,10,10,10,10,10,10,5,5,5,5,0.23,0.23,0.23];
	// 设置行高
	for (var i = 1; i <= 56; i++) {
		if (i==1) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(15)*rowHeight);
		}else if (i==2) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(14.25)*rowHeight);
		}else if (i==3) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(30)*rowHeight);
		}else if (i>=4&&i<=46) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(14.25)*rowHeight);
		}
	}
	//合并单元格
	Zcell4.GetSheet(0).MergeCells(3,3,3,4);
	Zcell4.GetSheet(0).SetCellType(3,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	Zcell4.GetSheet(0).MergeCells(4,3,10,3);
	Zcell4.GetSheet(0).SetCellValue(4,3,"气  温（℃）/架线百米弧垂f(100)（m）");
	Zcell4.GetSheet(0).MergeCells(12,3,12,4);
	Zcell4.GetSheet(0).SetCellType(12,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	
	Zcell4.GetSheet(0).MergeCells(13,3,20,3);
	Zcell4.GetSheet(0).SetCellValue(13,3,"气  温（℃）/架线百米弧垂f(100)（m）");
	Zcell4.GetSheet(0).MergeCells(3,48,6,48);
	Zcell4.GetSheet(0).SetCellType(3,48,{
        "code": "object",
        "object":"架线弧垂表使用说明："
    });
	Zcell4.GetSheet(0).MergeCells(3,49,6,49);
	Zcell4.GetSheet(0).SetCellType(3,49,{
        "code": "object",
        "object":"1、观测弧垂计算公式："
    });
	Zcell4.GetSheet(0).MergeCells(3,50,6,50);
	Zcell4.GetSheet(0).SetCellType(3,50,{
        "code": "object",
        "object":"f=(f(100)L2)/(10000cosB)"
    });
	Zcell4.GetSheet(0).MergeCells(3,51,6,51);
	Zcell4.GetSheet(0).SetCellType(3,51,{
        "code": "object",
        "object":"f(100)--观测档所处耐张段代表档距"
    });
	Zcell4.GetSheet(0).MergeCells(3,52,6,52);
	Zcell4.GetSheet(0).SetCellType(3,52,{
        "code": "object",
        "object":"的百米弧垂(m)"
    });
	Zcell4.GetSheet(0).MergeCells(3,53,6,53);
	Zcell4.GetSheet(0).SetCellType(3,53,{
        "code": "object",
        "object":"L--观测档档距(m)"
    });
	Zcell4.GetSheet(0).MergeCells(3,54,6,54);
	Zcell4.GetSheet(0).SetCellType(3,54,{
        "code": "object",
        "object":"B--高差角 B=tg-1(h/L)"
    });
	Zcell4.GetSheet(0).MergeCells(3,55,6,55);
	Zcell4.GetSheet(0).SetCellType(3,55,{
        "code": "object",
        "object":"h--观测档电线悬挂点高差(m)"
    });

	Zcell4.GetSheet(0).MergeCells(8,49,12,49);
	Zcell4.GetSheet(0).SetCellType(8,49,{
        "code": "object",
        "object":" 2、本架线弧垂表已经按照降温-25℃考虑了导线 "
    });
	Zcell4.GetSheet(0).MergeCells(8,50,12,50);
	Zcell4.GetSheet(0).SetCellType(8,50,{
        "code": "object",
        "object":"初伸长，观测时可按实际气温查相应弧垂表。"
    });
	Zcell4.GetSheet(0).MergeCells(8,51,12,51);
	Zcell4.GetSheet(0).SetCellType(8,51,{
        "code": "object",
        "object":"若实际气温与弧垂可用插入法求其弧垂值。"
    });
	
	Zcell4.GetSheet(0).MergeCells(13,50,16,51);
	Zcell4.GetSheet(0).MergeCells(13,52,13,52);
	Zcell4.GetSheet(0).SetCellType(13,52,{
	"code": "object",
	"object":"批准"
	});
	Zcell4.GetSheet(0).MergeCells(13,53,13,54);
	Zcell4.GetSheet(0).SetCellType(13,53,{
        "code": "object",
        "object":"审核"
    });
	Zcell4.GetSheet(0).MergeCells(13,55,13,55);
	Zcell4.GetSheet(0).SetCellType(13,55,{
        "code": "object",
        "object":"校核"
    });
	
	Zcell4.GetSheet(0).MergeCells(15,52,15,52);
	Zcell4.GetSheet(0).SetCellType(15,52,{
        "code": "object",
        "object":"设计"
    });
	Zcell4.GetSheet(0).MergeCells(15,53,15,53);
	Zcell4.GetSheet(0).SetCellType(15,53,{
		"code": "object",
		"object":"CAD制图"
	});
	Zcell4.GetSheet(0).MergeCells(15,54,15,54);
	Zcell4.GetSheet(0).SetCellType(15,54,{
        "code": "object",
        "object":"比例"
    });
	Zcell4.GetSheet(0).MergeCells(15,55,15,55);
	Zcell4.GetSheet(0).SetCellType(15,55,{
        "code": "object",
        "object":"日期"
    });
	Zcell4.GetSheet(0).MergeCells(17,50,19,51);
	for (var i = 4; i <= 45; i++) {
		Zcell4.GetSheet(0).MergeCells(19,i,20,i);
	}
	Zcell4.GetSheet(0).MergeCells(17,52,21,54);
	Zcell4.GetSheet(0).SetCellType(17,52,{
        "code": "object",
        "object":"/"
    });
	Zcell4.GetSheet(0).MergeCells(21,50,21,51);
	Zcell4.GetSheet(0).SetCellType(21,50,{
		"code": "object",
		"object":"施工图"
	});
	Zcell4.GetSheet(0).MergeCells(22,50,22,51);
	Zcell4.GetSheet(0).SetCellType(22,50,{
        "code": "object",
        "object":"设计<br>阶段"
    });
	Zcell4.GetSheet(0).MergeCells(18,55,20,55);
	Zcell4.GetSheet(0).MergeCells(21,55,21,55);
	Zcell4.GetSheet(0).SetCellType(21,55,{
        "code": "object",
        "object":"图纸级别"
    });
	Zcell4.GetSheet(0).SetCellType(17,55,{
		"code": "object",
		"object":"图号"
	});
	Zcell4.GetSheet(0).SetCellType(22,55,{
		"code": "object",
		"object":"3"
	});

//	// 单元格赋值
	setCellType(Zcell4,0,
			[[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4]],
			["-20","-10","0","10","20","30","40"]);
	setCellType(Zcell4,0,
			[[13,4],[14,4],[15,4],[16,4],[17,4],[18,4],[19,4]],
			["-20","-10","0","10","20","30","40"]);
	for (var i = 3; i <= 46; i++) {
		for (var j = 3; j <= 10; j++) {
			Zcell4.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 3; i <= 45; i++) {
		for (var j = 12; j <= 20; j++) {
			Zcell4.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 50; i <= 55; i++) {
		for (var j = 13; j <= 22; j++) {
			Zcell4.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}

	for (var i = 2; i <= 22; i++) {
		Zcell4.GetSheet(0).SetCellStyle(i, 2, {
			"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell4.GetSheet(0).SetCellStyle(i, 55, {
			"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	for (var i = 2; i <= 55; i++) {
		Zcell4.GetSheet(0).SetCellStyle(2, i, {
			"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell4.GetSheet(0).SetCellStyle(22, i, {
			"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	//背景图片
	Zcell4.GetSheet(0).SetCellType(13, 50,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/hdLogo.png' width='"+
		UnitConversion.mmConversionPx(82)+"' height='"+
		UnitConversion.mmConversionPx(10)+"'/>"
	});
}


/*
 * 导线架线表
 */
var wireStringingContainer = function(){
	/*EXCEL行高比 : 1磅≈0.35mm*/
	const rowHeight = 0.35;	
	// 创建JSCELL，指明承载容器
	Zcell6 = new ZCell(document.getElementById("wireStringingContainer"));
	// 创建表，并指定列，行数
	Zcell6.InserSheet(0, 25, 56);
	// 加载数据
	Zcell6.GetSheet(0).LoadArrData([]);
	var table = document.getElementById("tabl1");
//	var len = table.rows.length; 
//    for(var i = 0;i < len;i++){
//        table.rows[i].cells[0].style.display="none";
//        table.rows[i].cells[0].textContent="";
//    }
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		 table.rows[0].cells[i].textContent=i;
	}
	
	// 设置列宽
	setConversionColWidth(Zcell6,0,
			[8.38,5.5,8.88,10,10,10,10,10,10,10,1.13,8.88,10,10,10,10,10,10,5,5,5,5,0.23,0.23,0.23]);
	var colsWidthArr = [8.38,5.5,8.88,10,10,10,10,10,10,10,1.13,8.88,10,10,10,10,10,10,5,5,5,5,0.23,0.23,0.23];
	// 设置行高
	for (var i = 1; i <= 56; i++) {
		if (i==1) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(15)*rowHeight);
		}else if (i==2) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(14.25)*rowHeight);
		}else if (i==3) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(30)*rowHeight);
		}else if (i>=4&&i<=46) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(14.25)*rowHeight);
		}
	}
	//合并单元格
	Zcell6.GetSheet(0).MergeCells(3,3,3,4);
	Zcell6.GetSheet(0).SetCellType(3,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	Zcell6.GetSheet(0).MergeCells(4,3,10,3);
	Zcell6.GetSheet(0).SetCellValue(4,3,"气  温（℃）/架线百米弧垂f(100)（m）");
	Zcell6.GetSheet(0).MergeCells(12,3,12,4);
	Zcell6.GetSheet(0).SetCellType(12,3,{
        "code": "object",
        "object":"代表<br>档距<br>（m）"
    });
	
	Zcell6.GetSheet(0).MergeCells(13,3,20,3);
	Zcell6.GetSheet(0).SetCellValue(13,3,"气  温（℃）/架线百米弧垂f(100)（m）");
	Zcell6.GetSheet(0).MergeCells(3,48,6,48);
	Zcell6.GetSheet(0).SetCellType(3,48,{
        "code": "object",
        "object":"架线弧垂表使用说明："
    });
	Zcell6.GetSheet(0).MergeCells(3,49,6,49);
	Zcell6.GetSheet(0).SetCellType(3,49,{
        "code": "object",
        "object":"1、观测弧垂计算公式："
    });
	Zcell6.GetSheet(0).MergeCells(3,50,6,50);
	Zcell6.GetSheet(0).SetCellType(3,50,{
        "code": "object",
        "object":"f=(f(100)L2)/(10000cosB)"
    });
	Zcell6.GetSheet(0).MergeCells(3,51,6,51);
	Zcell6.GetSheet(0).SetCellType(3,51,{
        "code": "object",
        "object":"f(100)--观测档所处耐张段代表档距"
    });
	Zcell6.GetSheet(0).MergeCells(3,52,6,52);
	Zcell6.GetSheet(0).SetCellType(3,52,{
        "code": "object",
        "object":"的百米弧垂(m)"
    });
	Zcell6.GetSheet(0).MergeCells(3,53,6,53);
	Zcell6.GetSheet(0).SetCellType(3,53,{
        "code": "object",
        "object":"L--观测档档距(m)"
    });
	Zcell6.GetSheet(0).MergeCells(3,54,6,54);
	Zcell6.GetSheet(0).SetCellType(3,54,{
        "code": "object",
        "object":"B--高差角 B=tg-1(h/L)"
    });
	Zcell6.GetSheet(0).MergeCells(3,55,6,55);
	Zcell6.GetSheet(0).SetCellType(3,55,{
        "code": "object",
        "object":"h--观测档电线悬挂点高差(m)"
    });

	Zcell6.GetSheet(0).MergeCells(8,49,12,49);
	Zcell6.GetSheet(0).SetCellType(8,49,{
        "code": "object",
        "object":" 2、本架线弧垂表已经按照降温-25℃考虑了导线 "
    });
	Zcell6.GetSheet(0).MergeCells(8,50,12,50);
	Zcell6.GetSheet(0).SetCellType(8,50,{
        "code": "object",
        "object":"初伸长，观测时可按实际气温查相应弧垂表。"
    });
	Zcell6.GetSheet(0).MergeCells(8,51,12,51);
	Zcell6.GetSheet(0).SetCellType(8,51,{
        "code": "object",
        "object":"若实际气温与弧垂可用插入法求其弧垂值。"
    });
	
	Zcell6.GetSheet(0).MergeCells(13,50,16,51);
	Zcell6.GetSheet(0).MergeCells(13,52,13,52);
	Zcell6.GetSheet(0).SetCellType(13,52,{
	"code": "object",
	"object":"批准"
	});
	Zcell6.GetSheet(0).MergeCells(13,53,13,54);
	Zcell6.GetSheet(0).SetCellType(13,53,{
        "code": "object",
        "object":"审核"
    });
	Zcell6.GetSheet(0).MergeCells(13,55,13,55);
	Zcell6.GetSheet(0).SetCellType(13,55,{
        "code": "object",
        "object":"校核"
    });
	
	Zcell6.GetSheet(0).MergeCells(15,52,15,52);
	Zcell6.GetSheet(0).SetCellType(15,52,{
        "code": "object",
        "object":"设计"
    });
	Zcell6.GetSheet(0).MergeCells(15,53,15,53);
	Zcell6.GetSheet(0).SetCellType(15,53,{
		"code": "object",
		"object":"CAD制图"
	});
	Zcell6.GetSheet(0).MergeCells(15,54,15,54);
	Zcell6.GetSheet(0).SetCellType(15,54,{
        "code": "object",
        "object":"比例"
    });
	Zcell6.GetSheet(0).MergeCells(15,55,15,55);
	Zcell6.GetSheet(0).SetCellType(15,55,{
        "code": "object",
        "object":"日期"
    });
	Zcell6.GetSheet(0).MergeCells(17,50,19,51);
	for (var i = 4; i <= 45; i++) {
		Zcell6.GetSheet(0).MergeCells(19,i,20,i);
	}
	Zcell6.GetSheet(0).MergeCells(17,52,21,54);
	Zcell6.GetSheet(0).SetCellType(17,52,{
        "code": "object",
        "object":"/"
    });
	Zcell6.GetSheet(0).MergeCells(21,50,21,51);
	Zcell6.GetSheet(0).SetCellType(21,50,{
		"code": "object",
		"object":"施工图"
	});
	Zcell6.GetSheet(0).MergeCells(22,50,22,51);
	Zcell6.GetSheet(0).SetCellType(22,50,{
        "code": "object",
        "object":"设计<br>阶段"
    });
	Zcell6.GetSheet(0).MergeCells(18,55,20,55);
	Zcell6.GetSheet(0).MergeCells(21,55,21,55);
	Zcell6.GetSheet(0).SetCellType(21,55,{
        "code": "object",
        "object":"图纸级别"
    });
	Zcell6.GetSheet(0).SetCellType(17,55,{
		"code": "object",
		"object":"图号"
	});
	Zcell6.GetSheet(0).SetCellType(22,55,{
		"code": "object",
		"object":"3"
	});

//	// 单元格赋值
	setCellType(Zcell6,0,
			[[4,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4]],
			["-20","-10","0","10","20","30","40"]);
	setCellType(Zcell6,0,
			[[13,4],[14,4],[15,4],[16,4],[17,4],[18,4],[19,4]],
			["-20","-10","0","10","20","30","40"]);
	for (var i = 3; i <= 46; i++) {
		for (var j = 3; j <= 10; j++) {
			Zcell6.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 3; i <= 45; i++) {
		for (var j = 12; j <= 20; j++) {
			Zcell6.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 50; i <= 55; i++) {
		for (var j = 13; j <= 22; j++) {
			Zcell6.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}

	for (var i = 2; i <= 22; i++) {
		Zcell6.GetSheet(0).SetCellStyle(i, 2, {
			"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell6.GetSheet(0).SetCellStyle(i, 55, {
			"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	for (var i = 2; i <= 55; i++) {
		Zcell6.GetSheet(0).SetCellStyle(2, i, {
			"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell6.GetSheet(0).SetCellStyle(22, i, {
			"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	//背景图片
	Zcell6.GetSheet(0).SetCellType(13, 50,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/hdLogo.png' width='"+
		UnitConversion.mmConversionPx(82)+"' height='"+
		UnitConversion.mmConversionPx(10)+"'/>"
	});
}

var deleteRow1Col1 = function(tableObj){
	for(let i = 0;i < tableObj.rows.length;i++){
		let  height = tableObj.rows[i].childNodes[0].style.height;
		tableObj.rows[i].childNodes[1].style.height = height;
		tableObj.rows[i].deleteCell(0);
	}
	var row1 = tableObj.rows[0].childNodes;
	for (let i = 0; i < row1.length; i++) {
		let width = row1[i].style.width;
		tableObj.rows[1].childNodes[i].style.width = width;
	}
	tableObj.deleteRow(0); 
}
