var sortNo;
var fileId;
function towerAdd(attList) {
	this.bindFile(attList);
	  //上传文件(多)
	 $(document).delegate(".replaceFile-img","click",this.filingUploadBtn); 
	 $("#summary_file_input").on("change",Tools.bind(this,this.filingUpload));
	 
	// 提交
	$(document).delegate("#submit","click",Tools.bind(this,this.fileSubmit)); 
}

towerAdd.prototype.fileSpan =  '<span class="text-left display-file"><span>{0}</span></span>';
//新增上传文件
towerAdd.prototype.fileAddAry = new Object();
//删除上传文件
towerAdd.prototype.fileDelAry = new Object();

towerAdd.prototype.fileSubmit = function() {
	var projectName = $('#projectName').val();
	var projectNo = $("#projectNo").val();
	//var deviceType = $("#deviceType").val();
	if(null == projectName || projectName.length <= 0) {
		Tools.tipsMsg("请输入工程名称");
		return false;
	}
	if(null == projectNo || projectNo.length <= 0) {
		Tools.tipsMsg("请输入工程编号");
		return false;
	}

	/*if(null == towerAdd.fileAddAry || towerAdd.fileAddAry.length <= 0) {
		Tools.tipsMsg("请上传文件");
		return false;
	}*/
	$.ajax({
		type : 'post',
		url : path + 'Tower/editMain.action',
		data : {
			'projectName' : projectName,
			'projectNo' : projectNo,
			'id' : id,
			'params' : JSON.stringify(towerAdd.fileAddAry)
		},
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
		},
		error : function() {
			Tools.tipsMsg("提交失败");
		}
	});
}

/**
* 获取页面的参数
*/
towerAdd.prototype.getFilesData = function(e){
	var datas = new Array();	
	var files = $(".applyAdd_file");	
	for(var i = 1;i < files.length +1;i++)
	{   var o = new Object();
		var file = $(".applyAdd_row" + i).find(".applyAdd_file");
		if($(file).html()==""){
			continue;
		}
		o.sorNo =i;
		o.fileName = $(file).html();
		o.newName = $(file).attr("newName");
		o.filePath = $(file).attr("filePath");	
		
		datas.push(o);		
	}
	return datas;
};

/**
* 删除上传文件(多)
*/
towerAdd.prototype.delUploadFile = function(){
	var id = this.id;
	var url = $(this).attr("url");
	var delFileSuccess = function(){
		if(towerAdd.fileAddAry[id] !=null && towerAdd.fileAddAry[id] != "")
		{
			var delSucc = function(data){
				if(data)
				{
					$(this).parent().remove();
					delete towerAdd.fileAddAry[id];
				}
				else
				{
					Tools.tipsMsg('删除失败!');
				}
			};
			
			$.ajax({
				type : 'post',
				url : path + 'file/deleteFileByName.action',
				data : {
					strFileName : url,
				},
				success : Tools.bind(this,delSucc),
				error : function(e){
					Tools.tipsMsg('删除失败!');
				},
			});
		}
		else
		{ 
			var obj = new Object();
			obj.id = id;
			obj.url = url;
			towerAdd.fileDelAry[id] = obj;
			$(this).parent().remove();
		}
	};
	Tools.tipsConfirm("确定要删除附件吗?",Tools.bind(this,delFileSuccess),true);
	if ( this && this.preventDefault ){
		//阻止默认浏览器动作(W3C) 
		this.preventDefault(); 
	}else{
		//IE中阻止函数器默认动作的方式 
		window.event.returnValue = false; 
	}
	return false;
};


var data;

/**
* 上传文件
*/
towerAdd.prototype.filingUploadBtn = function(){
	sortNo=$(this).attr("sortNo");
	fileId=$(this).attr("id");
	$('#summary_file_input').click();
};
towerAdd.prototype.filingUpload = function(){
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
   	 		var $file_div = $(".replaceFile"+sortNo+"");
   	 		var fileSpan = towerAdd.fileSpan.replace('{0}',data.oldName);
   	 		$($file_div).html(sortNo+"."+fileSpan);
   	 		data.sort = sortNo;
   	 		data.id = fileId;
   	 		towerAdd.fileAddAry[data.id] = data;
   		 	Tools.tipsMsg('上传文件:'+ data.oldName +' 成功');
   	 	}else{
   	 		Tools.tipsMsg('上传文件失败!');
   	 	}
       },
  };
	$("#login_Form").ajaxSubmit(options);
};


//绑附件
towerAdd.prototype.bindFile = function(attr){
	var attList = eval("(" + attr + ")");
	$.each(attList,function(index,obj){
			$("#del_summary_file_div").append('<span class="file-href-span fileNoColor replaceFile'+obj.sortNo+'" onclick="downloadFile(this)" filePath='+obj.filePath+'>'+obj.sortNo+'.'+obj.originalFileName+"</span><label title='替换附件'  class='replaceFile-img'  sortNo="+obj.sortNo+" id="+obj.id+"><i class='fa fa-refresh'></i></label>&nbsp;&nbsp;&nbsp;");
	});
	   
};

/**
 * 下载文件
 */
function downloadFile(e){
	var filePath = $(e).attr("filePath"); 
	var name = $(e).text(); 
	if(Tools.isEmpty(filePath))
	{
		return;
	}
	var url = path + "/file/loadServerFile.action?name="+encodeURIComponent(encodeURI(name))+"&filePath="+filePath;
	location.href = url;
};