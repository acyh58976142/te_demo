/**
 *人员管理js
 * @returns
 */
function userManageList(){
	$.fn.dataTable.ext.errMode = function(s,h,m){}
	//初始化表格数据
	this.initTable();
	
	//列表页面查询按钮
	$("#searchBtn").on("click",this.queryUserInfo);
	
	
	//添加按钮点击
	$(document).delegate("#addBtn" ,"click", function(){
		//初始化多选框
		$('.selectpicker').selectpicker({
			'noneSelectedText':'请选择河流'
		});
		$(".selectpicker").selectpicker('deselectAll');
		userManageList.addUserModal();
	});
	
	$("#river_code").on("change",function(){
		userManageList.formValidate().form();
	})
	
	//新增/编辑框 保存按钮
	$(document).delegate("#addSubmitBtn" ,"click", function(){
		userManageList.addUserData();
	});
	
	//新增页面modal 关闭事件
	$('#AddUserModal').on('hide.bs.modal', function () {
		userManageList.clearAddData();
	});
	
	//详情按钮点击
	$(document).delegate(".data_detail" ,"click", function(){
		userManageList.viewUserInfo(JSON.parse($(this).attr("data-info")));
	});
	
	//编辑按钮点击
	$(document).delegate(".data_edit" ,"click", function(){
		//初始化多选框
		$('.selectpicker').selectpicker({
			'noneSelectedText':'请选择河流'
		});
		$(".selectpicker").selectpicker('deselectAll');
		userManageList.editUserInfo(JSON.parse($(this).attr("data-info")));
	});
	
	
	//删除按钮点击
	$(document).delegate(".data_delete" ,"click", function(){
		userManageList.deleteUserInfo(JSON.parse($(this).attr("data-info")));
	});
	
	//角色分配按钮点击
	$(document).delegate(".data_role" ,"click", function(){
		userManageList.updateRole(JSON.parse($(this).attr("data-info")));
	});
	
	//角色 弹框  保存按钮
	$(document).delegate("#submitRole_btn","click",function(){
		var zTree = $.fn.zTree.getZTreeObj("menuZtree");
		if(null == zTree || undefined == zTree || '' == zTree){
			Tools.tipsMsg("页面初始化错误，请刷新页面");
			return false;
		}else{
			userManageList.saveRoleData(zTree);
		}
	});
	
	//查询河流信息
	this.initRiverInfo();
}

userManageList.prototype.userId="";
userManageList.prototype.loginName="";

//初始化河流信息
userManageList.prototype.initRiverInfo= function(){
//	var basinc_code=$("#basinc_code").val();
	$.ajax({
		type:"post",
		url:path+"/userManage/getRiverInfo.action",
//		data:{basinc_code:basinc_code},
		success:function(data){
			//初始化河流信息
			$.each(data.riverList, function(i , obj){
				if(null == obj.nocheck || "" == obj.nocheck || undefined == obj.nocheck){
					$("#river_code").append("<option value='"+ obj.river_no +"' >"+ obj.river_name +"</option>");
				}
			});
		} 
   })
}


//初始化表格数据
userManageList.prototype.initTable = function(){
	//表格的表头字段
	var colum = [{
		"title" : "序号",
		"data" : "numNo"
	},{
		"title" : "登录账号",
		"data" : "loginuser"
	},{
		"title" : "姓名",
		"data" : "name"
	},{
		"title" : "性别",
		"data" : "sex",
		"render":function(data){
			  if(data=="1"){
				  data = "男";
				  return "<span class=''>"+data+"</span>";   
			  }else if(data=="2"){
				  data = "女";
				  return "<span class=''>"+data+"</span>"; 
			  }
		}
	},{
		"title" : "用户所在单位",
		"data" : "org_name",
	},{
		"title" : "用户电话",
		"data" : "mobile"
	},{
		"title" : "地址",
		"data" : "address"
	},{
		"title" : "邮件",
		"data" : "email"
	},{
		"title" : "职务",
		"data" : "user_post"
	},{
		"title" : "状态",
		"data" : "isDelete",
		"render":function(data){
			if(data=="0"){
				 data = "正常";
				 return "<span class='font-color-agree'>"+data+"</span>"; 
			}else{
				data = "已删除";
				return "<span class='font-color-refuse'>"+data+"</span>";   
			}
		}
	},{
		"title" : "操作",
		"data" : "isDelete",
		"render" : function(data, type, row) {
		   var str = "";
		  if(data =="0"){
			str += "<a href='javascript:void(0)' class='data_detail' data-info='"+ JSON.stringify(row) +"' title='详情'><i class='glyphicon glyphicon-list-alt'></i></a>&nbsp;&nbsp;" +
			"<a href='javascript:void(0)' class='data_edit' data-info='"+ JSON.stringify(row) +"' title='编辑'><i class='glyphicon glyphicon-edit'></i></a>&nbsp;&nbsp;" +
			"<a href='javascript:void(0)' class='data_delete' data-info='"+ JSON.stringify(row) +"' title='删除'><i class='glyphicon glyphicon-remove'></i></a>&nbsp;&nbsp;" +
			"<a href='javascript:void(0)' class='data_role' data-info='"+ JSON.stringify(row) +"' title='角色分配'><i class='glyphicon glyphicon-user'></i></a>";
			return str; 
		  }else{
			str += "<a href='javascript:void(0)' class='data_detail' data-info='"+ JSON.stringify(row) +"' title='详情'><i class='glyphicon glyphicon-list-alt'></i></a>&nbsp;&nbsp;";
			return str;  
		  }
			
		}
	}
	];
	
	$('#user_table').DataTable({
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
		"ajax" : Tools.bind(this, this.queryUserManageList)
	});
 }

