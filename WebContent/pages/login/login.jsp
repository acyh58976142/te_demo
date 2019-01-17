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
<title>登陆页面</title>
<!-- Bootstrap 3.3.7 -->
<link rel="stylesheet"
	href="<%=basePath%>assets/css/bootstrap/css/bootstrap.min.css">
<!-- Font Awesome -->
<!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">-->
<link rel="stylesheet"
	href="<%=basePath%>assets/css/font-awesome/css/font-awesome.min.css">
<!-- 自定义css -->
<link rel="stylesheet" href="<%=basePath %>assets/css/login/login.css">
</head>
<body onKeyDown="doEnter(event);">
	<img src="<%=basePath%>resource/images/loginBG.jpg"
		style="position: absolute; z-index: -1; left: 0px; top: 0px; width: 100%; height: 100%;">
	<div class="background">
		<div class="headDiv">
			<div class="col-lg-12 col-md-12 col-sm-12">
				<h3>用户登录</h3>
			</div>
			<form id="login_Form" method="post">
				<div class="col-lg-12 col-md-12 col-sm-12 magintop-row">
					<div class="col-lg-offset-1 col-lg-10">
						<div class="input-group">
							<span class="input-group-addon">用户</span> <input type="text"
								id="login_username" class="form-control" placeholder="请输入用户名"
								name="username">
						</div>
					</div>
				</div>

				<div class="col-lg-12 col-md-12 col-sm-12 magintop-row">
					<div class="col-lg-offset-1 col-lg-10">
						<div class="input-group">
							<span class="input-group-addon">密码</span> <input type="password"
								id="login_password" class="form-control" placeholder="请输入密码"
								name="password">
						</div>
					</div>
				</div>
			</form>

			<div class="col-lg-12 col-md-12 col-sm-12 magintop-row">
				<div class="col-lg-offset-1 col-lg-10">
					<button class='form-control btn btn-info' id='submit'>登录</button>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="<%=basePath%>assets/plugins/jQuery/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/cookie/jquery.cookie.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/laydate/laydate.dev.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/plugins/form/jquery.form.js"></script>
<script type="text/javascript" src="<%=basePath%>assets/js/common/default.js"></script> 
<script type="text/javascript" src="<%=basePath%>login.js"></script>
<script type="text/javascript">
    var path="<%=basePath%>";
	var login = new Login();
	function doEnter(event) {
		if (event.keyCode == 13) {//回车键
			login.loginSubmit();
		}
	}
</script>
</html>