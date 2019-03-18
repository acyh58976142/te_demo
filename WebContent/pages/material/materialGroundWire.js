var map2 = "";
function materialGroundWire(){
	//初始化数据
	this.queryMainInfo();
	//初始化表格
	Tools.bind(this, this.initTable());
	//行的点击事件
	$("#material_table").delegate("tbody tr", "click",this.clickTr);
		
};

//行的点击事件
materialGroundWire.prototype.clickTr = function(){
	$(this).addClass('common_checked_tr').siblings().removeClass('common_checked_tr').end();
};

/**
 * 数据查询Ajax
 **/
materialGroundWire.prototype.queryMainInfo = function(data,callback, settings) {
	var url = path+"/material/getPartsDataI.action";
	
	$.ajax({
		"type": "post",	//post防止中文参数乱码
		"url": url,
		"data":{projectId:projectId,projectName:projectName},
		"dataType": "json",  
		"success": function(data){
			map2 = data;
			for(var i=0;i<map2.length;i++){
				var groundWireWeight = map2[i];
				var tr = "<tr>";
					tr+= "<td>"+(i+1)+"</td>";
					tr+= "<td>"+groundWireWeight[0]+"</td>";
					tr+= "<td>"+groundWireWeight[1]+"</td>";
					
					$("#materialGroundWire_table").append(tr);	
			}
			
		},
		"error": function(e) {
			console.info(e);
		}
	});
};

/**
 * 初始化表格
 */
materialGroundWire.prototype.initTable = function(){
   	
};