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
<title>架线施工图</title>
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstarp.style.css"
	rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css"
	rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap-table.css"
	rel="stylesheet" />
<link
	href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css"
	rel="stylesheet" />
<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet" />
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<!-- 自定义css -->
<link href="<%=basePath%>pages/wiringDrawing/wiringDrawing.css"
	rel="stylesheet" />
<style type="text/css">
</style>
</head>
<body>

	<ul id="myTab" class="nav nav-tabs"
		style="padding-top: 10PX; margin-left: 1%;">
		<li><a href="#default" class="activeIdHref"
			data-toggle="tab">连续档配置</a></li>
		<li><a href="#choose" class="activeIdHref"
			data-toggle="tab">孤立档选择</a></li>
		<li class="active"><a href="#config"
			class="activeIdHref" data-toggle="tab">孤立档配置与计算</a></li>
		<li><a href="#weather" class="activeIdHref"
			data-toggle="tab">孤立档气象条件</a></li>
		<li><a href="#index" data-toggle="tab" class="activeIdHref" data-toggle="tab">目录</a></li>
		<li><a href="#sag" class="activeIdHref" data-toggle="tab">孤立档架线弧垂表</a></li>
		<li><a href="#groundStringing" data-toggle="tab" class="activeIdHref" data-toggle="tab">套用修改说明</a></li>
		<li><a href="#info" class="activeIdHref" data-toggle="tab">套图信息表</a></li>
		<li class="pull-right"><button type="button"
				class="btn btn-success" id="addBtn">
				<span class="glyphicon glyphicon-plus"></span>&nbsp;导出
			</button></li>
		<li class="pull-right"><button class="btn btn-warning"
				id="saveBtn" style="margin-right: 5px;">
				<i class="glyphicon glyphicon-search"></i>&nbsp;保存
			</button></li>
		<li class="pull-right"><button class="btn btn-danger"
				id="calcBtn" style="margin-right: 5px;">
				<i class="glyphicon glyphicon-transfer"></i>&nbsp;计算
			</button></li>

	</ul>
	<div class="container">
		<div id="tabs" class="tab-content">
			<!-- 孤立档选择开始 -->
			<div class="tab-pane fade" id="choose">
				<ul class="nav">
					<li class="pull-right"><button type="button"
					class="btn btn-primary" id="searchBtn" style="margin-right: 5px;">
					<span class="glyphicon glyphicon-search"></span>&nbsp;查询
					</button></li>
					<li class="pull-right">
					<select id="mainInfo" class="form-control tab-group-control"></select></li>
					<li class="pull-right"><span class="form-control tab-group-control tab-addon">工程列表:</span></li>
				</ul>
				<table class="table table-striped table-bordered table-hover table-condensed" id="isolatedTable">
					<thead>
						<tr><th>序号</th><th>孤立档</th><th>档距(m)</th><th>挂线高差</th><th>操作</th></tr>
					</thead>
					<tbody>
						<tr><td colspan="5">暂无数据</td></tr>
					</tbody>
				</table>
			</div>
			<!-- 孤立档选择开始 -->
			
			<!-- 连续档配置开始 -->
			<div class="tab-pane fade" id="default">
				<ul class="nav">
					<li class="pull-right">
					<button type="button"
					class="btn btn-primary" id="searchBtnContinuity" style="margin-right: 5px;">
					<span class="glyphicon glyphicon-search"></span>&nbsp;查询
					</button>
					<button type="button"
					class="btn btn-primary" id="setDrawing" style="margin-right: 5px;">
					<span class="glyphicon glyphicon-search"></span>&nbsp;生成
					</button></li>
					<li class="pull-right">
					<select id="continuityWireway" class="form-control tab-group-control"></select></li>
					<li class="pull-right"><span class="form-control tab-group-control tab-addon">工程列表:</span></li>
				</ul>
				<div id="isolatedDefaultContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 连续档配置开始 -->
		
			<!-- 孤立档配置与计算开始 -->
			<div class="tab-pane fade in active" id="config">
				<div id="isolatedConfigContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>

			<!-- 孤立档配置与计算结束 -->

			<!-- 孤立档气象条件开始 -->
			<div class="tab-pane fade" id="weather">
				<div id="isolatedWeatherContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 孤立档气象条件结束 -->

			<!--目录开始 -->
			<div class="tab-pane fade" id="index">
				<div id="indexContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 目录结束 -->

			<!-- 孤立档架线弧垂表开始 -->
			<div class="tab-pane fade" id="sag">
				<div id="wiringDrawingContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 孤立档架线弧垂表结束 -->

			<!-- 套用修改说明开始 -->
			<div class="tab-pane fade" id="groundStringing">
				<div id="groundStringingContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 套用修改说明结束 -->
			
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
	src="<%=basePath%>assets/js/bootstrap/bootstrap-table.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/bootstrap/bootstrap-table-zh-CN.js"></script>
<%-- <script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.register.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.min.js"></script> --%>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell-util.js"></script>
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
	src="<%=basePath%>pages/wiringDrawing/wiringDrawingTemplate.js"></script>
<script type="text/javascript"
	src="<%=basePath%>pages/wiringDrawing/wiringDrawing.js"></script>
<script>
	var basePath="<%=basePath%>";
	var wiringDrawing = new wiringDrawing();
</script>
</html>
