function groundingList(){
	// 初始化表格
	Tools.bind(this, this.initTable());
	$("#drl_btnConfig").on("click",this.toGroundingConfig);
	//预加载事件
	$("#grounding_table").delegate(".see","click", this.seeClick);
	//校对
	/*$("#apply-update").on("click",Tools.bind(this,this.updateApply));*/
	/*//删除按钮点击
	$(document).delegate(".delectProject" ,"click", this.confirmDelete);*/
	//查看按钮点击
	//$(document).delegate(".searchProject" ,"click", this.searchProject);
	//修改按钮点击
	$(document).delegate(".updateGrounding" ,"click", this.updateProject);
    //行的点击事件
	$("#grounding_table").delegate("tbody tr", "click",this.clickTr);
	//查看流程
	//$(document).delegate(".searchFlow","click",this.searchFlow);
	
};

groundingList.prototype.confirmDelete=function(){
	var tr = $(this).closest('tr');
	var data = $('#grounding_table').dataTable().fnGetData(tr);
	var id =data.id;
	
	Tools.tipsConfirm("确定要删除吗?",function(){
			$.ajax({
				"type": 'post',	//post防止中文参数乱码
				"url": path+"/Tower/mainInfoDelete.action",
				"data":{id :id},
				"dataType": "json",  
				"success": function(){
					Tools.tipsMsg("删除成功！");
					$('#grounding_table').DataTable().ajax.reload();
				},
				"error": function(e) {
					Tools.tipsMsg("异常！");
				}
			});
	},true);
};

groundingList.prototype.searchProject=function(){/*
	var tr = $(this).closest('tr');
	var data = $('#grounding_table').dataTable().fnGetData(tr);
	var id =data.id;	
	location.href = path
	+ "/Parts/partsDetail.action?id="+id;
*/}

groundingList.prototype.updateProject=function(){
	var tr = $(this).closest('tr');
	var data = $('#grounding_table').dataTable().fnGetData(tr);
	var id =data.id;	
	location.href = path
	+ "/GroundingDevice/groundingDetail.action?id="+id;
}

//行的点击事件
groundingList.prototype.clickTr = function(){
	$(this).addClass('common_checked_tr').siblings().removeClass('common_checked_tr').end();
};

/**
 * 配置点击事件
 */
groundingList.prototype.toGroundingConfig=function(){

	var id = "";
	var trs = $("#grounding_table tbody tr.common_checked_tr");
	if(trs.length>0){
		var tr = trs.eq(0).closest('tr');
		var data = $('#grounding_table').dataTable().fnGetData(tr);
		var projectId = data.id;
		var projectName = data.projectName;
		location.href=path+"/GroundingDevice/toGroundingConfig.action?projectId="+projectId+"&projectName="+projectName;
	}
	else
	{
		Tools.tipsMsg('请选择需要配置的数据!');
	}

}

/**
 * 修改点击事件
 */
groundingList.prototype.updateApply=function(){
	var id = "";
	var trs = $("#grounding_table tbody tr.common_checked_tr");
	if(trs.length>0){
		var tr = trs.eq(0).closest('tr');
		var data = $('#grounding_table').dataTable().fnGetData(tr);
		var id = data.id;
		var state=data.state;
		if(state=="待校核"){
		 location.href=path+"/Tower/towerCheck.action?id="+id;
		}
		else{
			Tools.tipsMsg('请选择待校核的数据!');
		}
	}
	else
	{
		Tools.tipsMsg('请选择需要校核的数据!');
	}
}

/**
 * 初始化表格
 */
groundingList.prototype.initTable = function(){
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
	}, /*{
		"title" : "工程阶段",
		"render" : function(){
			
			return "组配件";

	}
	}, {
		"title" : "阶段状态",
		"data" : "state"
	},*/{
		"title" : "操作",
		"data" : "state",
		"render" : function(data){
		  
			  return '<span class="updateGrounding glyphicon  glyphicon-edit aria-hidden=" true"="" title="修改"></span>';
		  
		}
	}];
	
	$('#grounding_table').DataTable({

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
groundingList.prototype.queryMainInfo = function(data, callback, settings) {
	var url = path+"/GroundingDevice/queryMainInfo.action";
	var successAction = function(data) {
		if(data==null || data=="")
		{
			callback(Tools.nullDataTable());
			return;
		}
		callback(data);	 
	};
	
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
