var stingConfigData;
var heightList;
var sumlist = new Array();
var hammerTypeArr={"GJ-100":"FDNJ-3/G","GJ-120":"FDNJ-3/G","GJ-150":"",
		"GJ-35":"FDNJ-1/G","GJ-50":"FDNJ-1/G","GJ-80":"FDNJ-2/G",
		"JL/G1A-150/20":"","JL/G1A-150/25":"FDNJ-2/3","JL/G1A-150/35":"",
		"JL/G1A-185/25":"","JL/G1A-185/30":"FDNJ-3/4","JL/G1A-185/45":"",
		"JL/G1A-240/30":"FDNJ-3/4","JL/G1A-240/40":"FDNJ-3/4","JL/G1A-300/25":"FDNJ-4/5",
		"JL/G1A-300/40":"FDNJ-4/5","JL/G1A-300/50":"","JL/G1A-400/35":"FDNJ-4/5",
		"JL/G1A-400/50":"FDNJ-4/5","JL/G1A-500/45":"FDNJ-4/6","JL/G1A-500/65":"",
		"JL/G1A-630/45":"FDNJ-4/6","JL/G1A-630/55":"FDNJ-4/6","JL/G1A-800/55":"",
		"JL/LHA1-130/140":"FDNJ-3/4","JL/LHA1-165/175":"FDNJ-4/5","JL/LHA1-210/220":"FDNJ-4/5",
		"JL/LHA1-260/275":"FDNJ-4/6","JL/LHA1-455/205":"FDNJ-4/6","JLB20A-100":"FDNJ-3/G",
		"LB20A-120":"FDNJ-3/G","JLB20A-150":"","JLB20A-185":"",
		"JLB20A-50":"FDNJ-1/G","JLB20A-80":"FDNJ-2/G","JLB23-120":"FDNJ-3/G",
		"JLB35-100":"FDNJ-3/G","JLB35-120":"FDNJ-3/G","JLB35-150":"",
		"JLB40-100":"FDNJ-3/G","JLB40-120":"FDNJ-3/G","JLB40-150":"",
		"JLB40-185":"","JLB40-50":"FDNJ-1/G","JLB40-80":"FDNJ-2/G",
		"JLHA3-1050":"","JLHA3-1080":"","JLHA3-1215":"",
		"JLHA3-1350":"","JLHA3-1645":"","JLHA3-275":"FDNJ-3/4",
		"JLHA3-280":"FDNJ-3/4","JLHA3-335":"FDNJ-4/5","JLHA3-340":"FDNJ-4/5",
		"JLHA3-425":"FDNJ-4/5","JLHA3-450":"FDNJ-4/5","JLHA3-530":"FDNJ-4/6",
		"JLHA3-675":"FDNJ-4/6","JLHA3-775":"","JLHA3-870":"",
		"JLHA3-940":"","JLHA3-975":"","OPGW-48":"","OPGW-24":"","OPGW-36":"","OPGW-72":""
}

function partsConfig() {
	// 初始化表格
	this.initTable();
	// 给防震锤表格绑数据
	this.bindDamper();
	// 新增行
	$(document).delegate(".addTr","click",this.addTableTr);
	// 删除行
	$(document).delegate(".delTr","click",this.delTableTr);
	// 保存串行配置
	$("#btn_sting_save").on("click",this.saveStingConfig);
	// 保存默认配置
	$("#btn_save").on("click",this.saveDefaultConfig);
	// 保存防震锤配置
	$("#btn_description_save").on("click",this.saveVibrationDamper);
	// 保存光缆盘长计算
	$("#btn_cable_save").on("click",this.saveCable);
	// 保存防震锤型号
	$("#btn_hammerType_save").on("click",this.saveHammerType);
	// 返回
	$("#btn_apply_back").on("click",this.backUpPage);

}

//绑附件
partsConfig.prototype.bindDamper = function(){
	var attList = eval("(" + damper + ")");
	$.each(attList,function(index,obj){
	if(obj.vibrationType==0){
		 $("#wireRange"+obj.vibrationType+" input").eq((obj.sortNo-1)*3).val(obj.minSpan);
		 $("#wireRange"+obj.vibrationType+" input").eq(1+(obj.sortNo-1)*3).val(obj.maxSpan);
		 $("#wireRange"+obj.vibrationType+" input").eq(2+(obj.sortNo-1)*3).val(obj.count);
	}else{
		 $("#wireRange"+obj.vibrationType+" input").eq(0).val(obj.minDiameter);
		 $("#wireRange"+obj.vibrationType+" input").eq(1).val(obj.maxDiameter);
		 $("#wireRange"+obj.vibrationType+" input").eq(2+(obj.sortNo-1)*3).val(obj.minSpan);
		 $("#wireRange"+obj.vibrationType+" input").eq(3+(obj.sortNo-1)*3).val(obj.maxSpan);
		 $("#wireRange"+obj.vibrationType+" input").eq(4+(obj.sortNo-1)*3).val(obj.count);
	}
	});
	   
};


