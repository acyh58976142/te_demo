/**
 * 筛选后的杆塔js
 */
//需要删除的杆塔信息
var towerDeleteList=[];
//需要归并的杆塔信息
var towerMergeList=[];
//归并后得信息
var mergeList=[];


$(function(){
	//获取杆塔明细表信息
	getTowerInfo();	
	//获取组配件明细表的数据
	getPartsInfo();
	//初始化筛选的表格
	initScreenTable();	


	//返回按钮
	$("#tower_return").on("click",function(){
		location.href =path + "pages/tower/towerList.jsp";
	})
	
	//选择归并的数据
	$(document).delegate(".check_towerMerge","click",function(e){
		var check=$(this).is(":checked");
		var tr = $(e.target).closest('tr');
		var data = $('#towerScreenTable').dataTable().fnGetData(tr);
		if(check){
			towerMergeList.push(data);
		}
		else{//删除这个数据
			removeAaary(towerMergeList,data);
			console.log(towerMergeList);
		}
	});
	
	//选择删除的数据
	$(document).delegate(".check_towerDelete","click",function(e){
		var check=$(this).is(":checked");
		var tr = $(e.target).closest('tr');
		var data = $('#towerMergeTable').dataTable().fnGetData(tr);
		if(check){
			towerDeleteList.push(data);
		}
		else{//删除这个数据
			removeAaary(towerDeleteList,data);
			console.log(towerDeleteList);
		}
	});
	
	//点击归并按钮
	$("#mergeSubmitBtn").on("click",function(){
		if(towerMergeList.length>0){
			getTowerDataByNum();
		}
		else{
			Tools.alertMsg("请选择需要归并的杆塔信息");
		}
	})
	
	//点击删除按钮
	$("#deleteSubmitBtn").on("click",function(){
		if(towerDeleteList.length>0){
			deleteTowerMerge();
		}
		else{
			Tools.alertMsg("请选择需要删除的归并信息");
		}
	})
	
	//点击归并弹窗得确定按钮
	$("#saveSubmitBtn").on("click",function(){
		var name=$("#merge_name").val();
		var cond_type=$("#conductor_type").val();
		if(name==""){
			Tools.alertMsg("请输入归并名称");
			return;
		}
		if(cond_type==""){
			Tools.alertMsg("暂未获取到导线型号，请查看组配件明细表");
			return;
		}
		saveTowerMerge();
	})
	
	//点击荷载计算
	$(document).delegate(".tower_calculate","click",function(e){
		var tr = $(e.target).closest('tr');
		var data = $('#towerMergeTable').dataTable().fnGetData(tr);
		location.href =location.href=path+"merge/turnToTowerLoad.action?projectId="+projectId+"&mergeId="+data.id;
	})
	
})

/**
 * 删除数组里面得数据
 * @param _arr
 * @param _obj
 * @returns
 */
function removeAaary(_arr, _obj) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i] == _obj) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            }
            else if (i == length - 1) {
                _arr.pop();  //删除并返回数组的最后一个元素
                return _arr;
            }
            else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
}

/**
 * 初始化筛选的表格
 * @returns
 */
function initScreenTable(){
	var colum = [
		{
			"data" : "number",
			"render":function(data){
				var str="";
				    str+= '<input type="checkbox" class="check_towerMerge" value="'+data+'">';
				    return  str;
			}
	      },
		{   
			"data" : "towerNum"
		}, {
			"data" : "towerMileage"
		},{
			"data" : "towerType"
		},  {
			"data" : "towerGao"
		}, {
			"data" : "turnAngle" 
		}] 
	
	$('#towerScreenTable').DataTable({
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
		"ajax": function(data,callback,settings){
			 data["projectId"]=projectId;
			 $.ajax({
		            type: "post",//请求方式
		            url: path+"/merge/getTowerScreen.action",
		            data:data,
		　　　　　　　     success:function(data){
		　　　　　		   if(Tools.isEmpty(data.aaData)){
		　　　　			callback(Tools.nullDataTable());
		　　　　			return;
		　　　　		   }
		　　　　		   callback(data);
		　　　　		   	//初始化归并的表格
		　　　　			initMergeTable();
		　　　　	  }
		      });
		}	
	});
}


/**
 * 归并的表格数据
 * @returns
 */
function initMergeTable(){
	var colum = [
		{
			"data" : "id",
			"render":function(data){
				var str="";
				    str+= '<input type="checkbox" class="check_towerDelete">';
				    return  str;
			}
	     },
		{
			"data" : "merge_name"
		}, {
			"data" : "f_max"
		},{
			"data" : "f_min"
		},  {
			"data" : "g_max"
		}, {
			"data" : "g_min" 
		},  {
			"data" : "j_max"
		}, {
			"data" : "j_min" 
		},  {
			"data" : "jumper_f"
		}, {
			"data" : "jumper_g" 
		}, {
			"data" : "k_angle" 
		}, {
			"data" : "towerData" ,
			"render":function(data){
				var str='<button type="button" class="btn btn-primary tower_calculate" >荷载计算</button>';
				return  str;
			}
		}
		] 
	
	$('#towerMergeTable').DataTable({
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
		"ajax": function(data,callback,settings){
			 data["projectId"]=projectId;
			 $.ajax({
		            type: "post",//请求方式
		            url: path+"/merge/getTowerMerge.action",
		            data:data,
		　　　　　　　     success:function(data){
		　　　　　		   if(Tools.isEmpty(data.aaData)){
		　　　　			callback(Tools.nullDataTable());
		　　　　			return;
		　　　　		   }
		　　　　		   callback(data);
		　　　　		   diableScreen();
		　　　　	  }
		      });
		}		
	});
}

