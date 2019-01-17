var option;
var optionB;
function editGeology(){
	//初始化表格
	this.initTable();
	//初始化地层名称，杆塔编号，岩土物理学指标数据
	//this.initData();
	//this.initData();
	//选中杆塔编号select框时，触发的事件
	$("#editGeology_table tbody").delegate(".","change",Tools.bind(this,this.getTowerNumber));
	//选中地层名称select框时，触发的事件
	$(document).delegate(".stratumNameSelect","change",Tools.bind(this,this.getGeotechnicalIndex));
	//选中删除按钮
	$("#editGeology_delete").on("click", this.deleteeditGeology);
    //行点击事件
	$("#editGeology_table").delegate("tbody tr","click",this.clickTr);
    //提交事件
//	$("#editGeology_submit").on("click", this.saveEditGeology);
	$("#editGeology_submit").on("click", function(){
		saveEditGeology();
	});
	//导出 editGeology_improt
	$("#editGeology_improt").on("click", this.improtGeology);
}

/*
 * 初始化地层名称，杆塔编号，岩土物理学指标数据
 */
editGeology.prototype.initData = function(){
	//杆塔编号
	$.ajax({
        type: "post",//请求方式
        async:false, //！！！同步请求
        url: path+"geology/findTowerNum.action",
        dataType: "json",
　　　         success: function(data){
　　　        	         optionB = data;
　　　           	 }
    });
	$.ajax({
        type: "post",//请求方式
        async:false, //！！！同步请求
        url: path+"geology/queryStratigraphicName.action",
        dataType: "json",
　　　         success: function(data){
　　　        	   option = data;
　　　         }
  });
	
}

/*
 * 行点击事件
 */
editGeology.prototype.clickTr = function(){
	 //$(this).find('input').addClass('active').siblings().removeClass('active').end();
	 $(this).addClass('active').siblings().removeClass('active').end().find('input').addClass('active').removeClass('active').end();
}

/*
 * 初始化表格
 */
