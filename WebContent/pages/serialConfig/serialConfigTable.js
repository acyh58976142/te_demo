/*串型选择数据*/
var CxxzList = [];
/*绝缘子参数数据*/
var Insulatorlist = [];
/*套图信息表*/
var Zcell1 = null;
/*目录20串*/
var Zcell2 = null;
/*套用说明20串*/
var Zcell3 = null;

/*套用修改说明*/
var Zcell4 = null;

var projectCodeAndId =[];//工程编号和id
/*已激活的标签页的名称*/
var ActiveTab = "串型配置";
function serialConfig() {
	// 初始化表格
	this.initCellTableData();
	// 初始化数据
	this.initData();
	// 初始化工程列表下拉框
	this.initProjectData();
	//	查询按钮
	$('#searchBtn').on("click",function() {
		//通过projectId查询配置信息表判断该工程中是否有保存的配置信息
		/*if(!Tools.isEmpty( isSerialConfigInfo() )){
			alert("查询到当前工程上一次配置信息");
			//回显上一次配置信息
			reappearTableDate(isSerialConfigInfo());
		}else{
			alert("没有当前工程的配置信息，请配置");
			serialConfig.searchProjectDetail();
		}*/
		isSerialConfigInfo();
	})
	//保存配置按钮
	$('#saveBtn').on("click",function() {
		saveTableData();
	})
	//	导出按钮
	$('#addBtn').on("click",function() {
		let tableHtml = '';
		let tableObj = null;
		if (ActiveTab == "串型配置") {
			layer.msg("...");
			return;
		} else if (ActiveTab == "目录") {
			tableObj = document.getElementById("indexContainer").getElementsByTagName("table")[1];
			deleteRow1Col1(tableObj);
			tableHtml = $("#indexContainer #tabl1").html();
		} else if (ActiveTab == "套用说明") {
			tableObj = document.getElementById("descriptionContainer").getElementsByTagName("table")[1];
			deleteRow1Col1(tableObj);
			tableHtml = $("#descriptionContainer #tabl1").html();
		} else if (ActiveTab == "套图信息表") {
			tableObj = document.getElementById("infoContainer").getElementsByTagName("table")[1];
			deleteRow1Col1(tableObj);
			tableHtml = $("#infoContainer #tabl1").html();
		}
		table2Excel(tableHtml,ActiveTab);
		location.reload();
	})
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		// 获取已激活的标签页的名称
		ActiveTab = $(e.target).text(); 
	});
}

var deleteRow1Col1 = function(tableObj){
	for(var i = 0;i < tableObj.rows.length;i++){
		var  height = tableObj.rows[i].childNodes[0].style.height;
		tableObj.rows[i].childNodes[1].style.height= height;
		tableObj.rows[i].deleteCell(0);
	}
	var row1 = tableObj.rows[0].childNodes;
	for (var i = 0; i < row1.length; i++) {
		var  width = row1[i].style.width;
		tableObj.rows[1].childNodes[i].style.width = width;
	}
	tableObj.deleteRow(0); 
}

serialConfig.prototype.appendCxxzOption = function(type,dxxh,dydj,dxflfs,objSelect) {
	var option = '<option selected disabled style="display: none">';
	for (var i = 0; i < CxxzList.length; i++) {
		if (CxxzList[i].dxxh==dxxh && CxxzList[i].dydjname==dydj && CxxzList[i].dxflfsname==dxflfs && CxxzList[i].wirewayType== type && CxxzList[i].isExistPicture=="1") {
			option += '<option value="'+CxxzList[i].jyzlsCode+'" data_stringCode="'+CxxzList[i].ccode+'">'+CxxzList[i].cxxz+'</option>';
		}else if ((type==5||type==4)&&type==CxxzList[i].wirewayType&&CxxzList[i].dxxh==dxxh) {
			option += '<option value="'+CxxzList[i].jyzlsCode+'" data_stringCode="'+CxxzList[i].ccode+'">'+CxxzList[i].cxxz+'</option>';
		}
	}
	objSelect.html(option);
}

serialConfig.prototype.computePlacesDistance = function(type,dydj,jyzxh,mljyzsl,objInput) {
	var creepDistance = 0.00;
	for (var i = 0; i < Insulatorlist.length; i++) {
		if (Insulatorlist[i].insulatorModel==jyzxh) {
			creepDistance = Insulatorlist[i].creepDistance * parseInt(mljyzsl) / parseInt(dydj.substring(0,3));
		}
	}
	objInput.prop("value",creepDistance.toFixed(2));
}

serialConfig.prototype.selectListener = function() {
		// 导线型号下拉框
		$(".dxxhSelect").on("change",function(){
			var type = $(this).parent().parent().attr("wireway_type");
		    var dxxh = $(this).children('option:selected').val();
		    var dydj = $(this).parent().parent().find(".dydjSelect").children('option:selected').val();
		    var dxflfs = $(this).parent().parent().find(".dxflfsSelect").children('option:selected').val();
		    var objSelect =  $(this).parent().parent().find(".cxxzSelect");
		    if (!Tools.isEmpty(dydj)&&!Tools.isEmpty(dxflfs)&&!Tools.isEmpty(dxxh)) {
		    	serialConfig.appendCxxzOption(type,dxxh,dydj,dxflfs,objSelect);
			}else if (!Tools.isEmpty(dxxh)&&(type==4||type==5)) {
				serialConfig.appendCxxzOption(type,dxxh,dydj,dxflfs,objSelect);
			}
		});
		// 电压等级下拉框
		$(".dydjSelect").on("change",function(){
			var type = $(this).parent().parent().attr("wireway_type");
		    var dydj = $(this).children('option:selected').val();
		    var dxxh = $(this).parent().parent().find(".dxxhSelect").children('option:selected').val();
		    var dxflfs = $(this).parent().parent().find(".dxflfsSelect").children('option:selected').val();
		    var objSelect =  $(this).parent().parent().find(".cxxzSelect");
		    if (!Tools.isEmpty(dydj)&&!Tools.isEmpty(dxflfs)&&!Tools.isEmpty(dxxh)) {
		    	serialConfig.appendCxxzOption(type,dxxh,dydj,dxflfs,objSelect);
			}
		});
		// 导线分裂方式下拉框
		$(".dxflfsSelect").on("change",function(){
			var type = $(this).parent().parent().attr("wireway_type");
			var dxflfs = $(this).parent().parent().find(".dxflfsSelect").children('option:selected').val();
		    var dydj = $(this).parent().parent().find(".dydjSelect").children('option:selected').val();
		    var dxxh = $(this).parent().parent().find(".dxxhSelect").children('option:selected').val();
		    var objSelect =  $(this).parent().parent().find(".cxxzSelect");
		    if (!Tools.isEmpty(dydj)&&!Tools.isEmpty(dxflfs)&&!Tools.isEmpty(dxxh)) {
		    	serialConfig.appendCxxzOption(type,dxxh,dydj,dxflfs,objSelect);
			}
		});
		// 串型选择下拉框
		$(".cxxzSelect").on("change",function(){
			var cxxz=$(this).children('option:selected').text();
			var type = $(this).parent().parent().attr("wireway_type");
			var dxflfs = $(this).parent().parent().find(".dxflfsSelect").children('option:selected').val();
			var dydj = $(this).parent().parent().find(".dydjSelect").children('option:selected').val();
			var dxxh = $(this).parent().parent().find(".dxxhSelect").children('option:selected').val();
			var cxsbcode = !(type==4||type==5)?dxxh + dydj + dxflfs + cxxz:dxxh + dydj + cxxz;	//查询识别代码
			var option = '<option selected disabled style="display: none">';
			for (var i = 0; i < CxxzList.length; i++) {
				var cbcode = CxxzList[i].cbdm;	//识别代码
				if (CxxzList[i].wirewayType== type && cbcode == cxsbcode) {
					var jyzphhz = CxxzList[i].jyzphhzname;
					var condition = switchData(jyzphhz,['70kN','100kN','120kN','160kN','210kN'],['16','16','16','20','24']);
					var condition1 = dydj + switchData(type,['1','2','3','4','5'],['悬垂串','耐张串','悬垂或耐张串','地线悬垂串','地线耐张串']) + condition;
					var condition2 = switchData(type,['1','2','3','4','5'],['悬垂串','耐张串','悬垂或耐张串','地线悬垂串','地线耐张串']) + jyzphhz;
					var condition3 = "悬垂或耐张串" + jyzphhz;
					for (var j = 0; j < Insulatorlist.length; j++) {
						var voltageGrade = Tools.isEmpty(Insulatorlist[j].voltageGrade)?"":Insulatorlist[j].voltageGrade;
						var adapterSerialType = Tools.isEmpty(Insulatorlist[j].adapterSerialType)?"":Insulatorlist[j].adapterSerialType;
						var connectionMark = Tools.isEmpty(Insulatorlist[j].connectionMark)?"":Insulatorlist[j].connectionMark;
						var breakingLoad = Tools.isEmpty(Insulatorlist[j].breakingLoad)?"":Insulatorlist[j].breakingLoad;
						var insulatorCondition = !Tools.isEmpty(Insulatorlist[j].voltageGrade)?voltageGrade + adapterSerialType + connectionMark:voltageGrade + adapterSerialType + breakingLoad;
						if (condition1==insulatorCondition||condition2==insulatorCondition||condition3==insulatorCondition) {
							option += '<option value="'+Insulatorlist[j].insulatorModel+'">'+Insulatorlist[j].insulatorModel+'</option>';
						}
					}
					
					$(this).parent().parent().find(".cktytInput").prop("value",CxxzList[i].cktyt);	//查看套用图		
					$(this).parent().parent().find(".cktytInput").prop("data_picname",CxxzList[i].pictureName);	//查看套用图图名		
					$(this).parent().parent().find(".ltjjxhInput").prop("value",CxxzList[i].ltjjxh);	//联塔金具型号	
					$(this).parent().parent().find(".lsfxInput").prop("value",CxxzList[i].lsfx);	//螺栓方向
					$(this).parent().parent().find(".bjjInput").prop("value",CxxzList[i].bjj);		//板间距L
					$(this).parent().parent().find(".lszjInput").prop("value",CxxzList[i].lszj);	//螺栓直径M	
					$(this).parent().parent().find(".kkkdInput").prop("value",CxxzList[i].kkkd);	//开口宽度C	
					$(this).parent().parent().find(".kksdInput").prop("value",CxxzList[i].kksd);	//插入深度H
				}
			}
			$(this).parent().parent().find(".jyzxhSelect").html(option);
			
		
			serialConfig.paddingData(type,cxxz);
		});
		// 绝缘子型号下拉框
		$(".jyzxhSelect").on("change",function(){
			var type = $(this).parent().parent().attr("wireway_type");
			var jyzxh = $(this).children('option:selected').val();
			var cdh = $(this).parent().parent().find(".cdhInput").val();	// 串代号
			var mljyzsl = $(this).parent().parent().find(".mljyzslInput").val();	//每联绝缘子数量	
			var dydj = $(this).parent().parent().find(".dydjSelect").children('option:selected').val(); // 电压等级
			var cxxz=$(this).parent().parent().find(".cxxzSelect").children('option:selected').text();	//	串行选择
			var objInput =  $(this).parent().parent().find(".jyzcpdbjInput");
			if(!Tools.isEmpty(cdh)&&!Tools.isEmpty(jyzxh)&&!Tools.isEmpty(mljyzsl)){
				serialConfig.computePlacesDistance(type,dydj,jyzxh,mljyzsl,objInput);
				serialConfig.paddingData(type,cxxz);
			}
		});
		// 串代号文本框
		$(".cdhInput").on("change",function(){
			var type = $(this).parent().parent().attr("wireway_type");
			var cdh = $(this).val();
			var mljyzsl = $(this).parent().parent().find(".mljyzslInput").val();	//每联绝缘子数量	
			var jyzxh = $(this).parent().parent().find(".jyzxhSelect").children('option:selected').val();	// 绝缘子型号
			var dydj = $(this).parent().parent().find(".dydjSelect").children('option:selected').val(); // 电压等级
			var cxxz=$(this).parent().parent().find(".cxxzSelect").children('option:selected').text();	//	串行选择
			var objInput =  $(this).parent().parent().find(".jyzcpdbjInput");
			if(!Tools.isEmpty(cdh)&&!Tools.isEmpty(jyzxh)&&!Tools.isEmpty(mljyzsl)){
				serialConfig.computePlacesDistance(type,dydj,jyzxh,mljyzsl,objInput);
				serialConfig.paddingData(type,cxxz);
			}
		});
		// 每联绝缘子数量文本框
		$(".mljyzslInput").on("change",function(){
			var type = $(this).parent().parent().attr("wireway_type");
			var mljyzsl = $(this).val();
			var cdh = $(this).parent().parent().find(".cdhInput").val();	// 串代号
			var jyzxh = $(this).parent().parent().find(".jyzxhSelect").children('option:selected').val();	// 绝缘子型号
			var dydj = $(this).parent().parent().find(".dydjSelect").children('option:selected').val(); // 电压等级
			var cxxz=$(this).parent().parent().find(".cxxzSelect").children('option:selected').text();	//	串行选择
			var objInput =  $(this).parent().parent().find(".jyzcpdbjInput");
			if(!Tools.isEmpty(cdh)&&!Tools.isEmpty(jyzxh)&&!Tools.isEmpty(mljyzsl)){
				serialConfig.computePlacesDistance(type,dydj,jyzxh,mljyzsl,objInput);
				serialConfig.paddingData(type,cxxz);
			}
		});
}

