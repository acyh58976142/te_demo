/*孤立档架线弧垂表*/
var Zcell1 = null;
/*目录*/
var Zcell2 = null;
/*孤立档配置与计算*/
var Zcell3 = null;
/*连续档配置*/
var Zcell4 = null;
/*孤立档气象条件*/
var Zcell5 = null;
/*修改目录*/
var Zcell6 = null;

/*套图信息表*/
var Zcell7 = null;


/*气象条件组合名称*/
const weatherConditionName = ["组合1(2510)","组合2(2710)","组合3(2505)","组合4(2910)","组合5(2510)"];
const weatherConditionColor = ["#E26B0A","#B1A0C7","#00B0F0","#00B050","#808080"];
function wiringDrawing() {
	// 初始化表格
	this.initCellTableData();
	//	计算按钮
	$('#calcBtn').on("click",function() {
		wiringDrawing.executeIsolatedSpan();
	})
	//	查询按钮
	$('#searchBtn').on("click",function() {
		wiringDrawing.searchProjectDetail();
	})
	//	生成按钮
	$('#setDrawing').on("click",function() {
		wiringDrawing.setDrawingDetail();
	})
	
	//	连续档配置 查询按钮
	$('#searchBtnContinuity').on("click",function() {
		wiringDrawing.searchContinuityWireway();
	})
	// 初始化工程列表下拉框
	this.initProjectData();
	
	//	选中事件
	$(document).delegate(".checkIsolated","click",this.checkIsolated);
	
	//  初始化高宽
	this.initWidthAndHeight();
	
}

/**
 * 初始化高宽
 */
wiringDrawing.prototype.initWidthAndHeight = function(){
	let height = $(window).height();
	let tableHeight = height - $("#myTab").height() -27 + "px";
	$("#isolatedConfigContainer").css({"height":tableHeight,"min-height":tableHeight});
	$("#wiringDrawingContainer").css({"height":tableHeight,"min-height":tableHeight});
}
/**
 * 连续档配置data
 */
wiringDrawing.prototype.continutyConfig = function(){
	
}
wiringDrawing.prototype.initCellTableData = function(){
	infoCellTable();
	changeCellTable();
	sagCellTable();
	indexCellTable();
	
	weatherCellTable();
	
	configCellTable();	
	defaultCellTable(24);	
	cellAddEventListener();
	
}


/**
 * 计算导地线数据
 */
