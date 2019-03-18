var zcell1;
// 页面加载时执行
$(document).ready(function() {

	$.ajax({
		type : 'post',
		url : path + 'TowerNew/getTaDataById.action',
		data : {
			'id' : id
	},
		success : function(data) {
			// 创建JSCELL，指明承载容器
			zcell1 = new ZCell(document.getElementById("cellContainer"));
			// 创建表，并指定列，行数
			zcell1.InserSheet(0, 35, data.length);

			// 加载数据
			zcell1.GetSheet(0).LoadArrData(data);
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});

});

