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
<title>基本分类参数</title>
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
		<!-- 	<input type="text" 	style="display: none;" id="projectId"> -->
		</form>
		<!--操作栏-->
		<div class="row row-margin0">
		   <div class="col-md-12 col-xs-12">
			<div class="col-md-3 col-xs-3">
				<div class="input-group">
					<label class="input-group-addon">地质描述：</label> 
					<select class="form-control geologyDescrip_select" >						
					</select>
				</div>
			</div>
			<div class="col-md-3 col-xs-3">
				<div class="input-group">
					<label class="input-group-addon">工程：</label> 
					<select class="form-control" id="projectName">						
					</select>
				</div>
			</div>
			<div class="col-md-3 col-xs-3">
				<div class="input-group">
					<label class="input-group-addon">杆塔类型：</label> 
					<select class="form-control towerType_select" >						
					</select>
				</div>
			</div>			
			<div class="col-md-3 col-xs-3">
			    <button class="btn btn-info" id="structural_search" style="margin-top: 0px;">
					<span class="glyphicon glyphicon-search"></span>&nbsp;查询
				</button>
				</button>
				<button class="btn btn-info" id="structural_add" style="margin-top: 0px;">
					<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;添加
				</button>
			   <button class="btn btn-info" id="structural_import" style="margin-top: 0px;">
					<span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;导入
				</button>
				<!-- <button class="btn btn-info" id="structural_export" style="margin-top: 0px;">
					<span class="glyphicon glyphicon-folder-close"></span>&nbsp;&nbsp;导出
				</button> --> 
			</div>
			</div>
		</div>
		<div class="row row-margin0 ">
			<table id="structuralTable" class="table table-bordered" border="0"
				cellspacing="0" cellpadding="0">
				<thead>
					<tr>
					    <th rowspan="2">序号</th>
						<th rowspan="2">地质描述</th>
						<th rowspan="2">杆塔类型</th>
						<th rowspan="2">作用力</th>
						<th rowspan="2">转角拉<br />压方式
						</th>
						<th rowspan="2">塔形</th>
						<th rowspan="2">只数</th>
						<th colspan="4">及钢材</th>
						<th colspan="2">垫层标号及数量</th>
						<th colspan="4">基础尺寸</th>
						<th rowspan="2">基础型号</th>
						<th rowspan="2">备注</th>
						<th rowspan="2">操作</th>
					</tr>
					<tr>
						<th>标号</th>
						<th>混泥土<br />量(m³)
						</th>
						<th>钢材量</th>
						<th>地栓</th>
						<th>标号</th>
						<th>垫层(m³)</th>
						<th>埋深</th>
						<th>底板宽</th>
						<th>立柱宽</th>
						<th>立柱出<br />土高(m)
						</th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>
		</div>
	</div>

	<!-- model -->
	<div class="modal fade" tabindex="-1" role="dialog" id="updateModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">修改参数信息</h4>
				</div>
				<div class="modal-body">
					<input id="paramid" type="text" class="form-control"
						style="display: none" />					
					<div class="row">					
						<div class="col-md-6">
							<div class="input-group" style="width: 100%;">
								<label class="input-group-addon label-width1">地质描述</label> <select
									id="geologicalDescription" class="form-control"
									data-stopPropagation="true">
								</select>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">杆塔类型</label> <input
									id="towerType" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">作用力</label> <input
									id="actingForce" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group" style="width: 100%;">
								<label class="input-group-addon label-width2">转角拉压方式</label> <select
									id="angleLY" class="form-control" data-stopPropagation="true">
									<option value="L">L</option>
									<option value="Y">Y</option>
								</select>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">塔形</label> <input
									id="towerShaped" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">只数</label> <input
									id="countOnly" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">钢材标号</label> <input
									id="steelLabel" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">混泥土量(m³)</label> <input
									id="soilVolume" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">钢材量</label> <input
									id="steelQuantity" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">地栓</label> <input
									id="earthBolt" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">垫层标号</label> <input
									id="beddingLabel" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">垫层(m³)</label> <input
									id="cushion" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">埋深</label> <input
									id="buryingDepth" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">底板宽</label> <input
									id="baseplateWidth" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">立柱宽</label> <input
									id="columnWidth" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">立柱出土高</label> <input
									id="columnHigh" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">基础型号</label> <input
									id="basicModel" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">备注</label> <input
									id="remark" type="text" class="form-control" />
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="saveSubmitBtn">
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
<script type="text/javascript"
	src="<%=basePath%>pages/structural/structuralParamterList.js"></script>
<script type="text/javascript">
   var path="<%=basePath%>";
</script>
</html>