/**
 * 设置筛选数据中归并的样式：disabled
 * @returns
 */
function diableScreen(){
	var dataList=getTableDatas();
	if(dataList.length>0){
		for(var i=0;i<dataList.length;i++){
			var tower=dataList[i].towerData;
			 $.each(JSON.parse(tower),function(i,obj){
				 towerData.push(obj);
			 })			
		}
	//	towerData=JSON.parse(towerData);
		var element=$(".check_towerMerge");
		 $.each(element,function(i,obj){
		   if(MergeTowerNum($(obj).val())){
  			   $(obj).attr("disabled","disabled");
  			   $(obj).attr("checked","checked");
  			   $($(obj).parents().parents()[0]).addClass("common_checked_tr");
  		   }
         })
         
         towerData=[];
	}
	
}

function getTableDatas() { 
	var salesDetailTable = new $.fn.dataTable.Api('#towerMergeTable'); 
	var length = salesDetailTable.rows().data().length;
	var list = [];
	for (var i = 0; i < length; i++) { 
		list.push(salesDetailTable.rows().data()[i]); 
		}
	return list; 
}



var column_a=[];//杆塔编号
var column_b=[];//里程
var column_c=[];//杆塔形式
var column_d=[];//杆塔定位呼高
var column_e=[];//档距
var column_f=[];//水平档距
var column_g=[];//垂直档距
var column_h=[];//设计施工基面升降
var column_i=[];//耐张段长
var column_j=[];//代表档距
var column_k=[];//转角角度

/**
 * 获取杆塔数据
 * @returns
 */
function getTowerInfo(){
	 $.ajax({
         type: "post",//请求方式
         url: path+"/towerLoad/getTowerInfo.action",
         data:{
        	 id:projectId
         },
　　　　       success:function(data){
　　		   var tower=data.data;
　　		       column_a=JSON.parse(tower.column_a);
　　		       column_b=JSON.parse(tower.column_b);
　　		       column_c=JSON.parse(tower.column_c);
　　		       column_d=JSON.parse(tower.column_d);
　　		       column_e=JSON.parse(tower.column_e);
　　		       column_f=JSON.parse(tower.column_f);
　　		       column_g=JSON.parse(tower.column_g);
　　		       column_h=JSON.parse(tower.column_h);
　　		       column_i=JSON.parse(tower.column_i);
　　		       column_j=JSON.parse(tower.column_j);
　　		       column_k=JSON.parse(tower.column_k);
　	  }
   });
}

var parts_a=[];//杆塔编号
var parts_af=[];//导线型号

/**
 * 获取组配件明细表数据
 * @returns
 */
function getPartsInfo(){
	 $.ajax({
         type: "post",//请求方式
         url: path+"/towerLoad/getPartsInfo.action",
         data:{
        	 id:projectId
         },
　　　　       success:function(data){
　　		   var parts=data.data;
　　		       parts_a=JSON.parse(parts.column_a);
　　		       parts_af=JSON.parse(parts.column_af);
　	  }
   });
}

/**
 * 根据编号获取杆塔得信息
 * @returns
 */
function getTowerDataByNum(){
	var span=[];
	var span_f=[];
	var span_g=[];
	var span_j=[];
	var k_angle="";
	var conductor_type="";
	for(var i=0;i<towerMergeList.length;i++){
		var towerNum=towerMergeList[i].towerNum;
		var index=forEachColumn_a(towerNum);
		var index2=forEachParts_a(towerNum);
		if(index!=""){
			var obj=new Object();
			obj.b=column_b[index];
			obj.c=column_c[index];
			obj.d=column_d[index];
			obj.e=column_e[index];
			obj.f=column_f[index];
			obj.g=column_g[index];
			obj.h=column_h[index];
			obj.i=column_i[index];
			obj.j=column_j[index];
			obj.k=column_k[index];
			span.push(obj);
			span_f.push(obj.f);
			span_g.push(obj.g);
			span_j.push(obj.j);
			k_angle=obj.k;
			console.log(span);
		}
		if(index2!=""){
			conductor_type=parts_af[index2];
		}
	}
	var data=new Object();
	data.f_max=Math.round(Math.max.apply(null, span_f));
	data.f_min=Math.round(Math.min.apply(null, span_f))-1;
	data.g_max=Math.round(Math.max.apply(null, span_g));
	data.g_min=Math.round(Math.min.apply(null, span_g))-1;
	data.j_max=Math.round(Math.max.apply(null, span_j));
	data.j_min=Math.round(Math.min.apply(null, span_j))-1;
	data.conductor_type=conductor_type;
	if(k_angle==""||k_angle==null){
		data.k_angle=0;
	}
	else{
		data.k_angle=k_angle.substring(1,k_angle.length);
	}
	
	if(conductor_type==""||conductor_type==null){
		data.conductor_type="";
	}
	else{
		data.conductor_type=conductor_type;
	}

	assignmentData(data);
}

