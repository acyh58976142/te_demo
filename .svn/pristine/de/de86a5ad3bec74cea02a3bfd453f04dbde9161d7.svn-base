/**
 * 菜单管理
 * @returns jianghengchao
 */
function menuList(){
	//初始化数据
	this.menuTable();
	//初始化上级功能
	this.querysuperiormenu();
	//检索
	$("#searchMenus").on("click",this.searchMenus);
	//点击新增
	$("#btn_addModel").on("click",this.btn_addModel);
	//点击修改
	$("#menuList_table").delegate("#btn_updateModel", "click",this.btn_updateModels);
	//点击菜单图标
	$("#func_icon").on("click",this.selectFunc_icon);
	//点击提交
	$("#menuMAnageSaves").on("click",this.menuMAnageSaves);
	//点击重置
	$("#menuMAnageReset").on("click",function(){
		//清空模态窗数据
		menuList.menuModNULL();
	});
	
	//点击删除
	$("#menuList_table").delegate("#btn_deleteModel", "click",this.btn_deleteModels);
	//点击角色分配
	$("#menuList_table").delegate("#btn_sysRoleInfo", "click",this.updateRole);
	
	$("#func_type").change(function(){
		var func_type = $("#func_type").val();//功能类型
		if(func_type==1){//文件夹
			$("#url").attr("disabled",true);//URL地址
			$("#func_level").val("1");//级别
			$("#func_level").attr("disabled",true);//级别
			$("#parent_func").attr("disabled",true);//上级功能
			$("#parent_func").val("");
		}else{//URL或者其他
			$("#url").attr("disabled",false);//URL地址
			$("#func_level").val("2");//级别
			$("#func_level").attr("disabled",true);//级别
			$("#parent_func").attr("disabled",false);//上级功能
		}
	});
	
	
	
	//角色 弹框  保存按钮
	$(document).delegate("#submitRole_btn","click",function(){
		var zTree = $.fn.zTree.getZTreeObj("menuZtree");
		if(null == zTree || undefined == zTree || '' == zTree){
			Tools.tipsMsg("页面初始化错误，请刷新页面");
			return false;
		}else{
			menuList.saveRoleData(zTree);
		}
	});
	//选择角色分配input
	/*$(document).delegate("#addJSzTree" ,"click", function(){
		//加载树
		menuList.addzTree();
	});*/
	
}
//操作状态0添加 1修改
var menu_state = '';
//主键ID
var func_id_code = '';
//排序
var sort_no_code = '';

/************树开始*****************************************/
//显示树
menuList.prototype.showZtreeModel = function() {
	$("#treeDemos").attr("style", "display:block;width:250px;margin-left:110px;");
	$("#sysRoleInfoModel").off("mousedown");
	$("#sysRoleInfoModel").bind("mousedown", menuList.onBodyDown);
}
//隐藏树
menuList.prototype.onBodyDown = function(event) {
	if (!( event.target.id == "treeDemos"
			|| event.target.id == "addJSzTree" || (event.target.id
			.indexOf('treeDemos')) * 1 > -1)) {
		$("#treeDemos").attr("style", "display:none;");
	}
}

//加载ztree
menuList.prototype.addzTree = function() {
	menuList.locadSixZtree("");//清空树数据
	$.ajax({
		type : 'post',
		url : path + '/menuManage/QuerySysRoleInfo.action',
		data : null,
		success : function(data) {
			//行政区划树
			console.log(data);
			//设置数据
			initData = data;
			menuList.locadSixZtree(data);
		}
	});
}

//加载六大项ztree
menuList.prototype.locadSixZtree = function(data) {
	var setting = {
		check : {
			enable : true,
			autoCheckTrigger : true
		},
		view : {
			dblClickExpand : false
		},
		data : {
			simpleData : {
				enable : true
			}
		},
		callback : {
			onCheck : menuList.onChecks
		}
	};
	$.fn.zTree.init($("#treeDemos"), setting, data.list);
	//显示树
	menuList.showZtreeModel();
}

