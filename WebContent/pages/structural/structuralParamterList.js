/**
 * 结构基础参数列表
 */

$(function(){	
	initProject();
	
	//初始化地质描述
	geologyDescrip();

	
	//查询按钮点击事件
	$("#structural_search").on("click",function(){
		 $('#structuralTable').DataTable().ajax.reload();
	});
	
	//添加按钮点击事件
	$("#structural_add").on("click",function(){
		 location.href =path + "pages/structural/structuralParamter.jsp";
	});
	
	 //行点击事件
	$("#structuralTable").delegate("tbody tr", "click",clickTr);
	
	//点击编辑按钮
	$(document).delegate(".paramter_Update","click",function(e){
		updateParam(e);
	});
	
	//点击删除按钮
	$(document).delegate(".paramter_Delete","click",function(e){
		deleteParamter(e);
	});
	
	//点击保存按钮
	$("#saveSubmitBtn").on("click",saveUpdateParamter);
	
	// 数据导入按钮点击事件
	$("#structural_import").on('click', function(){
		$('#uploadify').click();
	});
	//上传change事件
	$("#uploadify").on("change",uploadFile);
	
	$("#projectName").on("change",function(){
		towerType();
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
		url : path + 'common//getMainInfoList.action',
		success : function(data) {
			var option="";
			for(var i=0;i<data.length;i++){
				var main=data[i];
				option+="<option value='"+main.id+"'>"+main.projectName+"</option>"
			}
			$("#projectName").html(option);
			$("#projectName").find("option").first().attr("selected", true);
			towerType();  
			//初始化表格
			initTable();
		}
	})
}


/**
 * 获取地质描述
 */
var geologyDescrip = function(){
	var optionData=["坚硬、硬塑","可塑","软塑","密实","中密","稍密","砾砂","粗中砂","细砂","粉砂","碎石土","碎石","岩石","淤泥","地下水"]
	var option="<option value=''>==请选择==</option>";
	for(var i = 0; i < optionData.length; i++) {
		var sensor = optionData[i];
		    option+="<option value='"+sensor+"'>"+sensor+"</option>";
	}
    $("#geologicalDescription").append(option);
	$(".geologyDescrip_select").append(option);	
	$(".geologyDescrip_select").find("option").first().attr("selected", true);
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
			towerTypeData="";
			towerTypeData+="<select class='input_control towerType_select'>";
			towerTypeData+="<option value='' selected='selected'>-请选择-</option>";	
			var option="<option value='' selected='selected'>-请选择-</option>";	
			for(var i = 0; i < list.length; i++) {
				var towerData = list[i];
				towerTypeData+="<option value='"+towerData.towerType+"'>"+towerData.towerType+"——"+towerData.towerTypeName+"</option>";
				option+="<option value='"+towerData.towerType+"'>"+towerData.towerType+"——"+towerData.towerTypeName+"</option>";
			}
			towerTypeData+="</select>";
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
			"data" : "geologicalDescription"
		}, {
			"data" : "towerType"
		},{
			"data" : "actingForce"
		},  {
			"data" : "angleLY"
		}, {
			"data" : "towerShaped" 
		}, {
			"data" : "countOnly"  		 
		},{
			"data" : "steelLabel"  
		},{ 
			"data" : "soilVolume" 
		},{
			"data" : "steelQuantity"  
		},{
			"data" : "earthBolt"  
		},{
			"data" : "beddingLabel" 
		},{
			"data" : "cushion"  
		},{
			"data" : "buryingDepth"
		},{
			"data" : "baseplateWidth"
		},{
			"data" : "columnWidth"
			},{
			"data" : "columnHigh"
	    },{
		    "data" : "basicModel"
	    },{
			"data" : "remark" 
        },{
			"data" : "id",
			"render":function(data){
				var str="";
				    str+= '<a href="javascript:void(0)" class="paramter_Update"  title="编辑"><span class="glyphicon glyphicon-edit"></span></a>';
				    str+= '<a href="javascript:void(0)" class="paramter_Delete"   title="删除" style="color: #fc0543;margin-left:4px;"><span class="glyphicon glyphicon-trash"></span></a>';
				    return  str;
			}
	      }] 
	
	$('#structuralTable').DataTable({
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
			data["geologicalDescription"]=$(".geologyDescrip_select").val();
			data["towerType"]=$(".towerType_select").val();
			data["projectId"]=$("#projectName").val();
			 $.ajax({
		            type: "post",//请求方式
		            url: path+"structural/paramter/getParamPage.action",
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
var updateParam=function(e){
	var tr = $(e.target).closest('tr');
	var data = $('#structuralTable').dataTable().fnGetData(tr);
	$("#paramid").val(data.id);
	$("#geologicalDescription").val(data.geologicalDescription);
	$("#towerType").val(data.towerType);
	$("#angleLY").val(data.angleLY);
	$("#actingForce").val(data.actingForce);
	$("#towerShaped").val(data.towerShaped);
	$("#countOnly").val(data.countOnly);
	$("#steelLabel").val(data.steelLabel);
	$("#soilVolume").val(data.soilVolume);
	$("#steelQuantity").val(data.steelQuantity);
	$("#earthBolt").val(data.earthBolt);
	$("#beddingLabel").val(data.beddingLabel);
	$("#cushion").val(data.cushion);
	$("#buryingDepth").val(data.buryingDepth);
	$("#baseplateWidth").val(data.baseplateWidth);
	$("#columnWidth").val(data.columnWidth);
	$("#columnHigh").val(data.columnHigh);
	$("#basicModel").val(data.basicModel);
	$("#remark").val(data.remark);
	$("#updateModal").modal("show");
}

/**
 * 保存修改的参数信息
 */
var saveUpdateParamter=function(){
	var data=new Object();
	data.id=$("#paramid").val();
	data.geologicalDescription=$("#geologicalDescription").val();
	data.towerType=$("#towerType").val();
	data.angleLY=$("#angleLY").val();
	data.actingForce=$("#actingForce").val();
	data.towerShaped=$("#towerShaped").val();
	data.countOnly=$("#countOnly").val();
	data.steelLabel=$("#steelLabel").val();
	data.soilVolume=$("#soilVolume").val();
	data.steelQuantity=$("#steelQuantity").val();
	data.earthBolt=$("#earthBolt").val();
	data.beddingLabel=$("#beddingLabel").val();
	data.cushion=$("#cushion").val();
	data.buryingDepth=$("#buryingDepth").val();
	data.baseplateWidth=$("#baseplateWidth").val();
	data.columnWidth=$("#columnWidth").val();
	data.columnHigh=$("#columnHigh").val();
	data.basicModel=$("#basicModel").val();
	data.remark=$("#remark").val();
	
	 $.ajax({
         type: "post",//请求方式
         url: path+"structural/paramter/updateParamter.action",
         data:{
         	param:JSON.stringify(data),
         },
　　　　       success:function(data){
　　		    if(data.code=="200"){
　　		       Tools.alertMsg("保存成功");
      	       $("#updateModal").modal("hide");
      	       $('#structuralTable').DataTable().ajax.reload();
            }else{
            	Tools.alertMsg("保存失败");
            }
         },
        error:function(){
        	Tools.alertMsg("服务器错误");
         }
   });
}

var deleteParamter=function(e){
	var tr = $(e.target).closest('tr');
	var data = $('#structuralTable').dataTable().fnGetData(tr);
	
	Tools.tipsConfirm("确定删除吗",function(){
		$.ajax({
	         type: "post",//请求方式
	         url: path+"structural/paramter/deleteParamter.action",
	         data:{
	        	 id:data.id,
	         },
	　　　　       success:function(data){
	　　		    if(data.code=="200"){
	　　		    	Tools.alertMsg("删除成功");
	      	       $('#structuralTable').DataTable().ajax.reload();
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


var fomateParam=function(callBack){
	var param={
		geologicalDescription:$("#geologicalDescription").val(),
		towerType:$("#towerType").val(),
		angleLY:$("#angleLY").val()	
	}
	$.ajax({
        type: "post",//请求方式
        url: path+"structural/paramter/getParamterBydData.action",
        data:{
       	   param:JSON.stringify(param),
        },
　　　        success:function(data){
　　　        	    var flag=false;
　		    if(data.code=="200"){
　		    	flag=true;
            }
　		    callBack(flag);
        }
  });
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
			url : path + "structural/paramter/importExcel.action",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			data:{
				projectId:$("#projectName").val()
			},
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