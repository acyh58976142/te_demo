var stratigraphicNameSelectData; //在$.ajax异步时返回的数据给上层函数中使用
var towerNumSelectData;
function geology(){
	//初始化数据
	//this.initTable();
	//新建一条按钮点击事件
	$("#geology_add").on("click", this.addGeology);
	//选中杆塔编号select框时，触发的事件
	$("#geology_table tbody").delegate(".towerNnumberSelect","change",Tools.bind(this,this.getTowerNumber));
	//选中地层名称select框时，触发的事件
	$("#geology_table tbody").delegate(".stratumNameSelect","change",Tools.bind(this,this.getGeotechnicalIndex));
	//删除选中行
	$("#geology_delete").on("click", this.deleteGeology);
    //行点击事件
	$("#geology_table").delegate("tbody tr", "click",this.clickTr);
    //保存事件
	$("#geology_save").on("click", this.saveGeology);
	//初始化地层名称下拉框
	getStratumNameSelect();
	//初始化杆塔编号下拉框
	getTowerNnumberSelect();
	//导出
}

/*
 * 行点击事件
 */
geology.prototype.clickTr = function(){
	 //$(this).find('input').addClass('active').siblings().removeClass('active').end();
	 $(this).addClass('active').siblings().removeClass('active').end().find('input').addClass('active').removeClass('active').end();
}

/*
 * 新建一条按钮点击事件
 */
geology.prototype.addGeology = function(){
	//拼接一行表格
	var tr ="";
	tr += "<tr class=''>";
	tr +="<td>"+getTowerNnumberSelect()+"</td>" +          //杆塔编号
		 "<td><input type='text' class='inputText'></td>"; //杆塔位置
	tr +="<td>"+getExplorationBasisSelect()+"</td>"; //勘探依据
	tr +="<td>"+getStratumNameSelect()+"</td>"; //地层名称
	tr +="<td><input type='text' class='inputText'></td>"; //层底深度（m）
    tr += "<td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
    tr +="<td></td>";   //图片
    tr +="<td><input type='text' class='inputText'></td>";
    tr +="<td><input type='text' class='inputText'></td>";
    tr +="<td>"+getGroundwaterType()+"</td>";       //地下水位类型埋深（m）
    tr +="<td><input type='text' class='inputText'></td>";
	
	$("#geology_table").append(tr);
}

/*
 * 杆塔编号下拉框
 */
var getTowerNnumberSelect = function(){
	$.ajax({
        type: "post",//请求方式
        //async:false, //！！！同步请求
        url: path+"geology/findTowerNum.action",
        dataType: "json",
　　　         success: function(data){
　　　        	     towerNumSelectData = "<select class='towerNnumberSelect' id=''><option selected='selected'>-请选择-</option>";
　　　           	 for(var i=0;i<data.length;i++){
　　　           		towerNumSelectData += "<option value="+(i+1)+">"+data[i]+"</option>";
　　　           	 }
　　　          
        }
  });
	return towerNumSelectData;
}

/*
 * 勘探依据下拉框  findTowerNum
 */
var getExplorationBasisSelect = function() {
	
	return  "<select class='' id='explorationBasisSelect'><option selected='selected'>-请选择-</option>" +
			"<option value='1'>钻孔</option>" +
			"<option value='2'>小麻花钻</option><option value='3'>静力触探</option>" +
			"<option value='4'>地质调查</option><option value='5'>小麻花钻+地质调查</option>" +
			"<option value='6'>静力触探+地质调查</option></select>";
}

/*
 * 地层名称下拉框
 */
var getStratumNameSelect = function(callback) {
	//var sel;
	$.ajax({
        type: "post",//请求方式
        //async:false, //！！！同步请求
        url: path+"geology/queryStratigraphicName.action",
        dataType: "json",
　　　         success: function(data){
　　　        	     stratigraphicNameSelectData = "<select class='stratumNameSelect' id=''><option selected='selected'>-请选择-</option>";
　　　           	 for(var i=0;i<data.geologicalScheduleConfigure.length;i++){
　　　           		var gsc=data.geologicalScheduleConfigure[i]; 
　　　           		stratigraphicNameSelectData += "<option value="+gsc.ID+">"+gsc.stratigraphicName+"</option>";
　　　           	 }
　　　          
        }
  });
     return stratigraphicNameSelectData; 	
}