//加载目录,套用说明,套图信息表数据
serialConfig.prototype.paddingData = function(type,cxxz) {
	//	套图信息表
	var infoDataList = [['序列','工程名称','图号','图名','需晒份数','备注']]; 
	var count = 1;
	$(".cktytInput").each(function(i,obj){  //第一个参数表示索引下标，第二个参数表示当前索引元素
		if (!Tools.isEmpty(obj.value)) {
			infoDataList.push([count,'110kV～220kV架空输电线路标准化设计',obj.value,obj.getAttribute('data_picname'),1,'']);  
			count++;
		}
	});
	if (!Tools.isEmpty(Zcell1)) {
		Zcell1.GetSheet(0).LoadArrData(infoDataList);
	}
	
	count = 1;
	var indexDateList = [];
	var descriptionDataList = [];
	var jcjsh = $("#jcjsh").html();	//	卷  册  检  索  号
	$(".cdhInput").each(function(i,obj){
		var cdh = obj.value;
		if (!Tools.isEmpty(cdh)) {
			var dxxhVal = $(".dxxhSelect")[i].value; 
			var dxflfsVal = $(".dxflfsSelect")[i].value; 
			var dxxhVal = $(".dxxhSelect")[i].value; 
			var jyzls = $(".cxxzSelect")[i].value; //	绝缘子联数
			var mljyzsl = $(".mljyzslInput")[i].value;;//  每联绝缘子数量
			var dxbcw = (type==1)?("FYH-"+ dxxhVal.substring(dxxhVal.length-6,dxxhVal.length)):"";		//导线包缠物 
			var jyzxhVal = $(".jyzxhSelect")[i].value; 	//	绝缘子型号
			var selectedIndex = $(".cxxzSelect")[i].selectedIndex;
			var ccode = $(".cxxzSelect")[i][selectedIndex].attributes[1].value;	//	串代号
			var jyzlx = '';	//	绝缘子类型
			var jyzzl = '';	//	绝缘子重量
			var jyzcd = '';	//	绝缘子长度
			var jyzsl = '';	//	绝缘子数量
			if (!Tools.isEmpty(jyzxhVal)) {
				for (var j = 0; j < Insulatorlist.length; j++) {
					if (jyzxhVal==Insulatorlist[j].insulatorModel) {
						jyzlx = Insulatorlist[j].insulatorType;
						jyzzl = Insulatorlist[j].pieceWeight;
						jyzcd = Insulatorlist[j].height;
						jyzsl = jyzls + "×" + mljyzsl + "=" + (mljyzsl*jyzls) + Insulatorlist[j].insulatorUnit;
					}
				}
			}
			if (!Tools.isEmpty(dxxhVal)) {
				var _pictureName = switchData(dxflfsVal,["双分裂（水平）","双分裂（垂直）","四分裂"],["2×","2×","4×"]) + dxxhVal + "导线" + cxxz.substring(10,12) + cxxz.substring(2,9) + "("+cdh+")";
				var _pictureNumber = jcjsh.substring(4,jcjsh.length) + "-" + (count<10?"0"+count:count);
				var _pictureCode = $(".cktytInput")[i].value;
				indexDateList.push([_pictureNumber,_pictureName,1,_pictureCode]);  
				descriptionDataList.push([count,_pictureNumber,_pictureName,ccode,dxxhVal,dxbcw,jyzxhVal,jyzlx,jyzcd,jyzzl,jyzsl,""]);  
				count++;
			}
		}
	});
	//  目录20串
	if (!Tools.isEmpty(Zcell2)) {
		for (var i = 0; i < indexDateList.length; i++) {
			Zcell2.GetSheet(0).SetCellValue(3,12+i,indexDateList[i][0]);// 图号
			Zcell2.GetSheet(0).SetCellValue(9,12+i,indexDateList[i][1]);// 图名
			Zcell2.GetSheet(0).SetCellValue(19,12+i,indexDateList[i][2]);
			Zcell2.GetSheet(0).SetCellValue(20,12+i,indexDateList[i][3]);
		}
	}
	//套用说明20串
	if (!Tools.isEmpty(Zcell3)) {
		for (var i = 0; i < descriptionDataList.length; i++) {
			Zcell3.GetSheet(0).SetCellValue(3,5+i,descriptionDataList[i][0]);	// 序号
			Zcell3.GetSheet(0).SetCellValue(4,5+i,descriptionDataList[i][1]);	// 图号
			Zcell3.GetSheet(0).SetCellValue(5,5+i,descriptionDataList[i][2]);	// 图名
			Zcell3.GetSheet(0).SetCellValue(6,5+i,descriptionDataList[i][3]);	// 套用金具串名称
			Zcell3.GetSheet(0).SetCellValue(7,5+i,descriptionDataList[i][4]);	// 套用金具串图中适用导线/地线标称截面
			Zcell3.GetSheet(0).SetCellValue(8,5+i,descriptionDataList[i][5]);	// 导线包缠物
			Zcell3.GetSheet(0).SetCellValue(9,5+i,descriptionDataList[i][6]);	// 绝缘子型号
			Zcell3.GetSheet(0).SetCellValue(10,5+i,descriptionDataList[i][7]);	// 绝缘子类型
			Zcell3.GetSheet(0).SetCellValue(12,5+i,descriptionDataList[i][8]);	// 绝缘子串长度
			Zcell3.GetSheet(0).SetCellValue(14,5+i,descriptionDataList[i][9]);	// 绝缘子串重量
			Zcell3.GetSheet(0).GetCell (16,5+i).textContent = "";
			Zcell3.GetSheet(0).SetCellType(16,5+i,{
		        "code": "object",
		        "object":descriptionDataList[i][10]
		    });	// 绝缘子数量
			Zcell3.GetSheet(0).SetCellValue(17,5+i,descriptionDataList[i][11]);	// 重锤式均压环重量G3(kg/支)
		}
	}
	
	
}

serialConfig.prototype.initData = function() {
	var url= basePath + 'serialConfig/getInitData.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": "",
		"success":function(data){
			if (!Tools.isEmpty(data)) {
				serialConfig.initTable(data.dxxhList,data.dxfxList,data.dydjList);
				serialConfig.dataConform(data);
				Insulatorlist = data.insulatorlist;
				serialConfig.selectListener();
			}
		},
		"error": function(e) {
			layer.msg("服务器出错");
			console.info(e);
		}
	});
	
}

