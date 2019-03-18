var zcell1;
var param;
var size=0;
// 页面加载时执行
$(document).ready(function() {

	$.ajax({
		type : 'post',
		url : path + 'Tower/getTaData.action',
		data : {
			'id' : projectId,
			'pagingSize' : pagingSize
	},
		success : function(data) {
			var list = data.list[1];
			var iList = data.iList;
			var jList = data.jList;
			if (list!=null) {
				// 创建JSCELL，指明承载容器
				zcell1 = new ZCell(document.getElementById("cellContainer"));
				// 创建表，并指定列，行数
				zcell1.InserSheet(0, 14, list.length);

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
			//initCoverTable();
			var table = document.getElementById("tabl1");
			 var len = table.rows.length; 
			for (var i = 1; i <= 14; i++) {
				for (var j = 1; j <= len; j++) {
					zcell1.GetSheet(0).SetCellStyle(i, j, {
						"border" : "1px solid black"
					});
				}
			}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});

});


// 设置列宽
function setcolw(list) {
	zcell1.GetSheet(0).SetColWidth(1, 70);
	zcell1.GetSheet(0).SetColWidth(2, 70);
	zcell1.GetSheet(0).SetColWidth(4, 70);
	zcell1.GetSheet(0).SetColWidth(5, 70);
	zcell1.GetSheet(0).SetColWidth(6, 70);
	zcell1.GetSheet(0).SetColWidth(7, 70);
	zcell1.GetSheet(0).SetColWidth(9, 70);
	zcell1.GetSheet(0).SetColWidth(10, 70);
	zcell1.GetSheet(0).SetColWidth(14, 180);
}

//设置分页样式
function setpagingStyle(data) {
	var list = data.list[1];
	 size =parseInt(list.length/pagingSize);
	 var title = data.list[0][0];//标题
	for (var i = 1; i <=size; i++) {
		zcell1.GetSheet(0).MergeCells(1, pagingSize*i-1, 1, pagingSize*i);
		zcell1.GetSheet(0).MergeCells(2, pagingSize*i-1, 11, pagingSize*i);
		zcell1.GetSheet(0).MergeCells(12, pagingSize*i-1, 12, pagingSize*i);
		zcell1.GetSheet(0).SetCellStyle(2,  pagingSize*i-1, {
			"background-color" : "#ffff00"
		});
		zcell1.GetSheet(0).SetCellValue(1, pagingSize*i-1,"备注");
		zcell1.GetSheet(0).SetCellValue(12, pagingSize*i-1,"第"+i+"页/共"+size+"页");
		zcell1.GetSheet(0).SetCellValue(13, pagingSize*i-1,"图  号");
		zcell1.GetSheet(0).SetCellValue(14, pagingSize*i-1,"图纸级别");
		zcell1.GetSheet(0).SetCellValue(14, pagingSize*i,drawingLevel);
	}
	
for (var i = 0; i <size; i++) {
	zcell1.GetSheet(0).SetCellValue(1,pagingSize*i+1,title[0]);
	zcell1.GetSheet(0).SetCellValue(2,pagingSize*i+1,title[1]);
	zcell1.GetSheet(0).SetCellValue(3,pagingSize*i+1,title[2]);
	zcell1.GetSheet(0).SetCellValue(4,pagingSize*i+1,title[3]);
	zcell1.GetSheet(0).SetCellValue(5,pagingSize*i+1,title[4]);
	zcell1.GetSheet(0).SetCellValue(6,pagingSize*i+1,title[5]);
	zcell1.GetSheet(0).SetCellValue(7,pagingSize*i+1,title[6]);
	zcell1.GetSheet(0).SetCellValue(8,pagingSize*i+1,title[7]);
	zcell1.GetSheet(0).SetCellValue(9,pagingSize*i+1,title[8]);
	zcell1.GetSheet(0).SetCellValue(10,pagingSize*i+1,title[9]);
	zcell1.GetSheet(0).SetCellValue(11,pagingSize*i+1,title[10]);
	zcell1.GetSheet(0).SetCellValue(12,pagingSize*i+1,title[11]);
	zcell1.GetSheet(0).SetCellValue(13,pagingSize*i+1,title[12]);
	zcell1.GetSheet(0).SetCellValue(14,pagingSize*i+1,title[13]);
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
			zcell1.GetSheet(0).MergeCells(10, parseInt(iList[i][0])*2+num+pageCount, 10, pageSize-2+pageCount);
			zcell1.GetSheet(0).MergeCells(10, pageSize+2+pageCount, 10, parseInt(iList[i][1])*2+num+2+pageCount);
			}
			zcell1.GetSheet(0).SetCellValue(10,parseInt(iList[i][0])*2+num+pageCount,iList[i][2]);
			num = num+3;
			pageSize=pageSize+55;
			continue;
		}
		if(parseInt(iList[i][1])-parseInt(iList[i][0])>1){
			zcell1.GetSheet(0).MergeCells(10, parseInt(iList[i][0])*2+num+pageCount, 10, parseInt(iList[i][1])*2+num-1+pageCount);
		}else{
			zcell1.GetSheet(0).MergeCells(10, parseInt(iList[i][0])*2+num+pageCount, 10, parseInt(iList[i][0])*2+num+1+pageCount);
		}
		zcell1.GetSheet(0).SetCellValue(10,parseInt(iList[i][0])*2+num+pageCount,iList[i][2]);
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
		zcell1.GetSheet(0).MergeCells(8, i , 8, i  + 1);
		
		zcell1.GetSheet(0).MergeCells(11, i , 11, i  + 1);
		zcell1.GetSheet(0).MergeCells(12, i , 12, i + 1);
		}
	}
	
	for (var i = 1; i <length; i++) {
		var index = parseInt(i/pagingSize);
		if((i+index)%2==0&&(i+1)%pagingSize!=0&&i%pagingSize!=0&&(i+3)%pagingSize!=0)
		{
		zcell1.GetSheet(0).MergeCells(5, i+1, 5, i + 2);
		zcell1.GetSheet(0).MergeCells(13, i+1, 13, i + 2);
		zcell1.GetSheet(0).MergeCells(14, i+1, 14, i + 2);
		}
	}
	
}

