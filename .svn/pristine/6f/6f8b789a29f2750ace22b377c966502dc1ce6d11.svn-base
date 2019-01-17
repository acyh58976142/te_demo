var array = new Array();

function roleUserMenu() {
	// 初始化加载
	this.init();
	
	//保存按钮
	$(document).delegate("#saveBtn","click",function(){
		var zTree = $.fn.zTree.getZTreeObj("menuZtree");
		if(null == zTree || undefined == zTree || '' == zTree){
			Tools.tipsMsg("页面初始化错误，请刷新页面");
			return false;
		}else{
			roleUserMenu.saveData(zTree);
		}
	});
}

//初始化加载
roleUserMenu.prototype.init = function() {

	// 验证参数是否存到
	if (null == roleId || undefined == roleId || "" == roleId
			|| "null" == roleId || "undefined" == roleId || roleId.length <= 0) {
		Tools.tipsMsg("非法访问");
		return false;
	}

	// 查询菜单信息
	$.ajax({
		type : 'post',
		url : path + 'roleUserManger/loadMenuByRoleId.action',
		data : {
			"roleId" : roleId
		},
		success : function(data) {
			if (data.code == 200) {
				console.log(data);
				roleUserMenu.loadMenuZtree(data.data);
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
roleUserMenu.prototype.loadMenuZtree = function(data) {
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

//保存数据
roleUserMenu.prototype.saveData = function(zTree) {
	var str = "";
	$.each(zTree.getCheckedNodes(), function(i, obj){
		str += obj.id + ",";
	})

	layer.confirm("确认保存菜单信息？", {
		btn : [ '确认', '取消' ]
	}, function() {
		$.ajax({
			type : 'post',
			url : path + 'roleUserManger/saveMenuInfo.action',
			data : {
				"roleId" : roleId,
				"userIds" : str
			},
			success : function(data) {
				if (data.code == 200) {
					layer.confirm("保存成功", {
						btn : [ '确认']
					}, function() {
						location = location;
					});
				} else {
					layer.confirm("保存失败", {
						btn : [ '确认']
					}, function() {
						location = location;
					});
				}
			},
			error : function() {
				layer.confirm("保存失败", {
					btn : [ '确认']
				}, function() {
					location = location;
				});
			}
		});
	});
}