/**
 * 查询数据list
 */
userManageList.prototype.queryUserManageList = function(data, callback, settings) {
	// 查询参数
	data["name"] = $.trim($("#name").val()); // 姓名
	data["loginAccount"] = $.trim($("#loginAccount").val());//登录账户
	data["userUnit"] = $.trim($("#userUnit").val());//用户所在单位
	data["state"] = $.trim($("#state").val()); // 状态
    var url = path + "/userManage/queryUserManageList.action";
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
 * 检索条件查询
 */
userManageList.prototype.queryUserInfo = function() {
	$('#user_table').DataTable().ajax.reload();	
}


/**
 * 弹出新增modal
 */
userManageList.prototype.addUserModal = function() {
	userId="";
	$("#addUserTitle").html("新增人员");
	$("#AddUserModal").modal("show");	
}

/**
 * 表单验证
 */
userManageList.prototype.formValidate = function() {
	// 错误提示
	$.validator.setDefaults({
		ignore: ':not(select:hidden,select:visible, input:visible, textarea:visible)',//对隐藏元素也可以进行验证		
		errorPlacement : errorPlacement
	});
	
	// 手机号码验证    
   $.validator.addMethod("isMobile", function(value, element) {    
      var length = value.length;    
      return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));    
    }, "请正确填写您的联系电话"); 
    
  //不能输入特殊字符
	$.validator.addMethod("isName",function(value,element){
		var figure =/[@!！￥#\$%\^&\*]+/g;
		return this.optional(element) || (!figure.test(value));
	},"不能输入特殊字符");
	
	//邮箱验证
	$.validator.addMethod("checkEmail",function(value,element,params){  
        var checkEmail = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9_-]+\.)+[a-z]{2,4}$/i;  
        return this.optional(element)||(checkEmail.test(value));  
    },"请输入正确的邮箱");
	
	//密码验证
	 $.validator.addMethod("checkPwd",function(value,element,params){  
         var checkPwd = /^\w{6,16}$/g;  
         return this.optional(element)||(checkPwd.test(value));  
     },"只允许6-16位英文字母、数字或者下画线");
	
	 //员工账号唯一性验证
	 $.validator.addMethod("loginuser",function(value,element){
		 var loginuserName;
		 //判断之前的账号和修改的账号是否相同
		 var loginUser = userManageList.loginName;
		 
		 if(loginUser == $("#add_loginuser").val()){
			 loginuserName =  false;
		 }else{
			 $.ajax({
				 url:path+"userManage/queryloginuserName.action",
				 type:"post",
				 async:false,
				 data:{
					 loginuser:$.trim($("#add_loginuser").val()),//员工账号
				 },
				 success:function(data){
					 if(data){
						 loginuserName = true;
					 }else{
						 loginuserName = false;
					 }
				 },
				 error:function(){
					 Tools.tipsMsg("提示", "数据异常!");
				 }
			 });
		 }
		 return  this.optional(element) || (loginuserName == false)
	 },"该账号已存在");
	  //河流
		$.validator.addMethod("selRiver", function(value, element) {  
			   var $opt = $(element).next(".btn-group").find(".filter-option");
			   var valSel=$opt.html();     
			   var returnVal = true;
			   var valSel=$opt.html();    
			    var returnVal = true;
	            if(valSel=="请选择河流"||valSel==null){ 
	                returnVal = false;
	            }
	            if(value!=null&&value!=undefined&&value!=""){
	            	returnVal = true;
	            }
	           return returnVal;
		}, "必填字段");   
		
	 
	// 验证规则
	var validator = $("#caseAppTable").validate({
		rules : {
			add_loginuser:   {	required : true,loginuser:true,maxlength : 32},
			add_password :   {	required : true,minlength: 6,maxlength : 16,checkPwd:true},
			add_name:   {	required : true,maxlength : 32,isName:true},
			add_sex:  {	required : true},
			add_org_name:    {	required : true},
			add_mobile:   {	required : true,isMobile :true},
			add_address:{maxlength : 64},
			add_email:{checkEmail:true},
			add_user_post:{required : true},
			river_code:{selRiver : true,maxlength : 4000},
		}
	});
	return validator;
}

