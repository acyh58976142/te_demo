/**
 * 结构数据js
 */
var zcell1 = null;
//目录
var Zcell2 = null;
//说明
var ZcellExplain = null;
$(function(){

	var winHeight = window.innerHeight;//浏览器页面的高
	var heights = winHeight-55;
	$("#cellContainer1").css({"height":heights+"px"});//整个中部界面的高
	$("#cellContainer4").css({"height":heights+"px"});//整个中部界面的高
	
	//选择工程  select 选择框
	initProject();
	
	//初始化说明表格
//	initCellExplain();
	
	$("#searchBtn").on("click",function(){
		initCellData();
	})
	
	//项目切换
	$("#projectName").on("change",function(){
		initCellData();
		initCell2();
	})
})

/**
 * 初始化工程
 * @returns
 */
function initProject(){
	$.ajax({
		type : 'post',
		url : path + 'common/getMainInfoList.action',
		success : function(data) {
			var option="";
			for(var i=0;i<data.length;i++){
				var main=data[i];
				option+="<option value='"+main.id+"'>"+main.projectName+"</option>"
			}
			$("#projectName").html(option);
			$("#projectName").find("option").first().attr("selected", true);			
			initCellData();
//			//初始化目录表格
    		initCell2();
		}
	})
}

function initCellData(){
	layer.load();
	$.ajax({
		type : 'post',
		url : path + 'structural/getTowerData.action',
		data : {
			'id' : $("#projectName").val(),
			'pageSize' : 15
	    },
		success : function(data) {
			layer.closeAll();
			var list=data.list;
			//创建智表对象
			zcell1 = new ZCell(document.getElementById("cellContainer1"));
			if(list.length>0){
				var tr1=["说明",Explain,"","","","","","","","","","","",""];
				var tr2=["施工环水保建议措施",Explain,"","","","","","","","","","","",""];
				var tr3=["施工环水保建议措施",Explain,"","","","","","","","","第1页","图号","",""];
				var tr4=["施工环水保建议措施",Explain,"","","","","","","","","第1页","S1345S-T0201A-1","",""];
				list.push(tr1);
				list.push(tr2);
				list.push(tr3);
				list.push(tr4);
			}
			// 创建表，并指定列，行数
			zcell1.InserSheet(0, 14, list.length);
			zcell1.GetSheet(0).LoadArrData(list);
			mergeCells(list.length);
			setStyle();
		}
	})
}

var Explain ="为基计成联系天动动城保护范围不小是产能担是 西满足要求，所卖)杆增名标段水疯于时请核实有效理深边打道平断面面(成村质掉在虚土:爆力施工前请务必精对电心植被好、流水通畅址，排水构的出口应选样在植流届情况与甚础的物家以及为吃或工观不来，请与设计有展系";
var Measures="为基计成联系天动动城保护范围不小是产能担是 西满足要求，所卖)杆增名标段水疯于时请核实有效理深边打道平断面面(成村质掉在虚土:爆力施工前请务必精对电心植被好、流水通畅址，排水构的出口应选样在植流届情况与甚础的物家以及为吃或工观不来，请与设计有展系";

/**
 * 合并单元格
 * @returns
 */
function mergeCells(length){
	var sheet=zcell1.GetSheet(0);
	sheet.MergeCells(1,1,1,2);
	sheet.MergeCells(2,1,2,2);
	sheet.MergeCells(3,1,3,2);
	sheet.MergeCells(4,1,4,2);
	sheet.MergeCells(5,1,9,1);
	sheet.MergeCells(10,1,13,1);
	
	sheet.MergeCells(2,length-3,10,length-3);
	sheet.MergeCells(11,length-3,14,length-2);
	sheet.MergeCells(1,length-2,1,length);
	sheet.MergeCells(2,length-2,10,length);
	sheet.MergeCells(12,length-1,14,length-1);
	sheet.MergeCells(12,length,14,length);
	
	var i=3;
	while(i<length-3){
		sheet.MergeCells(1,i,1,i+3);
		sheet.MergeCells(2,i,2,i+3);
		sheet.MergeCells(3,i,3,i+3);
		sheet.MergeCells(4,i,4,i+3);
		sheet.MergeCells(12,i,12,i+3);
		sheet.MergeCells(13,i,13,i+3);
		sheet.MergeCells(14,i,14,i+3);
		i=i+4
	}
}

/**
 * 设置单元格样式
 * @returns
 */
function setStyle(){
	zcell1.GetSheet(0).SetColWidth(1,120);
	zcell1.GetSheet(0).SetColWidth(2,120);
	zcell1.GetSheet(0).SetColWidth(3,65);
	zcell1.GetSheet(0).SetColWidth(4,120);
	zcell1.GetSheet(0).SetColWidth(5,65);
	zcell1.GetSheet(0).SetColWidth(6,120);
	zcell1.GetSheet(0).SetColWidth(7,65);
	zcell1.GetSheet(0).SetColWidth(8,65);
	zcell1.GetSheet(0).SetColWidth(9,120);
	zcell1.GetSheet(0).SetColWidth(10,350);
	zcell1.GetSheet(0).SetColWidth(11,65);
	zcell1.GetSheet(0).SetColWidth(12,65);
	zcell1.GetSheet(0).SetColWidth(13,65);
}


