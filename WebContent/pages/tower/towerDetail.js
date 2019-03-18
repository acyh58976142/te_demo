var zcell1;
var size=0;
// 页面加载时执行
$(document).ready(function() {

	$.ajax({
		type : 'post',
		url : path + 'Tower/getTaDataByIdceshi.action',
		data : {
			'id' : id,
			'pagingSize' : pagingSize
	},
		success : function(data) {
			var list = data.list[1];
			var iList = data.iList;
			var jList = data.jList;
			//var	dataList = data.dataList;
			if (list!=null) {
				// 创建JSCELL，指明承载容器
				zcell1 = new ZCell(document.getElementById("cellContainer"));
				// 创建表，并指定列，行数
				zcell1.InserSheet(0, 14, list.length);

				// 加载数据
				zcell1.GetSheet(0).LoadArrData(list);
				// 设置宽度
				setcolw();
				// 合并单元格设置样式
				merge(list.length);
				} else {
				Tools.tipsMsg("未发现TA文件！");
			}
			if (iList!=null) {
				mergeI(iList);
			}
			if (jList!=null) {
				mergeJ(jList);
			}
			// 设置分页样式
			setpagingStyle(data);
			// 设置样式	
			setStyle(list);
			bindFile();
			// 封面	
			initCoverTable();
			// 说明	
			//initExplainTable();
			var table = document.getElementById("tabl1");
			 var len = table.rows.length; 
			for (var i = 1; i <= 14; i++) {
				for (var j = 1; j <= len; j++) {
					zcell1.GetSheet(0).SetCellStyle(i, j, {
						"border" : "1px solid black"
					});
				}
			}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});

});


// 设置列宽
function setcolw(list) {
	zcell1.GetSheet(0).SetColWidth(1, 62);
	zcell1.GetSheet(0).SetColWidth(2, 62);
	zcell1.GetSheet(0).SetColWidth(4, 62);
	zcell1.GetSheet(0).SetColWidth(5, 62);
	zcell1.GetSheet(0).SetColWidth(6, 62);
	zcell1.GetSheet(0).SetColWidth(7, 62);
	zcell1.GetSheet(0).SetColWidth(9, 62);
	zcell1.GetSheet(0).SetColWidth(10, 62);
	zcell1.GetSheet(0).SetColWidth(11, 150);
	zcell1.GetSheet(0).SetColWidth(13, 300);
}

//设置分页样式
function setpagingStyle(data) {
	var list = data.list[1];
	 size =parseInt(list.length/pagingSize);
	 var title = data.list[0][0];//标题
	for (var i = 1; i <=size; i++) {
		zcell1.GetSheet(0).MergeCells(1, pagingSize*i-1, 1, pagingSize*i);
		zcell1.GetSheet(0).MergeCells(2, pagingSize*i-1, 10, pagingSize*i);
		zcell1.GetSheet(0).MergeCells(11, pagingSize*i-1, 11, pagingSize*i);
		zcell1.GetSheet(0).SetCellStyle(2,  pagingSize*i-1, {
			"background-color" : "#ffff00"
		});
		zcell1.GetSheet(0).SetCellValue(1, pagingSize*i-1,"备注");
		zcell1.GetSheet(0).SetCellValue(11, pagingSize*i-1,"第"+i+"页/共"+size+"页");
		zcell1.GetSheet(0).SetCellValue(12, pagingSize*i-1,"图  号");
		zcell1.GetSheet(0).SetCellValue(12, pagingSize*i,projectCode+"-D0102");
		zcell1.GetSheet(0).SetCellValue(13, pagingSize*i-1,"图纸级别");
		zcell1.GetSheet(0).SetCellValue(13, pagingSize*i,drawingLevel);
	}
	
for (var i = 0; i <size; i++) {
	zcell1.GetSheet(0).SetCellValue(1,pagingSize*i+1,title[0]);
	zcell1.GetSheet(0).SetCellValue(2,pagingSize*i+1,title[1]);
	zcell1.GetSheet(0).SetCellValue(3,pagingSize*i+1,title[2]);
	zcell1.GetSheet(0).SetCellValue(4,pagingSize*i+1,title[3]);
	zcell1.GetSheet(0).SetCellValue(5,pagingSize*i+1,title[4]);
	zcell1.GetSheet(0).SetCellValue(6,pagingSize*i+1,title[5]);
	zcell1.GetSheet(0).SetCellValue(7,pagingSize*i+1,title[6]);
	zcell1.GetSheet(0).SetCellValue(8,pagingSize*i+1,title[7]);
	zcell1.GetSheet(0).SetCellValue(9,pagingSize*i+1,title[8]);
	zcell1.GetSheet(0).SetCellValue(10,pagingSize*i+1,title[9]);
	zcell1.GetSheet(0).SetCellValue(11,pagingSize*i+1,title[10]);
	zcell1.GetSheet(0).SetCellValue(12,pagingSize*i+1,title[11]);
	zcell1.GetSheet(0).SetCellValue(13,pagingSize*i+1,title[12]);
	zcell1.GetSheet(0).SetCellValue(14,pagingSize*i+1,title[13]);
}
}

//合并单元格I列
function mergeI(list) {
	
var pageCount = 0;//ta文件数据条数
for (var j = 0; j <list.length; j++) {
	var  num = 3;
	var pageSize = 55;
	var iList = list[j];
for (var i = 0; i <iList.length; i++) {
	
	if(parseInt(iList[i][0])*2+num<pageSize&&parseInt(iList[i][1])*2+num>=pageSize)
	 {
		if(parseInt(iList[i][1])-parseInt(iList[i][0])>1){
		zcell1.GetSheet(0).MergeCells(9, parseInt(iList[i][0])*2+num+pageCount, 9, pageSize-2+pageCount);
		zcell1.GetSheet(0).MergeCells(9, pageSize+2+pageCount, 9, parseInt(iList[i][1])*2+num+2+pageCount);
		}
		zcell1.GetSheet(0).SetCellValue(9,parseInt(iList[i][0])*2+num+pageCount,iList[i][2]);
		num = num+3;
		pageSize=pageSize+55;
		continue;
	}
	if(parseInt(iList[i][1])-parseInt(iList[i][0])>1){
		zcell1.GetSheet(0).MergeCells(9, parseInt(iList[i][0])*2+num+pageCount, 9, parseInt(iList[i][1])*2+num-1+pageCount);
	}else{
		zcell1.GetSheet(0).MergeCells(9, parseInt(iList[i][0])*2+num+pageCount, 9, parseInt(iList[i][0])*2+num+1+pageCount);
	}
	zcell1.GetSheet(0).SetCellValue(9,parseInt(iList[i][0])*2+num+pageCount,iList[i][2]);
}	
pageCount += pageSize;
}
}

//合并单元格J列
function mergeJ(list) {
	
	var pageCount = 0;//ta文件数据条数
	for (var j = 0; j <list.length; j++) {
		var  num = 3;
		var pageSize = 55;
		var iList = list[j];
	for (var i = 0; i <iList.length; i++) {
		
		if(parseInt(iList[i][0])*2+num<pageSize&&parseInt(iList[i][1])*2+num>=pageSize)
		 {
			if(parseInt(iList[i][1])-parseInt(iList[i][0])>1){
			zcell1.GetSheet(0).MergeCells(10, parseInt(iList[i][0])*2+num+pageCount, 10, pageSize-2+pageCount);
			zcell1.GetSheet(0).MergeCells(10, pageSize+2+pageCount, 10, parseInt(iList[i][1])*2+num+2+pageCount);
			}
			zcell1.GetSheet(0).SetCellValue(10,parseInt(iList[i][0])*2+num+pageCount,iList[i][2]);
			num = num+3;
			pageSize=pageSize+55;
			continue;
		}
		if(parseInt(iList[i][1])-parseInt(iList[i][0])>1){
			zcell1.GetSheet(0).MergeCells(10, parseInt(iList[i][0])*2+num+pageCount, 10, parseInt(iList[i][1])*2+num-1+pageCount);
		}else{
			zcell1.GetSheet(0).MergeCells(10, parseInt(iList[i][0])*2+num+pageCount, 10, parseInt(iList[i][0])*2+num+1+pageCount);
		}
		zcell1.GetSheet(0).SetCellValue(10,parseInt(iList[i][0])*2+num+pageCount,iList[i][2]);
	}	
	pageCount += pageSize;
	}
}

function merge(length) {
	var len =1;
	for (var i = 1; i <length; i++) { 
		var index = parseInt(i/pagingSize);
		if((i+index)%2==0&&(i+1)%pagingSize!=0&&i%pagingSize!=0)
		{
		zcell1.GetSheet(0).MergeCells(1, i , 1, i  + 1);
		zcell1.GetSheet(0).MergeCells(2, i , 2, i  + 1);
		zcell1.GetSheet(0).MergeCells(3, i , 3, i  + 1);
		zcell1.GetSheet(0).MergeCells(4, i , 4, i  + 1);
		
		zcell1.GetSheet(0).MergeCells(6, i , 6, i  + 1);
		zcell1.GetSheet(0).MergeCells(7, i , 7, i  + 1);
		zcell1.GetSheet(0).MergeCells(8, i , 8, i  + 1);
		
		zcell1.GetSheet(0).MergeCells(11, i , 11, i  + 1);
		}
	}
	
	for (var i = 1; i <length; i++) {
		var index = parseInt(i/pagingSize);
		if((i+index)%2==0&&(i+1)%pagingSize!=0&&i%pagingSize!=0&&(i+3)%pagingSize!=0)
		{
		zcell1.GetSheet(0).MergeCells(5, i+1, 5, i + 2);
		zcell1.GetSheet(0).MergeCells(13, i+1, 13, i + 2);
		zcell1.GetSheet(0).MergeCells(14, i+1, 14, i + 2);
		zcell1.GetSheet(0).MergeCells(12, i+1, 12, i + 2);
		}
	}
	
}

function setStyle(list) {
	
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for (var i = 1; i <datastr.length; i++) {
		if(datastr[i][0].length>3&&datastr[i][0].substring(0, 2)=="备注"){
			zcell1.GetSheet(0).SetCellValue(1,i+1,datastr[i][0].substring(2));
			if(datastr[i][0]==datastr[i+1][0]){
				var  val61 = zcell1.GetSheet(0).GetCellValue(6,i+2);
				var  val71 = zcell1.GetSheet(0).GetCellValue(7,i+2);
				var linktpye61 = {
			            "code": "object",
			            "object":"<div>后侧</div>"+val61
			        };
				var linktpye71 = {
			            "code": "object",
			            "object":"<div>后侧</div>"+val71
			        };
	
			    zcell1.GetSheet(0).SetCellValue(6,i+2,"");
			    zcell1.GetSheet(0).SetCellType(6, i+2, linktpye61);
			    zcell1.GetSheet(0).SetCellValue(7,i+2,"");
			    zcell1.GetSheet(0).SetCellType(7, i+2, linktpye71);
				
			}
			
		}
		if(datastr[i-1][1]!="塔位里程千米+米"&&datastr[i][1]=="0+000"){
			if(datastr[i-2][1]!="塔位里程千米+米"){
				zcell1.GetSheet(0).SetCellValue(2,i+1,"");
			}
		}
		if(i!=1&&i%pagingSize!=0&&(i-1)%pagingSize!=0&&(i+1)%pagingSize!=0)
		{
		zcell1.GetSheet(0).SetCellStyle(9, i, {
			"background-color" : "#da9694"
		});
		zcell1.GetSheet(0).SetCellStyle(10, i, {
			"background-color" : "#da9694"
		});
		
		zcell1.GetSheet(0).SetCellStyle(11, i, {
			"background-color" : "#92d050"
		});
		zcell1.GetSheet(0).SetCellStyle(12, i, {
			"background-color" : "#92d050"
		});
		zcell1.GetSheet(0).SetCellStyle(13, i, {
			"background-color" : "#ffff00"
		});
		
	
		var linktpye71 = {
	            "code": "object",
	            "object":"<div class='1'></div>"
	        };
	    
		var angle1 = zcell1.GetSheet(0).GetCellValue(11,i);
		
		var shangdan = zcell1.GetSheet(0).GetCellValue(9,i-1);
		var xiadan = zcell1.GetSheet(0).GetCellValue(9,i);
		
		if(isNumber(shangdan)&&isNumber(xiadan)){
		if(parseFloat(shangdan)!=parseFloat(xiadan)&&Tools.isEmpty(angle1)){
			 zcell1.GetSheet(0).SetCellValue(11,i, '见分支示意图');
			 angle1 = "见分支示意图";
			 zcell1.GetSheet(0).SetCellStyle(11, i-1, {
					"background-color" : "red"
				});
		}
		}
		if(!Tools.isEmpty(angle1)){
			var drop1 = {
	                "code": "dropdown",
	                "source":{'001':angle1,'002':'见分支示意图'}
	            };
	         zcell1.GetSheet(0).SetCellType(11, i, drop1);	
	         if(i!=1&&(i-2)%pagingSize!=0&&!Tools.isEmpty(zcell1.GetSheet(0).GetCellValue(11,i-1))){
	          	  if(angle1=="见分支示意图"){
	          		 zcell1.GetSheet(0).SetCellValue(11,i, "002");
	          	  }else{
	          		 zcell1.GetSheet(0).SetCellValue(11,i-1, "001");
	          	  }
	           }
		}
		
		var drop2 = {
                "code": "dropdown",
                "source":{'':'','不得接头':'不得接头'}
            };
         zcell1.GetSheet(0).SetCellType(12, i, drop2);
         
         if(!Tools.isEmpty(connect)){
         var con = datastr[i-1][0]+datastr[i-1][1];
			var connectlist = JSON.parse(connect);
			if(connectlist.indexOf(con) > -1){
				zcell1.GetSheet(0).SetCellValue(12,i-1,"不得接头");
				zcell1.GetSheet(0).SetCellStyle(12, i, {
					"background-color" : "red"
				});
			}	
         }
		}	
	}
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for (var i = 1; i <datastr.length; i++) {
		if(i!=1&&i%pagingSize!=0&&(i-1)%pagingSize!=0&&(i+1)%pagingSize!=0)
		{	
			var angle1 = zcell1.GetSheet(0).GetCellValue(11,i);
			  if(angle1=='002'){
				  zcell1.GetSheet(0).SetCellStyle(11, i, {
						"background-color" : "red"
					});
			  }
			var ang = datastr[i-1][0]+datastr[i-1][1];
			  if(!Tools.isEmpty(angle)){
				  var anglelist = JSON.parse(angle);
					if(anglelist.indexOf(ang) > -1){
						zcell1.GetSheet(0).SetCellValue(11,i,"002");
						zcell1.GetSheet(0).SetCellStyle(11, i, {
							"background-color" : "red"
						});
					}  
					else if(!Tools.isEmpty(zcell1.GetSheet(0).GetCellValue(11,i))){
						zcell1.GetSheet(0).SetCellValue(11,i,"001");
					}
			  }
			
		}
		if(datastr[i][1]=="0+000"){
			if(datastr[i][1]==datastr[i-1][1]){

				var  val61 = zcell1.GetSheet(0).GetCellValue(6,i);
				var  val71 = zcell1.GetSheet(0).GetCellValue(7,i);
				var linktpye61 = {
			            "code": "object",
			            "object":"<div>前侧</div>"+val61
			        };
				var linktpye71 = {
			            "code": "object",
			            "object":"<div>前侧</div>"+val71
			        };
	
			    zcell1.GetSheet(0).SetCellValue(6,i,"");
			    zcell1.GetSheet(0).SetCellType(6, i, linktpye61);
			    zcell1.GetSheet(0).SetCellValue(7,i,"");
			    zcell1.GetSheet(0).SetCellType(7, i, linktpye71);
			
			}
		}
		zcell1.GetSheet(0).SetCellReadOnly(1, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(2, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(3, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(4, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(5, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(6, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(7, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(8, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(9, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(10, i, 1);

		zcell1.GetSheet(0).SetCellReadOnly(14, i, 1);
	
	}
}

/* 初始化封面
*/

function initCoverTable(){

	$.ajax({
		type : 'post',
		url : path + 'Tower/getMainById.action',
		data : {
			'id' : id
	},
		success : function(data) {
			$("#projectName").text(data.name);//工程名称
			$("#projectCode").text(data.code+("-D0102"));//工程编号
			$("#pageSize").text(size+1);//页数
			var myDate = new Date();
			var currentMonth = myDate.getFullYear()+"年"+(myDate.getMonth()+1)+"月";
			var currentDate = myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate();
			$("#currentMonth").text(currentMonth);//当前月份（2019年1月）
			$("#currentDate").text(currentDate);//当前日期
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});
}


/* 初始化说明
*/

function initExplainTable(){
	var datastr = zcell1.GetSheet(0).GetDataArr();
	var list = new Array();
	var list2 = new Array();
	for (var i = 1; i <datastr.length; i++) {
		var obj = new Object;
		var obj2 = new Object;
		if(datastr[i][2]!="杆塔型式"&&!Tools.isEmpty(datastr[i][2])){
			obj = [$.trim(datastr[i][2]),$.trim(datastr[i][3])];//杆塔型式，杆塔呼高
			obj2 = [$.trim(datastr[i][2])];//杆塔型式
			list.push(obj);
			list2.push(obj2);
		}	
	}
	list=arrayCnt(list);
	list2=distinct(list2);
	
	for(var p = 0; p < list2.length; p++) {
		 for(var j = 0; j < list.length; j++) {
		 if(list2[p][0].toString() == list[j][0].toString()) {
			 list2[p].push(list[j]);
		 }
		 }
		}
	for(var p = 0; p < list2.length; p++) {
		 var count =0;
		 for(var j = 1; j < list2[p].length; j++) {
		 count+=list2[p][j][2];
		 }
		 list2[p].push(count);
		}
	
	var situationTr='';
	var count = parseInt(list2.length/17);

	for(var c = 0; c <= count; c++) {
		situationTr+='<tr style="height: 18px"><td></td><td style="text-align:center;border: 1px solid black">杆塔类型</td><td colspan="34" style="background-color: #ffff00;height: 18px;border: 1px solid black"></td><td></td></tr>';
		situationTr+='<tr style="height: 18px"><td></td><td style="text-align:center;border: 1px solid black">塔型</td>'
		for(var ti = 0; ti < 17; ti++) {
			if(Tools.isEmpty(list2[ti+17*c])){
				situationTr+='<td colspan="2" style="background-color: #92d050;height: 18px;border: 1px solid black"></td>';	
			}else{
				situationTr+='<td colspan="2" style="background-color: #92d050;height: 18px;border: 1px solid black">'+list2[ti+17*c][0]+'</td>';	
			}
		}
		situationTr+='<td></td></tr>';
	for(var j = 1; j <= 10; j++) {
	if(j==1){
		situationTr+='<tr><td></td><td rowspan="10" style="text-align:center;border: 1px solid black">杆塔呼高及使用数量</td>';
		for(var i = 0; i < 17; i++) {
			if(Tools.isEmpty(list2[i+17*c])){
				situationTr+='<td style="border: 1px solid black;height: 18px;"></td><td style="border: 1px solid black;height: 18px;"></td>';	
			}
			else if(Tools.isEmpty(list2[i+17*c][j+1])){
			situationTr+='<td style="border: 1px solid black;height: 18px;"></td><td style="border: 1px solid black;height: 18px;"></td>';	
		}
			else{
				situationTr+='<td style="border: 1px solid black;height: 18px;">'+list2[i+17*c][j][1]+'</td><td style="border: 1px solid black;height: 18px;">'+list2[i+17*c][j][2]+'</td>';
		
			}
		}
		situationTr+='<td></td></tr>';
	}else{
		situationTr+='<tr><td></td>';
		for(var i = 0; i < 17; i++) {
			if(Tools.isEmpty(list2[i+17*c])){
				situationTr+='<td style="border: 1px solid black;height: 18px;"></td><td style="border: 1px solid black;height: 18px;"></td>';	
			}
			else if(Tools.isEmpty(list2[i+17*c][j+1])){
				situationTr+='<td style="border: 1px solid black;height: 18px;"></td><td style="border: 1px solid black;height: 18px;"></td>';	
			}
			else{
				situationTr+='<td style="border: 1px solid black;height: 18px;">'+list2[i+17*c][j][1]+'</td><td style="border: 1px solid black;height: 18px;">'+list2[i+17*c][j][2]+'</td>';
			}
		}
		situationTr+='<td></td></tr>';
		}	
	}
	situationTr+='<tr style="height: 18px"><td></td><td style="text-align:center;border: 1px solid black">小计</td>'
		for(var ti = 0; ti < 17; ti++) {
			if(Tools.isEmpty(list2[ti+17*c])){
				situationTr+='<td colspan="2" style="height: 18px;border: 1px solid black"></td>';	
			}else{
				situationTr+='<td colspan="2" style="height: 18px;border: 1px solid black">'+list2[ti+17*c][list2[ti+17*c].length-1]+'</td>';	
			}
		}
	situationTr+='<tr style="text-align:left;"><td></td><td colspan="35">注：上表每种塔型下方对应两列中，第一列为呼高，单位：m，第二列为该塔型及呼高对应的使用数量，单位：基。</td><td></td></tr>'
	
	}	
	$("#situationTr").after(situationTr);
	var endTr='';
	if(count<3)
		{
		for(var i = 1; i <3-count; i++){
			for(var i = 0; i < 13; i++){
				endTr+='<tr style="background-color: #ffff00;height: 18px"><td colspan="36"></td><td></td></tr>'
			}
			
		}
		}
	
	$("#endTr").after(endTr);
}

function arrayCnt(arr) {
var newArr = distinct(arr);

var newarr2 = new Array(newArr.length);
for(var t = 0; t < newarr2.length; t++) {
 newarr2[t] = 0;
}
for(var p = 0; p < newArr.length; p++) {
 for(var j = 0; j < arr.length; j++) {
 if(newArr[p].toString() == arr[j].toString()) {
  newarr2[p]=newarr2[p]+1;
 }
 }
}
for(var i in newarr2){
	newArr[i].push(newarr2[i]/2);
	}
return newArr;
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
	  if(!obj[arr[i]]){ //如果能查找到，证明数组元素重复了
	   obj[arr[i]] = 1;
	   result.push(arr[i]);
	  }
	 }
	 return result;
}



function JSONToExcelConvertor() { 
	
	$(".valueobject").html("");
	zcell1.GetSheet(0).DeleteCol(14,14);
	var table = document.getElementById("tabl1");
	  var len = table.rows.length; 
	    for(var i = 0;i < len;i++){
	        table.rows[i].deleteCell(0);
	    }
	table.deleteRow(0); 
	zcell1.GetSheet(0).SetCellStyle(1, 1, {
		"width" : "120px"
	});
	zcell1.GetSheet(0).SetCellStyle(2, 1, {
		"width" : "90px"
	});
	zcell1.GetSheet(0).SetCellStyle(3, 1, {
		"width" : "100px"
	});
	zcell1.GetSheet(0).SetCellStyle(4, 1, {
		"width" : "90px"
	});
	zcell1.GetSheet(0).SetCellStyle(5, 1, {
		"width" : "90px"
	});
	zcell1.GetSheet(0).SetCellStyle(6, 1, {
		"width" : "90px"
	});
	zcell1.GetSheet(0).SetCellStyle(7, 1, {
		"width" : "90px"
	});
	zcell1.GetSheet(0).SetCellStyle(8, 1, {
		"width" : "90px"
	});
	zcell1.GetSheet(0).SetCellStyle(9, 1, {
		"width" : "90px"
	});
	zcell1.GetSheet(0).SetCellStyle(10, 1, {
		"width" : "90px"
	});
	zcell1.GetSheet(0).SetCellStyle(11, 1, {
		"width" : "120px"
	});
	zcell1.GetSheet(0).SetCellStyle(12, 1, {
		"width" : "120px"
	});

	zcell1.GetSheet(0).SetCellStyle(13, 1, {
		"width" : "380px"
	});
	
	var timestamp = Date.parse(new Date());
	exportExcel("coverTable",timestamp+"杆塔封面");
	setTimeout(100);
	exportExcel("tabl1",timestamp+"杆塔明细");
	window.location.reload();
}  
/* 返回
*/
function backUpPage() {	
	location.href = path+ "/Tower/projectList.action";
};

//绑附件
function bindFile(){
	var attList = eval("(" + attr + ")");
	$.each(attList,function(index,obj){
	
			$("#stage_file_two").append('<span class="file-href-span fileNoColor" onclick="downloadFile(this)" filePath='+obj.filePath+'>'+obj.originalFileName+"</span>&nbsp;&nbsp;&nbsp;");
	});
	   
};

/**
 * 下载文件
 */
function downloadFile(e){
	var filePath = $(e).attr("filePath"); 
	var name = $(e).text(); 
	if(Tools.isEmpty(filePath))
	{
		return;
	}
	var url = path + "/file/loadServerFile.action?name="+encodeURIComponent(encodeURI(name))+"&filePath="+filePath;
	location.href = url;
};

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