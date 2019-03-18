<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
</head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
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
<style>
.label-width1 {
	width: 110px;
}
</style>
<title>筛选后的杆塔信息</title>
</head>
<body>
	<div class="container">
		<div class="row row-margin0 pull-right">
			<button class="btn btn-info" id="tower_return">返回</button>
		</div>

		<div class="row row-margin0">
			<div class="col-md-12">
				<div class="col-md-6">
					<table id="towerScreenTable" class="table table-bordered" border="0"
						cellspacing="0" cellpadding="0">
						<thead>
							<tr>
								<th>序号</th>
								<th>杆塔编号</th>
								<th>塔位里程千米+米</th>
								<th>杆塔形式</th>
								<th>杆塔定位呼高</th>
								<th>转角角度(米)</th>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
				</div>
				<div class="col-md-1 text-center">
					<div class="row">
						<button type="button" class="btn btn-primary" id="mergeSubmitBtn"
							style="margin-top: 10px;">
							归并&nbsp;&nbsp;<span class="glyphicon glyphicon-chevron-right"></span>
						</button>
					</div>
					<div class="row">
						<button type="button" class="btn btn-primary" id="deleteSubmitBtn"
							style="margin-top: 10px;">
							<span class="glyphicon glyphicon-chevron-left"></span>&nbsp;&nbsp;删除
						</button>
					</div>
				</div>
				<div class="col-md-5" style="overflow-y: auto;">
					<table id="towerMergeTable" class="table table-bordered" border="0"
						cellspacing="0" cellpadding="0">
						<thead>
							<tr>
							    <th>序号</th>
								<th>归并名称</th>
								<th>最大水平档距</th>
								<th>最大水平档距</th>
								<th>最大垂直档距</th>
								<th>最大垂直档距</th>
								<th>最大代表档距</th>
								<th>最大代表档距</th>
								<th>跳线水平档距</th>
								<th>跳线垂直档距</th>
								<th>转角角度</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<!-- 归并 -->
	<div class="modal fade" tabindex="-1" role="dialog"
		id="towerMergeModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">归并杆塔信息</h4>
				</div>
				<div class="modal-body">
					<div class="row row-margin0">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">归并名称</label> <input
									id="merge_name" type="text" class="form-control" />
							</div>
						</div>
					</div>
					
					<div class="row row-margin0">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">导线型号</label> <input
									id="conductor_type" type="text" class="form-control" readonly="readonly" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon label-width1">转角度数</label> <input
									id="k_angle" type="text" class="form-control"
									readonly="readonly" />
							</div>
						</div>
					</div>

					<div class="row row-margin0">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon ">最大垂直档距</label> <input
									id="g_max" type="text" class="form-control" readonly="readonly" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon ">最小垂直档距</label> <input
									id="g_min" type="text" class="form-control" readonly="readonly" />
							</div>
						</div>
					</div>

					<div class="row row-margin0">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon ">最大水平档距</label> <input
									id="f_max" type="text" class="form-control" readonly="readonly" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon ">最小水平档距</label> <input
									id="f_min" type="text" class="form-control" readonly="readonly" />
							</div>
						</div>
					</div>

					<div class="row row-margin0">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon ">最大代表档距</label> <input
									id="j_max" type="text" class="form-control" readonly="readonly" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon ">最小代表档距</label> <input
									id="j_min" type="text" class="form-control" readonly="readonly" />
							</div>
						</div>
					</div>

					<div class="row row-margin0">
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon ">跳线水平档距</label> <input
									id="jumper_f" type="text" class="form-control"
									readonly="readonly" />
							</div>
						</div>
						<div class="col-md-6">
							<div class="input-group">
								<label class="input-group-addon ">跳线垂直档距</label> <input
									id="jumper_g" type="text" class="form-control"
									readonly="readonly" />
							</div>
						</div>
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" id="saveSubmitBtn">
						<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;确定
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
<script type="text/javascript"
	src="<%=basePath%>pages/tower/towerMerge.js"></script>
<script type="text/javascript">
	var path = "<%=basePath%>";
	var projectId="${requestScope.projectId}";
</script>
</html>