//目录表
var initCell2=function(){
	$("#cellContainer4").html("");
	
	$.ajax({
		type : 'post',
		url : path + 'structural/getPicList.action',
		data : {
			'projectId' : $("#projectName").val()
	    },
		success : function(data) {
			layer.closeAll();
			var code=data.code;
			// 创建JSCELL，指明承载容器
			Zcell2 = new ZCell(document.getElementById("cellContainer4"));
			var length=36;
			var listData=[];
			if(code=='200'){
				var list=data.data;
				if(list.length>0){
					if(list.length>length){
						length=list.length;
					}
					for(var i=0;i<list.length;i++){
						var obj=list[i];					
						var basicModel=obj.basicModel+"-基础施工图"; 
						var remark=obj.remark;
						var picNumber=obj.picNumber; 
						var picData=[picNumber,basicModel,"1",remark];
						listData.push(picData);
					}
				}

			}
			// 创建表，并指定列，行数
			Zcell2.InserSheet(0, 26, length);
			// 加载数据
			Zcell2.GetSheet(0).LoadArrData([]);
			
			initCell2Style(listData);
						
		}
	})

}

var initCell2Style=function(listData){
	// 设置列宽
	for (var i = 1; i <= 26; i++) {
		if (i==1) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(10));
		}else if (i>=3&&i<=8) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(9));
		}else if (i>=9&&i<=18) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(7.5));
		}else if (i==2||i==19) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(10));
		}else if (i>=20&&i<=25) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(40)/6);
		}else if (i==26) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(10));
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
		}
	}
	//合并单元格
	Zcell2.GetSheet(0).MergeCells(3,4,8,4);
	
	//卷  册  检  索  号    边框
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
	Zcell2.GetSheet(0).MergeCells(10,4,19,4);
	Zcell2.GetSheet(0).MergeCells(21,4,22,4);
	Zcell2.GetSheet(0).MergeCells(23,4,24,4);
	
	Zcell2.GetSheet(0).MergeCells(10,5,11,5);	
	Zcell2.GetSheet(0).MergeCells(12,5,24,5);
	
	for (var i = 7; i < 36; i++) {
		Zcell2.GetSheet(0).MergeCells(3,i,8,i);
		Zcell2.GetSheet(0).MergeCells(9,i,18,i);
		Zcell2.GetSheet(0).MergeCells(20,i,25,i);
	}
	Zcell2.GetSheet(0).MergeCells(2,2,18,3);
	//	样式
	for (var i = 7; i < 36; i++) {
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
			Zcell2.GetSheet(0).SetCellStyle(i+1, 6, {
				"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
		}
	}
	setCellStyle(Zcell2,0,
			[[10,4],[21,4],[10,4],[10, 5],[15, 5],[19,5],[23,5]],
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
			[[3,4],[20,2],[23,2],[10,4],[20,4],[21,4],[23,4],[10,5],[12,5]],
				["  卷  册  检  索  号","第 1 页","共 2 页","安徽阜阳阜三-白果220kV线路",
					"工程","施工图","设计阶段","卷册名称","绝缘子金具串及组配件施工图"]
			);
	
	Zcell2.GetSheet(0).SetCellValue(2,7,"序号");
	Zcell2.GetSheet(0).SetCellType(3,7,{
        "code": "object",
        "object":"图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号"
    });
	Zcell2.GetSheet(0).SetCellType(9,7,{
        "code": "object",
        "object":"图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
    });
	Zcell2.GetSheet(0).SetCellValue(19,7,"张数");
	Zcell2.GetSheet(0).SetCellType(20, 7,  {
        "code": "object",
        "object":"套用原工程名称及<br>卷册检索号、图号"
    });
//	Zcell2.GetSheet(0).SetCellType(2, 35,  {
//		"code": "object",
//		"object":"备注"
//	});
	for (var i = 1; i < 29; i++) {
		Zcell2.GetSheet(0).SetCellValue(2,i+7,i);
	}
	

	//背景图片
	Zcell2.GetSheet(0).SetCellType(2, 2,  {
		"code": "object",
		"object":"<img src='"+path+"resource/images/minPicIndex.png' width='"+
		UnitConversion.mmConversionPx(127.8)+"' height='"+
		UnitConversion.mmConversionPx(11)+"'/>"
	});

//  目录20串
	if (!Tools.isEmpty(Zcell2)) {
		for (var i = 0; i < listData.length; i++) {
			Zcell2.GetSheet(0).SetCellValue(3,8+i,listData[i][0]);// 图号
			Zcell2.GetSheet(0).SetCellValue(9,8+i,listData[i][1]);// 图名
			Zcell2.GetSheet(0).SetCellValue(19,8+i,listData[i][2]);
			Zcell2.GetSheet(0).SetCellValue(20,8+i,listData[i][3]);
		}
	}
	
}