//六大项选择效果
menuList.prototype.onChecks = function(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemos");
	var nodes = zTree.getCheckedNodes(true);
	var strName = "";
	var strCode = "";
	for (var i=0, l=nodes.length; i<l; i++) {
		strName += nodes[i].name + ",";
		strCode += nodes[i].id + ",";
	}
	if (strName.length > 0) {
		strName = strName.substring(0, strName.length - 1);
		strCode = strCode.substring(0, strCode.length - 1);
		$("#addJSzTree").val(strName);
		$("#addJSzTree").attr("data-code", strCode);
	}else{
		$("#addJSzTree").val("");
		$("#addJSzTree").attr("data-code", "");
	}
}

/*******************树结束************************************/

/**
 * 选中图标点击事件
 * @returns
 */
function setIcon(data){
	$("#func_icon").val(data);
	$('#menu_addMenu_seleceIconModal').modal('hide');
	//选中图标的时候再去验证一次
	$("div.error").remove();
	var isSuccess = menuList.formValidate().form();
	if(!isSuccess){return;}
}
/**
 * 点击新增
 */
menuList.prototype.btn_addModel = function(){
	$("#webli").attr("class","active");
	$("#appli").attr("class","");
	$("#appli").show();
	$("#webli").show();
	$("#appHome").show();
	$("#webHome").show();
	$("#appHome").attr("class","tab-pane fade");
	$("#appHome").attr("style","display","none");
	//$("#webHome").attr("style","display","none");
	//$("#webHome").attr("class","tab-pane fade");
	
	//模态窗显示
	$('#menuManageModal').modal('show');
	$('#webMyModalLabel').html("添加菜单信息");
	$('#appMyModalLabel').html("添加菜单信息");
	
	//清空模态窗数据
	menuList.menuModNULL();
	//设置操作状态为添加
	menu_state=0;
}
/**
 * 点击修改
 */
menuList.prototype.btn_updateModels = function(){
	//得到点击行数据
	var tr = $(this).closest('tr');
	var detailObj = $('#menuList_table').dataTable().fnGetData(tr);//获取表格点击行的数据
	func_id_code = detailObj.func_id;  //监测站编号

	if(detailObj.isPhone==1){//web端
		$("#webli").attr("class","active");
		$("#appli").attr("class","");
		$("#appli").hide();
		$("#appHome").hide();
		$("#webli").show();
		$("#webHome").show();
		$("#webHome").attr("class","");
		
		$('#isPhone').val(1);//web
	}else if(detailObj.isPhone==2){//手机端
		$("#appli").attr("class","active");
		$("#webli").attr("class","");
		$("#webli").hide();
		$("#webHome").hide();
		$("#appli").show();
		$("#appHome").show();
		$("#appHome").attr("class","");
		
		$('#isPhone').val(2);//app
	}
	
	//模态窗显示
	$('#menuManageModal').modal('show');
	$('#webMyModalLabel').html("修改菜单信息");
	$('#appMyModalLabel').html("修改菜单信息");
	//清空模态窗数据
	menuList.menuModNULL();
	//修改查询
	menuList.updateQueryMenu();

	
}
/**
 * 点击删除
 */
menuList.prototype.btn_deleteModels = function(){
	//得到点击行数据
	var tr = $(this).closest('tr');
	var detailObj = $('#menuList_table').dataTable().fnGetData(tr);//获取表格点击行的数据
	func_id_code = detailObj.func_id;  //主键ID
	layer.confirm("是否确认删除？", {
		btn : [ '确认', '取消' ]
	}, function() {// 第一个按钮执行事件
		$.ajax({
			type : 'post',
			url : path + '/menuManage/deleteMenuEntity.action',
			data : {
				"func_id" : func_id_code
			},
			success : function(data) {
				console.log(data);
				if(data.msg=="500"){
					Tools.msg("删除失败,请先取消角色分配关联关系！");
				}else if(data.msg=="success"){
					Tools.msg("删除成功!",menuList.searchMenus());
					$('#menuManageModal').modal('hide');
				}
			},
			error : function() {
				Tools.tipsMsg("删除失败,系统错误！");
			}
		});
	});
	
}

/**
 * 点击角色分配
 */
