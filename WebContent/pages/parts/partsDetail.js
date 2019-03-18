var zcell1;
var size=0;
var diskArr = new Array();//左侧
var diskArr2 = new Array();//右侧
// 页面加载时执行
$(document).ready(function() {

	$.ajax({
		type : 'post',
		url : path + 'Parts/getPartsData.action',
		data : {
			'id' : id,
			'pagingSize' : pagingSize
	},
		success : function(data) {
			var list = data.list[1];
			var iList = data.iList;
			var jList = data.jList;
			var typeList = data.sumTypeList;
			var countList = data.sumCountList;
			var hammerList = data.hammerCountList;
		
			//var	dataList = data.dataList;
			if (list!=null) {
				// 创建JSCELL，指明承载容器
				zcell1 = new ZCell(document.getElementById("cellContainer"));
				// 创建表，并指定列，行数
				zcell1.InserSheet(0, 35, list.length);

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
			//设置下拉框
			if (typeList!=null) {
				initConductorParam(typeList);
			}
			//导线数量
			if (countList!=null) {
				initCountParam(countList);
			}
			//防震锤数量
			if (hammerList!=null) {
				initHammerParam(hammerList);
			}
			// 封面	
			initCoverTable();
			//给盘长赋值	
			initDisklength();
			var table = document.getElementById("tabl1");
			  var len = table.rows.length; 
			for (var i = 1; i <= 29; i++) {
				for (var j = 1; j <= len; j++) {
					zcell1.GetSheet(0).SetCellStyle(i, j, {
						"border" : "1px solid black"
					});
				}
			}
	        zcell1.GetSheet(0).SetColHidden(30,35);

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
	zcell1.GetSheet(0).SetColWidth(8, 62);
	zcell1.GetSheet(0).SetColWidth(9, 62);
	zcell1.GetSheet(0).SetColWidth(11, 62);
	zcell1.GetSheet(0).SetColWidth(12, 62);
	zcell1.GetSheet(0).SetColWidth(13, 62);
	zcell1.GetSheet(0).SetColWidth(14, 62);
	zcell1.GetSheet(0).SetColWidth(15, 62);
	zcell1.GetSheet(0).SetColWidth(16, 62);
	zcell1.GetSheet(0).SetColWidth(17, 62);
	zcell1.GetSheet(0).SetColWidth(18, 62);
	zcell1.GetSheet(0).SetColWidth(19, 62);
	zcell1.GetSheet(0).SetColWidth(20, 62);
	zcell1.GetSheet(0).SetColWidth(21, 62);
	zcell1.GetSheet(0).SetColWidth(22, 62);
	zcell1.GetSheet(0).SetColWidth(23, 62);
	zcell1.GetSheet(0).SetColWidth(24, 62);
	zcell1.GetSheet(0).SetColWidth(25, 62);
	zcell1.GetSheet(0).SetColWidth(26, 62);
	zcell1.GetSheet(0).SetColWidth(27, 62);
	zcell1.GetSheet(0).SetColWidth(28, 62);
	zcell1.GetSheet(0).SetColWidth(29, 62);
	var winHeight = window.innerHeight;//浏览器页面的高
	var heights = winHeight-55;
	$("#cellContainer").css({"height":heights+"px"});//整个中部界面的高
   
}

//设置分页样式
function setpagingStyle(data) {
	var list = data.list[1];
	var size =parseInt(list.length/pagingSize);
	 var title = data.list[0][0];//标题
	 var title2 = data.list[0][1];//标题第2行
	
for (var i = 0; i <size; i++) {
	zcell1.GetSheet(0).InsertRow(pagingSize*i+i+1,1);
	zcell1.GetSheet(0).SetCellValue(1,pagingSize*i+1+i,title[0]);
	zcell1.GetSheet(0).SetCellValue(2,pagingSize*i+1+i,title[1]);
	zcell1.GetSheet(0).SetCellValue(3,pagingSize*i+1+i,title[2]);
	zcell1.GetSheet(0).SetCellValue(4,pagingSize*i+1+i,title[3]);
	zcell1.GetSheet(0).SetCellValue(5,pagingSize*i+1+i,title[4]);
	zcell1.GetSheet(0).SetCellValue(6,pagingSize*i+1+i,title[5]);
	zcell1.GetSheet(0).SetCellValue(7,pagingSize*i+1+i,title[6]);
	zcell1.GetSheet(0).SetCellValue(8,pagingSize*i+1+i,title[7]);
	zcell1.GetSheet(0).SetCellValue(9,pagingSize*i+1+i,title[8]);
	zcell1.GetSheet(0).SetCellValue(10,pagingSize*i+1+i,title[9]);
	zcell1.GetSheet(0).SetCellValue(11,pagingSize*i+1+i,title[10]);
	zcell1.GetSheet(0).SetCellValue(12,pagingSize*i+1+i,title[11]);
	zcell1.GetSheet(0).SetCellValue(13,pagingSize*i+1+i,title[12]);
	zcell1.GetSheet(0).SetCellValue(14,pagingSize*i+1+i,title[13]);
	zcell1.GetSheet(0).SetCellValue(15,pagingSize*i+1+i,title[14]);
	zcell1.GetSheet(0).SetCellValue(16,pagingSize*i+1+i,title[15]);
	zcell1.GetSheet(0).SetCellValue(17,pagingSize*i+1+i,title[16]);
	zcell1.GetSheet(0).SetCellValue(18,pagingSize*i+1+i,title[17]);
	zcell1.GetSheet(0).SetCellValue(19,pagingSize*i+1+i,title[18]);
	zcell1.GetSheet(0).SetCellValue(20,pagingSize*i+1+i,title[19]);
	zcell1.GetSheet(0).SetCellValue(21,pagingSize*i+1+i,title[20]);
	zcell1.GetSheet(0).SetCellValue(22,pagingSize*i+1+i,title[21]);
	zcell1.GetSheet(0).SetCellValue(23,pagingSize*i+1+i,title[22]);
	zcell1.GetSheet(0).SetCellValue(24,pagingSize*i+1+i,title[23]);
	zcell1.GetSheet(0).SetCellValue(25,pagingSize*i+1+i,title[24]);
	zcell1.GetSheet(0).SetCellValue(26,pagingSize*i+1+i,title[25]);
	zcell1.GetSheet(0).SetCellValue(27,pagingSize*i+1+i,title[26]);
	zcell1.GetSheet(0).SetCellValue(28,pagingSize*i+1+i,title[27]);
	zcell1.GetSheet(0).SetCellValue(29,pagingSize*i+1+i,title[28]);
	zcell1.GetSheet(0).SetCellValue(1,pagingSize*i+2+i,title2[0]);
	zcell1.GetSheet(0).SetCellValue(2,pagingSize*i+2+i,title2[1]);
	zcell1.GetSheet(0).SetCellValue(3,pagingSize*i+2+i,title2[2]);
	zcell1.GetSheet(0).SetCellValue(4,pagingSize*i+2+i,title2[3]);
	zcell1.GetSheet(0).SetCellValue(5,pagingSize*i+2+i,title2[4]);
	zcell1.GetSheet(0).SetCellValue(6,pagingSize*i+2+i,title2[5]);
	zcell1.GetSheet(0).SetCellValue(7,pagingSize*i+2+i,title2[6]);
	zcell1.GetSheet(0).SetCellValue(8,pagingSize*i+2+i,title2[7]);
	zcell1.GetSheet(0).SetCellValue(9,pagingSize*i+2+i,title2[8]);
	zcell1.GetSheet(0).SetCellValue(10,pagingSize*i+2+i,title2[9]);
	zcell1.GetSheet(0).SetCellValue(11,pagingSize*i+2+i,title2[10]);
	zcell1.GetSheet(0).SetCellValue(12,pagingSize*i+2+i,title2[11]);
	zcell1.GetSheet(0).SetCellValue(13,pagingSize*i+2+i,title2[12]);
	zcell1.GetSheet(0).SetCellValue(14,pagingSize*i+2+i,title2[13]);
	zcell1.GetSheet(0).SetCellValue(15,pagingSize*i+2+i,title2[14]);
	zcell1.GetSheet(0).SetCellValue(16,pagingSize*i+2+i,title2[15]);
	zcell1.GetSheet(0).SetCellValue(17,pagingSize*i+2+i,title2[16]);
	zcell1.GetSheet(0).SetCellValue(18,pagingSize*i+2+i,title2[17]);
	zcell1.GetSheet(0).SetCellValue(19,pagingSize*i+2+i,title2[18]);
	zcell1.GetSheet(0).SetCellValue(20,pagingSize*i+2+i,title2[19]);
	zcell1.GetSheet(0).SetCellValue(21,pagingSize*i+2+i,title2[20]);
	zcell1.GetSheet(0).SetCellValue(22,pagingSize*i+2+i,title2[21]);
	zcell1.GetSheet(0).SetCellValue(23,pagingSize*i+2+i,title2[22]);
	zcell1.GetSheet(0).SetCellValue(24,pagingSize*i+2+i,title2[23]);
	zcell1.GetSheet(0).SetCellValue(25,pagingSize*i+2+i,title2[24]);
	zcell1.GetSheet(0).SetCellValue(26,pagingSize*i+2+i,title2[25]);
	zcell1.GetSheet(0).SetCellValue(27,pagingSize*i+2+i,title2[26]);
	zcell1.GetSheet(0).SetCellValue(28,pagingSize*i+2+i,title2[27]);
	zcell1.GetSheet(0).SetCellValue(29,pagingSize*i+2+i,title2[28]);
	
	zcell1.GetSheet(0).MergeCells(1, pagingSize*i+1+i , 1, pagingSize*i+2+i);
	zcell1.GetSheet(0).MergeCells(2, pagingSize*i+1+i , 2, pagingSize*i+2+i);
	zcell1.GetSheet(0).MergeCells(3, pagingSize*i+1+i , 3, pagingSize*i+2+i);
	zcell1.GetSheet(0).MergeCells(4, pagingSize*i+1+i , 4, pagingSize*i+2+i);
	zcell1.GetSheet(0).MergeCells(5, pagingSize*i+1+i , 5, pagingSize*i+2+i);
	zcell1.GetSheet(0).MergeCells(6, pagingSize*i+1+i , 6, pagingSize*i+2+i);
	zcell1.GetSheet(0).MergeCells(7, pagingSize*i+1+i , 7, pagingSize*i+2+i);
	zcell1.GetSheet(0).MergeCells(8, pagingSize*i+1+i , 8, pagingSize*i+2+i);
	zcell1.GetSheet(0).MergeCells(9, pagingSize*i+1+i , 9, pagingSize*i+2+i);
	zcell1.GetSheet(0).MergeCells(10, pagingSize*i+1+i , 10, pagingSize*i+2+i);
	zcell1.GetSheet(0).MergeCells(11, pagingSize*i+1+i , 12, pagingSize*i+1+i);
	zcell1.GetSheet(0).MergeCells(13, pagingSize*i+1+i , 14, pagingSize*i+1+i);
	zcell1.GetSheet(0).MergeCells(15, pagingSize*i+1+i , 16, pagingSize*i+1+i);
	zcell1.GetSheet(0).MergeCells(17, pagingSize*i+1+i , 18, pagingSize*i+1+i);
	zcell1.GetSheet(0).MergeCells(19, pagingSize*i+1+i , 22, pagingSize*i+1+i);
	zcell1.GetSheet(0).MergeCells(23, pagingSize*i+1+i , 26, pagingSize*i+1+i);
	zcell1.GetSheet(0).MergeCells(27, pagingSize*i+1+i , 29, pagingSize*i+1+i);
}
for (var i = 1; i <=size; i++) {
	zcell1.GetSheet(0).MergeCells(1, pagingSize*i+i-1, 1, pagingSize*i+i);
	zcell1.GetSheet(0).MergeCells(2, pagingSize*i+i-1, 22, pagingSize*i+i);
	zcell1.GetSheet(0).MergeCells(23, pagingSize*i+i-1, 24, pagingSize*i+i);
	zcell1.GetSheet(0).MergeCells(25, pagingSize*i+i-1, 26, pagingSize*i+i-1);
	zcell1.GetSheet(0).MergeCells(25, pagingSize*i+i, 26, pagingSize*i+i);
	zcell1.GetSheet(0).MergeCells(27, pagingSize*i+i-1, 29, pagingSize*i+i-1);
	zcell1.GetSheet(0).MergeCells(27, pagingSize*i+i, 29, pagingSize*i+i);
	zcell1.GetSheet(0).SetCellStyle(2,  pagingSize*i+i-1, {
		"background-color" : "#ffff00"
	});
	zcell1.GetSheet(0).SetCellValue(1, pagingSize*i+i-1,"备注");
	zcell1.GetSheet(0).SetCellValue(23, pagingSize*i+i-1,"第"+i+"页/共"+size+"页");
	zcell1.GetSheet(0).SetCellValue(25, pagingSize*i+i-1,"图  号");
	zcell1.GetSheet(0).SetCellValue(27, pagingSize*i+i-1,"图纸级别");
	zcell1.GetSheet(0).SetCellValue(25, pagingSize*i+i,projectCode+"D03");
	zcell1.GetSheet(0).SetCellValue(27, pagingSize*i+i,drawingLevel);
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
		zcell1.GetSheet(0).MergeCells(8, parseInt(iList[i][0])*2+num+pageCount, 8, pageSize-2+pageCount);
		zcell1.GetSheet(0).MergeCells(8, pageSize+2+pageCount, 8, parseInt(iList[i][1])*2+num+2+pageCount);
		}
		zcell1.GetSheet(0).SetCellValue(8,parseInt(iList[i][0])*2+num+pageCount,iList[i][2]);
		num = num+3;
		pageSize=pageSize+55;
		continue;
	}
	if(parseInt(iList[i][1])-parseInt(iList[i][0])>1){
		zcell1.GetSheet(0).MergeCells(8, parseInt(iList[i][0])*2+num+pageCount, 8, parseInt(iList[i][1])*2+num-1+pageCount);
	}else{
		zcell1.GetSheet(0).MergeCells(8, parseInt(iList[i][0])*2+num+pageCount, 8, parseInt(iList[i][0])*2+num+1+pageCount);
	}
	zcell1.GetSheet(0).SetCellValue(8,parseInt(iList[i][0])*2+num+pageCount,iList[i][2]);
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
		
		zcell1.GetSheet(0).MergeCells(10, i , 10, i  + 1);
		
		/*zcell1.GetSheet(0).MergeCells(12, i , 12, i + 1);
		zcell1.GetSheet(0).MergeCells(14, i , 14, i  + 1);
	
		zcell1.GetSheet(0).MergeCells(16, i , 16, i  + 1);
	
		zcell1.GetSheet(0).MergeCells(18, i , 18, i  + 1);*/
		zcell1.GetSheet(0).MergeCells(20, i , 20, i  + 1);
		zcell1.GetSheet(0).MergeCells(21, i , 21, i  + 1);
		zcell1.GetSheet(0).MergeCells(22, i , 22, i + 1);
		zcell1.GetSheet(0).MergeCells(24, i , 24, i  + 1);
		zcell1.GetSheet(0).MergeCells(25, i , 25, i  + 1);
		zcell1.GetSheet(0).MergeCells(26, i , 26, i  + 1);
		}
	}
	
	for (var i = 1; i <length; i++) {
		var index = parseInt(i/pagingSize);
		if((i+index)%2==0&&(i+1)%pagingSize!=0&&i%pagingSize!=0&&(i+3)%pagingSize!=0)
		{
		zcell1.GetSheet(0).MergeCells(5, i+1, 5, i + 2);
		}
	}
	
}

function setStyle(list) {
	
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for (var i = 1; i <datastr.length; i++) {
		if(datastr[i][0].length>3&&datastr[i][0].substring(0, 2)=="备注"){
			zcell1.GetSheet(0).SetCellValue(1,i,datastr[i][0].substring(2));
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
				zcell1.GetSheet(0).SetCellValue(2,i,"");
			}
		}
		 datastr = zcell1.GetSheet(0).GetDataArr();
		if(i!=1&&i!=2&&i%(pagingSize+1)!=0&&(i-1)%(pagingSize+1)!=0&&(i+1)%(pagingSize+1)!=0&&(i-2)%(pagingSize+1)!=0)
		{
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
			
		zcell1.GetSheet(0).SetCellStyle(8, i, {
			"background-color" : "#da9694"
		});
		zcell1.GetSheet(0).SetCellStyle(9, i, {
			"background-color" : "#da9694"
		});
		zcell1.GetSheet(0).SetCellStyle(11, i, {
			"background-color" : "#92d050"
		});
		zcell1.GetSheet(0).SetCellStyle(12, i, {
			"background-color" : "#ffff00"
		});
		zcell1.GetSheet(0).SetCellStyle(13, i, {
			"background-color" : "#92d050"
		});
		zcell1.GetSheet(0).SetCellStyle(14, i, {
			"background-color" : "#ffff00"
		});
		zcell1.GetSheet(0).SetCellStyle(15, i, {
			"background-color" : "#92d050"
		});
		zcell1.GetSheet(0).SetCellStyle(16, i, {
			"background-color" : "#ffff00"
		});
		zcell1.GetSheet(0).SetCellStyle(17, i, {
			"background-color" : "#92d050"
		});
		zcell1.GetSheet(0).SetCellStyle(18, i, {
			"background-color" : "#ffff00"
		});
		zcell1.GetSheet(0).SetCellStyle(19, i, {
			"background-color" : "#da9694"
		});
		zcell1.GetSheet(0).SetCellStyle(20, i, {
			"background-color" : "#ffff00"
		});
		zcell1.GetSheet(0).SetCellStyle(23, i, {
			"background-color" : "#da9694"
		});
		zcell1.GetSheet(0).SetCellStyle(24, i, {
			"background-color" : "#ffff00"
		});
		zcell1.GetSheet(0).SetCellReadOnly(1, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(2, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(3, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(4, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(5, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(6, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(7, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(8, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(9, i, 1);

		var angle1 = zcell1.GetSheet(0).GetCellValue(10,i);
		var shangdan = zcell1.GetSheet(0).GetCellValue(8,i-1);
		var xiadan = zcell1.GetSheet(0).GetCellValue(8,i);
		
		if(isNumber(shangdan)&&isNumber(xiadan)){
		if(parseFloat(shangdan)!=parseFloat(xiadan)&&Tools.isEmpty(angle1)){
			 zcell1.GetSheet(0).SetCellValue(10,i, '见分支示意图');
			 angle1 = "见分支示意图";
			 zcell1.GetSheet(0).SetCellStyle(10, i-1, {
					"background-color" : "red"
				});
		}
		}	
		} 
	}
	/*for (var i = 1; i <datastr.length; i++) {
		if(i!=1&&i%pagingSize!=0&&(i-1)%pagingSize!=0&&(i+1)%pagingSize!=0)
		{
			zcell1.GetSheet(0).SetCellValue(10,i, $.trim(list[i-1][14]));
			if($.trim(list[i-1][15])=="002"){
				zcell1.GetSheet(0).SetCellStyle(10, i, {
					"background-color" : "red"
				});
			}
		}
	}*/
}


/*
*初始化导线代号下拉框
* typeList 0悬垂塔和耐张塔下标集合  
*  1导线耐张代号集合 2导线耐张默认代号  3导线悬垂代号集合 4导线悬垂默认代号
*  5跳线悬垂代号集合 6跳线悬垂默认代号
*  7地线耐张代号集合 8地线耐张默认代号  9地线悬垂代号集合 10地线悬垂默认代号
*  11OPGW耐张代号集合 12OPGW耐张默认代号  13OPGW悬垂代号集合 14OPGW悬垂默认代号
*/
var initConductorParam = function(typeList){
	/*下拉框生成导线耐张*/
	var wireNai = typeList[0][0];
	var wireNaiType = typeList[1];
	var wireNaiTypeList = new Array();
	for (var i = 0; i <wireNaiType.length; i++) {
		if(wireNaiType[i][0].length>1){
		  wireNaiTypeList.push(wireNaiType[i][0].split(','));	
		}else{
			 wireNaiTypeList.push([]);
		}
	
	}
	
	var wireNaiIndex = new Array();
	var wireNaiClass = new Array();
	for (var i = 0; i <wireNai.length; i++) {
		var wireHangI =	parseInt(wireNai[i]);
		if(wireHangI%(pagingSize+1)!=0&&(wireHangI-1)%(pagingSize+1)!=0&&(wireHangI+1)%(pagingSize+1)!=0&&(wireHangI-2)%(pagingSize+1)!=0){
		var list = new Array();
		list.push(11);
		list.push(parseInt(wireNai[i]));	
		wireNaiIndex.push(list);
		wireNaiClass.push("wire"+wireNai[i]);
	}
	}
	multipleGerateSelect(zcell1,0,wireNaiIndex,wireNaiClass,
			wireNaiTypeList,typeList[2]);
	
	/*下拉框生成导线悬垂*/
	var wireHang = typeList[0][1];
	var wireHangType = typeList[3];
	var wireHangTypeList = new Array();
	for (var i = 0; i <wireHangType.length; i++) {
		if(wireHangType[i][0].length>1){
		  wireHangTypeList.push(wireHangType[i][0].split(','));	
		}else{
			 wireHangTypeList.push([]);
		}
	
	}
	
	var wireHangIndex = new Array();
	var wireHangClass = new Array();
	for (var i = 0; i <wireHang.length; i++) {
	var wireHangI =	parseInt(wireHang[i]);
	if(wireHangI%(pagingSize+1)!=0&&(wireHangI-1)%(pagingSize+1)!=0&&(wireHangI+1)%(pagingSize+1)!=0&&(wireHangI-2)%(pagingSize+1)!=0){
		var list = new Array();
		list.push(11);
		list.push(parseInt(wireHang[i]));	
		wireHangIndex.push(list);
		wireHangClass.push("wire"+wireHang[i]);
	}
	}
	multipleGerateSelect(zcell1,0,wireHangIndex,wireHangClass,
			wireHangTypeList,typeList[4]);
	
	
	/*下拉框生成跳线悬垂*/
	var tiaoNai = typeList[0][0];
	var tiaoNaiType = typeList[5];
	var tiaoNaiTypeList = new Array();
	for (var i = 0; i <tiaoNaiType.length; i++) {
		if(i%2==0){
		if(tiaoNaiType[i][0].length>1){
		  tiaoNaiTypeList.push(tiaoNaiType[i][0].split(','));	
		}else{
			 tiaoNaiTypeList.push([]);
		}
		}
	}
	
	var tiaoNaiIndex = new Array();
	var tiaoNaiClass = new Array();
	for (var i = 0; i <tiaoNai.length; i++) {
		var wireHangI =	parseInt(tiaoNai[i]);
		if(wireHangI%(pagingSize+1)!=0&&(wireHangI-1)%(pagingSize+1)!=0&&(wireHangI+1)%(pagingSize+1)!=0&&(wireHangI-2)%(pagingSize+1)!=0){
		if(i%2==0){
		var list = new Array();
		list.push(13);
		list.push(parseInt(tiaoNai[i]));	
		tiaoNaiIndex.push(list);
		tiaoNaiClass.push("tiao"+tiaoNai[i]);
		}
		}
	}
	var tiaoNaiDefault = new Array();
	for (var i = 0; i <typeList[6].length; i++) {
		if(i%2==0){
			tiaoNaiDefault.push(typeList[6][i]);
		}
	}
	
	multipleGerateSelect(zcell1,0,tiaoNaiIndex,tiaoNaiClass,
			tiaoNaiTypeList,tiaoNaiDefault);
	
	/*下拉框生成地线耐张*/
	var groundNai = typeList[0][0];
	var groundNaiType = typeList[7];
	var groundNaiTypeList = new Array();
	for (var i = 0; i <groundNaiType.length; i++) {
		if(groundNaiType[i][0].length>1){
		  groundNaiTypeList.push(groundNaiType[i][0].split(','));	
		}else{
			 groundNaiTypeList.push([]);
		}
	
	}
	
	var groundNaiIndex = new Array();
	var groundNaiClass = new Array();
	for (var i = 0; i <groundNai.length; i++) {
		var groundHangI =	parseInt(groundNai[i]);
		if(groundHangI%(pagingSize+1)!=0&&(groundHangI-1)%(pagingSize+1)!=0&&(groundHangI+1)%(pagingSize+1)!=0&&(groundHangI-2)%(pagingSize+1)!=0){
		var list = new Array();
		list.push(15);
		list.push(parseInt(groundNai[i]));	
		groundNaiIndex.push(list);
		groundNaiClass.push("ground"+groundNai[i]);
	}
	}
	multipleGerateSelect(zcell1,0,groundNaiIndex,groundNaiClass,
			groundNaiTypeList,typeList[8]);
	
	/*下拉框生成地线悬垂*/
	var groundHang = typeList[0][1];
	var groundHangType = typeList[9];
	var groundHangTypeList = new Array();
	for (var i = 0; i <groundHangType.length; i++) {
		if(groundHangType[i][0].length>1){
		  groundHangTypeList.push(groundHangType[i][0].split(','));	
		}else{
			 groundHangTypeList.push([]);
		}
	
	}
	
	var groundHangIndex = new Array();
	var groundHangClass = new Array();
	for (var i = 0; i <groundHang.length; i++) {
	var groundHangI =	parseInt(groundHang[i]);
	if(groundHangI%(pagingSize+1)!=0&&(groundHangI-1)%(pagingSize+1)!=0&&(groundHangI+1)%(pagingSize+1)!=0&&(groundHangI-2)%(pagingSize+1)!=0){
		var list = new Array();
		list.push(15);
		list.push(parseInt(groundHang[i]));	
		groundHangIndex.push(list);
		groundHangClass.push("ground"+groundHang[i]);
	}
	}
	multipleGerateSelect(zcell1,0,groundHangIndex,groundHangClass,
			groundHangTypeList,typeList[10]);
	
	/*下拉框生成OPGW耐张*/
	var OPGWNai = typeList[0][0];
	var OPGWNaiType = typeList[11];
	var OPGWNaiTypeList = new Array();
	for (var i = 0; i <OPGWNaiType.length; i++) {
		if(OPGWNaiType[i][0].length>1){
		  OPGWNaiTypeList.push(OPGWNaiType[i][0].split(','));	
		}else{
			 OPGWNaiTypeList.push([]);
		}
	
	}
	
	var OPGWNaiIndex = new Array();
	var OPGWNaiClass = new Array();
	for (var i = 0; i <OPGWNai.length; i++) {
		var wireHangI =	parseInt(OPGWNai[i]);
		if(wireHangI%(pagingSize+1)!=0&&(wireHangI-1)%(pagingSize+1)!=0&&(wireHangI+1)%(pagingSize+1)!=0&&(wireHangI-2)%(pagingSize+1)!=0){
		var list = new Array();
		list.push(17);
		list.push(parseInt(OPGWNai[i]));	
		OPGWNaiIndex.push(list);
		OPGWNaiClass.push("OPGW"+OPGWNai[i]);
	}
	}
	multipleGerateSelect(zcell1,0,OPGWNaiIndex,OPGWNaiClass,
			OPGWNaiTypeList,typeList[12]);
	
	/*下拉框生成OPGW悬垂*/
	var OPGWHang = typeList[0][1];
	var OPGWHangType = typeList[13];
	var OPGWHangTypeList = new Array();
	for (var i = 0; i <OPGWHangType.length; i++) {
		if(OPGWHangType[i][0].length>1){
		  OPGWHangTypeList.push(OPGWHangType[i][0].split(','));	
		}else{
			 OPGWHangTypeList.push([]);
		}
	
	}
	
	var OPGWHangIndex = new Array();
	var OPGWHangClass = new Array();
	for (var i = 0; i <OPGWHang.length; i++) {
	var OPGWHangI =	parseInt(OPGWHang[i]);
	if(OPGWHangI%(pagingSize+1)!=0&&(OPGWHangI-1)%(pagingSize+1)!=0&&(OPGWHangI+1)%(pagingSize+1)!=0&&(OPGWHangI-2)%(pagingSize+1)!=0){
		var list = new Array();
		list.push(17);
		list.push(parseInt(OPGWHang[i]));	
		OPGWHangIndex.push(list);
		OPGWHangClass.push("OPGW"+OPGWHang[i]);
	}
	}
	multipleGerateSelect(zcell1,0,OPGWHangIndex,OPGWHangClass,
			OPGWHangTypeList,typeList[14]);
	
}

//给导线数量赋值
var initCountParam = function(list){
	if(!Tools.isEmpty(list)){
	
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for (var i = 1; i <datastr.length; i++) {
		if(i!=1&&i%(pagingSize+1)!=0&&(i-1)%(pagingSize+1)!=0&&(i+1)%(pagingSize+1)!=0&&(i+2)%(pagingSize+1)!=0&&(i-2)%(pagingSize+1)!=0){
		for (var j = 0; j <list[0].length; j++) {
			if((i-3-Math.floor(i/pagingSize))>=list[0][j][0]&&(i-3-Math.floor(i/pagingSize))<list[0][j][1]){
				if(!Tools.isEmpty($(".wire"+i).children("option:selected").val())){
					zcell1.GetSheet(0).SetCellValue(12,i,list[1][0][j]);//导线数量
				}
				if(!Tools.isEmpty($(".ground"+i).children("option:selected").val())){
					zcell1.GetSheet(0).SetCellValue(16,i,list[1][1][j]);//地线数量
				}
				if(!Tools.isEmpty($(".OPGW"+i).children("option:selected").val())){
					zcell1.GetSheet(0).SetCellValue(18,i,list[1][2][j]);//OPGW数量
				}			
			}
			if((i-3-Math.floor(i/pagingSize))==list[0][j][0]){
				if(list[1][3][j]!="0"){
					zcell1.GetSheet(0).SetCellValue(14,i,list[1][3][j]);//跳线数量
				}else{
					$(".tiao"+i+"").remove();
				}
			}
		 }
	   }
	 }
   }
}

//给防震锤数量赋值计算
var initHammerParam  = function(list){
	if(!Tools.isEmpty(list)){
	
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for (var i = 1; i <datastr.length; i++) {
		if(i!=1&&i%(pagingSize+1)!=0&&(i-1)%(pagingSize+1)!=0&&(i+1)%(pagingSize+1)!=0&&(i+2)%(pagingSize+1)!=0&&(i-2)%(pagingSize+1)!=0){
			var count = Math.floor(i/pagingSize)+1;
			
				zcell1.GetSheet(0).SetCellValue(27,i,list[1][0][i-count-2]);//导线数量
				zcell1.GetSheet(0).SetCellValue(28,i,list[1][1][i-count-2]);//地线数量
				zcell1.GetSheet(0).SetCellValue(29,i,list[1][2][i-count-2]);//OPGW数量
			
				for (var j = 0; j <list[0].length; j++) {
					if((i-2-count)>=list[0][j][0]&&(i-2-count)<list[0][j][1]){
						
						zcell1.GetSheet(0).SetCellValue(32,i+1,list[2][0][j]);//导线型号
						zcell1.GetSheet(0).SetCellValue(33,i+1,list[2][1][j]);//地线型号
						zcell1.GetSheet(0).SetCellValue(34,i+1,list[2][2][j]);//OPGW型号
						zcell1.GetSheet(0).SetCellValue(35,i+1,list[2][3][j]);//导线直径
						break;
					}
				 }
	   }
	 }
   }
}

//给盘长赋值
var initDisklength  = function(){
	if(!Tools.isEmpty(diskList)){
	
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for (var i = 1; i <datastr.length; i++) {
		zcell1.GetSheet(0).SetCellValue(20,i,diskList[0][i-1]);
		zcell1.GetSheet(0).SetCellValue(24,i,diskList[1][i-1]);
	}
   }
	diskCalc();
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
			$("#projectCode").text(data.code+"-D03");//工程编号
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


/* 导出
*/
function JSONToExcelConvertor() { 
	 $("select").remove();
	$(".valueobject").html("");
	zcell1.GetSheet(0).DeleteCol(30,35);
	var table = document.getElementById("tabl1");
	  var len = table.rows.length; 
	    for(var i = 0;i < len;i++){
	        table.rows[i].deleteCell(0);
	    }
	table.deleteRow(0); 
	zcell1.GetSheet(0).SetCellStyle(1, 1, {
		"width" : "60px"
	});
	zcell1.GetSheet(0).SetCellStyle(2, 1, {
		"width" : "60px"
	});
	zcell1.GetSheet(0).SetCellStyle(3, 1, {
		"width" : "60px"
	});
	zcell1.GetSheet(0).SetCellStyle(4, 1, {
		"width" : "50px"
	});
	zcell1.GetSheet(0).SetCellStyle(5, 1, {
		"width" : "50px"
	});
	zcell1.GetSheet(0).SetCellStyle(6, 1, {
		"width" : "50px"
	});
	zcell1.GetSheet(0).SetCellStyle(7, 1, {
		"width" : "50px"
	});
	zcell1.GetSheet(0).SetCellStyle(8, 1, {
		"width" : "50px"
	});
	zcell1.GetSheet(0).SetCellStyle(9, 1, {
		"width" : "50px"
	});
	zcell1.GetSheet(0).SetCellStyle(10, 1, {
		"width" : "120px"
	});
	zcell1.GetSheet(0).SetCellStyle(11, 1, {
		"width" : "120px"
	});
	
	zcell1.GetSheet(0).SetCellStyle(13, 1, {
		"width" : "120px"
	});
	
	zcell1.GetSheet(0).SetCellStyle(15, 1, {
		"width" : "120px"
	});

	zcell1.GetSheet(0).SetCellStyle(17, 1, {
		"width" : "120px"
	});
	zcell1.GetSheet(0).SetCellStyle(19, 1, {
		"width" : "220px"
	});

	zcell1.GetSheet(0).SetCellStyle(23, 1, {
		"width" : "220px"
	});
	
	zcell1.GetSheet(0).SetCellStyle(27, 1, {
		"width" : "120px"
	});
	
	var timestamp = Date.parse(new Date());
	exportExcel("coverTable",timestamp+"组配件封面");
	setTimeout(100);
	exportExcel("tabl1",timestamp+"组配件明细");

	window.location.reload();
}  

/* 返回
*/
function backUpPage() {	
	location.href = path+ "/Parts/projectList.action";
};

/* 计算盘长
*/
function diskCalc() {	
	var datastr = zcell1.GetSheet(0).GetDataArr();
	diskArr=[];//左侧
	diskArr2=[];//右侧
	for (var i = 1; i <datastr.length-1; i++) {
		if(!Tools.isEmpty(datastr[i][19])&&datastr[i][19]==datastr[i-1][19]&&datastr[i][19]!=datastr[i+1][19]){
			zcell1.GetSheet(0).SetCellValue(21,i,datastr[i][19]);
			diskArr.push(i);
		}
		if(isNumber(datastr[i][23])&&!Tools.isEmpty(datastr[i][23])&&datastr[i][23]==datastr[i-1][23]&&datastr[i][23]!=datastr[i+1][23]){
			zcell1.GetSheet(0).SetCellValue(25,i,datastr[i][23]);
			diskArr2.push(i);
		}
	}	
	
	var size =parseInt(datastr.length/(pagingSize+1));
	for (var i = 0; i <diskArr.length; i++) {
		for (var j = 1; j <=size; j++) {
			
			if(diskArr[i]+1<(pagingSize+1)*j&&diskArr[i+1]>=(pagingSize+1)*j){
				zcell1.GetSheet(0).MergeCells(19, diskArr[i]+1, 19, (pagingSize+1)*j-2);	
				zcell1.GetSheet(0).MergeCells(19, (pagingSize+1)*j+3, 19, diskArr[i+1]);
				continue;
			}
	}
			zcell1.GetSheet(0).MergeCells(19, diskArr[i]+1, 19, diskArr[i+1]);
			continue;

		}
	
	for (var i = 0; i <diskArr2.length; i++) {
		for (var j = 1; j <=size; j++) {
			
			if(diskArr2[i]+1<(pagingSize+1)*j&&diskArr2[i+1]>=(pagingSize+1)*j){
				zcell1.GetSheet(0).MergeCells(23, diskArr2[i]+1, 23, (pagingSize+1)*j-2);	
				zcell1.GetSheet(0).MergeCells(23, (pagingSize+1)*j+3, 23, diskArr2[i+1]);
				continue;
			}
	}
			zcell1.GetSheet(0).MergeCells(23, diskArr2[i]+1, 23, diskArr2[i+1]);
			continue;

		}
	
	for (var i = 0; i <diskArr.length-1; i++) {
	var laiArr=[];	
	var congArr=[];	
	for (var j = 1; j <datastr.length; j++) {
		if(diskArr[i]<j&&diskArr[i+1]>=j){
			if(isNumber(datastr[j][7])&&diskArr[i+1]!=j){
				laiArr.push(datastr[j][7]);	
			}
		}
		if(isNumber(datastr[j][29])&&(diskArr[i]==j||diskArr[i+1]==j)){
			congArr.push(datastr[j][29]);
		}
	}
	laiArr = removeItem(laiArr);
	var laicount = getSum(laiArr)*parseFloat(modulus)+parseFloat(margin);
	var congcount = getSum(congArr);
	var count = Math.ceil(laicount+congcount);
	zcell1.GetSheet(0).SetCellValue(19,diskArr[i]+1,count+"m 盘号("+(i+1)+")");
	zcell1.GetSheet(0).SetCellValue(19,diskArr[i+1],count+"m 盘号("+(i+1)+")");
	}
	
	for (var i = 0; i <diskArr2.length-1; i++) {
		var laiArr=[];	
		var congArr=[];	
		for (var j = 1; j <datastr.length; j++) {
			if(diskArr2[i]<j&&diskArr2[i+1]>=j){
				if(isNumber(datastr[j][7])&&diskArr2[i+1]!=j){
					laiArr.push(datastr[j][7]);	
				}
			}
			if(isNumber(datastr[j][29])&&(diskArr2[i]==j||diskArr2[i+1]==j)){
				congArr.push(datastr[j][29]);
			}
		}
		laiArr = removeItem(laiArr);
		var laicount = getSum(laiArr)*parseFloat(modulus)+parseFloat(margin);
		var congcount = getSum(congArr);
		var count = Math.ceil(laicount+congcount);
		zcell1.GetSheet(0).SetCellValue(23,diskArr2[i]+1,count+"m 盘号("+(i+diskArr.length)+")");
		zcell1.GetSheet(0).SetCellValue(23,diskArr2[i+1],count+"m 盘号("+(i+diskArr.length)+")");
		}
};

/* 保存
*/
function saveParts() {
	var datas = getCountParams();
	var url = path + "/Parts/saveParts.action";
	 $.ajax({
		 type:'post',
		 url:url,
		 data:{
			 'datas' : datas,
				'id' : id	
			},
		 dataType : 'json',
		 success : function(data) {
				if (data.msg == "success") {
					Tools.tipsMsg("提交成功！");
					/*
					layer.confirm("提交成功！", {
						btn : "确认"
					}, function() {//按钮执行事件
						location.href = path
						+ "/Parts/projectList.action";
					});							
				*/} else {
					Tools.tipsMsg("提交失败！");
				}	
			}
	 });
};


//获取总详情数据
function getCountParams(){
	var list = new Array();
	var list0 = new Array();
	var list1 = new Array();
	var list2 = new Array();
	var list3 = new Array();
	var list4 = new Array();
	var list5 = new Array();
	var list6 = new Array();
	var list7 = new Array();
	var list8 = new Array();
	var list9 = new Array();
	var list10 = new Array();
	var list11 = new Array();
	var list12 = new Array();
	var list13 = new Array();
	var list14 = new Array();
	var list15 = new Array();
	var list16 = new Array();
	var list17 = new Array();
	var list18 = new Array();
	var list19 = new Array();
	var list20 = new Array();
	var list21 = new Array();
	var list22 = new Array();
	var list23 = new Array();
	var list24 = new Array();
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for(var i=0;i<datastr.length;i++){
		var wire;
		if(!Tools.isEmpty($(".wire"+(i+1)).children("option:selected").val())){
			wire=$(".wire"+(i+1)).children("option:selected").val();
		}else{
			wire="";
		}
		var ground;
		if(!Tools.isEmpty($(".ground"+(i+1)).children("option:selected").val())){
			ground=$(".ground"+(i+1)).children("option:selected").val();
		}else{
			ground="";
		}
		var tiao;
		if(!Tools.isEmpty($(".tiao"+(i+1)).children("option:selected").val())){
			tiao=$(".tiao"+(i+1)).children("option:selected").val();
		}else{
			tiao="";
		}
		var OPGW;
		if(!Tools.isEmpty($(".OPGW"+(i+1)).children("option:selected").val())){
			OPGW=$(".OPGW"+(i+1)).children("option:selected").val();
		}else{
			OPGW="";
		}
		list0.push(wire)
		list1.push(datastr[i][11])
		list2.push(tiao)
		list3.push(datastr[i][13])
		list4.push(ground)
		list5.push(datastr[i][15])
		list6.push(OPGW)
		list7.push(datastr[i][17])
		list8.push(datastr[i][18])
		list9.push(datastr[i][19])
		list10.push(datastr[i][20])
		list11.push(datastr[i][21])
		list12.push(datastr[i][22])
		list13.push(datastr[i][23])
		list14.push(datastr[i][24])
		list15.push(datastr[i][25])
		list16.push(datastr[i][26])
		list17.push(datastr[i][27])
		list18.push(datastr[i][28])	
		list19.push(datastr[i][30])
		list20.push(datastr[i][0])
		list21.push(datastr[i][31])
		list22.push(datastr[i][32])
		list23.push(datastr[i][33])
		list24.push(datastr[i][34])
	}
	list = [list0,list1,list2,list3,list4,list5,list6,list7,list8,list9,list10,list11,list12,
		list13,list14,list15,list16,list17,list18,list19,list20,list21,list22,list23,list24]
	data = JSON.stringify(list);
	return data;

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
* 数组求和
**/
function getSum(array){
	var sum = 0;
	for (var i = 0; i < array.length; i++){
	sum += parseInt(array[i]);
	}
	return sum;
	}