roleManageList.prototype.station_code = "";
roleManageList.prototype.old_role_name = "";
function roleManageList() {
	$.fn.dataTable.ext.errMode = function(s, h, m) {
	}
	// 校验
	this.formValidate();
	// 初始化表格数据(表格)
	Tools.bind(this, this.initTable());

	// 新增按钮
	$("#btn_add").click(function() {
		//改变判断角色的标识
		roleManageList.old_role_name = "";
		$("#myModalLabel").html("添加角色信息");
		$(".error").remove();
		// 显示保存按钮
		$(".modal-footer").show();
		$("form").find("input").removeAttr("readonly");
		// 清空新增表单的input数据
		roleManageList.tableClear();
	})

	// 列表页面查询按钮
	$("#btn_search").on("click", this.reloadRoleInfo);
	
	// 查看角色人员分配按钮
	$(document).delegate(".btn_see", "click", function() {
		var id = roleManageList.getRole_Id($(this));
		var url = path + "roleUserManger/" + id + "/roleUserMenu.action";
		window.location.href = url;

	});
	// 编辑按钮
	$(document).delegate(".btn_edit", "click", function() {
		$(".error").remove();
		// 显示保存按钮
		$(".modal-footer").show();
		$("#myModalLabel").html("编辑角色信息");
		$("form").find("input").removeAttr("readonly");
		$("#myRoleModal").modal("show");
		roleManageList.seeRoleInfo($(this));
	});
	// 删除按钮
	$(document).delegate(".btn_delete", "click", function() {
		roleManageList.deleteRoleInfo($(this));
	});

	// 保存按钮
	$(document).delegate("#btn_save", "click", function() {
		roleManageList.saveOrUpdateRoleInfo();
	});

}

/**
 * DataTable查询数据
 */

roleManageList.prototype.queryRoleInfo = function(data, callback, settings) {
	// 查询参数
	data["role_name"] = $.trim($("#roleName").val()); // 角色名称
	var url = path + "/roleManage/queryRoleInfoByPage.action";
	var successAction = function(data) {
		if (Tools.isEmpty(data)) {
			callback(Tools.nullDataTable());
			return;
		}
		callback(data);
	};
	$.ajax({
		"type" : 'post', // post防止中文参数乱码
		"url" : url,
		"data" : data,
		"dataType" : "json",
		"success" : successAction,
		"error" : function(e) {
		}
	});
}

/*
 * 检索条件查询
 */
roleManageList.prototype.reloadRoleInfo = function() {
	$('#roleManageList_table').DataTable().ajax.reload();
}

/*
 * 初始化表格数据
 */
roleManageList.prototype.initTable = function() {
	// 表格的表头字段
	var colum = [
			{
				"title" : "序号",
				"data" : "numNo"
			},
			{
				"title" : "role_id",
				"data" : "role_id",
				"visible" : false
			},
			{
				"title" : "role_code",
				"data" : "role_code",
				"visible" : false
			},
			{
				"title" : "角色名称",
				"data" : "role_name"
			},
			{
				"title" : "角色描述",
				"data" : "roledesc"
			},
			/*
			 * { "title" : "设置菜单", "data" : "role_id", "render" : function(data) {
			 * return "<a href='javascript:location.href=\""+ path +"/menu/"+
			 * data +"/redirectMenu.action\"'>" + "<span title='设置菜单'
			 * class='glyphicon glyphicon-cog' aria-hidden='true'></span>" + "</a>"; } },
			 */
			{
				"title" : "操作",
				"data" : "role_id",
				"render" : function(data) {
					return "<a class='btn_edit'>"
							+ "<span title='编辑' class='glyphicon glyphicon-edit' aria-hidden='true'></span>" + "</a>"
							+ "&nbsp;&nbsp;" + "<a class='btn_delete'>"
							+ "<span title='删除' class='glyphicon glyphicon-remove' aria-hidden='true'></span>" + "</a>"
							+ "&nbsp;&nbsp;<a href='javascript:location.href=\"" + path + "/menu/" + data
							+ "/redirectMenu.action\"'>"
							+ "<span title='设置菜单' class='glyphicon glyphicon-cog' aria-hidden='true'></span>" + "</a>"
							+ "&nbsp;&nbsp;<a class='btn_see'>"
							+ "<span title='角色人员分配' class='glyphicon glyphicon-user' aria-hidden='true'></span>"
							+ "</a>";
				}
			} ];

	$('#roleManageList_table').DataTable({
		"bDestroy" : true,// 刷新数据
		"language" : dataTableLang,// 语言
		"dom" : "t" + "<'row row_page '<'col-sm-6'i><'col-sm-6'p>>",
		"autoWidth" : false,// 自适应宽度
		"paginate" : true,
		"bSort" : false,// 排序?
		"bProcessing" : false,
		"paging" : true,// 是否分页
		"bServerSide" : true,// 服务器端分页
		"bInfo" : true,// 页脚信息
		"pageLength" : pageSize,// 每页显示的条数
		"columns" : colum,// 对应列
		"ajax" : Tools.bind(this, this.queryRoleInfo)
	});
}

