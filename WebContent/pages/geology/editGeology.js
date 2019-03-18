/**
 * 地质
 * @returns
 */

var stratigraphicArr=[]; //地层名称下拉框

function editGeology(){
	
	initProject();
	//初始化地层名称，杆塔编号，岩土物理学指标数据
	initConfigureData();
	
	//项目切换
	$("#projectName").on("change",function(){
		$('#editGeology_table').DataTable().ajax.reload();
		$('#editGeology_table2').DataTable().ajax.reload();
		initTowerNum();
	})
	//点击查询按钮
	$("#searchBtn").on("click",function(){
		$('#editGeology_table').DataTable().ajax.reload();
		$('#editGeology_table2').DataTable().ajax.reload();
	})
	
	//选中添加模态窗的杆塔编号select框时，触发的事件
	$("#towerNum1").on("change",function(){
		var index =$("#towerNum1").find("option:selected").attr("data-index");
		$("#sortno").val(index);
	});
	
	//选中地层名称select框时，触发的事件
	$(document).delegate("#stratigraphicName1","change",getGeotechnicalInfo1);
	$(document).delegate("#stratigraphicName","change",getGeotechnicalInfo);
	
	//选中删除按钮
	$("#editGeology_delete").on("click", this.deleteeditGeology);
	
	//选中编辑按钮
	$("#editGeology_update").on("click", this.updateEditGeology);
	
	//添加按钮
	$("#editGeology_add").on("click", this.addEditGeology);
	
    //添加保存事件
	$("#addSubmitBtn").on("click", function(){
		saveAddEditGeology();
	});
    //修改保存事件
	$("#updateSubmitBtn").on("click", function(){
		saveUpdateEditGeology();
	});
	
    //行点击事件
	$("#editGeology_table").delegate("tbody tr","click",this.clickTr);
	
    //提交事件
	$("#editGeology_submit").on("click", function(){
		saveEditGeology();
	});
	
	//导出 editGeology_improt
	$("#editGeology_improt").on("click", this.improtGeology);
	
	// 数据导入按钮点击事件
	$("#editGeology_import").on('click', function(){
		$('#uploadify').click();
	});
	//上传change事件
	$("#uploadify").on("change",uploadFile);
}


/**
 * 初始化项目
 * @returns
 */
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
			initTowerNum();
			//初始化表格
			initTable();
			initTable2();
		}
	})
}


/*
 * 初始化杆塔编号下拉框
 */
var initTowerNum= function(){
	$.ajax({
        type: "post",//请求方式
        //async:false, //！！！同步请求
        url: path+"geology/findTowerNum.action",
        data:{
        	"id":$("#projectName").val()
        },
        dataType: "json",
　　　         success: function(data){
　　　        	    var towerNum="<option value='' selected='selected'>-请选择-</option>";
　　　        	     for(var i=0;i<data.length;i++){
　　　           		towerNum += "<option data-index="+i+" value="+data[i]+">"+data[i]+"</option>";
　　　           	 }
　　　                   $("#towerNum1").html(towerNum);
　　　          
        }
  });
}

/*
 * 初始化地层名称
 */
var initConfigureData= function(){
	//杆塔编号
	$.ajax({
        type: "post",//请求方式
        async:false, //！！！同步请求
        url: path+"geology/queryStratigraphicName.action",
        dataType: "json",
　　　         success: function(data){
　　　        	          stratigraphicArr=stratigraphicArr.concat(data.geologicalScheduleConfigure);
　　　        	         var stratigraphicNameSelect = "<option value='' selected='selected'>-请选择-</option>";
          	 		for(var i=0;i<stratigraphicArr.length;i++){
         				var gsc=stratigraphicArr[i];
         					stratigraphicNameSelect += "<option data='"+JSON.stringify(gsc)+"' value="+gsc.ID+"  >"+gsc.stratigraphicName+"</option>";
         	 		}
          	 		$("#stratigraphicName").html(stratigraphicNameSelect);
                    $("#stratigraphicName1").html(stratigraphicNameSelect);	
　　　           	 }
    });	
}


