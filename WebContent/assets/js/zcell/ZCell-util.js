var selectSort = 0;
var multipleGerateSelect = function(tabObj, sheetIndex, colAndRowArr,
		classNameArr, valueArr , selectedValueArr ,backgroundColor) {
	for (var i = 0; i < colAndRowArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellType(colAndRowArr[i][0],
				colAndRowArr[i][1], {
					"code" : "object",
					"object" : generateSelect(classNameArr[i], valueArr[i],Tools.isEmpty(selectedValueArr)?"":selectedValueArr[i],Tools.isEmpty(backgroundColor)?"":backgroundColor)
				});
		let _this = document.getElementById("select"+selectSort);
		_this.previousSibling.innerHTML = _this.value;
		_this.parentNode.style.backgroundColor = "#92D050";
		_this.addEventListener("change", function() {
			var content = _this.value;
			_this.previousSibling.innerHTML = content;
		}, false)
		selectSort++;
	}
}

var generateSelect = function(className, dataArr,selectedValue,backgroundColor) {
	var background_color = Tools.isEmpty(backgroundColor)?"#92D050":backgroundColor;
	var select = '<a class="Alabel" /><select id="select'+selectSort+'" class="'
			+ className
			+ '" style="background-color:'+background_color+';width:98%;text-align:center;text-align-last:center;">';
	select += '<option selected="" disabled="" style="display: none"></option>';
	for (var i = 0; i < dataArr.length; i++) {
		var value = null;
		if (dataArr[i] == "√") {
			value = true;
		} else if (dataArr[i] == "×") {
			value = false;
		} else {
			value = dataArr[i];
		}
		if (""!==selectedValue||null!==selectedValue||undefined!==selectedValue) {
			if (selectedValue==dataArr[i]) {
				select += '<option value="' + value + '" selected>' + dataArr[i] + '</option>';
				continue;
			}
		}
		select += '<option value="' + value + '">' + dataArr[i] + '</option>';
	}
	select += '</select>';
	return select;
}

var selectChangeRegister = function() {
	for (var i = 0; i < SelectIdArr.length; i++) {
		let _this = document.getElementById(SelectIdArr[i]);
		_this.addEventListener("change", function() {
			var content = _this.value;
			_this.previousSibling.innerHTML = content;
		}, false)
	}
}

var setConversionColWidth = function(tabObj, sheetIndex, valueArr) {
	const colWidth = 2.27; // 列宽比
	for (var i = 0; i < valueArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetColWidth(i + 1,
				UnitConversion.mmConversionPx(valueArr[i]) * colWidth);
	}
}

var setCellValueAndStyle = function(tabObj, sheetIndex, mapArr, valueArr, style) {
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellValue(mapArr[i][0], mapArr[i][1],
				valueArr[i]);
		tabObj.GetSheet(sheetIndex).SetCellStyle(mapArr[i][0], mapArr[i][1],
				style);
	}
}

var setCellValue = function(tabObj, sheetIndex, mapArr, valueArr) {
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellValue(mapArr[i][0], mapArr[i][1],
				valueArr[i]);
	}
}

var setCellStyle = function(tabObj, sheetIndex, mapArr, style) {
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellStyle(mapArr[i][0], mapArr[i][1],
				style);
	}
}

var setCellType = function(tabObj, sheetIndex, mapArr, valueArr) {
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellType(mapArr[i][0], mapArr[i][1], {
			"code" : "object",
			"object" : valueArr[i]
		});
	}
}
var mergeCellAndSetType =  function(tabObj, sheetIndex, mapArr, valueArr) {
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).MergeCells(mapArr[i][0],mapArr[i][1],mapArr[i][2],mapArr[i][3]);
		tabObj.GetSheet(sheetIndex).SetCellType(mapArr[i][0],mapArr[i][1],{
	        "code": "object",
	        "object":valueArr[i]
	    });
	}
}
var mergeCellAndSetValue =  function(tabObj, sheetIndex, mapArr, valueArr) {
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).MergeCells(mapArr[i][0],mapArr[i][1],mapArr[i][2],mapArr[i][3]);
		tabObj.GetSheet(sheetIndex).SetCellValue(mapArr[i][0],mapArr[i][1],valueArr[i]);
	}
}
var setCellBorder = function(tabObj, sheetIndex, startColIndex, endColIndex ,startRowIndex,endRowIndex) {
	for (var i = startColIndex; i <= endColIndex; i++) {
		for (var j = startRowIndex; j <= endRowIndex; j++) {
			tabObj.GetSheet(sheetIndex).SetCellStyle(i, j, {
				"border-top" : "1px solid black",
				"border-left" : "1px solid black"
			});
			if (i==endColIndex) {
				tabObj.GetSheet(sheetIndex).SetCellStyle(i, j, {
					"border-top" : "1px solid black",
					"border-left" : "1px solid black",
					"border-right" : "1px solid black",
				});
			}
			if (j==endRowIndex) {
				tabObj.GetSheet(sheetIndex).SetCellStyle(i, j, {
					"border-top" : "1px solid black",
					"border-left" : "1px solid black",
					"border-bottom" : "1px solid black",
				});
			}
		}
	}
}
var setCellBackGroudColor = function(tabObj, sheetIndex, startColIndex, endColIndex ,startRowIndex,endRowIndex,color) {
	for (var i = startColIndex; i <= endColIndex; i++) {
		for (var j = startRowIndex; j <= endRowIndex; j++) {
			tabObj.GetSheet(sheetIndex).SetCellStyle(i, j, {
				"background-color" : color
			});
		}
	}
}


function switchData(condition, dataArray, resultArray) {
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i] == condition) {
			return resultArray[i];
		}
	}
	return "";
}

function toPercent(point) {
	var percent = Number(point * 100).toFixed(1);
	percent += "%";
	return percent;
}

/**
 * 
 * @param type
 * @returns 1:"YYYY-MM-DD",2:"YYYY/MM/DD",3:"YYYY年MM月DD日"
 */
function getCurrentDate(type) {
	var myDate = new Date();
	var curdate = "";
	if (type == 1) {
		curdate = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-"
				+ myDate.getDate();
	} else if (type == 2) {
		curdate = myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/"
				+ myDate.getDate();
	} else if (type == 3) {
		curdate = myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月"
				+ myDate.getDate() + "日";
	} else {
		curdate = "";
	}
	return curdate;
}

var UnitConversion = {
	/**
	 * 获取DPI
	 * 
	 * @returns {Array}
	 */
	conversion_getDPI : function() {
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
	 * 
	 * @param value
	 * @returns {number}
	 */
	pxConversionMm : function(value) {
		var inch = value / this.conversion_getDPI()[0];
		var c_value = inch * 25.4;
		// console.log(c_value);
		return c_value;
	},
	/**
	 * mm转换为px
	 * 
	 * @param value
	 * @returns {number}
	 */
	mmConversionPx : function(value) {
		var inch = value / 25.4;
		var c_value = inch * this.conversion_getDPI()[0];
		// console.log(c_value);
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
      table2Excel(tableid,name)
  }
}
function Cleanup() {
  window.clearInterval(idTmr);
  CollectGarbage();
}


//判断浏览器后调用的方法，把table的id传入即可
var table2Excel = (function() {
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