editGeology.prototype.initTable = function(){
$.ajax({
        type: "post",//请求方式
        async:false, //！！！同步请求
        url: path+"geology/queryStratigraphicName.action",
        dataType: "json",
　　　         success: function(data){
　　　        	   option = data;
　　　         }
  });
	//杆塔编号
	$.ajax({
        type: "post",//请求方式
        //async:false, //！！！同步请求
        url: path+"geology/findTowerNum.action",
        dataType: "json",
　　　         success: function(data){
　　　        	         optionB = data;
　　　           	 }
    });
	var colum = [
		   {
			"data" : "towerNum",    //杆塔编号
			"render":function(data){
				towerNumSelectData = "<select class='towerNnumberSelect' id=''" +
						" style='width:50px; -webkit-appearance: none;border:0;'>" +
						"<option>-请选择-</option>";
　　           	 		for(var i=0;i<optionB.length;i++){
　　           				if(data == i){
　　           					towerNumSelectData += "<option  value="+i+" selected='selected' >"+optionB[i]+"</option>";
　　           				}else{
　　           					towerNumSelectData += "<option  value="+i+">"+optionB[i]+"</option>";
　　           				}
　　           	 		}
　　           	 		towerNumSelectData +="</select>";
　　           	 		return towerNumSelectData;
			}
		}, {
			"data" : "towerLocation",   //杆塔位置
			"render":function(data){
				return "<td><input type='text' class='inputText' value="+data+"></td>";
			}
		},  {
			"data" : "explorationBasis",  //勘探依据
			"render":function(data){
				var explorationBasisText=["钻孔","小麻花钻","静力触探","地质调查","小麻花钻+地质调查","静力触探+地质调查"];
				var explorationBasisSelect ="<select class='explorationBasisSelect' id=''><option>-请选择-</option>";
				for(var i=1;i<=explorationBasisText.length;i++){
					if(data == i){
						explorationBasisSelect += "<option value="+i+" selected='selected'>"+explorationBasisText[i-1]+"</option>";
					}else{
						explorationBasisSelect += "<option value="+i+">"+explorationBasisText[i-1]+"</option>";
					}
				}		
				explorationBasisSelect += "</select>";
			    return 	explorationBasisSelect;	
			}  
		},{
			"data" : "stratigraphicName",//地层名称 getStratumNameSelect
			"render":function(data){
				var stratigraphicNameSelect = "<select class='stratumNameSelect' id=''><option>-请选择-</option>";
　　           	 		for(var i=0;i<option.geologicalScheduleConfigure.length;i++){
　　           				var gsc=option.geologicalScheduleConfigure[i];
　　           				
　　           				if(data == gsc.ID){
　　           					stratigraphicNameSelect += "<option data='"+JSON.stringify(gsc)+"' value="+gsc.ID+" selected='selected' >"+gsc.stratigraphicName+"</option>";
　　           				}else{
　　           					stratigraphicNameSelect += "<option data='"+JSON.stringify(gsc)+"' value="+gsc.ID+">"+gsc.stratigraphicName+"</option>";
　　           				}
　　           	 		}
　　           	 		stratigraphicNameSelect+="</select>";
　　           	 		return stratigraphicNameSelect;
			}
		}, {
			"data" : "floorDepth",  //层底深度（m）
			"render":function(data)	{
				return "<td><input type='text' class='inputText' value="+data+"></td>";
			}
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
			"data" : "illustrate",  //说明
			"render":function(data)	{
				return "<td><input type='text' class='inputText' value="+data+"></td>";
			}
		},{
			"data" : "surveyPointLocation",  //勘测点位置
			"render":function(data)	{
				return "<td><input type='text' class='inputText' value="+data+"></td>";
			}
		},{
			"data" : "waterLevel",  //地下水位类型埋深（m）
			"render":function(data)	{
				var waterLevelText=["潜水","上层滞水","承压水","未见"];
				var waterLevelSelect ="<select class='waterLevelSelect' id=''><option>-请选择-</option>";
				for(var i=1;i<=waterLevelText.length;i++){
					if(data == i){
						waterLevelSelect += "<option value="+i+" selected='selected'>"+waterLevelText[i-1]+"</option>";
					}else{
						waterLevelSelect += "<option value="+i+">"+waterLevelText[i-1]+"</option>";
					}
				}
				waterLevelSelect += "</select>";
			    return 	waterLevelSelect;	
			}
		},{
			"data" : "remark",  //备注
				"render":function(data)	{
					return "<td><input type='text' class='inputText' value="+data+"></td>";
				}
		}] 
	

	$("#editGeology_table").DataTable({
		"bDestroy": false,// 刷新数据
		"language": dataTableLang,
		"dom": "t" + "<'table_row'<'col-sm-6'i><'col-sm-6'p>>",	
		//"scrollX" :false,
		"autoWidth":false,
		"paginate": false,
		"bSort": false,
		"bProcessing": true,
		"paging" : true,//是否分页
		"bServerSide":false,//服务器端分页
		"bInfo" : true, // 页脚信息
		"pageLength" :10 ,//每页显示的条数pageLength(path)
		"columns" :colum ,
		//"fnDrawCallback":Tools.bind(this,this.changeTableStyle),  //绘制表格完成后调用函数
		"ajax":Tools.bind(this,this.queryData)
	});
}

/*
 * 数据查询方法
 */
editGeology.prototype.queryData=function(data, callback, settings){
	  $.ajax({
            type: "post",//请求方式
            url: path+"geology/queryGeologicalScheduleInfo.action",
            dataType: "json",
　　　　　　　     success: function(data){
                callback(data);
            }
      });
}

/*
 * 选中地层名称select框时，触发的事件
 */
editGeology.prototype.getGeotechnicalIndex = function(){
	var trs = $("#editGeology_table tbody tr.active");   //获取有选中样式的行
	var tds = trs.eq(0).closest('tr').children('td');  //获取第一个有选中样式的行的子类 td
	var td5 =tds.eq(5);     //获取该行第6个单元格
	var td6 =tds.eq(6);
	var td7 =tds.eq(7);
	var td8 =tds.eq(8);
	var td9 =tds.eq(9);
	var td10 =tds.eq(10);
	var td11 =tds.eq(11);
	var ID = tds.eq(3).children('select').val();    //获取改行地层名称下拉框的值
	var selectData =JSON.parse(tds.eq(3).children('select').find("option:selected").attr("data"));//获取下拉框自定义属性的值
	td5.html(selectData.geotechnicalDescription);  //岩土描述
	td6.html(selectData.gravityDensity);  //重力密度r（kN/m3）
	td7.html(selectData.cohesion);  //黏聚力  C（kPa）
	td8.html(selectData.internalFrictionAngle);  //内摩擦角φ（°）
	td9.html(selectData.eigenvalueCapacity);  //承载力特征值fak（kPa）
	td10.html(selectData.standardSideResistance); //桩的极限侧阻力标准值qsik（kPa）
	td11.html(selectData.standardEndResistance); //桩的极限端阻力标准值qpk（kPa）
	
}

