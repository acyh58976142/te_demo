<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>杆塔作用力关系表</title>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/bootstrap/css/bootstarp.style.css">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/bootstrap/css/bootstrap.min.css">
<link
	href="<%=request.getContextPath()%>/assets/plugins/datatables/dataTables.bootstrap.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/font-awesome/css/font-awesome.min.css">
<!-- 公共css -->
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/assets/css/common/default.css">
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<link rel="stylesheet"
	href="<%=basePath%>pages/structural/structuralParamterList.css">
<style type="text/css">
table {
	width: 100% !important;
}

</style>
</head>
<body>
	<div class="container">
		<form enctype="multipart/form-data" id="uploadForm"
			onsubmit="return false;">
			<a href="javascript:" id="clearContext" class="file pull-left"> <input
				type="file" name="filename" id="uploadify"
				accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
				style="display: none;" class="uploadfile" />
			</a>
		</form>
		<!--操作栏-->
		<div class="row row-margin0">
			<div class="col-md-12 col-xs-12">
				<div class="col-md-3">
							<div class="input-group" style="width:100%;">
								<label class="input-group-addon label-width1">选择工程</label> <select
									id="projectName1" class="form-control"
									data-stopPropagation="true">
								</select>
							</div>
						</div>
				<div class="col-md-3 col-xs-3">
					<div class="input-group">
						<label class="input-group-addon">杆塔类型：</label> <select
							class="form-control towerType_select">
						</select>
					</div>
				</div>
				<div class="col-md-3 col-xs-3">
					<button class="btn btn-info" id="structural_search"
						style="margin-top: 0px;">
						<span class="glyphicon glyphicon-search"></span>&nbsp;查询
					</button>
					</button>
					<button class="btn btn-info" id="structural_add"
						style="margin-top: 0px;">
						<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;添加
					</button>
					<button class="btn btn-info" id="structural_import"
						style="margin-top: 0px;">
						<span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;导入
					</button>
				</div>
			</div>
		</div>
		<div class="row row-margin0">
			<table id="relationTable" class="table table-bordered">
				<thead>
					<tr>
					    <th>序号</th>
						<th>杆塔名称</th>
						<th>呼高(m)</th>
						<th>杆塔型号</th>
						<th>全高(m)</th>
						<th>Nmax</th>
						<th>Nx</th>
						<th>Ny</th>
						<th>Tmax</th>
						<th>Tx</th>
						<th>Ty</th>
					    <th>操作</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="modal fade" tabindex="-1" role="dialog" id="addModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">添加杆塔作用力关系信息</h4>
				</div>
				<div class="modal-body">
				<div class="row">					
						<div class="col-md-6">
							<div class="input-group" style="width: 98%;">
								<label class="input-group-addon label-width1">选择工程</label> <select
									id="projectName" class="form-control"
									data-stopPropagation="true">
								</select>
							</div>
						</div>
					</div>
				<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">杆塔名称</label> <input
									id="towerName1" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">呼高(m)</label> <input
									id="huHeight1" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group" style="width:98%;">
								<label class="input-group-addon label-width1">杆塔型号</label>
									<select id="towerType" class="form-control">
									</select>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">全高(m)</label> <input
									id="fullHeight1" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Nmax</label> <input
									id="Nmax1" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Tmax</label> <input
									id="Tmax1" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Nx</label> <input
									id="Nx1" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Tx</label> <input
									id="Tx1" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Ny</label> <input
									id="Ny1" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Ty</label> <input
									id="Ty1" type="text" class="form-control" />
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="saveAddSubmitBtn">
						<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;保存
					</button>
					<button type="button" class="btn btn-warning" data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
					</button>
				</div>
			</div>
		</div>
	</div>
	
		<!-- model -->
	<div class="modal fade" tabindex="-1" role="dialog" id="updateModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">修改杆塔作用力关系信息</h4>
				</div>
				<div class="modal-body">
				<input id="relationid" type="text" class="form-control"
						style="display: none" />
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">杆塔名称</label> <input
									id="towerName2" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">呼高(m)</label> <input
									id="huHeight2" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group" style="width:100%;">
								<label class="input-group-addon label-width1">杆塔型号</label>
									 <input id="towerType2" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">全高(m)</label> <input
									id="fullHeight2" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Nmax</label> <input
									id="Nmax2" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Tmax</label> <input
									id="Tmax2" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Nx</label> <input
									id="Nx2" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Tx</label> <input
									id="Tx2" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Ny</label> <input
									id="Ny2" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">Ty</label> <input
									id="Ty2" type="text" class="form-control" />
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="saveUpateSubmitBtn">
						<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;保存
					</button>
					<button type="button" class="btn btn-warning" data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
					</button>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/common/default.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
	<!--附件上传  -->
<script type="text/javascript" src="<%=basePath%>assets/plugins/form/jquery.form.js"></script>
<!-- 自定义js -->
<script type="text/javascript"
	src="<%=basePath%>pages/structural/actingForceRelationList.js"></script>
<script type="text/javascript">
	var path = "<%=basePath%>";
</script>
</html>