function groundProperty() {
	// 初始化数据
	this.initData();
	//下拉框监听事件
	this.selectListener();
}
/**
 * 下拉框监听
 */
groundProperty.prototype.selectListener = function() {
	// 地线型号下拉框
	$("#g_wireType").on("change",function(){
	    let type = $(this).children('option:selected').val();
	    $("#g_wireType_val").html(type);
	    for (var i = 0; i < Wirelist.length; i++) {
			if (type==Wirelist[i].conductor_type) {
				setCellValue(Zcell3,0,
						[[14,4],[14,5],[14,6],[14,7],[14,8],[14,9]],
						[Wirelist[i].modulus_elasticity,parseFloat(Wirelist[i].tem_exp_coefficient).toExponential(2),Wirelist[i].unit_weight,
							Wirelist[i].diameter,Wirelist[i].cross_section_area,Wirelist[i].breaking_force]);
			}
		}
	});
	// 是否与导线配合计算
	$(".concatConductor").on("change",function(){
	    let selectedVal = $(this).children('option:selected').val();
	    if (selectedVal==="是") {
	    	for (var i = 11; i <= 15; i++) {
	    		for (var j = 19; j <= 22; j++) {
	    			Zcell3.GetSheet(0).SetCellStyle(i, j, {
	    				"border" : "0.5px solid black"
	    			});
	    		}
	    	}
	    	setCellValue(Zcell3,0,[[11,20],[11,21],[11,22],[13,20],[13,21],[13,22],[15,20],[15,21],[15,22]],
	    			['导地线水平距离','导地线垂直距离','控制档距','m','m','m','0.6','4','506.080']);
		}else{
			for (let i = 11; i <= 15; i++) {
				for (let j = 19; j <= 22; j++) {
					let border = j==22?0:0.5;
	    			Zcell3.GetSheet(0).SetCellStyle(i, j, {
	    				"border" : ""+border+"px solid black"
	    			});
	    		}
	    	}
			Zcell3.GetSheet(0).SetCellStyle(15, 20, {"background-color" : "#FFFF00"});
			Zcell3.GetSheet(0).SetCellStyle(15, 21, {"background-color" : "#FFFF00"});
			setCellValue(Zcell3,0,[[11,20],[11,21],[11,22],[13,20],[13,21],[13,22],[15,20],[15,21],[15,22]],
					['最大平均运行张力','设计安全系数','','/','/','',maxTension,securityCoefficient,'']);
		}
	});
}

groundProperty.prototype.initData = function() {
	var url= basePath + 'mechanicsProperty/getInitData.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": "",
		"async" : false,
		"success":function(data){
			if (!Tools.isEmpty(data)) {
				initGroundParam(data.entryContition.baseParam1[0],data.entryContition.weatherConditions1,data.entryContition.steps1[0]);
			}
		},
		"error": function(e) {
			layer.msg("服务器出错");
			console.info(e);
		}
	});
}

