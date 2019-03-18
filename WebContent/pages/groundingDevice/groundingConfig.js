/*目录*/
var Zcell2 = null;
/*已激活的标签页的名称*/
var ActiveTab = "接地装置配置";
function groundingConfig() {
	//初始化配置表格
	this.initGroundTable();
	// 初始化表格
	this.initCellTableData();
	// 新增行
	$(document).delegate(".addTr","click",this.addTableTr);
	// 删除行
	$(document).delegate(".delTr","click",this.delTableTr);
	//上传按钮
	$(document).delegate(".uploadDrawing","click",Tools.bind(this,this.upload));
	$(document).delegate(".upload_input","change",Tools.bind(this,this.uploadSuer));
    // 删除附件
    $(document).delegate(".deleteFile","click",Tools.bind(this,this.deleteFile));
	//下载附件
 	$(document).delegate(".grounding_file", "click",Tools.bind(this,this.downloadFile));
	//	保存按钮
	$('#grounding_savebtn').on("click",function() {
		saveGroundingConfig();
	})
	//返回按钮
	$('#returnBtn').click(function() {
		history.back();
	})
	//$("#returnBtn").on("click",this.backUpPage);
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		// 获取已激活的标签页的名称
		ActiveTab = $(e.target).text(); 
	});
}

/**
 * 返回上一页
 */
var backupPage = function(){
	alert();
}

/**
 * 初始化配置表格
 */
