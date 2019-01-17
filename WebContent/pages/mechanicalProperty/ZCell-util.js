var multipleGerateSelect = function(tabObj,sheetIndex,colAndRowArr,selectIdArr,ValueArr){
	for (var i = 0; i < colAndRowArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellType(colAndRowArr[i][0], colAndRowArr[i][1], {
			"code": "object",
			"object": generateSelect(selectIdArr[i],ValueArr[i])
		});
		let _this = document.getElementById(selectIdArr[i]);
		_this.previousSibling.innerHTML  = _this.value;
		_this.addEventListener("change", function(){
			var content = _this.value;
			_this.previousSibling.innerHTML  = content;
		},false)
	}
}

var generateSelect = function(selectId,dataArr){
	var select = '<a class="Alabel" /><select id="'+selectId+'" style="background-color:#92D050;width:98%;text-align:center;text-align-last:center;">';
	for (var i = 0; i < dataArr.length; i++) {
		select+= '<option val="'+dataArr[i]+'">'+dataArr[i]+'</option>';
	}
	select+='</select>';
	return select;
}

var selectChangeRegister = function(){
	for (var i = 0; i < SelectIdArr.length; i++) {
		let _this = document.getElementById(SelectIdArr[i]);
		_this.addEventListener("change", function(){
			var content = _this.value;
			_this.previousSibling.innerHTML  = content;
		},false)
	}
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

var setCellType = function(tabObj,sheetIndex,mapArr,valueArr){
	for (var i = 0; i < mapArr.length; i++) {
		tabObj.GetSheet(sheetIndex).SetCellType(mapArr[i][0], mapArr[i][1], {
			"code": "object",
			"object":valueArr[i]
		});
	}
}
