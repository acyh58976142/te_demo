/**
 * 地质参数js
 */
$(function(){

	getConfigureData();
	
	//点击查询按钮
	$("#geo_search").on("click",function(){
		$('#geoTable').DataTable().ajax.reload();
	})
	
	 //行点击事件
	$("#geoTable").delegate("tbody tr", "click",clickTr);
	
	//点击添加按钮
	$("#geo_add").on("click",function(){
		showAddParam();
	});
	//点击添加模态窗的保存按钮
	$("#addSubmitBtn").on("click",setAddParam);
	
	//点击编辑按钮
	$(document).delegate(".paramter_Update","click",function(e){
		updateParam(e);
	});
	
	//点击保存按钮
	$("#updateSubmitBtn").on("click",saveUpdateParamter);
	
	//点击删除按钮
	$(document).delegate(".paramter_Delete","click",function(e){
		deleteParamter(e);
	});

})

/*
 * 行点击事件
 */
var clickTr = function(){
	 $(this).addClass('active').siblings().removeClass('active').end();
}

var getConfigureData= function() {
	$.ajax({
        type: "post",//请求方式
        url: path+"geology/queryStratigraphicName.action",
        dataType: "json",
　　　         success: function(data){
　　　        	     var state = "<option value='' selected='selected'>-请选择-</option>";
　　　        	     var list=uniqueList(data.geologicalScheduleConfigure);
　　　           	 for(var i=0;i<list.length;i++){
　　　           		var gsc=list[i]; 
　　　           		state += "<option value="+gsc.stratigraphicState+">"+gsc.stratigraphicState+"</option>";
　　　           	 }
　　　                 $("#configureState").append(state);
　　　                 initTable();
        }
  });
}

function uniqueList(array){
	  var r = [];
	  for(var i = 0, l = array.length; i < l; i++) {
	    for(var j = i + 1; j < l; j++)
	      if (array[i].stratigraphicState === array[j].stratigraphicState) j = ++i;
	    r.push(array[i]);
	  }
	  return r;
	}

/**
 * 初始化表格
 * @returns
 */