//	初始化地线参数
var initGroundParam = function(baseParam,weatherCondition,steps){
	/*下拉框生成*/
	multipleGerateSelect(Zcell3,0,[[2,23],[2,24],[2,25],[2,26],[2,27],[2,28],[13,16],[13,17]],
			['g_calculation','g_calculation','g_calculation','g_calculation','g_calculation','g_calculation','concatConductor','CGSpan'],
				[['√','×'],['√','×'],['√','×'],['√','×'],['√','×'],['√','×'],['是','否'],['S≥0.012L+1','S≥0.015L+1']]);
	/*基本条件*/
	var wireSelect = '<a id="g_wireType_val" class="Alabel"></a><select id="g_wireType" style="background-color:#92D050;text-align-last:center;width:98%;">';
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
	Zcell3.GetSheet(0).SetCellType(5, 4, {
	    "code": "object",
	    "object":wireSelect
	});
	$("#g_wireType_val").html(baseParam.wireType);	//	地线型号
	this.maxTension = baseParam.maxTension;//	最大平均运行张力
	this.securityCoefficient = baseParam.securityCoefficient;//	设计安全系数
	Zcell3.GetSheet(0).SetCellValue(5,5,baseParam.stringingCooling);//	架线初伸长降温
	Zcell3.GetSheet(0).SetCellValue(5,6,baseParam.windLoadCalcHeight);//	风荷载计算高度
	Zcell3.GetSheet(0).SetCellValue(5,7,baseParam.windLoadRefeHeight);//	风荷载基准高度  
	Zcell3.GetSheet(0).SetCellValue(5,8,baseParam.terrainRoughness);//	地形粗糙度类别
	/*导线参数*/
	Zcell3.GetSheet(0).SetCellValue(14,4,conductorCondition.modulus_elasticity);//	弹性系数
	Zcell3.GetSheet(0).SetCellValue(14,5,conductorCondition.tem_exp_coefficient);//	线膨胀系数
	Zcell3.GetSheet(0).SetCellValue(14,6,conductorCondition.unit_weight);//	单位长度重量
	Zcell3.GetSheet(0).SetCellValue(14,7,conductorCondition.diameter);//	外径
	Zcell3.GetSheet(0).SetCellValue(14,8,conductorCondition.cross_section_area);//	计算截面
	Zcell3.GetSheet(0).SetCellValue(14,9,conductorCondition.breaking_force);//	拉断力
	/*气象条件*/
	for (var i = 0; i < weatherCondition.length; i++) {
		Zcell3.GetSheet(0).SetCellValue(2,i+14,weatherCondition[i].isCalculation==true?"√":"×");//	参与计算
		Zcell3.GetSheet(0).SetCellValue(3,i+14,weatherCondition[i].workingConditionNo);//	工况序号
		Zcell3.GetSheet(0).SetCellValue(4,i+14,weatherCondition[i].workingConditionName);//	工况名称
		Zcell3.GetSheet(0).SetCellValue(5,i+14,weatherCondition[i].temperature);//	温度℃
		Zcell3.GetSheet(0).SetCellValue(6,i+14,weatherCondition[i].windSpeed);//	风速m/s
		Zcell3.GetSheet(0).SetCellValue(7,i+14,weatherCondition[i].iceThickness);//	冰厚mm
		Zcell3.GetSheet(0).SetCellValue(8,i+14,weatherCondition[i].isWindSpeedConversion==true?"√":"×");//	风速折算
		Zcell3.GetSheet(0).SetCellValue(9,i+14,weatherCondition[i].remarks);//	备注
		if (i>=9) {
			$(".g_calculation").eq(i-9).val(weatherCondition[i].isCalculation+"");
			$(".g_windConversion").eq(i-9).val(weatherCondition[i].isWindSpeedConversion+"");
			var _thisCalc = Zcell3.GetSheet(0).GetCell(2, i+14).childNodes[1];
			_thisCalc.previousSibling.innerHTML  = weatherCondition[i].isCalculation;
//			var _thisConv = Zcell3.GetSheet(0).GetCell(8, i+14).childNodes[1];
//			_thisConv.previousSibling.innerHTML  = weatherCondition[i].isWindSpeedConversion;
		}
	}
	/*计算代表档距范围和步长*/
	Zcell3.GetSheet(0).SetCellValue(13,12,steps.spanStart);
	Zcell3.GetSheet(0).SetCellValue(13,13,steps.steps);
	/*控制因素*/
	$(".concatConductor").eq(0).val('是');
	$(".CGSpan").eq(0).val('S≥0.012L+1');
	for (var i = 11; i <= 15; i++) {
		for (var j = 19; j <= 22; j++) {
			Zcell3.GetSheet(0).SetCellStyle(i, j, {
				"border" : "0.5px solid black"
			});
		}
	}
	setCellValue(Zcell3,0,[[11,20],[11,21],[11,22],[13,20],[13,21],[13,22],[15,20],[15,21],[15,22]],
			['导地线水平距离','导地线垂直距离','控制档距','m','m','m','0.6','4','506.080']);
	
}


