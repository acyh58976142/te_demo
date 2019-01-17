/**
 * 初始化 ls
 */
function unitManageList(){
	
	this.initUnitManage();
	
	//条件查询
	$("#searchBtn").on("click",this.searchBtn);
	
	//点击新增按钮
	$("#addCaseBtn").on("click",this.addCaseBtn);
	
	//单位管理新增model框
	$("#AddUnitManageModal").on('hide.bs.modal', function () {
		unitManageList.AddcaseColse();
	});
	
	//保存
	$("#addSubmitBtn").on("click",this.addSubmitBtn);
	
	//点击编辑按钮
	$("#unitManage_table").delegate(".unitManageUpdate", "click",this.unitManageUpdate);
	
	//点击删除
	$("#unitManage_table").delegate(".unitManageDelete","click",this.unitManageDelete); 
}

unitManageList.prototype.Id='';
unitManageList.prototype.dwName='';

//条件查询
unitManageList.prototype.searchBtn = function(){
	$('#unitManage_table').DataTable().ajax.reload();
}

//初始化列表
unitManageList.prototype.initUnitManage = function(){
	
	var colum =[{
		"title": "序号",
		"data" : "numNo"
	},{
		"title": "单位名称",
		"data" : "org_name"
	},{
		"title": "上级单位名称",
		"data" : "parentname"
	},{
		"title": "单位地址",
		"data" : "org_address"
	},{
		"title": "联系电话",
		"data" : "org_telephone"
	},{
		"title": "乡镇名称",
		"data" : "ANAME"
	},{
		"title": "是否生效",
		"data" : "is_valid",
		"render":function(data){
		if(data=="0"){
			data = "未生效";
			return "<span class='font-color-refuse'>"+data+"</span>";   
		}else{
			data="已生效"
		    return "<span class='font-color-agree'>"+data+"</span>";
		}
	  }
	},{
		"title" : "操作",
		"data" : "",
		"render":function(data){
			return "<a class='unitManageUpdate'><span title='修改' class='glyphicon glyphicon-edit' aria-hidden='true'></span></a>&nbsp;&nbsp;&nbsp;&nbsp"+
			"<a class='unitManageDelete'><span title='删除' class='glyphicon glyphicon-remove' aria-hidden='true'></span></a>"
	      }	
	}
  ];
	
	$('#unitManage_table').DataTable({
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
		"ajax" : Tools.bind(this, this.getunitManageListAjax)
	});
}


