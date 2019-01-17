var array = new Array();

function MenuFun() {
	// 初始化加载
	this.init();
	
	//保存按钮
	$(document).delegate("#saveBtn","click",function(){
		var zTree = $.fn.zTree.getZTreeObj("menuZtree");
		if(null == zTree || undefined == zTree || '' == zTree){
			Tools.tipsMsg("页面初始化错误，请刷新页面");
			return false;
		}else{
			MenuFun.saveData(zTree);
		}
	});
}

//初始化加载
MenuFun.prototype.init = function() {

	// 验证参数是否存到
	if (null == roleId || undefined == roleId || "" == roleId
			|| "null" == roleId || "undefined" == roleId || roleId.length <= 0) {
		Tools.tipsMsg("非法访问");
		return false;
	}

	// 查询菜单信息
	$.ajax({
		type : 'post',
		url : path + 'menu/loadMenuByRoleId.action',
		data : {
			"roleId" : roleId
		},
		success : function(data) {
			if (data.code == 200) {
				console.log(data);
				MenuFun.loadMenuZtree(data.data);
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
MenuFun.prototype.loadMenuZtree = function(data) {
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
}

//保存数据
MenuFun.prototype.saveData = function(zTree) {
	var str = "";
	$.each(zTree.getCheckedNodes(), function(i, obj){
		str += obj.id + ",";
	})

	layer.confirm("确认保存菜单信息？", {
		btn : [ '确认', '取消' ]
	}, function() {
		$.ajax({
			type : 'post',
			url : path + 'menu/saveMenuInfo.action',
			data : {
				"roleId" : roleId,
				"menuIds" : str
			},
			success : function(data) {
				if (data.code == 200) {
					layer.msg("保存成功", {
						  time: 2000 //2秒关闭（如果不配置，默认是3秒）
						}, function(){
							location = location;
						});   
				} else {
					layer.msg("保存失败", {
						  time: 2000 //2秒关闭（如果不配置，默认是3秒）
					}, function(){
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