serialConfig.prototype.initProjectData = function() {
	let url= basePath + 'common/getMainInfoList.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": "",
		"success":function(data){
			if (!Tools.isEmpty(data)) {
				let option = "";
				for (var i = 0; i < data.length; i++) {
					var arr = [];
					arr.push(data[i].projectCode);
					arr.push(data[i].id);
					projectCodeAndId.push(arr); 
					
					option += '<option value="'+data[i].id+'">'+data[i].projectName+'</option>';
					
				}
				$("#mainInfo").html(option);
			}
		},
		"error": function(e) {
			layer.msg("服务器出错");
			console.info(e);
		}
	});
}
serialConfig.prototype.searchProjectDetail = function() {
	layer.load(2,{shade: [0.1, '#393D49']});
	let sc_conductor_XXC = [];	//	导线悬垂串
	let sc_conductor_NZC = [];	//	导线耐张串
	let sc_conductor_TXC = [];	//	跳线悬垂串
	let sc_ground_XXC = [];		//	地线悬垂串
	let sc_ground_NZC = [];		//	地线耐张串
	let id = $("#mainInfo").val();
	let url= basePath + 'Parts/getConfigDataById.action';
	$.ajax({
		"type": "post",	// post防止中文参数乱码
		"url": url,
		"data": {"id":id},
		"success":function(data){
			var wireDataMap = JSON.parse(data.wireData);
			for (var key in wireDataMap) {  
				if (null!==wireDataMap[key]||""!==wireDataMap[key]||undefined!==wireDataMap[key]) {
					var wireDataList = wireDataMap[key];
					for (var i = 0; i < wireDataList.length; i++) {
						if (!Tools.isEmpty(wireDataList[i][1])) {
							sc_conductor_XXC.push([wireDataList[i][1],key]);
						}
						if (!Tools.isEmpty(wireDataList[i][4])) {
							sc_conductor_NZC.push([wireDataList[i][4],key]);
						}
						if (!Tools.isEmpty(wireDataList[i][7])) {
							sc_conductor_TXC.push([wireDataList[i][7],key]);
						}
					}
				}
	        }
			var groundDataMap = JSON.parse(data.groundData);
			for (var key in groundDataMap) {  
				if (null!==groundDataMap[key]||""!==groundDataMap[key]||undefined!==groundDataMap[key]) {
					var groundDataList = groundDataMap[key];
					for (var i = 0; i < groundDataList.length; i++) {
						if (!Tools.isEmpty(groundDataList[i][1])) {
							sc_ground_XXC.push([groundDataList[i][1],key]);
						}
						if (!Tools.isEmpty(groundDataList[i][4])) {
							sc_ground_NZC.push([groundDataList[i][4],key]);
						}
					}
				}
			}
			insertTableData({"sc_conductor_XXC":sc_conductor_XXC,"sc_conductor_NZC":sc_conductor_NZC,
				"sc_conductor_TXC":sc_conductor_TXC,"sc_ground_XXC":sc_ground_XXC,"sc_ground_NZC":sc_ground_NZC});
			
			/*根据导线型号给电压等级下拉框和导线分裂方式下拉框赋值*/
			var projectId = $("#mainInfo option:selected").val();//获取当前工程id
			//获取导线悬垂串的导线型号
			var wireNameList = [];
			$("#daoxianXCC_table").find('tbody').each(function (){
				var ntr = $(this).find('tr');
				for(var i=0;i<ntr.length;i++){
					 var tds=ntr.eq(i).find('td');
					 if(i == 0){
						 wireNameList.push( tds.eq(2).children('select').val());//导线名称
					 }else{
						 if( tds.eq(1).children('select').val()!=null){
							 wireNameList.push( tds.eq(1).children('select').val());//导线名称
						 }
						
					 }
				     
				 }
			 })
			 
			 //获取导线耐张段的导线型号
			var wireNameList2 = [];
			$("#daoxianNZC_table").find('tbody').each(function (){
				var ntr = $(this).find('tr');
				for(var i=0;i<ntr.length;i++){
					 var tds=ntr.eq(i).find('td');
					 if(i == 0){
						 wireNameList2.push( tds.eq(2).children('select').val());//导线名称
					 }else{
						 if( tds.eq(1).children('select').val()!=null){
							 wireNameList2.push( tds.eq(1).children('select').val());//导线名称
						 }
						
					 }
				     
				 }
			 })
			 
			 //获取跳线串的导线型号
			 var wireNameList3 = [];
			$("#tiaoxianC_table").find('tbody').each(function (){
				var ntr = $(this).find('tr');
				for(var i=0;i<ntr.length;i++){
					 var tds=ntr.eq(i).find('td');
					 if(i == 0){
						 wireNameList3.push( tds.eq(2).children('select').val());//导线名称
					 }else{
						 if( tds.eq(1).children('select').val()!=null){
							 wireNameList3.push( tds.eq(1).children('select').val());//导线名称
						 }
						
					 }
				     
				 }
			 })
			 
			 //获取地线悬垂串的导线型号
			 var wireNameList4 = [];
			$("#dixianXCC_table").find('tbody').each(function (){
				var ntr = $(this).find('tr');
				for(var i=0;i<ntr.length;i++){
					 var tds=ntr.eq(i).find('td');
					 if(i == 0){
						 wireNameList4.push( tds.eq(2).children('select').val());//导线名称
					 }else{
						 if( tds.eq(1).children('select').val()!=null){
							 wireNameList4.push( tds.eq(1).children('select').val());//导线名称
						 }
						
					 }
				     
				 }
			 })
			 
			 //获取地线耐张串的导线型号
			 var wireNameList5 = [];
			$("#dixianNZC_table").find('tbody').each(function (){
				var ntr = $(this).find('tr');
				for(var i=0;i<ntr.length;i++){
					 var tds=ntr.eq(i).find('td');
					 if(i == 0){
						 wireNameList5.push( tds.eq(2).children('select').val());//导线名称
					 }else{
						 if( tds.eq(1).children('select').val()!=null){
							 wireNameList5.push( tds.eq(1).children('select').val());//导线名称
						 }
						
					 }
				     
				 }
			 })
			 
			 var url = basePath+"serialConfigCYH/queryVoltagAndWire.action"; 
			 var param={
					"projectId":projectId,
					"wireNameList":wireNameList
			 }
			 $.ajax({
		        type: "post",//请求方式
		        url: url,
		        data:{
		        	 projectId:projectId,
		        	 wireNameList:wireNameList,
		        	 wireNameList2:wireNameList2,
		        	 wireNameList3:wireNameList3,
		        	 wireNameList4:wireNameList4,
		        	 wireNameList5:wireNameList5
     	      },
		        dataType: "json",
		　　　         success: function(data){
		　　　        	 
		　　　        	      
		           if( !Tools.isEmpty(data) ){
		        	   //导线耐张段
		        	   var listlist = data.listList;
		        	   //110kV
		        	   $("#daoxianXCC_table").find('tbody').each(function (){
		   				var ntr = $(this).find('tr');
		   				  
		        	   for(var i=0;i<listlist.length;i++){
		        		   var tds=ntr.eq(i).find('td');
		        		   var list = listlist[i];
		        		   var Voltage = Math.floor(list[0]) + "kV";
		        		   
		        		   //$(".dydjSelect").text(Voltage);
		        		   if(i==0){
		        			   tds.eq(3).children('select').val(Voltage);
		        			   tds.eq(4).children('select').val(list[1]);
		        		   }else{
		        			   tds.eq(2).children('select').val(Voltage);
		        			   tds.eq(3).children('select').val(list[1]);
		        		   }
		        	   }
		        	   })
		        	   
		        	   //导线耐张串
		        	   var listlist2 = data.listList2;
		        	   var tableId2 = $("#daoxianNZC_table");
		        	   util(tableId2,listlist2);
		        	   //跳线串
		        	   var listlist3 = data.listList3;
		        	   var tableId3 = $("#tiaoxianC_table");
		        	   util(tableId3,listlist3);
		        	   //地线悬垂串
		        	   var listlist4 = data.listList4;
		        	   var tableId4 = $("#dixianXCC_table");
		        	   util(tableId4,listlist4);
		        	   //地线耐张串
		        	   var listlist5 = data.listList5;
		        	   var tableId5 = $("#dixianNZC_table");
		        	   util(tableId5,listlist5);
		        	   
		           }else{
		        	   alert("查询失败");
		           }
		        },
		        error:function(e){
		        	layer.msg("服务器出错");
					console.info(e);
		        }
		      });
		},
		"error": function(e) {
			layer.closeAll();
			layer.msg("服务器出错");
			console.info(e);
		}
	});
	
	
}

var insertTableData = function(param){
	clearTableData();
	for (var i = 0; i < param.sc_conductor_XXC.length; i++) {
		$("#daoxianXCC .cdhInput").eq(i).val(param.sc_conductor_XXC[i][0]);
		$("#daoxianXCC .dxxhSelect").eq(i).val(param.sc_conductor_XXC[i][1]);
	}
	for (var i = 0; i < param.sc_conductor_NZC.length; i++) {
		$("#daoxianNZC .cdhInput").eq(i).val(param.sc_conductor_NZC[i][0]);
		$("#daoxianNZC .dxxhSelect").eq(i).val(param.sc_conductor_NZC[i][1]);
	}
	for (var i = 0; i < param.sc_conductor_TXC.length; i++) {
		$("#tiaoxianC .cdhInput").eq(i).val(param.sc_conductor_TXC[i][0]);
		$("#tiaoxianC .dxxhSelect").eq(i).val(param.sc_conductor_TXC[i][1]);
	}
	for (var i = 0; i < param.sc_ground_XXC.length; i++) {
		$("#dixianXCC .cdhInput").eq(i).val(param.sc_ground_XXC[i][0]);
		$("#dixianXCC .dxxhSelect").eq(i).val(param.sc_ground_XXC[i][1]);
	}
	for (var i = 0; i < param.sc_ground_NZC.length; i++) {
		$("#dixianNZC .cdhInput").eq(i).val(param.sc_ground_NZC[i][0]);
		$("#dixianNZC .dxxhSelect").eq(i).val(param.sc_ground_NZC[i][1]);
	}
}
// 清空数据
var clearTableData = function (){
	Zcell1 = null;
	Zcell2 = null;
	Zcell3 = null;
	$("#infoContainer").html("");
	$("#descriptionContainer").html("");
	$("#indexContainer").html("");
	serialConfig.initCellTableData();
	var val = $("#mainInfo").val();
	$(":input").val("");
	$(":selected").val("");
	$("#mainInfo").val(val);
	layer.closeAll();
}
serialConfig.prototype.initTable = function(dxxhList,dxfxList,dydjList) {
	// 表头
	var thead = '<tr><th style="width: 30px;"></th><th style="width: 50px;">串代号</th><th style="width: 170px;">导线型号</th><th style="width: 130px;">电压等级</th>'
		+'<th style="width: 120px;">导线分裂方式</th><th style="width: 600px;">串型选择</th><th style="width: 160px;">绝缘子型号</th>'
		+'<th style="width: 100px;">每联绝<br>缘子数量</th><th style="width: 120px;">绝缘子串爬电<br>比距（mm/kV）</th><th style="width: 150px;">查看套用图</th>'
		+'<th style="width: 120px;">联塔金具型号</th><th style="width: 100px;">螺栓方向<br>(以导线为X轴)</th><th style="width: 100px;">板间距L</th>'
		+'<th style="width: 100px;">螺栓直径M</th><th style="width: 100px;">开口宽度C</th><th style="width: 100px;">插入深度H</th></tr>';
	for (var z = 0; z < 5; z++) {
		var tbody = '';
		var dxxhSelect = ''; 	// 导线型号下拉框
		var dydjSelect = '';	// 电压等级下拉框
		var dxflfsSelect = '';	// 导线分裂方式下拉框
		var cxxzSelect = '';	// 串型选择下拉框
		var jyzxhSelect = '';	// 绝缘子型号下拉框
		/* 导线型号下拉框 */
		dxxhSelect += '<select class="dxxhSelect" style="width:100%;background:#00B050"><option selected disabled style="display: none"></option>';
		if (!Tools.isEmpty(dxxhList)) {
			for (var i = 0; i < dxxhList.length; i++) {
				if (dxxhList[i][0]==(z+1)) {
					var dxdx = !Tools.isEmpty(dxxhList[i][2])?dxxhList[i][2]:dxxhList[i][1];	//	等效导线
					dxxhSelect +='<option value="'+dxdx+'">'+dxxhList[i][1]+'</option>'
				}
			}
		}
		dxxhSelect += '</select>';
		/* 电压等级下拉框 */
		var color = !(z==4||z==3)?'#00B050':'#FFFFFF';
		var option = !(z==4||z==3)?'<option selected disabled style="display: none"></option>':'';
		dydjSelect += '<select class="dydjSelect" style="width:100%;background:'+color+'">';
		if (!Tools.isEmpty(dydjList)) {
			for (var i = 0; i < dydjList.length; i++) {
				if (dydjList[i][0]==(z+1)) {
					dydjSelect +='<option val="'+dydjList[i][1]+'">'+dydjList[i][1]+'</option>'+ option;
					
				}
			}
		}
		dydjSelect += '</select>';
		/* 导线分裂方式下拉框 */
		dxflfsSelect += '<select class="dxflfsSelect" style="width:100%;background:'+color+'"><option selected disabled style="display: none"></option>';
		if (!Tools.isEmpty(dxfxList)) {
			for (var i = 0; i < dxfxList.length; i++) {
				if (dxfxList[i][0]==(z+1)) {
					dxflfsSelect +='<option val="'+dxfxList[i][1]+'">'+dxfxList[i][1]+'</option>'
				}
			}
		}
		dxflfsSelect += '</select>';
		/* 串型选择下拉框 */
		cxxzSelect += '<select class="cxxzSelect" style="width:100%;background:#92D050"><option selected disabled style="display: none"></option></select>';
		/* 绝缘子型号下拉框 */
		jyzxhSelect += '<select class="jyzxhSelect" style="width:100%;background:#92D050"><option selected disabled style="display: none"></option></select>';
		
		var colunm1Data = switchData(z,[0,1,2,3,4],['导<br>线<br>悬<br>垂<br>串','导<br>线<br>耐<br>张<br>串','跳<br>线<br>串','地<br>线<br>悬<br>垂<br>串','地<br>线<br>耐<br>张<br>串']);
		for (var i = 0; i < 10; i++) {
			var colunm1 = i==0?'<tr wireway_type="'+(z+1)+'"><td rowspan="10">'+colunm1Data+'</td>':'<tr wireway_type="'+(z+1)+'">';
			tbody += colunm1 +'<td><input type="text" class="insideInput cdhInput"/></td><td style="background:#00B050">'+dxxhSelect+'</td><td style="background:'+color+'">'+dydjSelect+'</td>'
			+ '<td style="background:'+color+'">'+dxflfsSelect+'</td><td style="background:#92D050">'+cxxzSelect+'</td><td style="background:#92D050">'+jyzxhSelect+'</td>'
			+ '<td style="background:#FFFF00"><input type="text" class="insideInput mljyzslInput"  style="background:#FFFF00"/></td>'
			+ '<td><input type="text" class="insideInput jyzcpdbjInput" value="0.00"></td><td><input type="text" class="insideInput cktytInput" /></td>'
			+ '<td><input type="text" class="insideInput ltjjxhInput" /></td><td><input type="text" class="insideInput lsfxInput" /></td>'
			+ '<td><input type="text" class="insideInput bjjInput" /></td><td><input type="text" class="insideInput lszjInput" /></td>'
			+ '<td><input type="text" class="insideInput kkkdInput" /></td><td><input type="text" class="insideInput kksdInput" /></td></tr>';
		}
		var tbodyObj = switchData(z+1,[1,2,3,4,5],
				['#daoxianXCC_table','#daoxianNZC_table','#tiaoxianC_table','#dixianXCC_table','#dixianNZC_table']);
		$(tbodyObj+' thead').html(thead);
		$(tbodyObj+' tbody').html(tbody);
	}


}

