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
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstarp.style.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" />

<!-- ZTree css -->
<link href="<%=basePath%>assets/js/ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet" />
<!-- 自定义css -->
<link href="<%=basePath%>pages/wiringDrawing/wiringDrawing.css" rel="stylesheet" />
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<style type="text/css">
</style>
</head>
<body>
	<div class="container">
			<!-- 孤立档架线弧垂表开始<div class="tab-pane fade" id="wiringDrawing"> -->
				<div id="wiringDrawingContainer"></div>
			<!-- 孤立档架线弧垂表开始</div> -->
	</div>
</body>
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap-select.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell.register.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/validate/jquery.metadata.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/validate/jquery.validate.message.cn.js"></script>
<!-- 自定义js -->
<script type="text/javascript" src="<%=basePath%>pages/wiringDrawing/wiringDrawing.js"></script>
<script>
	var basePath="<%=basePath%>";
	var wiringDrawing = new wiringDrawing();
</script>
</html>
