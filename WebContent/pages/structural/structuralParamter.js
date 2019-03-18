/**
 * 结构基础参数
 */

var geologyDescripData=""; //地质描述
var towerTypeData="";      //杆塔类型

$(function(){	
	initProject()
	//地质描述、杆塔类型、作用力
	geologyDescrip();
	 	
	//新建一条按钮点击事件
	$("#structural_add").on("click",addStructural);
	
	//保存参数信息
	$("#structural_save").on("click",paramterSave);
	
	//返回
	$("#structural_return").on("click",function(){
		 location.href =path + "pages/structural/structuralParamterList.jsp";
	});
	
	//杆塔类型
	$(document).delegate(".towerType_select","change",function(e){
		towerType_Change(e);
	});
	
	//删除选中行
	$(document).delegate(".paramter_Delete","click",function(e){
		deleteTr(e);
	});
	
	$("#projectName").on("change",function(){
		towerType();
	});
	
    //行点击事件
	//$("#structuralTable").delegate("tbody tr", "click",clickTr);
})

/*
 * 行点击事件
 */
var clickTr = function(){
	 $(this).addClass('active').siblings().removeClass('active').end();
}

/*
 * 移除选中行
 */
var deleteTr = function(e){
	var tr = $(e.target).closest('tr');;
	tr.hide();
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
		}
	})
}

/**
 * 添加数据
 */
var addStructural=function(){
	var tr="<tr>";
	    tr+="<td>"+geologyDescripData+"</td>";  //1.地质描述
	    tr+="<td>"+towerTypeData+"</td>";  //2.杆塔类型
	    tr+="<td><input type='text' class='input_control'></td>";  //3.作用力
	    tr+="<td><select class='input_control'><option value='L'>L</option><option value='Y'>Y</option></select></td>";  //3.作用力
	    tr+="<td><input type='text' class='input_control'></td>";  //4.塔形
	    tr+="<td><input type='text' class='input_control'></td>";  //5.只数
	    tr+="<td><input type='text' class='input_control'></td>";  //6.标号
	    tr+="<td><input type='text' class='input_control'></td>";  //7.混泥土量(m³)
	    tr+="<td><input type='text' class='input_control'></td>";  //8.钢材量
	    tr+="<td><input type='text' class='input_control'></td>";  //9.地栓
	    tr+="<td><input type='text' class='input_control'></td>";  //10.标号
	    tr+="<td><input type='text' class='input_control'></td>";  //11.垫层(m³)
	    tr+="<td><input type='text' class='input_control'></td>";  //12.埋深
	    tr+="<td><input type='text' class='input_control'></td>";  //13.底板宽
	    tr+="<td><input type='text' class='input_control'></td>";  //14.立柱宽
	    tr+="<td><input type='text' class='input_control'></td>";  //15.立柱出土高(m)
	    tr+="<td><input type='text' class='input_control'></td>";  //16.基础型号
	    tr+="<td><input type='text' class='input_control'></td>";  //17.备注
	    tr+='<td><a href="javascript:void(0)" class="paramter_Delete"   title="删除" style="color: #fc0543;"><span class="glyphicon glyphicon-trash"></span></a></td>';  //17.备注
	    tr+="</tr>";
	    
	    $("#structuralBody").append(tr);
}

/**
 * 获取地质描述
 */
var geologyDescrip = function(){
	var optionData=["坚硬、硬塑","可塑","软塑","密实","中密","稍密","砾砂","粗中砂","细砂","粉砂","碎石土","碎石","岩石","淤泥","地下水"]
	geologyDescripData+="<select class='input_control geologyDescrip_select'>";
	geologyDescripData+="<option value='' selected='selected'>-请选择-</option>";		
	for(var i = 0; i < optionData.length; i++) {
		var sensor = optionData[i];
		geologyDescripData+="<option value='"+sensor+"'>"+sensor+"</option>";	
	}
	geologyDescripData+="</select>";
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


/**
 * 获取参数表的作用力
 *
 * @param num
 * @returns
 */
function formateActForce(num){
	var jsonData=[100,150,200,250,300,350,400,450,500,550,600,700,800,900,1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,3000]
    var actForce=0;
	if(!Tools.isEmpty(num)){
		for(var i=0;i<jsonData.length;i++){
	    	var num1=jsonData[i];
	    	if(num>num1){
	    	}
	    	else{
	    		actForce=num1;
	    		return actForce;
	    	}
	    }
	}	
	return actForce;
}

//选择杆塔型号后 获取作用力
var towerType_Change=function(e){
	var tds = $(e.target).closest('tr').find('td');
	var towerType=$(e.target).find("option:selected").val();
	var url = path+"structural/relation/getParamterBydData.action";
	$.ajax({
        type: "post",//请求方式
        url: url,
        data:{
        	towerType:towerType.replace(/^\s*|\s*$/g,""),
        },
　　　         success: function(data){
           if(data.code=="200"){
        	   var Tmax=data.Tmax;
        	   var actForce=formateActForce(Tmax);
        	   tds.eq(2).children('input').val(actForce);
           }
        },
        error:function(){
        	Tools.alertMsg("服务器错误");
        }
  });
	
}

//保存参数信息
var paramterSave = function(){
	// 遍历所有的table数据	
	var dataList=[];
	$('#structuralBody').find('tr').each(function (){
        		var tds=$(this).find('td');
        		var obj = {
        			"geologicalDescription" : tds.eq(0).children('select').val(), //地质描述
        			"towerType" : tds.eq(1).children('select').val(), //杆塔类型
        			"actingForce" : tds.eq(2).children('input').val(), //作用力
        			"angleLY" : tds.eq(3).children('select').val(), //转角拉压方式
        			"towerShaped" : tds.eq(4).children('input').val(), //塔形
        			"countOnly" : tds.eq(5).children('input').val(), //只数
        			"steelLabel" : tds.eq(6).children('input').val(), //钢材标号
        			"soilVolume" : tds.eq(7).children('input').val(), //混泥土量
        			"steelQuantity" : tds.eq(8).children('input').val() , //钢材量
        			"earthBolt" : tds.eq(9).children('input').val(), //地栓
        			"beddingLabel" : tds.eq(10).children('input').val(), //垫层标号
        			"cushion" : tds.eq(11).children('input').val(), //垫层
        			"buryingDepth" : tds.eq(12).children('input').val(), //埋深
        			"baseplateWidth": tds.eq(13).children('input').val(), //底板宽
        			"columnWidth": tds.eq(14).children('input').val(),//立柱宽
          			"columnHigh" : tds.eq(15).children('input').val() , //立柱出土高
          			"basicModel" : tds.eq(16).children('input').val() , //基础型号
        			"remark" : tds.eq(17).children('input').val(),   //备注
        			"projectId":$("#projectName").val()
  
        		}
        		dataList.push(obj);       		      		  
	});
	
	var param={
			"list":dataList
	}

	var url = path+"structural/paramter/addParamterList.action";
	$.ajax({
        type: "post",//请求方式
        url: url,
        data:{
        	param:JSON.stringify(param),
        },
        dataType: "json",
　　　         success: function(data){
           if(data.code=="200"){
        	   Tools.alertMsg("保存成功");
        	  // window.location.reload();
           }else{
        	   Tools.alertMsg("保存失败");
           }
        },
        error:function(){
        	Tools.alertMsg("服务器错误");
        }
  });
	
}