menuList.prototype.updateRole = function(){
	//得到点击行数据
	var tr = $(this).closest('tr');
	var detailObj = $('#menuList_table').dataTable().fnGetData(tr);//获取表格点击行的数据
	var funcId = detailObj.func_id;  //菜单ID /权限ID
	//显示model
	$("#sysRoleInfoModel").modal("show");//弹出modal
	$("#funcId").val(funcId);
	var funcName = detailObj.name;
	$("#modalTitle").html("为 " +funcName+" 分配角色")
	menuList.initRoletree(funcId);
}
//加载角色树
menuList.prototype.initRoletree = function(funcId) {

	// 验证参数是否存到
	if (null == funcId || undefined == funcId || "" == funcId
			|| "null" == funcId || "undefined" == funcId || funcId.length <= 0) {
		Tools.tipsMsg("非法访问");
		return false;
	}

	// 查询菜单信息
	$.ajax({
		type : 'post',
		url : path + 'menuManage/loadMenuByFuncId.action',
		data : {
			"funcId" : funcId
		},
		success : function(data) {
			if (data.code == 200) {
				console.log(data);
				menuList.loadMenuZtree(data.data);
			} else {
				Tools.tipsMsg("初始化失败");
			}
		},
		error : function() {
			Tools.tipsMsg("初始化失败");
		}
	});
}
//加载菜单树
menuList.prototype.loadMenuZtree = function(data) {
	var setting = {
		check : {
			enable : true,
			autoCheckTrigger : true
		},
		view : {
			dblClickExpand : false
		},
		data : {
			simpleData : {
				enable : true
			}
		}
	};
	$.fn.zTree.init($("#menuZtree"), setting, data);
	
	var treeObj  = $.fn.zTree.getZTreeObj("menuZtree");
	treeObj.expandAll(true); 
}

//保存角色数据
menuList.prototype.saveRoleData = function(zTree) {
	var funcId = $("#funcId").val();
	if(Tools.isEmpty(funcId)){
		Tools.tipsMsg("保存失败");
	}
	var str = "";
	$.each(zTree.getCheckedNodes(), function(i, obj){
		str += obj.id + ",";
	})

	layer.confirm("确认保存角色信息？", {
		btn : [ '确认', '取消' ]
	}, function() {
		$.ajax({
			type : 'post',
			url : path + 'menuManage/saveRoleMenu.action',
			data : {
				"funcId" : funcId,
				"roleIds" : str
			},
			success : function(data) {
				if (data.code == 200) {
					$("#closeRole_btn").click();
					Tools.msg(data.msg);
				} else {
					
				}
			},
			error : function() {
				Tools.tipsMsg("保存失败");
			}
		});
	});
}

/**
 * 弹出选择图标模态窗
 */
menuList.prototype.selectFunc_icon = function(){
	$('#menu_addMenu_seleceIconModal').modal('show');
}

/**
 * 检索查询
 */
menuList.prototype.searchMenus = function(){
	$('#menuList_table').DataTable().ajax.reload();	
}
/**
 * 查询列表
 */
menuList.prototype.menuTable = function(){
	var colum = [{
		"title" : "序号",
		"data" : "numNo"
	},{
		"title" : "功能名称",
		"data" : "name"
	},{
		"title" : "功能类型",
		"data" : "func_type",
		"render" : function(data) {
			if(data == 1){
				return  "文件夹";
			}else if(data == 2){
				return  "URL";
			}else{
				return data;
			}
		}
	},{
		"title" : "URL地址",
		"data" : "url"
	},{
		"title" : "上级功能",
		"data" : "SuperiorName"
	},{
		"title" : "菜单类型",
		"data" : "isPhone",
		"render" : function(isPhone) {
			if(isPhone == 1){
				return  "web端";
			}else if(isPhone == 2){
				return  "app端";
			}else{
				return  isPhone;
			}
		}
	},{
		"title" : "角色分配",
		"data" : "func_level",
		"render" : function(data) {
			var str = "<a href='javascript:void(0)' id='btn_sysRoleInfo' class='data_edit' title='角色分配'><i class='glyphicon glyphicon-user'></i></a>"
			return str;
		}
	},{
		"title" : "操作",
		"data" : "func_id",
		"render" : function(data, type, row) {
			var str = "";
			//str += "<a href='javascript:void(0)' class='data_detail' data-info='"+ JSON.stringify(row) +"' title='详情'><i class='glyphicon glyphicon-list-alt'></i></a>&nbsp;&nbsp;" +
			str += "<a href='javascript:void(0)' id='btn_updateModel' class='data_edit' data-info='"+ JSON.stringify(row) +"' title='编辑'><i class='glyphicon glyphicon-edit'></i></a>&nbsp;&nbsp;" +
			"<a href='javascript:void(0)' id='btn_deleteModel' class='data_delete' data-info='"+ JSON.stringify(row) +"' title='删除'><i class='glyphicon glyphicon-remove'></i></a>";
			return str;
		}
	}
	];
	
	$('#menuList_table').DataTable({
		"bDestroy": true,// 刷新数据
		"language": dataTableLang,//语言
		"dom" : "t" + "<'row row_page '<'col-sm-6'i><'col-sm-6'p>>",	
		"autoWidth":false,//自适应宽度
		"paginate": true,
		"bSort": false,//排序?
		"bProcessing": false,
		"paging" : true,//是否分页
		"bServerSide": true,//服务器端分页
		"bInfo" : true,// 页脚信息
		"pageLength" : pageSize,//每页显示的条数
		"columns" : colum,//对应列
		"ajax" : Tools.bind(this, this.queryMenuList)
	});
}	

