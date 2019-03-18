var zcell1;
var groundNo = ["","T3","T6","T10"];
// 页面加载时执行
$(document).ready(function() {

	$.ajax({
		type : 'post',
		url : path + 'GroundingDevice/getDeviceDetail.action',
		data : {
			'id' : id,
			'pagingSize' : pagingSize
	},
		success : function(data) {
			var list = data;
			if (list!=null) {
				// 创建JSCELL，指明承载容器
				zcell1 = new ZCell(document.getElementById("cellContainer"));
				// 创建表，并指定列，行数
				zcell1.InserSheet(0, 6, list.length);

				// 加载数据
				zcell1.GetSheet(0).LoadArrData(list);
				// 设置宽度
				setcolw();
				// 合并单元格设置样式
				merge(list.length);
				} else {
				Tools.tipsMsg("未发现TA文件！");
			}
			
			// 设置分页样式
			setpagingStyle(data);
			// 设置样式	
			setStyle();
			//给接地装置下拉框赋值
			setSelect();
			zcell1.GetSheet(0).SetColHidden(6,6);
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});

});


// 设置列宽
function setcolw(list) {
	zcell1.GetSheet(0).SetColWidth(2, 150);
	zcell1.GetSheet(0).SetColWidth(3, 150);
	zcell1.GetSheet(0).SetColWidth(4, 150);
	zcell1.GetSheet(0).SetColWidth(5, 150);
}

//设置分页样式
function setpagingStyle(data) {
	var list = data;
	 size =parseInt(list.length/pagingSize);
	 var title = ["杆塔编号","塔位里程千米+米","杆塔型式","杆塔定位呼高(米)","接地装置"];//标题
	for (var i = 1; i <=size; i++) {
		zcell1.GetSheet(0).MergeCells(1, pagingSize*i-1, 1, pagingSize*i);
		zcell1.GetSheet(0).MergeCells(2, pagingSize*i-1, 2, pagingSize*i);
		zcell1.GetSheet(0).MergeCells(3, pagingSize*i-1, 3, pagingSize*i);
		zcell1.GetSheet(0).SetCellStyle(2,  pagingSize*i-1, {
			"background-color" : "#ffff00"
		});
		zcell1.GetSheet(0).SetCellValue(1, pagingSize*i-1,"备注");
		zcell1.GetSheet(0).SetCellValue(3, pagingSize*i-1,"第"+i+"页/共"+size+"页");
		zcell1.GetSheet(0).SetCellValue(4, pagingSize*i-1,"图  号");
		zcell1.GetSheet(0).SetCellValue(5, pagingSize*i-1,"图纸级别");
		zcell1.GetSheet(0).SetCellValue(4, pagingSize*i,projectCode+"D02");
		zcell1.GetSheet(0).SetCellValue(5, pagingSize*i,drawingLevel);
	}
	
for (var i = 0; i <size; i++) {
	zcell1.GetSheet(0).SetCellValue(1,pagingSize*i+1,title[0]);
	zcell1.GetSheet(0).SetCellValue(2,pagingSize*i+1,title[1]);
	zcell1.GetSheet(0).SetCellValue(3,pagingSize*i+1,title[2]);
	zcell1.GetSheet(0).SetCellValue(4,pagingSize*i+1,title[3]);
	zcell1.GetSheet(0).SetCellValue(5,pagingSize*i+1,title[4]);

}
}


function merge(length) {
	for (var i = 1; i <length; i++) { 
		var index = parseInt(i/pagingSize);
		if((i+index)%2==0&&(i+1)%pagingSize!=0&&i%pagingSize!=0)
		{
		zcell1.GetSheet(0).MergeCells(1, i , 1, i  + 1);
		zcell1.GetSheet(0).MergeCells(2, i , 2, i  + 1);
		zcell1.GetSheet(0).MergeCells(3, i , 3, i  + 1);
		zcell1.GetSheet(0).MergeCells(4, i , 4, i  + 1);
		zcell1.GetSheet(0).MergeCells(5, i , 5, i  + 1);
		}
	}

}

function setSelect() {
	$.ajax({
		type : 'post',
		url : path + 'GroundingDevice/getGroundingConfig.action',
		data : {
			'id' : id
	},
		success : function(data) {
			if (!Tools.isEmpty(data.groundNo)) {
				groundNo=data.groundNo;
			}
			if (!Tools.isEmpty(data.dataList)) {
				var dataList=data.dataList;
				for (var i = 0; i <dataList.length-1; i++) {
					zcell1.GetSheet(0).SetCellValue(6,i+2,dataList[i]);
				}		
			}
			
			var selectIndex = new Array();
			var selectClass = new Array();
			var selectArr = new Array();
			var selectDefault = new Array();
			
			var datastr = zcell1.GetSheet(0).GetDataArr();
			for (var i = 1; i <datastr.length; i++) { 
				var index = parseInt(i/pagingSize);
				if((i+index)%2==0&&(i+1)%pagingSize!=0&&i%pagingSize!=0)
				{
				var list = new Array();
				list.push(5);
				list.push(i);	
				selectIndex.push(list);
				selectClass.push("grounding"+i);
				selectArr.push(groundNo);
				selectDefault.push(datastr[i][5]);
				}
			}
			
			multipleGerateSelect(zcell1,0,selectIndex,selectClass,
					selectArr,selectDefault);
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});
	
}

function setStyle() {
	
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for (var i = 1; i <datastr.length; i++) {
		if(datastr[i-1][1]!="塔位里程千米+米"&&datastr[i][1]=="0+000"){
			if(datastr[i-2][1]!="塔位里程千米+米"){
				zcell1.GetSheet(0).SetCellValue(2,i+1,"");
			}
		}
		
		zcell1.GetSheet(0).SetCellReadOnly(1, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(2, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(3, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(4, i, 1);
	}

}

//获取总详情数据
function getGroundingParams(){
	var list = new Array();

	var datastr = zcell1.GetSheet(0).GetDataArr();
	for(var i=0;i<datastr.length;i++){
		var grounding;
		if(!Tools.isEmpty($(".grounding"+(i+1)).children("option:selected").val())){
			grounding=$(".grounding"+(i+1)).children("option:selected").val();
		}else{
			grounding="";
		}
		list.push(grounding)
	}
	data = JSON.stringify(list);
	return data;

}

/* 保存
*/
function saveGrounding() {
	var grounding = getGroundingParams();
	
	var url = path + "/GroundingDevice/saveGrounding.action";
	 $.ajax({
		 type:'post',
		 url:url,
		 data:{
				'data' : grounding,
				'id' : id
			},
		 dataType : 'json',
		 success : function(data) {
				if (data.msg == "success") {
					Tools.tipsMsg("提交成功！");
					} else {
					Tools.tipsMsg("提交失败！");
				}	
			}
	 });
};

function JSONToExcelConvertor() { 
	
	zcell1.GetSheet(0).DeleteCol(6,6);
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
		"width" : "200px"
	});
	zcell1.GetSheet(0).SetCellStyle(3, 1, {
		"width" : "200px"
	});
	zcell1.GetSheet(0).SetCellStyle(4, 1, {
		"width" : "200px"
	});
	zcell1.GetSheet(0).SetCellStyle(5, 1, {
		"width" : "200px"
	});
	
	for (var i = 1; i <= 5; i++) {
		for (var j = 1; j <= len; j++) {
			zcell1.GetSheet(0).SetCellStyle(i, j, {
				"border" : "1px solid black"
			});
		}
	}
	var timestamp = Date.parse(new Date());
	exportExcel("tabl1",timestamp+"接地装置明细");
	
	window.location.reload();
}  
/* 返回
*/
function backUpPage() {	
	location.href = path+ "/GroundingDevice/toGroundingList.action";
};