/**
 * 新增/编辑流域信息
 */
userManageList.prototype.addUserData = function() {
	var isSuccess = this.formValidate().form();
	if (isSuccess) {
		var layerIndex = layer.msg('正在保存。。。。', {icon: 16, shade: 0.5, time: 0});
		var user_id =userId;
		var loginuser =$("#add_loginuser").val();
		var password = $("#add_password").val();
		var name = $("#add_name").val();
		var sex = $("#add_sex").val();
		var org_name = $("#add_org_name").val();
		var mobile = $("#add_mobile").val();
		var address = $("#add_address").val();
		var email = $("#add_email").val();
		var user_post = $("#add_user_post").find("option:selected").text();
		var user_level = $("#add_user_level").val();
		var riverCode= "";
		var basicCode= "";
		$.each($("#river_code option:selected"), function(i, obj) {
			riverCode += $(obj).val()+","
		//	basicCode +=$(this).attr("basicNo")+",";
		})
		var addParam = {
				"user_id":user_id,
				"loginuser" : loginuser,
				"password" : password,
				"name" : name,
				"sex" : sex,
				"org_name" : org_name,
				"mobile" : mobile,
				"address" : address,
				"email" : email,
				"user_post" : user_post,
				"user_level":user_level,
				"riverCode":riverCode,
				"basicCode":basicCode,
		}
		$.ajax({
			type : 'post',
			url : path + '/userManage/addUserInfo.action',
			data : addParam,
			success : function(data) {
				Tools.msg(data.msg,userManageList.queryUserInfo());
				$('#AddUserModal').modal('hide');
				/*layer.msg(data.msg, {
					time: 2000
				}, function() {
					$("#addCancleBtn").click();
					layer.closeAll();
					location = location;
				});*/
			},
			error : function() {
				Tools.tipsMsg("操作失败");
			}
		});
	
	}
}

//清空验证信息
userManageList.prototype.resetForm = function() {
	 $("div.error").remove();
}

/**
 * 清空新增模态层数据
 */
userManageList.prototype.clearAddData = function() {
	
	userManageList.resetForm();//清空验证信息
	
	$("#addUserTitle").html("");
	$("#add_loginuser").val("");
	$("#add_password").val("");
	$("#add_name").val("");
	$("#add_sex").val("");
	$("#add_org_name").val("");
	$("#add_mobile").val("");
	$("#add_address").val("");
	$("#add_email").val("");
	$("#add_user_post").val("");
	$("#add_user_level").val("");
	$(".selectpicker").selectpicker('deselectAll');//清空
}

/**
 * 查看流域信息详情
 */
userManageList.prototype.viewUserInfo = function(obj) {
	//清空
	$("#detail_user_no").html("");
	$("#detail_loginuser").html("");
	$("#detail_password").html("");
	$("#detail_name").html("");
	$("#detail_sex").html("");
	$("#detail_org_name").html("");
	$("#detail_mobile").html("");
	$("#detail_address").html("");
	$("#detail_email").html("");
	$("#detail_user_post").html("");
	$("#detail_user_level").html("");
	//详情赋值
	$("#detail_user_no").html(obj.user_no);
	$("#detail_loginuser").html(obj.loginuser);
	$("#detail_password").html(obj.password);
	$("#detail_name").html(obj.name);
	if(obj.sex=='1'){
		$("#detail_sex").html("男");
	}
	if(obj.sex=='2'){
		$("#detail_sex").html("女");
	}
	$("#detail_org_name").html(obj.org_name);
	$("#detail_mobile").html(obj.mobile);
	$("#detail_address").html(obj.address);
	$("#detail_email").html(obj.email);
	$("#detail_user_post").html(obj.user_post); 
	var isSpecialName ="";
	if(obj.isSpecial=="0"){
		isSpecialName = "普通用户"
	}else{
		isSpecialName = "特殊用户"
	}
	$("#detail_user_level").html(isSpecialName);
	var river_name="";
	var riverRelation=obj.relation;
	if(riverRelation!=undefined&&riverRelation.length>0){
	  $.each(obj.relation, function(i, obj) {
		  river_name+=obj.river_name+",";
	  });
	  river_name=river_name.substring(0,river_name.lastIndexOf(","));
	}
	$("#detail_river_code").html(river_name);
	
	$("#detailUserModal").modal("show");//弹出modal
	
}