/*
 * 新增角色信息
 */
roleManageList.prototype.addRoleInfo = function() {
	var id = roleManageList.getRole_Id(delete_btn_Obj);
	var role_name = $("#role_name").val();
	var roledesc = $("#roledesc").val();
	var role_code = $("#role_code").val();
	var url = path + "/roleManage/addRoleInfo";
	$.ajax({
		"type" : 'post', // post防止中文参数乱码
		"url" : url,
		"data" : {
			// "role_id" : role_id,
			"role_name" : role_name,
			"roledesc" : roledesc,
			"role_code" : role_code
		},
		"dataType" : "json",
		"success" : function(data) {
			Tools.tipsMsg(data.msg);
		},
		"error" : function(e) {
			Tools.tipsMsg("删除角色信息失败!");
		}
	});
}

/*
 * 查看角色信息
 */
roleManageList.prototype.seeRoleInfo = function(btn_see_Obj) {
	var id = roleManageList.getRole_Id(btn_see_Obj);
	var url = path + "/roleManage/getRoleInfo.action";
	$.ajax({
		"type" : 'post', // post防止中文参数乱码
		"url" : url,
		"data" : {
			"id" : id
		},
		// "dataType" : "json",
		"success" : function(data) {
			$("#role_id").val(data.role_id);
			$("#role_name").val(data.role_name);
			$("#roledesc").val(data.roledesc);
			$("#role_code").val(data.role_code);
			//储存旧的角色名称
			roleManageList.old_role_name=data.role_name;
		},
		"error" : function(e) {
			Tools.tipsMsg("ajax seeRoleInfo查看失败!");
		}
	});
}

/*
 * 编辑角色信息
 */
roleManageList.prototype.editRoleInfo = function(btn_edit_obj) {
	var id = roleManageList.getRole_Id(btn_edit_obj);
	var url = path + "/roleManage/getRoleInfo.action";
	$.ajax({
		"type" : 'post', // post防止中文参数乱码
		"url" : url,
		"data" : {
			"id" : id
		},
		"dataType" : "json",
		"success" : function(data) {
			Tools.tipsMsg(data.msg);
			$("#role_name").val(role_name);
			$("#roledesc").val(roledesc);
			$("#role_code").val(role_code);
		},
		"error" : function(e) {
			Tools.tipsMsg("ajax查看失败!");
		}
	});
}

/*
 * 删除角色信息
 */
