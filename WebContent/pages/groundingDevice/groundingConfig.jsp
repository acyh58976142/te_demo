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
<title>接地配置</title>
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
<!-- common css -->
<link href="<%=basePath%>assets/css/common/default.css" rel="stylesheet" />
<!-- 自定义css -->
<link href="<%=basePath%>pages/groundingDevice/groundingConfig.css"
	rel="stylesheet" />
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<style type="text/css">
</style>
</head>
<body>
	<ul id="myTab" class="nav nav-tabs"
		style="padding-top: 10PX; margin-left: 1%;">
		<li class="active"><a href="#stingConfig" class="activeIdHref"
			data-toggle="tab">接地配置</a></li>
		<li><a href="#index" data-toggle="tab" class="activeIdHref"
			data-toggle="tab">目录(20串)</a></li>
		<!-- <li class="pull-right"><button type="button"
				class="btn btn-success" id="addBtn">
				<span class="glyphicon glyphicon-plus"></span>&nbsp;导出
			</button></li> -->
		<li class="pull-right"><button type="button"
				class="btn btn-primary" id="returnBtn" style="margin-right: 5px;">
				<span class="glyphicon glyphicon-search"></span>&nbsp;返回
			</button></li>
		<!-- <li class="pull-right">
		<select id="mainInfo" class="form-control tab-group-control"></select></li>
		<li class="pull-right"><span class="form-control tab-group-control tab-addon">工程列表:</span></li> -->
	</ul>
	<div class="container">
		<div id="myTabContent" class="tab-content">
			<!-- 接地配置 -->
			<div class="tab-pane fade in active" id="stingConfig">
				<div class="row text-right" style="margin-right:15px;margin-left:15px;">
					<button class="btn btn-success" id="grounding_savebtn"><i class="fa fa-check-square-o"></i>&nbsp;&nbsp;保&nbsp;存</button>
			    </div>
			    <div class="row" style="margin-right:15px;margin-left:15px;margin-top:10px;">
			              <table class="table table-bordered" id="groundTable">
			              <caption id="groundTable_title" style="text-align: center;">${requestScope.listMap.projectName }</caption>
							   <thead>	
									<tr>
										<th rowspan="" width="">操作</th>
										<th rowspan="" width="">代号</th>
										<th colspan="">土壤电阻率</th>
										<th colspan="">上传</th>			
								    </tr>
							    </thead>
								<tbody>	
								</tbody>
							</table>
			    </div>
			</div>
			<!-- 目录(20串) -->
			<div class="tab-pane fade" id="index">
				<div id="indexContainer"
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
	src="<%=basePath%>assets/js/laydate-5.0/laydate.js"></script>
<script type="text/javascript"
	src="<%=basePath%>assets/js/layer/layer.js"></script>
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
	<!-- 文件上传 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/assets/plugins/form/jquery.form.js"></script>
<!-- 自定义js -->
<script type="text/javascript"
	src="<%=basePath%>pages/groundingDevice/groundingConfig.js"></script>
<script>
	var basePath="<%=basePath%>";
	var groundingConfigList = ${requestScope.listMap.groundingConfigList};
	var attachmentList = ${requestScope.listMap.attachmentList};
	var projectId = '${requestScope.listMap.projectId}';
	var groundingConfig = new groundingConfig();
</script>
</html>
