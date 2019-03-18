/**
 * 地质明细表新增js
 */

var stratigraphicName=""; //地层名称下拉框
var towerNum="";  //杆塔编号下拉框
var explorationBasis="" ;   //勘探依据
var groundwaterDepth="";    //地下水位类型埋深（m）
function geology(){
	//设置表格高度
	var winHeight = window.innerHeight;//浏览器页面的高
	var heights = winHeight-55;
	$("#table_div").css({"height":heights+"px"});
	
	//初始化地层名称下拉框
	getStratumNameSelect();
	
	//初始化杆塔编号下拉框
	initProject();
	
	$("#projectName").on("change",function(){
		getTowerNnumberSelect();
	});
	
	//勘探依据
	getExplorationBasisSelect();
	
	//地下水位类型埋深（m）
	getGroundwaterType()
	
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
	tr +="<td>"+towerNum+"</td>" +          //杆塔编号
		 "<td><input type='text' class='inputText'></td>"; //杆塔位置
	tr +="<td>"+explorationBasis+"</td>"; //勘探依据
	tr +="<td>"+stratigraphicName+"</td>"; //地层名称
	tr +="<td><input type='text' class='inputText'></td>"; //层底深度（m）
    tr += "<td style=' white-space: nowrap;'></td><td></td><td></td><td></td><td></td><td></td><td></td>";
    tr +="<td></td>";   //图片
    tr +="<td><input type='text' class='inputText'></td>";
    tr +="<td><input type='text' class='inputText'></td>";
    tr +="<td><input type='text' class='inputText'></td>";       //地下水位类型埋深（m）
    tr +="<td><input type='text' class='inputText'></td>";
    tr +="<td></td>";
    tr +="<td><input type='text' class='inputText'></td>";
	
	$("#geology_table").append(tr);
}

var repeatSelect=function(){
    $('.towerNnumberSelect').each(function() {
        // 默认选中的值
        if ($(this).find("option:selected")) {
            var currentvalue = $(this).find('option:checked').val();
            $(this).attr('old', currentvalue);
            // 如果this下的某一项被选中，则not这个select find option[value=当前选择的值]外面添加other标签
            // .not('option[value=0]') 该项是select的第一项 默认value为0
            $('.towerNnumberSelect').find('option[value=' + currentvalue + ']').not('option[value=0]').wrap('<other></other>')
        }
    })
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
			getTowerNnumberSelect();
		}
	})
}

/*
 * 杆塔编号下拉框
 */
var getTowerNnumberSelect = function(){
	$.ajax({
        type: "post",//请求方式
        //async:false, //！！！同步请求
        url: path+"geology/findTowerNum.action",
        data:{
        	"id":$("#projectName").val() //工程id
        },
        dataType: "json",
　　　         success: function(data){
　　　        	     towerNum = "<select class='towerNnumberSelect' id=''><option value='' selected='selected'>-请选择-</option>";
　　　           	 var option="<option value='' selected='selected'>-请选择-</option>";
　　　        	     for(var i=0;i<data.length;i++){
　　　           		towerNum += "<option value="+data[i]+">"+data[i]+"</option>";
　　　           		option+="<option value="+data[i]+">"+data[i]+"</option>";
　　　           	 }
　　　        	     towerNum +="</select>";
　　　                   $(".towerNnumberSelect").html(option);
        }
  });
}

/*
 * 勘探依据下拉框  findTowerNum
 */
var getExplorationBasisSelect = function() {
	explorationBasis+="<select class='' id='explorationBasisSelect'><option value='' selected='selected'>-请选择-</option>" +
	                  "<option value='1'>钻孔</option>" +
	                  "<option value='2'>小麻花钻</option><option value='3'>静力触探</option>" +
	                  "<option value='4'>地质调查</option><option value='5'>小麻花钻+地质调查</option>" +
	                  "<option value='6'>静力触探+地质调查</option></select>";
}

/*
 * 地层名称下拉框
 */
var getStratumNameSelect = function() {
	$.ajax({
        type: "post",//请求方式
        //async:false, //！！！同步请求
        url: path+"geology/queryStratigraphicName.action",
        dataType: "json",
　　　         success: function(data){
　　　        	     stratigraphicName = "<select class='stratumNameSelect' id=''><option value='' selected='selected'>-请选择-</option>";
　　　           	 for(var i=0;i<data.geologicalScheduleConfigure.length;i++){
　　　           		var gsc=data.geologicalScheduleConfigure[i]; 
　　　           		stratigraphicName += "<option value="+gsc.ID+">"+gsc.stratigraphicName+"</option>";
　　　           	 }
　　　          
        }
  });
}

/*
 * 地下水位类型埋深（m）
 */
var getGroundwaterType = function(){
	groundwaterDepth+="<select class='' id=''><option value='1' selected='selected'>潜水</option>"+	  
	                    "<option value='2'>上层滞水</option><option value='3'>承压水</option>" +
	                    "<option value='4'>未见</option></select>";
	return groundwaterDepth;
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
	var td5 =tds.eq(5);     //岩土描述
	var td6 =tds.eq(6);     //重力密度
	var td7 =tds.eq(7);     //粘聚力C
	var td8 =tds.eq(8);     //内摩擦角φ
	var td9 =tds.eq(9);     //承载力特征值
	var td10 =tds.eq(10);   //桩的极限侧阻力标准值
	var td11 =tds.eq(11);   //桩的极限端阻力标准值
	var td17 =tds.eq(17);   //地层状态
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
　　　     			td17.html(list[7]); //地层状态
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
        			"waterLevel": tds.eq(15).children('input').val(),//地下水位埋深
          			"resistivity" : tds.eq(16).children('input').val() , //电阻率
          			"stratigraphicState" : tds.eq(17).text() , //地层状态
        			"remark" : tds.eq(18).children('input').val(),   //备注
        			"projectId" :$("#projectName").val(),   
  
        		}
        		if(obj.towerNum==''||obj.towerNum==null){
        			Tools.alertMsg("杆塔编号不能为空");
        			return;
        		}
        		dataList.push(obj);
        		      		
        }); 
		  
	});
	
	var param={
			"list":dataList,
			"type":"add"
	}

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
        	   alert("保存成功");
        	   //location.href =path + "pages/geology/editGeology.jsp";
        	   window.location.reload();
           }else{
        	   alert("保存失败");
           }
        },
        error:function(){
        	   alert("服务器错误");
        }
  });
	
	
}