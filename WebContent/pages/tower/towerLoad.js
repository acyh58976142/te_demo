/**
 *  杆塔js 
 */
function TowerLoad(){
	//获取归并的杆塔信息
	initTowerMergeData();
	
	//初始化杆塔型号下拉框
	this.getGroundParam();
//	this.getGroundParamNew();
	
	this.Inspiece();
	this.weather_change("weather_v");
	this.weather_change("weather_T");
	this.weather_change("weather_C");
	
	//返回按钮
	$("#tower_return").on("click",function(){
		location.href=path+"merge/turnToTowerMerge.action?projectId="+projectId;
	})
}

//导线型号选择框全局变量
var selectHtml="";
var groundSelectHtml="";
var conductor_type="";//导线型号
/**
 * 查询杆塔相关信息
 * @returns
 */
function initTowerMergeData(){
	$.ajax({
        type: "post",//请求方式
        url: path+"/merge/getTowerMergeInfo.action",
        data:{ 
       	 mergeId:mergeId,
        },
　　　       success:function(data){
　　　    	   if(data!=null){
　　　    		   　	 $(".B52").val(data.g_max);
　　　    		   　	 $(".E52").val(data.g_min);
　　　    		   　	 $(".B53").val(data.f_max);
　　　    		     $(".E53").val(data.f_min);
　　　    		   　	 $(".B54").val(data.f_max);
　　　    		   　	 $(".E54").val(data.f_min);
　　　    		   　	 $(".B56").val(data.j_max);
　　　    		   　	 $(".E56").val(data.j_min);
　　　    		   　      $(".B57").val(data.jumper_f);
　　　    		   　	 $(".E57").val(data.jumper_g);
　　　    		   　	 $(".B58").val(data.k_angle);
　　　    		   　	 if(data.k_angle=="0"){
　　　    		   　		 $(".C50").val("1");
　　　    		   　	 }else{
　　　    		   　	 $(".C50").val("2"); 
　　　    		   　	 }
　　　    		   　	 conductor_type=data.conductor_type;
　　　    		   　	 $(".con_type").val(conductor_type);
　　　    	   }
        },
       error:function(){
       	Tools.alertMsg("服务器错误");
        }
  });
}

/**
 * 获取导地线参数
 */
TowerLoad.prototype.getGroundParam=function(){
	$.ajax({
		type:"POST",
		url:path+"towerLoad/getGroundGuidParam.action",
		success:function(data){
			if(data.code=="200"){
				var list=data.data;
				selectHtml=$("<select class='input_control con_type'>");
				for(var i = 0; i < list.length; i++) {
					var sensor = list[i];
					var option=$("<option>").data(sensor);
					    option.val(sensor.conductor_type ).text(sensor.conductor_type);	
					    selectHtml.append(option);
				}
				$(".conductorType").html(selectHtml);
			}
			else{
				selectHtml=$("<input class='input_control'>");
				$(".conductorType").html(selectHtml);
			}
		},
		error:function(){
			alert("系统错误");
		}
	})
}

/**
 * 获取导地线参数
 */
TowerLoad.prototype.getGroundParamNew=function(){
	$.ajax({
		type:"POST",
		url:path+"Parts/getWireTypeById.action",
		data:{
			id:projectId
		},
		success:function(data){
				var list=data.wireList;
				var groundList=data.groundList;
				selectHtml=$("<select class='input_control con_type'>");
				groundSelectHtml=$("<select class='input_control con_type_g'>");
				for(var i = 0; i < list.length; i++) {
					var sensor = list[i];
					var option=$("<option>").val(sensor).text(sensor);	
					    selectHtml.append(option);
				}
				for(var i = 0; i < list.length; i++) {
					var sensor = list[i];
					var option=$("<option>").val(sensor).text(sensor);	
					groundSelectHtml.append(option);
				}
				$(".conductorType").html(selectHtml);
				$(".conductorType_g").html(groundSelectHtml);

		},
		error:function(){
			alert("系统错误");
		}
	})
}


/**
 * 绝缘子表格添加监听事件（计算公式）
 */