/*
 * 移除选中行
 */
editGeology.prototype.deleteeditGeology = function(){
	var trs = $("#editGeology_table tbody tr.active");
	var tr = trs.eq(0).closest('tr');
	var data = $('#editGeology_table').dataTable().fnGetData(tr);
	var ID = data.ID;
	//var ID = "123123";
	var msg = "你确定要删除当前编号吗？";
	var url =  path + "geology/deleteEditGeological.action";
   /* Tools.tipsConfirm(msg,function(){
    		$.ajax({
				    type: "post",//请求方式
		            url: url,
		            data:{"ID":ID},
		            dataType: "json",
				    "success": function(data){
						if(!Tools.isEmpty(data) ){
							alert("删除成功");
							//Tools.bind(this,this.initTable);
							$('#editGeology_table').DataTable().ajax.reload();
						}else{
							alert("删除失败");
						}
						
				}
			});
	},true);*/
    	
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
					//Tools.bind(this,this.initTable);
					$('#editGeology_table').DataTable().ajax.reload();
				}else{
					alert("删除失败");
				}
				
		}
	});
}

/*
 * 提交
 */
var saveEditGeology = function(){
	// 遍历所有的table数据
	
	var dataList=[];
	
	$('#editGeology_table').find('tbody').each(function (){
		var data = $('#editGeology_table').dataTable().fnGetData();
		var ntr = $(this).find('tr');
		for(var i=0;i<ntr.length;i++){
			var ID = data[i].ID; 
		    var tds=ntr.eq(i).find('td');
    		var obj = {
    			"ID":ID,
    			"towerNum" : tds.eq(0).children('select').val(), //杆塔编号
    			"towerLocation" : tds.eq(1).children('input').val(), //杆塔位置
    			"explorationBasis" : tds.eq(2).children('select').val(), //勘探依据
    			"stratigraphicName" : tds.eq(3).children('select').val(), //地层名称
    			"floorDepth" : tds.eq(4).children('input').val(), //层底深度
    			"geotechnicalDescription" : tds.eq(5).text(), //岩土描述
    			"gravityDensity" : tds.eq(6).text(), //重力密度
    			"cohesion" : tds.eq(7).text(), //黏聚力
    			"internalFrictionAngle" : tds.eq(8).text() , //内摩擦角
    			"eigenvalueCapacity" : tds.eq(9).text(), //承载力特征值
    			"standardSideResistance" : tds.eq(10).text(), //桩的极限侧阻力标准值
    			"standardEndResistance" : tds.eq(11).text(), //桩的极限端阻力标准值
    			//"picture" : tds.eq(12).text(),     //图片
    			"illustrate" : tds.eq(13).children('input').val(), //说明
    			"surveyPointLocation": tds.eq(14).children('input').val(), //勘测点位置
    			"waterLevel": tds.eq(15).children('select').val(),//地下水位类型
    			"remark" : tds.eq(16).children('input').val()   //备注
    		}
    		dataList.push(obj);
		}
/*		  $(this).find('tr').each(function (){ 
			  			    
        		var tds=$(this).find('td');
        		var obj = {
        			"towerNum" : tds.eq(0).children('select').val(), //杆塔编号
        			"towerLocation" : tds.eq(2).children('select').val(), //杆塔位置
        			"explorationBasis" : tds.eq(2).children('select').val(), //勘探依据
        			"stratigraphicName" : tds.eq(3).children('select').val(), //地层名称
        			"floorDepth" : tds.eq(4).children('input').val(), //层底深度
        			"geotechnicalDescription" : tds.eq(5).text(), //岩土描述
        			"gravityDensity" : tds.eq(6).text(), //重力密度
        			"cohesion" : tds.eq(7).text(), //黏聚力
        			"internalFrictionAngle" : tds.eq(8).text() , //内摩擦角
        			"eigenvalueCapacity" : tds.eq(9).text(), //承载力特征值
        			"standardSideResistance" : tds.eq(10).text(), //桩的极限侧阻力标准值
        			"standardEndResistance" : tds.eq(11).text(), //桩的极限端阻力标准值
        			//"picture" : tds.eq(12).text(),     //图片
        			"illustrate" : tds.eq(13).children('input').val(), //说明
        			"surveyPointLocation": tds.eq(14).children('input').val(), //勘测点位置
        			"waterLevel": tds.eq(15).children('input').val(),//地下水位类型
        			"remark" : tds.eq(16).children('input').val()   //备注
        		}
        		dataList.push(obj);
        		      		
        }); */
		  
	});
	
	/*var obj={
		"list":dataList
	};*/
	var url = path+"geology/updateEditGeology.action";
	$.ajax({
        type: "post",//请求方式
        url: url,
        data:{
        	dataList:JSON.stringify(dataList),
        },
        dataType: "json",
　　　         success: function(data){
           if( !Tools.isEmpty(data) ){
        	   alert("提交成功");
        	   $('#editGeology_table').DataTable().ajax.reload();
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
 * 导出
 */
editGeology.prototype.improtGeology = function(){
	
	//获取表格中input和select框中的值，然后再赋值到表格单元格中，最后隐藏表格中的input和select框
	$('#editGeology_table').find('tbody').each(function (){
		  $(this).find('tr').each(function (){
			 var tds=$(this).find('td');
			  
			 var td0 = tds.eq(0).children('select').find("option:selected").text(); //杆塔编号
			 var td1 = tds.eq(1).children('input').val(); //杆塔位置
			 var td2 = tds.eq(2).children('select').find("option:selected").text(); //勘探依据
			 var td3 = tds.eq(3).children('select').find("option:selected").text(); //地层名称
			 var td4 = tds.eq(4).children('input').val(); //层底深度
  			 var td13 = tds.eq(13).children('input').val(); //说明
			 var td14 = tds.eq(14).children('input').val(); //勘测点位置
			 var td15 = tds.eq(15).children('select').find("option:selected").text();//地下水位类型
			 var td16 = tds.eq(16).children('input').val();   //备注
			 
			 tds.eq(0).html(td0); //杆塔编号
			 tds.eq(1).html(td1); //杆塔位置
			 tds.eq(2).html(td2); //勘探依据
			 tds.eq(3).html(td3); //地层名称
			 tds.eq(4).html(td4); //层底深度
  			 tds.eq(13).html(td13); //说明
			 tds.eq(14).html(td14); //勘测点位置
			 tds.eq(15).html(td15);//地下水位类型
			 tds.eq(16).html(td16);   //备注
			 
			 tds.eq(0).children('select').hide(); //杆塔编号
			 tds.eq(1).children('input').hide(); //杆塔位置
			 tds.eq(2).children('select').hide(); //勘探依据
			 tds.eq(3).children('select').hide(); //地层名称
			 tds.eq(4).children('input').hide(); //层底深度
  			 tds.eq(13).children('input').hide(); //说明
			 tds.eq(14).children('input').hide(); //勘测点位置
			 tds.eq(15).children('select').hide();//地下水位类型
			 tds.eq(16).children('input').hide();   //备注
          }); 
	});
	//"improt_div"
	var improtDiv = $("#improt_div").html();
	$(".table_row").hide();//把分页div隐藏
	optsStyle = $("style").html() 
	$("#improt_div").wordExport("新建工程杆塔位地质明细表",optsStyle);
	$(".table_row").show();//把分页div隐藏
	$('#editGeology_table').DataTable().ajax.reload();
	
	//导出完成后再把input和select框显示出来
/*	$('#editGeology_table').find('tbody').each(function (){
		  $(this).find('tr').each(function (){
			  var tds=$(this).find('td');
			  
			  tds.eq(0).children('select').show(); //杆塔编号
			  tds.eq(1).children('input').show(); //杆塔位置
			  tds.eq(2).children('select').show(); //勘探依据
			  tds.eq(3).children('select').show(); //地层名称
			  tds.eq(4).children('input').show(); //层底深度
	  		  tds.eq(13).children('input').show(); //说明
			  tds.eq(14).children('input').show(); //勘测点位置
			  tds.eq(15).children('select').show();//地下水位类型
			  tds.eq(16).children('input').show();   //备注
		  }); 
	});*/
		  
}