/*
 * 地下水位类型埋深（m）
 */
var getGroundwaterType = function(){
	return  "<select class='' id=''><option value='1' selected='selected'>潜水</option>" +
	        "<option value='2'>上层滞水</option><option value='3'>承压水</option>" +
	        "<option value='4'>未见</option></select>";
}

/*
 * 选中杆塔编号select框时，触发的事件
 */
geology.prototype.getTowerLocation = function(){
	var trs = $("#geology_table tbody tr.active");
	var tds = trs.eq(0).closest('tr').children('td'); 
	var td1 = tds.eq(1);   //获取该行第2个单元格
	var obj = tds.eq(0).children('select').val();   //获取该行杆塔编号下拉框的值
	if(obj == 0){
		
	}else if(obj == 1){
		
	}
}

/*
 * 选中地层名称select框时，触发的事件
 */
geology.prototype.getGeotechnicalIndex = function(){
	var trs = $("#geology_table tbody tr.active");   //获取有选中样式的行
	var tds = trs.eq(0).closest('tr').children('td');  //获取第一个有选中样式的行的子类 td
	var td5 =tds.eq(5);     //获取该行第6个单元格
	var td6 =tds.eq(6);
	var td7 =tds.eq(7);
	var td8 =tds.eq(8);
	var td9 =tds.eq(9);
	var td10 =tds.eq(10);
	var td11 =tds.eq(11);
	var ID = tds.eq(3).children('select').val();    //获取改行地层名称下拉框的值
	
	$.ajax({
        type: "post",//请求方式
        //async:false, //！！！同步请求
        url: path+"geology/queryNormByID.action",
        dataType: "json",
        data:{ID:ID},
　　　         success: function(data){
　　　        	    for(var i=0;i<data.length;i++){
　　　           		var list=data[i];
　　　           		td5.html(list[0]);  //岩土描述
　　　     			td6.html(list[1]);  //重力密度r（kN/m3）
　　　     			td7.html(list[2]);  //黏聚力  C（kPa）
　　　     			td8.html(list[3]);  //内摩擦角φ（°）
　　　     			td9.html(list[4]);  //承载力特征值fak（kPa）
　　　     			td10.html(list[5]); //桩的极限侧阻力标准值qsik（kPa）
　　　     			td11.html(list[6]); //桩的极限端阻力标准值qpk（kPa）
　　　           	}
　　　          
        }
  });
}

/*
 * 移除选中行
 */
geology.prototype.deleteGeology = function(){
	var trs = $("#geology_table tbody tr.active");
	var tr = trs.eq(0).closest('tr');
	tr.hide();
}

/*
 * 保存
 */
geology.prototype.saveGeology = function(){
	// 遍历所有的table数据
	
	var dataList=[];
	$('#geology_table').find('tbody').each(function (){
		  $(this).find('tr').each(function (){ 
        		var tds=$(this).find('td');
        		var obj = {
        			"towerNum" : tds.eq(0).children('select').val(), //杆塔编号
        			"towerLocation" : tds.eq(1).children('select').val(), //杆塔位置
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
        		      		
        }); 
		  
	});
	/*var obj={
		"list":dataList
	};*/
	var url = path+"geology/save.action";
	$.ajax({
        type: "post",//请求方式
        url: url,
        data:{
        	dataList:JSON.stringify(dataList),
        },
        dataType: "json",
　　　         success: function(data){
           if( !Tools.isEmpty(data) ){
        	   alert("保存成功");
        	   location.href =path + "pages/geology/editGeology.jsp";
           }else{
        	   alert("保存失败");
           }
        },
        error:function(){
        	   alert("服务器错误");
        }
  });
	
	
}