groundProperty.prototype.initWirePropertyCellData = function(data) {
	var horizontalTensions = data.horizontalTensions;	//	水平张力
	var meterSag100 = data.meterSag100;	//	百米弧垂
	var sags = data.sags;	//	弧垂
	for (var j = 0; j < horizontalTensions.length; j++) {
		if (j<=41) {
			//	水平张力数据
			Zcell2.GetSheet(0).SetCellValue(4, j+5, (horizontalTensions[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell2.GetSheet(0).SetCellValue(5, j+5, (horizontalTensions[j].minTemperature).toFixed());	//	最低气温
			Zcell2.GetSheet(0).SetCellValue(6, j+5, (horizontalTensions[j].avgTemperature).toFixed());	//	平均气温
			Zcell2.GetSheet(0).SetCellValue(7, j+5, (horizontalTensions[j].maxWind).toFixed());		//	最大风
			Zcell2.GetSheet(0).SetCellValue(8, j+5, (horizontalTensions[j].icing).toFixed());		//	覆冰
			Zcell2.GetSheet(0).SetCellValue(9, j+5, (horizontalTensions[j].maxTemperature).toFixed());	//	最高气温
			Zcell2.GetSheet(0).SetCellValue(10, j+5, (horizontalTensions[j].installV).toFixed());	//	安装
			Zcell2.GetSheet(0).SetCellValue(11, j+5, (horizontalTensions[j].abroadNoWind).toFixed());	//	外过(无风)
			Zcell2.GetSheet(0).SetCellValue(12, j+5, (horizontalTensions[j].abroadWind).toFixed());	//	外过(有风)
			Zcell2.GetSheet(0).SetCellValue(13, j+5, (horizontalTensions[j].internalOvervoltage).toFixed());	// 内过电压
//		Zcell2.GetSheet(0).SetCellValue(14, j, horizontalTensions[j].second5Wind);	//	5m/s风速
			//	弧垂数据
			Zcell2.GetSheet(0).SetCellValue(26, j+5, (sags[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell2.GetSheet(0).SetCellValue(27, j+5, (sags[j].icing).toFixed(2));	//	覆冰
			Zcell2.GetSheet(0).SetCellValue(28, j+5, (sags[j].maxTemperature).toFixed(2));	//	最高气温
			Zcell2.GetSheet(0).SetCellValue(29, j+5, (sags[j].abroadNoWind).toFixed(2));		//	外过(无风)
			//	百米弧垂数据
			Zcell4.GetSheet(0).SetCellValue(3, j+5, (meterSag100[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell4.GetSheet(0).SetCellValue(4, j+5, (meterSag100[j].t20A).toFixed(4));	//	-20
			Zcell4.GetSheet(0).SetCellValue(5, j+5, (meterSag100[j].t10A).toFixed(4));	//	-10
			Zcell4.GetSheet(0).SetCellValue(6, j+5, (meterSag100[j].t0).toFixed(4));	//	0
			Zcell4.GetSheet(0).SetCellValue(7, j+5, (meterSag100[j].t10B).toFixed(4));	//	10
			Zcell4.GetSheet(0).SetCellValue(8, j+5, (meterSag100[j].t20B).toFixed(4));	//	20
			Zcell4.GetSheet(0).SetCellValue(9, j+5, (meterSag100[j].t30B).toFixed(4));	//	30
			Zcell4.GetSheet(0).SetCellValue(10,j+5, (meterSag100[j].t40B).toFixed(4));	//	40
			
		}else{
			//	水平张力数据
			Zcell2.GetSheet(0).SetCellValue(15, j-37, (horizontalTensions[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell2.GetSheet(0).SetCellValue(16, j-37, (horizontalTensions[j].minTemperature).toFixed());	//	最低气温
			Zcell2.GetSheet(0).SetCellValue(17, j-37, (horizontalTensions[j].avgTemperature).toFixed());	//	平均气温
			Zcell2.GetSheet(0).SetCellValue(18, j-37, (horizontalTensions[j].maxWind).toFixed());		//	最大风
			Zcell2.GetSheet(0).SetCellValue(19, j-37, (horizontalTensions[j].icing).toFixed());		//	覆冰
			Zcell2.GetSheet(0).SetCellValue(20, j-37, (horizontalTensions[j].maxTemperature).toFixed());	//	最高气温
			Zcell2.GetSheet(0).SetCellValue(21, j-37, (horizontalTensions[j].installV).toFixed());	//	安装
			Zcell2.GetSheet(0).SetCellValue(22, j-37, (horizontalTensions[j].abroadNoWind).toFixed());	//外过(无风)
			Zcell2.GetSheet(0).SetCellValue(23, j-37, (horizontalTensions[j].abroadWind).toFixed());	//外过(有风)
			Zcell2.GetSheet(0).SetCellValue(24, j-37, (horizontalTensions[j].internalOvervoltage).toFixed());	// 内过电压
//		Zcell2.GetSheet(0).SetCellValue(14, j-36, horizontalTensions[j].second5Wind);	//	5m/s风速
			//	弧垂数据
			Zcell2.GetSheet(0).SetCellValue(31, j-37, (sags[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell2.GetSheet(0).SetCellValue(32, j-37, (sags[j].icing).toFixed(1));	//	覆冰
			Zcell2.GetSheet(0).SetCellValue(33, j-37, (sags[j].maxTemperature).toFixed(1));	//	最高气温
			Zcell2.GetSheet(0).SetCellValue(34, j-37, (sags[j].abroadNoWind).toFixed(1));		//	外过(无风)
//			百米弧垂数据
			Zcell4.GetSheet(0).SetCellValue(12, j-37, (meterSag100[j].representativeSpan).toFixed(1));	//	代表档距
			Zcell4.GetSheet(0).SetCellValue(13, j-37, (meterSag100[j].t20A).toFixed(4));	//	-20
			Zcell4.GetSheet(0).SetCellValue(14, j-37, (meterSag100[j].t10A).toFixed(4));	//	-10
			Zcell4.GetSheet(0).SetCellValue(15, j-37, (meterSag100[j].t0).toFixed(4));		//	0
			Zcell4.GetSheet(0).SetCellValue(16, j-37, (meterSag100[j].t10B).toFixed(4));	//	10
			Zcell4.GetSheet(0).SetCellValue(17, j-37, (meterSag100[j].t20B).toFixed(4));	//	20
			Zcell4.GetSheet(0).SetCellValue(18, j-37, (meterSag100[j].t30B).toFixed(4));	//	30
			Zcell4.GetSheet(0).SetCellValue(19, j-37, (meterSag100[j].t40B).toFixed(4));	//	40
		}
	}
}

