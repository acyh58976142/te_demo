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
.label-width1{
	width: 110px;
}
</style>
<title>所有的杆塔信息</title>
</head>
<body>
	<div class="container">
		<div class="row row-margin0">
			<div class="col-md-12 col-xs-12">
				<div class="col-md-3 col-xs-3">
					<div class="input-group">
						<label class="input-group-addon">工程：</label> <select
							class="form-control" id="projectName">
						</select>
					</div>
				</div>

				<div class="col-md-3 col-xs-3">
					
					<button class="btn btn-info" id="tower_add"
						style="margin-top: 0px;">
						<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;筛选
					</button>
				</div>
			</div>
		</div>

		<div class="row row-margin0">
			<table id="towerTable" class="table table-bordered" border="0"
				cellspacing="0" cellpadding="0">
				<thead>
					<tr>
						<th>序号</th>
						<th>杆塔编号</th>
						<th>塔位里程千米+米</th>
						<th>杆塔形式</th>
						<th>杆塔定位呼高</th>
						<!-- <th>档距(米)</th>
						<th>水平档距(米)</th>
						<th>垂直档距(米)</th>
						<th>耐张段长(米)</th>
						<th>代表档距(米)</th> -->
						<th>转角角度(米)</th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>
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
	src="<%=basePath%>pages/tower/towerList.js"></script>
<script type="text/javascript">
	var path = "<%=basePath%>";
</script>
</html>