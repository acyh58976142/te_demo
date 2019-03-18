var weatherConditionTemplate = function(tabObj,cols,cole,rows,rowe){
	let count = 1;
	let title = ["参与计算","工况序号","工况","温度℃","风速m/s","冰厚mm","风速折算","备注"];
	let workCondition=  ["最低气温","平均气温","最大风","覆冰","最高气温","安装","外过电压","外过电压","内过电压","5m/s风速","地线+5","三跨导线","三跨地线","验算4","验算5"];
	title.forEach((item,index,arr) =>{tabObj.GetSheet(0).SetCellValue(index+1,rows,item); });
	for (var i = rows+1; i <= rowe; i++) {
		tabObj.GetSheet(0).SetCellValue(2,i,count);
		tabObj.GetSheet(0).SetCellValue(3,i,workCondition[count-1]);
		tabObj.GetSheet(0).SetCellValue(1,i,["√","√","√","√","√","√","√","√","√"][count-1]);
		tabObj.GetSheet(0).SetCellValue(4,i,[-20,15,-5,-5,40,-10,15,15,15,15,-5,-5,-5,-5,-5][count-1]);
		tabObj.GetSheet(0).SetCellValue(5,i,[0,0,27,10,0,10,0,10,15,5,10,10,10,0,0][count-1]);
		tabObj.GetSheet(0).SetCellValue(6,i,[0,0,0,10,0,0,0,0,0,0,15,20,25,3,4][count-1]);
		tabObj.GetSheet(0).SetCellValue(7,i,["×","×","√","×","×","×","×","×","×"][count-1]);
		tabObj.GetSheet(0).SetCellValue(8,i,["","","","","","","(无风)","(有风)","","钢管杆用","验算1","验算2","验算3","验算4","验算5"][count-1]);
		count++;
	}
	//	样式
	setCellBorder(tabObj, 0, cols,cole, rows ,rowe);
	setCellBackGroudColor(tabObj,0,cols+2,cole-2,rowe-5,rowe,"#FFFF00");
	//	下拉框
	multipleGerateSelect(tabObj,0,[[cols,rowe-5],[cols,rowe-4],[cols,rowe-3],[cols,rowe-2],[cols,rowe-1],[cols,rowe],
		[cole-1,rowe-5],[cole-1,rowe-4],[cole-1,rowe-3],[cole-1,rowe-2],[cole-1,rowe-1],[cole-1,rowe]],
			['windSpeed','groundPlus5','threeWire','threeGround','check4','check5',
				'windConversion1','windConversion2','windConversion3','windConversion4','windConversion5','windConversion6'],
				[['√','×'],['√','×'],['√','×'],['√','×'],['√','×'],['√','×'],
					['√','×'],['√','×'],['√','×'],['√','×'],['√','×'],['√','×']]);
}