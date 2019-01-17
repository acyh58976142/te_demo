﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
<title>组配件明细详情</title>
<link rel="stylesheet" href="<%=basePath%>assets/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<style type="text/css">

#cellContainer{
	border: 0px!important; 
    margin-left: 20px;
}
#zfstatd{
	display: none;
}
.rulercro{
	width: 30px!important;
}
.topDiv{
 	margin-top: 10px;
}
td{
	white-space: normal!important;
}
</style>
</head>
</head>
<body>
<div class="col-md-12 col-xs-12 topDiv" >
				<div class="pull-left">
					<h4>组配件明细</h4>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" id="export_btn" onclick="JSONToExcelConvertor()"><i class="fa fa-save"></i>&nbsp;&nbsp;导&nbsp;出</button>
					<button class="btn btn-warning" id="btn_apply_back" onclick="backUpPage()"><i class="fa fa-mail-reply"></i>&nbsp;&nbsp;返&nbsp;回</button>
				</div>
			</div> 
<div class="col-md-12 col-xs-12 middleDiv">
	<div id="cellContainer" style="border:1px solid #DDECFE;">
	</div>
</div>
</body>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell.register.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script> 
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>pages/parts/partsDetail.js"></script>
<script type="text/javascript">
    var path="<%=basePath%>"; 
 
</script>

        
</html>