userManageList.prototype.updateRole = function(obj) {
	$("#sysRoleInfoModel").modal("show");//弹出modal
	userId=obj.user_id;
	$("#userId").val(userId);
	userName=obj.name;
	$("#modalTitle").html(userName+"：分配角色")
	userManageList.initRoletree(userId);
}

//加载角色树
userManageList.prototype.initRoletree = function(userId) {

	// 验证参数是否存到
	if (null == userId || undefined == userId || "" == userId
			|| "null" == userId || "undefined" == userId || userId.length <= 0) {
		Tools.tipsMsg("非法访问");
		return false;
	}

	// 查询菜单信息
	$.ajax({
		type : 'post',
		url : path + 'roleUserManger/loadMenuByUserId.action',
		data : {
			"userId" : userId
		},
		success : function(data) {
			if (data.code == 200) {
				console.log(data);
				userManageList.loadMenuZtree(data.data);
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
userManageList.prototype.loadMenuZtree = function(data) {
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
userManageList.prototype.saveRoleData = function(zTree) {
	var userId = $("#userId").val();
	if(Tools.isEmpty(userId)){
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
			url : path + 'roleUserManger/saveRoleMenu.action',
			data : {
				"userId" : userId,
				"roleIds" : str
			},
			success : function(data) {
				if (data.code == 200) {
					$("#closeRole_btn").click();
					Tools.tipsMsg(data.msg);
				} else {
					
				}
			},
			error : function() {
				Tools.tipsMsg(data.msg);
			}
		});
	});
}
/**
 * 编辑流域信息
 */
userManageList.prototype.editUserInfo = function(obj) {
	//编辑赋值
	$("#addUserTitle").html("编辑人员");
	userId=obj.user_id;
	userManageList.loginName = obj.loginuser;
	$("#add_loginuser").val(obj.loginuser);
	$("#add_password").val(obj.password);
	$("#add_name").val(obj.name);
	$("#add_sex").val(obj.sex);
	$("#add_org_name").val(obj.org_no);
	$("#add_mobile").val(obj.mobile);
	$("#add_address").val(obj.address);
	$("#add_email").val(obj.email);
	$("#add_user_level").val(obj.isSpecial);
	
	$.each($("#add_user_post option"), function(i, objOpt) {
		var textVal=$(objOpt).text();
		if(textVal==obj.user_post){
			$(objOpt).prop("selected","selected");
		}
	})
	
	var relation=new Array();
	var riverRelation=obj.relation;
	if(riverRelation!=undefined&&riverRelation.length>0){
	  $.each(obj.relation, function(i, obj) {
		relation.push(obj.river_code);
	  });
	}
	$("#river_code").selectpicker('val', relation);
	$('.selectpicker').selectpicker('render');
	$("#AddUserModal").modal("show");//弹出modal
	
}

/**
 * 删除人员信息
 */
userManageList.prototype.deleteUserInfo = function(obj) {
	layer.confirm("确认删除该人员信息?", {
		btn : [ '确认', '取消' ]
	}, function() {// 第一个按钮执行事件
		$.ajax({
			type : 'post',
			url : path + '/userManage/deleteUserInfo.action',
			data : {
				"user_id" : obj.user_id,
				"user_level":obj.isSpecial
			},
			success : function(data) {
				if(data.flag == false){
					/*layer.msg("该用户为超级用户不能删除",{
						closeBtn : 0
					},function(){
						layer.closeAll();
						userManageList.queryUserInfo();
					});*/
					Tools.msg("该用户为超级用户不能删除",userManageList.queryUserInfo());
				}else{
					Tools.msg(data.msg,userManageList.queryUserInfo());
				}
			},
			error : function() {
				Tools.tipsMsg("删除失败");
			}
		});
	});
}
