<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>单位管理</title>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstarp.style.css" rel="stylesheet" /> 
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
<link href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/layer/mobile/need/layer.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap-select.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css" rel="stylesheet"/>
 <link href="<%=basePath%>assets/js/video/video-js.min.css" rel="stylesheet">
<link href="<%=basePath%>assets/js/viewer/css/viewer.min.css" rel="stylesheet"> 
<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet"/>
<!-- 自定义  -->
<link href="<%=basePath%>pages/systemManage/unitManageList.css" rel="stylesheet"/>
</head>
<body>
	<div class="container">
	  <!-- 第一行开始 -->
		<div class="row">
			<div class="col-md-3 col-xs-3">
				<div class="input-group">
					<label class="input-group-addon">单位名称：</label> 
					<input type="text" class="form-control" id="unitName" name="unitName" placeholder="输入单位名称" />
				</div>
			</div>
			<div class="col-md-3 col-xs-3">
				<div class="input-group">
					<label class="input-group-addon">乡镇名称：</label> 
					<select class="form-control" id="country" name="country">
						<option value="">--请选择--</option>
						<c:forEach items="${areaNameList}" var="areaName">
							<option value="${areaName.acode}">${areaName.aname}</option>
						</c:forEach>
					</select>
					
				</div>
			</div>
			
			<button class="btn btn-info" id="searchBtn">
				<span class="glyphicon glyphicon-search"></span>&nbsp;查询
			</button>
			
			<button class="btn btn-success" id="addCaseBtn">
				<span class="glyphicon glyphicon-plus"></span>&nbsp;添加
			</button>
		</div>
		<div class="row">
			<div class="tab-content" id="tab-content">
			  <table class="table table-bordered " id="unitManage_table">
					<thead>
					</thead>
					<tbody>
					</tbody>
			  </table>
		  </div>
		</div>
	  <!-- 第一行结束 -->
   </div>
   
    <!--单位管理新增页面  -->
	<div class="modal fade" tabindex="-1" role="dialog" id="AddUnitManageModal" data-backdrop="static">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title"></h4>
				</div>
				 <div class="container-fluid">
				  <form id="unitManage_addModel_form"onsubmit="return false;"> 
					<div class="row">
						<div class="col-sm-6 col-md-6 col-xs-6">
							<div class="input-group">
								<label class="input-group-addon">单位名称：</label> 
								<input type="text" class="form-control" id="add_unitNames" name="add_unitNames" placeholder="请输入单位名称" />
							</div>
						</div>
						<div class="col-sm-6 col-md-6 col-xs-6">
							<div class="input-group">
								<label class="input-group-addon">上级名称：</label> 
									<select class="form-control" id="add_parent_name" name="add_parent_name">
										<option value="">--请选择--</option>
										<option value="e98697b5c826400283dd60f8766d0430">秭归县河办</option>
										<option value="-1">市级河办</option>
									</select>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6 col-md-6 col-xs-6">
							<div class="input-group">
								<label class="input-group-addon">单位地址：</label> 
								<input type="text" class="form-control" id="add_org_address" name="add_org_address" placeholder="请输入单位地址" />
							</div>
						</div>
						<div class="col-sm-6 col-md-6 col-xs-6">
							<div class="input-group">
								<label class="input-group-addon">联系电话：</label> 
								<input type="text" class="form-control" id="add_org_telephone" name="add_org_telephone" placeholder="请输入联系方式" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6 col-md-6 col-xs-6">
							<div class="input-group">
								<label class="input-group-addon">乡镇名称：</label> 
								<select class="form-control" id="add_area_code" name="add_area_code">
									<option value="">--请选择--</option>
									<c:forEach items="${areaNameList}" var="areaName">
										<option value="${areaName.acode}">${areaName.aname}</option>
									</c:forEach>
								</select>
							</div>
						</div>
						<div class="col-sm-6 col-md-6 col-xs-6">
							<div class="input-group">
								<label class="input-group-addon">是否生效：</label> 
								<select class="form-control" id="is_valid" name="is_valid">
									<option value="">--请选择--</option>
									<option value="0">未生效</option>
									<option value="1">已生效</option>
								</select>
							</div>
						</div>
					</div>
				 </form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="addSubmitBtn">
						<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;保存
					</button>
					
					<button type="button" class="btn btn btn-warning" id="addColsBtn"  data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
					</button>
				</div>
			</div>
		</div>
	</div>
	
</body>
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap-select.js"></script>
<!-- viliDate -->
<script type="text/javascript" src="<%=basePath%>/assets/plugins/validate/jquery.metadata.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets/plugins/validate/jquery.validate.message.cn.js"></script>
<!-- echarts js -->
<script src="<%=basePath%>assets/plugins/echarts/echarts.js"></script>
<script src="<%=basePath%>assets/plugins/echarts/macarons.js"></script>
<!-- 自定义js -->
<script type="text/javascript" src="<%=basePath%>pages/systemManage/unitManageList.js"></script>
<script>
	var path="<%=basePath%>";
	var unitManageList = new unitManageList();
</script>
</html>