wiringDrawing.prototype.executeIsolatedSpan = function() {
	layer.load(2);
	var param = wiringDrawing.getWirePropertyParam();
	var url= basePath + 'wiringDrawing/executeIsolatedSpan.action';
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
				wiringDrawing.initWiringDrawingCellData(data,param.sortNo);
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
 * 获取输入参数条件
 */
wiringDrawing.prototype.getWirePropertyParam = function() {
	var inputConditionDataArr = [];	//	输入参数组合
	var weatherConditions = [];	//	选中气象条件组合
	let sortNo = [];	//	数据排序
	/*孤立档配置*/
	for (let i = 5; i < 64; i++) {
		let fs_TowerNumber = Zcell3.GetSheet(0).GetCellValue(2,i);// 前侧塔号
		let bs_TowerNumber = Zcell3.GetSheet(0).GetCellValue(3,i);// 后侧塔号
		let span = Zcell3.GetSheet(0).GetCellValue(4,i);// 档距
		let heightDifference 		= Zcell3.GetSheet(0).GetCellValue(6,i);// 挂线点高差
		if (Tools.isEmpty(fs_TowerNumber)||Tools.isEmpty(bs_TowerNumber)||Tools.isEmpty(span)||Tools.isEmpty(heightDifference)) {
			continue;
		}
		let lineType = 0;//电线类型  -  0-导线   1-地线
		let splittingNumber;// 分裂数	
		let ths_Horizontal = Zcell3.GetSheet(0).GetCellValue(11,i);//塔头间距 水平(m)
		let _ths_Horizontal = Zcell3.GetSheet(0).GetCellValue(11,3);//默认塔头间距 水平(m)
		let ths_Horizontal_ = Tools.isEmpty(ths_Horizontal)?_ths_Horizontal:ths_Horizontal;
		
		let ths_Vertical = Zcell3.GetSheet(0).GetCellValue(12,i);//塔头间距 垂直(m)
		let _ths_Vertical = Zcell3.GetSheet(0).GetCellValue(12,3);//默认塔头间距 垂直(m)
		let ths_Vertical_ = Tools.isEmpty(ths_Vertical)?_ths_Vertical:ths_Vertical;

		let altitudeHeight = Zcell3.GetSheet(0).GetCell(34, i).childNodes[1].previousSibling.innerHTML;//基准高度
		let _altitudeHeight = Zcell3.GetSheet(0).GetCell(34, 3).childNodes[1].previousSibling.innerHTML;//默认基准高度
		let altitudeHeight_ = Tools.isEmpty(altitudeHeight)?_altitudeHeight:altitudeHeight;
		let terrainRoughness = Zcell3.GetSheet(0).GetCell(35, i).childNodes[1].previousSibling.innerHTML;//地形粗糙度类别
		let _terrainRoughness = Zcell3.GetSheet(0).GetCell(35, 3).childNodes[1].previousSibling.innerHTML;//默认地形粗糙度类别
		let terrainRoughness_ = Tools.isEmpty(terrainRoughness)?_terrainRoughness:terrainRoughness;
		
		let wireType 				= Zcell3.GetSheet(0).GetCell(7, i).childNodes[1].previousSibling.innerHTML;// 电线型号
		
		let thisWeather = Zcell3.GetSheet(0).GetCell(10, i).childNodes[1].previousSibling.innerHTML;//气象条件组合
		let _thisWeather = Zcell3.GetSheet(0).GetCell(10, 3).childNodes[1].previousSibling.innerHTML;//默认气象条件组合
		let thisWeather_ = Tools.isEmpty(thisWeather)?_thisWeather:thisWeather;
		let weatherConditions_type	= thisWeather_.substring(0,3);//气象条件组合 -- 类型 
		let weatherConditions_name	= thisWeather_.substring(4,8);//气象条件组合 -- 名称
		
		let fs_SLength				= Zcell3.GetSheet(0).GetCellValue(13,i);// 前侧串长
		let fs_SWeight				= Zcell3.GetSheet(0).GetCellValue(14,i);// 前侧串重
		let fs_LinkingNumber		= Zcell3.GetSheet(0).GetCellValue(15,i);// 前侧 联数
		let fs_ECNumber				= Zcell3.GetSheet(0).GetCellValue(16,i);// 前侧 每联片数
		let fs_WindArea				= Zcell3.GetSheet(0).GetCellValue(17,i);// 前侧 每片受风面积
		let fs_HeavyIce				= Zcell3.GetSheet(0).GetCellValue(18,i);// 前侧 每片覆冰重
		let fs_IcingFittings		= Zcell3.GetSheet(0).GetCellValue(19,i);// 前侧 金具覆冰
		
		let bs_SLength				= Zcell3.GetSheet(0).GetCellValue(20,i);// 后侧	串长
		let bs_SWeight				= Zcell3.GetSheet(0).GetCellValue(21,i);// 后侧	串重
		let bs_LinkingNumber		= Zcell3.GetSheet(0).GetCellValue(22,i);// 后侧	联数
		let bs_ECNumber				= Zcell3.GetSheet(0).GetCellValue(23,i);// 后侧	每联片数
		let bs_WindArea				= Zcell3.GetSheet(0).GetCellValue(24,i);// 后侧	每片受风面积
		let bs_HeavyIce				= Zcell3.GetSheet(0).GetCellValue(25,i);// 后侧	每片覆冰重
		let bs_IcingFittings		= Zcell3.GetSheet(0).GetCellValue(26,i);// 后侧	金具覆冰
		
		let oT_Tension				= Zcell3.GetSheet(0).GetCellValue(27,i);//过牵引	 过牵引允许张力
		let oT_length				= Zcell3.GetSheet(0).GetCellValue(28,i);//过牵引	 过牵引长度
		let oT_temperature			= Zcell3.GetSheet(0).GetCellValue(29,i);//过牵引	 过牵引气温
		                              
		let safety_Factor			= Zcell3.GetSheet(0).GetCellValue(30,i);//安全系数
		let ave_Tension				= Zcell3.GetSheet(0).GetCellValue(31,i);//平均运行张力百分比
		let initialElongationCooling= Zcell3.GetSheet(0).GetCellValue(32,i);//初伸长降温
		let calculatedHeight		= Zcell3.GetSheet(0).GetCellValue(33,i);//计算高度
		
		let wireType_,splittingNumber_;
		let fs_SLength_ ,fs_SWeight_,fs_LinkingNumber_,fs_ECNumber_,fs_WindArea_,fs_HeavyIce_,fs_IcingFittings_;
		let bs_SLength_	,bs_SWeight_,bs_LinkingNumber_,bs_ECNumber_,bs_WindArea_,bs_HeavyIce_,bs_IcingFittings_;
		let oT_Tension_,oT_length_,oT_temperature_;
		let safety_Factor_,ave_Tension_,initialElongationCooling_,calculatedHeight_;
		
		if ((i-2)%3==0) {
			let defalutWT = Zcell3.GetSheet(0).GetCell(7, 3).childNodes[1].previousSibling.innerHTML;	// 默认导线型号
			wireType_ = Tools.isEmpty(wireType)?defalutWT:wireType;
			splittingNumber = Zcell3.GetSheet(0).GetCell(9, i).childNodes[1].previousSibling.innerHTML;// 分裂数	
			let _splittingNumber = Zcell3.GetSheet(0).GetCellValue(9, 3);// 默认导线分裂数	
			splittingNumber_ = Tools.isEmpty(splittingNumber)?_splittingNumber:splittingNumber;
			
			let _fs_SLength				= Zcell3.GetSheet(0).GetCellValue(13,3);// 默认前侧串长
			fs_SLength_ = Tools.isEmpty(fs_SLength)?_fs_SLength:fs_SLength;
			let _fs_SWeight				= Zcell3.GetSheet(0).GetCellValue(14,3);// 默认前侧串重
			fs_SWeight_ = Tools.isEmpty(fs_SWeight)?_fs_SWeight:fs_SWeight;
			let _fs_LinkingNumber		= Zcell3.GetSheet(0).GetCellValue(15,3);// 默认前侧 联数
			fs_LinkingNumber_ = Tools.isEmpty(fs_LinkingNumber)?_fs_LinkingNumber:fs_LinkingNumber;
			let _fs_ECNumber				= Zcell3.GetSheet(0).GetCellValue(16,3);// 默认前侧 每联片数
			fs_ECNumber_ = Tools.isEmpty(fs_ECNumber)?_fs_ECNumber:fs_ECNumber;
			let _fs_WindArea				= Zcell3.GetSheet(0).GetCellValue(17,3);// 默认前侧 每片受风面积
			fs_WindArea_ = Tools.isEmpty(fs_WindArea)?_fs_WindArea:fs_WindArea;
			let _fs_HeavyIce				= Zcell3.GetSheet(0).GetCellValue(18,3);// 默认前侧 每片覆冰重
			fs_HeavyIce_ = Tools.isEmpty(fs_HeavyIce)?_fs_HeavyIce:fs_HeavyIce;
			let _fs_IcingFittings		= Zcell3.GetSheet(0).GetCellValue(19,3);// 默认前侧 金具覆冰
			fs_IcingFittings_ = Tools.isEmpty(fs_IcingFittings)?_fs_IcingFittings:fs_IcingFittings;
			
			let _bs_SLength				= Zcell3.GetSheet(0).GetCellValue(20,3);// 默认后侧 串长
			bs_SLength_ = Tools.isEmpty(bs_SLength)?_bs_SLength:bs_SLength;
			let _bs_SWeight				= Zcell3.GetSheet(0).GetCellValue(21,3);// 默认后侧 串重
			bs_SWeight_ = Tools.isEmpty(bs_SWeight)?_bs_SWeight:bs_SWeight;
			let _bs_LinkingNumber		= Zcell3.GetSheet(0).GetCellValue(22,3);// 默认后侧 联数
			bs_LinkingNumber_ = Tools.isEmpty(bs_LinkingNumber)?_bs_LinkingNumber:bs_LinkingNumber;
			let _bs_ECNumber				= Zcell3.GetSheet(0).GetCellValue(23,3);// 默认后侧 每联片数
			bs_ECNumber_ = Tools.isEmpty(bs_ECNumber)?_bs_ECNumber:bs_ECNumber;
			let _bs_WindArea				= Zcell3.GetSheet(0).GetCellValue(24,3);// 默认后侧 每片受风面积
			bs_WindArea_ = Tools.isEmpty(bs_WindArea)?_bs_WindArea:bs_WindArea;
			let _bs_HeavyIce				= Zcell3.GetSheet(0).GetCellValue(25,3);// 默认后侧 每片覆冰重
			bs_HeavyIce_ = Tools.isEmpty(bs_HeavyIce)?_bs_HeavyIce:bs_HeavyIce;
			let _bs_IcingFittings		= Zcell3.GetSheet(0).GetCellValue(26,3);// 默认后侧 金具覆冰
			bs_IcingFittings_ = Tools.isEmpty(bs_IcingFittings)?_bs_IcingFittings:bs_IcingFittings;
			
			let _oT_Tension				= Zcell3.GetSheet(0).GetCellValue(27,3);//默认过牵引	 过牵引允许张力
			oT_Tension_ = Tools.isEmpty(oT_Tension)?_oT_Tension:oT_Tension;
			let _oT_length				= Zcell3.GetSheet(0).GetCellValue(28,3);//默认过牵引	 过牵引长度
			oT_length_ = Tools.isEmpty(oT_length)?_oT_length:oT_length;
			let _oT_temperature			= Zcell3.GetSheet(0).GetCellValue(29,3);//默认过牵引	 过牵引气温
			oT_temperature_ = Tools.isEmpty(oT_temperature)?_oT_temperature:oT_temperature;
			                                                                
			let _safety_Factor			= Zcell3.GetSheet(0).GetCellValue(30,3);//默认安全系数
			safety_Factor_ = Tools.isEmpty(safety_Factor)?_safety_Factor:safety_Factor;
			let _ave_Tension				= Zcell3.GetSheet(0).GetCellValue(31,3);//默认平均运行张力百分比
			ave_Tension_ = Tools.isEmpty(ave_Tension)?_ave_Tension:ave_Tension;
			let _initialElongationCooling= Zcell3.GetSheet(0).GetCellValue(32,3);//默认初伸长降温
			initialElongationCooling_ = Tools.isEmpty(initialElongationCooling)?_initialElongationCooling:initialElongationCooling;
			let _calculatedHeight		= Zcell3.GetSheet(0).GetCellValue(33,3);//默认计算高度
			calculatedHeight_ = Tools.isEmpty(calculatedHeight)?_calculatedHeight:calculatedHeight;
			
			
		}else{
			lineType = 1;	//	电线类型  -  0-导线   1-地线
			let defalutGT = Zcell3.GetSheet(0).GetCell(7, 4).childNodes[1].previousSibling.innerHTML;	// 默认地线型号
			wireType_ = Tools.isEmpty(wireType)?defalutGT:wireType;
			splittingNumber = Zcell3.GetSheet(0).GetCellValue(9, i);// 分裂数	
			let _splittingNumber = Zcell3.GetSheet(0).GetCellValue(9, 4);// 默认导线分裂数	
			splittingNumber_ = Tools.isEmpty(splittingNumber)?_splittingNumber:splittingNumber;
			
			let _fs_SLength				= Zcell3.GetSheet(0).GetCellValue(13,4);// 默认前侧串长
			fs_SLength_ = Tools.isEmpty(fs_SLength)?_fs_SLength:fs_SLength;
			let _fs_SWeight				= Zcell3.GetSheet(0).GetCellValue(14,4);// 默认前侧串重
			fs_SWeight_ = Tools.isEmpty(fs_SWeight)?_fs_SWeight:fs_SWeight;
			let _fs_LinkingNumber		= Zcell3.GetSheet(0).GetCellValue(15,4);// 默认前侧 联数
			fs_LinkingNumber_ = Tools.isEmpty(fs_LinkingNumber)?_fs_LinkingNumber:fs_LinkingNumber;
			let _fs_ECNumber				= Zcell3.GetSheet(0).GetCellValue(16,4);// 默认前侧 每联片数
			fs_ECNumber_ = Tools.isEmpty(fs_ECNumber)?_fs_ECNumber:fs_ECNumber;
			let _fs_WindArea				= Zcell3.GetSheet(0).GetCellValue(17,4);// 默认前侧 每片受风面积
			fs_WindArea_ = Tools.isEmpty(fs_WindArea)?_fs_WindArea:fs_WindArea;
			let _fs_HeavyIce				= Zcell3.GetSheet(0).GetCellValue(18,4);// 默认前侧 每片覆冰重
			fs_HeavyIce_ = Tools.isEmpty(fs_HeavyIce)?_fs_HeavyIce:fs_HeavyIce;
			let _fs_IcingFittings		= Zcell3.GetSheet(0).GetCellValue(19,4);// 默认前侧 金具覆冰
			fs_IcingFittings_ = Tools.isEmpty(fs_IcingFittings)?_fs_IcingFittings:fs_IcingFittings;
			
			let _bs_SLength				= Zcell3.GetSheet(0).GetCellValue(20,4);// 默认后侧 串长
			bs_SLength_ = Tools.isEmpty(bs_SLength)?_bs_SLength:bs_SLength;
			let _bs_SWeight				= Zcell3.GetSheet(0).GetCellValue(21,4);// 默认后侧 串重
			bs_SWeight_ = Tools.isEmpty(bs_SWeight)?_bs_SWeight:bs_SWeight;
			let _bs_LinkingNumber		= Zcell3.GetSheet(0).GetCellValue(22,4);// 默认后侧 联数
			bs_LinkingNumber_ = Tools.isEmpty(bs_LinkingNumber)?_bs_LinkingNumber:bs_LinkingNumber;
			let _bs_ECNumber				= Zcell3.GetSheet(0).GetCellValue(23,4);// 默认后侧 每联片数
			bs_ECNumber_ = Tools.isEmpty(bs_ECNumber)?_bs_ECNumber:bs_ECNumber;
			let _bs_WindArea				= Zcell3.GetSheet(0).GetCellValue(24,4);// 默认后侧 每片受风面积
			bs_WindArea_ = Tools.isEmpty(bs_WindArea)?_bs_WindArea:bs_WindArea;
			let _bs_HeavyIce				= Zcell3.GetSheet(0).GetCellValue(25,4);// 默认后侧 每片覆冰重
			bs_HeavyIce_ = Tools.isEmpty(bs_HeavyIce)?_bs_HeavyIce:bs_HeavyIce;
			let _bs_IcingFittings		= Zcell3.GetSheet(0).GetCellValue(26,4);// 默认后侧 金具覆冰
			bs_IcingFittings_ = Tools.isEmpty(bs_IcingFittings)?_bs_IcingFittings:bs_IcingFittings;
			
			let _oT_Tension				= Zcell3.GetSheet(0).GetCellValue(27,4);//默认过牵引	 过牵引允许张力
			oT_Tension_ = Tools.isEmpty(oT_Tension)?_oT_Tension:oT_Tension;
			let _oT_length				= Zcell3.GetSheet(0).GetCellValue(28,4);//默认过牵引	 过牵引长度
			oT_length_ = Tools.isEmpty(oT_length)?_oT_length:oT_length;
			let _oT_temperature			= Zcell3.GetSheet(0).GetCellValue(29,4);//默认过牵引	 过牵引气温
			oT_temperature_ = Tools.isEmpty(oT_temperature)?_oT_temperature:oT_temperature;
			                                                                
			let _safety_Factor			= Zcell3.GetSheet(0).GetCellValue(30,4);//默认安全系数
			safety_Factor_ = Tools.isEmpty(safety_Factor)?_safety_Factor:safety_Factor;
			let _ave_Tension				= Zcell3.GetSheet(0).GetCellValue(31,4);//默认平均运行张力百分比
			ave_Tension_ = Tools.isEmpty(ave_Tension)?_ave_Tension:ave_Tension;
			let _initialElongationCooling= Zcell3.GetSheet(0).GetCellValue(32,4);//默认初伸长降温
			initialElongationCooling_ = Tools.isEmpty(initialElongationCooling)?_initialElongationCooling:initialElongationCooling;
			let _calculatedHeight		= Zcell3.GetSheet(0).GetCellValue(33,4);//默认计算高度
			calculatedHeight_ = Tools.isEmpty(calculatedHeight)?_calculatedHeight:calculatedHeight;
			
		}
		var dataMap = {"fs_TowerNumber":fs_TowerNumber,"bs_TowerNumber":bs_TowerNumber,"span":span,"lineType":lineType,
				"heightDifference":heightDifference,"wireType":wireType_,"splittingNumber":splittingNumber_,"fs_SLength":fs_SLength_,
				"fs_SWeight":fs_SWeight_,"fs_LinkingNumber":fs_LinkingNumber_,"fs_ECNumber":fs_ECNumber_,"fs_WindArea":fs_WindArea_,
				"fs_HeavyIce":fs_HeavyIce_,"fs_IcingFittings":fs_IcingFittings_,"bs_SLength":bs_SLength_,"bs_SWeight":bs_SWeight_,
				"bs_LinkingNumber":bs_LinkingNumber_,"bs_ECNumber":bs_ECNumber_,"bs_WindArea":bs_WindArea_,"bs_HeavyIce":bs_HeavyIce_,
				"bs_IcingFittings":bs_IcingFittings_,"weatherConditions_type":weatherConditions_type,"weatherConditions_name":weatherConditions_name,
				"oT_Tension":oT_Tension_,"oT_length":oT_length_,"oT_temperature":oT_temperature_,"safety_Factor":safety_Factor_,"ave_Tension":ave_Tension_,
				"initialElongationCooling":initialElongationCooling_,"calculatedHeight":calculatedHeight_,"altitudeHeight":altitudeHeight_,
				"terrainRoughness":terrainRoughness_,"ths_Horizontal":ths_Horizontal_,"ths_Vertical":ths_Vertical_};	
		
		/*气象条件*/
		let weatherCondition = [];
		if (null!==weatherConditions_type||""!==weatherConditions_type||undefined!==weatherConditions_type) {
			let type = weatherConditions_type.substring(2,3);
			let range = switchData(type,['1','2','3','4','5'],[[1,8,3,17],[1,8,21,35],[1,8,39,53],[1,8,57,71],[1,8,75,89]]);
			for (let k = range[2]; k <= range[3]; k++) {
				var isCalculation = Zcell5.GetSheet(0).GetCellValue(1,k)=="√"?1:0;
				var workingConditionNo = Zcell5.GetSheet(0).GetCellValue(2,k);
				var workingConditionName = Zcell5.GetSheet(0).GetCellValue(3,k);
				var temperature = Zcell5.GetSheet(0).GetCellValue(4,k);
				var windSpeed = Zcell5.GetSheet(0).GetCellValue(5,k);
				var iceThickness = Zcell5.GetSheet(0).GetCellValue(6,k);
				var isWindSpeedConversion = Zcell5.GetSheet(0).GetCellValue(7,k)=="√"?1:0;
				var remarks = Zcell5.GetSheet(0).GetCellValue(8,k);
				if (k>= range[3]-5) {
					var _thisCalc = Zcell5.GetSheet(0).GetCell(1, k).childNodes[1];
					isCalculation =  _thisCalc.previousSibling.innerHTML=="true"?1:0;
					var _thisConv = Zcell5.GetSheet(0).GetCell(7, k).childNodes[1];
					isWindSpeedConversion =  _thisConv.previousSibling.innerHTML=="true"?1:0;
				}
				weatherCondition.push({"combinationName":weatherConditions_name,"participationCalculation":isCalculation,"workingNumber":workingConditionNo,
					"workingName":workingConditionName,"temperature":temperature,"windSpeed":windSpeed,
					"iceThickness":iceThickness,"windSpeedConversion":isWindSpeedConversion,"remarks":remarks});
			}
		}
		inputConditionDataArr.push(dataMap);
		weatherConditions.push(weatherCondition);
		sortNo.push(i);
		sortNo.push(i);
	}
	var param = {"inputConditionData":inputConditionDataArr,"weatherConditions":weatherConditions,"sortNo":sortNo};
	return param;
}
/**
 * 生成计算结果
 */
wiringDrawing.prototype.initWiringDrawingCellData = function(data,sortNo) {
	var isolatedSags = data.ostArray;	//	孤立档架线弧垂
	var tempnum = 0;
	for (var j = 0; j < isolatedSags.length; j++) {
		if(j==0)
		 {
			tempnum=1;
		 }else if(j%2 ==1)
		 {
			 tempnum+=1;
		 }
		
		let sort = sortNo[j] +tempnum;
		
		
		
		
		if (j<=65) {
			//	孤立档架线弧垂
			Zcell1.GetSheet(0).SetCellValue(3, sort, isolatedSags[j].lsolatedFileName);	//	孤立档名称
			Zcell1.GetSheet(0).SetCellValue(4, sort, isolatedSags[j].span);	//	档距(m)
			Zcell1.GetSheet(0).SetCellValue(5, sort, isolatedSags[j].wireModel);	//	电线型号
			Zcell1.GetSheet(0).SetCellValue(6, sort, Tools.isEmpty(isolatedSags[j].wireModel)?"":"竣工");	//	架线气温
			Zcell1.GetSheet(0).SetCellValue(7, sort, isolatedSags[j].nT20);	//	-20
			Zcell1.GetSheet(0).SetCellValue(8, sort, isolatedSags[j].nT10);	//	-10
			Zcell1.GetSheet(0).SetCellValue(9, sort, isolatedSags[j].pT0);	//	0
			Zcell1.GetSheet(0).SetCellValue(10, sort, isolatedSags[j].pT10);	//	10
			Zcell1.GetSheet(0).SetCellValue(11, sort, isolatedSags[j].pT20);	//	20
			Zcell1.GetSheet(0).SetCellValue(12, sort, isolatedSags[j].pT30);	//	30
			Zcell1.GetSheet(0).SetCellValue(13, sort, isolatedSags[j].pT40);	//	40
			Zcell1.GetSheet(0).SetCellValue(14, sort, isolatedSags[j].lowerTemperature);	//	初伸长降温值(℃)
			Zcell1.GetSheet(0).SetCellValue(15, sort, isolatedSags[j].overTraction);	//	过牵引最大允许值(m)
			
		}else{
			//	孤立档架线弧垂
			Zcell1.GetSheet(0).SetCellValue(3, sort, isolatedSags[j].lsolatedFileName);	//	孤立档名称
			Zcell1.GetSheet(0).SetCellValue(4, sort, isolatedSags[j].span);	//	档距(m)
			Zcell1.GetSheet(0).SetCellValue(5, sort, isolatedSags[j].wireModel);	//	电线型号
			Zcell1.GetSheet(0).SetCellValue(6, sort, Tools.isEmpty(isolatedSags[j].wireModel)?"":"竣工");	//	架线气温
			Zcell1.GetSheet(0).SetCellValue(7, sort, (isolatedSags[j].nT20).toFixed(3));	//	-20
			Zcell1.GetSheet(0).SetCellValue(8, sort, (isolatedSags[j].nT10).toFixed(3));	//	-10
			Zcell1.GetSheet(0).SetCellValue(9, sort, (isolatedSags[j].pT0).toFixed(3));	//	0
			Zcell1.GetSheet(0).SetCellValue(10, sort, (isolatedSags[j].pT10).toFixed(3));	//	10
			Zcell1.GetSheet(0).SetCellValue(11, sort, (isolatedSags[j].pT20).toFixed(3));	//	20
			Zcell1.GetSheet(0).SetCellValue(12, sort, (isolatedSags[j].pT30).toFixed(3));	//	30
			Zcell1.GetSheet(0).SetCellValue(13, sort, (isolatedSags[j].pT40).toFixed(3));	//	40
			Zcell1.GetSheet(0).SetCellValue(14, sort, isolatedSags[j].lowerTemperature);	//	初伸长降温值(℃)
			Zcell1.GetSheet(0).SetCellValue(15, sort, (isolatedSags[j].overTraction).toFixed(2));	//	过牵引最大允许值(m)
		}
	}
}

/**
 * 孤立档气象条件
 */
var weatherCellTable = function(){
	/*EXCEL行高比 : 1磅≈0.35mm*/
	const rowHeight = 0.35;
	const colWidth = 2.27; // 列宽比
	// 创建JSCELL，指明承载容器
	Zcell5 = new ZCell(document.getElementById("isolatedWeatherContainer"));
	// 创建表，并指定列，行数
	Zcell5.InserSheet(0, 11, 89);
	// 加载数据
	Zcell5.GetSheet(0).LoadArrData([]);
	// 设置列宽
	for (var i = 1; i <= 11; i++) {
		Zcell5.GetSheet(0).SetColWidth(i,UnitConversion.mmConversionPx(8.38) * colWidth);
	}
	// 设置行高
	Zcell5.GetSheet(0).SetRowHeight(1, UnitConversion.mmConversionPx(48)*rowHeight);
	Zcell5.GetSheet(0).SetRowHeight(19, UnitConversion.mmConversionPx(48)*rowHeight);
	Zcell5.GetSheet(0).SetRowHeight(37, UnitConversion.mmConversionPx(48)*rowHeight);
	Zcell5.GetSheet(0).SetRowHeight(55, UnitConversion.mmConversionPx(48)*rowHeight);
	Zcell5.GetSheet(0).SetRowHeight(73, UnitConversion.mmConversionPx(48)*rowHeight);
	//	合并单元格并赋值
	mergeCellAndSetType(Zcell5, 0, [[1,1,8,1],[1,19,8,19],[1,37,8,37],[1,55,8,55],[1,73,8,73]],weatherConditionName);
	//	样式
	setCellBackGroudColor(Zcell5,0,1,8,1,1,weatherConditionColor[0]);
	setCellBackGroudColor(Zcell5,0,1,8,19,19,weatherConditionColor[1]);
	setCellBackGroudColor(Zcell5,0,1,8,37,37,weatherConditionColor[2]);
	setCellBackGroudColor(Zcell5,0,1,8,55,55,weatherConditionColor[3]);
	setCellBackGroudColor(Zcell5,0,1,8,73,73,weatherConditionColor[4]);
	//	加载模版
	weatherConditionTemplate(Zcell5,1,8, 2 ,17);
	weatherConditionTemplate(Zcell5,1,8, 20 ,35);
	weatherConditionTemplate(Zcell5,1,8, 38 ,53);
	weatherConditionTemplate(Zcell5,1,8, 56 ,71);
	weatherConditionTemplate(Zcell5,1,8, 74 ,89);
}

/**
 * 连续档配置
 */
var defaultCellTable = function(rows){
	//	导线型号
	const conductorType = ['JL/G1A-240/30','JL/G1A-240/40','JL/G1A-300/25','JL/G1A-300/40','JL/G1A-400/35','JL/G1A-630/45'];
	//	地线型号
	const groundType = ['LB40-100','JLB40-120','JLB40-150','GJ-80','GJ-100','JLB20A-100','JLB20A-120'];
	/*EXCEL行高比 : 1磅≈0.35mm*/
	const rowHeight = 0.35;

	
	//架线初伸长降温	
	const stringingCooling = -25;
	//风荷载计算高度
	const calculatedHeightWind =15;
	//风荷载基准高度
	const datumHeightWind =  10;
	//地形粗糙度类别
	const terrainRoughness = 'B';
//	let towerId = $("#mainInfo1").find("option:selected").attr("tower_id");
//	alert(towerId);
	// 创建JSCELL，指明承载容器
	Zcell4 = new ZCell(document.getElementById("isolatedDefaultContainer"));
	// 创建表，并指定列，行数
	Zcell4.InserSheet(0, 12, rows);
	// 加载数据
	Zcell4.GetSheet(0).LoadArrData([]);
	// 设置列宽
	setConversionColWidth(Zcell4,0,
			[6,19,12,12,12,19,12,17,17,17,20,20]);
	var num = (rows-4)/2  ;
	//	合并单元格并赋值  "地形粗糙度类别"
	mergeCellAndSetType(Zcell4, 0, [[1,1,1,num+2],[1,num+2+1,1,rows],[3,1,3,2],[3,num+2+1,3,num+2+2],[4,1,4,2],[4,num+2+1,4,num+2+2],[5,1,5,2],[5,num+2+1,5,num+2+2],[6,1,6,2],
		[6,num+2+1,6,num+2+2],[7,1,7,2],[7,num+2+1,7,num+2+2],[8,1,8,2],[8,num+2+1,8,num+2+2],[9,1,9,2],[9,num+2+1,9,num+2+2],[11,1,12,1],[11,2,11,2],[12,2,12,2],[11,num+2+1,12,num+2+1],[11,num+2+2,11,num+2+2],[12,num+2+2,12,num+2+2],[10,1,10,2],
		[2,1,2,2],[2,num+2+1,2,num+2+2]],
			["连<br>续<br>档<br>导<br>线","连<br>续<br>档<br>地<br>线","导线型号","地线型号","气象条件","气象条件","安全系数","与导线<br>配合计算","最大平均运行张力",
				"安全<br>系数","架线<br>初伸长降温"  ,"配合导线", "风荷载计算高度" ,"配合导线<br>安全系数","风荷载基准高度" ,"导地线间距","查看被套图纸","力学特性表","架线曲线表","查看被套图纸","力学特性表","架线曲线表","地形粗糙度类别","连续档","连续档"]);
	//	下拉框生成
	let colAndRowArr = [];
	let classNameArr = [];
	let valueArr = [];
	/**for (var i = 3; i <= 12; i++) {
		//	导线型号
		colAndRowArr.push([2,i]);
		classNameArr.push('conductor_type');
		valueArr.push(conductorType);
		//	导线气象条件
		colAndRowArr.push([3,i]);
		classNameArr.push('weather_condition');
		valueArr.push(["2510","2710","3110","2910","3115"]);
		//	导线安全系数
		colAndRowArr.push([4,i]);
		classNameArr.push('safety_factor');
		valueArr.push(["2.5","8.0"]);
		//架线初伸长降温
		colAndRowArr.push([5,i]);
		classNameArr.push('stringingCooling');
		valueArr.push(["-25"]);
		//风荷载计算高度
		colAndRowArr.push([6,i]);
		classNameArr.push('calculated_Height_Wind');
		valueArr.push(["15"]);
		
		//风荷载基准高度
		colAndRowArr.push([7,i]);
		classNameArr.push('datum_Height_Wind');
		valueArr.push(["10"]);
		
		//地形粗糙度类别
		colAndRowArr.push([8,i]);
		classNameArr.push('terrain_Roughness');
		valueArr.push(["A","B","C","D"]);
		
		//	地线型号
		colAndRowArr.push([2,i+12]);
		classNameArr.push('conductor_type');
		valueArr.push(groundType);
		//	地线气象条件
		colAndRowArr.push([3,i+12]);
		classNameArr.push('weather_condition');
		valueArr.push(["2510","2710","3110","2910","3115"]);
		//	与导线配合计算
		colAndRowArr.push([4,i+12]);
		classNameArr.push('contact_conductor_compute');
		valueArr.push(["是","否"]);
		//	地线安全系数
		colAndRowArr.push([5,i+12]);
		classNameArr.push('safety_factor');
		valueArr.push(["10"]);
		//	配合导线
		colAndRowArr.push([6,i+12]);
		classNameArr.push('contact_conductor');
		valueArr.push(conductorType);
		//	配合导线安全系数
		colAndRowArr.push([7,i+12]);
		classNameArr.push('contact_safety_factor');
		valueArr.push(["2.5","8.0"]);
		//	导地线间距
		colAndRowArr.push([8,i+12]);
		classNameArr.push('contact_distance');
		valueArr.push(["H=0.5;V=3.0","H=1.0;V=4.5"]);
	}
	
	multipleGerateSelect(Zcell4,0,colAndRowArr,classNameArr,valueArr);**/
	//	样式
	setCellBorder(Zcell4, 0, 1,12, 1 ,rows);
}

/**
 * 孤立档配置与计算
 */
var configCellTable = function(){
	/*EXCEL行高比 : 1磅≈0.35mm*/
	const rowHeight = 0.35;
	// 创建JSCELL，指明承载容器
	Zcell3 = new ZCell(document.getElementById("isolatedConfigContainer"));
	// 创建表，并指定列，行数
	Zcell3.InserSheet(0, 35, 65);
	// 加载数据
	Zcell3.GetSheet(0).LoadArrData([]);
	//	临时数据
	var mapArr = [];
	var falseArr = [1,5,7,8,9,10,34,35];
	for (var i = 1; i <= 35; i++) {
		if (falseArr.includes(i)) {
			continue;
		}
		mapArr.push([i,5]);
	}
	//setCellValue(Zcell3,0,mapArr,
		//["A2","A3","10","1","1","4.5","2.3","116","2","10","0.03","2","2","2.3"
		//	,"116","2","10","0.03","2","2","1000","0.1","-10","2.5","25%","-25","15"]);
	// 设置列宽
	setConversionColWidth(Zcell3,0,
			[2.63,8,8,8,8,8,8 ,8,8,8,8,8,8 ,8,8,8,8,8,8 ,8,8,8,8,8,8 ,6,6,6,6,6 ,6,6,6,6,6]);
	// 设置行高
	Zcell3.GetSheet(0).SetRowHeight(2, UnitConversion.mmConversionPx(33.75)*rowHeight);
	Zcell3.GetSheet(0).SetRowHeight(3, UnitConversion.mmConversionPx(21)*rowHeight);
	Zcell3.GetSheet(0).SetRowHeight(4, UnitConversion.mmConversionPx(21)*rowHeight);
	//	合并单元格并赋值
	var count = 1;
	for (var j = 5; j <= 64; j++) {
		//	电线型号
		Zcell3.GetSheet(0).MergeCells(7,j,8,j);
		if ((j-2)%3==0) {
			Zcell3.GetSheet(0).MergeCells(1,j,1,j+2);
			Zcell3.GetSheet(0).SetCellValue(1,j,count++);
			//	前侧塔号
			Zcell3.GetSheet(0).MergeCells(2,j,2,j+2);
			//	后侧塔号
			Zcell3.GetSheet(0).MergeCells(3,j,3,j+2);
			//	档距
			Zcell3.GetSheet(0).MergeCells(4,j,4,j+2);
			//	电线类型
			Zcell3.GetSheet(0).MergeCells(5,j+1,5,j+2);
			Zcell3.GetSheet(0).SetCellValue(5,j,"导线");
			Zcell3.GetSheet(0).SetCellValue(5,j+1,"地线");
			//	气象条件组合
			Zcell3.GetSheet(0).MergeCells(10,j,10,j+2);
			//	塔头间距
			Zcell3.GetSheet(0).MergeCells(11,j,11,j+2);
			Zcell3.GetSheet(0).MergeCells(12,j,12,j+2);
			//	基准高度
			Zcell3.GetSheet(0).MergeCells(34,j,34,j+2);
			//	地形粗糙度类别
			Zcell3.GetSheet(0).MergeCells(35,j,35,j+2);
		}
		if ((count+1)%2==0) {
			setCellBackGroudColor(Zcell3,0,2,4,j,j,"#8DB4E2");
			//	挂线点高差
			setCellBackGroudColor(Zcell3,0,6,6,j,j,"#8DB4E2");
			//	塔头间距
			setCellBackGroudColor(Zcell3,0,11,11,j,j,"#8DB4E2");
			setCellBackGroudColor(Zcell3,0,12,12,j,j,"#8DB4E2");
			//	前侧串参数
			setCellBackGroudColor(Zcell3,0,13,19,j,j,"#2D69B1");
			//	后侧串参数
			setCellBackGroudColor(Zcell3,0,20,26,j,j,"#8DB4E2");
			//	过牵引条件
			setCellBackGroudColor(Zcell3,0,27,29,j,j,"#2D69B1");
			//	安全系数...平均运行张力...
			setCellBackGroudColor(Zcell3,0,30,33,j,j,"#8DB4E2");
		}else{
			setCellBackGroudColor(Zcell3,0,2,4,j,j,"#FFFF00");
			//	挂线点高差
			setCellBackGroudColor(Zcell3,0,6,6,j,j,"#FFFF00");
			//	塔头间距
			setCellBackGroudColor(Zcell3,0,11,11,j,j,"#FFFF00");
			setCellBackGroudColor(Zcell3,0,12,12,j,j,"#FFFF00");
			//	前侧串参数
			setCellBackGroudColor(Zcell3,0,13,19,j,j,"#928F00");
			//	后侧串参数
			setCellBackGroudColor(Zcell3,0,20,26,j,j,"#FFFF00");
			//	过牵引条件
			setCellBackGroudColor(Zcell3,0,27,29,j,j,"#928F00");
			//	安全系数...平均运行张力...
			setCellBackGroudColor(Zcell3,0,30,33,j,j,"#FFFF00");
		}
	}
	Zcell3.GetSheet(0).MergeCells(7,j,8,j);
	mergeCellAndSetType(Zcell3, 0, [[1,1,1,2],[2,1,2,2],[3,1,3,2],[4,1,4,2],[5,1,5,2],[6,1,6,2],
		[7,1,9,1],[7,2,8,2],[9,2,9,2],[10,1,10,2],[11,1,12,1],[11,2,11,2],[12,2,12,2],[13,1,19,1],[20,1,26,1],
			[27,1,29,1],[30,1,30,2],[31,1,31,2],[32,1,32,2],[33,1,35,1],[1,3,5,4],
				[6,3,6,3],[6,4,6,4]],
			["序<br>号","前侧<br>塔号","后侧<br>塔号","档距","电线<br>类型","挂线点<br>高差",
				"电线输入条件","电线型号","分裂数","气象条<br>件组合","塔头间距","水平(m)","垂直(m)","前侧串参数","后侧串参数",
					"过牵引条件","安全<br>系数","平均<br>运行<br>张力<br>百分比","架线<br>初伸<br>长降<br>温(℃)","风荷载折算条件","默认值",
						"导线","地线"]);
	setCellType(Zcell3,0,[[13,2],[14,2],[15,2],[16,2],[17,2],[18,2],[19,2],[20,2],[21,2],[22,2],[23,2],[24,2],[25,2],[26,2],
			[27,2],[28,2],[29,2],[33,2],[34,2],[35,2]],
			["串长(m)","串重<br>(kg)","联数","每联<br>片数","每片受风<br>面积(m2)","每片冰重<br>(kg)","金具<br>覆冰<br>(kg)",
				"串长(m)","串重<br>(kg)","联数","每联<br>片数","每片受风<br>面积(m2)","每片冰重<br>(kg)","金具<br>覆冰<br>(kg)",
					"允许<br>张力<br>(N)","允许<br>长度<br>(m)","气温<br>(℃)","计算<br>高度<br>(m)","基准<br>高度","地形<br>粗糙度"]);
	mergeCellAndSetValue(Zcell3,0,[[11,3,11,4],[12,3,12,4],[29,3,29,4],[31,3,31,4],[33,3,33,4],[34,3,34,4],[35,3,35,4],[7,3,8,3],[7,4,8,4],[10,3,10,4]],
			["1","4.5","-10","25%","15","","","","",""]);
	setCellValue(Zcell3,0,[[9,3],[9,4],[13,3],[13,4],[14,3],[14,4],[15,3],[15,4],[16,3],[16,4],[17,3],[17,4],[18,3],[18,4],[19,3],[19,4],
			[20,3],[20,4],[21,3],[21,4],[22,3],[22,4],[23,3],[23,4],[24,3],[24,4],[25,3],[25,4],[26,3],[26,4],[27,3],[27,4],[28,3],[28,4],
				[30,3],[30,4],[32,3],[32,4]],
			["1","1","2.3","0.3","116","4.6","2","1","10","1","0.03","0.03","2","2","2","1",
				"2.3","0.3","116","4.6","2","1","10","1","0.03","0.03","2","2","2","1","导线Tp/k","地线配合","0.1","0.1",
					"2.5","2.5","-25","-10"]);
	
	//	下拉框生成
	var count = 1;
	let colAndRowArr = [];
	let classNameArr = [];
	let valueArr = [];
	let conductorParam = getConductorParam();
	for (var i = 5; i <= 64; i++) {
		//	导线型号
		colAndRowArr.push([7,i]);
		classNameArr.push('conductor_type');
		valueArr.push(conductorParam);
		if ((i-2)%3==0) {
			//	分裂数
			colAndRowArr.push([9,i]);
			classNameArr.push('mitotic_count');
			valueArr.push(['1','2','4']);
			//	气象条件组合
			colAndRowArr.push([10,i]);
			classNameArr.push('isolated_weather_condition');
			valueArr.push(weatherConditionName);
			//	基准高度
			colAndRowArr.push([34,i]);
			classNameArr.push('altitude_height');
			valueArr.push(['10','15']);
			//	地形粗糙度
			colAndRowArr.push([35,i]);
			classNameArr.push('terrain_roughness');
			valueArr.push(['A','B','C','D']);
		}
	}
	multipleGerateSelect(Zcell3,0,colAndRowArr,classNameArr,valueArr);
	multipleGerateSelect(Zcell3,0,[[7,3],[7,4],[10,3],[34,3],[35,3]],
			['defalutCondutor','defalutGround','isolated_weather_condition defaultWeather','defaultAltitude altitude_height','defalutRoughness terrain_roughness'],
			[conductorParam,conductorParam,weatherConditionName,['10','15'],['A','B','C','D']],
			['JL/G1A-150/20','GJ-35','组合1(2510)','10','B'],"#E6B8B7");
	$(".defaultWeather").eq(0).css("backgroundColor","#E26B0A")
	$(".altitude_height").each(function(i,obj){
		obj.style.lineHeight = "100%";
		obj.style.whiteSpace = "normal";
		obj.style.height = "100%";
	});
	$(".terrain_roughness").each(function(i,obj){
		obj.style.lineHeight = "100%";
		obj.style.whiteSpace = "normal";
		obj.style.height = "100%";
	});
	
	$(".isolated_weather_condition").each(function(i,obj){
		obj.style.lineHeight = "100%";
		obj.style.whiteSpace = "normal";
		obj.style.height = "100%";
		obj.addEventListener("change", function() {
			let index = obj.selectedIndex-1;
			obj.style.backgroundColor = weatherConditionColor[index];
			obj.parentNode.style.backgroundColor = weatherConditionColor[index];
		}, false)
	});
	//	样式
	setCellBorder(Zcell3, 0, 1,35, 1 ,64);
	setCellBackGroudColor(Zcell3,0,1,35,1,2,"#BFBFBF");
	setCellBackGroudColor(Zcell3,0,1,35,3,4,"#E6B8B7");
	
}
/**
 * 孤立档架线弧垂表
 */
var sagCellTable = function(){
	/*EXCEL行高比 : 1磅≈0.35mm*/
	const rowHeight = 0.35;
	// 创建JSCELL，指明承载容器
	Zcell1 = new ZCell(document.getElementById("wiringDrawingContainer"));
	// 创建表，并指定列，行数
	Zcell1.InserSheet(0, 36, 74);
	// 加载数据
	Zcell1.GetSheet(0).LoadArrData([]);
	
	// 设置列宽
	setConversionColWidth(Zcell1,0,
			[12.75,1,10,8,13,7,5,5,5,5,5,5,5,5.5,5.5,0.77,10,8,13,7,5,5,5,5,5,5,5,5.5,5.5,
				5.38,7,4.25,7.13,5,1.38,1.38]);
	var colsWidthArr = [12.75,1,10,8,13,7,5,5,5,5,5,5,5,5.5,5.5,0.77,10,8,13,7,5,5,5,5,5,5,5,5.5,5.5,
		5.38,7,4.25,7.13,5,1.38,1.38];
	// 设置行高
	for (var i = 1; i <= 75; i++) {
		if (i==1) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(15)*rowHeight);
		}else if (i==2) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(1)*rowHeight);
		}else if (i==3) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(12)*rowHeight);
		}else if (i==4) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(22.5)*rowHeight);
		}else if (i==5) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(22.5)*rowHeight);
		}else if (i>=6&&i<=74) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(11.25)*rowHeight);
		}else if (i==75) {
			Zcell1.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(16.8)*rowHeight);
		}
	}
	//合并单元格
	Zcell1.GetSheet(0).MergeCells(3,3,13,3);
	Zcell1.GetSheet(0).SetCellType(3,3,{
        "code": "object",
        "object":"孤立档导地线架线弧垂表"
    });
	Zcell1.GetSheet(0).MergeCells(14,3,30,3);
	Zcell1.GetSheet(0).MergeCells(3,4,3,5);
	Zcell1.GetSheet(0).SetCellType(3,4,{
        "code": "object",
        "object":"孤立档名称"
    });
	Zcell1.GetSheet(0).MergeCells(4,4,4,5);
	Zcell1.GetSheet(0).SetCellType(4,4,{
        "code": "object",
        "object":"档距（m）"
    });
	Zcell1.GetSheet(0).MergeCells(5,4,5,5);
	Zcell1.GetSheet(0).SetCellType(5,4,{
        "code": "object",
        "object":"电线型号"
    });
	Zcell1.GetSheet(0).MergeCells(6,4,13,4);
	Zcell1.GetSheet(0).SetCellValue(6,4,"架线弧垂（m）");
	Zcell1.GetSheet(0).MergeCells(14,4,14,5);
	Zcell1.GetSheet(0).SetCellType(14,4,{
        "code": "object",
        "object":"初伸长<br>降温值<br>（℃）"
    });
	Zcell1.GetSheet(0).MergeCells(15,4,15,5);
	Zcell1.GetSheet(0).SetCellType(15,4,{
        "code": "object",
        "object":"过牵引<br>最大<br>允许值<br>（m）"
    });
	
	Zcell1.GetSheet(0).MergeCells(17,4,17,5);
	Zcell1.GetSheet(0).SetCellType(17,4,{
        "code": "object",
        "object":"孤立档名称"
    });
	Zcell1.GetSheet(0).MergeCells(18,4,18,5);
	Zcell1.GetSheet(0).SetCellType(18,4,{
        "code": "object",
        "object":"档距（m）"
    });
	Zcell1.GetSheet(0).MergeCells(19,4,20,5);
	Zcell1.GetSheet(0).SetCellType(19,4,{
        "code": "object",
        "object":"电线型号"
    });
	Zcell1.GetSheet(0).MergeCells(21,4,28,4);
	Zcell1.GetSheet(0).SetCellValue(21,4,"架线弧垂（m）");
	Zcell1.GetSheet(0).MergeCells(29,4,29,5);
	Zcell1.GetSheet(0).SetCellType(29,4,{
        "code": "object",
        "object":"初伸长<br>降温值<br>（℃）"
    });
	Zcell1.GetSheet(0).MergeCells(30,4,30,5);
	Zcell1.GetSheet(0).SetCellType(30,4,{
        "code": "object",
        "object":"过牵引<br>最大<br>允许值<br>（m）"
    });

	Zcell1.GetSheet(0).MergeCells(31,10,34,10);
	Zcell1.GetSheet(0).SetCellValue(31,10,"孤立档架线弧垂表说明：");
	Zcell1.GetSheet(0).MergeCells(31,11,34,11);
	Zcell1.GetSheet(0).SetCellValue(31,11,"1.本架线弧垂已按表中对应");
	Zcell1.GetSheet(0).MergeCells(31,12,34,12);
	Zcell1.GetSheet(0).SetCellValue(31,12,"降温值考虑了初伸长的影");
	Zcell1.GetSheet(0).MergeCells(31,13,34,13);
	Zcell1.GetSheet(0).SetCellValue(31,13,"响，观测时可按实际气温");
	Zcell1.GetSheet(0).MergeCells(31,14,34,14);
	Zcell1.GetSheet(0).SetCellValue(31,14,"查相应的弧垂值，若实际");
	Zcell1.GetSheet(0).MergeCells(31,15,34,15);
	Zcell1.GetSheet(0).SetCellValue(31,15,"气温与上表所列气温不符");
	Zcell1.GetSheet(0).MergeCells(31,16,34,16);
	Zcell1.GetSheet(0).SetCellValue(31,16,"时，可用插入法求得其弧");
	Zcell1.GetSheet(0).MergeCells(31,17,34,17);
	Zcell1.GetSheet(0).SetCellValue(31,17,"垂值。 ");
	Zcell1.GetSheet(0).MergeCells(31,18,34,18);
	Zcell1.GetSheet(0).SetCellValue(31,18,"2.架线施工时应对构架或相");
	Zcell1.GetSheet(0).MergeCells(31,19,34,19);
	Zcell1.GetSheet(0).SetCellValue(31,19,"应杆塔采取必要的安全措");
	Zcell1.GetSheet(0).MergeCells(31,20,34,20);
	Zcell1.GetSheet(0).SetCellValue(31,20,"施。 ");
	Zcell1.GetSheet(0).MergeCells(31,21,34,21);
	Zcell1.GetSheet(0).SetCellValue(31,21,"3.架线施工时的过牵引长度");
	Zcell1.GetSheet(0).MergeCells(31,22,34,22);
	Zcell1.GetSheet(0).SetCellValue(31,22,"应尽量减少，最大不得超");
	Zcell1.GetSheet(0).MergeCells(31,23,34,23);
	Zcell1.GetSheet(0).SetCellValue(31,23,"过表中过牵引最大允许值。");
	
	//图片
	Zcell1.GetSheet(0).MergeCells(31,26,34,30);
	Zcell1.GetSheet(0).SetCellType(31, 26,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/qianyin.png' width='"+
		UnitConversion.mmConversionPx(50)+"' height='"+
		UnitConversion.mmConversionPx(30)+"'/>"
	});
	
	Zcell1.GetSheet(0).MergeCells(31,33,34,37);
	Zcell1.GetSheet(0).SetCellType(31, 33,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/yinxiaxian.png' width='"+
		UnitConversion.mmConversionPx(50)+"' height='"+
		UnitConversion.mmConversionPx(30)+"'/>"
	});
	
	Zcell1.GetSheet(0).MergeCells(20,63,26,65);
	Zcell1.GetSheet(0).MergeCells(27,63,31,65);
	Zcell1.GetSheet(0).SetCellValue(27,63,"");
	Zcell1.GetSheet(0).MergeCells(32,63,32,65);
	Zcell1.GetSheet(0).SetCellValue(32,63,"工程");
	Zcell1.GetSheet(0).MergeCells(33,63,33,65);
	Zcell1.GetSheet(0).SetCellValue(33,63,"施工图");
	Zcell1.GetSheet(0).MergeCells(34,63,34,65);
	Zcell1.GetSheet(0).SetCellType(34,63,{
        "code": "object",
        "object":"设计<br>阶段"
    });
	Zcell1.GetSheet(0).MergeCells(27,66,34,71);
	Zcell1.GetSheet(0).SetCellType(27,66,{
		"code": "object",
		"object":"孤立档架线弧垂表"
	});
	Zcell1.GetSheet(0).MergeCells(27,72,28,73);
	Zcell1.GetSheet(0).SetCellValue(27,72,"图 号");
	Zcell1.GetSheet(0).MergeCells(29,72,32,73);
	Zcell1.GetSheet(0).SetCellValue(29,72,"S1325S-03");
	
	Zcell1.GetSheet(0).MergeCells(33,72,33,73);
	Zcell1.GetSheet(0).SetCellValue(33,72,"图纸级别");
	Zcell1.GetSheet(0).MergeCells(34,72,34,73);
	Zcell1.GetSheet(0).SetCellValue(34,72,"4");
	
	Zcell1.GetSheet(0).MergeCells(21,66,22,67);
	Zcell1.GetSheet(0).MergeCells(21,68,22,69);
	Zcell1.GetSheet(0).MergeCells(21,70,22,71);
	Zcell1.GetSheet(0).MergeCells(21,72,22,73);
	Zcell1.GetSheet(0).MergeCells(25,66,26,67);
	Zcell1.GetSheet(0).MergeCells(25,68,26,69);
	Zcell1.GetSheet(0).MergeCells(25,70,26,71);
	Zcell1.GetSheet(0).MergeCells(25,72,26,73);
	
	Zcell1.GetSheet(0).MergeCells(20,66,20,67);
	Zcell1.GetSheet(0).SetCellValue(20,66,"批 准");
	Zcell1.GetSheet(0).MergeCells(20,68,20,71);
	Zcell1.GetSheet(0).SetCellValue(20,68,"审 核");
	Zcell1.GetSheet(0).MergeCells(20,72,20,73);
	Zcell1.GetSheet(0).SetCellValue(20,72,"校 核");
	
	Zcell1.GetSheet(0).MergeCells(23,66,24,67);
	Zcell1.GetSheet(0).SetCellValue(23,66,"设 计");
	Zcell1.GetSheet(0).MergeCells(23,68,24,69);
	Zcell1.GetSheet(0).SetCellValue(23,68,"CAD制图");
	Zcell1.GetSheet(0).MergeCells(23,70,24,71);
	Zcell1.GetSheet(0).SetCellValue(23,70,"比 例");
	Zcell1.GetSheet(0).MergeCells(23,72,24,73);
	Zcell1.GetSheet(0).SetCellValue(23,72,"日 期");
	
	// 单元格赋值
	setCellType(Zcell1,0,
			[[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[12,5],[13,5]],
				["架线气温<br>（℃）","-20","-10","0","10","20","30","40"]);
	setCellType(Zcell1,0,
			[[21,5],[22,5],[23,5],[24,5],[25,5],[26,5],[27,5],[28,5]],
			["架线气温<br>（℃）","-20","-10","0","10","20","30","40"]);
	
	for(var j = 1;j<=70;j++){
		Zcell1.GetSheet(0).MergeCells(5,j*2+4,5,j*2+5);
		Zcell1.GetSheet(0).MergeCells(14,j*2+4,14,j*2+5);
		Zcell1.GetSheet(0).MergeCells(15,j*2+4,15,j*2+5);
		if((j*2+5)>70){
			break;
		}
	}
	for(var j = 1;j<=70;j++){
		Zcell1.GetSheet(0).MergeCells(3,j*6,3,j*6+5);
		Zcell1.GetSheet(0).MergeCells(4,j*6,4,j*6+5);
		if((j*6+5)>70){
			break;
		}
	}
	for(var j = 1;j<=58;j++){
		Zcell1.GetSheet(0).MergeCells(19,j*2+4,20,j*2+5);
		Zcell1.GetSheet(0).MergeCells(29,j*2+4,29,j*2+5);
		Zcell1.GetSheet(0).MergeCells(30,j*2+4,30,j*2+5);
		if((j*2+5)>58){
			break;
		}
	}
	for(var j = 1;j<=58;j++){
		Zcell1.GetSheet(0).MergeCells(17,j*6,17,j*6+5);
		Zcell1.GetSheet(0).MergeCells(18,j*6,18,j*6+5);
		if((j*6+5)>58){
			break;
		}
	}
	
	//	样式
	for (var i = 3; i <= 71; i++) {
		for (var j = 3; j <= 15; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 3; i <= 59; i++) {
		for (var j = 17; j <= 30; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 20; i <= 34; i++) {
		for (var j = 63; j <= 73; j++) {
			Zcell1.GetSheet(0).SetCellStyle(j, i, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 2; i <= 35; i++) {
		Zcell1.GetSheet(0).SetCellStyle(i, 2, {
			"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell1.GetSheet(0).SetCellStyle(i, 73, {
			"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	for (var i = 2; i <= 73; i++) {
		Zcell1.GetSheet(0).SetCellStyle(2, i, {
			"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell1.GetSheet(0).SetCellStyle(35, i, {
			"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	//背景图片
	Zcell1.GetSheet(0).SetCellType(20, 63,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/hdLogo.png' width='"+
		UnitConversion.mmConversionPx(82)+"' height='"+
		UnitConversion.mmConversionPx(10)+"'/>"
	});
}

/**
 * 目录
 */
var indexCellTable = function(){
	// 创建JSCELL，指明承载容器
	Zcell2 = new ZCell(document.getElementById("indexContainer"));
	// 创建表，并指定列，行数
	Zcell2.InserSheet(0, 26, 36);
	// 加载数据
	Zcell2.GetSheet(0).LoadArrData([]);
	// 设置列宽
	for (var i = 1; i <= 26; i++) {
		if (i==1) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(25));
		}else if (i>=3&&i<=8) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(45)/6);
		}else if (i>=9&&i<=18) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(7.5));
		}else if (i==2||i==19) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(10));
		}else if (i>=20&&i<=25) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(40)/6);
		}else if (i==26) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(5));
		}
	}
	// 设置行高
	for (var i = 1; i <= 36; i++) {
		Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(8));
		if (i==1) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(5.25));
		}else if (i==2) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(13.5));
		}else if (i==3) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(11));
		}else if (i==10) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(4));
		}else if (i==11) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(11));
		}else if (i==35) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(16));
		}else if (i==36) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(5.25));
		}
	}
	//合并单元格
	Zcell2.GetSheet(0).MergeCells(3,4,8,4);
	Zcell2.GetSheet(0).SetCellStyle(3, 4, {
		"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
		"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
		"border-bottom" :  "1px solid black",
	});
	Zcell2.GetSheet(0).MergeCells(3,5,8,5);
	Zcell2.GetSheet(0).SetCellStyle(3, 5, {
		"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
		"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
		"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	Zcell2.GetSheet(0).MergeCells(20,2,22,2);
	Zcell2.GetSheet(0).MergeCells(23,2,25,2);
	Zcell2.GetSheet(0).MergeCells(3,9,8,9);
	Zcell2.GetSheet(0).MergeCells(10,4,19,4);
	Zcell2.GetSheet(0).MergeCells(10,6,11,6);
	Zcell2.GetSheet(0).MergeCells(10,7,11,7);
	Zcell2.GetSheet(0).MergeCells(10,8,11,8);
	Zcell2.GetSheet(0).MergeCells(10,9,11,9);
	Zcell2.GetSheet(0).MergeCells(12,8,15,8);
	Zcell2.GetSheet(0).MergeCells(12,9,15,9);
	Zcell2.GetSheet(0).MergeCells(12,6,24,6);
	Zcell2.GetSheet(0).MergeCells(21,8,24,8);
	Zcell2.GetSheet(0).MergeCells(21,9,24,9);
	Zcell2.GetSheet(0).MergeCells(19,8,20,8);
	Zcell2.GetSheet(0).MergeCells(19,9,20,9);
	Zcell2.GetSheet(0).MergeCells(21,4,22,4);
	Zcell2.GetSheet(0).MergeCells(23,4,24,4);
	for (var i = 11; i < 36; i++) {
		Zcell2.GetSheet(0).MergeCells(3,i,8,i);
		Zcell2.GetSheet(0).MergeCells(9,i,18,i);
		Zcell2.GetSheet(0).MergeCells(20,i,25,i);
	}
	Zcell2.GetSheet(0).MergeCells(2,2,18,3);
	//	样式
	for (var i = 11; i < 36; i++) {
		setCellStyle(Zcell2,0,
				[[2,i],[3,i],[9,i],[19,i],[20,i]],
				{"border" : "1px solid black"});
	}
	for (var i = 1; i < 37; i++) {
		if (i<35) {
			Zcell2.GetSheet(0).SetCellStyle(2, i+1, {
				"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
			if (i<=10) {
				Zcell2.GetSheet(0).SetCellStyle(25, i+1, {
					"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
				});
			}else{
				Zcell2.GetSheet(0).SetCellStyle(20, i+1, {
					"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
				});
			}
		}
	}
	for (var i = 1; i < 27; i++) {
		if (i<25) {
			Zcell2.GetSheet(0).SetCellStyle(i+1, 2, {
				"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
			Zcell2.GetSheet(0).SetCellStyle(i+1, 35, {
				"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
			Zcell2.GetSheet(0).SetCellStyle(i+1, 10, {
				"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
		}
	}
	setCellStyle(Zcell2,0,
			[[10,4],[21,4],[10,4],[10, 5],[15, 5],[19,5],[23,5],[12,6],[12,7],[14,7],[19,7],[23,7],
				[12,8],[21,8],[12,9],[21,9]],
			{"border-bottom" : "1px solid black","font-size" : "12px"});
	setCellStyle(Zcell2,0,
			[[20,4],[23,4],[20,11],[24,5],[22,7]],
			{"font-size" : "12px"});
	// 单元格赋值
	Zcell2.GetSheet(0).SetCellType(3,5,{
        "code": "object",
        "object":"<div id= 'jcjsh'>341-S1325S-D0103</div>"
    })
	setCellValue(Zcell2,0,
			[[3,4],[20,2],[23,2],[3,9],[10,4],[20,4],[21,4],[23,4],[10,5],
				[11,5],[14,5],[15,5],[16,5],[18,5],[19,5],[20,5],[22,5],[23,5],[24,5],
					[10,6],[12,6],[10,7],[12,7],[13,7],[14,7],[15,7],[18,7],[19,7],[20,7],[22,7],[23,7],[24,7],
						[10,8],[12,8],[19,8],[21,8],[10,9],[12,9],[19,9],[21,9]],
				["  卷  册  检  索  号","第 1 页","共 1 页",getCurrentDate(3),"",
					"工程","施工图","设计阶段","电气","部分","第","3","卷","第","/","册","第","/","分册",
						"卷册名称","绝缘子金具串及组配件施工图","图   纸","29","张","/","本","说明","/","本","清册","/","本",
							"批准:","","校核:","","审核:","","设计:",""]
			);
	
	Zcell2.GetSheet(0).SetCellValue(2,11,"序号");
	Zcell2.GetSheet(0).SetCellType(3,11,{
        "code": "object",
        "object":"图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号"
    });
	Zcell2.GetSheet(0).SetCellType(9,11,{
        "code": "object",
        "object":"图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
    });
	Zcell2.GetSheet(0).SetCellValue(19,11,"张数");
	Zcell2.GetSheet(0).SetCellType(20, 11,  {
        "code": "object",
        "object":"套用原工程名称及<br>卷册检索号、图号"
    });
	Zcell2.GetSheet(0).SetCellType(2, 35,  {
		"code": "object",
		"object":"备注"
	});
	for (var i = 1; i < 24; i++) {
		Zcell2.GetSheet(0).SetCellValue(2,i+11,i);
	}
	// 隐藏单元格
//	$(".rowlab").hide();
	//背景图片
	Zcell2.GetSheet(0).SetCellType(2, 2,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/minPicIndex.png' width='"+
		UnitConversion.mmConversionPx(127.8)+"' height='"+
		UnitConversion.mmConversionPx(11)+"'/>"
	});
	
}


/**
 * 套用修改说明
 */
var changeCellTable = function(){
	// 创建JSCELL，指明承载容器indexContainer
	Zcell6 = new ZCell(document.getElementById("groundStringingContainer"));
	// 创建表，并指定列，行数
	Zcell6.InserSheet(0, 38, 57);
	// 加载数据
	Zcell6.GetSheet(0).LoadArrData([]);
	// 设置列宽
	for (var i = 1; i <= 38; i++) {
		Zcell6.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(210)/38);
		if (i==1) {
			Zcell6.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(25));
		}else if (i==7) {
			Zcell6.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(2.5));
		}else if (i==8) {
			Zcell6.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(7.5));
		}else if (i==28) {
			Zcell6.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(2.5));
		}else if (i==29) {
			Zcell6.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(7.5));
		}else if (i==38) {
			Zcell6.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(5));
		}
	}
	// 设置行高
	for (var i = 1; i <= 57; i++) {
		Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(297)/59);
		if (i==1) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(5));
		}else if (i==15) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(6.5));
		}else if (i==16) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(3.5));
		}else if (i==30) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(6));
		}else if (i==31) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(4));
		}else if (i==45) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(5.5));
		}else if (i==46) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(4.5));
		}else if (i==52) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(12));
		}else if (i==53) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(7));
		}else if (i==54) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(7));
		}else if (i==55) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(7));
		}else if (i==56) {
			Zcell6.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(7));
		}
	}
	//合并单元格
	Zcell6.GetSheet(0).MergeCells(1,1,7,1);
	Zcell6.GetSheet(0).MergeCells(8,1,17,1);
	Zcell6.GetSheet(0).MergeCells(18,1,28,1);
	Zcell6.GetSheet(0).MergeCells(29,1,38,1);
	setCellStyle(Zcell6,0,
			[[7,1],[17,1],[28,1]],
			{"border-right" : "2px solid black"});
	
	Zcell6.GetSheet(0).MergeCells(1,57,7,57);
	Zcell6.GetSheet(0).MergeCells(8,57,17,57);
	Zcell6.GetSheet(0).MergeCells(18,57,28,57);
	Zcell6.GetSheet(0).MergeCells(29,57,38,57);
	setCellStyle(Zcell6,0,
			[[7,57],[17,57],[28,57]],
			{"border-right" : "2px solid black"});
	
	Zcell6.GetSheet(0).MergeCells(1,46,1,56);
	Zcell6.GetSheet(0).SetCellStyle(1, 46, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell6.GetSheet(0).MergeCells(1,31,1,45);
	Zcell6.GetSheet(0).SetCellStyle(1, 31, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell6.GetSheet(0).MergeCells(1,16,1,30);
	Zcell6.GetSheet(0).SetCellStyle(1, 16, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell6.GetSheet(0).MergeCells(1,2,1,15);
	
/////////////////////////////////////////////////////////////////////////
	
	Zcell6.GetSheet(0).MergeCells(38,46,38,56);
	Zcell6.GetSheet(0).SetCellStyle(38, 46, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell6.GetSheet(0).MergeCells(38,31,38,45);
	Zcell6.GetSheet(0).SetCellStyle(38, 31, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell6.GetSheet(0).MergeCells(38,16,38,30);
	Zcell6.GetSheet(0).SetCellStyle(38, 16, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell6.GetSheet(0).MergeCells(38,2,38,15);
	
	
	Zcell6.GetSheet(0).MergeCells(9,6,34,8);
	Zcell6.GetSheet(0).MergeCells(9,9,34,11);
	Zcell6.GetSheet(0).MergeCells(9,12,34,14);
	Zcell6.GetSheet(0).MergeCells(9,15,34,17);
	Zcell6.GetSheet(0).MergeCells(9,18,34,20);
	Zcell6.GetSheet(0).MergeCells(9,21,34,23);
	Zcell6.GetSheet(0).MergeCells(9,24,34,26);
	Zcell6.GetSheet(0).MergeCells(9,27,34,29);
	Zcell6.GetSheet(0).MergeCells(9,30,34,32);
	Zcell6.GetSheet(0).MergeCells(9,33,34,35);
	Zcell6.GetSheet(0).MergeCells(9,36,34,38);
	Zcell6.GetSheet(0).MergeCells(9,39,34,41);
	Zcell6.GetSheet(0).MergeCells(9,42,34,44);
	Zcell6.GetSheet(0).MergeCells(9,45,34,47);
	Zcell6.GetSheet(0).MergeCells(9,48,34,50);
	
	
//	setCellStyle(Zcell6,0,
//			[[2,1],[3,1],[9,1],[19,1],[20,1]],
//			{"border-left" : "1px solid black"});
	
	Zcell6.GetSheet(0).MergeCells(2,52,19,52);
	Zcell6.GetSheet(0).MergeCells(20,52,32,52);
	Zcell6.GetSheet(0).SetCellValue(32,52,"工程");
	Zcell6.GetSheet(0).MergeCells(33,52,37,52);
	Zcell6.GetSheet(0).SetCellType(33,52,{
        "code": "object",
        "object":"设计<br>阶段"
    });

	
	Zcell6.GetSheet(0).MergeCells(2,53,5,53);
	Zcell6.GetSheet(0).SetCellValue(2,53,"批 准");
	Zcell6.GetSheet(0).MergeCells(2,54,5,55);
	Zcell6.GetSheet(0).SetCellValue(2,55,"审 核");
	Zcell6.GetSheet(0).MergeCells(2,56,5,56);
	Zcell6.GetSheet(0).SetCellValue(2,56,"校 核");
	
	Zcell6.GetSheet(0).MergeCells(6,53,10,53);
	Zcell6.GetSheet(0).MergeCells(6,54,10,54);
	Zcell6.GetSheet(0).MergeCells(6,55,10,55);
	Zcell6.GetSheet(0).MergeCells(6,56,10,56);
	
	
	Zcell6.GetSheet(0).MergeCells(11,53,14,53);
	Zcell6.GetSheet(0).SetCellValue(11,53,"设 计");
	Zcell6.GetSheet(0).MergeCells(11,54,14,54);
	Zcell6.GetSheet(0).SetCellValue(11,54,"CAD制图");
	Zcell6.GetSheet(0).MergeCells(11,55,14,55);
	Zcell6.GetSheet(0).SetCellValue(11,55,"比 例");
	Zcell6.GetSheet(0).MergeCells(11,56,14,56);
	Zcell6.GetSheet(0).SetCellValue(11,56,"日 期");
	
	Zcell6.GetSheet(0).MergeCells(15,53,19,53);
	Zcell6.GetSheet(0).MergeCells(15,54,19,54);
	Zcell6.GetSheet(0).MergeCells(15,55,19,55);
	Zcell6.GetSheet(0).MergeCells(15,56,19,56);
	
	Zcell6.GetSheet(0).MergeCells(20,53,37,55);
	
	Zcell6.GetSheet(0).MergeCells(20,56,22,56);
	Zcell6.GetSheet(0).SetCellValue(20,56,"图 号");
	Zcell6.GetSheet(0).MergeCells(23,56,33,56);
	Zcell6.GetSheet(0).MergeCells(34,56,35,56);
	Zcell6.GetSheet(0).SetCellType(34,56,{
        "code": "object",
        "object":"图纸<br>级别"
    });
	Zcell6.GetSheet(0).MergeCells(36,56,37,56);
	
	

	for (var i = 1; i < 57; i++) {
		if (i<56) {
			Zcell6.GetSheet(0).SetCellStyle(2, i+1, {
				"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
			if (i<=10) {
				Zcell6.GetSheet(0).SetCellStyle(37, i+1, {
					"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
				});
			}else{
				Zcell6.GetSheet(0).SetCellStyle(37, i+1, {
					"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
				});
			}
		}
	}
	for (var i = 1; i < 37; i++) {
		if (i<37) {
			Zcell6.GetSheet(0).SetCellStyle(i+1, 2, {
				"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
//			Zcell6.GetSheet(0).SetCellStyle(i+1, 35, {
//				"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
//			});
			Zcell6.GetSheet(0).SetCellStyle(i+1, 51, {
				"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
			Zcell6.GetSheet(0).SetCellStyle(i+1, 56, {
				"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
		}
	}
	
//	Zcell6.GetSheet(0).SetCellStyle(47, 1, {
//		"border-top" : UnitConversion.mmConversionPx(2) + "px solid black",
//	});
	

	//背景图片
	Zcell6.GetSheet(0).SetCellType(2, 52,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/hdLogo.png' width='"+
		UnitConversion.mmConversionPx(90)+"' height='"+
		UnitConversion.mmConversionPx(12)+"'/>"
	});
}

/**
 * 套图信息表
 */
var infoCellTable = function(){
	// 创建JSCELL，指明承载容器
	Zcell7 = new ZCell(document.getElementById("infoContainer"));
	// 创建表，并指定列，行数
	Zcell7.InserSheet(0, 6, 41);
	// 加载数据
	Zcell7.GetSheet(0).LoadArrData([['序列','工程名称','图号','图名','需晒份数','备注']]);
	// 设置样式
	for (var i = 0; i < 40; i++) {
		Zcell7.GetSheet(0).SetCellStyle(6, i+2, {
			"background-color" : "#FFFF00"
		});
	}
	// 设置列宽
	Zcell7.GetSheet(0).SetColWidth(1, 62);
	Zcell7.GetSheet(0).SetColWidth(2, 300);
	Zcell7.GetSheet(0).SetColWidth(3, 160);
	Zcell7.GetSheet(0).SetColWidth(4, 300);
	Zcell7.GetSheet(0).SetColWidth(5, 62);
	Zcell7.GetSheet(0).SetColWidth(6, 200);
}

/**
 * 表格内容点击监听事件
 */
var cellAddEventListener = function(){
	let mapArr = [];
	for (var i = 5; i <= 64; i++) {
		for (var j = 11; j <= 33; j++) {
			if ((i-2)%3==0) {
				mapArr.push([j,i]);
			}else{
				mapArr.push([j,i]);
			}
		}
	}
	for (let i = 0; i < mapArr.length; i++) {
		let obj = Zcell3.GetSheet(0).GetCell(mapArr[i][0],mapArr[i][1]);
		obj.addEventListener("click", function(event) {
			let defaultValue = '';
			if ((mapArr[i][1]-2)%3==0) {
				defaultValue = mapArr[i][0]==27?'':Zcell3.GetSheet(0).GetCellValue(mapArr[i][0],3) ;
			}else{
				defaultValue = mapArr[i][0]==27?'':Zcell3.GetSheet(0).GetCellValue(mapArr[i][0],4) ;
			}
			Zcell3.GetSheet(0).SetCellValue(mapArr[i][0],mapArr[i][1],defaultValue);
		}, false)
	}
}

/**
 * 获取导地线参数
 */
var getConductorParam = function() {
	let conductor = null;
	let result = [];
	layer.load(2);
	let url= basePath + 'mechanicsProperty/getConductorParam.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": "",
		"contentType": "application/json; charset=utf-8",
		"async":false,
		"dataType":"json",
		"success":function(data){
			layer.closeAll();
			conductor =  data.conductorParam;
		},
		"error": function(e) {
			layer.closeAll();
			layer.msg("服务器出错");
			console.info(e);
		}
	});
	for (var i = 0; i < conductor.length; i++) {
		result.push(conductor[i].conductor_type);
	}
	return result;
}

wiringDrawing.prototype.initProjectData = function() {
	let url= basePath + 'common/getMainInfoList.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": "",
		"success":function(data){
			if (!Tools.isEmpty(data)) {
				let option = "";
				let optionContinuity = "";
				for (var i = 0; i < data.length; i++) {
					option += '<option value="'+data[i].id+'" tower_id="'+data[i].id+'">'+data[i].projectName+'</option>'
//					optionContinuity += '<option value="'+data[i].id+'" tower_id="'+data[i].id+'">'+data[i].projectName+'</option>'
				}
				$("#mainInfo").html(option);
				$("#continuityWireway").html(option);
			}
		},
		"error": function(e) {
			layer.msg("服务器出错");
			console.info(e);
		}
	});
}





wiringDrawing.prototype.searchContinuityWireway  = function() {
	defaultCellTable(24);
	layer.load(2,{shade: [0.1, '#393D49']});
	let sc_conductor_XXC = [];	//	导线悬垂串
	let sc_conductor_NZC = [];	//	导线耐张串
	let sc_conductor_TXC = [];	//	跳线悬垂串
	let sc_ground_XXC = [];		//	地线悬垂串
	let sc_ground_NZC = [];		//	地线耐张串
	let towerId = $("#continuityWireway").find("option:selected").attr("tower_id");
	let url= basePath + 'wiringDrawing/getContinuityWireway.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": {"id":towerId},
		"success":function(data){
			layer.closeAll();
			let isolatedArr = [];
			let spanArr = [];
//			let wirewayContinuity = JSON.parse(data.wirewayContinuity);
			//let towerNumber = JSON.parse(data.column_a);
//			["JL/G1A-300/25", "JL/G1A-300/25", "JL/G1A-300/25", "JL/G1A-300/25"]
//			initIsolatedTable(isolatedArr,spanArr);
			initContinuityWireway(data.wirewayContinuity);
		},
		"error": function(e) {
			layer.closeAll();
			layer.msg("服务器出错");
			console.info(e);
		}
	});
}

var initContinuityWireway = function(conductorType) {
	
	var wireway =[];//导线串
	var groundWireway =[];//地线串
	let  len = conductorType.length;
	defaultCellTable(len*2+4);
	
	for(var j=0;j<len;j++)
	{
		wireway.push(conductorType[j].wireway);
		groundWireway.push(conductorType[j].groundWire);
	}
	
	let colAndRowArr = [];
	let classNameArr = [];
	let selectValueArr = [];
	let valueArr = [];
	
	let temp =0;
	for (var i = 3; i <= len+2; i++) {
		
//		连续档
		if(temp<conductorType.length)
		{
			Zcell4.GetSheet(0).SetCellValue(2,i,conductorType[temp].shelvesType);
			setCellBackGroudColor(Zcell4,0,2,2,i,i,"#FFFF00");
		}else
		{
			Zcell4.GetSheet(0).SetCellValue(2,i,"");
			setCellBackGroudColor(Zcell4,0,2,2,i,i,"#FFFF00");
		}
		//	导线型号
		colAndRowArr.push([3,i]);
		classNameArr.push('wireway_conductor_type'+i);
		valueArr.push(wireway);
		
//		var linktpye1 = {
//                "code": "object",
//                "object":"<a href='' target='_blank'></a>&nbsp;&nbsp;<a href='javascript:void(0)'   onclick='editdata();' >"+conductorType[temp]+"</a>"
//            };
//		Zcell4.GetSheet(0).SetCellType(2, i, linktpye1);
//		Zcell4.GetSheet(0).SetCellValue(2,i,conductorType[temp]);
//		$('.wireway_conductor_type'+i).val(conductorType[temp]);
		selectValueArr.push(conductorType[temp].wireway);
		//	导线气象条件
		colAndRowArr.push([4,i]);
		classNameArr.push('weather_condition'+i);
		valueArr.push(["2510","2710","3110","2910","3115"]);
		if(temp<conductorType.length)
		{
			selectValueArr.push('2510');
		}else
		{
			selectValueArr.push('');
		}
		
		//	导线安全系数
		colAndRowArr.push([5,i]);
		classNameArr.push('safety_factor'+i);
		valueArr.push(["2.5","8.0"]);
		if(temp<conductorType.length)
		{
			selectValueArr.push('2.5');
		}else
		{
			selectValueArr.push('');
		}
		
		
//		最大平均运行张力 	
		
		if(temp<conductorType.length)
		{
			Zcell4.GetSheet(0).SetCellValue(6,i,"25%");
			setCellBackGroudColor(Zcell4,0,6,6,i,i,"#FFFF00");
		}else
		{
			Zcell4.GetSheet(0).SetCellValue(6,i,"");
			setCellBackGroudColor(Zcell4,0,6,6,i,i,"#FFFF00");
		}
//		colAndRowArr.push([5,i]);
//		classNameArr.push('safety_factor'+i);
//		valueArr.push(["2.5","8.0"]);
//		selectValueArr.push('');
		//架线初伸长降温
//		colAndRowArr.push([6,i]);
//		classNameArr.push('stringingCooling'+i);
//		valueArr.push(["-25"]);
//		selectValueArr.push('');
		
		if(temp<conductorType.length)
		{
			Zcell4.GetSheet(0).SetCellValue(7,i,"-25");
			setCellBackGroudColor(Zcell4,0,7,7,i,i,"#FFFF00");
		}else
		{
			Zcell4.GetSheet(0).SetCellValue(7,i,"");
			setCellBackGroudColor(Zcell4,0,7,7,i,i,"#FFFF00");
		}
		
		//风荷载计算高度
//		colAndRowArr.push([7,i]);
//		classNameArr.push('calculated_Height_Wind'+i);
//		valueArr.push(["15"]);
//		selectValueArr.push('');
		
		if(temp<conductorType.length)
		{
			Zcell4.GetSheet(0).SetCellValue(8,i,"15");
			setCellBackGroudColor(Zcell4,0,8,8,i,i,"#FFFF00");
		}else
		{
			Zcell4.GetSheet(0).SetCellValue(8,i,"");
			setCellBackGroudColor(Zcell4,0,8,8,i,i,"#FFFF00");
		}
		
		//风荷载基准高度
		colAndRowArr.push([9,i]);
		classNameArr.push('datum_Height_Wind'+i);
		valueArr.push(["10","15"]);
		
		if(temp<conductorType.length)
		{
			selectValueArr.push('10');
		}else
		{
			selectValueArr.push('');
		}
		
		//地形粗糙度类别
		colAndRowArr.push([10,i]);
		classNameArr.push('terrain_Roughness'+i);
		valueArr.push(["A","B","C","D"]);
		
		
		if(temp<conductorType.length)
		{
			selectValueArr.push('B');
		}else
		{
			selectValueArr.push('');
		}
		
		
//		连续档
		if(temp<conductorType.length)
		{
			Zcell4.GetSheet(0).SetCellValue(2,(i+len+2),conductorType[temp].shelvesType);
			setCellBackGroudColor(Zcell4,0,2,2,(i+len+2),(i+len+2),"#FFFF00");
		}else
		{
			Zcell4.GetSheet(0).SetCellValue(2,(i+len+2),"");
			setCellBackGroudColor(Zcell4,0,2,2,(i+len+2),(i+len+2),"#FFFF00");
		}
		//	地线型号
		colAndRowArr.push([3,(i+len+2)]);
		classNameArr.push('groundWire_conductor_type'+i);
//		$('.groundWire_conductor_type'+i).val(groundType[temp]);
		valueArr.push(groundWireway);
		selectValueArr.push(conductorType[temp].groundWire);
//		Zcell4.GetSheet(0).SetCellValue(2,i+12,groundType[temp]);
		
		
		//	地线气象条件
		colAndRowArr.push([4,(i+len+2)]);
		classNameArr.push('weather_condition'+i);
		valueArr.push(["2510","2710","3110","2910","3115"]);
		
		if(temp<conductorType.length)
		{
			selectValueArr.push('2510');
		}else
		{
			selectValueArr.push('');
		}
		//	与导线配合计算
		colAndRowArr.push([5,(i+len+2)]);
		classNameArr.push('contact_conductor_compute'+i);
		valueArr.push(["是","否"]);
		
		if(temp<conductorType.length)
		{
			selectValueArr.push('是');
		}else
		{
			selectValueArr.push('');
		}
		//	地线安全系数
		colAndRowArr.push([6,(i+len+2)]);
		classNameArr.push('safety_factor'+i);
		valueArr.push(["10"]);
		
		if(temp<conductorType.length)
		{
			selectValueArr.push('10');
		}else
		{
			selectValueArr.push('');
		}
		//	配合导线
		colAndRowArr.push([7,(i+len+2)]);
		classNameArr.push('contact_conductor'+i);
		valueArr.push(wireway);
		selectValueArr.push(conductorType[temp].wireway);
		//	配合导线安全系数
		colAndRowArr.push([8,(i+len+2)]);
		classNameArr.push('contact_safety_factor'+i);
		valueArr.push(["2.5","8.0"]);
		
		if(temp<conductorType.length)
		{
			selectValueArr.push('2.5');
		}else
		{
			selectValueArr.push('');
		}
		//	导地线间距
		colAndRowArr.push([9,(i+len+2)]);
		classNameArr.push('contact_distance'+i);
		valueArr.push(["H=0.5;V=3.0","H=1.0;V=4.5"]);
		
		if(temp<conductorType.length)
		{
			selectValueArr.push("H=0.5;V=3.0");
		}else
		{
			selectValueArr.push('');
		}
		
		temp= temp+1;
	}
	
	multipleGerateSelect(Zcell4,0,colAndRowArr,classNameArr,valueArr,selectValueArr);
	
}

wiringDrawing.prototype.setDrawingDetail= function() {
	
    wiringDrawing.getDrawingNum();
	
	
}

/**
 * 计算导地线数据
 */
wiringDrawing.prototype.getDrawingNum = function() {
	layer.load(1);
	var param = wiringDrawing.getDrawingParam();
	var url= basePath + 'wiringDrawing/getDrawingNum.action';
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
				wiringDrawing.initWiringDrawingNumData(data.ground_Wire_Mechanical_Properties,data.ground_Wire_op,data.wireway_Mechanical_Properties,data.wireway_Wire_op);
			}
		},
		"error": function(e) {
			layer.closeAll();
			layer.msg("服务器出错");
			console.info(e);
		}
	});
}

wiringDrawing.prototype.initWiringDrawingNumData = function(ground_Wire_Mechanical_Properties,ground_Wire_op ,wireway_Mechanical_Properties ,wireway_Wire_op) {
	
	
	
	for(var i=0;i<ground_Wire_Mechanical_Properties.length;i++ )
	{
		Zcell4.GetSheet(0).SetCellValue(11, (i+3), wireway_Mechanical_Properties[i]);
		Zcell4.GetSheet(0).SetCellValue(12, (i+3), wireway_Wire_op[i]);
		
		
		Zcell4.GetSheet(0).SetCellValue(11, (i+3+ground_Wire_Mechanical_Properties.length+2), ground_Wire_Mechanical_Properties[i]);
		Zcell4.GetSheet(0).SetCellValue(12, (i+3+ground_Wire_Mechanical_Properties.length+2), ground_Wire_op[i]);
		
		
		
	}
	
}


wiringDrawing.prototype.getDrawingParam = function() {
	
	var cols = Zcell4.GetSheet(0).GetCols() ;
	var rows = Zcell4.GetSheet(0).GetRows () ;
    var ground_wireArr =  [];//地线
    var wirewayArr = [];//导线
    var len = (rows-4)/2 +3;
	   for(var j=3;j< len;j++)
	   {
//			   var cnum = ".weather_condition"+j;
//			   var weather_condition4 = $(".weather_condition2").children("option:selected").val();
//			   				$(".ground"+(i+1)).children("option:selected").val()
		   		
		   		//导线型号
			   var wireway_conductor_type = $(".wireway_conductor_type"+j).children("option:selected").val();
			   if(!Tools.isEmpty(wireway_conductor_type))
				{
//				   arr.push(wireway_conductor_type);
				}
			   else 
			   {
					continue;
			   }
		   		//气象条件
			   var weather_condition = $(".weather_condition"+j).children("option:selected").val();
			   if(!Tools.isEmpty(weather_condition))
				{
//				   arr.push(weather_condition);
				}
			   else 
			   {
				   layer.msg("请填写气象条件");;
				   return  ;
			   }
			  // 导线安全系数
			   var safety_factor = $(".safety_factor"+j).children("option:selected").val();
			   if(!Tools.isEmpty(safety_factor) )
			   {
//				   arr.push(safety_factor);
			   }
			   else 
			   {
				   layer.msg("请填写安全系数");
					return  ;
			   }
			 //  最大平均运行张力 	
			   var max_Running_Tension = Zcell4.GetSheet(0).GetCellValue (6, j);
			   if(!Tools.isEmpty(max_Running_Tension) )
			   {
//				   arr.push(max_Running_Tension);
			   }
			   else 
			   {
				   layer.msg("请填写最大平均运行张力");
				   return  ;
			   }
		   
			   //架线初伸长降温
			   var initial_Elongation_Cooling = Zcell4.GetSheet(0).GetCellValue (7, j);
			   if(!Tools.isEmpty(initial_Elongation_Cooling) )
			   {
//				   arr.push(max_Initial_Elongation_Cooling);
			   }
			   else 
			   {
				   layer.msg("请填写架线初伸长降温");
				   return  ;
			   }
			   
			   //风荷载计算高度 	
			   var calculated_Height_Wind_Load = Zcell4.GetSheet(0).GetCellValue (8, j);
			   if(!Tools.isEmpty(calculated_Height_Wind_Load) )
			   {
//				   arr.push(calculated_Height_Wind_Load);
			   }
			   else 
			   {
				   layer.msg("请填写风荷载计算高度");
				   return  ;
			   }
			   
				
			// 风荷载基准高度
			   var datum_Height_Wind = $(".datum_Height_Wind"+j).children("option:selected").val();
			   if(!Tools.isEmpty(datum_Height_Wind) )
			   {
//				   arr.push(datum_Height_Wind);
			   }
			   else 
			   {
				   layer.msg("请填写风荷载基准高度");
					return  ;
			   }
			   
			   
			// 地形粗糙度类别
			   var terrain_Roughness = $(".terrain_Roughness"+j).children("option:selected").val();
			   if(!Tools.isEmpty(terrain_Roughness) )
			   {
//				   arr.push(terrain_Roughness);
			   }
			   else 
			   {
				   layer.msg("请填写地形粗糙度类别");
					return  ;
			   }
			   
			   
			   var wireway = {"wireway_conductor_type":wireway_conductor_type,"weather_condition":weather_condition,"safety_factor":safety_factor,"max_Running_Tension":max_Running_Tension,
					   "initial_Elongation_Cooling":initial_Elongation_Cooling,"calculated_Height_Wind_Load":calculated_Height_Wind_Load,"datum_Height_Wind":datum_Height_Wind,"terrain_Roughness":terrain_Roughness};
			   wirewayArr.push(wireway);
			   
			   
			   
			   
//				地线型号
			   var groundWire_conductor_type = $(".groundWire_conductor_type"+j).children("option:selected").val();
			   if(!Tools.isEmpty(groundWire_conductor_type))
				{
//				   arr1.push(wireway_conductor_type);
				}
			   else 
			   {
					continue;
			   }
			   
			//地线气象条件
			   weather_condition = $(".weather_condition"+j).children("option:selected").val();
			   if(!Tools.isEmpty(weather_condition) )
			   {
//				   arr1.push(weather_condition);
			   }
			   else 
			   {
				   layer.msg("请填写地线气象条件");
					return  ;
			   }
			   
			// 与导线配合计算
			   var contact_conductor_compute = $(".contact_conductor_compute"+j).children("option:selected").val() ==="是" ? 1 : 0;
			   if(!Tools.isEmpty(contact_conductor_compute) )
			   {
//				   arr1.push(contact_conductor_compute);
			   }
			   else 
			   {
				   layer.msg("请填写与导线配合计算");
					return  ;
			   }
			   
			// 地线安全系数
			     safety_factor = $(".safety_factor"+j).children("option:selected").val();
			   if(!Tools.isEmpty(safety_factor) )
			   {
//				   arr1.push(safety_factor);
			   }
			   else 
			   {
				   layer.msg("请填写地线安全系数");
					return  ;
			   }
			// 配合导线
			   var contact_conductor = $(".contact_conductor"+j).children("option:selected").val();
			   if(!Tools.isEmpty(contact_conductor) )
			   {
//				   arr1.push(contact_conductor);
			   }
			   else 
			   {
				   layer.msg("请填写配合导线");
					return  ;
			   }
			   
			// 配合导线安全系数
			   var contact_safety_factor = $(".contact_safety_factor"+j).children("option:selected").val();
			   if(!Tools.isEmpty(contact_safety_factor) )
			   {
//				   arr1.push(contact_safety_factor);
			   }
			   else 
			   {
				   layer.msg("请填写配合导线安全系数");
					return  ;
			   }
			// 导地线间距
			   var contact_distance = $(".contact_distance"+j).children("option:selected").val();
			   if(!Tools.isEmpty(contact_distance) )
			   {
//				   arr1.push(contact_distance);
			   }
			   else 
			   {
				   layer.msg("请填写导地线间距");
					return  ;
			   }
			   
			   var ground_wire ={"groundWire_conductor_type":'JLB40-100',"weather_condition":weather_condition,"contact_conductor_compute":contact_conductor_compute, "safety_factor":safety_factor,"contact_conductor":contact_conductor,"contact_safety_factor":contact_safety_factor,
					   "contact_distance":contact_distance};
			   ground_wireArr.push(ground_wire);
			   
	   }
	   var param = {"ground_Wire":ground_wireArr,"wireway":wirewayArr};
	
	   return param;
}
wiringDrawing.prototype.searchProjectDetail = function() {
	layer.load(2,{shade: [0.1, '#393D49']});
	let sc_conductor_XXC = [];	//	导线悬垂串
	let sc_conductor_NZC = [];	//	导线耐张串
	let sc_conductor_TXC = [];	//	跳线悬垂串
	let sc_ground_XXC = [];		//	地线悬垂串
	let sc_ground_NZC = [];		//	地线耐张串
	let towerId = $("#mainInfo").find("option:selected").attr("tower_id");
	var projectName = $("#mainInfo").find("option:selected").html();
	Zcell1.GetSheet(0).SetCellValue(27,63,projectName);
	Zcell2.GetSheet(0).SetCellValue(10,4,projectName);
	
//	let url= basePath + 'common/getTowerInfoById.action';
	let url= basePath + 'wiringDrawing/getContinuityWireway.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": {"id":towerId},
		"success":function(data){
			layer.closeAll();
			let isolatedArr = [];
			let spanArr = [];
			var wirewayIsolated = data.wirewayIsolated;
			for(var i=0;i<wirewayIsolated.length;i++)
			{
				isolatedArr.push(wirewayIsolated[i].shelvesType);
				spanArr.push(wirewayIsolated[i].shelvesDistance);
			}
//			let span = JSON.parse(data.column_j);
//			let towerNumber = JSON.parse(data.column_a);
//			if (!Tools.isEmpty(towerNumber)) {
//				for (var i = 1; i < towerNumber.length; i++) {
//					if (((i+1)%2)==0) {
//						if (!Tools.isEmpty(span[i])&&!isNaN(span[i])) {
//							if (span[i]==span[i+1]&&span[i-1]!=span[i]&&span[i+2]!=span[i]) {
//								isolatedArr.push([towerNumber[i],towerNumber[i+1]]);
//								spanArr.push(span[i]);
//							}
//						}
//					}
//				}
//			}
			initIsolatedTable(isolatedArr,spanArr);
		},
		"error": function(e) {
			layer.closeAll();
			layer.msg("服务器出错");
			console.info(e);
		}
	});
}
 var editdata= function(){
	 
	 alert(111);
 }
