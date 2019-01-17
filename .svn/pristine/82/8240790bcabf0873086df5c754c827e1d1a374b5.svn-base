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
/*已激活的标签页的名称*/
var ActiveTab = "串型配置";
function serialConfig() {
	// 初始化表格
	this.initCellTableData();
	// 初始化数据
	this.initData();
	//下拉框监听事件
//	this.selectListener();
	var table = document.getElementById("tabl1");
	$('#addBtn').on("click",function() {
//		tablesToExcel(['tabl1'], ['1'], 'ee', 'Excel');
		var table = '';
		if (ActiveTab == "串型配置") {
			layer.msg("...");
			return;
		} else if (ActiveTab == "目录(20串)") {
			table = $("#indexContainer #tabl1").html();
		} else if (ActiveTab == "套用说明(20串)") {
			table = $("#descriptionContainer #tabl1").html();
		} else if (ActiveTab == "套图信息表") {
			table = $("#infoContainer #tabl1").html();
		}
		tableToExcel(table,ActiveTab);
	})
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		// 获取已激活的标签页的名称
		ActiveTab = $(e.target).text(); 
	});
	
	
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
	objInput.attr("value",creepDistance.toFixed(2));
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
							option += '<option>'+Insulatorlist[j].insulatorModel+'</option>';
						}
					}
					
					$(this).parent().parent().find(".cktytInput").attr("value",CxxzList[i].cktyt);	//查看套用图		
					$(this).parent().parent().find(".cktytInput").attr("data_picname",CxxzList[i].pictureName);	//查看套用图图名		
					$(this).parent().parent().find(".ltjjxhInput").attr("value",CxxzList[i].ltjjxh);	//联塔金具型号	
					$(this).parent().parent().find(".lsfxInput").attr("value",CxxzList[i].lsfx);	//螺栓方向
					$(this).parent().parent().find(".bjjInput").attr("value",CxxzList[i].bjj);		//板间距L
					$(this).parent().parent().find(".lszjInput").attr("value",CxxzList[i].lszj);	//螺栓直径M	
					$(this).parent().parent().find(".kkkdInput").attr("value",CxxzList[i].kkkd);	//开口宽度C	
					$(this).parent().parent().find(".kksdInput").attr("value",CxxzList[i].kksd);	//插入深度H
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
					dydjSelect +='<option val="">'+dydjList[i][1]+'</option>'+ option;
					
				}
			}
		}
		dydjSelect += '</select>';
		/* 导线分裂方式下拉框 */
		dxflfsSelect += '<select class="dxflfsSelect" style="width:100%;background:'+color+'"><option selected disabled style="display: none"></option>';
		if (!Tools.isEmpty(dxfxList)) {
			for (var i = 0; i < dxfxList.length; i++) {
				if (dxfxList[i][0]==(z+1)) {
					dxflfsSelect +='<option val="">'+dxfxList[i][1]+'</option>'
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

serialConfig.prototype.initCellTableData = function(data){
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
	
	descriptionCellTable();
	indexCellTable();
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
		Zcell2.GetSheet(0).SetCellStyle(1, i, {
			"border-left" : "1px solid #0000D0",
		});
		Zcell2.GetSheet(0).SetCellStyle(26, i, {
			"border-right" : "1px solid #0000D0",
		});
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
		Zcell2.GetSheet(0).SetCellStyle(i, 1, {
			"border-top" : "1px solid #0000D0",
		});
		Zcell2.GetSheet(0).SetCellStyle(i, 36, {
			"border-bottom" : "1px solid #0000D0",
		});
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
				["  卷  册  检  索  号","第 1 页","共 2 页",getCurrentDate(3),"安徽阜阳阜三-白果220kV线路",
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
var setConversionColWidth = function(tabObj,sheetIndex,valueArr){
	const colWidth = 2.27; //  列宽比
	for (var i = 0; i < valueArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetColWidth(i+1, UnitConversion.mmConversionPx(valueArr[i])*colWidth);
	}
}
var setCellValueAndStyle = function(tabObj,sheetIndex,mapArr,valueArr,style){
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellValue(mapArr[i][0], mapArr[i][1], valueArr[i]);
		tabObj.GetSheet(sheetIndex).SetCellStyle(mapArr[i][0], mapArr[i][1], style);
	}
}
var setCellValue = function(tabObj,sheetIndex,mapArr,valueArr){
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellValue(mapArr[i][0], mapArr[i][1], valueArr[i]);
	}
}
var setCellStyle = function(tabObj,sheetIndex,mapArr,style){
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellStyle(mapArr[i][0], mapArr[i][1], style);
	}
}
function switchData(condition,dataArray,resultArray){
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i]==condition) {
			return resultArray[i];
		}
	}
	return "";
}

var UnitConversion = {
    /**
     * 获取DPI
     * @returns {Array}
     */
    conversion_getDPI : function () {
        var arrDPI = new Array;
        if (window.screen.deviceXDPI) {
            arrDPI[0] = window.screen.deviceXDPI;
            arrDPI[1] = window.screen.deviceYDPI;
        } else {
            var tmpNode = document.createElement("DIV");
            tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
            document.body.appendChild(tmpNode);
            arrDPI[0] = parseInt(tmpNode.offsetWidth);
            arrDPI[1] = parseInt(tmpNode.offsetHeight);
            tmpNode.parentNode.removeChild(tmpNode);
        }
        return arrDPI;
    },
    /**
     * px转换为mm
     * @param value
     * @returns {number}
     */
    pxConversionMm : function (value) {
        var inch = value/this.conversion_getDPI()[0];
        var c_value = inch * 25.4;
//      console.log(c_value);
        return c_value;
    },
    /**
     * mm转换为px
     * @param value
     * @returns {number}
     */
    mmConversionPx : function (value) {
        var inch = value/25.4;
        var c_value = inch*this.conversion_getDPI()[0];
//      console.log(c_value);
        return c_value;
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
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html><head><meta charset="UTF-8"><style type="text/css"> td{  text-align:center;display: table-cell;vertical-align:center }</style></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
//    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table}
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
 * 
 * @param type
 * @returns 1:"YYYY-MM-DD",2:"YYYY/MM/DD",3:"YYYY年MM月DD日"
 */
function getCurrentDate(type){
	var myDate = new Date();
	var curdate ="";
	if (type==1) {
		curdate = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+ "-"+ myDate.getDate(); 
	}else if(type==2){
		curdate = myDate.getFullYear()+"/"+(myDate.getMonth()+1)+ "/"+ myDate.getDate(); 
	}else if(type==3){
		curdate = myDate.getFullYear()+"年"+(myDate.getMonth()+1)+ "月"+ myDate.getDate() + "日"; 
	}else{
		curdate = "";
	}
	return curdate;
}
