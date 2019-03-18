$(function(){
	initProject();
	
	//初始化表格
	initTable();
	
	//查询按钮点击事件
	$("#structural_search").on("click",function(){
		 $('#relationTable').DataTable().ajax.reload();
	});
	
	//添加按钮点击事件
	$("#structural_add").on("click",function(){
		clearAddData();
		$("#addModal").modal("show");
	});
	
	 //行点击事件
	$("#relationTable").delegate("tbody tr", "click",clickTr);
	
	//点击编辑按钮
	$(document).delegate(".relation_Update","click",function(e){
		updateRelation(e);
	});
	
	//点击删除按钮
	$(document).delegate(".relation_Delete","click",function(e){
		deleteRelation(e);
	});
	
	//点击添加保存按钮
	$("#saveAddSubmitBtn").on("click",saveAddRelation);
	
	//点击修改保存按钮
	$("#saveUpateSubmitBtn").on("click",saveUpdateRelation);
	
	// 数据导入按钮点击事件
	$("#structural_import").on('click', function(){
		$('#uploadify').click();
	});
	//上传change事件
	$("#uploadify").on("change",uploadFile);
	
	$("#projectName").on("change",function(){
		towerType();
	});
	$("#projectName1").on("change",function(){
		towerType1();
	});
})

/*
 * 行点击事件
 */
var clickTr = function(){
	 $(this).addClass('active').siblings().removeClass('active').end();
}

function initProject(){
	$.ajax({
		type : 'post',
		url : path + 'common/getMainInfoList.action',
		success : function(data) {
			var option="";
			for(var i=0;i<data.length;i++){
				var main=data[i];
				option+="<option value='"+main.id+"'>"+main.projectName+"</option>"
			}
			$("#projectName").html(option);
			$("#projectName").find("option").first().attr("selected", true);
			$("#projectName1").html(option);
			$("#projectName1").find("option").first().attr("selected", true);
			//杆塔类型
			towerType();
			towerType1();
		}
	})
}


/**
 * 获取杆塔类型
 */
var towerType = function(){
	$.ajax({
		type : 'post',
		url : path + 'structural/getTowerType.action',
		data : {
			'id' : $("#projectName").val()
	    },
		success : function(data) {
			var list=data.list;
			var option ="<option value=''>==请选择==</option>";
			for(var i = 0; i < list.length; i++) {
				var towerData = list[i];
				option+="<option value='"+towerData.towerType+"'>"+towerData.towerType+"</option>";
			}
		    $("#towerType").html(option);
		}
	})
}

var towerType1 = function(){
	$.ajax({
		type : 'post',
		url : path + 'structural/getTowerType.action',
		data : {
			'id' : $("#projectName1").val()
	    },
		success : function(data) {
			var list=data.list;
			var option ="<option value=''>==请选择==</option>";
			for(var i = 0; i < list.length; i++) {
				var towerData = list[i];
				option+="<option value='"+towerData.towerType+"'>"+towerData.towerType+"</option>";
			}
		    $(".towerType_select").html(option);
		}
	})
}

/*
 * 初始化表格
 */
var initTable = function(){
	var colum = [
		{   
			"data" : "numNo"
		},
		{   
			"data" : "towerName"
		}, {
			"data" : "huHeight"
		},{
			"data" : "towerType"
		},  {
			"data" : "fullHeight"
		}, {
			"data" : "Nmax" 
		}, {
			"data" : "Nx"  		 
		},{
			"data" : "Ny"  
		},{ 
			"data" : "Tmax" 
		},{
			"data" : "Tx"  
		},{
			"data" : "Ty"  
		},{
			"data" : "id",
			"render":function(data){
				var str="";
				    str+= '<a href="javascript:void(0)" class="relation_Update"  title="编辑"><span class="glyphicon glyphicon-edit"></span></a>';
				    str+= '<a href="javascript:void(0)" class="relation_Delete"   title="删除" style="color: #fc0543;margin-left:4px;"><span class="glyphicon glyphicon-trash"></span></a>';
				    return  str;
			}
	      }] 
	
	$('#relationTable').DataTable({
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
		"pageLength" :25,//每页显示的条数
		"columns" : colum,//对应列
		"ajax": function(data,callback,settings){
			data["towerType"]=$(".towerType_select").val();
			 $.ajax({
		            type: "post",//请求方式
		            url: path+"structural/relation/getRelationPage.action",
		            data:data,
		　　　　　　　     success:function(data){
		　　　　　		   if(Tools.isEmpty(data.aaData)){
		　　　　			callback(Tools.nullDataTable());
		　　　　			return;
		　　　　		   }
		　　　　		   callback(data);
		　　　　	  }
		      });
		}
	});
}

/*
 * 显示修改页面的参数信息
 */
var updateRelation=function(e){
	var tr = $(e.target).closest('tr');
	var data = $('#relationTable').dataTable().fnGetData(tr);
	$("#relationid").val(data.id);
	$("#towerName2").val(data.towerName);
	$("#huHeight2").val(data.huHeight);
	$("#towerType2").val(data.towerType);
	$("#fullHeight2").val(data.fullHeight);
	$("#Nmax2").val(data.Nmax);
	$("#Nx2").val(data.Nx);
	$("#Ny2").val(data.Ny);
	$("#Tmax2").val(data.Tmax);
	$("#Tx2").val(data.Tx);
	$("#Ty2").val(data.Ty);
	$("#updateModal").modal("show");
}

