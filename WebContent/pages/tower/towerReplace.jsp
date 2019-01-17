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
<title>编辑工程</title>
<!-- Bootstrap 3.3.7 -->
<link rel="stylesheet"
	href="<%=basePath%>assets/css/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet"
	href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css">
<!-- 自定义css -->
<link rel="stylesheet" href="<%=basePath %>pages/tower/towerAdd.css">
<body>
	<div class="">
		<div class="headDiv">
			<div class="col-lg-12 col-md-12 col-sm-12">
				<h3>编辑工程</h3>
			</div>
			<form id="login_Form" method="post">
				<div class="col-lg-12 col-md-12 col-sm-12 magintop-row">
					<div class="col-lg-offset-1 col-lg-10">
						<div class="input-group">
							<span class="input-group-addon">工程名称</span><input type="text"
								id="projectName" class="form-control" value="${requestScope.mainInfo.projectName}"
								name="projectName">
						</div>
					</div>
				</div>

				<div class="col-lg-12 col-md-12 col-sm-12 magintop-row">
					<div class="col-lg-offset-1 col-lg-10">
						<div class="input-group">
							<span class="input-group-addon">工程编号</span> <input type="text"
								id="projectNo" class="form-control" value="${requestScope.mainInfo.projectCode}"
								name="projectNo">
						</div>
					</div>
				</div>
				
					<!-- <div class="col-lg-12 col-md-12 col-sm-12 magintop-row">
					<div class="col-lg-offset-1 col-lg-10">
						<div class="input-group">
							<span class="input-group-addon">接地装置型式</span> <input type="text"
								id="deviceType" class="form-control" placeholder=""
								name="deviceType">
						</div>
					</div>
				</div> -->
				
				<div class="col-lg-12 col-md-12 col-sm-12 magintop-row">
		              <div class="col-md-1 col-xs-1">
		              </div>
                       <div class="col-md-10 col-xs-10 text-left">
							<div id="del_summary_file_div">TA文件&nbsp;&nbsp;:</div>
							<input name="upload"  id="summary_file_input" type="file" style="display: none;">
							<!-- <button class="btn btn-info"  id="summary_file_btn" type="button">
								<i class="fa fa-upload"></i>&nbsp;上传
							</button> -->
						</div>
				</div>
			
			</form>

			<div class="col-lg-12 col-md-12 col-sm-12 magintop-row">
				<div class="col-lg-offset-1 col-lg-10">
					<button class='form-control btn btn-info' id='submit'>提交</button>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/form/jquery.form.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script> 
<script type="text/javascript" src="<%=basePath%>pages/tower/towerReplace.js"></script>
<script type="text/javascript">
    var path="<%=basePath%>";
	var towerAdd = new towerAdd('${attList}');
	 var id = '${requestScope.id}';
</script>
</html>