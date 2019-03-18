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
<title>地质参数表</title>
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
<style type="text/css">
.table > thead > tr > th {
   vertical-align: middle;
}
</style>
</head>
<body>
<div class="container">
		<!-- <form enctype="multipart/form-data" id="uploadForm"
			onsubmit="return false;">
			<a href="javascript:" id="clearContext" class="file pull-left"> <input
				type="file" name="filename" id="uploadify"
				accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
				style="display: none;" class="uploadfile" />
			</a>
		</form> -->
		<!--操作栏-->
		<div class="row row-margin0">
		   <div class="col-md-12 col-xs-12">
			<div class="col-md-3 col-xs-3">
				<div class="input-group">
					<label class="input-group-addon">地质名称：</label>
					<input class="form-control ConfigureName"> 
				</div>
			</div>
			<div class="col-md-3 col-xs-3">
				<div class="input-group">
					<label class="input-group-addon">地质状态：</label> 
					<select class="form-control" id="configureState">						
					</select>
				</div>
			</div>		
			<div class="col-md-6 col-xs-6">
			    <button class="btn btn-info" id="geo_search" style="margin-top: 0px;">
					<span class="glyphicon glyphicon-search"></span>&nbsp;查询
				</button>
				</button>
				<button class="btn btn-info" id="geo_add" style="margin-top: 0px;">
					<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;添加
				</button>
			   <!-- <button class="btn btn-info" id="geo_import" style="margin-top: 0px;">
					<span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;导入
				</button> -->
			</div>
			</div>
		</div>
		<div class="row row-margin0 ">
			<table id="geoTable" class="table table-bordered" border="0"
				cellspacing="0" cellpadding="0">
				<thead>
					<tr>
					    <th>序号</th>
						<th>地层名称</th>
						<th>层底深度</th>
						<th>岩土描述</th>
						<th>重力密度 </th>
						<th>黏聚力</th>
						<th>内摩擦角</th>
						<th>承载力特征值</th>
						<th>桩的极限侧<br/>阻力标准值</th>
						<th>桩的极限端<br/>阻力标准值</th>
						<th>地层状态</th>
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
					<h4 class="modal-title">添加地质参数信息</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-md-6">
							<div class="input-group" style="width: 100%;">
								<label class="input-group-addon label-width2">地层名称</label> <input
									id="stratigraphicName1" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">层底深度</label> <input
									id="floorDepth1" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">地层状态</label> <input
									id="stratigraphicState1" type="text" class="form-control"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="input-group">
								<label class="input-group-addon label-width1">岩土描述</label> <input
									id="geotechnicalDescription1" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">重力密度r(kN/m³)</label> <input
									id="gravityDensity1" type="text" class="form-control"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">粘聚力C(kPa)</label> <input
									id="cohesion1" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">内摩擦角φ(°)</label> <input
									id="internalFrictionAngle1" type="text" class="form-control"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">承载力特征值fak(kPa)</label> <input
									id="eigenvalueCapacity1" type="text" class="form-control"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">桩的极限侧阻力qsik(kPa)</label> <input
									id="standardSideResistance1" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">桩的极限端阻力qpk(kPa)</label> <input
									id="standardEndResistance1" type="text" class="form-control"/>
							</div>
						</div>
					</div>
					
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="addSubmitBtn">
						<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;保存
					</button>
					<button type="button" class="btn btn-warning" data-dismiss="modal">
						<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
					</button>
				</div>
			</div>
		</div>
	</div>
	
	
	<div class="modal fade" tabindex="-1" role="dialog" id="updateModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">修改地质参数信息</h4>
				</div>
				<div class="modal-body">
				<input id="paramid" type="text" class="form-control"
						style="display: none" />	
					<div class="row">
						<div class="col-md-6">
							<div class="input-group" style="width: 100%;">
								<label class="input-group-addon label-width2">地层名称</label><input
									id="stratigraphicName" type="text" class="form-control" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">层底深度</label> <input
									id="floorDepth" type="text" class="form-control" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">地层状态</label> <input
									id="stratigraphicState" type="text" class="form-control"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="input-group">
								<label class="input-group-addon label-width1">岩土描述</label> <input
									id="geotechnicalDescription" type="text" class="form-control"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">重力密度r(kN/m³)</label> <input
									id="gravityDensity" type="text" class="form-control"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">粘聚力C(kPa)</label> <input
									id="cohesion" type="text" class="form-control"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">内摩擦角φ(°)</label> <input
									id="internalFrictionAngle" type="text" class="form-control"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">承载力特征值fak(kPa)</label> <input
									id="eigenvalueCapacity" type="text" class="form-control"/>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">桩的极限侧阻力qsik(kPa)</label> <input
									id="standardSideResistance" type="text" class="form-control"/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width2">桩的极限端阻力qpk(kPa)</label> <input
									id="standardEndResistance" type="text" class="form-control"/>
							</div>
						</div>
					</div>
					
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="updateSubmitBtn">
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
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap-select.js"></script>
<!--导出word  -->
<script type="text/javascript" src="<%=basePath%>/assets/plugins/FileSaver.js-master/FileSaver.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets/plugins/jQuery-Word-Export-master/jquery.wordexport.js"></script>
<!--附件上传  -->
<script type="text/javascript" src="<%=basePath%>assets/plugins/form/jquery.form.js"></script>
<!-- 自定义js -->
<script type="text/javascript" src="<%=basePath%>pages/geology/geologyParam.js"></script>
<script>
	var path="<%=basePath%>";
</script>
</html>