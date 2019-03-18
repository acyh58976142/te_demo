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
<title>杆塔明细校对</title>
<link rel="stylesheet" href="<%=basePath%>assets/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="<%=basePath%>assets/js/zcell/ZCell.css">
<style type="text/css">
#cellContainer{
	border: 0px!important; 
    overflow: hidden;
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
					<h4>杆塔明细校核</h4>
				</div>
				<div class="pull-right">
						<button id="btnAgree" onclick="checkAgree()" class="btn btn-success">
								<i class="fa fa-check-square-o"></i>&nbsp;&nbsp;通&nbsp;过
						</button>
						<button id="reject" onclick="checkReject()" class="btn btn-danger">
							<i class="fa fa-times"></i>&nbsp;不通过
						</button>
					<button class="btn btn-primary" id="export_btn" onclick="JSONToExcelConvertor()"><i class="fa fa-save"></i>&nbsp;&nbsp;导&nbsp;出</button>
						<form id="login_Form" method="post" style="display: none;">
					<input name="upload"  id="summary_file_input" type="file" onchange="filingUpload()" style="display: none;">
					</form>
					<button class="btn btn-info"  id="summary_file_btn" onclick="filingUploadBtn()" type="button"><i class="fa fa-upload"></i>&nbsp;&nbsp;上&nbsp;传</button>
					<button class="btn btn-warning" id="btn_apply_back" onclick="backUpPage()"><i class="fa fa-mail-reply"></i>&nbsp;&nbsp;返&nbsp;回</button>
				</div>
			</div> 
<div class="col-md-12 col-xs-12">
	<div id="cellContainer" style="border:1px solid #DDECFE; overflow:hidden;">
	</div>
</div>
</body>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell.register.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/zcell/ZCell.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script> 
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/form/jquery.form.js"></script>
<script type="text/javascript" src="<%=basePath%>pages/tower/towerCheck.js"></script>
<script type="text/javascript">
    var path="<%=basePath%>"; 
    var id = '${requestScope.id}'; 
    var projectCode = '${requestScope.projectCode}'; 
    var angle = '${requestScope.tower.angle_change_list}'; 
    var connect = '${requestScope.tower.connect_change_list}'; 
</script>
</html>