//初始化表格
partsConfig.prototype.initTable = function(){
	$.ajax({
		type : 'post',
		url : path + 'Parts/getWireTypeById.action',
		data : {
			'id' : id
	},
		success : function(data) {
			if (!Tools.isEmpty(data)) {
				stingConfigData=data;
				var wireList =data.wireList;
				if (!Tools.isEmpty(wireList)) {
					partsConfig.createWireTable(wireList);
				}
				var groundList =data.groundList;
				if (!Tools.isEmpty(groundList)) {
					partsConfig.createGroundTable(groundList);
				}
				var OPGWList =data.OPGWList;
				if (!Tools.isEmpty(groundList)) {
					partsConfig.createOPGWTable(OPGWList);
				}
				partsConfig.initTableData();
				partsConfig.initDefaultTable();
				partsConfig.initTaTypeTable();
				partsConfig.initHammerTypeTable(data);
			}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});
}

//初始化默认配置表格
partsConfig.prototype.initDefaultTable = function(){
	$.ajax({
		type : 'post',
		url : path + 'Parts/getConfigDataById.action',
		data : {
			'id' : id
	},
		success : function(data) {
			if (!Tools.isEmpty(data)) {
				var wireData =data.wireData;
				wireData=JSON.parse(wireData);
				partsConfig.createwireDefaultTable(wireData);
				/*var wireDefault =data.wireDefault;
				if (!Tools.isEmpty(wireDefault)) {
					wireDefault=JSON.parse(wireDefault);
				}else if(!Tools.isEmpty(wireData)){
					wireData=JSON.parse(wireData);
					partsConfig.createwireDefaultTable(wireData);
				}*/
				
				var groundData =data.groundData;
				groundData=JSON.parse(groundData);
				partsConfig.creategroundDefaultTable(groundData);
				/*var groundDefault =data.groundDefault;
				if (!Tools.isEmpty(groundDefault)) {
					groundDefault=JSON.parse(groundDefault);
				}else if(!Tools.isEmpty(groundData)){
					groundData=JSON.parse(groundData);
					partsConfig.creategroundDefaultTable(groundData);
				}*/
				
				var OPGWData =data.OPGWData;
				OPGWData=JSON.parse(OPGWData);
				partsConfig.createOPGWDefaultTable(OPGWData);
			/*	var OPGWDefault =data.OPGWDefault;
				if (!Tools.isEmpty(OPGWDefault)) {
					OPGWDefault=JSON.parse(OPGWDefault);
				}else if(!Tools.isEmpty(OPGWData)){
					OPGWData=JSON.parse(OPGWData);
					partsConfig.createOPGWDefaultTable(OPGWData);
				}*/
				
				}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});
}


//初始化光缆盘长表格
partsConfig.prototype.initTaTypeTable = function(){
	$.ajax({
		type : 'post',
		url : path + 'Parts/getTotalTaTypeById.action',
		data : {
			'id' : id
	},
		success : function(data) {
			if (!Tools.isEmpty(cableModulus)) {
				$("#modulus").val(cableModulus);
			}
			if (!Tools.isEmpty(cableMargin)) {
				$("#margin").val(cableMargin);
			}
			if (!Tools.isEmpty(data)) {
				var bracketHeight = data.bracketHeight;
				heightList = data.totalList;
				var tr="";
				if (!Tools.isEmpty(bracketHeight)) {
					var heightData=JSON.parse(bracketHeight[0]);
					var index=1;
					for(var key in heightData){
						tr+="<tr><td>"+index+"</td><td>"+key+"</td><td><input type='text' id='"+key+"' class='input_control' value='"+heightData[key]+"'></td></tr>"
					　　index++;
						}

				}
				else{
					for (var i = 0; i <heightList.length; i++) {
						tr+="<tr><td>"+(i+1)+"</td><td>"+heightList[i]+"</td><td><input type='text' id='"+heightList[i]+"' class='input_control' value='0'></td></tr>"
					
					}	
				}
				$("#taTypeTr").after(tr);
			}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});
}

//初始化防震锤表格
partsConfig.prototype.initHammerTypeTable = function(data){
	if (!Tools.isEmpty(hammerType)) {
		hammerTypeArr = JSON.parse(hammerType);
	}
	
	if (!Tools.isEmpty(data)) {
		 sumlist = sumlist.concat(data.wireList); 
		 sumlist = sumlist.concat(data.groundList); 
		 sumlist = sumlist.concat(data.OPGWList); 
		var tr="";
		
		for (var i = 0; i <sumlist.length; i++) {
				tr+="<tr><td>"+sumlist[i]+"</td><td><input type='text' id='hammerType"+i+"' class='input_control' value='"+hammerTypeArr[sumlist[i]]+"'></td></tr>"		
		}
		$("#hammerTypeTr").after(tr);
	}
}

//串行表格表格赋值
partsConfig.prototype.initTableData = function(){
	$.ajax({
		type : 'post',
		url : path + 'Parts/getConfigDataById.action',
		data : {
			'id' : id
	},
		success : function(data) {
			if (!Tools.isEmpty(data)) {
		
				var wireData =data.wireData;
				if (!Tools.isEmpty(wireData)) {
					wireData=JSON.parse(wireData);
					var wireList =stingConfigData.wireList;
					if (!Tools.isEmpty(wireList)) {
						for (var i = 0; i <wireList.length; i++) {
							if(i>0){
								$(".wireList"+(i+1)+"").css({"border-top": "3px solid red"});
							}
							$(".wireList"+(i+1)+"").html("<td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label></td>" +
									"<td>"+wireList[i]+"</td><td><select class='input_control'><option value='1'>导线单联悬垂串</option><option value='2'>导线双联悬垂串</option>" +
									"</select></td><td><input class='input_control' value='"+wireData[wireList[i]][0][1]+"'></td><td><input class='input_control' value='"+wireData[wireList[i]][0][2]+"'></td><td><select class='input_control'>" +
									"<option value='1'>导线单联耐张串</option><option value='2'>导线双联耐张串</option></select></td><td><input class='input_control' value='"+wireData[wireList[i]][0][4]+"'></td>" +
									"<td><input class='input_control' value='"+wireData[wireList[i]][0][5]+"'></td><td><select class='input_control'><option value='1'>跳线单联悬垂串</option><option value='2'>" +
									"跳线双联悬垂串</option></select></td><td><input class='input_control' value='"+wireData[wireList[i]][0][7]+"'></td><td><input class='input_control' value='"+wireData[wireList[i]][0][8]+"'></td>");
							var tr="";
							for (var j = 1; j <wireData[wireList[i]].length; j++) {
								tr+="<tr class='wireList"+(i+1)+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label><label title='删除行' class='delTr'><i class='fa fa-minus'></i></label></td>" +
								"<td>"+wireList[i]+"</td><td><select class='input_control'><option value='1'>导线单联悬垂串</option><option value='2'>导线双联悬垂串</option>" +
								"</select></td><td><input class='input_control' value='"+wireData[wireList[i]][j][1]+"'></td><td><input class='input_control' value='"+wireData[wireList[i]][j][2]+"'></td><td><select class='input_control'>" +
								"<option value='1'>导线单联耐张串</option><option value='2'>导线双联耐张串</option></select></td><td><input class='input_control' value='"+wireData[wireList[i]][j][4]+"'></td>" +
								"<td><input class='input_control' value='"+wireData[wireList[i]][j][5]+"'></td><td><select class='input_control'><option value='1'>跳线单联悬垂串</option><option value='2'>" +
								"跳线双联悬垂串</option></select></td><td><input class='input_control' value='"+wireData[wireList[i]][j][7]+"'></td><td><input class='input_control' value='"+wireData[wireList[i]][j][8]+"'></td></tr>";
							}
							$(".wireList"+(i+1)+"").after(tr);
						}
					}
					
				}else{
					var wireList =stingConfigData.wireList;
					if (!Tools.isEmpty(wireList)) {
						for (var i = 0; i <wireList.length; i++) {
							if(i>0){
								$(".wireList"+(i+1)+"").css({"border-top": "3px solid red"});
							}
							$(".wireList"+(i+1)+"").html("<td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label></td>" +
									"<td>"+wireList[i]+"</td><td><select class='input_control'><option value='1'>导线单联悬垂串</option><option value='2'>导线双联悬垂串</option>" +
									"</select></td><td><input class='input_control' value='DX"+(i+1)+"1'></td><td><input class='input_control' value='一般悬垂塔'></td><td><select class='input_control'>" +
									"<option value='1'>导线单联耐张串</option><option value='2'>导线双联耐张串</option></select></td><td><input class='input_control' value='DN"+(i+1)+"1'></td>" +
									"<td><input class='input_control' value='变电站进线档'></td><td><select class='input_control'><option value='1'>跳线单联悬垂串</option><option value='2'>" +
									"跳线双联悬垂串</option></select></td><td><input class='input_control' value='DT"+(i+1)+"1'></td><td><input class='input_control' value='0~10度,45~90度双侧边相'></td>");
							var tr="";
								tr+="<tr class='wireList"+(i+1)+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label><label title='删除行' class='delTr'><i class='fa fa-minus'></i></label></td>" +
								"<td>"+wireList[i]+"</td><td><select class='input_control'><option value='1'>导线单联悬垂串</option><option value='2'>导线双联悬垂串</option>" +
								"</select></td><td><input class='input_control' value='DX"+(i+1)+"2'></td><td><input class='input_control' value='重要交叉跨越悬垂塔'></td><td><select class='input_control'>" +
								"<option value='1'>导线单联耐张串</option><option value='2' selected='selected'>导线双联耐张串</option></select></td><td><input class='input_control' value='DN"+(i+1)+"2'></td>" +
								"<td><input class='input_control' value='一般耐张塔'></td><td><select class='input_control'><option value='1'>跳线单联悬垂串</option><option value='2' selected='selected'>" +
								"跳线双联悬垂串</option></select></td><td><input class='input_control' value='DT"+(i+1)+"2'></td><td><input class='input_control' value='单回路中相/三回路上单回中相'></td></tr>";
							
							$(".wireList"+(i+1)+"").after(tr);
						}
					}
				}
				var groundData =data.groundData;
				if (!Tools.isEmpty(groundData)) {
					groundData=JSON.parse(groundData);
					var groundList =stingConfigData.groundList;
					if (!Tools.isEmpty(groundList)) {
						for (var i = 0; i <groundList.length; i++) {
							if(i>0){
								$(".groundList"+(i+1)+"").css({"border-top": "3px solid red"});
							}
							$(".groundList"+(i+1)+"").html("<td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label></td>" +
									"<td>"+groundList[i]+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2'>地线双联悬垂串</option>" +
									"</select></td><td><input class='input_control' value='"+groundData[groundList[i]][0][1]+"'></td><td><input class='input_control' value='"+groundData[groundList[i]][0][2]+"'></td><td><select class='input_control'>" +
									"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control' value='"+groundData[groundList[i]][0][4]+"'></td>" +
									"<td><input class='input_control' value='"+groundData[groundList[i]][0][5]+"'></td></tr>");
							var tr="";
							for (var j = 1; j <groundData[groundList[i]].length; j++) {
								tr+="<tr class='groundList"+(i+1)+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label><label title='删除行' class='delTr'><i class='fa fa-minus'></i></label></td>" +
								"<td>"+groundList[i]+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2'>地线双联悬垂串</option>" +
								"</select></td><td><input class='input_control' value='"+groundData[groundList[i]][j][1]+"'></td><td><input class='input_control' value='"+groundData[groundList[i]][j][2]+"'></td><td><select class='input_control'>" +
								"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control' value='"+groundData[groundList[i]][j][4]+"'></td>" + 
								"<td><input class='input_control' value='"+groundData[groundList[i]][j][5]+"'></td></tr>";
							}
							$(".groundList"+(i+1)+"").after(tr);
						}
					}
					
				}else{
					var groundList =stingConfigData.groundList;
					if (!Tools.isEmpty(groundList)) {
						for (var i = 0; i <groundList.length; i++) {
							if(i>0){
								$(".groundList"+(i+1)+"").css({"border-top": "3px solid red"});
							}
							$(".groundList"+(i+1)+"").html("<td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label></td>" +
									"<td>"+groundList[i]+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2'>地线双联悬垂串</option>" +
									"</select></td><td><input class='input_control' value='BX"+(i+1)+"1'></td><td><input class='input_control' value='一般悬垂塔'></td><td><select class='input_control'>" +
									"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control' value='BN"+(i+1)+"1'></td>" +
									"<td><input class='input_control' value='变电站进线档'></td></tr>");
							var tr="";
							
								tr+="<tr class='groundList"+(i+1)+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label><label title='删除行' class='delTr'><i class='fa fa-minus'></i></label></td>" +
								"<td>"+groundList[i]+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2' selected='selected'>地线双联悬垂串</option>" +
								"</select></td><td><input class='input_control' value='BX"+(i+1)+"2'></td><td><input class='input_control' value='重要交叉跨越悬垂塔'></td><td><select class='input_control'>" +
								"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control' value='BN"+(i+1)+"2'></td>" + 
								"<td><input class='input_control' value='一般耐张塔'></td></tr>";
							
							$(".groundList"+(i+1)+"").after(tr);
						}
					}
					
				
				}
				
				var OPGWData =data.OPGWData;
				if (!Tools.isEmpty(OPGWData)) {
					OPGWData=JSON.parse(OPGWData);
					var OPGWList =stingConfigData.OPGWList;
					if (!Tools.isEmpty(OPGWList)) {
						for (var i = 0; i <OPGWList.length; i++) {
							if(i>0){
								$(".OPGWList"+(i+1)+"").css({"border-top": "3px solid red"});
							}
							$(".OPGWList"+(i+1)+"").html("<td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label></td>" +
									"<td>"+OPGWList[i]+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2'>地线双联悬垂串</option>" +
									"</select></td><td><input class='input_control' value='"+OPGWData[OPGWList[i]][0][1]+"'></td><td><input class='input_control' value='"+OPGWData[OPGWList[i]][0][2]+"'></td><td><select class='input_control'>" +
									"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control' value='"+OPGWData[OPGWList[i]][0][4]+"'></td>" +
									"<td><input class='input_control' value='"+OPGWData[OPGWList[i]][0][5]+"'></td></tr>");
							var tr="";
							for (var j = 1; j <OPGWData[OPGWList[i]].length; j++) {
								tr+="<tr class='OPGWList"+(i+1)+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label><label title='删除行' class='delTr'><i class='fa fa-minus'></i></label></td>" +
								"<td>"+OPGWList[i]+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2'>地线双联悬垂串</option>" +
								"</select></td><td><input class='input_control' value='"+OPGWData[OPGWList[i]][j][1]+"'></td><td><input class='input_control' value='"+OPGWData[OPGWList[i]][j][2]+"'></td><td><select class='input_control'>" +
								"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control' value='"+OPGWData[OPGWList[i]][j][4]+"'></td>" + 
								"<td><input class='input_control' value='"+OPGWData[OPGWList[i]][j][5]+"'></td></tr>";
							}
							$(".OPGWList"+(i+1)+"").after(tr);
						}
					}
					
				}else{

					var OPGWList =stingConfigData.OPGWList;
					if (!Tools.isEmpty(OPGWList)) {
						for (var i = 0; i <OPGWList.length; i++) {
							if(i>0){
								$(".OPGWList"+(i+1)+"").css({"border-top": "3px solid red"});
							}
							$(".OPGWList"+(i+1)+"").html("<td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label></td>" +
									"<td>"+OPGWList[i]+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2'>地线双联悬垂串</option>" +
									"</select></td><td><input class='input_control' value='OX"+(i+1)+"1'></td><td><input class='input_control' value='一般悬垂塔'></td><td><select class='input_control'>" +
									"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control' value='ON"+(i+1)+"1'></td>" +
									"<td><input class='input_control' value='一般耐张塔（直通型）'></td></tr>");
							var tr="";
		
								tr+="<tr class='OPGWList"+(i+1)+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label><label title='删除行' class='delTr'><i class='fa fa-minus'></i></label></td>" +
								"<td>"+OPGWList[i]+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2'>地线双联悬垂串</option>" +
								"</select></td><td><input class='input_control' value='OX"+(i+1)+"2'></td><td><input class='input_control' value='重要交叉跨越悬垂塔'></td><td><select class='input_control'>" +
								"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control' value='ON"+(i+1)+"2'></td>" + 
								"<td><input class='input_control' value='一般耐张塔（接续型）'></td></tr>";
						
								tr+="<tr class='OPGWList"+(i+1)+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label><label title='删除行' class='delTr'><i class='fa fa-minus'></i></label></td>" +
								"<td>"+OPGWList[i]+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2'>地线双联悬垂串</option>" +
								"</select></td><td><input class='input_control' value=''></td><td><input class='input_control' value=''></td><td><select class='input_control'>" +
								"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control' value='ON"+(i+1)+"3'></td>" + 
								"<td><input class='input_control' value='变电站进线档构架侧'></td></tr>";
								
							$(".OPGWList"+(i+1)+"").after(tr);
						}
					}
					
				
				}
			}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});
}

//生成导线型号表格
partsConfig.prototype.createWireTable = function(wireList){
	var tr="";
	for (var i = 0; i <wireList.length; i++) {
		tr+="<tr class='wireList"+(i+1)+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label></td>" +
				"<td>"+wireList[i]+"</td><td><select class='input_control'><option value='1'>导线单联悬垂串</option><option value='2'>导线双联悬垂串</option>" +
						"</select></td><td><input class='input_control'></td><td><input class='input_control'></td><td><select class='input_control'>" +
						"<option value='1'>导线单联耐张串</option><option value='2'>导线双联耐张串</option></select></td><td><input class='input_control'></td>" +
						"<td><input class='input_control'></td><td><select class='input_control'><option value='1'>跳线单联悬垂串</option><option value='2'>" +
						"跳线双联悬垂串</option></select></td><td><input class='input_control'></td><td><input class='input_control'></td></tr>";
	}
	$("#wireTableTr").after(tr);
}

//生成地线型号表格
partsConfig.prototype.createGroundTable = function(groundList){

	var tr="";
	for (var i = 0; i <groundList.length; i++) {
		tr+="<tr class='groundList"+(i+1)+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label></td>" +
		"<td>"+groundList[i]+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2'>地线双联悬垂串</option>" +
		"</select></td><td><input class='input_control'></td><td><input class='input_control'></td><td><select class='input_control'>" +
		"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control'></td>" +
		"<td><input class='input_control'></td></tr>";
	}
	$("#groundTableTr").after(tr);

}

//生成OPGW型号表格
partsConfig.prototype.createOPGWTable = function(OPGWList){

	var tr="";
	for (var i = 0; i <OPGWList.length; i++) {
		tr+="<tr class='OPGWList"+(i+1)+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label></td>" +
		"<td>"+OPGWList[i]+"</td><td><select class='input_control'><option value='1'>OPGW光缆单联悬垂串</option><option value='2'>OPGW光缆双联悬垂串</option>" +
		"</select></td><td><input class='input_control'></td><td><input class='input_control'></td><td><select class='input_control'>" +
		"<option value='1'>OPGW光缆单联耐张串</option><option value='2'>OPGW光缆双联耐张串</option></select></td><td><input class='input_control'></td>" +
		"<td><input class='input_control'></td></tr>";
	}
	$("#OPGWTableTr").after(tr);

}

//生成导线型号默认表格
partsConfig.prototype.createwireDefaultTable = function(wireData){
	var wireList =stingConfigData.wireList;
	var tr="";
	for (var i = 0; i <wireList.length; i++) {
		var option1="";
		var option2="";
		var option3="";
		tr+="<tr class='wireDefault"+(i+1)+"'><td>"+wireList[i]+"</td><td><select class='input_control wireHang"+(i+1)+"'>";
					
		for (var j = 0; j <wireData[wireList[i]].length; j++) {
			option1+="<option value='"+wireData[wireList[i]][j][1]+"'>"+wireData[wireList[i]][j][1]+"</option>";
			option2+="<option value='"+wireData[wireList[i]][j][4]+"'>"+wireData[wireList[i]][j][4]+"</option>";
			option3+="<option value='"+wireData[wireList[i]][j][7]+"'>"+wireData[wireList[i]][j][7]+"</option>";
		}
			tr+=""+option1+"</select></td><td><select class='input_control wireNai"+(i+1)+"'>"+
				option2+"</select></td><td><select class='input_control tiaoHang"+(i+1)+"'>"+
				option3+"</select></td><td><input class='input_control' value='10'></td>" +
				"<td><input class='input_control' value='45'></td></tr>";
	}
	$("#wireDefaultTr").after(tr);
}

//生成地线型号默认表格
partsConfig.prototype.creategroundDefaultTable = function(groundData){
	var groundList =stingConfigData.groundList;
	var tr="";
	for (var i = 0; i <groundList.length; i++) {
		var option1="";
		var option2="";
		tr+="<tr class='groundDefault"+(i+1)+"'><td>"+groundList[i]+"</td><td><select class='input_control groundHang"+(i+1)+"'>";
					
		for (var j = 0; j <groundData[groundList[i]].length; j++) {
			option1+="<option value='"+groundData[groundList[i]][j][1]+"'>"+groundData[groundList[i]][j][1]+"</option>";
			option2+="<option value='"+groundData[groundList[i]][j][4]+"'>"+groundData[groundList[i]][j][4]+"</option>";
		}
			tr+=""+option1+"</select></td><td><select class='input_control groundNai"+(i+1)+"'>"+
				option2+"</select></td></tr>";
	}
	$("#groundDefaultTr").after(tr);
}

//生成OPGW型号默认表格
partsConfig.prototype.createOPGWDefaultTable = function(OPGWData){
	var OPGWList =stingConfigData.OPGWList;
	var tr="";
	for (var i = 0; i <OPGWList.length; i++) {
		var option1="";
		var option2="";
		tr+="<tr class='OPGWDefault"+(i+1)+"'><td>"+OPGWList[i]+"</td><td><select class='input_control OPGWHang"+(i+1)+"'>";
					
		for (var j = 0; j <OPGWData[OPGWList[i]].length; j++) {
			option1+="<option value='"+OPGWData[OPGWList[i]][j][1]+"'>"+OPGWData[OPGWList[i]][j][1]+"</option>";
			option2+="<option value='"+OPGWData[OPGWList[i]][j][4]+"'>"+OPGWData[OPGWList[i]][j][4]+"</option>";
		}
			tr+=""+option1+"</select></td><td><select class='input_control OPGWNai"+(i+1)+"'>"+
				option2+"</select></td></tr>";
	}
	$("#OPGWDefaultTr").after(tr);
}

//新增行
partsConfig.prototype.addTableTr = function(e){
	var className;
	var thiz = e.currentTarget;
	
	var thisTr = $(thiz).closest("tr");
	className = thisTr[0].className;
	var wireName = $("."+className+" td").eq(1).text()
	if(className.replace(/[0-9]/ig,"")=="wireList"){
		var tr="<tr class='"+className+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label><label title='删除行' class='delTr'><i class='fa fa-minus'></i></label></td>" +
		"<td>"+wireName+"</td><td><select class='input_control'><option value='1'>导线单联悬垂串</option><option value='2'>导线双联悬垂串</option>" +
		"</select></td><td><input class='input_control'></td><td><input class='input_control'></td><td><select class='input_control'>" +
		"<option value='1'>导线单联耐张串</option><option value='2'>导线双联耐张串</option></select></td><td><input class='input_control'></td>" +
		"<td><input class='input_control'></td><td><select class='input_control'><option value='1'>跳线单联悬垂串</option><option value='2'>" +
		"跳线双联悬垂串</option></select></td><td><input class='input_control'></td><td><input class='input_control'></td></tr>";
	}
	else if(className.replace(/[0-9]/ig,"")=="OPGWList"){
		var tr="<tr class='"+className+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label><label title='删除行' class='delTr'><i class='fa fa-minus'></i></label></td>" +
		"<td>"+wireName+"</td><td><select class='input_control'><option value='1'>OPGW光缆单联悬垂串</option><option value='2'>OPGW光缆双联悬垂串</option>" +
		"</select></td><td><input class='input_control'></td><td><input class='input_control'></td><td><select class='input_control'>" +
		"<option value='1'>OPGW光缆单联耐张串</option><option value='2'>OPGW光缆双联耐张串</option></select></td><td><input class='input_control'></td>" +
		"<td><input class='input_control'></td></tr>";
	}
	else{
		var tr="<tr class='"+className+"'><td><label title='新增行' class='addTr'><i class='fa fa-plus'></i></label><label title='删除行' class='delTr'><i class='fa fa-minus'></i></label></td>" +
		"<td>"+wireName+"</td><td><select class='input_control'><option value='1'>地线单联悬垂串</option><option value='2'>地线双联悬垂串</option>" +
		"</select></td><td><input class='input_control'></td><td><input class='input_control'></td><td><select class='input_control'>" +
		"<option value='1'>地线单联耐张串</option><option value='2'>地线双联耐张串</option></select></td><td><input class='input_control'></td>" +
		"<td><input class='input_control'></td></tr>";
	}
	$(thisTr).after(tr);
}

//删除行
partsConfig.prototype.delTableTr = function(e){
	var thiz = e.currentTarget;
	Tools.tipsConfirm("确定要删除吗?",function(){
	var thisTr = $(thiz).closest("tr");
	$(thisTr).remove();
	Tools.tipsMsg("删除成功！");
	},false);
}

//获取导线配置信息
partsConfig.prototype.getWireParam = function(){
	var wireobj = {};//导线代号配置信息
	var wireList =stingConfigData.wireList;
	if (!Tools.isEmpty(wireList)) {
		for (var i = 0; i <wireList.length; i++) {
			var wireArr = new Array();
			for(var j = 0; j <$(".wireList"+(i+1)+" input").length/6; j++){
				var list = new Array();
				list.push($(".wireList"+(i+1)+" select").eq(j*3).val());	
				list.push($(".wireList"+(i+1)+" input").eq(j*6).val());	
				list.push($(".wireList"+(i+1)+" input").eq(j*6+1).val());
				list.push($(".wireList"+(i+1)+" select").eq(j*3+1).val());
				list.push($(".wireList"+(i+1)+" input").eq(j*6+2).val());
				list.push($(".wireList"+(i+1)+" input").eq(j*6+3).val());
				list.push($(".wireList"+(i+1)+" select").eq(j*3+2).val());
				list.push($(".wireList"+(i+1)+" input").eq(j*6+4).val());
				list.push($(".wireList"+(i+1)+" input").eq(j*6+5).val());
				wireArr.push(list);
			}
	
			wireobj[wireList[i]]=wireArr;
		}
	}
	return wireobj;
}

//获取地线配置信息
partsConfig.prototype.getGroundParam = function(){
	var groundobj = {};//地线代号配置信息
	var groundList =stingConfigData.groundList;
	if (!Tools.isEmpty(groundList)) {
		for (var i = 0; i <groundList.length; i++) {
			var groundArr = new Array();
			for(var j = 0; j <$(".groundList"+(i+1)+" input").length/4; j++){
				var list = new Array();
				list.push($(".groundList"+(i+1)+" select").eq(j*2).val());	
				list.push($(".groundList"+(i+1)+" input").eq(j*4).val());	
				list.push($(".groundList"+(i+1)+" input").eq(j*4+1).val());
				list.push($(".groundList"+(i+1)+" select").eq(j*2+1).val());
				list.push($(".groundList"+(i+1)+" input").eq(j*4+2).val());
				list.push($(".groundList"+(i+1)+" input").eq(j*4+3).val());
				groundArr.push(list);
			}
				groundobj[groundList[i]]=groundArr;
		}
	}
	return groundobj;
}

//获取OPGW配置信息
partsConfig.prototype.getOPGWParam = function(){
	var OPGWobj = {};//地线代号配置信息
	var OPGWList =stingConfigData.OPGWList;
	if (!Tools.isEmpty(OPGWList)) {
		for (var i = 0; i <OPGWList.length; i++) {
			var OPGWArr = new Array();
			for(var j = 0; j <$(".OPGWList"+(i+1)+" input").length/4; j++){
				var list = new Array();
				list.push($(".OPGWList"+(i+1)+" select").eq(j*2).val());	
				list.push($(".OPGWList"+(i+1)+" input").eq(j*4).val());	
				list.push($(".OPGWList"+(i+1)+" input").eq(j*4+1).val());
				list.push($(".OPGWList"+(i+1)+" select").eq(j*2+1).val());
				list.push($(".OPGWList"+(i+1)+" input").eq(j*4+2).val());
				list.push($(".OPGWList"+(i+1)+" input").eq(j*4+3).val());
				OPGWArr.push(list);
			}
			OPGWobj[OPGWList[i]]=OPGWArr;
		}
	}
	return OPGWobj;
}

//获取导线配置信息
partsConfig.prototype.getWireDefaultParam = function(){
	var wireobj = {};//导线代号配置信息
	var wireList =stingConfigData.wireList;
	if (!Tools.isEmpty(wireList)) {
		
		for (var i = 0; i <wireList.length; i++) {
				var list = new Array();
				list.push($(".wireHang"+(i+1)+" option").map(function(){return $(this).val();}).get().join(","));
				list.push($(".wireHang"+(i+1)).val());	
				list.push($(".wireNai"+(i+1)+" option").map(function(){return $(this).val();}).get().join(","));
				list.push($(".wireNai"+(i+1)).val());	
				list.push($(".tiaoHang"+(i+1)+" option").map(function(){return $(this).val();}).get().join(","));
				list.push($(".tiaoHang"+(i+1)).val());		
				list.push($(".wireDefault"+(i+1)+" input").eq(0).val());	
				list.push($(".wireDefault"+(i+1)+" input").eq(1).val());	
		
				wireobj[wireList[i]]=list;
		}
	}
	return wireobj;
}

//获取地线配置信息
partsConfig.prototype.getGroundDefaultParam = function(){
	var groundobj = {};//地线代号配置信息
	var groundList =stingConfigData.groundList;
	if (!Tools.isEmpty(groundList)) {

		for (var i = 0; i <groundList.length; i++) {
				var list = new Array();
				list.push($(".groundHang"+(i+1)+" option").map(function(){return $(this).val();}).get().join(","));
				list.push($(".groundHang"+(i+1)).val());	
				list.push($(".groundNai"+(i+1)+" option").map(function(){return $(this).val();}).get().join(","));
				list.push($(".groundNai"+(i+1)).val());	
					
				groundobj[groundList[i]]=list;
		}
	}
	return groundobj;
}

//获取OPGW配置信息
partsConfig.prototype.getOPGWDefaultParam = function(){
	var OPGWobj = {};//地线代号配置信息
	var OPGWList =stingConfigData.OPGWList;
	if (!Tools.isEmpty(OPGWList)) {
		for (var i = 0; i <OPGWList.length; i++) {
			
			for (var i = 0; i <OPGWList.length; i++) {
					var list = new Array();
					list.push($(".OPGWHang"+(i+1)+" option").map(function(){return $(this).val();}).get().join(","));
					list.push($(".OPGWHang"+(i+1)).val());	
					list.push($(".OPGWNai"+(i+1)+" option").map(function(){return $(this).val();}).get().join(","));
					list.push($(".OPGWNai"+(i+1)).val());	
			
					OPGWobj[OPGWList[i]]=list;
			}
		}
	}
	return OPGWobj;
}


//获取防震锤信息
partsConfig.prototype.getVibrationDamperParam = function(){

	var arr = new Array();
	for (var i = 0; i <4; i++) {
		for (var j = 1; j <4; j++) {
			var obj = new Object();
			obj.vibrationType = i;
			if(i==0){
				obj.minDiameter = 0;//直径范围最小值
				obj.maxDiameter = 0;//直径范围最大值
				obj.minSpan = $("#wireRange"+i+" input").eq((j-1)*3).val();//档距下限
				obj.maxSpan = $("#wireRange"+i+" input").eq(1+(j-1)*3).val();//档距上限
				obj.count = $("#wireRange"+i+" input").eq(2+(j-1)*3).val();//数量
			}else{
				obj.minDiameter = $("#wireRange"+i+" input").eq(0).val();//直径范围最小值
				obj.maxDiameter = $("#wireRange"+i+" input").eq(1).val();//直径范围最大值
				obj.minSpan = $("#wireRange"+i+" input").eq(2+(j-1)*3).val();//档距下限
				obj.maxSpan = $("#wireRange"+i+" input").eq(3+(j-1)*3).val();//档距上限
				obj.count = $("#wireRange"+i+" input").eq(4+(j-1)*3).val();//数量
			}
	
			obj.sortNo = j;//序号
			arr.push(obj);
		}
	}
	
	return arr;
}


//保存串行配置
partsConfig.prototype.saveStingConfig = function(){
	if (Tools.isEmpty(stingConfigData)) {
		Tools.tipsMsg('暂无数据');
		return;
	}
	var wireParam =partsConfig.getWireParam();//导线配置信息
	var groundParam =partsConfig.getGroundParam();//地线配置信息
	var OPGWParam =partsConfig.getOPGWParam();//OPGW配置信息
	var url = path + "/Parts/saveStingConfig.action";
	 $.ajax({
		 type:'post',
		 url:url,
		 data:{
				'id' : id,
				'wire' : JSON.stringify(wireParam),
				'ground' : JSON.stringify(groundParam),
				'OPGW' : JSON.stringify(OPGWParam)
			},
		 dataType : 'json',
		 success : function(data) {
				if (data.msg == "success") {
					layer.confirm("保存成功！", {
						btn : "确认"
					}, function() {//按钮执行事件
						window.location.reload();
					});							
				} else {
					Tools.tipsMsg("保存失败！");
				}	
			}
	 });
};

//保存默认配置
partsConfig.prototype.saveDefaultConfig = function(){
	if (Tools.isEmpty(stingConfigData)) {
		Tools.tipsMsg('暂无数据');
		return;
	}
	
	var wireParam =partsConfig.getWireDefaultParam();//导线配置信息
	var groundParam =partsConfig.getGroundDefaultParam();//地线配置信息
	var OPGWParam =partsConfig.getOPGWDefaultParam();//OPGW配置信息
	var url = path + "/Parts/saveDefaultConfig.action";
	 $.ajax({
		 type:'post',
		 url:url,
		 data:{
				'id' : id,
				'wire' : JSON.stringify(wireParam),
				'ground' : JSON.stringify(groundParam),
				'OPGW' : JSON.stringify(OPGWParam)
			},
		 dataType : 'json',
		 success : function(data) {
				if (data.msg == "success") {
					partsConfig.saveVibrationDamper();
					} else {
					Tools.tipsMsg("保存失败！");
				}	
			}
	 });
};


//保存防震锤配置
partsConfig.prototype.saveVibrationDamper = function(){
	
	var vibrationParam =partsConfig.getVibrationDamperParam();//保存防震锤配置配置

	var url = path + "/Parts/saveVibrationDamper.action";
	 $.ajax({
		 type:'post',
		 url:url,
		 data:{
				'id' : id,
				'vibrationParam' : JSON.stringify(vibrationParam)
			},
		 dataType : 'json',
		 success : function(data) {
				if (data.msg == "success") {
					Tools.tipsMsg("保存成功！");
					} else {
					Tools.tipsMsg("保存失败！");
				}	
			}
	 });
};

//获取光缆盘长计算配置信息
partsConfig.prototype.getCable = function(){
	var obj = {};//地线支架-下横担高度
	var arr = new Array();
	for (var i = 0; i <heightList.length; i++) {
		var height = $("#"+heightList[i]+"").val();
		obj[heightList[i]]=height;
		}
	
	return obj;
}

//获取防震锤信息
partsConfig.prototype.getHammerType = function(){
	var obj = {};//防震锤信息
	var arr = new Array();
	for (var i = 0; i <sumlist.length; i++) {
		var hammerType = $("#hammerType"+i+"").val();
		obj[sumlist[i]]=hammerType;
		}
	
	return obj;
}

//保存光缆盘长计算配置
partsConfig.prototype.saveCable = function(){
	
	var cable =partsConfig.getCable();
	var modulus =$("#modulus").val();
	var margin =$("#margin").val();

	var url = path + "/Parts/saveCable.action";
	 $.ajax({
		 type:'post',
		 url:url,
		 data:{
				'id' : id,
				'modulus' : modulus,
				'margin' : margin,
				'cable' : JSON.stringify(cable)
			},
		 dataType : 'json',
		 success : function(data) {
				if (data.msg == "success") {
					Tools.tipsMsg("保存成功！");
					} else {
					Tools.tipsMsg("保存失败！");
				}	
			}
	 });
};

//保存光缆盘长计算配置
partsConfig.prototype.saveHammerType = function(){
	
	var hammerType =partsConfig.getHammerType();

	var url = path + "/Parts/saveHammerType.action";
	 $.ajax({
		 type:'post',
		 url:url,
		 data:{
				'id' : id,
				'hammerType' : JSON.stringify(hammerType)
			},
		 dataType : 'json',
		 success : function(data) {
				if (data.msg == "success") {
					Tools.tipsMsg("保存成功！");
					} else {
					Tools.tipsMsg("保存失败！");
				}	
			}
	 });
};

/* 返回
*/
partsConfig.prototype.backUpPage = function(){
	location.href = path+ "/Parts/projectList.action";
};