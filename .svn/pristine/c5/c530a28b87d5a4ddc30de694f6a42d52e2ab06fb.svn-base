<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String filePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>串型配置</title>
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstarp.style.css"
	rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css"
	rel="stylesheet" />
<link
	href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css"
	rel="stylesheet" />
<link
	href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css"
	rel="stylesheet" />

<!-- ZTree css -->
<link
	href="<%=basePath%>assets/js/ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css"
	rel="stylesheet">

<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet" />
<!-- 自定义css -->
<link href="<%=basePath%>pages/serialConfig/serialConfigTable.css"
	rel="stylesheet" />
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<style type="text/css">
</style>
</head>
<body>
	<ul id="myTab" class="nav nav-tabs"
		style="padding-top: 10PX; margin-left: 1%;">
		<li class="active"><a href="#stingConfig" class="activeIdHref"
			data-toggle="tab">串型配置</a></li>
		<li><a href="#index" data-toggle="tab" class="activeIdHref"
			data-toggle="tab">目录(20串)</a></li>
		<li><a href="#description" class="activeIdHref" data-toggle="tab">套用说明(20串)</a></li>
		<li><a href="#info" class="activeIdHref" data-toggle="tab">套图信息表</a></li>
		<li class="pull-right"><button type="button"
				class="btn btn-success" id="addBtn">
				<span class="glyphicon glyphicon-plus"></span>&nbsp;导出
			</button></li>
	</ul>
	<div class="container">
		<div id="myTabContent" class="tab-content">
			<!-- 串型配置开始 -->
			<div class="tab-pane fade in active" id="stingConfig">
				<ul id="stringTab" class="nav nav-tabs">
					<li class="active"><a href="#daoxianXCC" class="activeIdHref"
						data-toggle="tab">导线悬垂串</a></li>
					<li><a href="#daoxianNZC" class="activeIdHref"
						data-toggle="tab">导线耐张串</a></li>
					<li><a href="#tiaoxianC" class="activeIdHref"
						data-toggle="tab">跳线串</a></li>
					<li><a href="#dixianXCC" class="activeIdHref"
						data-toggle="tab">地线悬垂串</a></li>
					<li><a href="#dixianNZC" class="activeIdHref"
						data-toggle="tab">地线耐张串</a></li>
				</ul>
				<div class="tab-content">

					<!-- 导线悬垂串开始 -->
					<div class="tab-pane fade in active" id="daoxianXCC">
						<table class="table table-bordered table-hover"
							id="daoxianXCC_table" style="table-layout: fixed">
							<thead>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<!-- 导线悬垂串结束 -->

					<!-- 导线耐张串开始 -->
					<div class="tab-pane fade" id="daoxianNZC">
						<table class="table table-bordered table-hover"
							id="daoxianNZC_table" style="table-layout: fixed">
							<thead>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<!-- 导线耐张串结束 -->

					<!-- 跳线串开始 -->
					<div class="tab-pane fade" id="tiaoxianC">
						<table class="table table-bordered table-hover"
							id="tiaoxianC_table" style="table-layout: fixed">
							<thead>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<!-- 跳串结束 -->

					<!-- 地线悬垂串开始 -->
					<div class="tab-pane fade" id="dixianXCC">
						<table class="table table-bordered table-hover"
							id="dixianXCC_table" style="table-layout: fixed">
							<thead>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<!-- 地线悬垂串结束 -->

					<!-- 地线耐张串开始 -->
					<div class="tab-pane fade" id="dixianNZC">
						<table class="table table-bordered table-hover"
							id="dixianNZC_table" style="table-layout: fixed">
							<thead>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<!-- 地线耐张串结束 -->

				</div>
			</div>

			<!-- 串型配置结束 -->

			<!-- 目录(20串)开始 -->
			<div class="tab-pane fade" id="index">
				<div id="indexContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 目录(20串)结束 -->

			<!-- 套用说明(20串)开始 -->
			<div class="tab-pane fade" id="description">
				<div id="descriptionContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 套用说明(20串)结束 -->

			<!-- 套图信息表开始 -->
			<div class="tab-pane fade" id="info">
				<div id="infoContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 套图信息表结束 -->
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
	src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/bootstrap/bootstrap-select.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.register.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/common/default.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/validate/jquery.metadata.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/validate/jquery.validate.message.cn.js"></script>
<!-- 自定义js -->
<script type="text/javascript"
	src="<%=basePath%>pages/serialConfig/serialConfigTable.js"></script>
<script>
	var basePath="<%=basePath%>";
	var serialConfig = new serialConfig();
</script>
</html>