/**
 * 跳转查询数据列表
 */
menuList.prototype.queryMenuList = function(data, callback, settings){
	// 查询参数
	data["name"] = $.trim($("#MenuName").val()); //功能名称
	data["menuType"] = $.trim($("#MenuType").val()); //菜单类型
	
    var url = path + "/menuManage/queryMenuManageList.action";
	var successAction = function(data){
		if(Tools.isEmpty(data))
		{
			callback(Tools.nullDataTable());
			return;
		}
		callback(data);
	};
	$.ajax({
		"type": 'post',	//post防止中文参数乱码
		"url": url,
		"data":data,
		"dataType": "json",  
		"success": successAction,
		"error": function(e) {
		}
	});
}

/**
 * 给模态窗上级功能赋值
 */
menuList.prototype.querysuperiormenu = function(data, callback, settings){
    $.ajax({
		type : 'post',
		url : path + '/menuManage/QuerySuperiorMenu.action',
		data : {},
		success : function(data) {
			for(var i=0;i<data.superiormenu.length;i++){
				$("#parent_func").append("<option value='"+data.superiormenu[i].func_id+"'>"+data.superiormenu[i].name+"</option>");
			}
		},
		error : function() {
			//Tools.tipsMsg("删除失败");
		}
	});
}


/**
 * 点击保存0添加 1修改
 */
menuList.prototype.menuMAnageSaves = function(){
	var isPhone = $('#isPhone').val();//是否是手机端（1：web 2:手机）
	
	if(isPhone==1){//Web端添加菜单
		var name = $("#name").val();//功能名称
		var func_type = $("#func_type").val();//功能类型
		var url = $("#url").val();//URL地址
		var parent_func = $("#parent_func").val();//上级功能
		var func_level = $("#func_level").val();//级别
		var func_icon = $("#func_icon").val();//菜单图标
	}else if(isPhone==2){//App端添加菜单
		var name = $("#appname").val();//功能名称
		var func_type = "";//功能类型
		var url = $("#appurl").val();//URL地址
		var parent_func = "";//上级功能
		var func_level = "";//级别
		var func_icon = $("#appfunc_icon").val();//菜单图标
	}
	
	//判断不能为空
	$("div.error").remove();
	var isSuccess = menuList.formValidate().form();
	if(!isSuccess){return;}
	
	var layerIndex = layer.msg('正在保存。。。。', {icon: 16, shade: 0.5, time: 0});
	
	var mycars={"func_id_code" : func_id_code,
				"name" : name,
				"func_type" : func_type,
				"url" : url,
				"parent_func" : parent_func,
				"func_level" : func_level,
				"sort_no" : sort_no_code,
				"func_icon" : func_icon,
				"isPhone" : isPhone
		}
	
	if(menu_state==0){
		$.ajax({
			type : 'post',
			url : path + '/menuManage/savemenuManageInfo.action',
			data : {
				"mycars" : JSON.stringify(mycars)
			},
			success : function(data) {
				console.log(data);
				if(data.msg=="success"){
					Tools.msg("添加成功!",menuList.searchMenus());
					$('#menuManageModal').modal('hide');
				}
			},
			error : function() {
				Tools.tipsMsg("添加失败");
			}
		});
	}else if(menu_state==1){//修改
		$.ajax({
			type : 'post',
			url : path + '/menuManage/updatemenuManageInfo.action',
			data : {
				"mycars" : JSON.stringify(mycars)
			},
			success : function(data) {
				console.log(data);
				if(data.msg=="success"){
					Tools.msg("修改成功!",menuList.searchMenus());
					$('#menuManageModal').modal('hide');
				}
			},
			error : function() {
				Tools.tipsMsg("修改失败");
			}
		});
	}
}

