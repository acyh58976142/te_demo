var Zcell1;
var list =[['导线悬垂串','','','导线耐张串','','','跳线悬垂串','','','地线悬垂串','','','地线耐张串','','','OPGW光缆悬垂串','','','OPGW光缆耐张串','',''],
			['名称','代号','适用情况','名称','代号','适用情况','名称','代号','适用情况','名称','代号','适用情况','名称','代号','适用情况','名称','代号','适用情况','名称','代号','适用情况'],
			];
function partsConfig() {
	// 初始化表格
	this.initCellTableData();
	
}

partsConfig.prototype.initCellTableData = function(data){
	// 创建JSCELL，指明承载容器
	Zcell1 = new ZCell(document.getElementById("stingContainer"));
	// 创建表，并指定列，行数
	Zcell1.InserSheet(0, 21, 10);
	// 加载数据
	Zcell1.GetSheet(0).LoadArrData(list);
	// 设置样式

	// 设置列宽
	Zcell1.GetSheet(0).SetColWidth(1, 80);
	Zcell1.GetSheet(0).SetColWidth(2, 80);
	Zcell1.GetSheet(0).SetColWidth(3, 80);
	Zcell1.GetSheet(0).SetColWidth(4, 80);
	Zcell1.GetSheet(0).SetColWidth(5, 80);
	Zcell1.GetSheet(0).SetColWidth(6, 80);
	Zcell1.GetSheet(0).SetColWidth(7, 80);
	Zcell1.GetSheet(0).SetColWidth(8, 80);
	Zcell1.GetSheet(0).SetColWidth(9, 80);
	Zcell1.GetSheet(0).SetColWidth(10, 80);
	Zcell1.GetSheet(0).SetColWidth(11, 80);
	Zcell1.GetSheet(0).SetColWidth(12, 80);
	Zcell1.GetSheet(0).SetColWidth(13, 80);
	Zcell1.GetSheet(0).SetColWidth(14, 80);
	Zcell1.GetSheet(0).SetColWidth(15, 80);
	Zcell1.GetSheet(0).SetColWidth(16, 80);
	Zcell1.GetSheet(0).SetColWidth(17, 80);
	Zcell1.GetSheet(0).SetColWidth(18, 80);
	Zcell1.GetSheet(0).SetColWidth(19, 80);
	
	// 设置行高
	Zcell1.GetSheet(0).SetRowHeight(3,50);
	Zcell1.GetSheet(0).SetRowHeight(4,50);
	Zcell1.GetSheet(0).SetRowHeight(5,50);
	Zcell1.GetSheet(0).SetRowHeight(6,50);
	Zcell1.GetSheet(0).SetRowHeight(7,50);
	Zcell1.GetSheet(0).SetRowHeight(8,50);
	Zcell1.GetSheet(0).SetRowHeight(9,50);
	Zcell1.GetSheet(0).SetRowHeight(10,50);
	var winHeight = window.innerHeight;//浏览器页面的高
	var heights = winHeight-75;
	$("#stingContainer").css({"height":heights+"px"});//整个中部界面的高
}