/*
 * 行点击事件
 */
editGeology.prototype.clickTr = function(){
 $(this).addClass('active').siblings().removeClass('active').end();
}

/*
 * 初始化表格
 */
var initTable = function(){
	var colum = [
		   {
			"data" : "towerNum",    //杆塔编号
		  }, {
			"data" : "towerLocation"  //杆塔位置
		},  {
			"data" : "explorationBasis",  //勘探依据
			"render":function(data){
				var explorationBasisText=["钻孔","小麻花钻","静力触探","地质调查","小麻花钻+地质调查","静力触探+地质调查"];
				
			    return 	explorationBasisText[data-1];	
			}  
		},{
			"data" : "stratigraphicName",//地层名称 getStratumNameSelect
			"render":function(data){
	　　           	 		for(var i=0;i<stratigraphicArr.length;i++){
	　　           				var gsc=stratigraphicArr[i];　           				
	　　           				if(data == gsc.ID){
	　　           					stratigraphicName=gsc.stratigraphicName;
	　　           				}
	　　           	 		}
	　　           	 		return stratigraphicName;
				}
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
			"render":function(){return "";}  //图片
		},{
			"data" : "illustrate" //说明
		},{
			"data" : "surveyPointLocation",  //勘测点位置
		},{
			"data" : "waterLevel"  //地下水位埋深（m）
		},{
			"data" : "resistivity",  //电阻率
	    },{
		    "data" : "stratigraphicState",  //地层状态
		  },
		   {
			"data" : "remark",  //备注
      }] 
	

	$("#editGeology_table").DataTable({
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
			  data["projectId"]=$("#projectName").val();
			  $.ajax({
		            type: "post",//请求方式
		            url: path+"geology/getSchedulePage.action",
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
 * 合并单元格
 * @returns
 */
function  mergeTable(){
	
}


var getGeotechnicalInfo= function(){
	//获取地层名称下拉框自定义属性的值
	var data =$("#stratigraphicName").find("option:selected").attr("data");
	if(data!=""&&data!=null){
		data=JSON.parse(data);
	}
	$("#geotechnicalDescription").val(data.geotechnicalDescription);//岩土描述
	$("#gravityDensity").val(data.gravityDensity); //重力密度
	$("#cohesion").val(data.cohesion); //黏聚力
	$("#internalFrictionAngle").val(data.internalFrictionAngle);//内摩擦角
	$("#eigenvalueCapacity").val(data.eigenvalueCapacity);//承载力特征值
	$("#standardSideResistance").val(data.standardSideResistance);//桩的极限侧阻力标准值
	$("#standardEndResistance").val(data.standardEndResistance); //桩的极限端阻力标准值
	$("#stratigraphicState").val(data.stratigraphicState); //地层状态
	
}

var getGeotechnicalInfo1= function(){
	//获取地层名称下拉框自定义属性的值
	var data =$("#stratigraphicName1").find("option:selected").attr("data");
	if(data!=""&&data!=null){
		data=JSON.parse(data);
	}
	$("#geotechnicalDescription1").val(data.geotechnicalDescription);//岩土描述
	$("#gravityDensity1").val(data.gravityDensity); //重力密度
	$("#cohesion1").val(data.cohesion); //黏聚力
	$("#internalFrictionAngle1").val(data.internalFrictionAngle);//内摩擦角
	$("#eigenvalueCapacity1").val(data.eigenvalueCapacity);//承载力特征值
	$("#standardSideResistance1").val(data.standardSideResistance);//桩的极限侧阻力标准值
	$("#standardEndResistance1").val(data.standardEndResistance); //桩的极限端阻力标准值
	$("#stratigraphicState1").val(data.stratigraphicState); //地层状态
	
}

/**
 * 点击添加按钮
 */
editGeology.prototype.addEditGeology = function(){
	clearAddEditGeology();
	$("#addModal").modal("show");
}

/**
 * 清楚模态窗的信息
 */
var clearAddEditGeology = function(){
	$("#towerLocation1").val("");
	$("#explorationBasis1").val("");
	$("#stratigraphicName1").val("");
	$("#floorDepth1").val("");
	$("#geotechnicalDescription1").val("");
	$("#gravityDensity1").val("");
	$("#cohesion1").val("");
	$("#internalFrictionAngle1").val("");
	$("#eigenvalueCapacity1").val("");
	$("#standardSideResistance1").val("");
	$("#standardEndResistance1").val("");
	$("#illustrate1").val("");
	$("#surveyPointLocation1").val("");
	$("#waterLevel1").val("");
	$("#remark1").val("");
	$("#resistivity1").val("");
	$("#stratigraphicState1").val("");
	$("#projectId1").val($("#projectName").val());
	$("#sortno1").val("");
}

/**
 * 保存添加的信息
 */
var saveAddEditGeology = function(){
	var data=new Object();
	data.towerNum=$("#towerNum1").val();
	data.towerLocation=$("#towerLocation1").val();
	data.explorationBasis=$("#explorationBasis1").val();
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
	data.waterLevel=$("#waterLevel1").val();
	data.remark=$("#remark1").val();
	data.resistivity=$("#resistivity1").val();
	data.stratigraphicState=$("#stratigraphicState1").val();
	data.projectId=$("#projectName").val();
	data.sortno=$("#sortno").val();
	
	saveEditGeologyInfo(data,"add","addModal");
}

/**
 * 点击编辑按钮
 */
editGeology.prototype.updateEditGeology = function(){
	var trs = $("#editGeology_table tbody tr.active");
	var tr = trs.eq(0).closest('tr');
	if(tr.length==0){
		Tools.alertMsg("请点击需要修改的行");
		return;
	}
	var data = $('#editGeology_table').dataTable().fnGetData(tr);
	$("#towerNum").val(data.towerNum);   //杆塔编号
	$("#towerLocation").val(data.towerLocation); //杆塔位置
	$("#explorationBasis").val(data.explorationBasis);//勘探依据
	$("#stratigraphicName").val(data.stratigraphicName); //地层名称
	$("#floorDepth").val(data.floorDepth); //层底深度
	$("#geotechnicalDescription").val(data.geotechnicalDescription);//岩土描述
	$("#gravityDensity").val(data.gravityDensity); //重力密度
	$("#cohesion").val(data.cohesion); //黏聚力
	$("#internalFrictionAngle").val(data.internalFrictionAngle);//内摩擦角
	$("#eigenvalueCapacity").val(data.eigenvalueCapacity);//承载力特征值
	$("#standardSideResistance").val(data.standardSideResistance);//桩的极限侧阻力标准值
	$("#standardEndResistance").val(data.standardEndResistance); //桩的极限端阻力标准值
	$("#illustrate").val(data.illustrate);//说明
	$("#surveyPointLocation").val(data.surveyPointLocation);//勘探点位置
	$("#waterLevel").val(data.waterLevel);//地下水位类型埋深
	$("#remark").val(data.remark);//备注
	$("#resistivity").val(data.resistivity);//电阻率
	$("#stratigraphicState").val(data.stratigraphicState);//地层状态
	$("#projectId").val($("#projectName").val());//工程id
	$("#geoId").val(data.id);//主键
	
	$("#updateModal").modal("show");
}

/**
 * 保存添加的信息
 */
var saveUpdateEditGeology = function(){
	var data=new Object();
	data.id=$("#geoId").val();
	data.towerNum=$("#towerNum").val();
	data.towerLocation=$("#towerLocation").val();
	data.explorationBasis=$("#explorationBasis").val();
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
	data.waterLevel=$("#waterLevel").val();
	data.remark=$("#remark").val();
	data.resistivity=$("#resistivity").val();
	data.stratigraphicState=$("#stratigraphicState").val();
	data.projectId=$("#projectName").val();
	
	saveEditGeologyInfo(data,"update","updateModal");
}

/*
 * 提交
 */
var saveEditGeologyInfo = function(data,type,modalId){
	// 遍历所有的table数据	
	var dataList=[];
        dataList.push(data);
	
	var param={
		"list":dataList,
		"type":type
	};
	var url = path+"geology/save.action";
	$.ajax({
        type: "post",//请求方式
        url: url,
        data:{
        	param:JSON.stringify(param),
        },
        dataType: "json",
　　　         success: function(data){
           if( !Tools.isEmpty(data) ){
        	   alert("提交成功");
        	   $('#editGeology_table').DataTable().ajax.reload();
        	   $('#editGeology_table2').DataTable().ajax.reload();
        	   $("#"+modalId+"").modal("hide");
           }else{
        	   alert("提交失败");
           }
        },
        error:function(){
        	   alert("服务器错误");
        }
  });
	
	
}

/*
 * 移除选中行
 */
editGeology.prototype.deleteeditGeology = function(){
	var trs = $("#editGeology_table tbody tr.active");
	var tr = trs.eq(0).closest('tr');
	var data = $('#editGeology_table').dataTable().fnGetData(tr);
	var ID = data.id;
	var msg = "你确定要删除当前编号吗？";
	var url =  path + "geology/deleteEditGeological.action";   	
    	if(confirm(msg) == false){
    		return false
    	}
    	$.ajax({
		    type: "post",//请求方式
            url: url,
            data:{"ID":ID},
            dataType: "json",
		    "success": function(data){
				if(!Tools.isEmpty(data) ){
					alert("删除成功");
					$('#editGeology_table').DataTable().ajax.reload();
					$('#editGeology_table2').DataTable().ajax.reload();
				}else{
					alert("删除失败");
				}
				
		}
	});
}



/*
 * 导出
 */
editGeology.prototype.improtGeology = function(){
	var url = path+"geology/getCountByParam.action";
	$.ajax({
        type: "post",//请求方式
        url: url,
        dataType: "json",
        data:{
        	id:$("#projectName").val()
        },
　　　         success: function(data){
        var table=getCountTable(data);
        var p=getCountText(data);
   		var doc="";
		doc+="<table style='border:1px solid;'>";
		var html=document.getElementById("editGeology_table2").innerHTML;
		doc+=html;
		doc+="</table>";
		doc+=table;
		doc+=p;
		var docFile="<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:"+doc+"' xmlns='http://www.w3.org/TR/REC-html40'>";
		docFile=docFile+"<head><style>tr td{border:1px solid;margin:0px;}</style></head>"+doc+"</body></html>";
		var base64data="base64,"+window.btoa(unescape(encodeURIComponent(docFile)));
		window.open('data:application/msword;'+ base64data);
        },
        error:function(){
        	   alert("服务器错误");
        }
  });
		  
}


function getCountTable(data){
	var table="<table style='border:1px solid;'>";
	    table+="<thead>";
	    table+="<tr>";
	    table+="<td rowspan='2' >总塔数(基)</td>";
	    table+="<td colspan='2'>钻孔</td>";
	    table+="<td colspan='2'>小麻花钻</td>";
	    table+="<td colspan='2'>静力触探</td>";
	    table+="<td >地质调查</td>";
	    table+="</tr>";
	    table+="<tr>";
	    table+="<td>孔数(个)</td>";
	    table+="<td>进尺(m)</td>";
	    table+="<td>孔数(个)</td>";
	    table+="<td>进尺(m)</td>";
	    table+="<td>孔数(个)</td>";
	    table+="<td>进尺(m)</td>";
	    table+="<td>(点)</td>";
	    table+="</tr>";
	    table+="</thead>";
	    table+="<tbody>";
	    table+="<tr>";
	    table+="<td>"+data.count_towerNum+"</td>";
	    table+="<td>"+data.count_basis1+"</td>";
	    table+="<td>"+formateData(data.count_basis11)+"</td>";
	    table+="<td>"+data.count_basis2+"</td>";
	    table+="<td>"+Number(data.count_basis2)*5+"</td>";
	    table+="<td>"+data.count_basis3+"</td>";
	    table+="<td>"+formateData(data.count_basis33)+"</td>";
	    table+="<td>"+data.count_basis4+"</td>";
	    table+="</tr>";
	    table+="</tbody>";
	    table+="</table>";
	    return table;
}

function getCountText(data){
	var p="<table style='border:1px solid;'>";
	    p+="<tr><td>岩土工程分析与评价</td></tr>"
	if(!Tools.isEmpty(data.stratigraphicName)){
		var list=data.stratigraphicName;
		for(var i=0;i<list.length;i++){
			if(list[i].stratigraphicState!=""&&list[i].stratigraphicState!=null){
				p+="<tr><td>"+list[i].stratigraphicState+":"+list[i].geotechnicalDescription+"</td></tr>";				
			}
		}
	}
	p+="</table>"
    return p;
}

function formateData(data){
	if(data==null||data==""||data==undefined){
		return 0
	}
	return data;
}


/*
 * 初始化表格
 */
var initTable2= function(){
	var colum = [
		   {
			"data" : "towerNum",    //杆塔编号
		}, {
			"data" : "towerLocation"  //杆塔位置
		},  {
			"data" : "explorationBasis",  //勘探依据
			"render":function(data){
				var explorationBasisText=["钻孔","小麻花钻","静力触探","地质调查","小麻花钻+地质调查","静力触探+地质调查"];
			    return 	explorationBasisText[data-1];	
			}  
		},{
			"data" : "stratigraphicName",//地层名称 getStratumNameSelect
			"render":function(data){
　　           	 		for(var i=0;i<stratigraphicArr.length;i++){
　　           				var gsc=stratigraphicArr[i];　           				
　　           				if(data == gsc.ID){
　　           					stratigraphicName=gsc.stratigraphicName;
　　           				}
　　           	 		}
　　           	 		return stratigraphicName;
			}
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
			"render":function(){
				return "";
				}  //图片
		},{
			"data" : "illustrate"  //说明
		},{
			"data" : "surveyPointLocation"  //勘测点位置
		},{
			"data" : "waterLevel" //地下水位埋深（m）
		},{
			"data" : "resistivity",  //电阻率
	    },
	   /* {
		    "data" : "stratigraphicState",  //地层状态
		    },*/
		    {
			"data" : "remark"  //备注
      }] 
	

	$("#editGeology_table2").DataTable({
		"bDestroy": true,// 刷新数据
		"language": dataTableLang,//语言	
		"searching" : false,
		"autoWidth":false,//自适应宽度
		"paginate": true,
		"bSort": false,//排序?
		"bProcessing": false,
		"paging" : false,//是否分页
		"bServerSide": false,//服务器端分页
		"bInfo" : false,// 页脚信息
		"pageLength" :25,//每页显示的条数
		"columns" : colum,//对应列
		"ajax":function(data, callback, settings){
			  data["projectId"]=$("#projectName").val();
			  $.ajax({
		            type: "post",//请求方式
		            url: path+"geology/getSchedulePage2.action",
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
			url : path + "/geology/importExcel.action",
			contentType : "application/x-www-form-urlencoded; charset=utf-8",
			data:{
				id:$("#projectName").val()
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
				$('#editGeology_table').DataTable().ajax.reload();
				$('#editGeology_table2').DataTable().ajax.reload();
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