groundingConfig.prototype.initGroundTable = function(){
	var data = groundingConfigList;
		
	var tr = "";
	if(!Tools.isEmpty(data)){
		for(var i=0;i<data.length;i++){
				var groundingConfigArr = data[i];
			
				var attachmentArr = attachmentList[i];
				var resistivity = groundingConfigArr[2]+"~"+groundingConfigArr[3];
				if(!Tools.isEmpty(attachmentArr)){
					tr+= '<tr id="">'+
				     '<td width=""><label title="删除行" class="delTr"><i class="fa fa-minus"></i></label>&nbsp;&nbsp;'+
				     '<label title="新增行" class="addTr"><i class="fa fa-plus"></i></label></td>'+
					 '<td width=""><input class="input_control" value="'+groundingConfigArr[1]+'"/></td>'+
					 '<td width=""><input class="input_control" value="'+resistivity+'"/></td>'+
					 '<td width="200px" class="file_td">'+
					    '<form id="route_Form" enctype="multipart/form-data" onsubmit="return false;">'+
					    '<label style="margin-right: 5px;"><i class="fa fa-file-text"></i></label>' +
						'<a class="text-left grounding_file" filepath="'+attachmentArr[3]+'" newname="'+attachmentArr[2]+'">'+attachmentArr[1]+'</a>' +
						'<label title="删除附件" class="deleteFile"><i class="fa fa-trash-o"></i></label>'+
						'<input name="upload" id="upload_input" class="upload_input" type="file" style="display: none;">'+
						'<button class="btn btn-info uploadDrawing" id="upload_btn" type="button" style="display: none;">'+
							'<i class="fa fa-upload"></i>&nbsp;上传'+
						'</button></form>'+
					 '</tr>';
				}else{
					tr+= '<tr id="">'+
				     '<td width=""><label title="删除行" class="delTr"><i class="fa fa-minus"></i></label>&nbsp;&nbsp;'+
				     '<label title="新增行" class="addTr"><i class="fa fa-plus"></i></label></td>'+
				     '<td width=""><input class="input_control" value="'+groundingConfigArr[1]+'"/></td>'+
					 '<td width=""><input class="input_control" value="'+resistivity+'"/></td>'+
					 '<td width="200px" class="file_td">'+
					    '<form id="route_Form" enctype="multipart/form-data" onsubmit="return false;">'+
					    '<label style="margin-right: 5px;"></label>' +
						'<a class="text-left grounding_file"></a>' +
						'<input name="upload" id="upload_input" class="upload_input" type="file" style="display: none;">'+
						'<button class="btn btn-info uploadDrawing" id="upload_btn" type="button">'+
							'<i class="fa fa-upload"></i>&nbsp;上传'+
						'</button></form>'+
					 '</tr>';
				}
			    
		}
	}else{
		tr+= '<tr id="">'+
		     '<td width=""><label title="删除行" class="delTr"><i class="fa fa-minus"></i></label>&nbsp;&nbsp;'+
		     '<label title="新增行" class="addTr"><i class="fa fa-plus"></i></label></td>'+
			 '<td width=""><input class="input_control" value="T3"/></td>'+
			 '<td width=""><input class="input_control" value="0~300"/></td>'+
			 '<td width="200px" class="file_td">'+
			    '<form id="route_Form" enctype="multipart/form-data" onsubmit="return false;">'+
			    '<label style="margin-right: 5px;"></label>' +
				'<a class="text-left grounding_file"></a>' +
				'<input name="upload" id="upload_input" class="upload_input" type="file" style="display: none;">'+
				'<button class="btn btn-info uploadDrawing" id="upload_btn" type="button">'+
					'<i class="fa fa-upload"></i>&nbsp;上传'+
				'</button></form>'+
			 '</tr>';
		tr+= '<tr id="">'+
			 '<td width=""><label title="删除行" class="delTr"><i class="fa fa-minus"></i></label>&nbsp;&nbsp;'+
	         '<label title="新增行" class="addTr"><i class="fa fa-plus"></i></label></td>'+
			 '<td width=""><input class="input_control" value="T6"/></td>'+
			 '<td width=""><input class="input_control" value="300~600"/></td>'+
			 '<td width="200px" class="file_td">'+
			    '<form id="route_Form" enctype="multipart/form-data" onsubmit="return false;">'+
			    '<label style="margin-right: 5px;"></label>' +
				'<a class="text-left grounding_file"></a>' +
				'<input name="upload" id="upload_input" class="upload_input" type="file" style="display: none;">'+
				'<button class="btn btn-info uploadDrawing" id="upload_btn" type="button">'+
					'<i class="fa fa-upload"></i>&nbsp;上传'+
				'</button></form>'+
			 '</tr>';
		tr+= '<tr id="">'+
		     '<td width=""><label title="删除行" class="delTr"><i class="fa fa-minus"></i></label>&nbsp;&nbsp;'+
	         '<label title="新增行" class="addTr"><i class="fa fa-plus"></i></label></td>'+
	         '<td width=""><input class="input_control" value="T10"/></td>'+
			 '<td width=""><input class="input_control" value="600~1000"/></td>'+
			 '<td width="200px" class="file_td">'+
			    '<form id="route_Form" enctype="multipart/form-data" onsubmit="return false;">'+
			    '<label style="margin-right: 5px;"></label>' +
				'<a class="text-left grounding_file"></a>' +
				'<input name="upload" id="upload_input" class=" upload_input" type="file" style="display: none;">'+
				'<button class="btn btn-info uploadDrawing" id="upload_btn" type="button">'+
					'<i class="fa fa-upload"></i>&nbsp;上传'+
				'</button></form>'+
			 '</tr>';
	}
	$("#groundTable").append(tr);
	/*$("#groundTable").children(0).html();*/
}

/**
 * 新增行   
 */
groundingConfig.prototype.addTableTr = function(e){
	 var thiz = e.currentTarget; 
	 var tr = $(thiz).closest('tr');
     var addtr=  '<tr id="">'+
			     '<td width=""><label title="删除行" class="delTr"><i class="fa fa-minus"></i></label>&nbsp;&nbsp;'+
			     '<label title="新增行" class="addTr"><i class="fa fa-plus"></i></label></td>'+
			     '<td width=""><input class="input_control" value=""/></td>'+
				 '<td width=""><input class="input_control" value=""/></td>'+
				 '<td width="200px" class="file_td">'+
				    '<form id="route_Form" enctype="multipart/form-data" onsubmit="return false;">'+
				    '<label style="margin-right: 5px;"></label>' +
					'<a class="text-left grounding_file"></a>' +
					'<input name="upload" id="upload_input" class="upload_input" type="file" style="display: none;">'+
					'<button class="btn btn-info uploadDrawing" id="upload_btn" type="button">'+
						'<i class="fa fa-upload"></i>&nbsp;上传'+
					'</button></form>'+
				 '</tr>';
     tr.after(addtr);
}

