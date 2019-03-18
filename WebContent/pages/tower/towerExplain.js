var zcell1;
var countlist = new Array();
// 页面加载时执行
$(document).ready(function() {

	$.ajax({
		type : 'post',
		url : path + 'Parts/getTowerExplain.action',
		data : {
			'id' : id
	},
		success : function(data) {
			var list = data;
		
			if (list!=null) {
				// 创建JSCELL，指明承载容器
				zcell1 = new ZCell(document.getElementById("cellContainer"));
				
				var sumlist = 	classification(list);
				
				// 创建表，并指定列，行数
				zcell1.InserSheet(0, 6, sumlist.length);
				// 加载数据
				zcell1.GetSheet(0).LoadArrData(sumlist);
				zcell1.GetSheet(0).SetColWidth(4, 150);
				// 合并单元格
				merge();
				 zcell1.GetSheet(0).InsertRow(1,1);
				 zcell1.GetSheet(0).SetCellValue(1,1,"回路");
				 zcell1.GetSheet(0).SetCellValue(2,1,"塔型");
				 zcell1.GetSheet(0).SetCellValue(3,1,"杆塔型式");
				 zcell1.GetSheet(0).SetCellValue(4,1,"杆塔型号");
				 zcell1.GetSheet(0).SetCellValue(5,1,"呼高");
				 zcell1.GetSheet(0).SetCellValue(6,1,"数量");
				} else {
				Tools.tipsMsg("未发现TA文件！");
			}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});

});

//合并单元格
function merge() {
	var count = 1;
	for (var i = 0; i <countlist.length; i++) { 
		if(countlist[i]!=0){
			zcell1.GetSheet(0).MergeCells(3, count , 3, count+countlist[i]-1);
			count = count+countlist[i];
		}
	}
	var danNaiCount = countlist[0]+countlist[1]+countlist[2];
	var danHangCount = countlist[3]+countlist[4]+countlist[5];
	var shuangNaiCount = countlist[6]+countlist[7]+countlist[8];
	var shuangHangCount = countlist[9]+countlist[10]+countlist[11];
	if(danNaiCount!=0){
	zcell1.GetSheet(0).MergeCells(2, 1 , 2, danNaiCount);
	}
	if((danNaiCount+danHangCount)!=0){
	zcell1.GetSheet(0).MergeCells(2, 1+danNaiCount , 2, danNaiCount+danHangCount);
	zcell1.GetSheet(0).MergeCells(1, 1 , 1, danNaiCount+danHangCount);
	}
	if((danNaiCount+danHangCount+shuangNaiCount)!=0){
	zcell1.GetSheet(0).MergeCells(2, 1+danNaiCount+danHangCount , 2, danNaiCount+danHangCount+shuangNaiCount);
	}
	zcell1.GetSheet(0).MergeCells(2, 1+danNaiCount+danHangCount+shuangNaiCount , 2, danNaiCount+danHangCount+shuangNaiCount+shuangHangCount);
	zcell1.GetSheet(0).MergeCells(1, 1+danNaiCount+danHangCount , 1, danNaiCount+danHangCount+shuangNaiCount+shuangHangCount);
}

//分类排序
function classification(list) {
	var sumlist = new Array();
	var danNai1 = new Array();
	var danNai2 = new Array();
	var danNai3 = new Array();
	var danHang1 = new Array();
	var danHang2 = new Array();
	var danHang3 = new Array();
	var shuangNai1 = new Array();
	var shuangNai2 = new Array();
	var shuangNai3 = new Array();
	var shuangHang1 = new Array();
	var shuangHang2 = new Array();
	var shuangHang3 = new Array();
	
	 for(i = 0; i< list.length; i++){
		 if(list[i][0]=="单"&&list[i][1]=="耐张塔"&&list[i][2]=="钢管杆"){
			 danNai1.push(list[i]);
		 }else if(list[i][0]=="单"&&list[i][1]=="耐张塔"&&list[i][2]=="角钢塔"){
			 danNai2.push(list[i]);
		 }else if(list[i][0]=="单"&&list[i][1]=="耐张塔"&&list[i][2]=="钢管塔"){
			 danNai3.push(list[i]);
		 }else if(list[i][0]=="单"&&list[i][1]=="悬垂塔"&&list[i][2]=="钢管杆"){
			 danHang1.push(list[i]);
		 }else if(list[i][0]=="单"&&list[i][1]=="悬垂塔"&&list[i][2]=="角钢塔"){
			 danHang2.push(list[i]);
		 }else if(list[i][0]=="单"&&list[i][1]=="悬垂塔"&&list[i][2]=="钢管塔"){
			 danHang3.push(list[i]);
		 }else if(list[i][0]=="双"&&list[i][1]=="耐张塔"&&list[i][2]=="钢管杆"){
			 shuangNai1.push(list[i]);
		 }else if(list[i][0]=="双"&&list[i][1]=="耐张塔"&&list[i][2]=="角钢塔"){
			 shuangNai2.push(list[i]);
		 }else if(list[i][0]=="双"&&list[i][1]=="耐张塔"&&list[i][2]=="钢管塔"){
			 shuangNai3.push(list[i]);
		 }else if(list[i][0]=="双"&&list[i][1]=="悬垂塔"&&list[i][2]=="钢管杆"){
			 shuangHang1.push(list[i]);
		 }else if(list[i][0]=="双"&&list[i][1]=="悬垂塔"&&list[i][2]=="角钢塔"){
			 shuangHang2.push(list[i]);
		 }else if(list[i][0]=="双"&&list[i][1]=="悬垂塔"&&list[i][2]=="钢管塔"){
			 shuangHang3.push(list[i]);
		 }
	 }
	 danNai1 =getExplainCount(danNai1);
	 danNai2 =getExplainCount(danNai2);
	 danNai3 =getExplainCount(danNai3);
	 danHang1 =getExplainCount(danHang1);
	 danHang2 =getExplainCount(danHang2);
	 danHang3 =getExplainCount(danHang3);
	 shuangNai1 =getExplainCount(shuangNai1);
	 shuangNai2 =getExplainCount(shuangNai2);
	 shuangNai3 =getExplainCount(shuangNai3);
	 shuangHang1 =getExplainCount(shuangHang1);
	 shuangHang2 =getExplainCount(shuangHang2);
	 shuangHang3 =getExplainCount(shuangHang3);
	 
	 countlist.push(danNai1.length);
	 countlist.push(danNai2.length);
	 countlist.push(danNai3.length);
	 countlist.push(danHang1.length);
	 countlist.push(danHang2.length);
	 countlist.push(danHang3.length);
	 countlist.push(shuangNai1.length);
	 countlist.push(shuangNai2.length);
	 countlist.push(shuangNai3.length);
	 countlist.push(shuangHang1.length);
	 countlist.push(shuangHang2.length);
	 countlist.push(shuangHang3.length);
	 
	 sumlist = sumlist.concat(danNai1); 
	 sumlist = sumlist.concat(danNai2); 
	 sumlist = sumlist.concat(danNai3); 
	 sumlist = sumlist.concat(danHang1); 
	 sumlist = sumlist.concat(danHang2); 
	 sumlist = sumlist.concat(danHang3); 
	 sumlist = sumlist.concat(shuangNai1); 
	 sumlist = sumlist.concat(shuangNai2); 
	 sumlist = sumlist.concat(shuangNai3); 
	 sumlist = sumlist.concat(shuangHang1); 
	 sumlist = sumlist.concat(shuangHang2); 
	 sumlist = sumlist.concat(shuangHang3); 
	
	 return sumlist;
}

function getExplainCount(datastr){
	var list = new Array();
	for (var i = 0; i <datastr.length; i++) {
		var obj = new Object;
		var obj2 = new Object;
			obj = [$.trim(datastr[i][3]),$.trim(datastr[i][4])];//杆塔型式，杆塔呼高
			list.push(obj);	
	}
	list=arrayCnt(list);
	var sumlist = new Array();
	for (var i = 0; i <list.length; i++) {
		var explainlist = new Array();
		explainlist.push(datastr[0][0]);
		explainlist.push(datastr[0][1]);
		explainlist.push(datastr[0][2]);
		explainlist.push(list[i][0]);
		explainlist.push(list[i][1]);
		explainlist.push(list[i][2]);
		sumlist.push(explainlist);
	}
	 return sumlist;
	
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
		newArr[i].push(newarr2[i]);
		}
	return newArr;
	}