TowerLoad.prototype.Inspiece=function(){
	//绝缘子片数改变事件
	$(".inspiece_td").on("change",function(e){
		var target=e.target;
		// 获取行列键值
        var row_num = target.parentNode.parentNode.rowIndex;
        var col_num = target.parentNode.cellIndex;
		var num1=$(this).val();
		if(isEmpty(num1)){
			return;
		}
        var rows1;
        var rows2;
        if(row_num==2){
        	rows1=row_num;
        	rows2=row_num+1;
        }
        else{
        	rows1=row_num-2;
        	rows2=row_num;
        }
        var num2=$(this).parent().parent().parent().find("tr:eq("+rows1+")").find("td:eq("+col_num+")").find("input").val();
        if(!isEmpty(num2)){
        	var postNum=towerLoad.calculateInspiece(num1,num2,col_num);
        	$(this).parent().parent().parent().find("tr:eq("+rows2+")").find("td:eq("+col_num+")").find("input").val(postNum);
        }
	})
}

/**
 * 绝缘子片数的动态计算
 * 绝缘子片数 inspiece
 * 联数 linkNum
 * return postNum (折算后)
 */
TowerLoad.prototype.calculateInspiece=function(inspiece,linkNum,data){
	var postNum=0;
	if(!isEmpty(inspiece)&&!isEmpty(linkNum)){
		//折算后
	    postNum=Number(inspiece)*Number(linkNum);
		//导线
		if(data=="1"){
			postNum=postNum+2;
		}
		//地线 、条线
		else{
			postNum=postNum+1;
		}
	}
	
	return postNum;
}

/**
 * 气象条件（V）表格添加监听事件（计算公式）
 */
TowerLoad.prototype.weather_change=function(className){
	$("."+className).on("change",function(e){
		var target=e.target;
		// 获取行列键值
        var row_num = target.parentNode.parentNode.rowIndex;
        var col_num = target.parentNode.cellIndex;
		var numV=$(this).val();
		if(isEmpty(numV)){
			return;
		}
        if(col_num==1){//覆冰验算
			 $(this).closest("tr").find("td:eq("+(col_num+5)+")").find("input").val(numV);
		}
        var index=className.indexOf("_");
        var name=className.substring(index+1,index+2);
        if(name=="v"){
            var rows1=row_num;
            var rows2=row_num+1;
            var num_α=towerLoad.getwind_mod(numV);
            var num_β=towerLoad.gettrim_mod(numV);
            $(this).parent().parent().parent().find("tr:eq("+rows1+")").find("td:eq("+(col_num+1)+")").find("input").val(num_α);
            $(this).parent().parent().parent().find("tr:eq("+rows2+")").find("td:eq("+col_num+")").find("input").val(num_β);
    	    if(col_num==1){
    	    	 $(this).parent().parent().parent().find("tr:eq("+rows1+")").find("td:eq("+(col_num+6)+")").find("input").val(num_α);
    	         $(this).parent().parent().parent().find("tr:eq("+rows2+")").find("td:eq("+(col_num+5)+")").find("input").val(num_β);  	    	    
    	    }
        }
     })
}


//风压不均匀系数α：
TowerLoad.prototype.getwind_mod=function(data){
	if(Number(data)<=15){
		return 1;
	}
	if(Number(data)<30){
		return 0.85;
	}
	if(Number(data)<35){
		return 0.75;
	}
	
	return 0.7;
}


/**
 * 覆冰风荷载增大系数Bz/导地线风载调整系数βc
 * 如果电压等级为 500 kv return 1
 */
TowerLoad.prototype.gettrim_mod=function(data){
	if(Number(data)<=20){
		return 1;
	}
	if(Number(data)<30){
		return 1.1;
	}
	if(Number(data)<35){
		return 1.2;
	}
	
	return 1.3;
}

/**
 * 判断字段的非空
 * @param data
 * @returns
 */
function isEmpty(data){
	if(data==""||data==null||data==undefined){
		return true;
	}
	else{
		return false;
	}
}