/**
 * 删除行
 */
groundingConfig.prototype.delTableTr = function(e){
	var thiz = e.currentTarget;
	Tools.tipsConfirm("确定要删除吗?",function(){
	var thisTr = $(thiz).closest("tr");
	$(thisTr).remove();
	Tools.tipsMsg("删除成功！");
	},false);
}

/**
 * 保存事件
 */
var saveGroundingConfig = function(){
	// 遍历所有的table数据	
	var dataList=[];
	$('#groundTable').find('tbody').each(function (){
//		  $(this).find('tr').each(function (){
		var ntr = $(this).find('tr');
		for(var i=0;i<ntr.length;i++){

			var tds=ntr.eq(i).find('td');
    		var resistivity = tds.eq(2).children('input').val();
    		var resistivityArr = resistivity.split("~");
     		
    		var obj = {
    			"no" : tds.eq(1).children('input').val(), //代号
    			"resistivityMin" : resistivityArr[0], //土壤电阻率最小值
    			"resistivityMax" : resistivityArr[1], //土壤电阻率最大值
    			"file" : tds.eq(3).children().find('a').html(), //文件名称
    			"originalFileName":tds.eq(3).children().find('a').html(), //文件原名称,
    			"newFileName":tds.eq(3).children().find('a').attr('newname'),//文件新(时间)名称
    			"filePath":tds.eq(3).children().find('a').attr('filepath'),//文件路径
    			"projectId" : projectId, //工程id
    			"serialNum": i+1+""
    		}
    		
    		dataList.push(obj);
		}
        		      		
 //       }); 
		  
	});
	
	var url = basePath+"/GroundingDevice/save.action";
	$.ajax({
        type: "post",//请求方式
        url: url,
        data:{
        	dataList:JSON.stringify(dataList),
        	projectId:projectId
        },
        dataType: "json",
　　　         success: function(data){
           if( !Tools.isEmpty(data) ){
        	   alert("保存成功");
        	   window.location.reload();
           }else{
        	   alert("保存失败");
           }
        },
        error:function(){
        	layer.msg("服务器出错");
        }
  });
}

/**
 * 点击上传按钮打开文件选择框
 */
groundingConfig.prototype.upload = function(e){
	var thiz = e.currentTarget;
	var prev = $(thiz).prev();
	$(prev).click();
}

/**
 * 上传图纸
 */
groundingConfig.prototype.uploadSuer = function(e){
	var thiz = e.currentTarget;
	var file = $(thiz).val();
	if(file == ''){
		Tools.tipsMsg('请选择需要上传的文件');
		return;
	}
	var options = {   
         url : basePath + "/upload?processor=nrfile",
         type :'post',
         data : null,
         dataType : "json",
         success : function(data){
        	// 清空文件
    		$(thiz).val("");
    	 	if(data.succ){
    	 		var fileInfo = $(thiz).closest("td").find(".grounding_file");
    	 		var btn = $(thiz).closest("td").find(".uploadDrawing");
    	 		var label = $(fileInfo).prev();
    	 		$(label).html('<i class="fa fa-file-text"></i>');
    	 		$(fileInfo).html(data.oldName);
    	 		$(fileInfo).attr("filePath",data.url);
    	 		$(fileInfo).attr("newName",data.newName);
    	 		$(fileInfo).after("<label title='删除附件' class='deleteFile'><i class='fa fa-trash-o'></i></label>");
    	 		$(btn).hide();
    		 	Tools.tipsMsg('上传文件:'+ data.oldName +' 成功');
    	 	}else{
    	 		Tools.tipsMsg('上传文件失败,服务器端发生异常!');
    	 	}
         },
    };
	var from = thiz.closest("form");
    $(from).ajaxSubmit(options);
}


/**
 * 删除附件
 */
