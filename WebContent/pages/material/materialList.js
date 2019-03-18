function materialList(){
	//初始化表格
	Tools.bind(this, this.initTable());
	//查看按钮点击
	$(document).delegate(".searchProject" ,"click", this.searchProject);
	//行的点击事件
	$("#material_table").delegate("tbody tr", "click",this.clickTr);
		
};

//行的点击事件
materialList.prototype.clickTr = function(){
	$(this).addClass('common_checked_tr').siblings().removeClass('common_checked_tr').end();
};

/**
 * 查看点击事件
 */
materialList.prototype.searchProject=function(){

	var id = "";
	var tr = $(this).closest('tr');
	var data = $('#material_table').dataTable().fnGetData(tr);
	var projectId = data.id;
	var projectName = data.projectName;
	location.href=path+"/material/partsExplain.action?id="+projectId+"&projectName="+projectName;
}

/**
 * 初始化表格
 */
materialList.prototype.initTable = function(){
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
		"title" : "查看",
		"data" : "state",
		"render" : function(data){
		     		  return '<span class="searchProject glyphicon  glyphicon-search aria-hidden="true" title="查看"></span>&nbsp;&nbsp;';
		}
	}];
	
	$('#material_table').DataTable({

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
materialList.prototype.queryMainInfo = function(data, callback, settings) {
	var url = path+"/material/queryMainInfo.action";
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
