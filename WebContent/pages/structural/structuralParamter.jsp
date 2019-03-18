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
	href="<%=basePath%>pages/structural/structuralParamter.css">
<style type="text/css">
#structuralTable td {
	padding: 8px;
}
</style>
</head>
<body>
	<div class="container">
		<!--操作栏-->
		<div class="row row-margin0 row-margin-top10">
			<div class="col-md-4 col-xs-4">
				<div class="input-group">
					<label class="input-group-addon">选择工程</label> <select
						class="form-control" id="projectName"></select>
				</div>
			</div>
			<div class="col-md-8 col-xs-8">
				<button class="btn btn-info" id="structural_add" style="margin-top: 0px;">新加一条</button>
				<button class="btn btn-info" id="structural_save" style="margin-top: 0px;">保存</button>
				<button class="btn btn-info" id="structural_return" style="margin-top: 0px;">返回</button>
			</div>
		</div>

		<div class="row row-margin0 row-margin-top10">
			<table id="structuralTable" style="width: 100%; overflow-x: auto;"
				border="0" cellspacing="0" cellpadding="0">
				<thead>
					<tr>
						<th rowspan="2" style="width: 100px !important;">地质描述</th>
						<th rowspan="2" style="width: 170px !important;">杆塔类型</th>
						<th rowspan="2">作用力</th>
						<th rowspan="2" style="width: 40px !important;">转角拉压方式</th>
						<th rowspan="2">塔形</th>
						<th rowspan="2">只数</th>
						<th colspan="4">及钢材</th>
						<th colspan="2">垫层标号及数量</th>
						<th colspan="4">基础尺寸</th>
						<th rowspan="2" style="width: 100px !important;">基础型号</th>
						<th rowspan="2" style="width: 100px !important;">备注</th>
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
				<tbody id="structuralBody">

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
	src="<%=basePath%>pages/structural/structuralParamter.js"></script>
<script type="text/javascript">
   var path="<%=basePath%>";
  // var paramter=new Paramter();
</script>
</html>