/**
 * 清空值
 */
menuList.prototype.menuModNULL = function(){
	$("#name").val("");//功能名称
	$("#func_type").val("");//功能类型
	$("#url").val("");//URL地址
	$("#parent_func").val("");//上级功能
	$("#func_level").val("");//级别
	$("#func_icon").val("");//菜单图标
	
	$("#appname").val("");//功能名称
	$("#appurl").val("");//URL地址
	$("#appfunc_icon").val("");//菜单图标
	
	sort_no_code='';//排序
	//清空验证
	$("div.error").remove();
}
//Web表单验证
menuList.prototype.formValidate =function(){
	var isPhone = $('#isPhone').val();//是否是手机端（1：web 2:手机）
	//如果功能类型是2URL，那么验证URL是否为空
 	var type = $("#func_type").val();//功能类型
 	$.validator.setDefaults({  
       errorPlacement :	 errorPlacement, 
  	}); 
 	
 	if(isPhone==1){//web端验证
 		if(type == 2 || type==''){//URL
 		  	var validator = $("#menuManageForm").validate({
 		         rules: {
 		         	name : {required : true,maxlength : 32}, //功能名称
 		         	func_type : {required : true}, //功能类型
 		         	url : {required : true,maxlength : 64}, //URL地址
 		         	func_level : {required : true},  //选择级别
 		         	func_icon : {required : true, maxlength : 128}//菜单图标
 		         }
 		     });
 	 	}else if(type == 1){
 	 	  	var validator = $("#menuManageForm").validate({
 	 	         rules: {
 	 	         	name : {required : true,maxlength : 32}, //功能名称
 	 	         	func_type : {required : true}, //功能类型
 	 	         	func_level : {required : true},  //选择级别
 	 	         	func_icon : {required : true, maxlength : 128}//菜单图标
 	 	         }
 	 	     });
 	 	}
 	}else if(isPhone==2){//App验证
 		var validator = $("#AppMenuManageForm").validate({
 	         rules: {
 	         	appname : {required : true,maxlength : 32}, //功能名称
 	         	appurl : {required : true,maxlength : 64}, //URL地址
 	         	appfunc_icon : {required : true}//菜单图标
 	         }
 	     });
 	}
 	
 	return validator;
 }

/**
 * 修改查询
 */
menuList.prototype.updateQueryMenu = function(){
	$.ajax({
		type : 'post',
		url : path + '/menuManage/querymenuEntity.action',
		data : {
			"func_id" : func_id_code
		},
		success : function(data) {
			console.log(data.entity);
			$("#name").val(data.entity.name);//功能名称
			$("#func_type").val(data.entity.func_type);//功能类型
			$("#url").val(data.entity.url);//URL地址
			$("#parent_func").val(data.entity.parent_func);//上级功能
			$("#func_level").val(data.entity.func_level);//级别
			$("#func_level").attr("disabled",true);//级别
			$("#func_icon").val(data.entity.func_icon);//菜单图标
			
			$("#appname").val(data.entity.name);//功能名称
			$("#appurl").val(data.entity.url);//URL地址
			$("#appfunc_icon").val(data.entity.func_icon);//菜单图标
			
			sort_no_code=data.entity.sort_no;//排序
			//设置操作状态为修改
			menu_state=1;
		},
		error : function() {
			//Tools.tipsMsg("");
		}
	});
}

