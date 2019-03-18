<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<!--使用IE内核浏览器来访问，会渲染至该浏览器的最高版本  -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>材料</title>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/bootstrap/css/bootstarp.style.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/bootstrap/css/bootstrap.min.css">
<link href="<%=request.getContextPath()%>/assets/plugins/datatables/dataTables.bootstrap.css" rel="stylesheet">
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/assets/css/common/default.css">
<style type="text/css">
iframe{
   border:0px;
}
</style>
</head>
<body>

      	<ul id="myTab" class="nav nav-tabs" style="padding-top: 10PX; margin-left: 1%;">
		<li class="active">
		    <a href="#description" class="activeIdHref"
			data-toggle="tab">组配件说明</a>
		</li>
		<li>
		    <a href="#weight" data-toggle="tab" class="activeIdHref"
			data-toggle="tab">导地线重量</a>
		</li>
		<li>
		    <a href="#insulation" data-toggle="tab" class="activeIdHref"
			data-toggle="tab">绝缘子串数量</a>
		</li>
		<li class="pull-right"><button type="button"
				class="btn btn-primary" id="returnBtn" style="margin-right: 5px;">
				<span class="glyphicon glyphicon-search"></span>&nbsp;返回
		   	</button>
		</li>
		</ul>
		
	    <div class="container">
	    <div id="myTabContent" class="tab-content" style="width: 100%;height: 100%;">
			    <div class="tab-pane fade in active" id="description" style="width: 100%;height: 100%;">
			        <iframe width="100%" height="100%" src="partsExplain.action?id=${requestScope.projectId}" ></iframe>
			    </div>
			    <div class="tab-pane fade " id="weight" style="width: 100%;height: 100%;">
			        <iframe width="100%" height="100%" src="toMaterialGroundWire.action?projectId=${requestScope.projectId}&projectName=${requestScope.projectName}"></iframe>
			    </div>
			    <div class="tab-pane fade " id="insulation" style="width: 100%;height: 100%;">
			        <iframe width="100%" height="100%" src=""></iframe>
			    </div>
	    </div>
	    
	
        </div>
</body>	
			
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/plugins/jQuery/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/js/layer/layer.js"></script>
<script src="<%=request.getContextPath()%>/assets/plugins/datatables/jquery.dataTables.js"></script>
<script src="<%=request.getContextPath()%>/assets/plugins/datatables/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/material/materialList.js"></script>
<script type="text/javascript">
	var path="<%=request.getContextPath()%>";
	$("#returnBtn").click(function(){
		location.href = path+"/material/toMaterialList.action";
		
	})
</script>
</html>