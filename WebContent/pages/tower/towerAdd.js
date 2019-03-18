
function towerAdd() {
	  //上传文件(多)
	 $("#summary_file_btn").on('click',this.filingUploadBtn);
	 $("#summary_file_input").on("change",Tools.bind(this,this.filingUpload));
	 
	 //删除删除文件(多)
	 $(document).delegate(".delFile-img","click",this.delUploadFile);
	// 上传附件
	 $("#tower_file_btn").on('click',this.uploadFile);
	 $("#tower_file_input").on("change",Tools.bind(this,this.uploadSuer));
	  // 删除附件
	 $(document).delegate(".applyAdd_delFile","click",Tools.bind(this,this.delFile)); 
	 
	// 提交
	$(document).delegate("#submit","click",Tools.bind(this,this.fileSubmit)); 
}

towerAdd.prototype.fileSpan =  '<span class="text-left display-file"><label style="margin-right: 5px; color:black;"><i class="fa fa-file-text"></i></label><span>{0}</span><label title="删除附件" id="{1}" url="{2}" class="delFile-img"><i class="fa fa-trash-o"></i></label></span>';
//新增上传文件
towerAdd.prototype.fileAddAry = new Object();
//删除上传文件
towerAdd.prototype.fileDelAry = new Object();

towerAdd.prototype.fileSubmit = function() {
	var projectName = $('#projectName').val();
	var projectNo = $("#projectNo").val();
	var datas = this.getFilesData();

	if(null == projectName || projectName.length <= 0) {
		Tools.tipsMsg("请输入工程名称");
		return false;
	}
	if(null == projectNo || projectNo.length <= 0) {
		Tools.tipsMsg("请输入工程编号");
		return false;
	}

	if(JSON.stringify(towerAdd.fileAddAry)=="{}") {
		Tools.tipsMsg("请上传TA文件");
		return false;
	}
	if(Tools.isEmpty($(".applyAdd_file").attr("newName"))) {
		Tools.tipsMsg("请上传route文件");
		return false;
	}

	$.ajax({
		type : 'post',
		url : path + 'Tower/addMain.action',
		data : {
			'projectName' : projectName,
			'projectNo' : projectNo,
			'param' : JSON.stringify(datas),
			'params' : JSON.stringify(towerAdd.fileAddAry)
		},
		success : function(data) {
			if (data.msg == "success") {
				layer.confirm("提交成功！", {
					btn : "确认"
				}, function() {//按钮执行事件
					location.href = path
					+ "Tower/projectList.action";
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
towerAdd.prototype.getFilesData = function(){
		var files = $("#tower_file_btn");	
		var o = new Object();
		o.fileName = $(".applyAdd_file").html();
		o.newName = $(".applyAdd_file").attr("newName");
		o.filePath = $(".applyAdd_file").attr("filePath");	
		
	return o;
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

	$('#summary_file_input').click();
};
towerAdd.prototype.filingUpload = function(){
	var file = $('#summary_file_input').val();
	var fileend = file.substring(file.lastIndexOf("."));
	if(fileend!=".TA"){
		 Tools.tipsMsg("请选择.TA类型的文件!");
        return;
    }
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
   	 		var $file_div = $("#del_summary_file_div");
   	 		var fileSpan = towerAdd.fileSpan.replace('{0}',data.oldName).replace('{1}',data.id).replace('{2}',data.url);
   	 		$($file_div).append(fileSpan);
   	 		data.sort = Object.keys(towerAdd.fileAddAry).length+1;
   	 		towerAdd.fileAddAry[data.id] = data;
   		 	Tools.tipsMsg('上传文件:'+ data.oldName +' 成功');
   	 	}else{
   	 		Tools.tipsMsg('上传文件失败!');
   	 	}
       },
  };
	$("#login_Form").ajaxSubmit(options);
};

/**
 * 上传附件
 */
towerAdd.prototype.uploadFile = function(){
	$('#tower_file_input').click();
	
};

/**
 * 上传附件
 */
towerAdd.prototype.uploadSuer = function(){
	var file = $('#tower_file_input').val();
	var fileend = file.substring(file.lastIndexOf("."));
	if(fileend!=".xls"){
		 Tools.tipsMsg("请选择.xls类型的文件!");
        return;
    }
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
    	 		var btn = $("#tower_file_btn");
    	 		/*var label = $("#tower_file_input").prev();
    	 		$(label).html('<i class="fa fa-file-text"></i>');*/
    	 		$(".applyAdd_file").html(data.oldName);
    	 		$(".applyAdd_file").attr("filePath",data.url);
    	 		$(".applyAdd_file").attr("newName",data.newName);
    	 		$(".applyAdd_file").after("<label title='删除附件' class='applyAdd_delFile'><i class='fa fa-trash-o'></i></label>");
    	 		$(".tower_file_btn").hide();
    		 	Tools.tipsMsg('上传文件:'+ data.oldName +' 成功');
    	 	}else{
    	 		Tools.tipsMsg('上传文件失败,服务器端发生异常!');
    	 	}
         },
    };
	$("#route_Form").ajaxSubmit(options);
};

/**
 * 删除附件
 */
towerAdd.prototype.delFile = function(){
	
	var delFileSuccess = function(){
	
		var delSucc = function(data){
			if(data)
			{
				$(".applyAdd_file").html("");
		
				$(".applyAdd_file").attr("filePath","");
				$(".applyAdd_file").attr("newName","");
				$("tower_file_btn").show();
				$(".applyAdd_delFile").remove();
				// 如果提交后,再进行删除需要删除附件表中数据
				Tools.tipsMsg('删除成功!');
			}else{
				Tools.tipsMsg('删除失败!');
			}
		};
		
		$.ajax({
			type : 'post',
			url : path + '/file/deleteFileByName.action',
			data : {
				strFileName : $(".applyAdd_file").attr("filePath"),
			},
			success : delSucc
		});
	};
	Tools.tipsConfirm("确定要删除附件吗?",delFileSuccess,false);
};