//ajax查询
unitManageList.prototype.getunitManageListAjax = function(data, callback, settings){
	
	// 查询参数
	data["unitName"] = $.trim($("#unitName").val()); // 单位管理
	data["country"] = $.trim($("#country").val());// 乡镇名称
	
    var url = path + "/unitManage/queryUnitManageList.action";
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

//点击新增
unitManageList.prototype.addCaseBtn = function(){
	$(".modal-title").html("新增单位信息")
	$("#AddUnitManageModal").modal('show');
}

//清空
unitManageList.prototype.AddcaseColse =function(){
	this.emptyForm();
	$("#add_unitNames").val("");//单位名称
	$("#add_parent_name").val("");//上级单位名称
	$("#add_org_address").val("");//单位地址
	$("#add_org_telephone").val("");//联系电话
	$("#add_area_code").val("");//乡镇名称
	$("#is_valid").val("");//是否生效
}

//编辑赋值
unitManageList.prototype.unitManageUpdate =function(){
	//获取表格Id
 	var tr = $(this).closest('tr');
 	var data = $('#unitManage_table').dataTable().fnGetData(tr);
 	unitManageList.Id = data.org_no;
 	unitManageList.dwName = data.org_name;
	if(null!=unitManageList.Id && ""!=unitManageList.Id && undefined !=unitManageList.Id){
		$(".modal-title").html("编辑单位信息")
		$("#AddUnitManageModal").modal('show');
		unitManageList.emptyForm();//清空验证
	}
	var url = path+"/unitManage/getUnitManage.action";
	$.ajax({
		"url":url,
		"type":'post',
		"data":{
		  id:unitManageList.Id
		},
		success:function(data){
		  if(data!=null){
			 $("#add_unitNames").val(data.org_name);//单位名称
			 $("#add_parent_name").val(data.parent_no);//上级单位
			 $("#add_org_address").val(data.org_address);//单位地址
			 $("#add_org_telephone").val(data.org_telephone);//联系电话
			 $("#add_area_code").val(data.area_code);//乡镇名称
			 $("#is_valid").val(data.is_valid);//乡镇名称
		  }
		}
	});
}

//保存
unitManageList.prototype.addSubmitBtn = function(){
	//获取值
	var unitName = $("#add_unitNames").val();//单位名称
	var parentName = $("#add_parent_name").val();//上级单位名称
	var orgAddress = $("#add_org_address").val();//单位地址
	var orgTelephone = $("#add_org_telephone").val();//联系电话
	var areaCode = $("#add_area_code").val();//乡镇名称
	var isValid = $("#is_valid").val();//是否生效
	var url = path+"/unitManage/addUnitManage.action"
	var data ={
			org_name:unitName,
			parentname:parentName,
			org_address:orgAddress,
			org_telephone:orgTelephone,
			code:areaCode,
			is_valid:isValid
	}
	if(null!=unitManageList.Id && ""!=unitManageList.Id&& undefined!=unitManageList.Id){
		var url = path+"/unitManage/updateUnitManage.action";
		var data = {
				org_name:unitName,
				parentname:parentName,
				org_address:orgAddress,
				org_telephone:orgTelephone,
				code:areaCode,
				is_valid:isValid,
				Id:unitManageList.Id
		}
	}
	var dataNoe=JSON.stringify(data);
	//验证
	if(unitManageList.chekValidate().form()){
		var layerIndex = layer.msg('正在保存。。。。', {icon: 16, shade: 0.5, time: 0});
		$.ajax({
			"url":url,
			"type":'post',
			"data":{
			  param:dataNoe,
			},
			success:function(data){
			 if(null!= data && data.code=="200"){
				//layer.alert("保存成功！", {
				//	 closeBtn : 0
				//	}, function() {//按钮执行事件
				//		location.href = path + "/unitManage/turnToUnitManageList.action";						
				//	});	 
				 $("#addColsBtn").click();//关闭模态框
				 Tools.msg(data.msg,unitManageList.searchBtn());
			  }else{
				  Tools.msg(data.msg);
			  }
			}
		});
  }
};

//删除
unitManageList.prototype.unitManageDelete = function(){
	
	//获取表格Id
	var tr = $(this).closest('tr');
	var data = $('#unitManage_table').dataTable().fnGetData(tr);
	var id = data.org_no;
    var url = path +"/unitManage/deleteUnitManage.action";
	layer.confirm("确定要删除当前单位管理信息吗？", {
		btn : [ '确认', '取消' ]
	}, function() {// 点击删除按钮执行事件
		$.ajax({
			url:url,//跳转到
			type : "post",
			data : {
				Id:id
				},
			//初始化查询数据
			success:function(data){ 
				if(null != data.obj){
				 //layer.alert("该单位有人员不能删除", {
				//	 closeBtn : 0
				//	}, function() {//按钮执行事件
				//		location.href = path + "/unitManage/turnToUnitManageList.action";					
				//	});	 
				  Tools.msg("该单位有人员不能删除",unitManageList.searchBtn());
				}
				else if(null != data && data.code == "200"){
					Tools.msg(data.msg,unitManageList.searchBtn());					
		    	}else {
		    		Tools.msg(data.msg); 
		    	}   
		     },  
		});
	});
}

//清空验证信息
unitManageList.prototype.emptyForm = function() {
	 $("div.error").remove();
}

/**
 * 
 * 表单验证
 */
unitManageList.prototype.chekValidate=function(){
	
	// 电话号码验证
    $.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^((13|14|15|16|17|18|19)\d{9})$|^(\d{3,4}-\d{7,8})$|^\d{8}$/;  
        return this.optional(element) || (mobile.test(value));
    },"请输入正确的手机号和固定电话");
	
    //验证单位名称是否存在
    $.validator.addMethod("unitName",function(value,element){
    	var Name;
    	//判断之前的用户名和修改之后的用户名是否相等
    	if(unitManageList.dwName == $("#add_unitNames").val()){
    		Name = false;
    	}else{
	    	$.ajax({
	    		url:path+"/unitManage/queryUnitName.action",
	    		type:"post",
	    		async:false,
	    		data:{
	    			name:$.trim($("#add_unitNames").val()),//单位名称
	    		},
	      	success:function(data){	
	      		if(data){
	      			Name = true
	      		}else{
	      			Name = false;
	      		}
	    	  },
	    		error:function(){
	    			Tools.tipsMsg("提示", "数据异常!");
	    		}
	    	});
    	 }
	   	 return  this.optional(element) || (Name == false)
	},"单位名称已存在");
    
	 $.validator.setDefaults({
		   errorPlacement :	 errorPlacement, 
	 });  

	validator = $("#unitManage_addModel_form").validate({//"验证"
		focusInvalid:false,
        rules: {
        		add_unitNames:{//单位名称
	        		required: true,
	        		unitName:true,
	        		maxlength:64,
	    		},
	    		add_parent_name:{//上级名称
	        		required: true,
	        		maxlength:32,
        		},
        		add_org_address:{//单位地址
	        		required: true,
	        		maxlength:128,
        		},
        		
        		add_org_telephone:{//联系电话
	        		required: true,
	        		isMobile:true,
	        		maxlength:32,
        		},
        		
        		add_area_code:{//乡镇名称
	        		required: true,
	        		maxlength:12,
        		},
        		
        		is_valid:{//是否生效
        			required: true,
	        		maxlength:1,
        		}
        },
    });
	return validator;
};