serialConfig.prototype.dataConform = function(data){

	/* 串型选择:"导线"+cxname+"-"+jyzlsname+"-"+jjgdslname+"-"+xjname+"-"+jyzphhzname+"-"+jyzxsname+"-"+nzjyzcname+"-"+jyzljjname+"-"+zdxfljjname */
	var tempstr = '';
	if (!Tools.isEmpty(data)) {
		for (var i = 0; i < data.fittinglist.length; i++) {
			var wldesc = data.fittinglist[i].materialDescription;	// 物料描述
			var jyzlsname = data.fittinglist[i].insulatorCascadeName;// 绝缘子联数名称
			var jjgdslname = data.fittinglist[i].fittingLinkNumberName;// 金具挂点数量名称
			var xjname = data.fittinglist[i].clampName;// 线夹名称
			var jyzphhzname = data.fittinglist[i].insulatorBreakingLoadName;// 绝缘子破坏荷载名称
			var jyzxsname = data.fittinglist[i].insulatorTypeName; // 绝缘子型式名称
			var nzjyzcname = data.fittinglist[i].tensionInsulatorStringName; // 耐张绝缘子串名称
			var jyzljjname = data.fittinglist[i].insulatorJointSpacingName;	// 绝缘子联间距名称
			var zdxfljjname = data.fittinglist[i].conductorBundleSpacingName;	// 子导线分裂间距名称
			var cxname = data.fittinglist[i].stringTypeName;	// 串型名称
			var wirewayType = switchData((data.fittinglist[i].stringSelect).substring(0,5),['导线悬垂串','导线耐张串','跳线-单联','跳线-双联','地线悬垂串','地线耐张串'],['1','2','3','3','4','5']);	// 电缆类型
			var dxxh = data.fittinglist[i].wireType;	// 导线型号
			var dydjname = data.fittinglist[i].voltageGradeName;  //  电压等级名称
			var dxflfsname = data.fittinglist[i].conductorBundleName;  //  导线分裂方式名称
			var isExistPicture = data.fittinglist[i].isExistPicture;  //  是否有被套图
			
			var cktyt = data.fittinglist[i].linkPictureNumber;  //  查看套用图
			var pictureName = data.fittinglist[i].pictureName;  //  查看套用图名称
			var ltjjxh = data.fittinglist[i].linkFittingType;  //  联塔金具型号
			var lsfx = data.fittinglist[i].boltsDirection;  //  螺栓方向
			var bjj = data.fittinglist[i].placesDistance;  //  板间距L
			var lszj = data.fittinglist[i].boltsDiameter;  //  螺栓直径M
			var kkkd = data.fittinglist[i].openingWidthC;  //  开口宽度C
			var kksd = data.fittinglist[i].openingWidthH;	//  开口深度H
			var cxxz = data.fittinglist[i].stringSelect;  //  串行选择
			
			var cbdm = data.fittinglist[i].distinguishCode;	// 识别代码
			var jyzlsCode = data.fittinglist[i].insulatorNumberCode;	// 绝缘子联数代号
			var ccode = data.fittinglist[i].stringCode;	//	串代号
			CxxzList.push({
				"dxxh":dxxh,"dydjname":dydjname,"dxflfsname":dxflfsname,"cxname":cxname,"cxxz":cxxz,"wirewayType":wirewayType,
				"jyzphhzname":jyzphhzname,"bjj":bjj,"lszj":lszj,"kkkd":kkkd,"kksd":kksd,"cbdm":cbdm,"jyzlsCode":jyzlsCode,
				"cktyt":cktyt,"ltjjxh":ltjjxh,"lsfx":lsfx,"isExistPicture":isExistPicture ,"pictureName":pictureName,"ccode":ccode
			});
		}
	}
}

serialConfig.prototype.initCellTableData = function(){
	
	changeCellTable();
	infoCellTable();
	descriptionCellTable();
	indexCellTable();
}

/**
 * 套图信息表
 */
var infoCellTable = function(){
	// 创建JSCELL，指明承载容器
	Zcell1 = new ZCell(document.getElementById("infoContainer"));
	// 创建表，并指定列，行数
	Zcell1.InserSheet(0, 6, 41);
	// 加载数据
	Zcell1.GetSheet(0).LoadArrData([['序列','工程名称','图号','图名','需晒份数','备注']]);
	// 设置样式
	for (var i = 0; i < 40; i++) {
		Zcell1.GetSheet(0).SetCellStyle(6, i+2, {
			"background-color" : "#FFFF00"
		});
	}
	// 设置列宽
	Zcell1.GetSheet(0).SetColWidth(1, 62);
	Zcell1.GetSheet(0).SetColWidth(2, 300);
	Zcell1.GetSheet(0).SetColWidth(3, 160);
	Zcell1.GetSheet(0).SetColWidth(4, 300);
	Zcell1.GetSheet(0).SetColWidth(5, 62);
	Zcell1.GetSheet(0).SetColWidth(6, 200);
}

/**
 * 目录(20串)
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
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(9));
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
	//单元格赋值
	var url = basePath+"";
    var projectName = $("#mainInfo option:selected").text();//获取当前工程名称
	var projectId = $("#mainInfo option:selected").val();//获取当前工程id
	var projectBookletNum = "";//卷册号
	for(var i=0;i<projectCodeAndId.length;i++){
    	var arr = projectCodeAndId[i];
    	if(arr[1] == projectId){
    		projectBookletNum ="031-"+ arr[0] + "-D0104";
    	}
    }
    	
	/*$.ajax({
		"type": "post",	//post防止中文参数乱码
		"url": url,
		"data":{projectId:projectId},
		"dataType": "json",  
		"success": function(data){
			
		},
		"error": function(e) {
			console.info(e);
		}
	});*/
    
	Zcell2.GetSheet(0).SetCellType(3,5,{
        "code": "object",
        "object":"<div id= 'jcjsh'>"+projectBookletNum+"</div>"
    })
    
    
    
	setCellValue(Zcell2,0,
			[[3,4],[20,2],[23,2],[3,9],[10,4],[20,4],[21,4],[23,4],[10,5],
				[11,5],[14,5],[15,5],[16,5],[18,5],[19,5],[20,5],[22,5],[23,5],[24,5],
					[10,6],[12,6],[10,7],[12,7],[13,7],[14,7],[15,7],[18,7],[19,7],[20,7],[22,7],[23,7],[24,7],
						[10,8],[12,8],[19,8],[21,8],[10,9],[12,9],[19,9],[21,9]],
				["  卷  册  检  索  号","第 1 页","共 2 页",getCurrentDate(3),projectName,
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
 * 套用说明(20串)
 */
var descriptionCellTable = function(){
	const rowHeight = 0.35;	//	行高比
	// 创建JSCELL，指明承载容器
	Zcell3 = new ZCell(document.getElementById("descriptionContainer"));
	// 创建表，并指定列，行数
	Zcell3.InserSheet(0, 20, 57);
	// 加载数据
	Zcell3.GetSheet(0).LoadArrData([]);
	// 设置列宽
	setConversionColWidth(Zcell3,0,
			[12.75,0.92,2.38,16.63,45.5,22.38,14.5,11,16.25,10.25,3.5,7.13,3.75,5.88,4.38,3.63,6.75,7.75,3.78,1.62]);
	// 设置行高
	for (var i = 1; i <= 57; i++) {
		if (i==1) {
			Zcell3.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(15)*rowHeight);
		}else if (i==2) {
			Zcell3.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(13.5)*rowHeight);
		}else if (i==3) {
			Zcell3.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(18.75)*rowHeight);
		}else if (i==4) {
			Zcell3.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(53.25)*rowHeight);
		}else if (i>=5&&i<=52) {
			Zcell3.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(13.5)*rowHeight);
		}else if (i==53) {
			Zcell3.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(17.25)*rowHeight);
		}else if (i==54) {
			Zcell3.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(18.75)*rowHeight);
		}else if (i==55&&i==56) {
			Zcell3.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(20.4)*rowHeight);
		}else if (i==57) {
			Zcell3.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(15.3)*rowHeight);
		}
	}
	//合并单元格
	Zcell3.GetSheet(0).MergeCells(3,3,3,4);
	Zcell3.GetSheet(0).MergeCells(4,3,4,4);
	Zcell3.GetSheet(0).MergeCells(5,3,5,4);
	Zcell3.GetSheet(0).MergeCells(6,3,8,3);
	Zcell3.GetSheet(0).MergeCells(9,3,18,3);
	for (var i = 4; i <= 24; i++) {
		Zcell3.GetSheet(0).MergeCells(10,i,11,i);
		Zcell3.GetSheet(0).MergeCells(12,i,13,i);
		Zcell3.GetSheet(0).MergeCells(14,i,15,i);
		Zcell3.GetSheet(0).MergeCells(16,i,17,i);
	}
