<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>角色管理</title>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstarp.style.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/layer/mobile/need/layer.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap-select.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/video/video-js.min.css" rel="stylesheet">
<link href="<%=basePath%>assets/js/viewer/css/viewer.min.css" rel="stylesheet">
<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet" />
<!-- 自定义 css -->
<link href="<%=basePath%>pages/systemManage/roleManageList.css" rel="stylesheet" />
</head>
<body>
	<div class="container">
		<!-- 查询条件  Start -->
		<div class="row">
			<div class="col-md-4 col-xs-4">
				<div class="input-group">
					<label class="input-group-addon">角色名称：</label> 
					<input type="text" id="roleName" name="roleName" class="form-control" placeholder="请输入角色名称" />
				</div>
			</div>
			
			<div class="col-md-2 col-sm-4">
				<button class="btn btn-info" id="btn_search">
						<span class="glyphicon glyphicon-search"></span>&nbsp;查询
				</button>
				<!-- Button trigger modal -->
				<button type="button" id="btn_add" class="btn btn-success" data-toggle="modal" data-target="#myRoleModal">
					<span class="glyphicon glyphicon-plus"></span>&nbsp;添加
				</button>
			</div>
			
			

			<!-- <div class="col-md-1 col-md-offset-6">
				Button trigger modal
				<button type="button" id="btn_add" class="btn btn-success" data-toggle="modal" data-target="#myRoleModal">
					<span class="glyphicon glyphicon-plus"></span>&nbsp;新增
				</button>
			</div> -->

		</div>
		<!-- 查询条件  End -->

		<!-- 表格数据展示  Start -->
		<div class="row">
			<div class="tab-content" id="tab-content">
				<table class="table table-bordered table-hover" id="roleManageList_table">
					<thead>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
		<!-- 表格数据展示  End -->
	</div>


	<!--模态框开始-->


	<!-- Modal -->
	<div class="modal fade" id="myRoleModal" tabindex="-1" role="dialog" aria-labelledby="myRoleModal" aria-hidden="true" data-backdrop="false">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">新增角色信息</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="roleManageForm" >
						<div class="input-group" style="display:none;">
							<label class="input-group-addon">角色id :</label> <input class="form-control" type="text" id="role_id"
								name="role_id" />
						</div>

						<div class="input-group">
							<label class="input-group-addon">角色名称 :</label> <input class="form-control" type="text" id="role_name"
								name="role_name" placeholder="请输入角色名称"/>

						</div>

						<div class="input-group">
							<label class="input-group-addon">角色描述 :</label> <input class="form-control" type="text" id="roledesc"
								name="roledesc" placeholder="请输入角色描述"/>

						</div>

						<div class="input-group"  style="display:none;">
							<label class="input-group-addon">角色编码 :</label> <input class="form-control" type="text" id="role_code"
								name="role_code" />

						</div>

						<div class="modal-footer">
							<button type="button" class="btn btn-primary" id="btn_save">
								<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;保存
							</button>
							<button type="button" class="btn btn btn-warning" data-dismiss="modal">
								<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<!--模态框结束-->




</body>
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap-select.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script>

<!-- 前台校验js -->
<script type="text/javascript" src="<%=basePath%>assets/js/validate/jquery.metadata.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/validate/jquery.validate.message.cn.js"></script>
<!-- 自定义js -->
<script type="text/javascript" src="<%=basePath%>pages/systemManage/roleManageList.js"></script>
<script>
	var path="<%=basePath%>";
	var roleManageList = new roleManageList();
</script>
</html>
