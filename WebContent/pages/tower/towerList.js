/**
 * 筛选杆塔 js
 */

$(function(){	
	//初始化项目
	initProject();
	
	//项目切换
	$("#projectName").on("change",function(){
		towerList=[];
		$('#towerTable').DataTable().ajax.reload();
	})
	
	//选择筛选的数据
	$(document).delegate(".check_tower","click",function(e){
		var check=$(this).is(":checked");
		var tr = $(e.target).closest('tr');
		var data = $('#towerTable').dataTable().fnGetData(tr);
		if(check){
			towerList.push(data);
		}
		else{//删除这个数据
			removeAaary(towerList,data);
			console.log(towerList);
		}
	});
	
	//点击筛选按钮
	$("#tower_add").on("click",function(){
		var projectId=$("#projectName").val();
		if(towerList.length>0){
			var screenData=JSON.stringify(towerList);
			$.ajax({
				type : 'post',
				url : path + '/merge/addTowerScreen.action',
				data:{
					"projectId":projectId,
					"screenData":screenData
				},
				success : function(data) {
					if(data){
						location.href=path+"merge/turnToTowerMerge.action?projectId="+projectId;
					}
				}
			})
			
		}
		else{
			$.ajax({
				type : 'post',
				url : path + '/merge/getTowerScreenInfo.action',
				data:{
					"projectId":projectId
				},
				success : function(data) {
					if(data.code=="300"){
						location.href=path+"merge/turnToTowerMerge.action?projectId="+projectId;
					}
					else{

						Tools.alertMsg("请选择杆塔信息");
					}
				}
			})
		}
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
//需要筛选的杆塔信息
var towerList=[];

/**
 * 初始化项目下拉框
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
			initTable();
		}
	})
}

/**
 * 杆塔信息表格
 * @returns
 */
function initTable(){
	var colum = [
		{
			"data" : "number",
			"render":function(data){
				var str="";
				    str+= '<input type="checkbox" class="check_tower">';
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
	
	$('#towerTable').DataTable({
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
			 data["id"]=$("#projectName").val();
			 $.ajax({
		            type: "post",//请求方式
		            url: path+"/towerLoad/getTowerList.action",
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