function JSONToExcelConvertor() { 
	
	$(".valueobject").html("");
	var table = document.getElementById("tabl1");
	  var len = table.rows.length; 
	    for(var i = 0;i < len;i++){
	        table.rows[i].deleteCell(0);
	    }
	table.deleteRow(0); 

	for (var i = 1; i <= 14; i++) {
		for (var j = 1; j <= len; j++) {
			zcell1.GetSheet(0).SetCellStyle(i, j, {
				"border" : "1px solid black"
			});
		}
	}
	var timestamp = Date.parse(new Date());
	exportExcel("tabl1",timestamp+"基础结构");
	window.location.reload();
}



//说明
/*var initCellExplain = function(){
	// 创建JSCELL，指明承载容器
	ZcellExplain = new ZCell(document.getElementById("cellContainer2"));
	// 创建表，并指定列，行数
	ZcellExplain.InserSheet(0, 26, 36);
	// 加载数据
	ZcellExplain.GetSheet(0).LoadArrData([]);
	
	initExplainStyle();
}*/
//说明表格样式
/*var initExplainStyle=function(){
	// 设置列宽
	for (var i = 1; i <= 26; i++) {
		
		if(i==13){
			ZcellExplain.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(10));
		}else{
			ZcellExplain.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(8.6));
		}
	}
	// 设置行高
	for (var i = 1; i <= 36; i++) {
		ZcellExplain.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(6));	
	}
	//合并单元格
	//ZcellExplain.GetSheet(0).MergeCells(2,1,8,1);
	//合并单元格
	ZcellExplain.GetSheet(0).MergeCells(2,1,25,1);//标题
	ZcellExplain.GetSheet(0).MergeCells(2,2,25,2);
	
    //合并单元格
	ZcellExplain.GetSheet(0).MergeCells(2,3,5,3);//日期
	ZcellExplain.GetSheet(0).MergeCells(20,3,25,3);//编号
	
	ZcellExplain.GetSheet(0).MergeCells(3,4,10,4);
	ZcellExplain.GetSheet(0).MergeCells(11,4,12,4);	
	ZcellExplain.GetSheet(0).MergeCells(13,4,16,4);	
	ZcellExplain.GetSheet(0).MergeCells(17,4,18,4);
	ZcellExplain.GetSheet(0).MergeCells(19,4,22,4);
	ZcellExplain.GetSheet(0).MergeCells(23,4,24,4);
	
	// 单元格赋值
    setCellValue(ZcellExplain,0,
			[[2,1],[2,3],[11,4],[17,4],[23,4],[3,6],[5,6],[7,6],[9,6],[11,6],[13,6]],
				["安徽华电工程咨询设计有限公司修改(补充)设计图纸说明表",getCurrentDate(3),"工程","设计阶段","部分",
					"第","卷","第","册","第","分册"]
			);
    setCellValue(ZcellExplain,0,
			[[3,4],[13,4],[19,4]],
				["金家岭-寿州π入南关变220kv线路","施工图","结构"]
			);
	ZcellExplain.GetSheet(0).SetCellType(2,2,{
        "code": "object",
        "object":"<div id= ''>Q/AHDC Z301A-2019</div>"
    })
    ZcellExplain.GetSheet(0).SetCellType(21,3,{
        "code": "object",
        "object":"<div id= ''>编号：S1377S-T0201A-XA</div>"
    })
	//Zcell2.GetSheet(0).SetCellValue(2,11,"序号");
	ZcellExplain.GetSheet(0).SetCellStyle(3, 4, {
		"border-bottom" :  "1px solid black",
	});	
	ZcellExplain.GetSheet(0).SetCellStyle(13, 4, {
		"border-bottom" :  "1px solid black",
	});
	ZcellExplain.GetSheet(0).SetCellStyle(19, 4, {
		"border-bottom" :  "1px solid black",
	});
	//边框
	for (var i = 2; i < 34; i++) {
		if(i==3||i==13||i==19){
			ZcellExplain.GetSheet(0).SetCellStyle(i, 4, {
				"border-bottom" :  "1px solid black",
			});	
		}
		if(i==4||i==8||i==12){
			ZcellExplain.GetSheet(0).SetCellStyle(i, 6, {
				"border-bottom" :  "1px solid black",
			});	
		}
		ZcellExplain.GetSheet(0).SetCellStyle(2, i+2, {
			"border-left" :  "2px solid black",
		});		
		ZcellExplain.GetSheet(0).SetCellStyle(25, i+2, {
			"border-right" :  "2px solid black",
		});	
		if(i<26){
			ZcellExplain.GetSheet(0).SetCellStyle(i, 4, {
				"border-top" :  "2px solid black",
			});		
			ZcellExplain.GetSheet(0).SetCellStyle(i, 35, {
				
				"border-bottom" :  "2px solid black",
			});	
		}
	}
	// 单元格赋值
	ZcellExplain.GetSheet(0).SetCellType(2,1,{
        "code": "object",
        "object":"<div id= 'jcjsh'>341-S1325S-D0103</div>"
    })
}*/

