<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>角色管理</title>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link href="<%=basePath%>assets/css/bootstrap/css/bootstarp.style.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link href="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/layer/mobile/need/layer.css" rel="stylesheet" />
<link href="<%=basePath%>assets/css/bootstrap/css/bootstrap-select.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/ztree/zTree_v3/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" />
<link href="<%=basePath%>assets/js/video/video-js.min.css" rel="stylesheet">
<link href="<%=basePath%>assets/js/viewer/css/viewer.min.css" rel="stylesheet">
<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet" />
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-12 col-xs-12">
				<h5>角色菜单管理</h5>
			</div>
		</div>
		<div class="row">
			<div class="col-md-1 col-xs-1"></div>
			<div class="col-md-8 col-xs-8 ztree" id="menuZtree"></div>
			<div class="col-md-3 col-xs-3 text-left common-paddingTop">
				<button class="btn btn-success" id="saveBtn"><span class="glyphicon glyphicon-floppy-saved"></span>&nbsp;保存</button>&nbsp;&nbsp;
				<button class="btn btn-info" onclick="javascript:location.href='<%=basePath%>roleManage/turnToRoleManageList.action'"><span class="glyphicon glyphicon-share-alt"></span>&nbsp;返回</button>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/jquery.dataTables.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap-select.js"></script>
<script src="<%=basePath%>assets/js/ztree/zTree_v3/js/jquery.ztree.core-3.5.js"></script>
<script src="<%=basePath%>assets/js/ztree/zTree_v3/js/jquery.ztree.excheck-3.5.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script>
<!-- 自定义js -->
<script type="text/javascript" src="<%=basePath%>pages/systemManage/menu.js"></script>
<script>
	var path="<%=basePath%>";
	var roleId = '${roleId}';
	var MenuFun = new MenuFun();
</script>
</html>