function initTable(){

	var colum = [
		   {
			"data" : "numNo",    //序号
		  },{
			"data" : "stratigraphicName",
		}, {
			"data" : "floorDepth" //层底深度（m）
		}, {
			"data" : "geotechnicalDescription"   //岩土表述
			 
		},{
			"data" : "gravityDensity"  //重力密度r（kN/m³）
		},{ 
			"data" : "cohesion"  //粘聚力C（kPa）
		},{
			"data" : "internalFrictionAngle"  //内摩擦角φ（°）
		},{
			"data" : "eigenvalueCapacity"  //承载力特征值fak（kPa）
		},{
			"data" : "standardSideResistance"  //桩的极限侧阻力标准值qsik（kPa）
		},{
			"data" : "standardEndResistance"  //桩的极限端阻力标准值qpk（kPa）
		},{
		    "data" : "stratigraphicState",  //地层状态
		  },{
				"data" : "id",
				"render":function(data){
					var str="";
					    str+= '<a href="javascript:void(0)" class="paramter_Update"  title="编辑"><span class="glyphicon glyphicon-edit"></span></a>';
					    str+= '<a href="javascript:void(0)" class="paramter_Delete"   title="删除" style="color: #fc0543;margin-left:4px;"><span class="glyphicon glyphicon-trash"></span></a>';
					    return  str;
				}
		      }
		] 
	

	$("#geoTable").DataTable({
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
		"pageLength" :15,//每页显示的条数
		"columns" : colum,//对应列
		"ajax":function(data, callback, settings){
			data["stratigraphicName"]=$("#ConfigureName").val();
			data["stratigraphicState"]=$("#configureState").val();
			  $.ajax({
		            type: "post",//请求方式
		            url: path+"geology/getConfigurePage.action",
		            dataType: "json",
		            data:data,
		　　　　　　　     success: function(data){
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



/**
 * 点击添加按钮
 */
var showAddParam=function(){
	clearAddParam();
	$("#addModal").modal("show");
}

/**
 * 清楚添加的模态窗的数据
 */
var clearAddParam=function(){
	$("#stratigraphicName1").val(''); //地层名称
	$("#floorDepth1").val(''); //层底深度
	$("#geotechnicalDescription1").val('');//岩土描述
	$("#gravityDensity1").val(''); //重力密度
	$("#cohesion1").val(''); //黏聚力
	$("#internalFrictionAngle1").val('');//内摩擦角
	$("#eigenvalueCapacity1").val('');//承载力特征值
	$("#standardSideResistance1").val('');//桩的极限侧阻力标准值
	$("#standardEndResistance1").val(''); //桩的极限端阻力标准值
	$("#stratigraphicState1").val('');//地层状态
}

/**
 * 获取添加的模态窗的数据
 */
var setAddParam=function(){
	var data=new Object();
	data.stratigraphicName=$("#stratigraphicName1").val();
	data.floorDepth=$("#floorDepth1").val();
	data.geotechnicalDescription=$("#geotechnicalDescription1").val();
	data.gravityDensity=$("#gravityDensity1").val();
	data.cohesion=$("#cohesion1").val();
	data.internalFrictionAngle=$("#internalFrictionAngle1").val();
	data.eigenvalueCapacity=$("#eigenvalueCapacity1").val();
	data.standardSideResistance=$("#standardSideResistance1").val();
	data.standardEndResistance=$("#standardEndResistance1").val();
	data.illustrate=$("#illustrate1").val();
	data.surveyPointLocation=$("#surveyPointLocation1").val();
	data.stratigraphicState=$("#stratigraphicState1").val();
	
	saveParamter(data,"addModal");
}


/*
 * 显示修改页面的参数信息
 */
var updateParam=function(e){
	var tr = $(e.target).closest('tr');
	var data = $('#geoTable').dataTable().fnGetData(tr);
	$("#stratigraphicName").val(data.stratigraphicName); //地层名称
	$("#floorDepth").val(data.floorDepth); //层底深度
	$("#geotechnicalDescription").val(data.geotechnicalDescription);//岩土描述
	$("#gravityDensity").val(data.gravityDensity); //重力密度
	$("#cohesion").val(data.cohesion); //黏聚力
	$("#internalFrictionAngle").val(data.internalFrictionAngle);//内摩擦角
	$("#eigenvalueCapacity").val(data.eigenvalueCapacity);//承载力特征值
	$("#standardSideResistance").val(data.standardSideResistance);//桩的极限侧阻力标准值
	$("#standardEndResistance").val(data.standardEndResistance); //桩的极限端阻力标准值
	$("#stratigraphicState").val(data.stratigraphicState);//地层状态
	$("#paramid").val(data.id);//主键;
	$("#updateModal").modal("show");
}

/**
 * 保存修改的参数信息
 */
var saveUpdateParamter=function(){
	var data=new Object();
	var data=new Object();
	data.id=$("#paramid").val();
	data.stratigraphicName=$("#stratigraphicName").val();
	data.floorDepth=$("#floorDepth").val();
	data.geotechnicalDescription=$("#geotechnicalDescription").val();
	data.gravityDensity=$("#gravityDensity").val();
	data.cohesion=$("#cohesion").val();
	data.internalFrictionAngle=$("#internalFrictionAngle").val();
	data.eigenvalueCapacity=$("#eigenvalueCapacity").val();
	data.standardSideResistance=$("#standardSideResistance").val();
	data.standardEndResistance=$("#standardEndResistance").val();
	data.illustrate=$("#illustrate").val();
	data.surveyPointLocation=$("#surveyPointLocation").val();
	data.stratigraphicState=$("#stratigraphicState").val();
	
	saveParamter(data,"updateModal");
}


//保存参数信息
var saveParamter = function(data,modalId){

	var url = path+"geology/saveGeologyConfigure.action";
	$.ajax({
      type: "post",//请求方式
      url: url,
      data:{
      	param:JSON.stringify(data),
      },
      dataType: "json",
　         success: function(data){
         if(data.code=="200"){
      	   Tools.alertMsg("保存成功");
    	       $("#"+modalId+"").modal("hide");
    	       $('#geoTable').DataTable().ajax.reload();
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
 * 删除结构参数信息
 */
var deleteParamter=function(e){
	var tr = $(e.target).closest('tr');
	var data = $('#geoTable').dataTable().fnGetData(tr);
	
	Tools.tipsConfirm("确定删除吗",function(){
		$.ajax({
	         type: "post",//请求方式
	         url: path+"geology/deleteConfigure.action",
	         data:{
	        	 id:data.id,
	         },
	　　　　       success:function(data){
	　　		    if(data.code=="200"){
	　　		    	Tools.alertMsg("删除成功");
	      	       $('#geoTable').DataTable().ajax.reload();
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