var initIsolatedTable = function(isolatedArr,spanArr) {
	let tbody = '';
	let checkBox = '<input type="checkbox" name="category" class="checkIsolated" />'
	for (var i = 0; i < isolatedArr.length; i++) {
		tbody += '<tr data_isolated_s='+isolatedArr[i]+
		' data_span = '+spanArr[i]+'><td>'+(i+1)+'</td><td>'+
		isolatedArr[i]+'</td><td>'+spanArr[i]+
		'</td><td></td><td>'+checkBox+'</td><tr>';
	}
	if (isolatedArr.length==0) {
		tbody+='<tr><td colspan="5">暂无数据</td></tr>';
	}
	$("#isolatedTable tbody").html(tbody);
}

wiringDrawing.prototype.checkIsolated = function(e) {
	for (let i = 5; i <= 64; i++) {
		if ((i-2)%3==0) {
			Zcell3.GetSheet(0).SetCellValue(2,i,"");
			Zcell3.GetSheet(0).SetCellValue(3,i,"");
			Zcell3.GetSheet(0).SetCellValue(4,i,"");
		}
	}
	let isolatedArr = [];
	$(".checkIsolated").each(function(i,obj){
		if (obj.checked) {
			let thisTr = $(obj).closest("tr");
			let temp  = thisTr.attr('data_isolated_s');
			
			let isolateds = temp.substr(0,temp.indexOf('-'));;
			
			let isolatede = temp.substr((temp.indexOf('-')+1),temp.length);;
			let span = thisTr.attr('data_span');
			isolatedArr.push([isolateds,isolatede,span]);
		}
	})
	for (let i = 0; i < isolatedArr.length; i++) {
		let index = 5;
		Zcell3.GetSheet(0).SetCellValue(2,index+i*3,isolatedArr[i][0]);
		Zcell3.GetSheet(0).SetCellValue(3,index+i*3,isolatedArr[i][1]);
		Zcell3.GetSheet(0).SetCellValue(4,index+i*3,isolatedArr[i][2]);
	}
}
