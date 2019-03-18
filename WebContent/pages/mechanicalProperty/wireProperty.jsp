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
<title>力学特性与架线弧垂</title>
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstarp.style.css"
	rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css"
	rel="stylesheet" />
<link
	href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css"
	rel="stylesheet" />

<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet" />
<!-- 自定义css -->
<link href="<%=basePath%>pages/mechanicalProperty/wireProperty.css"
	rel="stylesheet" />
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<style type="text/css">
</style>
</head>
<body>
	<ul id="myTab" class="nav nav-tabs"
		style="padding-top: 10PX; margin-left: 1%;">
		<li class="active"><a href="#wireComputeBook" class="activeIdHref"
			data-toggle="tab">导线计算书</a></li>
		<li><a href="#wireProperty" class="activeIdHref" data-toggle="tab">导线力学特性表</a></li>
		<li><a href="#wireStringing" class="activeIdHref" data-toggle="tab">导线架线表</a></li>
		<li><a href="#groundComputeBook" class="activeIdHref"	data-toggle="tab">地线计算书</a></li>
		<li><a href="#groundProperty" class="activeIdHref" data-toggle="tab">地线力学特性表</a></li>
		<li><a href="#groundStringing" class="activeIdHref" data-toggle="tab">地线架线表</a></li>
		<li class="pull-right"><button type="button"
				class="btn btn-success" id="addBtn">
				<span class="glyphicon glyphicon-plus"></span>&nbsp;导出
			</button></li>
		<li class="pull-right"><button class="btn btn-warning" id="saveBtn"  style="margin-right: 5px;">
					<i class="glyphicon glyphicon-search"></i>&nbsp;保存
				</button></li>
		<li class="pull-right"><button class="btn btn-danger" id="calcBtn"  style="margin-right: 5px;">
					<i class="glyphicon glyphicon-transfer"></i>&nbsp;计算
				</button></li>
	</ul>
	<div class="container">
		<div id="tabs" class="tab-content">
			<!-- 导线计算书开始 -->
			<div class="tab-pane fade in active" id="wireComputeBook">
				<div id="wireComputeBookContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>

			<!-- 导线计算书结束 -->

			<!-- 导线力学特性表开始 -->
			<div class="tab-pane fade" id="wireProperty">
				<div id="wirePropertyContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 导线力学特性表结束 -->
			
			<!-- 导线架线表开始 -->
			<div class="tab-pane fade" id="wireStringing">
				<div id="wireStringingContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 导线架线表结束 -->
			
			<!-- 地线计算书开始 -->
			<div class="tab-pane fade" id="groundComputeBook">
				<div id="groundComputeBookContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 地线计算书结束 -->

			<!-- 地线力学特性表开始 -->
			<div class="tab-pane fade" id="groundProperty">
				<div id="groundPropertyContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 地线力学特性表结束 -->

			<!-- 地线架线表开始 -->
			<div class="tab-pane fade" id="groundStringing">
				<div id="groundStringingContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 地线架线表结束 -->
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
	src="<%=basePath%>pages/mechanicalProperty/wireProperty.js"></script>
<script type="text/javascript"
	src="<%=basePath%>pages/mechanicalProperty/groundProperty.js"></script>

<script>
	var basePath="<%=basePath%>";
	var wireProperty = new wireProperty();
	var groundProperty = new groundProperty();
</script>
</html>