//	Zcell3.GetSheet(0).MergeCells(11,52,12,52);
	Zcell3.GetSheet(0).MergeCells(11,55,12,55);
	Zcell3.GetSheet(0).MergeCells(11,56,12,56);
	Zcell3.GetSheet(0).MergeCells(8,51,12,52);
	Zcell3.GetSheet(0).MergeCells(13,51,17,52);
	Zcell3.GetSheet(0).MergeCells(18,51,18,52);
	Zcell3.GetSheet(0).MergeCells(19,51,19,52);
	Zcell3.GetSheet(0).MergeCells(8,54,8,55);
	Zcell3.GetSheet(0).MergeCells(11,53,12,53);
	Zcell3.GetSheet(0).MergeCells(11,54,12,54);
	Zcell3.GetSheet(0).MergeCells(13,53,19,55);
	Zcell3.GetSheet(0).MergeCells(14,56,17,56);
	Zcell3.GetSheet(0).MergeCells(3,2,18,2);
	for (var i = 26; i <= 36; i++) {
		Zcell3.GetSheet(0).MergeCells(3,i,18,i);
	}
	//	样式
	for (var i = 3; i <= 18; i++) {
		for (var j = 3; j <= 24; j++) {
			Zcell3.GetSheet(0).SetCellStyle(i, j, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 8; i <= 19; i++) {
		for (var j = 51; j <= 56; j++) {
			Zcell3.GetSheet(0).SetCellStyle(i, j, {
				"border" : "0.5px solid black"
			});
		}
	}
	for (var i = 2; i <= 19; i++) {
		Zcell3.GetSheet(0).SetCellStyle(i, 2, {
			"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell3.GetSheet(0).SetCellStyle(i, 56, {
			"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	for (var i = 2; i <= 56; i++) {
		Zcell3.GetSheet(0).SetCellStyle(2, i, {
			"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
		Zcell3.GetSheet(0).SetCellStyle(19, i, {
			"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
		});
	}
	// 单元格赋值
	setCellValueAndStyle(Zcell3,0,
			[[3,2],[3,26],[3,27],[3,28],[3,29],[3,30],[3,31]],
				["1. 本工程采用的金具串相关配置情况如下",
					"1.“套用金具串代号(国网通用金具代号)”与套用金具串图中右下角图框中代号对应，可据此查询对应金具串图纸。",
					"2.请根据上表中“套用金具串图中适用导线/地线标称截面”、“导线包缠物”查询对应的图纸，以确定线夹型号、导线包缠物型号、金具串长（不含绝缘子）L1、金具重量（不含绝缘子）G1；",
					"3.金具串长（不含绝缘子）L1与“绝缘子串长度（不含金具）”L2相加即为整串长度L，即整串长度L=L1+L2；",
					"4.金具重量（不含绝缘子）G1、“绝缘子重量（不含金具）”G2及“重锤式均压环重量”G3（如有）相加  即为整串重量G，即整串重量G=G1+G2+G3；",
					"5.“图名”末尾括号内代号即为《金具及组配件明细表》中金具串代号；",
					"6.“重锤式均压环重量”一栏中为空值时，该串不需要配置重锤式均压环，否则应按重量配置重锤式均压环；"],
					{"text-align" : "left"}
			);
	Zcell3.GetSheet(0).SetCellType(3,3,{
        "code": "object",
        "object":"序<br>号"
    });
	Zcell3.GetSheet(0).SetCellType(4,3,{
        "code": "object",
        "object":"图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号"
    });
	Zcell3.GetSheet(0).SetCellType(5,3,{
        "code": "object",
        "object":"图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
    });
	Zcell3.GetSheet(0).SetCellValue(6,3,"套用金具串图信息");
	Zcell3.GetSheet(0).SetCellType(6, 4,  {
        "code": "object",
        "object":"套用金具串名称<br>(国网通用金具代号)"
    });
	Zcell3.GetSheet(0).SetCellType(7, 4,  {
		"code": "object",
		"object":"套用金具串图中<br>适用导线/地线<br>标称截面"
	});
	Zcell3.GetSheet(0).SetCellType(8, 4,  {
		"code": "object",
		"object":"导线<br>包缠物"
	});
	Zcell3.GetSheet(0).SetCellValue(9,3,"绝缘子配置");
	Zcell3.GetSheet(0).SetCellValue(9,4,"绝缘子型号");
	Zcell3.GetSheet(0).SetCellValue(10,4,"绝缘子类型");
	Zcell3.GetSheet(0).SetCellType(12, 4,  {
		"code": "object",
		"object":"绝缘子串<br>长度<br>L2（mm）<br>(不含金具)"
	});
	Zcell3.GetSheet(0).SetCellType(14, 4,  {
		"code": "object",
		"object":"绝缘子串<br>重量<br>G2（kg）<br>(不含金具)"
	});
	Zcell3.GetSheet(0).SetCellValue(16,4,"绝缘子数量");
	Zcell3.GetSheet(0).SetCellType(18, 4,  {
		"code": "object",
		"object":"重锤式<br>均压环<br>重量G3<br>(kg/支)"
	});
	Zcell3.GetSheet(0).SetCellValue(18,51,"施工图");
	Zcell3.GetSheet(0).SetCellType(19, 51,  {
		"code": "object",
		"object":"<p style='font-weight:bold;'>设计<br>阶段</p>"
	});
	Zcell3.GetSheet(0).SetCellValue(8,53,"批 准");
	Zcell3.GetSheet(0).SetCellValue(8,54,"审 核");
	Zcell3.GetSheet(0).SetCellValue(8,56,"校 核");
	Zcell3.GetSheet(0).SetCellValue(10,53,"设 计");
	Zcell3.GetSheet(0).SetCellValue(10,54,"CAD制图");
	Zcell3.GetSheet(0).SetCellValue(10,55,"比 例");
	Zcell3.GetSheet(0).SetCellValue(11,55,"/");
	Zcell3.GetSheet(0).SetCellValue(10,56,"日 期");
	Zcell3.GetSheet(0).SetCellValue(11,56,getCurrentDate(2));
	Zcell3.GetSheet(0).SetCellValue(13,53,"金具串套用说明");
	Zcell3.GetSheet(0).SetCellValue(13,56,"图号");
	Zcell3.GetSheet(0).SetCellValue(18,56,"图纸级别");
	Zcell3.GetSheet(0).SetCellValue(19,56,"4");
	//背景图片
	Zcell3.GetSheet(0).SetCellType(8, 51,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/hdLogo.png' width='"+
		UnitConversion.mmConversionPx(90.6)+"' height='"+
		UnitConversion.mmConversionPx(9.7)+"'/>"
	});
}

/**
 * 套用修改说明
 */
var changeCellTable = function(){
	// 创建JSCELL，指明承载容器indexContainer
	Zcell4 = new ZCell(document.getElementById("groundStringingContainer"));
	// 创建表，并指定列，行数
	Zcell4.InserSheet(0, 38, 57);
	// 加载数据
	Zcell4.GetSheet(0).LoadArrData([]);
	// 设置列宽
	for (var i = 1; i <= 38; i++) {
		Zcell4.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(210)/38);
		if (i==1) {
			Zcell4.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(25));
		}else if (i==7) {
			Zcell4.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(2.5));
		}else if (i==8) {
			Zcell4.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(7.5));
		}else if (i==28) {
			Zcell4.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(2.5));
		}else if (i==29) {
			Zcell4.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(7.5));
		}else if (i==38) {
			Zcell4.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(5));
		}
	}
	// 设置行高
	for (var i = 1; i <= 57; i++) {
		Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(297)/59);
		if (i==1) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(5));
		}else if (i==15) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(6.5));
		}else if (i==16) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(3.5));
		}else if (i==30) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(6));
		}else if (i==31) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(4));
		}else if (i==45) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(5.5));
		}else if (i==46) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(4.5));
		}else if (i==52) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(12));
		}else if (i==53) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(7));
		}else if (i==54) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(7));
		}else if (i==55) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(7));
		}else if (i==56) {
			Zcell4.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(7));
		}
	}
	//合并单元格
	Zcell4.GetSheet(0).MergeCells(1,1,7,1);
	Zcell4.GetSheet(0).MergeCells(8,1,17,1);
	Zcell4.GetSheet(0).MergeCells(18,1,28,1);
	Zcell4.GetSheet(0).MergeCells(29,1,38,1);
	setCellStyle(Zcell4,0,
			[[7,1],[17,1],[28,1]],
			{"border-right" : "2px solid black"});
	
	Zcell4.GetSheet(0).MergeCells(1,57,7,57);
	Zcell4.GetSheet(0).MergeCells(8,57,17,57);
	Zcell4.GetSheet(0).MergeCells(18,57,28,57);
	Zcell4.GetSheet(0).MergeCells(29,57,38,57);
	setCellStyle(Zcell4,0,
			[[7,57],[17,57],[28,57]],
			{"border-right" : "2px solid black"});
	
	Zcell4.GetSheet(0).MergeCells(1,46,1,56);
	Zcell4.GetSheet(0).SetCellStyle(1, 46, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell4.GetSheet(0).MergeCells(1,31,1,45);
	Zcell4.GetSheet(0).SetCellStyle(1, 31, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell4.GetSheet(0).MergeCells(1,16,1,30);
	Zcell4.GetSheet(0).SetCellStyle(1, 16, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell4.GetSheet(0).MergeCells(1,2,1,15);
	
/////////////////////////////////////////////////////////////////////////
	
	Zcell4.GetSheet(0).MergeCells(38,46,38,56);
	Zcell4.GetSheet(0).SetCellStyle(38, 46, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell4.GetSheet(0).MergeCells(38,31,38,45);
	Zcell4.GetSheet(0).SetCellStyle(38, 31, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell4.GetSheet(0).MergeCells(38,16,38,30);
	Zcell4.GetSheet(0).SetCellStyle(38, 16, {
		"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
	});
	
	Zcell4.GetSheet(0).MergeCells(38,2,38,15);
	
	
	Zcell4.GetSheet(0).MergeCells(9,6,34,8);
	Zcell4.GetSheet(0).MergeCells(9,9,34,11);
	Zcell4.GetSheet(0).MergeCells(9,12,34,14);
	Zcell4.GetSheet(0).MergeCells(9,15,34,17);
	Zcell4.GetSheet(0).MergeCells(9,18,34,20);
	Zcell4.GetSheet(0).MergeCells(9,21,34,23);
	Zcell4.GetSheet(0).MergeCells(9,24,34,26);
	Zcell4.GetSheet(0).MergeCells(9,27,34,29);
	Zcell4.GetSheet(0).MergeCells(9,30,34,32);
	Zcell4.GetSheet(0).MergeCells(9,33,34,35);
	Zcell4.GetSheet(0).MergeCells(9,36,34,38);
	Zcell4.GetSheet(0).MergeCells(9,39,34,41);
	Zcell4.GetSheet(0).MergeCells(9,42,34,44);
	Zcell4.GetSheet(0).MergeCells(9,45,34,47);
	Zcell4.GetSheet(0).MergeCells(9,48,34,50);
	
	
//	setCellStyle(Zcell4,0,
//			[[2,1],[3,1],[9,1],[19,1],[20,1]],
//			{"border-left" : "1px solid black"});
	
	Zcell4.GetSheet(0).MergeCells(2,52,19,52);
	Zcell4.GetSheet(0).MergeCells(20,52,32,52);
	Zcell4.GetSheet(0).SetCellValue(32,52,"工程");
	Zcell4.GetSheet(0).MergeCells(33,52,37,52);
	Zcell4.GetSheet(0).SetCellType(33,52,{
        "code": "object",
        "object":"设计<br>阶段"
    });

	
	Zcell4.GetSheet(0).MergeCells(2,53,5,53);
	Zcell4.GetSheet(0).SetCellValue(2,53,"批 准");
	Zcell4.GetSheet(0).MergeCells(2,54,5,55);
	Zcell4.GetSheet(0).SetCellValue(2,55,"审 核");
	Zcell4.GetSheet(0).MergeCells(2,56,5,56);
	Zcell4.GetSheet(0).SetCellValue(2,56,"校 核");
	
	Zcell4.GetSheet(0).MergeCells(6,53,10,53);
	Zcell4.GetSheet(0).MergeCells(6,54,10,54);
	Zcell4.GetSheet(0).MergeCells(6,55,10,55);
	Zcell4.GetSheet(0).MergeCells(6,56,10,56);
	
	
	Zcell4.GetSheet(0).MergeCells(11,53,14,53);
	Zcell4.GetSheet(0).SetCellValue(11,53,"设 计");
	Zcell4.GetSheet(0).MergeCells(11,54,14,54);
	Zcell4.GetSheet(0).SetCellValue(11,54,"CAD制图");
	Zcell4.GetSheet(0).MergeCells(11,55,14,55);
	Zcell4.GetSheet(0).SetCellValue(11,55,"比 例");
	Zcell4.GetSheet(0).MergeCells(11,56,14,56);
	Zcell4.GetSheet(0).SetCellValue(11,56,"日 期");
	
	Zcell4.GetSheet(0).MergeCells(15,53,19,53);
	Zcell4.GetSheet(0).MergeCells(15,54,19,54);
	Zcell4.GetSheet(0).MergeCells(15,55,19,55);
	Zcell4.GetSheet(0).MergeCells(15,56,19,56);
	
	Zcell4.GetSheet(0).MergeCells(20,53,37,55);
	
	Zcell4.GetSheet(0).MergeCells(20,56,22,56);
	Zcell4.GetSheet(0).SetCellValue(20,56,"图 号");
	Zcell4.GetSheet(0).MergeCells(23,56,33,56);
	Zcell4.GetSheet(0).MergeCells(34,56,35,56);
	Zcell4.GetSheet(0).SetCellType(34,56,{
        "code": "object",
        "object":"图纸<br>级别"
    });
	Zcell4.GetSheet(0).MergeCells(36,56,37,56);
	
	

	for (var i = 1; i < 57; i++) {
		if (i<56) {
			Zcell4.GetSheet(0).SetCellStyle(2, i+1, {
				"border-left" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
			if (i<=10) {
				Zcell4.GetSheet(0).SetCellStyle(37, i+1, {
					"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
				});
			}else{
				Zcell4.GetSheet(0).SetCellStyle(37, i+1, {
					"border-right" : UnitConversion.mmConversionPx(1) + "px solid black",
				});
			}
		}
	}
	for (var i = 1; i < 37; i++) {
		if (i<37) {
			Zcell4.GetSheet(0).SetCellStyle(i+1, 2, {
				"border-top" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
//			Zcell4.GetSheet(0).SetCellStyle(i+1, 35, {
//				"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
//			});
			Zcell4.GetSheet(0).SetCellStyle(i+1, 51, {
				"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
			Zcell4.GetSheet(0).SetCellStyle(i+1, 56, {
				"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
		}
	}
	
//	Zcell4.GetSheet(0).SetCellStyle(47, 1, {
//		"border-top" : UnitConversion.mmConversionPx(2) + "px solid black",
//	});
	

	//背景图片
	Zcell4.GetSheet(0).SetCellType(2, 52,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/hdLogo.png' width='"+
		UnitConversion.mmConversionPx(90)+"' height='"+
		UnitConversion.mmConversionPx(12)+"'/>"
	});
}


/**
 * 回显配置信息
 */
var reappearTableDate = function(data){
	//var serialConfigInfoList = JSON.parse(data);
	var serialConfigInfoList = data;
	//var ntr = $("#indexContainer").children().find('table').find('tr');
	for(var i =0;i<serialConfigInfoList.length;i++){
		
		var serialConfigInfo = serialConfigInfoList[i];
		
		//var stringTypeSelect = serialConfigInfo.stringTypeSelect;
				
		switch (serialConfigInfo.tableType)
		{
		case 1:
			setStringChoose(serialConfigInfo.stringTypeSelect,"#daoxianXCC_table");
			setInsulatorType(serialConfigInfo.insulatorTypeSelect,"#daoxianXCC_table");
			var tableData = serialConfigInfo.tableData;
			setTableData("#daoxianXCC",tableData);
		  break;
		case 2:
			setStringChoose(serialConfigInfo.stringTypeSelect,"#daoxianNZC_table");
			setInsulatorType(serialConfigInfo.insulatorTypeSelect,"#daoxianNZC_table");
			var tableData = serialConfigInfo.tableData;
			setTableData("#daoxianNZC_table",tableData);
		  break;
		case 3:
			setStringChoose(serialConfigInfo.stringTypeSelect,"#tiaoxianC_table");
			setInsulatorType(serialConfigInfo.insulatorTypeSelect,"#tiaoxianC_table");
			var tableData = serialConfigInfo.tableData;
			setTableData("#tiaoxianC_table",tableData);
		  break;
		case 4:
			setStringChoose(serialConfigInfo.stringTypeSelect,"#dixianXCC_table");
			setInsulatorType(serialConfigInfo.insulatorTypeSelect,"#dixianXCC_table");
			var tableData = serialConfigInfo.tableData;
			setTableData("#dixianXCC_table",tableData);
		  break;
		case 5:
			setStringChoose(serialConfigInfo.stringTypeSelect,"#dixianNZC_table");
			setInsulatorType(serialConfigInfo.insulatorTypeSelect,"#dixianNZC_table");
			var tableData = serialConfigInfo.tableData;
			setTableData("#dixianNZC_table",tableData);
		  break;
		case 6:
			var tableData = serialConfigInfo.tableData;
			setContentsData(tableData);
		  break;
		case 7:
			var tableData = serialConfigInfo.tableData;
			setDescriptionData(tableData);
		  break;
		case 8:
			var tableData = serialConfigInfo.tableData;
			setPictureData(tableData);
		  break;
		}
	}
}

/**
 * 通过projectId查询配置信息表判断该工程中是否有保存的配置信息
 */
var isSerialConfigInfo = function(callback){
	var projectId = $("#mainInfo option:selected").val();//获取当前工程id
	var url = basePath + "serialConfigCYH/getAllSerialConfigInfo.action";
	var result;
	$.ajax({
        type: "post",//请求方式
        //async:false, //！！！同步请求
        url: url,
        data:{
        	 projectId:projectId
       },
        dataType: "json",
　　　         success: function(data){
　　　        	  result= JSON.parse(data);　        	      
　　　        	//callback(JSON.parse(data));
　　　        	  if(!Tools.isEmpty(result)){
　　　        		    alert("查询到当前工程上一次配置信息");
　　　        		    indexCellTable();
　　　        		    reappearTableDate(result);
　　　        		    
　　　   		}else{
　　　 			alert("没有当前工程的配置信息，请配置");
　　　 			serialConfig.searchProjectDetail();
　　　 		}
　　　        	  
        },
        error:function(e){
        	layer.msg("服务器出错");
			console.info(e);
        }
      });
	
	//return result; //返回值不为0或不为空，则查询到配置信息
}

/**
 * 保存所有配置信息数据
 */
var saveTableData = function(){
	
	 var projectId = $("#mainInfo option:selected").val();//获取当前工程id
	 //获取导线悬垂串的数据
	   var tableId1 = $("#daoxianXCC");
	   var tableData1=getTableData(tableId1);
	   var StringChooseSelect1 = getStringChoose("#daoxianXCC_table");
	   var InsulatorTypeSelect1 = getInsulatorType("#daoxianXCC_table");
	 //获取导线耐张段的数据
	   var tableId2 = $("#daoxianNZC_table");
	   var tableData2=getTableData(tableId2);
	   var StringChooseSelect2 = getStringChoose("#daoxianNZC_table");
	   var InsulatorTypeSelect2 = getInsulatorType("#daoxianNZC_table");
	 //获取跳线串的数据
	   var tableId3 = $("#tiaoxianC_table"); 
	   var tableData3=getTableData(tableId3);
	   var StringChooseSelect3 = getStringChoose("#tiaoxianC_table");
	   var InsulatorTypeSelect3 = getInsulatorType("#tiaoxianC_table");
	 //获取地线悬垂串的数据
	   var tableId4 = $("#dixianXCC_table");
	   var tableData4=getTableData(tableId4);
	   var StringChooseSelect4 = getStringChoose("#dixianXCC_table");
	   var InsulatorTypeSelect4 = getInsulatorType("#dixianXCC_table");
	 //获取地线耐张串的数据
	   var tableId5 = $("#dixianNZC_table");
	   var tableData5=getTableData(tableId5);
	   var StringChooseSelect5 = getStringChoose("#dixianNZC_table");
	   var InsulatorTypeSelect5 = getInsulatorType("#dixianNZC_table");
	 //获取每行的串行选择下拉框所有值
	 // var StringChooseSelect = getStringChoose();
	 //获取每行的绝缘子型号下拉框所有制
	 //  var InsulatorTypeSelect = getInsulatorType();
	 //获取目录type页中表格所有数据
	   var tableData6 = getContentsData();
	 //获取套用说明type页中表格所有数据
	   var tableData7 = getDescriptionData();
	 //获取套图信息表type页中表格所有信息
	   var tableData8 = getPictureData();
	 //获取套用修改说明type页中的数据
	  url = basePath+"serialConfigCYH/addAllConfigInfo.action";
	  
	  $.ajax({
	        type: "post",//请求方式
	        url: url,
	        data:{
	        	 projectId:projectId,
	        	 tableData1:JSON.stringify(tableData1),
	        	 tableData2:JSON.stringify(tableData2),
	        	 tableData3:JSON.stringify(tableData3),
	        	 tableData4:JSON.stringify(tableData4),
	        	 tableData5:JSON.stringify(tableData5),
	        	 tableData6:JSON.stringify(tableData6),
	        	 tableData7:JSON.stringify(tableData7),
	        	 tableData8:JSON.stringify(tableData8),
	        	 StringChooseSelect1 : JSON.stringify(StringChooseSelect1),
	        	 InsulatorTypeSelect1 : JSON.stringify(InsulatorTypeSelect1),
	        	 StringChooseSelect2 : JSON.stringify(StringChooseSelect2),
	        	 InsulatorTypeSelect2 : JSON.stringify(InsulatorTypeSelect2),
	        	 StringChooseSelect3 : JSON.stringify(StringChooseSelect3),
	        	 InsulatorTypeSelect3 : JSON.stringify(InsulatorTypeSelect3),
	        	 StringChooseSelect4 : JSON.stringify(StringChooseSelect4),
	        	 InsulatorTypeSelect4 : JSON.stringify(InsulatorTypeSelect4),
	        	 StringChooseSelect5 : JSON.stringify(StringChooseSelect5),
	        	 InsulatorTypeSelect5 : JSON.stringify(InsulatorTypeSelect5)
	      },
	        dataType: "json",
	　　　         success: function(data){
	　　　        	   　　        	      
	           if( !Tools.isEmpty(data) ){
	        	   alert("保存成功");
	        	   
	           }else{
	        	   alert("保存失败");
	           }
	        },
	        error:function(e){
	        	layer.msg("服务器出错");
				console.info(e);
	        }
	      });
}

/**
 * 回显表格数据通用方法
 */
var setTableData = function(tableId,tableData){

	var tableDataArr = eval(tableData);
		
	$(tableId).find('tbody').each(function (){
		var ntr = $(this).find('tr');
		for(var i=0;i<tableDataArr.length;i++){
			 var tds=ntr.eq(i).find('td');
			 if(i == 0){
				 
				  tds.eq(1).children('input').val(tableDataArr[i][0]);//串代号	
				  tds.eq(2).children('select').val(tableDataArr[i][1]);//导线型号
				  tds.eq(3).children('select').val(tableDataArr[i][2]);//电压等级
				  tds.eq(4).children('select').val(tableDataArr[i][3]);//导线分裂方式 option:contains
				  tds.eq(5).children('select').find("option:contains("+tableDataArr[i][4]+")").attr("selected",true);
				  tds.eq(6).children('select').find("option:contains("+tableDataArr[i][5]+")").attr("selected",true);
				  //tds.eq(5).children('select').find("option[text='"+tableDataArr[i][4]+"']").attr("selected",true); 
				  //tds.eq(6).children('select').find("option[text='"+tableDataArr[i][5]+"']").attr("selected",true); 
				 
				  tds.eq(7).children('input').val(tableDataArr[i][6]);//每联绝缘子数量
				  tds.eq(8).children('input').val(tableDataArr[i][7]);//绝缘子串爬电比距（mm/kV）
				  tds.eq(9).children('input').val(tableDataArr[i][8]);//查看套用图	
				  tds.eq(10).children('input').val(tableDataArr[i][9]);//联塔金具型号
				  tds.eq(11).children('input').val(tableDataArr[i][10]);//螺栓方向(以导线为X轴)
				  tds.eq(12).children('input').val(tableDataArr[i][11]);//板间距L	
				  tds.eq(13).children('input').val(tableDataArr[i][12]);//螺栓直径M
				  tds.eq(14).children('input').val(tableDataArr[i][13]);//开口宽度C
				  tds.eq(15).children('input').val(tableDataArr[i][14]);//插入深度H
			 }else{
				 					
					 tds.eq(0).children('input').val(tableDataArr[i][0]);//串代号	
					 tds.eq(1).children('select').val(tableDataArr[i][1]);//导线型号
					 tds.eq(2).children('select').val(tableDataArr[i][2]);//电压等级
					 tds.eq(3).children('select').val(tableDataArr[i][3]);//导线分裂方式
					 
					 tds.eq(4).children('select').find("option[text='"+tableDataArr[i][4]+"']").attr("selected",true); 
					 tds.eq(5).children('select').find("option[text='"+tableDataArr[i][5]+"']").attr("selected",true);
					 tds.eq(6).children('input').val(tableDataArr[i][6]);//每联绝缘子数量
					 tds.eq(7).children('input').val(tableDataArr[i][7]);//绝缘子串爬电比距（mm/kV）
					 tds.eq(8).children('input').val(tableDataArr[i][8]);//查看套用图	
					 tds.eq(9).children('input').val(tableDataArr[i][9]);//联塔金具型号
					 tds.eq(10).children('input').val(tableDataArr[i][10]);//螺栓方向(以导线为X轴)
					 tds.eq(11).children('input').val(tableDataArr[i][11]);//板间距L	
					 tds.eq(12).children('input').val(tableDataArr[i][12]);//螺栓直径M
					 tds.eq(13).children('input').val(tableDataArr[i][13]);//开口宽度C
					 tds.eq(14).children('input').val(tableDataArr[i][14]);//插入深度H
								
			 }
		     
		 }
	 })
	
}

/**
 * 获取表格每行的串行选择下拉框所有
 */
var getStringChoose = function(tableId){
	var objlist = new Array();
	$(tableId).find('tbody').each(function (){
		var ntr = $(this).find('tr');
		for(var i=0;i<ntr.length;i++){
			 var tds=ntr.eq(i).find('td');
			 if(i == 0){
				 var select1 = tds.eq(5).children('select');
				 objlist.push(newBuildReturnValue(select1));
			 }else{
				 if( !Tools.isEmpty(tds.eq(1).children('select').val()) ){
					 var select1 = tds.eq(4).children('select');
					 objlist.push(newBuildReturnValue(select1));
				 }
			 }
			 
		}
	})
	return objlist;
}

/**
 * 生成串行选择下拉框的option
 */
var setStringChoose = function(data,tableId){
	var dataArr = eval(data);
	var ntr = $(tableId).find('tbody').find('tr');
	for(var j=0;j<dataArr.length;j++){//
		var tds=ntr.eq(j).find('td');
		var opt="";
		if(j == 0){
			//var select1 = tds.eq(5).children('select');
			      var select1 = tds.eq(5);
				  for(var k=0;k<dataArr[j].length;k++){
					  opt += '<option value="" >'+dataArr[j][k][1]+'</option>';
				  }
				  $(select1).html("<select style='width:100%;background:#92D050'>"+opt+"</select>");
		}else{  
			  
			    var select1 = tds.eq(4);
				for(var k=0;k<dataArr[j].length;k++){
					  opt += '<option value="" >'+dataArr[j][k][1]+'</option>';
				  }
				$(select1).html("<select style='width:100%;background:#92D050'>"+opt+"</select>");
		}
	}//
	
}

/**
 * 获取表格每行的绝缘子型号下拉框所有
 */
var getInsulatorType = function(tableId){
	var objlist = new Array();
	$(tableId).find('tbody').each(function (){
		var ntr = $(this).find('tr');
		for(var i=0;i<ntr.length;i++){
			 var tds=ntr.eq(i).find('td');
			 if(i == 0){
				 var select1 = tds.eq(6).children('select');
				 objlist.push(newBuildReturnValue(select1));
			 }else{
				 if( !Tools.isEmpty(tds.eq(1).children('select').val()) ){
					 var select1 = tds.eq(5).children('select');
					 objlist.push(newBuildReturnValue(select1));
				 }
			 }
			 
		}
	})
	return objlist;
}

/**
 * 生成绝缘子型号下拉框
 */
var setInsulatorType = function(data,tableId,i){
	var dataArr = eval(data);
	var ntr = $(tableId).find('tbody').find('tr');
	for(var j=0;j<dataArr.length;j++){//
		var tds=ntr.eq(j).find('td');
		var opt="";
		if(j == 0){
			//var select1 = tds.eq(5).children('select');
			      var select1 = tds.eq(6);
				  for(var k=0;k<dataArr[j].length;k++){
					  opt += '<option value="" >'+dataArr[j][k][1]+'</option>';
				  }
				  $(select1).html("<select style='width:100%;background:#92D050'>"+opt+"</select>");
		}else{  
			  
			    var select1 = tds.eq(5);
				for(var k=0;k<dataArr[j].length;k++){
					  opt += '<option value="">'+dataArr[j][k][1]+'</option>';
				  }
				$(select1).html("<select style='width:100%;background:#92D050'>"+opt+"</select>");
		}
	}//
	
}

/**
 * 获取表格下拉框的所有值
 */
var newBuildReturnValue= function(selectName){
	  var ret = new Array();
	  selectName.find('option').each(function(){
	      //遍历所有option
	    	  var arr = new Array();
	          var value = $(this).val();   //获取option值   
	          var text = $(this).text();
	          if(text!=''){   
	              //var o = new Element(value, text, 0);
	        	  arr.push(value);
	        	  arr.push(text);
	        	  ret.push(arr);
	          }  
	    });
	  return ret;
}

/**
 * 遍历串行配置中表格获取信息的通用方法
 */
var getTableData = function(tableId){

	var objlist = new Array();
	tableId.find('tbody').each(function (){
		var ntr = $(this).find('tr');
		for(var i=0;i<ntr.length;i++){
			 var tds=ntr.eq(i).find('td');
			 if(i == 0){
				  var firstCell = new Array();
				  firstCell.push(tds.eq(1).children('input').val());//串代号	
				  firstCell.push(tds.eq(2).children('select').val());//导线型号
				  firstCell.push(tds.eq(3).children('select').val());//电压等级
				  firstCell.push(tds.eq(4).children('select').val());//导线分裂方式
				  firstCell.push(tds.eq(5).children('select').find("option:selected").text());//串型选择
				  firstCell.push(tds.eq(6).children('select').find("option:selected").text());//绝缘子型号
				  firstCell.push(tds.eq(7).children('input').val());//每联绝缘子数量
				  firstCell.push(tds.eq(8).children('input').val());//绝缘子串爬电比距（mm/kV）
				  firstCell.push(tds.eq(9).children('input').val());//查看套用图	
				  firstCell.push(tds.eq(10).children('input').val());//联塔金具型号
				  firstCell.push(tds.eq(11).children('input').val());//螺栓方向(以导线为X轴)
				  firstCell.push(tds.eq(12).children('input').val());//板间距L	
				  firstCell.push(tds.eq(13).children('input').val());//螺栓直径M
				  firstCell.push(tds.eq(14).children('input').val());//开口宽度C
				  firstCell.push(tds.eq(15).children('input').val());//插入深度H
				  objlist.push(firstCell);
			 }else{
				 if( !Tools.isEmpty(tds.eq(1).children('select').val()) ){
					 var otherCell = [];
					 otherCell.push(tds.eq(0).children('input').val());//串代号	
					 otherCell.push(tds.eq(1).children('select').val());//导线型号
					 otherCell.push(tds.eq(2).children('select').val());//电压等级
					 otherCell.push(tds.eq(3).children('select').text());//导线分裂方式
					 otherCell.push(tds.eq(4).children('select').find("option:selected").text());//串型选择
					 otherCell.push(tds.eq(5).children('select').find("option:selected").text());//绝缘子型号
					 otherCell.push(tds.eq(6).children('input').val());//每联绝缘子数量
					 otherCell.push(tds.eq(7).children('input').val());//绝缘子串爬电比距（mm/kV）
					 otherCell.push(tds.eq(8).children('input').val());//查看套用图	
					 otherCell.push(tds.eq(9).children('input').val());//联塔金具型号
					 otherCell.push(tds.eq(10).children('input').val());//螺栓方向(以导线为X轴)
					 otherCell.push(tds.eq(11).children('input').val());//板间距L	
					 otherCell.push(tds.eq(12).children('input').val());//螺栓直径M
					 otherCell.push(tds.eq(13).children('input').val());//开口宽度C
					 otherCell.push(tds.eq(14).children('input').val());//插入深度H
					 objlist.push(otherCell);
				 }
				
			
			 }
		     
		 }
	 })
	 

	return objlist;
}

/**
 * 遍历目录中表格获取信息的通用方法
 */
var getContentsData = function(){
	var objlist = new Array();
/*	$("#indexContainer").children().find('table').find('tbody').each(function (){
		var ntr = $("#indexContainer").children().find('table').find('tbody').find('tr');
		for(var i=12;i<ntr.length;i++){  //从表格第12行开始循环
			  var tds=ntr.eq(i).find('td');
			  if( !Tools.isEmpty(tds.eq(5).text()) ){
				  var thisCell = new Array();
				  thisCell.push(tds.eq(2).text());//图号	
				  thisCell.push(tds.eq(3).text());//图名
				  thisCell.push(tds.eq(4).text());//张数
				  thisCell.push(tds.eq(5).text());//套用原工程名称及卷册检索号，图号
				  objlist.push(thisCell);
			  }
			 
			}
		})*/

	var ntr = $("#indexContainer").children().find('table').find('tr');
	for(var i=13;i<ntr.length;i++){  //从表格第12行开始循环
		  var tds=ntr.eq(i).find('td');
		  if( !Tools.isEmpty(tds.eq(5).text()) ){
			  var thisCell = new Array();
			  thisCell.push(tds.eq(2).text());//图号	
			  thisCell.push(tds.eq(3).text());//图名
			  thisCell.push(tds.eq(4).text());//张数
			  thisCell.push(tds.eq(5).text());//套用原工程名称及卷册检索号，图号
			  objlist.push(thisCell);
		  }
		 
		}
	
	return objlist;
}

/**
 * 给目录中表格赋值方法
 */
var setContentsData = function(tableData1){
	var tableDataArr1 = eval(tableData1);
	var ntr = $("#indexContainer").children().find('table').eq(1).find('tr');
	for(var i=0;i<tableDataArr1.length;i++){  //从表格第12行开始循环
		  var tds=ntr.eq(i+13).find('td');
		     
		      tds.eq(1).text(i+1);//图号
			  tds.eq(2).text(tableDataArr1[i][0]);//图号	
			  tds.eq(3).text(tableDataArr1[i][1]);//图名
			  tds.eq(4).text(tableDataArr1[i][2]);//张数
			  tds.eq(5).text(tableDataArr1[i][3]);//套用原工程名称及卷册检索号，图号
	 
		}
	//Zcell2.GetSheet(0).SetCellValue(3,12,"test");
 
}

/**
 * 遍历套用说明表格获取信息的通用方法
 */
var getDescriptionData = function(){
	
	var objlist = new Array();
	
		var ntr = $("#descriptionContainer").children().find('table').find('tr');
		for(var i=6;i<ntr.length;i++){   //从表格tbody下第5行开始循环
			  var tds=ntr.eq(i).find('td');
			  
			  if( !Tools.isEmpty(tds.eq(5).text()) ){
				  var thisCell = new Array();
				  thisCell.push(tds.eq(3).text());//图号	
				  thisCell.push(tds.eq(4).text());//图名
				  thisCell.push(tds.eq(5).text());//套用金具串名称（国网通用金具代号）
				  thisCell.push(tds.eq(6).text());//套用金具串图中适用导线/地线标称j截面
				  thisCell.push(tds.eq(7).text());//导线包缠物
				  thisCell.push(tds.eq(8).text());//绝缘子型号
				  thisCell.push(tds.eq(9).text());//绝缘子类型
				  thisCell.push(tds.eq(10).text());//绝缘字串长度
				  thisCell.push(tds.eq(11).text());//绝缘字串重量
				  thisCell.push(tds.eq(12).text());//绝缘子串数量
				  thisCell.push(tds.eq(13).text());//重锤式均压环重量G3
				  objlist.push(thisCell);
			  }
			 
		}
	
	return objlist;
}

/**
 * 给说明表格赋值方法
 */
var setDescriptionData = function(tableData){
	
	var tableDataArr = eval(tableData);
	
		var ntr = $("#descriptionContainer").children().find('table').find('tr');
		for(var i=0;i<tableDataArr.length;i++){   //从表格tbody下第5行开始循环
			  var tds=ntr.eq(i+6).find('td');
			      tds.eq(2).text(i+1);//序号		
				  tds.eq(3).text(tableDataArr[i][0]);//图号	
				  tds.eq(4).text(tableDataArr[i][1]);//图名
				  tds.eq(5).text(tableDataArr[i][2]);//套用金具串名称（国网通用金具代号）
				  tds.eq(6).text(tableDataArr[i][3]);//套用金具串图中适用导线/地线标称j截面
				  tds.eq(7).text(tableDataArr[i][4]);//导线包缠物
				  tds.eq(8).text(tableDataArr[i][5]);//绝缘子型号
				  tds.eq(9).text(tableDataArr[i][6]);//绝缘子类型
				  tds.eq(10).text(tableDataArr[i][7]);//绝缘字串长度
				  tds.eq(11).text(tableDataArr[i][8]);//绝缘字串重量
				  tds.eq(12).text(tableDataArr[i][9]);//绝缘子串数量
				  tds.eq(13).text(tableDataArr[i][10]);//重锤式均压环重量G3
				 
		}
	
}

/**
 * 遍历套图信息中表格获取信息的通用方法
 */
var getPictureData = function(){
	
	var objlist = new Array();
	
		var ntr = $("#infoContainer").children().find('table').find('tr');
		for(var i=3;i<ntr.length;i++){   //从表格tbody下第2行开始循环,
			  var tds=ntr.eq(i).find('td');
			  if(!Tools.isEmpty(tds.eq(2).text())){
				  var thisCell = new Array();
				  thisCell.push(tds.eq(1).text());//工程名称	
				  thisCell.push(tds.eq(2).text());//图号
				  thisCell.push(tds.eq(3).text());//图名
				  thisCell.push(tds.eq(4).text());//需晒份数
				  thisCell.push(tds.eq(5).text());//备注
				  objlist.push(thisCell);
			  }			  
			  
			  
		}
	
	return objlist;
}

/**
 * 给套图信息中表格赋值方法
 */
var setPictureData = function(tableData){
	var tableDataArr = eval(tableData);

		var ntr = $("#infoContainer").children().find('table').find('tr');
		for(var i=0;i<tableDataArr.length ;i++){   //从表格tbody下第2行开始循环,
			  var tds=ntr.eq(i+3).find('td');
			      tds.eq(0).text(i+1);
				  tds.eq(1).text(tableDataArr[i][0]);//工程名称	
				  tds.eq(2).text(tableDataArr[i][1]);//图号
				  tds.eq(3).text(tableDataArr[i][2]);//图名
				  tds.eq(4).text(tableDataArr[i][3]);//需晒份数
				  tds.eq(5).text(tableDataArr[i][4]);//备注
	  
		}

}

/**
 * 遍历套用修改表格获取信息的通用方法
 */

/**
 * 给套用修改表格赋值方法
 */

/**
 * 根据列表id，传来的电压等级，导线分裂方式数据，分别给下拉框赋值
 * 的通用方法
 */
var util = function(tableId,listlist){
	if( !Tools.isEmpty(listlist) ){
 	   
 	   
		tableId.find('tbody').each(function (){
			var ntr = $(this).find('tr');
			  
 	   for(var i=0;i<listlist.length;i++){
 		   var tds=ntr.eq(i).find('td');
 		   var list = listlist[i];
 		   var Voltage = Math.floor(list[0]) + "kV";
 		    		  
 		   if(i==0){
 			   tds.eq(3).children('select').val(Voltage);
 			   tds.eq(4).children('select').val(list[1]);
 		   }else{
 			   tds.eq(2).children('select').val(Voltage);
 			   tds.eq(3).children('select').val(list[1]);
 		   }
 	   }
 	   })
	}
}