function projectList(){
	// 初始化表格
	Tools.bind(this, this.initTable());
	
	$("#drl_btnNew").on("click",this.newFile);

	//预加载事件
	$("#projectApply_table").delegate(".see","click", this.seeClick);
	
	//查看按钮点击
	$(document).delegate(".searchProject" ,"click", this.searchProject);

    //行的点击事件
	$("#projectApply_table").delegate("tbody tr", "click",this.clickTr);
	
	
};

projectList.prototype.searchProject=function(){
	var tr = $(this).closest('tr');
	var data = $('#projectApply_table').dataTable().fnGetData(tr);
	var id =data.id;	
	location.href = path
	+ "/TowerNew/towerDetail.action?id="+id;
}

//行的点击事件
projectList.prototype.clickTr = function(){
	$(this).addClass('common_checked_tr').siblings().removeClass('common_checked_tr').end();
};

/**
 * 新建点击事件
 */
projectList.prototype.newFile=function(){
	location.href=path+"/TowerNew/towerAdd.action";
}

/**
 * 初始化表格
 */
projectList.prototype.initTable = function(){
	var colum = [{
		"title" : "id",
		"visible":false,
		"data" : "id"
	},{
		"title" : "序号",
		"data" : "index"
	}, {
		"title" : "工程编号",
		"data" : "projectCode"
	}, {
		"title" : "工程名称",
		"data" : "projectName"
	}, {
		"title" : "创建人",
		"data" : "designUnit"
	}, {
		"title" : "创建时间",
		"data" : "designDate"
	}, {
		"title" : "工程阶段",
		"data" : "stage"
	}, {
		"title" : "阶段状态",
		"data" : "state",
		"render":function(data){
    		if(data=="校核未通过"){
    			return "<span class='font-color-refuse'>"+data+"</span>"; 
    		}
    		if(data=="校核已通过"){
    			return "<span class='font-color-agree'>"+data+"</span>"; 
    		}
    		else{
    			return "<span>"+data+"</span>"; 
    		}
	 }
	},{
		"title" : "操作",
		"data" : "state",
		"render" : function(data){
			if(data=="校核已通过"){
				return '<span class="delectProject glyphicon glyphicon-remove-circle" aria-hidden="true" title="删除"></span>&nbsp;&nbsp;'
				+'<span class="searchProject glyphicon  glyphicon-search aria-hidden="true" title="查看"></span>&nbsp;&nbsp;';
			}else{
				return '<span class="delectProject glyphicon glyphicon-remove-circle" aria-hidden="true" title="删除"></span>&nbsp;&nbsp;'
				+'<span class="searchProject glyphicon  glyphicon-search aria-hidden="true" title="查看"></span>&nbsp;&nbsp;'
				+'<span class="updateProject glyphicon  glyphicon-edit aria-hidden="true" title="修改"></span>';
			}
		}
	}];
	
	$('#projectApply_table').DataTable({

		"bDestroy" : true,// 刷新数据
		"language" : dataTableLang,// 语言
		"dom" : "t" + "<'row'<'col-sm-6'i><'col-sm-6'p>>",
		"autoWidth" : false,// 自适应宽度
		"paginate" : true,
		"bSort" : false,// 排序?
		"bProcessing" : true,
		"paging" : true,// 是否分页
		"bServerSide" : true,// 服务器端分页
		"bInfo" : true,// 页脚信息
		"pageLength" : 15,// 每页显示的条数
		"columns" : colum,// 对应列
		"ajax" : Tools.bind(this, this.queryMainInfo)
	});
};

/**
 * 数据查询Ajax
 **/
projectList.prototype.queryMainInfo = function(data, callback, settings) {
	var url = path+"/TowerNew/queryMainInfo.action";
	var successAction = function(data) {
		if(data==null || data=="")
		{
			callback(Tools.nullDataTable());
			return;
		}
		callback(data);	 
	};
	
	//工程id
	//data["projectId"]=projectId;
	
	$.ajax({
		"type": "post",	//post防止中文参数乱码
		"url": url,
		"data":data,
		"dataType": "json",  
		"success": Tools.bind(this,successAction),
		"error": function(e) {
			console.info(e);
		}
	});
};