var clearAddData=function(){
	$("#towerName1").val('');
	$("#huHeight1").val('');
	$("#towerType1").val('');
	$("#fullHeight1").val('');
	$("#Nmax1").val('');
	$("#Nx1").val('');
	$("#Ny1").val('');
	$("#Tmax1").val('');
	$("#Tx1").val('');
	$("#Ty1").val('');
}

/**
 * 保存修改的参数信息
 */
var saveUpdateRelation=function(){
	var data=new Object();
	data.id=$("#relationid").val();
	data.towerName=$("#towerName2").val();
	data.huHeight=$("#huHeight2").val();
	data.towerType=$("#towerType2").val();
	data.fullHeight=$("#fullHeight2").val();
	data.Nmax=$("#Nmax2").val();
	data.Nx=$("#Nx2").val();
	data.Ny=$("#Ny2").val();
	data.Tmax=$("#Tmax2").val();
	data.Tx=$("#Tx2").val();
	data.Ty=$("#Ty2").val();
	
	 $.ajax({
         type: "post",//请求方式
         url: path+"structural/relation/updateRelation.action",
         data:{
         	param:JSON.stringify(data),
         },
　　　　       success:function(data){
　　		    if(data.code=="200"){
　　		       Tools.alertMsg("保存成功");
      	       $("#updateModal").modal("hide");
      	       $('#relationTable').DataTable().ajax.reload();
            }else{
            	Tools.alertMsg("保存失败");
            }
         },
        error:function(){
        	Tools.alertMsg("服务器错误");
         }
   });
}

/**
 * 保存添加的参数信息
 */
var saveAddRelation=function(){
	var data=new Object();
	data.towerName=$("#towerName1").val();
	data.huHeight=$("#huHeight1").val();
	data.towerType=$("#towerType").val();
	data.fullHeight=$("#fullHeight1").val();
	data.Nmax=$("#Nmax1").val();
	data.Nx=$("#Nx1").val();
	data.Ny=$("#Ny1").val();
	data.Tmax=$("#Tmax1").val();
	data.Tx=$("#Tx1").val();
	data.Ty=$("#Ty1").val();
	
	 $.ajax({
         type: "post",//请求方式
         url: path+"structural/relation/addRelation.action",
         data:{
         	param:JSON.stringify(data),
         },
　　　　       success:function(data){
　　		    if(data.code=="200"){
　　		       Tools.alertMsg("保存成功");
      	       $("#addModal").modal("hide");
      	       $('#relationTable').DataTable().ajax.reload();
            }else{
            	Tools.alertMsg("保存失败");
            }
         },
        error:function(){
        	Tools.alertMsg("服务器错误");
         }
   });
}

var deleteRelation=function(e){
	var tr = $(e.target).closest('tr');
	var data = $('#relationTable').dataTable().fnGetData(tr);
	
	Tools.tipsConfirm("确定删除吗",function(){
		$.ajax({
	         type: "post",//请求方式
	         url: path+"structural/relation/deleteRelation.action",
	         data:{
	        	 id:data.id,
	         },
	　　　　       success:function(data){
	　　		    if(data.code=="200"){
	　　		    	Tools.alertMsg("删除成功");
	　　		    	$('#relationTable').DataTable().ajax.reload();
	            }else{
	            	Tools.alertMsg("删除失败");
	            }
	         },
	        error:function(){
	        	Tools.alertMsg("服务器错误");
	         }
	   });
	},true);	 
}

/**
 * onchange事件o当input框发生改变时，执行submit提交
 */
var uploadFile = function(){
	  var maxSize = 5400000;// 文件上传大小限制
	  var size = document.getElementById('uploadify').files[0].size;
      var filesize = (size /1024/1024).toFixed(2);
      // 判断文件大小是否小于规定值
      if(size<=maxSize){
		$("#uploadForm").ajaxSubmit({
			type : 'post',
			url : path + "structural/relation/importExcel.action",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			success : function(result) {
				if (result.hasOwnProperty("errorMessage")) {
					Tools.tipsMsg(result.errorMessage );
	
				}else if (result.hasOwnProperty("errorMessage")) {
					Tools.tipsMsg(result.errorMessage);
	
				}else if (result.hasOwnProperty("errorType")) {
					Tools.tipsMsg(result.errorType);
					
				} else {
					Tools.msg("导入成功！共插入" + result.total + "条数据！");
				}
				$('#relationTable').DataTable().ajax.reload();
			},
			error : function(result){// 服务器响应失败处理函数
				Tools.tipsMsg("服务器异常");
			}
		})
      }else{
    	  Tools.msg("上传文件大小超过限制,请上传小于"+(maxSize/1024/1024).toFixed(2)+"MB的文件！");
      }
	// 每一次选择完文件后都将input type=file重置 不然会触发不了change事件
	var file = document.getElementById("uploadify");
	// 判断是否为ie浏览器
	var ie = (navigator.appVersion.indexOf("MSIE")!=-1);
    if( ie ){
        var file2= file.cloneNode(false);
        file2.onchange= file.onchange;
        file.parentNode.replaceChild(file2,file);
    }else{
        $(file).val("");
    }

}