groundingConfig.prototype.deleteFile = function(e){
	var thiz = e.currentTarget;
	var delFileSuccess = function(){
		var file = $(thiz).prev();
		var icon = $(file).prev();
		
		var delSucc = function(data){
			if(data)
			{
				$(icon).html("");
				$(file).html("");
				$(file).attr("filePath","");
				$(file).attr("newName","");
				$(thiz).closest(".file_td").find("button").show();
				$(thiz).remove();
				// 如果提交后,再进行删除需要删除附件表中数据
				Tools.tipsMsg('删除成功!');
			}else{
				Tools.tipsMsg('删除失败!');
			}
		};
		
		$.ajax({
			type : 'post',
			url : basePath + '/file/deleteFileByName.action',
			data : {
				strFileName : $(file).attr("filePath"),
			},
			success : delSucc
		});
	};
	Tools.tipsConfirm("附件删除后将不可恢复,确定要删除附件吗?",delFileSuccess,false);
};

/**
 * 下载附件
 */
groundingConfig.prototype.downloadFile = function(e){
	var thiz = e.currentTarget;
	var filePath = $(thiz).attr("filePath");
	var name = $(thiz).text();
	
	if(Tools.isEmpty(filePath))
	{
		return;
	}
	var url = basePath + "/file/loadServerFile.action?name="+encodeURIComponent(encodeURI(name))+"&filePath="+filePath;
	location.href = url;
};

//加载目录数据
groundingConfig.prototype.paddingData = function(type,cxxz) {
	//  目录20串
	if (!Tools.isEmpty(Zcell2)) {
		for (var i = 0; i < indexDateList.length; i++) {
			Zcell2.GetSheet(0).SetCellValue(3,12+i,indexDateList[i][0]);// 图号
			Zcell2.GetSheet(0).SetCellValue(9,12+i,indexDateList[i][1]);// 图名
			Zcell2.GetSheet(0).SetCellValue(19,12+i,indexDateList[i][2]);
			Zcell2.GetSheet(0).SetCellValue(20,12+i,indexDateList[i][3]);
		}
	}
}

// 清空数据
var clearTableData = function (){
	
	Zcell2 = null;
	$("#indexContainer").html("");
	groundingConfig.initCellTableData();
	var val = $("#mainInfo").val();
	$(":input").val("");
	$(":selected").val("");
	$("#mainInfo").val(val);
	layer.closeAll();
}

groundingConfig.prototype.initCellTableData = function(){
	indexCellTable();
}

/**
 * 目录
 */