roleManageList.prototype.deleteRoleInfo = function(delete_btn_Obj) {
	var role_id = roleManageList.getRole_Id(delete_btn_Obj);
	var url = path + "/roleManage/deleteRoleInfo.action";
	layer.confirm("确认删除该角色信息?", {
		closeBtn: 0,//关闭弹窗右上角的X
		btn : [ '确认', '取消' ]
	}, function() {// 第一个按钮执行事件
		$.ajax({
			"type" : 'post', // post防止中文参数乱码
			"url" : url,
			"data" : {
				"role_id" : role_id
			},
			"dataType" : "json",
			success : function(data) {
				Tools.msg(data.msg, roleManageList.reloadRoleInfo());
				// 刷新表格数据
				// roleManageList.reloadRoleInfo();
			},
			error : function() {
				Tools.tipsMsg("删除角色信息失败!");
			}
		});
	});
}

/*
 * 保存按钮
 */
roleManageList.prototype.saveOrUpdateRoleInfo = function() {
	
	var isSuccess = roleManageList.formValidate().form();
	if (!isSuccess) {
		return;
	}
	var url = "";
	var role_id = $("#role_id").val();
	if (role_id != null && role_id.length > 0 && role_id != '') {
		// 更新操作
		url = path + "/roleManage/updateRoleInfo.action";
	} else {
		// 添加操作
		url = path + "/roleManage/addRoleInfo.action";
	}
	var role_id = $("#role_id").val();
	var role_name = $("#role_name").val();
	var roledesc = $("#roledesc").val();
	var role_code = $("#role_code").val();

	$.ajax({
		"type" : 'post', // post防止中文参数乱码
		"url" : url,
		"data" : {
			"role_id" : role_id,
			"role_name" : role_name,
			"roledesc" : roledesc,
			"role_code" : role_code
		},
		"dataType" : "json",
		"success" : function(data) {
			Tools.msg(data.msg, roleManageList.reloadRoleInfo());
			// 关闭增加页面并刷新表格数据
			$("#myRoleModal").modal("hide");

		},
		"error" : function(e) {
			Tools.tipsMsg("保存按钮操作失败!!");
		}
	});
}

/*
 * 得到id
 */
roleManageList.prototype.getRole_Id = function(btn_obj) {
	var tr = btn_obj.closest("tr");
	var rowData = $('#roleManageList_table').dataTable().fnGetData(tr);// 获取表格点击行的数据
	var id = rowData.role_id;
	return id;
}

/*
 * 清除表格数据
 */
roleManageList.prototype.tableClear = function() {
	$("#role_id").val("");
	$("#role_name").val("");
	$("#roledesc").val("");
	$("#role_code").val("");
}

/**
 * 验证
 */
roleManageList.prototype.formValidate = function() {
	
	url = path + "/roleManage/validateRoleName.action";
	// 电话号码验证
	$.validator.addMethod("dup_role_name", function(value, element) {
		var length = value.length;
		var mobile = /^((13|14|15|16|17|18|19)\d{9})$|^(\d{3,4}-\d{7,8})$|^\d{8}$/;
		return this.optional(element) || (mobile.test(value));
	}, "请输入正确的手机号和固定电话");
	$.validator.setDefaults({
		errorPlacement : errorPlacement,
	});
	var validator = $("#roleManageForm").validate({
		rules : {
			//角色描述
			roledesc:{maxlength:32},
			role_name : {
				required : true,
				maxlength : 50,
				remote : {
					url : url, // 后台处理程序
					type : "post", // 数据发送方式
					dataType : "json", // 接受数据格式
					data : { // 要传递的数据
						old_role_name : function() {
							return $("#role_name").val();
						},
						new_role_name : function() {
							return "";
						}
					},
					dataFilter : function(responseDataStr, type) {
						console.log("aaa");
						if($("#role_name").val()==roleManageList.old_role_name){
							return true;
						}
						var responseData=JSON.parse(responseDataStr);
						if (responseData.result == true)
							return true;
						else {
							return false;
						}

					}
					
				}
			}
		},
//		success : function(label) {
//			alert(label);
//		},
		messages : {
			role_name : {
				remote : "角色名称已存在!"
			}
		}
	// rules 结束
	})// validatoe结束
	return validator;
}
