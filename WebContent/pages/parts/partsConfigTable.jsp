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
<link href="<%=basePath%>pages/parts/partsConfigTable.css"
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
			data-toggle="tab">默认配置</a></li>
		<li><a href="#description" class="activeIdHref" data-toggle="tab">OPGW光缆防振锤安装数量原则</a></li>
		<li><a href="#info" class="activeIdHref" data-toggle="tab">区段配置</a></li>
		<li><a href="#cable" class="activeIdHref" data-toggle="tab">光缆盘长计算</a></li>
	</ul>
	<div class="container">
		<div id="myTabContent" class="tab-content">
			<!-- 串型配置开始 -->
			<div class="tab-pane fade in active" id="stingConfig">
			<div id="stingContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			</div>

			<!-- 串型配置结束 -->

			<!-- 目录(20串)开始 -->
			<div class="tab-pane fade" id="index">
				<div id="indexContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			<!-- 目录(20串)结束 -->

		
			<div class="tab-pane fade" id="description">
				<div id="descriptionContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
	
	
			<div class="tab-pane fade" id="info">
				<div id="infoContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>
			
			<div class="tab-pane fade" id="cable">
				<div id="cableContainer"
					style="border: 1px solid #DDECFE; overflow: hidden;"></div>
			</div>

		</div>
	</div>



</body>
<script type="text/javascript"
	src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.register.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/zcell/ZCell.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/common/default.js"></script>

<!-- 自定义js -->
<script type="text/javascript"
	src="<%=basePath%>pages/parts/partsConfigTable.js"></script>
<script>
	var basePath="<%=basePath%>";
	var partsConfig = new partsConfig();
</script>
</html>
