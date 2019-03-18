var stingConfigData;//配置信息
var codeObj = {};//导线代号配置信息
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
		"JLHA3-940":"","JLHA3-975":"","OPGW-48":"","OPGW-24":""
}


function partsExplain() {
	this.initExplainTable();
	this.initHammerTable();
	//导出
	$("#export_btn").on("click",this.JSONToExcelConvertor);
	// 返回
	$("#btn_apply_back").on("click",this.backUpPage);
}
/**
 * 导出
 */
partsExplain.prototype.JSONToExcelConvertor = function(){
	var timestamp = Date.parse(new Date());
	exportExcel("explainTable",timestamp+"组配件明细表说明");
}

/* 
 * 返回
*/
partsExplain.prototype.backUpPage = function(){
	location.href = path+ "/Parts/projectList.action";
};

/**
 * 初始化组配件说明
 */
partsExplain.prototype.initExplainTable = function(){

	$.ajax({
		type : 'post',
		url : path + 'Parts/getWireTypeById.action',
		data : {
			'id' : id
	},
		success : function(data) {
			if (!Tools.isEmpty(data)) {
				$("#pageCode").text(projectCode+"-D03");//工程编号
				stingConfigData=data;
				partsExplain.initWireTable();
			}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});

}

/**
 * 初始化防震锤表格
 */
partsExplain.prototype.initHammerTable = function(){
	var attList = eval("(" + damper + ")");
	var groundRange1;//地线安装1个防震锤的范围
	var groundRange2;//地线安装2个防震锤的范围
	var groundRange3;//地线安装3个防震锤的范围
	$.each(attList,function(index,obj){
		
	if(obj.sortNo==1){
		groundRange1 = obj.minSpan+"m~"+obj.maxSpan+"m";
	}else if(obj.sortNo==2){
		groundRange2 = obj.minSpan+"m~"+obj.maxSpan+"m";
	}else if(obj.sortNo==3){
		groundRange3 = obj.minSpan+"m~"+obj.maxSpan+"m";
	}
	});
	
	if (!Tools.isEmpty(hammerType)) {
	hammerTypeArr = JSON.parse(hammerType);
	}
	
	if (!Tools.isEmpty(hammerCountList)) {
	var wirelist = new Array();
	var wiresumlist = new Array();
	for (var i = 0; i <hammerCountList[0].length; i++) {
		var obj = new Object;
			obj = [hammerCountList[0][i],strToHammercount(hammerCountList[1][i]),hammerCountList[6][i]];//导线型号，导线防震锤数量，导线直径
			wirelist.push([hammerCountList[0][i]]);
			wiresumlist.push(obj);	
	}
	var wireHammer=arrayCnt(wirelist,wiresumlist);
	
	for(var i = 0; i <wireHammer.length; i++){
		var wireRange1;//导线线安装1个防震锤的范围
		var wireRange2;//导线安装2个防震锤的范围
		var wireRange3;//导线安装3个防震锤的范围
		if(0<parseInt(wireHammer[i][2])<=12){
			wireRange1=	"0m～300m"
		    wireRange2=	"300m～600m"
			wireRange3=	"600m～900m"
		}else if(12<parseInt(wireHammer[i][2])<=22){
				wireRange1=	"0m～350m"
			    wireRange2=	"350m～700m"
				wireRange3=	"700m～1000m"
			}
		else if(22<parseInt(wireHammer[i][2])<=37.1){
				wireRange1=	"0m～450m"
			    wireRange2=	"450m～800m"
				wireRange3=	"800m～1200m"
			}

			var tr="<tr style='text-align:center;'><td></td><td style='border: 1px solid black'>"+wireHammer[i][0]+"</td><td style='border: 1px solid black'>"
			+hammerTypeArr[wireHammer[i][0]]+"</td><td style='border: 1px solid black'>"
			+wireHammer[i][1]+"</td><td style='border: 1px solid black'>"+wireRange1+"</td><td style='border: 1px solid black'>"+wireRange2+"</td><td style='border: 1px solid black'>"+wireRange3+"</td><td></td><td></td><td></td></tr>"

		$("#hammerTr").after(tr);
	}
	
	var groundlist = new Array();
	var groundsumlist = new Array();
	for (var i = 0; i <hammerCountList[0].length; i++) {
		var obj = new Object;
			obj = [hammerCountList[2][i],strToHammercount(hammerCountList[3][i])];//地线型号，地线防震锤数量
			groundlist.push([hammerCountList[2][i]]);
			groundsumlist.push(obj);	
	}
	var groundHammer=arrayCnt1(groundlist,groundsumlist);
	
	for(var i = 0; i <groundHammer.length; i++){
	
			var tr="<tr style='text-align:center;'><td></td><td style='border: 1px solid black'>"+groundHammer[i][0]+"</td><td style='border: 1px solid black'>"
			+hammerTypeArr[groundHammer[i][0]]+"</td><td style='border: 1px solid black'>"
			+groundHammer[i][1]+"</td><td style='border: 1px solid black'>"+groundRange1+"</td><td style='border: 1px solid black'>"+groundRange2+"</td><td style='border: 1px solid black'>"+groundRange3+"</td><td></td><td></td><td></td></tr>"

		$("#hammerTr").after(tr);
	}
	
	var OPGWlist = new Array();
	var OPGWsumlist = new Array();
	for (var i = 0; i <hammerCountList[0].length; i++) {
		var obj = new Object;
			obj = [hammerCountList[4][i],strToHammercount(hammerCountList[5][i])];//地线型号，地线防震锤数量
			OPGWlist.push([hammerCountList[4][i]]);
			OPGWsumlist.push(obj);	
	}
	var OPGWHammer=arrayCnt1(OPGWlist,OPGWsumlist);
	
	for(var i = 0; i <OPGWHammer.length; i++){
	
			var tr="<tr style='text-align:center;'><td></td><td style='border: 1px solid black'>"+OPGWHammer[i][0]+"</td><td style='border: 1px solid black'>"
			+hammerTypeArr[OPGWHammer[i][0]]+"</td><td style='border: 1px solid black'>"
			+OPGWHammer[i][1]+"</td><td style='border: 1px solid black'>"+groundRange1+"</td><td style='border: 1px solid black'>"+groundRange2+"</td><td style='border: 1px solid black'>"+groundRange3+"</td><td></td><td></td><td></td></tr>"

		$("#hammerTr").after(tr);
	}
	
	
	}
	
	}


/**
 * 初始化组配件说明（导线数量）
 */
partsExplain.prototype.initWireTable = function(){

	$.ajax({
		type : 'post',
		url : path + 'Parts/getConfigDataById.action',
		data : {
			'id' : id
	},
		success : function(data) {
			if (!Tools.isEmpty(data)) {
				codeObj = {};//导线代号配置信息
				var wireData =data.wireData;
				if (!Tools.isEmpty(wireData)) {
					wireData=JSON.parse(wireData);
					var wireList =stingConfigData.wireList;
					if (!Tools.isEmpty(wireList)) {
						for (var i = 0; i <wireList.length; i++) {
						    var wireDetails = wireData[wireList[i]];
							for (var j = 0; j <wireDetails.length; j++) {
							
								if(!Tools.isEmpty(wireDetails[j][1])){
									var wireArr = new Array();
									var list = new Array();
									list.push("导线"+getJoin(wireDetails[j][0])+"悬垂串");
									list.push(wireDetails[j][2]);
									wireArr.push(list);
									codeObj[wireDetails[j][1]]=wireArr;
								}
								
								if(!Tools.isEmpty(wireDetails[j][4])){
									var wireArr = new Array();
									var list = new Array();
									list.push("导线"+getJoin(wireDetails[j][3])+"耐张串");
									list.push(wireDetails[j][5]);
									wireArr.push(list);
									codeObj[wireDetails[j][4]]=wireArr;
								}
								
								if(!Tools.isEmpty(wireDetails[j][7])){
									var wireArr = new Array();
									var list = new Array();
									list.push("跳线"+getJoin(wireDetails[j][6])+"悬垂串");
									list.push(wireDetails[j][8]);
									wireArr.push(list);
									codeObj[wireDetails[j][7]]=wireArr;
								}
							
							}
						}
					}
					
				}
						
				var groundData =data.groundData;
				if (!Tools.isEmpty(groundData)) {
					groundData=JSON.parse(groundData);
					var groundList =stingConfigData.groundList;
					if (!Tools.isEmpty(groundList)) {
						for (var i = 0; i <groundList.length; i++) {
						    var groundDetails = groundData[groundList[i]];
							for (var j = 0; j <groundDetails.length; j++) {
							
								if(!Tools.isEmpty(groundDetails[j][1])){
									var groundArr = new Array();
									var list = new Array();
									list.push("地线"+getJoin(groundDetails[j][0])+"悬垂串");
									list.push(groundDetails[j][2]);
									groundArr.push(list);
									codeObj[groundDetails[j][1]]=groundArr;
								}
								
								if(!Tools.isEmpty(groundDetails[j][4])){
									var groundArr = new Array();
									var list = new Array();
									list.push("地线"+getJoin(groundDetails[j][3])+"耐张串");
									list.push(groundDetails[j][5]);
									groundArr.push(list);
									codeObj[groundDetails[j][4]]=groundArr;
								}
												
							}
						}
					}
					
				}
				
				var OPGWData =data.OPGWData;
				if (!Tools.isEmpty(OPGWData)) {
					OPGWData=JSON.parse(OPGWData);
					var OPGWList =stingConfigData.OPGWList;
					if (!Tools.isEmpty(OPGWList)) {
						for (var i = 0; i <OPGWList.length; i++) {
						    var OPGWDetails = OPGWData[OPGWList[i]];
							for (var j = 0; j <OPGWDetails.length; j++) {
							
								if(!Tools.isEmpty(OPGWDetails[j][1])){
									var OPGWArr = new Array();
									var list = new Array();
									list.push("OPGW光缆"+getJoin(OPGWDetails[j][0])+"悬垂串");
									list.push(OPGWDetails[j][2]);
									OPGWArr.push(list);
									codeObj[OPGWDetails[j][1]]=OPGWArr;
								}
								
								if(!Tools.isEmpty(OPGWDetails[j][4])){
									var OPGWArr = new Array();
									var list = new Array();
									list.push("OPGW光缆"+getJoin(OPGWDetails[j][3])+"耐张串");
									list.push(OPGWDetails[j][5]);
									OPGWArr.push(list);
									codeObj[OPGWDetails[j][4]]=OPGWArr;
								}						
							}
						}
					}
					
				}
				partsExplain.createWireTable();
				partsExplain.createOPGWTable();
			}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});

}

/**
 * 生成导线数量表格
 */
partsExplain.prototype.createWireTable = function(){
	var list = new Array();
	for (var i = 1; i <codeCountList[0].length; i++) {
		if(isNumber(codeCountList[1][i])){
			list.push(codeCountList[0][i])
		}
		if(isNumber(codeCountList[3][i])){
			list.push(codeCountList[2][i])
		}
		if(isNumber(codeCountList[5][i])){
			list.push(codeCountList[4][i])
		}
		if(isNumber(codeCountList[1][7])){
			list.push(codeCountList[6][i])
		}
	}
	
	list=removeItem(list);
	
	var countlists = new Array();
	for (var j = 0; j <list.length; j++) {
	if(!Tools.isEmpty(list[j])){
		var count = 0;
		for (var i = 1; i <codeCountList[0].length; i++) {
			if(codeCountList[0][i]==list[j]&&isNumber(codeCountList[1][i])){
				count+= parseInt(codeCountList[1][i]);
			}
			if(codeCountList[2][i]==list[j]&&isNumber(codeCountList[3][i])){
				count+= parseInt(codeCountList[3][i]);
			}
			if(codeCountList[4][i]==list[j]&&isNumber(codeCountList[5][i])){
				count+= parseInt(codeCountList[5][i]);
			}
			if(codeCountList[6][i]==list[j]&&isNumber(codeCountList[7][i])){
				count+= parseInt(codeCountList[7][i]);
			}
		}
		var countlist = new Array();
		countlist.push(list[j]);
		countlist.push(count);
		countlists.push(countlist);
	}
	}
	
	var tr="";
	for (var i = 0; i <countlists.length; i++) {
		tr+="<tr style='text-align:center;'><td></td><td style='border: 1px solid black'>"+codeObj[countlists[i][0]][0][0]+"</td><td style='border: 1px solid black'>"
		+countlists[i][0]+"</td><td style='border: 1px solid black'>"
		+countlists[i][1]+"</td><td style='border: 1px solid black'>"+codeObj[countlists[i][0]][0][1]+"</td><td></td><td></td><td></td><td></td><td></td></tr>"
	}
	$("#wireCountTr").after(tr);
	}

/**
 * 生成OPGW光缆表格
 */
partsExplain.prototype.createOPGWTable = function(){
	var diskArr=[];//左侧
	var diskArr2=[];//右侧
	var OPGWlists = new Array();
	for (var i = 1; i <codeCountList[0].length; i++) {
		if(isNumber(codeCountList[9][i])&&codeCountList[9][i]==codeCountList[9][i-1]&&codeCountList[9][i]!=codeCountList[9][i+1]){
			diskArr.push(i);
		}
	}
	var count =0;
	for (var i = 0; i <diskArr.length-1; i++) {
		var diskLength = codeCountList[8][diskArr[i]];
		var OPGWlist = new Array();
		OPGWlist.push(diskLength.substring(diskLength.indexOf('(')));//盘号
		OPGWlist.push(diskLength.substring(0,diskLength.indexOf('m')));//盘长
		OPGWlist.push(codeCountList[12][diskArr[i]]);//起点塔号
		OPGWlist.push(codeCountList[13][diskArr[i]]);//起点塔型
		OPGWlist.push(codeCountList[12][diskArr[i+1]]);//终点塔号
		OPGWlist.push(codeCountList[13][diskArr[i+1]]);//终点塔型
		OPGWlists.push(OPGWlist);
		count +=parseInt(diskLength.substring(0,diskLength.indexOf('m')));
	}
	
	for (var i = 1; i <codeCountList[0].length; i++) {
		if(isNumber(codeCountList[11][i])&&codeCountList[11][i]==codeCountList[11][i-1]&&codeCountList[11][i]!=codeCountList[11][i+1]){
			diskArr2.push(i);
		}
	}
	for (var i = 0; i <diskArr2.length-1; i++) {
		var diskLength = codeCountList[10][diskArr2[i]];
		var OPGWlist = new Array();
		OPGWlist.push(diskLength.substring(diskLength.indexOf('(')));//盘号
		OPGWlist.push(diskLength.substring(0,diskLength.indexOf('m')));//盘长
		OPGWlist.push(codeCountList[12][diskArr2[i]]);//起点塔号
		OPGWlist.push(codeCountList[13][diskArr2[i]]);//起点塔型
		OPGWlist.push(codeCountList[12][diskArr2[i+1]]);//终点塔号
		OPGWlist.push(codeCountList[13][diskArr2[i+1]]);//终点塔型
		OPGWlists.push(OPGWlist);
		count +=parseInt(diskLength.substring(0,diskLength.indexOf('m')));
	}
	
	var tr="";
	for (var i = 0; i <OPGWlists.length; i++) {
		tr+="<tr style='text-align:center;'><td></td><td style='border: 1px solid black'>"+OPGWlists[i][0]+"</td><td style='border: 1px solid black'>"
		+OPGWlists[i][1]+"</td><td style='border: 1px solid black'>"+OPGWlists[i][2]+"</td><td style='border: 1px solid black'>"
		+OPGWlists[i][3]+"</td><td style='border: 1px solid black'>"+OPGWlists[i][4]+"</td><td style='border: 1px solid black'>"+OPGWlists[i][5]+"</td><td></td><td></td></tr>"
	}
	tr+="<tr style='text-align:center;'><td></td><td style='border: 1px solid black'>合计</td><td style='border: 1px solid black'>"
	+count+"</td><td style='border: 1px solid black'></td><td style='border: 1px solid black'>"+
	"</td><td style='border: 1px solid black'></td><td style='border: 1px solid black'></td><td></td><td></td></tr>"
	$("#OPGWTr").after(tr);
	}

/**
 * 单联双联转化
**/
function getJoin(str){
	var Join = "";
	if(str=="1"){
		Join ="单联";
	}else if(str=="2"){
		Join ="双联";
	}
	return Join;
	}

/**
* 校验只要是数字（包含正负整数，0以及正负浮点数）就返回true
**/
function isNumber(val){

    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }

}

/**
* 数组去重
**/
function removeItem(arr) {
    for(var i = 0; i < arr.length-1; i++){
        for(var j = i+1; j < arr.length; j++){
           if(arr[i]==arr[j]){

              arr.splice(j,1);//console.log(arr[j]);
               j--;
           }
       }
   }
   return arr;
 }

/**
* 防震锤数量转换
**/
function strToHammercount(str) {
	var count =0;
	if(str.length >2){
	if(str.indexOf("×") != -1){
		count=parseInt(str.substring(0,str.indexOf("×")))*parseInt(str.substring(str.indexOf("×")+1));
	}
}
   return count;
 }

/* 数组去重
*/
function distinct(list){
	var arr = list,
	    i,
	  obj = {},
	  result = [],
	  len = arr.length;
	 for(i = 0; i< arr.length; i++){
	  if(!obj[arr[i]]&&!Tools.isEmpty(arr[i])){ //如果能查找到，证明数组元素重复了
	   obj[arr[i]] = 1;
	   result.push(arr[i]);
	  }
	 }
	 return result;
}

/**
* 数组合并求和
**/
function arrayCnt(arr0,arr) {
	var newArr = distinct(arr0);

	var newarr2 = new Array(newArr.length);
	var newarr3 = new Array(newArr.length);
	for(var t = 0; t < newarr2.length; t++) {
	 newarr2[t] = 0;
	}
	for(var p = 0; p < newArr.length; p++) {
	 for(var j = 0; j < arr.length; j++) {
	 if(newArr[p].toString() == arr[j][0].toString()) {
	  newarr2[p]=newarr2[p]+parseInt(arr[j][1]);
	  newarr3[p]=arr[j][2];
	 }
	 }
	}
	for(var i in newarr2){
		newArr[i].push(newarr2[i]);
		newArr[i].push(newarr3[i]);
		}
	return newArr;
	}

/**
* 数组合并求和
**/
function arrayCnt1(arr0,arr) {
	var newArr = distinct(arr0);

	var newarr2 = new Array(newArr.length);
	for(var t = 0; t < newarr2.length; t++) {
	 newarr2[t] = 0;
	}
	for(var p = 0; p < newArr.length; p++) {
	 for(var j = 0; j < arr.length; j++) {
	 if(newArr[p].toString() == arr[j][0].toString()) {
	  newarr2[p]=newarr2[p]+parseInt(arr[j][1]);

	 }
	 }
	}
	for(var i in newarr2){
		newArr[i].push(newarr2[i]);

		}
	return newArr;
	}