function JSONToExcelConvertor() {
	var table = document.getElementById("tabl1");
	  var len = table.rows.length; 
	    for(var i = 0;i < len;i++){
	        table.rows[i].deleteCell(0);
	    }
	table.deleteRow(0); 
	zcell1.GetSheet(0).SetCellStyle(1, 1, {
		"width" : "150px"
	});
	zcell1.GetSheet(0).SetCellStyle(2, 1, {
		"width" : "150px"
	});
	zcell1.GetSheet(0).SetCellStyle(3, 1, {
		"width" : "150px"
	});
	zcell1.GetSheet(0).SetCellStyle(4, 1, {
		"width" : "250px"
	});

	zcell1.GetSheet(0).SetCellStyle(5, 1, {
		"width" : "200px"
	});
	zcell1.GetSheet(0).SetCellStyle(6, 1, {
		"width" : "100px"
	});
	for (var i = 1; i <= 6; i++) {
		for (var j = 1; j <= len; j++) {
			zcell1.GetSheet(0).SetCellStyle(i, j, {
				"border" : "1px solid black"
			});
		}
	}
	var timestamp = Date.parse(new Date());

	exportExcel("tabl1",timestamp+"杆塔说明");
	window.location.reload();
}  
/* 返回
*/
function backUpPage() {	
	location.href = path+ "/Tower/projectList.action";
};