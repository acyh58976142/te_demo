var numberData;
function towerAdd(attList) {
	// 初始化表格
	this.initTable(attList);
	// 提交
	$(document).delegate("#submit","click",Tools.bind(this,this.saveRelation)); 
}

//初始化表格
towerAdd.prototype.initTable = function(attList){
	$.ajax({
		type : 'post',
		url : path + 'Parts/getNumberById.action',
		data : {
			'id' : id
	},
		success : function(data) {
			if (!Tools.isEmpty(data)) {
				numberData=data;
				towerAdd.createTable(attList);
				
			}
		},
		error : function() {
			Tools.tipsMsg("查询失败");
		}
	});
}

//生成导线型号表格
towerAdd.prototype.createTable = function(attr){
	var attList = eval("(" + attr + ")");
	
	var tr="";
	for (var i = 0; i <numberData.length; i++) {
		var radio="";
		$.each(attList,function(index,obj){
			radio+="<input name='"+numberData[i]+"' type='radio' value='"+obj.sortNo+"'><span>"+obj.sortNo+"."+obj.originalFileName+"</span>&nbsp;&nbsp;";	
		});
		
		tr+="<tr><td>"+numberData[i]+"</td><td>"+radio+"</td></tr>";
	}
	$("#naiTableTr").after(tr);
}

towerAdd.prototype.getRelationParam = function(){
	var arr = new Array();

	for (var i = 0; i <numberData.length; i++) {
		var obj = {};
			
		obj.sortNO=$("input[name='"+numberData[i]+"']:checked").val();
		obj.routeNo=numberData[i];
		
		arr.push(obj);
	
	}

	var tempMap={};
	for(var i=0;i<arr.length;i++){
	   var obj = arr[i];
	   var key = obj["sortNO"];
	   if(tempMap[key]!=0&&!tempMap[key]){
	      tempMap[key]=obj["routeNo"];
	   }else{
	      tempMap[key]=tempMap[key]+","+obj["routeNo"];
	   }   
	}
	var arrM=[];
	for(key in tempMap){
	 arrM.push({taSortno:key,routeNo:tempMap[key+'']});
	}

	return arrM;
}
//保存默认配置
towerAdd.prototype.saveRelation = function(){
	for (var i = 0; i <numberData.length; i++) {
		var obj = {};
		if(Tools.isEmpty($("input[name='"+numberData[i]+"']:checked").val())){
			Tools.tipsMsg("耐张段编号"+numberData[i]+"未选择关联文件！");
			return;
		}
	}

	var param = towerAdd.getRelationParam();//关联信息
	
	var url = path + "/Tower/saveRelation.action";
	 $.ajax({
		 type:'post',
		 url:url,
		 data:{
				'id' : id,
				'param' : JSON.stringify(param)
			},
		 dataType : 'json',
		 success : function(data) {
				if (data.msg == "success") {
					layer.confirm("关联成功！", {
						btn : "确认"
					}, function() {//按钮执行事件
						location.href = path
						+ "/Tower/projectList.action";
					});							
				} else {
					Tools.tipsMsg("关联失败！");
				}	
			}
	 });
};

//绑附件
towerAdd.prototype.bindFile = function(attr){
	var attList = eval("(" + attr + ")");
	$.each(attList,function(index,obj){
			$("#del_summary_file_div").append('<span class="file-href-span fileNoColor replaceFile'+obj.sortNo+'" onclick="downloadFile(this)" filePath='+obj.filePath+'>'+obj.sortNo+'.'+obj.originalFileName+"</span><label title='替换附件'  class='replaceFile-img'  sortNo="+obj.sortNo+" id="+obj.id+"><i class='fa fa-refresh'></i></label>&nbsp;&nbsp;&nbsp;");
	});
	   
};