var indexCellTable = function(){
	// 创建JSCELL，指明承载容器
	Zcell2 = new ZCell(document.getElementById("indexContainer"));
	// 创建表，并指定列，行数
	Zcell2.InserSheet(0, 26, 36);
	// 加载数据
	Zcell2.GetSheet(0).LoadArrData([]);
	// 设置列宽
	for (var i = 1; i <= 26; i++) {
		if (i==1) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(25));
		}else if (i>=3&&i<=8) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(9));
		}else if (i>=9&&i<=18) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(7.5));
		}else if (i==2||i==19) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(10));
		}else if (i>=20&&i<=25) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(40)/6);
		}else if (i==26) {
			Zcell2.GetSheet(0).SetColWidth(i, UnitConversion.mmConversionPx(5));
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
		}else if (i==10) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(4));
		}else if (i==11) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(11));
		}else if (i==35) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(16));
		}else if (i==36) {
			Zcell2.GetSheet(0).SetRowHeight(i, UnitConversion.mmConversionPx(5.25));
		}
	}
	//合并单元格
	Zcell2.GetSheet(0).MergeCells(3,4,8,4);
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
	Zcell2.GetSheet(0).MergeCells(3,9,8,9);
	Zcell2.GetSheet(0).MergeCells(10,4,19,4);
	Zcell2.GetSheet(0).MergeCells(10,6,11,6);
	Zcell2.GetSheet(0).MergeCells(10,7,11,7);
	Zcell2.GetSheet(0).MergeCells(10,8,11,8);
	Zcell2.GetSheet(0).MergeCells(10,9,11,9);
	Zcell2.GetSheet(0).MergeCells(12,8,15,8);
	Zcell2.GetSheet(0).MergeCells(12,9,15,9);
	Zcell2.GetSheet(0).MergeCells(12,6,24,6);
	Zcell2.GetSheet(0).MergeCells(21,8,24,8);
	Zcell2.GetSheet(0).MergeCells(21,9,24,9);
	Zcell2.GetSheet(0).MergeCells(19,8,20,8);
	Zcell2.GetSheet(0).MergeCells(19,9,20,9);
	Zcell2.GetSheet(0).MergeCells(21,4,22,4);
	Zcell2.GetSheet(0).MergeCells(23,4,24,4);
	for (var i = 11; i < 36; i++) {
		Zcell2.GetSheet(0).MergeCells(3,i,8,i);
		Zcell2.GetSheet(0).MergeCells(9,i,18,i);
		Zcell2.GetSheet(0).MergeCells(20,i,25,i);
	}
	Zcell2.GetSheet(0).MergeCells(2,2,18,3);
	//	样式
	for (var i = 11; i < 36; i++) {
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
			Zcell2.GetSheet(0).SetCellStyle(i+1, 10, {
				"border-bottom" : UnitConversion.mmConversionPx(1) + "px solid black",
			});
		}
	}
	setCellStyle(Zcell2,0,
			[[10,4],[21,4],[10,4],[10, 5],[15, 5],[19,5],[23,5],[12,6],[12,7],[14,7],[19,7],[23,7],
				[12,8],[21,8],[12,9],[21,9]],
			{"border-bottom" : "1px solid black","font-size" : "12px"});
	setCellStyle(Zcell2,0,
			[[20,4],[23,4],[20,11],[24,5],[22,7]],
			{"font-size" : "12px"});
	// 单元格赋值
	Zcell2.GetSheet(0).SetCellType(3,5,{
        "code": "object",
        "object":"<div id= 'jcjsh'>341-S1325S-D0103</div>"
    })
    
    var projectName = "安徽阜阳阜三-白果220kV线路";
	
	setCellValue(Zcell2,0,
			[[3,4],[20,2],[23,2],[3,9],[10,4],[20,4],[21,4],[23,4],[10,5],
				[11,5],[14,5],[15,5],[16,5],[18,5],[19,5],[20,5],[22,5],[23,5],[24,5],
					[10,6],[12,6],[10,7],[12,7],[13,7],[14,7],[15,7],[18,7],[19,7],[20,7],[22,7],[23,7],[24,7],
						[10,8],[12,8],[19,8],[21,8],[10,9],[12,9],[19,9],[21,9]],
				["  卷  册  检  索  号","第 1 页","共 2 页",getCurrentDate(3),projectName,
					"工程","施工图","设计阶段","接地","部分","第","3","卷","第","/","册","第","/","分册",
						"卷册名称","绝缘子金具串及组配件施工图","图   纸","","张","/","本","说明","/","本","清册","/","本",
							"批准:","","校核:","","审核:","","设计:",""]
			);
	
	Zcell2.GetSheet(0).SetCellValue(2,11,"序号");
	Zcell2.GetSheet(0).SetCellType(3,11,{
        "code": "object",
        "object":"图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号"
    });
	Zcell2.GetSheet(0).SetCellType(9,11,{
        "code": "object",
        "object":"图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
    });
	Zcell2.GetSheet(0).SetCellValue(19,11,"张数");
	Zcell2.GetSheet(0).SetCellType(20, 11,  {
        "code": "object",
        "object":"套用原工程名称及<br>卷册检索号、图号"
    });
	Zcell2.GetSheet(0).SetCellType(2, 35,  {
		"code": "object",
		"object":"备注"
	});
	for (var i = 1; i < 24; i++) {
		Zcell2.GetSheet(0).SetCellValue(2,i+11,i);
	}
	// 隐藏单元格
//	$(".rowlab").hide();
	//背景图片
	Zcell2.GetSheet(0).SetCellType(2, 2,  {
		"code": "object",
		"object":"<img src='"+basePath+"resource/images/minPicIndex.png' width='"+
		UnitConversion.mmConversionPx(127.8)+"' height='"+
		UnitConversion.mmConversionPx(11)+"'/>"
	});
}