function assignmentData(data){
	$("#f_max").val(data.f_max);
	$("#f_min").val(data.f_min);
	$("#g_max").val(data.g_max);
	$("#g_min").val(data.g_min);
	$("#j_max").val(data.j_max);
	$("#j_min").val(data.j_min);
	$("#jumper_f").val(8);
	$("#jumper_g").val(8);
	$("#k_angle").val(data.k_angle);
	$("#conductor_type").val(data.conductor_type);
	$("#towerMergeModal").modal("show");
}

/**
 * 循环杆塔明细表杆塔编号
 * @returns
 */
function forEachColumn_a(towerNum){
	var index="";
	for(var i=0;i<column_a.length;i++){
        var num=column_a[i];
		if(num==towerNum){
			index = i;
			break;
		}
	}
	
	return index;
}

/**
 * 循环组配件明细表杆塔编号
 * @returns
 */
function forEachParts_a(towerNum){
	var index="";
	for(var i=0;i<parts_a.length;i++){
        var num=parts_a[i];
		if(num==towerNum){
			index = i;
			break;
		}
	}
	
	return index;
}

/**
 * 保存归并的信息
 * @returns
 */
function saveTowerMerge(){
	var mergeData=new Object();
	mergeData.merge_name=$("#merge_name").val();
	mergeData.f_max=$("#f_max").val();
	mergeData.f_min=$("#f_min").val();
	mergeData.g_max=$("#g_max").val();
	mergeData.g_min=$("#g_min").val();
	mergeData.j_max=$("#j_max").val();
	mergeData.j_min=$("#j_min").val();
	mergeData.jumper_f=$("#jumper_f").val();
	mergeData.jumper_g=$("#jumper_g").val();
	mergeData.k_angle=$("#k_angle").val();
	mergeData.conductor_type=$("#conductor_type").val();
	$.ajax({
		type : 'post',
		url : path + '/merge/addTowerMerge.action',
		data:{
			"projectId":projectId,
			"mergeData":JSON.stringify(mergeData),
			"towerData":JSON.stringify(towerMergeList)
		},
		success : function(data) {
			if(data){
				$('#towerMergeTable').DataTable().ajax.reload();
				$("#towerMergeModal").modal("hide");
				towerMergeList=[];
               var element=$(".check_towerMerge");
               $.each(element,function(i,obj){
            	   if(obj.checked){
            		   $(obj).attr("disabled","disabled");
            		   $($(obj).parents().parents()[0]).addClass("common_checked_tr");
            	   }
               })
			}
			else{
				Tools.alertMsg("归并失败");
			}
		}
	})
}

var towerData=[];

/**
 * 删除归并的信息
 * @returns
 */
function deleteTowerMerge(){	
	var mergeId=[];
	for(var i=0;i<towerDeleteList.length;i++){
		var data=towerDeleteList[i];
		mergeId.push(data.id);
		$.each(JSON.parse(data.towerData),function(i,obj){
			towerData.push(obj);
		 })	
		
	}
//	towerData=JSON.parse(towerData);
	var obj={
			mergeId:JSON.stringify(mergeId)
	};
	Tools.tipsConfirm("确定删除吗",function(){
		$.ajax({
	         type: "post",//请求方式
	         url: path+"/merge/deleteTowerMerge.action",
	         data:{
	        	 param:JSON.stringify(obj),
	         },
	　　　　       success:function(data){
	　　		    if(data){
	　　		       Tools.alertMsg("删除成功");
	      	       $('#towerMergeTable').DataTable().ajax.reload();
	      	       towerDeleteList=[];
	      	       var element=$(".check_towerMerge")
	               $.each(element,function(i,obj){
	            	   if(obj.disabled){
	            		   if(MergeTowerNum($(obj).val())){
	            			   $(obj).removeAttr("disabled");
	            			   $(obj).removeAttr("checked");
	            			   $($(obj).parents().parents()[0]).removeClass("common_checked_tr");
	            		   }
	            	   }
	               })
	               towerData=[];
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

function  MergeTowerNum(data){
	var flag=false;
	for(var i=0;i<towerData.length;i++){
		var obj=towerData[i];
		if(data==obj.number){
			flag=true;
		}
	}
	return flag;
}


/**
 * 清空数据
 * @returns
 */
function clearData(){
	column_a=[];
	column_b=[];
	column_c=[];
	column_d=[];
	column_e=[];
	column_f=[];
	column_g=[];
	column_h=[];
	column_i=[];
	column_j=[];
	column_k=[];

	towerMergeList=[];
}