function setStyle(list) {
	
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for (var i = 1; i <datastr.length; i++) {
		if(datastr[i][0].length>3&&datastr[i][0].substring(0, 2)=="备注"){
			zcell1.GetSheet(0).SetCellValue(1,i+1,datastr[i][0].substring(2));
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
				zcell1.GetSheet(0).SetCellValue(2,i+1,"");
			}
		}
		if(i!=1&&i%pagingSize!=0&&(i-1)%pagingSize!=0&&(i+1)%pagingSize!=0)
		{
		zcell1.GetSheet(0).SetCellStyle(9, i, {
			"background-color" : "#da9694"
		});
		zcell1.GetSheet(0).SetCellStyle(10, i, {
			"background-color" : "#da9694"
		});
		zcell1.GetSheet(0).SetCellStyle(11, i, {
			"background-color" : "#ffff00"
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
		
		
		var linktpye71 = {
	            "code": "object",
	            "object":"<div class='1'></div>"
	        };
	    
		var angle = zcell1.GetSheet(0).GetCellValue(11,i);
		if(!Tools.isEmpty(angle)){
		var drop1 = {
                "code": "dropdown",
                "source":{'001':angle,'002':'见分支示意图'}
            };
         zcell1.GetSheet(0).SetCellType(11, i, drop1);
         if(i!=1&&(i-2)%pagingSize!=0&&!Tools.isEmpty(zcell1.GetSheet(0).GetCellValue(11,i-1))){
       	  zcell1.GetSheet(0).SetCellValue(11,i-1, "001");
        }
		}
     	var connect = zcell1.GetSheet(0).GetCellValue(13,i);
		var drop2 = {
                "code": "dropdown",
                "source":{'':'','不得接头':'不得接头'}
            };
         zcell1.GetSheet(0).SetCellType(13, i, drop2);
         zcell1.GetSheet(0).SetCellValue(13,i, $.trim(connect));
		}	
	}
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for (var i = 1; i <datastr.length; i++) {
		if(i!=1&&i%pagingSize!=0&&(i-1)%pagingSize!=0&&(i+1)%pagingSize!=0&&$.trim(list[i-1][15])!="")
		{
			zcell1.GetSheet(0).SetCellValue(11,i, $.trim(list[i-1][15]));
		}
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
		zcell1.GetSheet(0).SetCellReadOnly(1, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(2, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(3, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(4, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(5, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(6, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(7, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(8, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(9, i, 1);
		zcell1.GetSheet(0).SetCellReadOnly(10, i, 1);
	}
}

/**
* 上传文件
*/
function filingUploadBtn(){

	$('#summary_file_input').click();
};
function filingUpload(){
	var file = $('#summary_file_input').val();
	if(file == ''){
		Tools.tipsMsg('请选择需要上传的文件');
		return;
	}
	var options = {
       url : path + "/upload?processor=nrfile",
       type :'post',
       data : null,
       dataType : "json",
       success : function(data){
      	 if(data.succ){
      		param = data;
   		 	Tools.tipsMsg('上传文件:'+ data.oldName +' 成功');
   	 	}else{
   	 		Tools.tipsMsg('上传文件失败!');
   	 	}
       },
  };
	$("#login_Form").ajaxSubmit(options);
};

/* 初始化封面
*/
function initCoverTable(){

	$.ajax({
		type : 'post',
		url : path + 'Tower/getMainById.action',
		data : {
			'id' : projectId
	},
		success : function(data) {
			if(!Tools.isEmpty(data.code)&&data.code.indexOf("-")>0){
				for (var i = 1; i <=size; i++) {
					zcell1.GetSheet(0).SetCellValue(13, pagingSize*i, data.code.substring(data.code.indexOf("-")+1));
				}	
			}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});
}

/* 导出
*/
function JSONToExcelConvertor() {

	var data = getParams();
	var angle = getAngleParams();
	var connect = getConnectParams();
	var url = path + "/Tower/exportTower.action";
	 $.ajax({
		 type:'post',
		 url:url,
		 data:{
				'data' : data,
				'angle' : angle,
				'connect' : connect,
				'id' : projectId
			},
		 dataType : 'json',
		 success : function(data) {
				if (data.msg == "success") {
					$(".valueobject").html("");
					var table = document.getElementById("tabl1");
					  var len = table.rows.length; 
					    for(var i = 0;i < len;i++){
					        table.rows[i].deleteCell(0);
					    }
					table.deleteRow(0);   
					zcell1.GetSheet(0).SetCellStyle(1, 1, {
						"width" : "120px"
					});
					zcell1.GetSheet(0).SetCellStyle(2, 1, {
						"width" : "90px"
					});
					zcell1.GetSheet(0).SetCellStyle(3, 1, {
						"width" : "100px"
					});
					zcell1.GetSheet(0).SetCellStyle(4, 1, {
						"width" : "90px"
					});
					zcell1.GetSheet(0).SetCellStyle(5, 1, {
						"width" : "90px"
					});
					zcell1.GetSheet(0).SetCellStyle(6, 1, {
						"width" : "90px"
					});
					zcell1.GetSheet(0).SetCellStyle(7, 1, {
						"width" : "90px"
					});
					zcell1.GetSheet(0).SetCellStyle(8, 1, {
						"width" : "90px"
					});
					zcell1.GetSheet(0).SetCellStyle(9, 1, {
						"width" : "90px"
					});
					zcell1.GetSheet(0).SetCellStyle(10, 1, {
						"width" : "90px"
					});
					zcell1.GetSheet(0).SetCellStyle(11, 1, {
						"width" : "120px"
					});
					zcell1.GetSheet(0).SetCellStyle(12, 1, {
						"width" : "120px"
					});
					zcell1.GetSheet(0).SetCellStyle(13, 1, {
						"width" : "120px"
					});
					zcell1.GetSheet(0).SetCellStyle(14, 1, {
						"width" : "380px"
					});
				
					var timestamp = Date.parse(new Date());
					exportExcel("tabl1",timestamp);
					window.location.reload();
				} else {
					Tools.tipsMsg("导出失败！");
				}	
			}
	 });

}  
/* 保存
*/
function saveTower() {
	params = JSON.stringify(param);
	var data = getParams();
	var angle = getAngleParams();
	var connect = getConnectParams();
	var url = path + "/Tower/saveTower.action";
	 $.ajax({
		 type:'post',
		 url:url,
		 data:{
				'data' : data,
				'angle' : angle,
				'connect' : connect,
				'projectId' : projectId,
				'param' : params
			},
		 dataType : 'json',
		 success : function(data) {
				if (data.msg == "success") {
					layer.confirm("提交成功！", {
						btn : "确认"
					}, function() {//按钮执行事件
						location.href = path
						+ "/Tower/projectList.action";
					});							
				} else {
					Tools.tipsMsg("提交失败！");
				}	
			}
	 });
};

//获取详情数据
function getParams(){
	var list = new Array();
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for(var i=1;i<datastr.length;i++){
		var obj = new Object;
		var str10 = datastr[i][10];
		var str11 = datastr[i][11];
		var str12 = datastr[i][12];
		var str13 = datastr[i][13];

		obj = [str11,str12,str13,"",str10];//接地装置型式
		
		list.push(obj);
			
	}

	data = JSON.stringify(list);
	return data;

}

//获取角度变动集合
function getAngleParams(){
	var list = new Array();
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for(var i=1;i<datastr.length;i++){
		var obj = new Object;
		var str10 = datastr[i][10];
		if(str10=='002'){
			obj=datastr[i][0]+datastr[i][1];
			list.push(obj);
		}	
}
	data = JSON.stringify(list);
	return data;

}

//获取接头变动集合
function getConnectParams(){
	var list = new Array();
	var datastr = zcell1.GetSheet(0).GetDataArr();
	for(var i=1;i<datastr.length;i++){
		var obj = new Object;
		var str12 = datastr[i][12];
		if(str12=='不得接头'&&datastr[i-1][12]=='不得接头'&&datastr[i][0]!=datastr[i-1][0]){
			obj=datastr[i][0]+datastr[i][1];
			list.push(obj);
		}	
}
	data = JSON.stringify(list);
	return data;

}

/* 返回
*/
function backUpPage() {	
	location.href = path+ "/Tower/projectList.action";
};