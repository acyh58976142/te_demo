/*孤立档架线弧垂表*/
var Zcell1 = null;

function wiringDrawing() {
	// 初始化表格
	this.initCellTableData();
//	this.initCellData();
}

wiringDrawing.prototype.initCellTableData = function(data){
	wiringDrawingCellTable();
}

/**
 * 孤立档架线弧垂表
 */
var wiringDrawingCellTable = function(){
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
	Zcell1.GetSheet(0).SetCellValue(27,63,"安徽阜阳阜三-白果220kv线路");
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

var setConversionColWidth = function(tabObj,sheetIndex,valueArr){
	const colWidth = 2.27; //  列宽比
	for (var i = 0; i < valueArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetColWidth(i+1, UnitConversion.mmConversionPx(valueArr[i])*colWidth);
	}
}
var setCellStyle = function(tabObj,sheetIndex,mapArr,style){
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellStyle(mapArr[i][0], mapArr[i][1], style);
	}
}
var setCellType = function(tabObj,sheetIndex,mapArr,valueArr){
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellType(mapArr[i][0], mapArr[i][1], {
			"code": "object",
			"object":valueArr[i]
		});
	}
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
//	      console.log(c_value);
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
//	      console.log(c_value);
	        return c_value;
	    }
	}

